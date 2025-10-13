import { NextRequest, NextResponse } from "next/server";
import { Client, handle_file, upload_files } from "@gradio/client";

// ✅ Validasi file
const validateFile = (file: File | null): string | null => {
  if (!file) return "File tidak ditemukan";
  if (file.type !== "application/pdf") {
    return `Format file tidak didukung: ${file.type}. Harus PDF.`;
  }
  return null;
};

// ✅ URL file di Hugging Face Space kamu
const getFileUrl = (filename: string): string =>
  `https://firmanaziz-jobrecommendation-json.hf.space/gradio_api/file=${filename}`;

// ✅ Endpoint utama
export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    // Validasi dasar
    const validationError = validateFile(file);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Hubungkan ke Hugging Face Space kamu
    const app = await Client.connect("firmanaziz/jobrecommendation-json");
    const root = app.config?.root;
    if (!root) {
      throw new Error("Konfigurasi root tidak ditemukan");
    }

    // Upload file ke Space
    const { files } = await upload_files.call(app, root, [file!]);
    const fileUrl = getFileUrl(files![0]);

    // Panggil fungsi utama di Hugging Face (sesuai `fn=analyze_career_path`)
    const result = await app.predict("/analyze_career_path", [handle_file(fileUrl)]);

    // Kirim hasilnya ke frontend
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("❌ API Upload Error:", error);

    if (error.response?.status === 429) {
      return NextResponse.json(
        { error: "Kuota API telah terlampaui. Silakan coba lagi beberapa saat lagi." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses file." },
      { status: 500 }
    );
  }
};
