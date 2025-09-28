import poolDB from "@/lib/db"
import z from "zod"

const PostMapelSchema = z.object({
    kelas_id: z.string().min(1, "ID kelas tidak boleh kosong"),
    mapel_id: z.string().min(1, "ID mata pelajaran tidak boleh kosong"),
})

type MapelKelasReq = z.infer<typeof PostMapelSchema>

export async function POST(req: Request) {
    const conn = await poolDB.getConnection()
    try {
        const payload = await req.json();
        const data: MapelKelasReq = PostMapelSchema.parse(payload);

        await conn.beginTransaction()

        let insertMapelRes;
        try {
            const [res] = await conn.execute("INSERT INTO kelas_mapel (mapel_id, kelas_id) VALUES (?, ?)", 
                [data.mapel_id, data.kelas_id]);
            
            insertMapelRes = res
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new Error("Mata pelajaran sudah ada, coba yang lain")
            }
            throw new Error(`Gagal menambahkan mapel, ${err}`)
        }


        await conn.commit()
        return Response.json({success: true, insertMapelRes})
    } catch (err: any) {
        await conn.rollback()
        if (err instanceof z.ZodError) {
            return Response.json({ success: false, error: err.issues }, { status: 400 })
        }
        return Response.json({ success: false, error: err.message || err }, { status: 500 })
    } finally {
        await conn.release()    
    }
}