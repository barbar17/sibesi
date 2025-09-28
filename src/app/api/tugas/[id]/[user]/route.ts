import poolDB from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string, user: string }> }) {
    try {
        const {id, user} = await params;

        const [rows]: any = await poolDB.query("SELECT status_deadline, file_url, nilai, catatan, created_at FROM tugas_detail WHERE tugas_id = ? AND user_id = ?", [id, user]);

        if(!rows || rows.length === 0) {
            return Response.json({success: false, error: "Anda belum mengumpulkan tugas"}, {status: 404})
        }

        const data = rows[0]
        return Response.json({success: true, data: data})
    } catch (err) {
        return Response.json({success: false, error: err}, {status: 500})
    }
}