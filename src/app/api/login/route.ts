import poolDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import z from "zod";

const LoginSchema = z.object({
    username: z.string().min(0, "Username tidak boleh kosong"),
    password: z.string().min(0, "Password tidak boleh kosong"),
})

type LoginReq = z.infer<typeof LoginSchema>

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        const dataLogin: LoginReq = LoginSchema.parse(payload)

        const [rows]: any = await poolDB.query("SELECT username, user_id, kelas_id, mapel_id, role, nama_user FROM user WHERE username = ? AND password = ? LIMIT 1", 
            [dataLogin.username, dataLogin.password]);


        if (!rows || rows.length === 0) {
            return NextResponse.json({ success: false, message: "Password atau Username Salah" }, {status: 401});
        }

        const user = rows[0];

        const token = jwt.sign(
            {
                user_id: user.user_id,
                username: user.username, 
                nama_user: user.nama_user,
                kelas_id: user.kelas_id,
                mapel_id: user.mapel_id,
                role: user.role,
            }, "sibesi_jwt_token_123", {expiresIn: "24h"}
        )

        const res = NextResponse.json({success: true, token: token, user: user});

        res.cookies.set("X-CRED", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 60 * 24,
        })

        return res
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            return Response.json({ success: false, error: err.issues }, { status: 400 })
        }
        return NextResponse.json({success: false, error: err.message}, {status: 500})
    }
}