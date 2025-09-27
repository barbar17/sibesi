import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import poolDB from "@/lib/db";
import { RowDataPacket } from "mysql2";

type RawMateri = {
    mapel_id: string;
    nama_mapel: string;
    materi_id: number;
    nama_materi: string;
    status: number;
}

type Modul = {
    id: number;
    nama: string;
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
            return NextResponse.json({ success: false, error: "Kelas tidak boleh kosong" }, { status: 401 })
        }

        const [rows] = await poolDB.query<RowDataPacket[]>(`SELECT mapel.mapel_id, nama_mapel, materi_id, materi.nama AS nama_materi, status FROM mapel
            JOIN materi ON (materi.mapel_id = mapel.mapel_id)
            JOIN kelas ON (kelas.kelas_id = mapel.kelas_id)
            WHERE kelas.kelas_id = ?`, [kelas])

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
                });
            });

            return Array.from(map.values());
        }

        const result = transformData(rows as RawMateri[]);

        return NextResponse.json({ success: true, data: result });
    } catch (err: any) {
        return NextResponse.json({ success: false, data: err.message });
    }
}

// UPLOAD GAMBAR
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filePath = path.join(process.cwd(), "public/materi", file.name);
        await fs.writeFile(filePath, buffer);

        return NextResponse.json({ success: true, url: `/materi/${file.name}` });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

