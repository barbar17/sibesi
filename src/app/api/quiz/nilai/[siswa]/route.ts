import poolDB from "@/lib/db";

type NilaiQuiz = {
    nilai: number;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string, siswa: string }> }) {
    const conn = await poolDB.getConnection()
    try {
        const { id, siswa } = await params
        const data: NilaiQuiz = await req.json();

        await conn.beginTransaction()

        let nilaiQuizRes;
        try {
            const [res] = await conn.execute("UPDATE quiz_siswa SET nilai_quiz = ? WHERE user_id = ? AND quiz_id = ?", [data.nilai, siswa, id]);
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