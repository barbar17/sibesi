import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

interface UserJwtPayload extends JwtPayload {
  user_id: number;
  username: string;
  nama_user: string;
  kelas_id: number;
  mapel_id: string;
  role: string;
}

// GET User BY ID
export async function POST(req: Request) {
    try {
        const token: string = await req.json();
        
        try {
            const decoded = jwt.verify(token, "sibesi_jwt_token_123") as UserJwtPayload;
    
            const res = {
                user_id: decoded.user_id,
                username: decoded.username, 
                nama_user: decoded.nama_user,
                kelas_id: decoded.kelas_id,
                mapel_id: decoded.mapel_id,
                role: decoded.role,
            }
            
            return NextResponse.json({success: true, data: res});
        } catch (err) {
            return NextResponse.json({ success: false, message: `Invalid token: ${err}`, token: token }, { status: 401 });
        }
    } catch (err) {
        return Response.json({success: false, error: err}, {status: 500})
    }
}