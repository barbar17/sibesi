import poolDB from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const url = new URL(req.url);
        const mapel = url.searchParams.get("mapel") || ""
        const { id } = await params

        const [rows] = await poolDB.query(`SELECT quiz_siswa_id, user_id, nilai_quiz, user.kelas_id, nama_kelas, nama_user FROM user
            JOIN kelas ON (kelas.kelas_id = user.kelas_id)
            LEFT JOIN quiz_siswa ON (quiz_siswa.user_id = user.user_id)
            LEFT JOIN quiz ON (quiz.quiz_id = quiz_siswa.quiz_id)
            JOIN kelas_mapel ON (kelas_mapel.mapel_id = quiz.mapel_id) AND (kelas_mapel.kelas_id = user.kelas_id)
            WHERE quiz.quiz_id = ? ORDER BY user.kelas_id`, [id])

        return Response.json({ success: true, data: rows })
    } catch (err) {
        return Response.json({ success: false, error: err })
    }
}