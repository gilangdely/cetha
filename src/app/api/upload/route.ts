import { NextRequest, NextResponse } from "next/server";
import { Client, handle_file, upload_files } from "@gradio/client";

const validateFile = (file: File | null): string | null => {
    if (!file) return "File tidak ditemukan";
    if (file.type !== "application/pdf") {
        return `Format file tidak didukung: ${file.type}. Harus PDF.`;
    }
    return null;
};

const getFileUrl = (filename: string): string => `https://firmanaziz-cv2.hf.space/gradio_api/file=${filename}`;

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        const validationError = validateFile(file);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        const app = await Client.connect("firmanaziz/CV2");
        const root = app.config?.root;
        if (!root) {
            throw new Error("Konfigurasi root tidak ditemukan");
        }

        const { files } = await upload_files.call(app, root, [file!]);
        const fileUrl = getFileUrl(files![0]);

        const result = await app.predict("/score_cv", [handle_file(fileUrl)]);

        return NextResponse.json({ result });
    } catch (error: any) {
        console.error("❌ API Upload Error:", error);

        if (error.response?.status === 429) {
            return NextResponse.json({ error: "Kuota API telah terlampaui. Silakan coba lagi beberapa saat lagi." }, { status: 429 });
        }

        return NextResponse.json({ error: "Terjadi kesalahan saat memproses file." }, { status: 500 });
    }
};
