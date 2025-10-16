import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// 🔹 Inisialisasi Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-001",
});

export async function POST(req: Request) {
  try {
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

    const formattedExperience = Array.isArray(experience)
      ? experience
          .slice(0, 3)
          .map(
            (exp: any, i: number) => ({
              title: exp.title || "Tidak diketahui",
              company: exp.companyName || "-",
              duration: exp.duration || "Durasi tidak diketahui",
              description: exp.description || "Tidak ada deskripsi",
            })
          )
      : [];

    const formattedEducation = Array.isArray(education)
      ? education
          .slice(0, 2)
          .map((edu: any, i: number) => ({
            degree: edu.degree || "Tidak diketahui",
            university: edu.university || "-",
            duration: edu.duration || "Durasi tidak diketahui",
          }))
      : [];

    // 🔹 Buat prompt yang meminta format JSON eksplisit
    const prompt = `
Kamu adalah asisten karier profesional. 
Analisis profil LinkedIn berikut dan berikan hasil **dalam format JSON**.

Struktur JSON yang harus dikembalikan:
{
  "skor_keseluruhan": number (0-100),
  "penilaian_per_kategori": {
    "kelengkapan_informasi": number,
    "keterbacaan_dan_format": number,
    "dampak_pengalaman_kerja": number
  },
  "highlights": [
    { "point": string, "explanation": string }
  ],
  "improvements": [
    { "point": string, "explanation": string }
  ],
  "kesimpulan": string
}

Gunakan penilaian objektif dan analisis profesional.

DATA PROFIL:
Nama: ${name}
Headline: ${headline}
About: ${about || "Tidak tersedia"}
Lokasi: ${location || "Tidak tersedia"}
Follower: ${followerCount || 0}
Connections: ${connectionsCount || 0}

PENGALAMAN KERJA:
${JSON.stringify(formattedExperience, null, 2)}

PENDIDIKAN:
${JSON.stringify(formattedEducation, null, 2)}

Jawab hanya dengan JSON valid.
`;

    // 🔹 Panggil model Gemini
    const result = await model.generateContent(prompt);
    const text = result?.response?.text() || "{}";

    // 🔹 Bersihkan hasil agar bisa di-parse JSON
    const cleanJson = text.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (e) {
      console.warn("⚠️ Hasil bukan JSON valid, fallback ke teks.");
      parsed = { rawText: text };
    }

    return NextResponse.json({
      success: true,
      message: "Analisis berhasil dilakukan.",
      result: parsed,
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
