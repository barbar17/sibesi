import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";


// UPLOAD GAMBAR
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), "public/materi", file.name);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ success: true, url: `/materi/${file.name}` });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}