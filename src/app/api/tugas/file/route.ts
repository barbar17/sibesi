import { uploadPDF } from "@/lib/pdf-up";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const res = await uploadPDF(req, "tugasPDF")
        
        return Response.json(res)
    } catch (err: any) {
        return Response.json({success: false, error: err.message}, {status: 500})
    }
}