"use client";

import { useState } from "react";

interface JobResult {
  jabatan_ideal: string;
  alasan_kecocokan: string[];
  deskripsi_pekerjaan: string[];
  potensi_karir: string[];
  kisaran_gaji: {
    junior: string;
    mid_level: string;
    senior: string;
  };
  kelebihan_tambahan: string[];
  tautan_pencarian: {
    LinkedIn: string;
    JobStreet: string;
    Glints: string;
    Indeed: string;
    "Google Jobs": string;
  };
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<JobResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) {
      setError("Silakan pilih file PDF terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/jobrecommend", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("🔍 Respons dari API:", data);

      if (!res.ok) {
        throw new Error(data.error || "Terjadi kesalahan pada server.");
      }

      const hasil = data.result?.data?.[0];
      if (!hasil) throw new Error("Data hasil tidak ditemukan.");

      setResult(hasil);
    } catch (err: any) {
      console.error("❌ Error frontend:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col mt-20 items-center">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
          🔍 Analisis CV & Rekomendasi Karier
        </h1>

        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`px-4 py-2 rounded text-white font-medium ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Menganalisis..." : "Upload & Analisis CV"}
          </button>

          {error && (
            <p className="text-red-500 font-medium mt-2">{error}</p>
          )}
        </div>

        {/* Hasil */}
        {result && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-blue-700">
              💼 {result.jabatan_ideal}
            </h2>

            {result.alasan_kecocokan && (
              <section>
                <h3 className="font-semibold mb-1">Alasan Kecocokan:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {result.alasan_kecocokan.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </section>
            )}

            {result.deskripsi_pekerjaan && (
              <section>
                <h3 className="font-semibold mb-1">Deskripsi Pekerjaan:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {result.deskripsi_pekerjaan.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </section>
            )}

            {result.potensi_karir && (
              <section>
                <h3 className="font-semibold mb-1">Potensi Karir:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {result.potensi_karir.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </section>
            )}

            {result.kisaran_gaji && (
              <section>
                <h3 className="font-semibold mb-1">Kisaran Gaji:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Junior: {result.kisaran_gaji.junior}</li>
                  <li>Mid-Level: {result.kisaran_gaji.mid_level}</li>
                  <li>Senior: {result.kisaran_gaji.senior}</li>
                </ul>
              </section>
            )}

            {result.kelebihan_tambahan && (
              <section>
                <h3 className="font-semibold mb-1">Kelebihan Tambahan:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {result.kelebihan_tambahan.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </section>
            )}

            {result.tautan_pencarian && (
              <section>
                <h3 className="font-semibold mb-1">Tautan Pencarian Pekerjaan:</h3>
                <ul className="list-disc list-inside text-blue-600 space-y-1">
                  {Object.entries(result.tautan_pencarian).map(([nama, url]) => (
                    <li key={nama}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {nama}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
