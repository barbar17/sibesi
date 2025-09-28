import fs from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";

const ALLOWED_TYPES = ["application/pdf"];

export async function uploadPDF(req: NextRequest, folder: string) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            throw new Error(`File tidak ditemukan`)
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            throw new Error("File harus berbentuk PDF")
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