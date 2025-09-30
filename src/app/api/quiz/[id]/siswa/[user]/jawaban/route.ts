import poolDB from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string, user: string }> }) {
    try {
        const { id, user } = await params;

        const [rows] = await poolDB.query(`SELECT soal, tipe, kunci_jawaban, pilihan_1, pilihan_2, pilihan_3, pilihan_4, jawaban FROM quiz_siswa
            JOIN quiz_siswa_detail ON (quiz_siswa_detail.quiz_siswa_id = quiz_siswa.quiz_siswa_id)
            JOIN quiz_soal ON (quiz_soal.quiz_soal_id = quiz_siswa_detail.quiz_soal_id)
            WHERE quiz_siswa.user_id = ? AND quiz_soal.quiz_id = ?`, [user, id])

        return Response.json({ success: true, data: rows })
    } catch (err) {
        return Response.json({ success: false, error: err })
    }
}

type JawabanSiswaReq = {
    quiz_siswa_id: string,
    quiz_soal_id: string,
    jawaban: string
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string, user: string }> }) {
    const conn = await poolDB.getConnection()
    try {
        const { id, user } = await params;
        const data: JawabanSiswaReq[] = await req.json()

        const stmt = await conn.prepare("INSERT INTO quiz_siswa_detail (quiz_siswa_id, quiz_soal_id, jawaban, nilai) VALUES (?,?,?,0) WHERE quiz_siswa_id = ? AND quiz_soal_id = ?")

        await conn.beginTransaction()

        for (const item of data) {
            try {
                const [res] = await stmt.execute([item.quiz_siswa_id, item.quiz_soal_id, item.jawaban, user, id])
            } catch (err) {
                throw new Error(`Gagal upload jawaban, ${err}`)
            }
        }

        await conn.commit()
        return Response.json({ success: true })
    } catch (err: any) {
        await conn.rollback()
        return Response.json({ success: true, error: err.message }, { status: 500 })
    } finally {
        await conn.release()
    }
} 