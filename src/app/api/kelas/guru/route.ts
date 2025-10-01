import poolDB from "@/lib/db";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const mapel = url.searchParams.get("mapel")

        const [rows] = await poolDB.query(`SELECT ROW_NUMBER() OVER (ORDER BY kelas_mapel.kelas_id) AS no, id, nama_mapel, nama_kelas, kelas_mapel.kelas_id FROM kelas_mapel
            JOIN kelas ON (kelas.kelas_id = kelas_mapel.kelas_id)
            JOIN mapel ON (mapel.mapel_id = kelas_mapel.mapel_id)
            WHERE kelas_mapel.mapel_id = ?`, [mapel])
        
        return Response.json({success: true, data: rows})
    } catch (err) {
        return Response.json({success: false, error: err}, {status: 500})
    }
}