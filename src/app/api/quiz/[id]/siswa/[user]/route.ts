import poolDB from "@/lib/db";

export async function POST(req: Request, { params }: { params: Promise<{ id: string, user: string }> }) {
    const conn = await poolDB.getConnection()
    try {
        const { id, user } = await params;

        await conn.beginTransaction()

        let quizRes;
        try {
            const [res] = await conn.execute("INSERT INTO quiz_siswa (user_id, quiz_id, nilai_quiz) VALUS (?,?,0)", [user, id])

            quizRes = res
        } catch (err) {
            throw new Error(`Gagal menambahkan quiz, ${err}`)
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