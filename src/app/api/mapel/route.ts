import poolDB from "@/lib/db";
import { logger } from "@/lib/logger";
import {z} from "zod"

// GET SEMUA MAPEL
export async function GET() {
    try {
        const [rows] = await poolDB.query("SELECT mapel_id, kelas_id, nama_mapel FROM mapel");

        return Response.json({success: true, data: rows})
    } catch (err: any) {
        return Response.json({success: false, err: err.message || err}, {status: 500})
    }
}

// POST MAPEL
const PostMapelSchema = z.object({
    kelas_id: z.string().min(1, "ID kelas tidak boleh kosong"),
    nama_mapel: z.string().min(1, "Nama mata pelajaran tidak boleh kosong"),
    user: z.string().min(1, "User tidak ditemukan"),
})

type MapelReq = z.infer<typeof PostMapelSchema>

export async function POST(req: Request) {
    const conn = await poolDB.getConnection()
    try {
        const payload = await req.json();
        const dataMapel: MapelReq = PostMapelSchema.parse(payload);

        await conn.beginTransaction()

        const mapelID = dataMapel.nama_mapel.replace(/\s+/g, "").toUpperCase();

        let insertMapelRes;
        try {
            const [res] = await conn.execute("INSERT INTO mapel (mapel_id, kelas_id, nama_mapel) VALUES (?, ?, ?)", 
                [mapelID, dataMapel.kelas_id, dataMapel.nama_mapel]);
            
            insertMapelRes = res
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new Error("Mata pelajaran sudah ada, coba yang lain")
            }
            throw new Error(`Gagal menambahkan mapel, ${err.messsage}`)
        }

        logger(conn, dataMapel.user, `Menambahkan mapel ${mapelID}`)
        conn.commit()
        return Response.json({success: true, insertMapelRes})
    } catch (err: any) {
        conn.rollback()
        if (err instanceof z.ZodError) {
            return Response.json({ success: false, error: err.issues }, { status: 400 })
        }
        return Response.json({success: false, error: err.message || err}, {status: 500})
    } finally {
        conn.release()
    }
}