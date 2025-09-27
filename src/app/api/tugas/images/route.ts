import { uploadImage } from "@/lib/image-up";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const res = await uploadImage(req, "tugas")
        
        return Response.json(res)
    } catch (err: any) {
        return Response.json({success: false, error: err.message}, {status: 500})
    }
}