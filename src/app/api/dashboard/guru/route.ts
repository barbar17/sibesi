import poolDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// DASHBOARD SISWA
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const mapel = url.searchParams.get("mapel") || "";

        if(mapel === "") {
            return NextResponse.json({success: false, error: "Mata pelajaran tidak boleh kosong"}, {status: 401})
        }

        const [rows] = await poolDB.query(`SELECT nama_mapel, materi.nama AS nama_materi, nama_kelas, materi_selesai, total_materi FROM mapel
            JOIN materi ON (materi.mapel_id = mapel.mapel_id)
            JOIN kelas_mapel ON (kelas_mapel.mapel_id = mapel.mapel_id)
            JOIN kelas ON (kelas.kelas_id = kelas_mapel.kelas_id)
            JOIN (SELECT mapel_id, COUNT(CASE WHEN status = 1 THEN 1 END) AS materi_selesai, COUNT(*) AS total_materi FROM materi GROUP BY mapel_id) AS t1 ON (t1.mapel_id = mapel.mapel_id)
            WHERE mapel.mapel_id = ? AND materi.status = 0 GROUP BY mapel.mapel_id ORDER BY materi.created_at ASC;`, [mapel])
        
        return NextResponse.json({success: true, data: rows})
    } catch (err: any) {
        return NextResponse.json({success: false, error: err.message})
    }
}