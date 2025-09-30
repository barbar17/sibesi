import poolDB from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { RowDataPacket } from "mysql2";
import z from "zod";

type RawMateri = {
  mapel_id: string;
  nama_mapel: string;
  quiz_id: number;
  nama_quiz: string;
  deadline_quiz: string;
  time_quiz: string;
};

type Quiz = {
  id: number;
  nama: string;
  deadline: string;
  time: string;
};

type Mapel = {
  id: string;
  nama: string;
  quiz: Quiz[];
};

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const mapel = url.searchParams.get("mapel") || "";

    if (mapel === "") {
      return NextResponse.json({ success: false, error: "Kelas tidak boleh kosong" }, { status: 401 });
    }

    const [rows] = await poolDB.query<RowDataPacket[]>(
      `SELECT mapel.mapel_id, nama_mapel, quiz_id, nama_quiz, deadline_quiz, time_quiz FROM mapel
            LEFT JOIN quiz ON (quiz.mapel_id = mapel.mapel_id)
            WHERE mapel.mapel_id = ?`,
      [mapel]
    );

    const transformData = (data: RawMateri[]): Mapel[] => {
      const map = new Map<string, Mapel>();
      data.forEach((item) => {
        if (!map.has(item.mapel_id)) {
          map.set(item.mapel_id, {
            id: item.mapel_id,
            nama: item.nama_mapel,
            quiz: [],
          });
        }

        const mapel = map.get(item.mapel_id)!;
        mapel.quiz.push({
            id: item.quiz_id,
            nama: item.nama_quiz,
            deadline: item.deadline_quiz,
            time: item.time_quiz,
        });
      });

      return Array.from(map.values());
    };

    const result = transformData(rows as RawMateri[]);

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return Response.json({ success: false, error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, data: err.message }, { status: 400 });
  }
}