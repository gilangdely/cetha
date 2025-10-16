// /app/api/chat/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API!);

// Knowledge base internal CETHA
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
Kamu adalah asisten virtual CETHA, platform AI yang membantu pengguna mengembangkan karier digital.
Gaya bicaramu harus terasa alami, seperti ngobrol dengan teman yang paham dunia kerja — santai, ramah, tapi tetap sopan dan profesional.
Hindari gaya robotik atau terlalu baku, dan jangan gunakan tanda seperti bintang (*) atau format markdown apapun.

Gunakan kalimat yang mengalir, tidak terlalu panjang, dan hindari mengulang kata secara berlebihan.
Kalau menyebut nama pengguna (${username}), sebut hanya sekali di bagian yang terasa alami — misalnya di awal atau akhir, jangan di setiap kalimat.

Berikut info resmi tentang CETHA yang bisa kamu jadikan dasar:
${CETHA_KNOWLEDGE}

Kalau pengguna tanya sesuatu di luar topik CETHA, jawab dengan halus dan tetap sopan, contohnya:
"Maaf ya, aku cuma bisa bantu jelasin hal-hal seputar CETHA aja."

Tugasmu adalah menjawab pertanyaan pengguna dengan penjelasan yang enak dibaca dan terasa seperti percakapan manusia.

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
