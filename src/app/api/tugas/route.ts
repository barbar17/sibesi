import poolDB from "@/lib/db";
import z from "zod";

const TugasSchema = z.object({
    mapel_id: z.string().min(1, "ID mata pelajaran tidak boleh kosong"),
    nama: z.string().min(1, "Nama tugas tidak boleh kosong"),
    isi: z.string().min(1, "Isi tidak boleh kosong"),
    deadline: z.string().min(1, "Deadline tidak boleh kosong"),
})

type TugasReq = z.infer<typeof TugasSchema>

export async function POST(req: Request) {
    const conn = await poolDB.getConnection()
    try {
        const payload = await req.json();
        const data: TugasReq = TugasSchema.parse(payload);

        const rowDate = new Date(data.deadline.replace(" ", "T"));
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if(rowDate <= today) {
            return Response.json({success: false, error: "Tanggal deadline tidak boleh kurang atau sama dengan hari ini"})
        }

        const [rows]: any = await conn.query("SELECT comment_id FROM comment ORDER BY comment_id DESC LIMIT 1 FOR UPDATE");
        const maxID = rows[0].comment_id;
        const newID = maxID + 1

        await conn.beginTransaction()

        let commentRes;
        try {
            const [res] = await conn.execute("INSERT INTO comment (comment_id, jumlah) VALUES (?, ?)", [newID, 0]);
            commentRes = res;
        } catch (err) {
            throw new Error(`Gagal menambahkan comment field, ${err}`);
        }

        let tugasRes;
        try {
            const [res] = await conn.execute("INSERT INTO tugas (mapel_id, comment_id, nama, isi, deadline) VALUES (?, ?, ?, ?, ?)",
                [data.mapel_id, newID, data.nama, data.isi, data.deadline]
            )
            tugasRes = res;
        } catch (err) {
            throw new Error(`Gagal menambahkan tugas, ${err}`);
        }

        await conn.commit()
        return Response.json({success: true, commentRes, tugasRes})
    } catch (err: any) {
        await conn.rollback();
        if (err instanceof z.ZodError) {
            return Response.json({ success: false, error: err.issues }, { status: 400 })
        }
        return Response.json({success: false, error: err.message})
    } finally {
        conn.release()
    }
}