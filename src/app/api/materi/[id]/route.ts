import poolDB from "@/lib/db";

export async function GET(req: Request, {params}: {params: Promise<{id:string}>}) {
    try {
        const {id} = await params

        const [materi]: any = await poolDB.query("SELECT comment_id, nama, status, isi FROM materi WHERE materi_id = ?", [id]);

        const commentID = materi[0].comment_id

        const [comments] = await poolDB.query(`SELECT nama_user, isi, comment_detail.updated_at FROM comment_detail
            JOIN user ON (user.user_id = comment_detail.user_id)
            WHERE comment_detail.comment_id = ?`, commentID);

        return Response.json({success: true, data: {
            nama: materi[0].nama,
            status: materi[0].status,
            isi: materi[0].isi,
            comment_id: commentID,
            comments: comments
        }})
    } catch (err: any) {
        return Response.json({success: false, error: err.message}, {status: 500})
    }
}