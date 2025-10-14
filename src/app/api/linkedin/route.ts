import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  // Validasi input: username wajib diisi
  if (!username || username.trim() === "") {
    return NextResponse.json(
      { error: "Parameter 'username' wajib diisi." },
      { status: 400 }
    );
  }

  // Ambil semua API key dari environment dan ubah ke array
  const apiKeys = process.env.LINKDAPI_KEYS?.split(",").map((k) => k.trim());
  if (!apiKeys || apiKeys.length === 0) {
    return NextResponse.json(
      { error: "API key tidak ditemukan di environment." },
      { status: 500 }
    );
  }

  // Pilih salah satu API key secara acak
  const randomKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

  try {
    const res = await fetch(
      `https://linkdapi.com/api/v1/profile/overview?username=${username}`,
      {
        headers: {
          "X-linkdapi-apikey": randomKey,
        },
        cache: "no-store",
      }
    );

    // Jika API mengembalikan 404 atau error lainnya
    if (res.status === 404) {
      return NextResponse.json(
        { error: `Profil dengan username '${username}' tidak ditemukan.` },
        { status: 404 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          error: `Gagal mengambil data dari LinkdAPI (status: ${res.status}).`,
        },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Validasi respons kosong
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: `Data profil untuk '${username}' tidak tersedia.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Data profil berhasil diambil.",
      data,
    });
  } catch (error) {
    if (!(error instanceof Error)) return 
    return NextResponse.json(
      { error: `Terjadi kesalahan pada server: ${error.message}` },
      { status: 500 }
    );
  }
}
