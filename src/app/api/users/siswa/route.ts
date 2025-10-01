import poolDB from "@/lib/db";
import z from "zod";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const mapel = url.searchParams.get("mapel")

        const [rows] = await poolDB.query(`SELECT ROW_NUMBER() OVER (ORDER BY user.user_id) AS no, user_id, user.kelas_id, nama_kelas, nama_user FROM user 
            JOIN kelas ON (kelas.kelas_id = user.kelas_id)
            JOIN kelas_mapel ON (kelas_mapel.kelas_id = kelas.kelas_id)
            WHERE role = 'siswa' AND kelas_mapel.mapel_id = ? ORDER BY user.user_id`, [mapel])
        
        return Response.json({success: true, data: rows})
    } catch (err) {
        return Response.json({success: false, error: err})
    }
}

const SiswaSchema = z.object({
    user_id: z.string().min(1, "ID user tidak boleh kosong"),
    kelas_id: z.string().min(1, "ID kelas tidak boleh kosong"),
    username: z.string().min(1, "Username tidak boleh kosong"),
    password: z.string().min(1, "Password tidak boleh kosong"),
    nama_user: z.string().min(1, "Nama tidak boleh kosong")
})

type SiswaReq = z.infer<typeof SiswaSchema>

export async function POST(req: Request) {
    const conn = await poolDB.getConnection()
    
    try {
        const payload = await req.json()
        const data: SiswaReq = SiswaSchema.parse(payload)

        await conn.beginTransaction()

        let userRes;
        try {
            const [res] = await conn.execute("INSERT INTO user (user_id, kelas_id, mapel_id, username, password, role, nama_user) VALUES (?,?,?,?,?,?,?)",
                [data.user_id, data.kelas_id, "-",  data.username, data.password, "siswa", data.nama_user]
            )
            userRes = res
        } catch (err) {
            throw new Error(`Gagal menambah guru, ${err}`)
        }
        
        await conn.commit()
        return Response.json({success: true})
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