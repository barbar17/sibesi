import poolDB from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const [rows] = await poolDB.query("SELECT nama_kelas, jumlah_siswa FROM kelas WHERE kelas_id = ?", [params.id]);

        if ((rows as any[]).length === 0) {
            return Response.json({ success: false, error: `Kelas tidak ditemukan` }, { status: 404 })
        }

        return Response.json({ success: true, data: rows });
    } catch (err: any) {
        return Response.json({ success: false, error: err.message }, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const conn = await poolDB.getConnection()
    try {
        const {id} = await params

        const url = new URL(req.url);
        const user = url.searchParams.get("user");

        await conn.beginTransaction();

        let deleteKelasRes;
        try {
            const [res] = await conn.execute("DELETE FROM kelas WHERE kelas_id = ?", [id])
            deleteKelasRes = res;
        } catch (err) {
            throw new Error(`Gagal menghapus kelas, ${err}`)
        }

        let logRes;
        try {
            const [res] = await conn.execute("INSERT INTO log (user, keterangan) VALUES (?, ?)", [user, `Menghapus kelas ${id}`]);
            logRes = res;
        } catch (err) {
            throw new Error(`Logging gagal, ${err}`)
        }

        return Response.json({ success: true, deleteKelasRes, logRes })
    } catch (err: any) {
        conn.rollback()
        return Response.json({ success: false, error: err.message }, { status: 500 })
    } finally {
        conn.release()
    }
}