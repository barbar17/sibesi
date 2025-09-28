import poolDB from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

type RawTugas = {
  mapel_id: string;
  nama_mapel: string;
  tugas_id: number;
  nama_tugas: string;
  deadline: string;
};

type Tugas = {
  id: number;
  nama: string;
  deadline: string;
};

type Mapel = {
  id: string;
  nama: string;
  tugas: Tugas[];
};

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const mapel = url.searchParams.get("mapel") || "";

    if (mapel === "") {
      return NextResponse.json({ success: false, error: "Kelas tidak boleh kosong" }, { status: 401 });
    }

    const [rows] = await poolDB.query<RowDataPacket[]>(
      `SELECT mapel.mapel_id, nama_mapel, tugas_id, tugas.nama AS nama_tugas, deadline FROM mapel
            JOIN tugas ON (tugas.mapel_id = mapel.mapel_id)
            WHERE mapel.mapel_id = ?`,
      [mapel]
    );

    const transformData = (data: RawTugas[]): Mapel[] => {
      const map = new Map<string, Mapel>();
      data.forEach((item) => {
        if (!map.has(item.mapel_id)) {
          map.set(item.mapel_id, {
            id: item.mapel_id,
            nama: item.nama_mapel,
            tugas: [],
          });
        }

        const mapel = map.get(item.mapel_id)!;
        mapel.tugas.push({
          id: item.tugas_id,
          nama: item.nama_tugas,
          deadline: item.deadline,
        });
      });

      return Array.from(map.values());
    };

    const result = transformData(rows as RawTugas[]);

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return Response.json({ success: false, error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, data: err.message }, { status: 400 });
  }
}