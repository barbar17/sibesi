import poolDB from "@/lib/db";
import z from "zod";

export async function GET(req: Request, {params}: {params: Promise<{id:string}>}) {
    try {
        const {id} = await params;

        const [row]: any = await poolDB.query("SELECT mapel_id, comment_id, nama, isi, file_url, deadline FROM tugas WHERE tugas_id = ?", [id]);

        const tugas = row[0];

        const [comments] = await poolDB.query("SELECT nama_user, isi FROM comment_detail JOIN user ON (user.user_id = comment_detail.user_id) WHERE comment_id = ? ORDER BY comment_detail.created_at ASC", [tugas.comment_id]);

        return Response.json({success: true, data: {
            mapel_id: tugas.mapel_id,
            nama: tugas.nama,
            isi: tugas.isi,
            file_url: tugas.file_url,
            deadline: tugas.deadline,
            comments_id: tugas.comment_id,
            comments: comments,
        }})
    } catch (err: any) {
        return Response.json({success: false, error: err.message}, {status: 500})
    }
}

const TugasSchema = z.object({
    user_id: z.string().min(1, "ID user tidak boleh kosong"),
    created_by: z.string().min(1, "Nama pembuat tidak boleh kosong"),
    status_deadline: z.int().max(1),
    file_url: z.string().min(1, "File tugas tidak boleh kosong"),
})

type TugasReq = z.infer<typeof TugasSchema>

export async function POST(req: Request, {params}: {params: Promise<{id:string}>}) {
    const conn = await poolDB.getConnection()
    try {
        const {id} = await params;

        const payload = await req.json()
        const data: TugasReq = TugasSchema.parse(payload)

        await conn.beginTransaction()

        let tugasRes;
        try {
            const [res] = await conn.execute(`INSERT INTO tugas_detail (tugas_id, user_id, created_by, status_deadline, file_url)
                VALUES (?, ?, ?, ?, ?)`, [id, data.user_id, data.created_by, data.status_deadline, data.file_url]);
            
            tugasRes = res;
        } catch (err) {
            throw new Error(`Gagal upload tugas, ${err}`)
        }

        await conn.commit()
        return Response.json({success: true, tugasRes})
    } catch (err: any) {
        await conn.rollback()
        if (err instanceof z.ZodError) {
            return Response.json({ success: false, error: err.issues }, { status: 400 });
        }
        return Response.json({success: false, error: err.message}, {status: 500})
    } finally {
        conn.release()
    }
}