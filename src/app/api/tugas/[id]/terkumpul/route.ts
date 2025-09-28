import poolDB from "@/lib/db";

export async function GET(req: Request, {params}: {params: Promise<{id:string}>}) {
    try {
        const {id} = await params;

        const [rows] = await poolDB.query(`SELECT tugas_detail_id, user_id, created_by, status_deadline, file_url, nilai, catatan FROM tugas_detail
            WHERE tugas_id = ?`, [id]);
        
        return Response.json({success: true, data: rows})
    } catch (err) {
        return Response.json({success: false, error: err})
    }
}