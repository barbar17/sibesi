import poolDB from "@/lib/db";

type NilaiReq = {
    nilai: Number;
}

export async function POST(req: Request, {params}: {params: Promise<{id:string}>}) {
    const conn = await poolDB.getConnection()
    try {
        const {id} = await params;
        const data: NilaiReq = await req.json();

        if(typeof data.nilai !== "number" || data.nilai < 0) {
            return Response.json({success:false, error: "Nilai yang diinput tidak valid"})
        }

        conn.beginTransaction()

        let nilaiRes;
        try {
            const [res] = await conn.execute("UPDATE tugas_detail SET nilai = ? WHERE tugas_detail_id = ?", [data.nilai, id]);
            nilaiRes = res;
        } catch (err) {
            throw new Error(`Gagal menambahkan nilai, ${err}`)
        }

        await conn.commit()
        return Response.json({success:true, nilaiRes})
    } catch (err: any) {
        await conn.rollback()
        return Response.json({success:false, err: err.message})
    } finally {
        conn.release()
    }
}