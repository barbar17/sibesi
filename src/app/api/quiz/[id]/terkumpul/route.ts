import poolDB from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const url = new URL(req.url);
        const kelas = url.searchParams.get("kelas") || ""
        const { id } = await params

        const [rows] = await poolDB.query(`SELECT user.user_id, quiz_id, nilai_quiz, nama_user FROM user
            LEFT JOIN quiz_siswa ON (quiz_siswa.user_id = user.user_id)
            WHERE user.kelas_id = ? AND quiz_id = ?`, [kelas, id])

        return Response.json({ success: true, data: rows })
    } catch (err) {
        return Response.json({ success: false, error: err })
    }
}