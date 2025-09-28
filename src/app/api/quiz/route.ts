import poolDB from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { RowDataPacket } from "mysql2";
import z from "zod";

type RawMateri = {
    mapel_id: string;
    nama_mapel: string;
    quiz_id: number;
    nama_quiz: string;
    deadline_quiz: string;
    time_quiz: string;
};

type Quiz = {
    id: number;
    nama: string;
    deadline: string;
    time: string;
};

type Mapel = {
    id: string;
    nama: string;
    quiz: Quiz[];
};

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const kelas = url.searchParams.get("kelas") || "";

        if (kelas === "") {
            return NextResponse.json({ success: false, error: "Kelas tidak boleh kosong" }, { status: 401 });
        }

        const [rows] = await poolDB.query<RowDataPacket[]>(
            `SELECT mapel.mapel_id, nama_mapel, quiz_id, nama_quiz, deadline_quiz, time_quiz FROM mapel
            LEFT JOIN quiz ON (quiz.mapel_id = mapel.mapel_id)
            JOIN kelas_mapel ON (kelas_mapel.mapel_id = mapel.mapel_id)
            JOIN kelas ON (kelas.kelas_id = kelas_mapel.kelas_id)
            WHERE kelas.kelas_id = ?`,
            [kelas]
        );

        const transformData = (data: RawMateri[]): Mapel[] => {
            const map = new Map<string, Mapel>();
            data.forEach((item) => {
                if (!map.has(item.mapel_id)) {
                    map.set(item.mapel_id, {
                        id: item.mapel_id,
                        nama: item.nama_mapel,
                        quiz: [],
                    });
                }

                const mapel = map.get(item.mapel_id)!;
                if (item.quiz_id !== null) {
                    mapel.quiz.push({
                        id: item.quiz_id,
                        nama: item.nama_quiz,
                        deadline: item.deadline_quiz,
                        time: item.time_quiz,
                    });
                }
            });

            return Array.from(map.values());
        };

        const result = transformData(rows as RawMateri[]);

        return NextResponse.json({ success: true, data: result });
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            return Response.json({ success: false, error: err.issues }, { status: 400 });
        }
        return NextResponse.json({ success: false, data: err.message }, { status: 400 });
    }
}

const QuizSchema = z.object({
    mapel_id: z.string().min(1, "ID mata pelajaran tidak boleh kosong"),
    nama_quiz: z.string().min(1, "Nama quiz tidak boleh kosong"),
    deadline_quiz: z.string().min(1, "Deadline tidak boleh kosong"),
    time: z.int().min(1, "Waktu quiz tidak boleh kosong"),
})

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

type InfoQuizReq = z.infer<typeof QuizSchema>

type QuizReq = {
    info: InfoQuizReq,
    soal: SoalReq[],
}

export async function POST(req: Request) {
    const conn = await poolDB.getConnection()
    try {
        const payload = await req.json()
        const data: QuizReq = payload;

        let quizRes;
        try {
            const [res] = await conn.execute(`INSERT INTO quiz (mapel_id, nama_quiz, deadline_quiz, time_quiz) VALUES (?,?,?,?,?)`,
                [data.info.mapel_id, data.info.nama_quiz, data.info.deadline_quiz, data.info.time]
            )
            quizRes = res
        } catch (err) {
            throw new Error(`Gagal menambahkan quiz, ${err}`);
        }

        const [rows]: any = await conn.execute("SELECT quiz_id from quiz ORDER BY created_at DESC LIMIT 1")
        const rowData = rows[0]

        const stmt = await conn.prepare(`INSERT INTO quiz_soal (quiz_id, soal, tipe, kunci_jawaban, pilihan_1, pilihan_2, pilihan_3, pilihan_4) VALUES (?,?,?,?,?,?,?,?)`)

        for (const item of data.soal) {
            try {
                const [res] = await stmt.execute([rowData.quiz_id, item.soal, item.tipe, item.kunci_jawaban, item.pilihan_1, item.pilihan_2, item.pilihan_3, item.pilihan_4]);
            } catch(err) {
                throw new Error(`Gagal menambahkan soal, ${err}`)
            }
        }

        await conn.commit()
        return Response.json({ success: true, quizRes })
    } catch (err) {
        await conn.rollback()
        return Response.json({ success: false, error: err })
    } finally {
        await conn.release()
    }
}