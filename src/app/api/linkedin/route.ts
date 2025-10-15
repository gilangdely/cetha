import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username || username.trim() === "") {
    return NextResponse.json(
      { error: "Parameter 'username' wajib diisi." },
      { status: 400 }
    );
  }

  const apiKeys = process.env.LINKDAPI_KEYS?.split(",").map((k) => k.trim());
  if (!apiKeys || apiKeys.length === 0) {
    return NextResponse.json(
      { error: "API key tidak ditemukan di environment." },
      { status: 500 }
    );
  }

  const randomKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

  try {
    // 1️⃣ Ambil data overview (untuk dapatkan URN)
    const overviewRes = await fetch(
      `https://linkdapi.com/api/v1/profile/overview?username=${username}`,
      {
        headers: { "X-linkdapi-apikey": randomKey },
        cache: "no-store",
      }
    );

    if (!overviewRes.ok) {
      return NextResponse.json(
        { error: `Gagal mengambil data overview (${overviewRes.status}).` },
        { status: overviewRes.status }
      );
    }

    const overviewData = await overviewRes.json();
    const urn = overviewData?.data?.urn;

    if (!urn) {
      return NextResponse.json(
        { error: `URN tidak ditemukan untuk username '${username}'.` },
        { status: 404 }
      );
    }

    // 2️⃣ Ambil data detail profil
    const detailRes = await fetch(
      `https://linkdapi.com/api/v1/profile/details?urn=${urn}`,
      {
        headers: { "X-linkdapi-apikey": randomKey },
        cache: "no-store",
      }
    );

    if (!detailRes.ok) {
      return NextResponse.json(
        { error: `Gagal mengambil data detail (${detailRes.status}).` },
        { status: detailRes.status }
      );
    }

    const detailData = await detailRes.json();

    // 3️⃣ Ambil data experience
    const experienceRes = await fetch(
      `https://linkdapi.com/api/v1/profile/full-experience?urn=${urn}`,
      {
        headers: { "X-linkdapi-apikey": randomKey },
        cache: "no-store",
      }
    );

    if (!experienceRes.ok) {
      return NextResponse.json(
        { error: `Gagal mengambil data pengalaman (${experienceRes.status}).` },
        { status: experienceRes.status }
      );
    }

    const experienceData = await experienceRes.json();

    // 4️⃣ Ambil data education
    const educationRes = await fetch(
      `https://linkdapi.com/api/v1/profile/education?urn=${urn}`,
      {
        headers: { "X-linkdapi-apikey": randomKey },
        cache: "no-store",
      }
    );

    if (!educationRes.ok) {
      return NextResponse.json(
        { error: `Gagal mengambil data pendidikan (${educationRes.status}).` },
        { status: educationRes.status }
      );
    }

    const educationData = await educationRes.json();

    // 5️⃣ Gabungkan semua data jadi satu respons JSON
    return NextResponse.json({
      message: "Data profil lengkap berhasil diambil.",
      overview: overviewData.data,
      details: detailData.data,
      experience: experienceData.data?.experience || [],
      education: educationData.data?.education || [],
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Terjadi kesalahan server: ${error.message}` },
      { status: 500 }
    );
  }
}
