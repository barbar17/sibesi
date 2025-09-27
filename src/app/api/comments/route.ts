import poolDB from "@/lib/db";
import z from "zod";

const CommentSchema = z.object({
    comment_id: z.string().min(1, "ID komentar tidak boleh kosong"),
    user_id: z.string().min(1, "ID user tidak boleh kosong"),
    isi: z.string().min(1, "Isi tidak boleh kosong"),
})

type CommentReq = z.infer<typeof CommentSchema>

export async function POST(req: Request) {
    const conn = await poolDB.getConnection()
    try {
        const payload = await req.json()
        const data: CommentReq = CommentSchema.parse(payload)

        await conn.beginTransaction()

        let commentRes;
        try {
            const [res] = await conn.execute(`INSERT INTO comment_detail (comment_id, user_id, isi) VALUES (?, ?, ?)`, [data.comment_id, data.user_id, data.isi]);

            commentRes = res
        } catch (err: any) {
            throw new Error(`Gagal menambahkan komentar, ${err.message}`)
        }

        await conn.commit()

        return Response.json({success: true, commentRes})
    } catch (err: any) {
        await conn.rollback();

        if (err instanceof z.ZodError) {
            return Response.json({ success: false, error: err.issues }, { status: 400 })
        }

        return Response.json({success: false, error: err.message});
    } finally {
        conn.release();
    }
}