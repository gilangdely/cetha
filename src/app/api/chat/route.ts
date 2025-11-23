import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API!);

const CETHA_KNOWLEDGE = `
CETHA adalah platform AI karier digital yang memiliki empat fitur utama:
1. AI Review CV: Menganalisis isi CV dan memberi saran profesional.
2. Rekomendasi Pekerjaan: Menyesuaikan peluang kerja berdasarkan kemampuan pengguna.
3. Chatbot Karier: Asisten AI untuk panduan dan konsultasi karier.
4. Artikel Edukasi: Memberikan wawasan dan tips karier terkini.

CETHA fokus pada pengembangan karier digital berbasis AI.
`;

export async function POST(req: Request) {
  try {
    const { message, username } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
Kamu adalah chatbot resmi dari perusahaan CETHA.
Gunakan gaya bicara profesional namun ramah.
Akhiri setiap kalimat dengan nama pengguna.

Berikut informasi resmi perusahaan:
${CETHA_KNOWLEDGE}

Jika pertanyaan user tidak terkait CETHA, jawab:
"Maaf ${username}, aku hanya bisa menjawab hal-hal yang terkait CETHA."

User: ${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "Terjadi kesalahan, coba lagi ya." });
  }
}
