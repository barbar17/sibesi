import poolDB from "@/lib/db";
import { z } from "zod"
import { logger } from "@/lib/logger";

// AMBIL SEMUA KELAS
export async function GET() {
    try {
        const [rows] = await poolDB.query("SELECT kelas_id, nama_kelas, jumlah_siswa FROM kelas");
        return Response.json({ success: true, data: rows })
    } catch (err: any) {
        return Response.json({ success: false, error: `Gagal ambil data kelas, ${err.message}` }, { status: 500 })
    }
}

// POST KELAS BARU
const PostKelasSchema = z.object({
    nama_kelas: z.string().min(1, "Nama kelas tidak boleh kosong"),
    user: z.string().min(1, "User tidak boleh kosong")
})
type KelasReq = z.infer<typeof PostKelasSchema>

export async function POST(req: Request) {
    const conn = await poolDB.getConnection();
    try {
        const payload = await req.json();
        const kelas: KelasReq = PostKelasSchema.parse(payload);

        await conn.beginTransaction();

        const kelasID = kelas.nama_kelas.replace(/\s+/g, "").toUpperCase();

        let kelasRes;
        try {
            const [res] = await conn.execute(
                "INSERT INTO kelas (kelas_id, nama_kelas) VALUES (?, ?)",
                [kelasID, kelas.nama_kelas.toUpperCase()]
            );
            kelasRes = res;
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new Error("Kelas sudah ada")
            }
            throw new Error(`Gagal menambahkan kelas, ${err.message}`)
        }
        
        await logger(conn, kelas.user, `Menambahkan kelas ${kelas.nama_kelas}`);
        await conn.commit();

        return Response.json({ success: true, kelas: kelasRes })
    } catch (err: any) {
        await conn.rollback();

        if (err instanceof z.ZodError) {
            return Response.json({ success: false, error: err.issues }, { status: 400 })
        }

        return Response.json({ success: false, error: err.message }, { status: 500 });
    } finally {
        conn.release();
    }
}

