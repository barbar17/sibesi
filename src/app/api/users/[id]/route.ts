import poolDB from "@/lib/db";
import { logger } from "@/lib/logger";
import {z} from "zod";

// GET User BY ID
export async function POST(req: Request, {params}: {params: Promise<{id:string}>}) {
    try {
        const {id} = await params;

        const [rows] = await poolDB.query("SELECT user_id, kelas_id, mapel_id, role, nama_user FROM user WHERE user_id = ?", [id]);

        return Response.json({success: true, data: rows})
    } catch (err) {
        return Response.json({success: false, error: err}, {status: 500})
    }
}

// // UPDATE USER
// const UpdateUserSchema = z.object({
//     user_id: z.string().min(1, "ID pengguna tidak boleh kosong"),
//     kelas_id: z.string().min(1, "ID kelas tidak boleh kosong"),
//     mapel_id: z.string().min(1, "ID mata pelajaran tidak boleh kosong"),
//     password: z.string().min(1, "Password tidak boleh kosong"),
//     role: z.string().min(1, "Role tidak boleh kosong"),
//     nama_user: z.string().min(1, "Nama user tidak boleh kosong"),
//     user: z.string().min(1, "User tidak ditemukan"),
// })

// type UserReq = z.infer<typeof UpdateUserSchema>

// export async function PATCH(req: Request, {params}: {params: Promise<{id:string}>}) {
//     const conn = await poolDB.getConnection()
    
//     try {
//         const {id} = await params;
//         const payload = await req.json();
//         const dataUser: UserReq = UpdateUserSchema.parse(payload);

//         await conn.beginTransaction()

//         let updateMapelRes;
//         try {
//             const [res] = await conn.execute("UPDATE user SET user_id = ?, kelas_id = ?, nama_mapel = ? WHERE mapel_id = ?", 
//                 [mapelID, dataMapel.kelas_id, dataMapel.nama_mapel, id]);
//             updateMapelRes = res
//         } catch (err: any) {
//             if (err.code === "ER_DUP_ENTRY") {
//                 throw new Error("Mata pelajran sudah ada, coba yang lain")
//             }
//             throw new Error(`Gagal ubah mapel, ${err.message}`)
//         }

//         logger(conn, dataMapel.user, `Merubah mapel ${id}`)
//         conn.commit()
//         return Response.json({success: true, updateMapelRes})
//     } catch (err) {
//         conn. rollback()
//         return Response.json({success: false, error: err}, {status: 500})
//     } finally {
//         conn.release()
//     }
// }

// DELETE USER
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

        let deleteUserRes;
        try {
            const [res] = await conn.execute("DELETE FROM user WHERE user_id = ?", [id]);
            deleteUserRes = res
        } catch (err) {
            throw new Error(`Gagal hapus user, ${err}`)
        }

        logger(conn, user, `Menghapus user ${id}`)
        conn.commit()
        return Response.json({success: true, deleteUserRes})
    } catch (err) {
        conn. rollback()
        return Response.json({success: false, error: err}, {status: 500})
    } finally {
        conn.release()
    }
}