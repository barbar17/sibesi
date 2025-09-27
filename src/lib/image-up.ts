import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_TYPES = ["image/png", "image/jpeg"];

export async function uploadImage(req: NextRequest, folder: string) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            throw new Error(`File tidak ditemukan`)
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            throw new Error("File harus berbentuk PNG atau JPEG")
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filePath = path.join(process.cwd(), `public/${folder}`, file.name);
        await fs.writeFile(filePath, buffer);

        return ({ success: true, url: `/${folder}/${file.name}` });
    } catch (err) {
        throw new Error(`Gagal upload gambar, ${err}`)
    }
}