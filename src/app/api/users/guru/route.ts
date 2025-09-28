import poolDB from "@/lib/db";
import z from "zod";

const GuruSchema = z.object({
    user_id: z.string().min(1, "ID user tidak boleh kosong"),
    mapel_id: z.string().min(1, "ID mapel tidak boleh kosong"),
    username: z.string().min(1, "Username tidak boleh kosong"),
    password: z.string().min(1, "Password tidak boleh kosong"),
    nama_user: z.string().min(1, "Nama tidak boleh kosong")
})

type GuruReq = z.infer<typeof GuruSchema>

export async function POST(req: Request) {
    const conn = await poolDB.getConnection()
    
    try {
        const payload = await req.json()
        const data: GuruReq = GuruSchema.parse(payload)

        await conn.beginTransaction()

        let userRes;
        try {
            const [res] = await conn.execute("INSERT INTO user (user_id, mapel_id, kelas_id, username, password, role, nama_user) VALUES (?,?,?,?,?,?,?)",
                [data.user_id, data.mapel_id, "-",  data.username, data.password, "guru", data.nama_user]
            )
            userRes = res
        } catch (err) {
            throw new Error(`Gagal menambah guru, ${err}`)
        }
        
    } catch (err: any) {
        await conn.rollback()

        if (err instanceof z.ZodError) {
            return Response.json({ success: false, error: err.issues }, { status: 400 });
        }

        return Response.json({success:false, error: err.message}, {status: 500})
    } finally {
        await conn.release()
    }
}