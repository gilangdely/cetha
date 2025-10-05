import { NextRequest, NextResponse } from "next/server";
import { Client, handle_file } from "@gradio/client";

const ALLOWED_TYPE = "application/pdf";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    if (file.type !== ALLOWED_TYPE) {
      return NextResponse.json(
        { error: `Format file tidak didukung: ${file.type}. Harus PDF.` },
        { status: 400 }
      );
    }

    // Connect ke HuggingFace Space
    const app = await Client.connect("firmanaziz/CV2");

    // ✅ Paling aman: gunakan handle_file langsung
    const result = await app.predict("/score_cv", [handle_file(file)]);

    return NextResponse.json({
      success: true,
      message: "File PDF berhasil diproses",
      file: {
        name: file.name,
        type: file.type,
        size: file.size,
      },
      result,
    });
  } catch (error) {
    console.error("❌ API Upload Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses file" },
      { status: 500 }
    );
  }
};
