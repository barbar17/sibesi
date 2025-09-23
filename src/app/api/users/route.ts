import poolDB from "@/lib/db";
import { logger } from "@/lib/logger";
import {z} from "zod"

// GET SEMUA USER
export async function GET() {
    try {
        const [rows] = await poolDB.query("SELECT user_id, mapel_id, kelas_id, nama_user FROM mapel");

        return Response.json({success: true, data: rows})
    } catch (err: any) {
        return Response.json({success: false, err: err.message || err}, {status: 500})
    }
}

// POST USER
const PostUserSchema = z.object({
    user_id: z.string().min(1, "ID pengguna tidak boleh kosong"),
    kelas_id: z.string().min(1, "ID kelas tidak boleh kosong"),
    mapel_id: z.string().min(1, "ID mata pelajaran tidak boleh kosong"),
    password: z.string().min(1, "Password tidak boleh kosong"),
    role: z.string().min(1, "Role tidak boleh kosong"),
    nama_user: z.string().min(1, "Nama user tidak boleh kosong"),
    user: z.string().min(1, "User tidak ditemukan"),
})

type UserReq = z.infer<typeof PostUserSchema>

export async function POST(req: Request) {
    const conn = await poolDB.getConnection()
    try {
        const payload = await req.json();
        const dataUser: UserReq = PostUserSchema.parse(payload);

        await conn.beginTransaction()

        let insertUserRes;
        try {
            const [res] = await conn.execute("INSERT INTO user (user_id, mapel_id, kelas_id, password, role, nama_user) VALUES (?, ?, ?, ?, ?, ?)", 
                [dataUser.user_id, dataUser.mapel_id, dataUser.kelas_id, dataUser.password, dataUser.role, dataUser.nama_user]);
            
            insertUserRes = res
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new Error("User ID sudah ada, coba yang lain")
            }
            throw new Error(`Gagal menambahkan user, ${err.messsage}`)
        }

        logger(conn, dataUser.user, `Menambahkan user ${dataUser.user_id}`)
        conn.commit()
        return Response.json({success: true, insertUserRes})
    } catch (err: any) {
        conn.rollback()
        return Response.json({success: false, error: err.message || err}, {status: 500})
    } finally {
        conn.release()
    }
}