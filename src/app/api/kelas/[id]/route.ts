import poolDB from "@/lib/db";
import {z} from "zod"
import { logger } from "@/lib/logger";

// GET KELAS BY ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params;

        const [rows] = await poolDB.query("SELECT nama_kelas, jumlah_siswa FROM kelas WHERE kelas_id = ?", [id]);

        if ((rows as any[]).length === 0) {
            return Response.json({ success: false, error: `Kelas tidak ditemukan` }, { status: 404 })
        }

        return Response.json({ success: true, data: rows });
    } catch (err: any) {
        return Response.json({ success: false, error: err.message }, { status: 500 })
    }
}

// DELETE KELAS BY ID
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const conn = await poolDB.getConnection()
    try {        
        const {id} = await params;

        await conn.beginTransaction();

        try {
            const [res] = await conn.execute("DELETE FROM kelas WHERE kelas_id = ?", [id])
        } catch (err) {
            throw new Error(`Gagal menghapus kelas, ${err}`)
        }

        try {
            const [res] = await conn.execute("DELETE FROM kelas_mapel WHERE kelas_id = ?", [id])
        } catch (err) {
            throw new Error(`Gagal menghapus kelas, ${err}`)
        }

        conn.commit()
        return Response.json({ success: true })
    } catch (err: any) {
        conn.rollback()
        return Response.json({ success: false, error: err.message }, { status: 500 })
    } finally {
        conn.release()
    }
}

// UPDATE KELAS
const KelasReqSchema = z.object({
    nama_kelas: z.string().min(1, "Nama kelas tidak boleh kosong"),
    user: z.string().min(1, "User tidak boleh kosong")
})

type KelasReq = z.infer<typeof KelasReqSchema>

export async function PATCH(req: Request, {params} : {params: Promise<{id: string}>}) {
    const conn = await poolDB.getConnection()

    try {
        const payload = await req.json();
        const kelas: KelasReq = KelasReqSchema.parse(payload)

        const newKelasID = kelas.nama_kelas.replace(/\s+/g, "").toUpperCase()

        const {id} = await params;

        await conn.beginTransaction()

        let updateKelasRes;
        try {
            const [res] = await conn.execute("UPDATE kelas SET kelas_id = ?, nama_kelas = ? WHERE kelas_id = ?", [newKelasID, kelas.nama_kelas, id]);
            updateKelasRes = res;
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new Error("Kelas sudah ada, coba nama lain")
            }
            throw new Error(`Gagal update kelas, ${err.message}`)
        }

        logger(conn, kelas.user, `Merubah kelas ${id}`)
        conn.commit();

        return Response.json({success: true, updateKelasRes});
    } catch (err: any) {
        conn.rollback();
        return Response.json({success: false, error: err.message}, {status: 500});
    } finally {
        conn.release();
    }
}