import { NextRequest, NextResponse } from "next/server";
import poolDB from "@/lib/db";
import { RowDataPacket } from "mysql2";
import z from "zod";

type RawMateri = {
  mapel_id: string;
  nama_mapel: string;
  materi_id: number;
  nama_materi: string;
  status: number;
};

type Modul = {
  id: number;
  nama: string;
  status: number;
};

type Mapel = {
  id: string;
  nama: string;
  modul: Modul[];
};

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const kelas = url.searchParams.get("kelas") || "";

    if (kelas === "") {
      return NextResponse.json({ success: false, error: "Kelas tidak boleh kosong" }, { status: 401 });
    }

    const [rows] = await poolDB.query<RowDataPacket[]>(
      `SELECT mapel.mapel_id, nama_mapel, materi_id, materi.nama AS nama_materi, status FROM mapel
            JOIN materi ON (materi.mapel_id = mapel.mapel_id)
            JOIN kelas_mapel ON (kelas_mapel.mapel_id = mapel.mapel_id)
            JOIN kelas ON (kelas.kelas_id = kelas_mapel.kelas_id)
            WHERE kelas.kelas_id = ?`,
      [kelas]
    );

    const transformData = (data: RawMateri[]): Mapel[] => {
      const map = new Map<string, Mapel>();
      data.forEach((item) => {
        if (!map.has(item.mapel_id)) {
          map.set(item.mapel_id, {
            id: item.mapel_id,
            nama: item.nama_mapel,
            modul: [],
          });
        }

        const mapel = map.get(item.mapel_id)!;
        mapel.modul.push({
          id: item.materi_id,
          nama: item.nama_materi,
          status: item.status,
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

const MateriSchema = z.object({
  mapel_id: z.string().min(1, "ID mata pelajaran tidak boleh kosong"),
  nama: z.string().min(1, "Nama materi tidak boleh kosong"),
  isi: z.string().min(1, "ID mata pelajaran tidak boleh kosong"),
});

type MateriReq = z.infer<typeof MateriSchema>;

export async function POST(req: Request) {
  const conn = await poolDB.getConnection();
  try {
    const payload = await req.json();
    const data: MateriReq = MateriSchema.parse(payload);

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

    let materiRes;
    try {
      const [res] = await conn.execute("INSERT INTO materi (mapel_id, comment_id, nama, status, isi) VALUES (?, ?, ?, ?, ?)", [
        data.mapel_id,
        newID,
        data.nama,
        0,
        data.isi,
      ]);
      materiRes = res;
    } catch (err) {
      throw new Error(`Gagal menambahkan materi, ${err}`);
    }

    await conn.commit();
    return Response.json({ success: true, commentRes, materiRes });
  } catch (err: any) {
    await conn.rollback();
    if (err instanceof z.ZodError) {
      return Response.json({ success: false, error: err.issues }, { status: 400 });
    }
    return Response.json({ success: false, error: err.message }, { status: 400 });
  } finally {
    conn.release();
  }
}
