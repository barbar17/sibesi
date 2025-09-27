import poolDB from "@/lib/db";
import { logger } from "@/lib/logger";
import {z} from "zod";

// GET MAPEL BY ID
export async function GET(req: Request, {params}: {params: Promise<{id:string}>}) {
    try {
        const {id} = await params;

        const [rows] = await poolDB.query("SELECT kelas_id, nama_mapel FROM mapel WHERE mapel_id = ?", [id]);

        return Response.json({success: true, data: rows})
    } catch (err) {
        return Response.json({success: false, error: err}, {status: 500})
    }
}

// UPDATE MAPEL
const UpdateMapelSchema = z.object({
    kelas_id: z.string().min(1, "ID kelas tidak boleh kosong"),
    nama_mapel: z.string().min(1, "Nama mata pelajaran tidak boleh kosong"),
    user: z.string().min(1, "User tidak ditemukan"),
})

type MapelReq = z.infer<typeof UpdateMapelSchema>

export async function PATCH(req: Request, {params}: {params: Promise<{id:string}>}) {
    const conn = await poolDB.getConnection()
    
    try {
        const {id} = await params;
        const payload = await req.json();
        const dataMapel: MapelReq = UpdateMapelSchema.parse(payload);

        await conn.beginTransaction()

        const mapelID = dataMapel.nama_mapel.replace(/\s+/g, "").toUpperCase();

        let updateMapelRes;
        try {
            const [res] = await conn.execute("UPDATE mapel SET mapel_id = ?, kelas_id = ?, nama_mapel = ? WHERE mapel_id = ?", 
                [mapelID, dataMapel.kelas_id, dataMapel.nama_mapel, id]);
            updateMapelRes = res
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new Error("Mata pelajran sudah ada, coba yang lain")
            }
            throw new Error(`Gagal ubah mapel, ${err.message}`)
        }

        logger(conn, dataMapel.user, `Merubah mapel ${id}`)
        conn.commit()
        return Response.json({success: true, updateMapelRes})
    } catch (err) {
        conn. rollback()
        return Response.json({success: false, error: err}, {status: 500})
    } finally {
        conn.release()
    }
}

// DELETE MAPEL
export async function DELETE(req: Request, {params}: {params: Promise<{id:string}>}) {
    const conn = await poolDB.getConnection()
    
    try {
        const {id} = await params;

        const url = new URL(req.url);
        const user = url.searchParams.get("user") || "";

        if(user === "") {
            return Response.json({success: false, error: "User tidak ditemukan"}, {status: 400})
        }

        await conn.beginTransaction()

        let deleteMapelRes;
        try {
            const [res] = await conn.execute("DELETE FROM mapel WHERE mapel_id = ?", [id]);
            deleteMapelRes = res
        } catch (err) {
            throw new Error(`Gagal hapus mapel, ${err}`)
        }

        logger(conn, user, `Menghapus mapel ${id}`)
        conn.commit()
        return Response.json({success: true, deleteMapelRes})
    } catch (err) {
        conn. rollback()
        return Response.json({success: false, error: err}, {status: 500})
    } finally {
        conn.release()
    }
}