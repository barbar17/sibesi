import poolDB from "@/lib/db";

// DELETE KELAS MAPEL
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const conn = await poolDB.getConnection()
    try {        
        const {id} = await params;

        await conn.beginTransaction();

        try {
            const [res] = await conn.execute("DELETE FROM kelas_mapel WHERE id = ?", [id])
        } catch (err) {
            throw new Error(`Gagal menghapus kelas, ${err}`)
        }

        conn.commit()
        return Response.json({ success: true })
    } catch (err: any) {
        conn.rollback()
        return Response.json({ success: false, error: err.message }, { status: 500 })
    } finally {
        conn.release()
    }
}