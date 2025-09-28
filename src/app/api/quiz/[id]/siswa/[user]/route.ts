import poolDB from "@/lib/db";

type JawabanSiswaReq = {
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

        let quizRes;
        try {
            const [res] = await conn.execute("INSERT INTO quiz_siswa (user_id, quiz_id, nilai_quiz) VALUS (?,?,0)", [user, id])

            quizRes = res
        } catch (err) {
            throw new Error(`Gagal menambahkan quiz, ${err}`)
        }

        const [rows]: any = await conn.execute("SELECT quiz_siswa_id FROM quiz_siswa ORDER BY created_at DESC LIMIT 1")
        const dataQuizSiswa = rows[0]

        for (const item of data) {
            try {
                const [res] = await stmt.execute([dataQuizSiswa.quiz_siswa_id, item.quiz_soal_id, item.jawaban, user, id])
            } catch (err) {
                throw new Error(`Gagal upload jawaban, ${err}`)
            }
        }

        await conn.commit()
        return Response.json({ success: true, quizRes })
    } catch (err: any) {
        await conn.rollback()
        return Response.json({ success: false, error: err.message }, { status: 500 })
    } finally {
        await conn.release()
    }
}