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
    const kelas = url.searchParams.get("kelas") || "";

    if (kelas === "") {
      return NextResponse.json({ success: false, error: "Kelas tidak boleh kosong" }, { status: 401 });
    }

    const [rows] = await poolDB.query<RowDataPacket[]>(
      `SELECT mapel.mapel_id, nama_mapel, tugas_id, tugas.nama AS nama_tugas, deadline FROM mapel
            JOIN tugas ON (tugas.mapel_id = mapel.mapel_id)
            JOIN kelas_mapel ON (kelas_mapel.mapel_id = mapel.mapel_id)
            JOIN kelas ON (kelas.kelas_id = kelas_mapel.kelas_id)
            WHERE kelas.kelas_id = ?`,
      [kelas]
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

const TugasSchema = z.object({
  mapel_id: z.string().min(1, "ID mata pelajaran tidak boleh kosong"),
  nama: z.string().min(1, "Nama tugas tidak boleh kosong"),
  isi: z.string().min(1, "Isi tidak boleh kosong"),
  deadline: z.string().min(1, "Deadline tidak boleh kosong"),
});

type TugasReq = z.infer<typeof TugasSchema>;

export async function POST(req: Request) {
  const conn = await poolDB.getConnection();
  try {
    const payload = await req.json();
    const data: TugasReq = TugasSchema.parse(payload);

    const rowDate = new Date(data.deadline.replace(" ", "T"));
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (rowDate <= today) {
      return Response.json({ success: false, error: "Tanggal deadline tidak boleh kurang atau sama dengan hari ini" });
    }

    const [rows]: any = await conn.query("SELECT comment_id FROM comment ORDER BY comment_id DESC LIMIT 1 FOR UPDATE");
    const maxID = rows[0].comment_id;
    const newID = maxID + 1;

    await conn.beginTransaction();

    let commentRes;
    try {
      const [res] = await conn.execute("INSERT INTO comment (comment_id, jumlah) VALUES (?, ?)", [newID, 0]);
      commentRes = res;
    } catch (err) {
      throw new Error(`Gagal menambahkan comment field, ${err}`);
    }

    let tugasRes;
    try {
      const [res] = await conn.execute("INSERT INTO tugas (mapel_id, comment_id, nama, isi, deadline) VALUES (?, ?, ?, ?, ?)", [
        data.mapel_id,
        newID,
        data.nama,
        data.isi,
        data.deadline,
      ]);
      tugasRes = res;
    } catch (err) {
      throw new Error(`Gagal menambahkan tugas, ${err}`);
    }

    await conn.commit();
    return Response.json({ success: true, commentRes, tugasRes });
  } catch (err: any) {
    await conn.rollback();
    if (err instanceof z.ZodError) {
      return Response.json({ success: false, error: err.issues }, { status: 400 });
    }
    return Response.json({ success: false, error: err.message });
  } finally {
    conn.release();
  }
}
