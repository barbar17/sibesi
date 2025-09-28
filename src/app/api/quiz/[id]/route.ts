import poolDB from "@/lib/db";
import z, { success } from "zod";

export async function GET(req:Request, {params}: {params: Promise<{id:string}>}) {
    try {
        const {id} = await params;

        const [rowsSoal] = await poolDB.query("SELECT quiz_soal_id, soal, tipe, kunci_jawaban, pilihan_1, pilihan_2, pilihan_3, pilihan_4 FROM quiz_soal WHERE quiz_id = ?", [id]);

        const [rows]: any = await poolDB.query("SELECT nama_quiz, time_quiz FROM quiz WHERE quiz_id = ?", [id])
        const dataQuiz = rows[0]
        const namaQuiz = dataQuiz.nama_quiz
        const timeQuiz = dataQuiz.time_quiz

        return Response.json({success: true, data: {
            nama: namaQuiz,
            time: timeQuiz,
            kuis: rowsSoal
        }})
    } catch (err) {
        return Response.json({success: false, error: err})
    }
}

const SoalSchema = z.object({
    soal: z.string().min(1, "Soal tidak boleh kosong"),
    tipe: z.string().min(1, "Tipe tidak boleh kosong"),
    kunci_jawaban: z.string().min(1, "Kunci jawaban tidak boleh kosong").max(1, "Kunci jawaban hanya terdiri dari 1 huruf"),
    pilihan_1: z.string().min(1, "Pilihan tidak boleh kosong"),
    pilihan_2: z.string().min(1, "Pilihan tidak boleh kosong"),
    pilihan_3: z.string().min(1, "Pilihan tidak boleh kosong"),
    pilihan_4: z.string().min(1, "Pilihan tidak boleh kosong"),
})

type SoalReq = z.infer<typeof SoalSchema>

export async function POST(req:Request, {params}: {params: Promise<{id:string}>}) {
    const conn = await poolDB.getConnection()
    try {
        const {id} = await params;
        const payload = await req.json()
        const data: SoalReq[] = SoalSchema.array().parse(payload);

        await conn.beginTransaction()

        const stmt = await conn.prepare(`INSERT INTO quiz_soal (soal, tipe, kunci_jawaban, pilihan_1, pilihan_2, pilihan_3, pilihan_4) VALUES (?,?,?,?,?,?,?)`)

        for (const item of data) {
            try {
                const [res] = await stmt.execute([item.soal, item.tipe, item.kunci_jawaban, item.pilihan_1, item.pilihan_2, item.pilihan_3, item.pilihan_4]);
            } catch(err) {
                throw new Error(`Gagal menambahkan soal, ${err}`)
            }
        }
        
        await conn.commit()
        return Response.json({success: true})
    } catch (err) {
        await conn.rollback()
        return Response.json({success: false, error: err}, {status: 500})
    } finally {
        await conn.release()
    }
}