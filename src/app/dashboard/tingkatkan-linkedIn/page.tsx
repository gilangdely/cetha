"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ImproveLinkedInDashboard() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  // Fungsi untuk memanggil API backend
  const handleAnalyze = async () => {
    console.log('first')
    setLoading(true);
    setError('');
    setProfile(null);

    // Ekstrak username dari URL jika user menempelkan URL penuh
    const cleanUsername = username
      .trim()
      .replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, "")
      .replace(/\/$/, "");
      if (!cleanUsername) {
        setError("Masukkan username atau URL LinkedIn yang valid.");
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(`/api/linkedin?username=${cleanUsername}`);
        const data = await res.json();
        
        if (!res.ok) {
          setError(data.error || "Gagal mengambil data dari API.");
        } else {
          setProfile(data.data);
        }
      } catch (err) {
      // if (!(err instanceof Error)) return
      setError("Terjadi kesalahan saat memproses permintaan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 md:px-10">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Improve LinkedIn</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section */}
      <div className="mt-6 mb-8">
        <h2 className="text-TextPrimary text-3xl font-semibold">
          Profil <span className="text-accentOrange">LinkedIn Lebih Standout</span>
        </h2>
        <p className="text-TextSecondary mt-2 max-w-2xl text-base">
          Masukkan URL LinkedIn kamu, biarkan AI menganalisis headline, summary,
          dan skill. Dapatkan saran kata kunci dan tips supaya recruiter lebih
          mudah menemukan kamu.
        </p>
      </div>

      {/* Input Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h3 className="text-TextPrimary mb-4 text-xl font-medium">
          Masukkan Profil LinkedIn Kamu
        </h3>
        <p className="text-TextSecondary mb-6 text-sm">
          Tempelkan username atau URL profil LinkedIn kamu, lalu tekan tombol
          untuk mulai analisis.
        </p>

        <div className="flex w-full gap-2">
          <input
            type="text"
            placeholder="Masukan username atau URL profil LinkedIn kamu"
            className="focus:ring-primaryBlue flex-1 rounded-full border px-4 py-3 focus:ring-2 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            // disabled={loading}
            className={`rounded-full px-4 py-3 text-white transition-colors flex items-center justify-center ${
              loading
                ? "bg-primaryBlue/70 cursor-not-allowed"
                : "bg-primaryBlue hover:bg-primaryBlue/90"
            }`}
          >
            {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-300 text-red-700 px-4 py-2">
            {error}
          </div>
        )}

        {/* Hasil Profil */}
        {profile && (
          <div className="mt-6 border-t pt-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Hasil Analisis Profil
            </h4>

            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 overflow-x-auto">
              <pre>{JSON.stringify(profile, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
