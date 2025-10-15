import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// 🔹 Inisialisasi Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-001",
});

export async function POST(req: Request) {
  try {
    // 🔹 Ambil data dari request body
    const body = await req.json();
    const {
      name,
      headline,
      about,
      location,
      followerCount,
      connectionsCount,
      experience,
      education,
    } = body;

    // 🔹 Validasi input minimal
    if (!name || !headline) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Data profil tidak lengkap (minimal nama dan headline diperlukan).",
        },
        { status: 400 }
      );
    }

    // 🔹 Susun bagian pengalaman (max 3 pengalaman terbaru biar efisien)
    const formattedExperience = Array.isArray(experience)
      ? experience
          .slice(0, 3)
          .map(
            (exp: any, i: number) =>
              `${i + 1}. ${exp.title || "Tidak diketahui"} di ${
                exp.companyName || "-"
              } (${exp.duration || "Durasi tidak diketahui"})
Deskripsi: ${exp.description || "Tidak ada deskripsi."}`
          )
          .join("\n\n")
      : "Tidak ada data pengalaman.";

    // 🔹 Susun bagian pendidikan (max 2 pendidikan terakhir)
    const formattedEducation = Array.isArray(education)
      ? education
          .slice(0, 2)
          .map(
            (edu: any, i: number) =>
              `${i + 1}. ${edu.degree || "Tidak diketahui"} di ${
                edu.university || "-"
              } (${edu.duration || "Durasi tidak diketahui"})`
          )
          .join("\n")
      : "Tidak ada data pendidikan.";

    // 🔹 Buat prompt analisis lengkap
    const prompt = `
Kamu adalah asisten karier profesional.
Analisis profil LinkedIn berikut dan berikan insight singkat:
1️⃣ 3 kekuatan utama dari profil ini.
2️⃣ 3 area perbaikan yang direkomendasikan.
3️⃣ Kesimpulan umum tentang kesesuaian profil ini untuk karier profesional.

DATA PROFIL:
Nama: ${name}
Headline: ${headline}
About: ${about || "Tidak tersedia"}
Lokasi: ${location || "Tidak tersedia"}
Follower: ${followerCount || 0}
Connections: ${connectionsCount || 0}

PENGALAMAN KERJA:
${formattedExperience}

PENDIDIKAN:
${formattedEducation}
`;

    // 🔹 Panggil API Gemini
    const result = await model.generateContent(prompt);
    const output = result?.response?.text() || "Tidak ada hasil dari Gemini.";

    // 🔹 Kembalikan hasil analisis ke frontend
    return NextResponse.json({
      success: true,
      message: "Analisis berhasil dilakukan.",
      result: output,
    });
  } catch (error: any) {
    console.error("❌ Error in /api/linkedin/review:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
