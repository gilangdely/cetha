// filepath: d:\Projectan\cetha\src\app\api\generate-target\route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini model (same key usage as other AI endpoints)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

/**
 * POST /api/generate-target
 * Body: { title: string; count?: number }
 * Returns AI-generated task checklist JSON for the given career target title.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, count = 6 } = body || {};

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { success: false, message: "Parameter 'title' wajib diisi." },
        { status: 400 },
      );
    }

    const safeCount = Math.min(Math.max(Number(count) || 6, 3), 12); // clamp 3..12

    const prompt = `Anda adalah asisten pengembangan karir profesional.
Buat daftar langkah/tugas terstruktur untuk mencapai target karir berikut.
Target Karir: "${title}".
Jumlah tugas yang diinginkan: ${safeCount}.

FORMAT JSON WAJIB (tanpa teks tambahan, tanpa markdown fences) hanya seperti ini:
{
  "tasks": [
    { "id": number, "label": string, "checked": false }
  ],
  "summary": string
}

Aturan:
- Urutkan tugas dari pondasi ke level lanjut.
- Gunakan bahasa Indonesia lugas, maksimal 120 karakter per label.
- ID berurutan mulai dari 1.
- Tidak ada field lain.
- Tidak ada teks di luar JSON.
Jawab hanya JSON valid.`;

    const result = await model.generateContent(prompt);
    const raw = result?.response?.text() || "{}";
    const cleaned = raw.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      parsed = { tasks: [], summary: "Gagal parse JSON AI", raw: raw };
    }

    // Normalisasi ke struktur edit-target-karir
    const normalizedTasks = Array.isArray(parsed.tasks)
      ? parsed.tasks.map((t: any, idx: number) => ({
          id: typeof t.id === "number" ? t.id : idx + 1,
          label: t.label || `Tugas ${idx + 1}`,
          checked: false,
        }))
      : [];

    const summary = typeof parsed.summary === "string" ? parsed.summary : "";

    return NextResponse.json({
      success: true,
      title,
      count: normalizedTasks.length,
      result: { tasks: normalizedTasks, summary },
    });
  } catch (error: any) {
    console.error("❌ Error /api/generate-target:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat generate task.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export function GET() {
  // Simple health/info endpoint
  return NextResponse.json({
    endpoint: "generate-target",
    model: "gemini-2.0-flash-001",
    status: "ok",
  });
}
