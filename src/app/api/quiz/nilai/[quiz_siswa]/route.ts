import poolDB from "@/lib/db";

type NilaiQuiz = {
    nilai: number;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string, quiz_siswa: string }> }) {
    const conn = await poolDB.getConnection()
    try {
        const { id, quiz_siswa } = await params
        const data: NilaiQuiz = await req.json();

        await conn.beginTransaction()

        let nilaiQuizRes;
        try {
            const [res] = await conn.execute("UPDATE quiz_siswa SET nilai_quiz = ? WHERE quiz_siswa_id = ?", [data.nilai, quiz_siswa]);
            nilaiQuizRes = res
        } catch (error) {

        }

        await conn.commit()
        return Response.json({ success: true, nilaiQuizRes })
    } catch (err) {
        await conn.rollback()
        return Response.json({ success: false, error: err }, { status: 500 })
    } finally {
        await conn.release
    }
}