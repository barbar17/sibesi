import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl;

    if (
        pathname.startsWith("/api/login")
    ) {
        return NextResponse.next();
    }

    const token = req.cookies.get("X-CRED")?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "Anda belum login" }, { status: 401 });
    }

    try {
        jwt.verify(token, "sibesi_jwt_token_123");
        return NextResponse.next();
    } catch (err) {
        return NextResponse.json({ success: false, message: `Invalid token: ${err}`, token: token }, { status: 401 });
    }
}

export const config = {
  matcher: ["/api/:path*"],
  runtime: "nodejs",
};