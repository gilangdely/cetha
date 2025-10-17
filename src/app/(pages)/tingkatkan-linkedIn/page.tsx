"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronRight, ArrowRight, Loader2, Lock } from "lucide-react";

import illustration from "@/assets/img/illustration-improve-linkedIn.jpg";
import pen from "@/assets/icons/pen.svg";
import streamLine from "@/assets/icons/list-edit-streamline.svg";
import maskHappy from "@/assets/icons/mask-happy.svg";

import LinkedInProfileDisplay from "@/components/linkedin-profile-card";
import LinkedInAnalysisResult from "@/components/linkedin-analysis";

import { auth } from "@/app/lib/firebase";

const cards = [
  {
    id: "1",
    logo: pen,
    title: "Masukkan Link LinkedIn",
    description:
      "Tempelkan URL atau username LinkedIn-mu. AI kami akan memindai profil untuk menemukan bagian yang perlu diperbaiki—headline, ringkasan, pengalaman, dan skill.",
  },
  {
    id: "2",
    logo: streamLine,
    title: "Terima Review Mendalam",
    description:
      "Dapatkan laporan otomatis dengan highlight prioritas, kata kunci yang kurang, dan contoh perbaikan yang bisa langsung kamu salin.",
  },
  {
    id: "3",
    logo: maskHappy,
    title: "Terapkan & Optimalkan",
    description:
      "Ikuti rekomendasi langkah demi langkah (headline, summary, skills, media). Terapkan perubahan dan lihat profilmu jadi lebih mudah ditemukan recruiter.",
  },
];

interface Position {
  companyName: string;
  companyId?: string;
  companyLink?: string;
  companyLogo?: string;
  location?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  duration?: string;
}

interface Experience {
  companyName: string;
  companyId?: string;
  companyLink?: string;
  companyLogo?: string;
  location?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  duration?: string;
  totalDuration?: string;
  isMultiPositions?: boolean;
  positions?: Position[];
}

interface Education {
  duration: string;
  university: string;
  universityLink?: string;
  degree?: string;
  description?: string;
  subDescription?: string;
}

interface Overview {
  fullName: string;
  headline: string;
  profilePictureURL: string;
  backgroundImageURL: string;
  location?: { fullLocation?: string };
  followerCount?: number;
  connectionsCount?: number;
  CurrentPositions?: { name: string; logoURL: string; url: string }[];
}

interface Detail {
  about?: string;
  positions?: Position[];
  featuredPosts?: { postLink: string; postText: string }[];
  languages?: {
    languages: { Language: string; Level: string }[];
  };
}

interface Profile {
  overview: Overview;
  details: Detail;
  experience: Experience[];
  education: Education[];
}

export default function ImproveLinkedInPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [ipAddress, setIpAddress] = useState<string>("");
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Dapatkan IP address dan periksa jumlah percobaan yang tersisa
  useEffect(() => {
    const fetchIpAndCheckLimit = async () => {
      try {
        // Ambil IP address dari API
        const res = await fetch("/api/ip");
        const data = await res.json();
        const ip = data.ip;
        setIpAddress(ip);

        // Periksa jumlah percobaan dari localStorage
        const key = `linkedin-analysis-count-${ip}`;
        const attemptCount = parseInt(localStorage.getItem(key) || "0");
        const remaining = Math.max(0, 3 - attemptCount);
        setAttemptsLeft(remaining);

        // Periksa status login (ganti dengan logika autentikasi yang sebenarnya)
        // Untuk contoh ini diasumsikan user tidak login
        setIsLoggedIn(false);
      } catch (err) {
        console.error("Error fetching IP:", err);
      }
    };

    fetchIpAndCheckLimit();
  }, []);

  useEffect(() => {
    const checkAttempts = async () => {
      try {
        // Ambil IP
        const ipRes = await fetch("/api/ip");
        const ipData = await ipRes.json();
        const ip = ipData.ip;
        setIpAddress(ip);

        // Cek status login (ganti dengan logika auth sebenarnya nanti)
        const user = auth.currentUser; // ← Jika pakai Firebase
        setIsLoggedIn(!!user);

        if (user) {
          // User login → tidak ada batas
          setAttemptsLeft(Infinity);
          return;
        }

        // Untuk user belum login: cek berdasarkan IP
        const key = `linkedin-attempts-${ip}`;
        const count = parseInt(localStorage.getItem(key) || "0");
        const remaining = Math.max(0, 5 - count); // ← ubah jadi 5
        setAttemptsLeft(remaining);
      } catch (err) {
        console.error("Error checking attempts:", err);
        // Jika gagal, anggap user punya 0 percobaan (aman)
        setAttemptsLeft(0);
      }
    };

    checkAttempts();
  }, []);

  const handleAnalyze = async () => {
    if (!isLoggedIn && attemptsLeft <= 0) {
      setError("Kamu sudah mencapai batas maksimal 5 kali analisis. Silakan login untuk melanjutkan.");
      return;
    }

    setLoading(true);
    setError(null);
    setProfile(null);
    setAiResult(null);

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
      if (!isLoggedIn) {
        const newCount = parseInt(localStorage.getItem(`linkedin-attempts-${ipAddress}`) || "0") + 1;
        localStorage.setItem(`linkedin-attempts-${ipAddress}`, String(newCount));
        setAttemptsLeft(Math.max(0, 5 - newCount));
      }

      // 1️⃣ Ambil data LinkedIn lengkap
      const res = await fetch(`/api/linkedin?username=${encodeURIComponent(cleanUsername)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengambil data profil LinkedIn.");

      const { overview, details, experience, education } = data;
      setProfile({ overview, details, experience, education });

      // 2️⃣ Pilih data penting untuk dikirim ke AI
      const selectedData = {
        name: overview?.fullName || "",
        headline: overview?.headline || "",
        about: details?.about || "",
        location: overview?.location?.fullLocation || "",
        followerCount: overview?.followerCount || 0,
        connectionsCount: overview?.connectionsCount || 0,
        education: education?.map((edu: Education) => ({
          university: edu.university,
          degree: edu.degree,
          duration: edu.duration,
          description: edu.description || "",
        })),
        experience: experience?.map((exp: Experience) => ({
          companyName: exp.companyName,
          title: exp.title,
          duration: exp.duration,
          description: exp.description || "",
        })),
      };

      // 3️⃣ Kirim ke API review (AI)
      const aiRes = await fetch("/api/linkedin/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedData),
      });

      const aiData = await aiRes.json();
      if (!aiRes.ok) throw new Error(aiData.message || "Gagal menganalisis dengan AI.");

      // 4️⃣ Simpan hasil AI ke state
      setAiResult(aiData.result);
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat memproses permintaan.");
    } finally {
      setLoading(false);
    }
  };

  // Jika sedang menampilkan hasil analisis
  if (showResults) {
    return (
      <div className="w-full p-4 md:px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setShowResults(false)}
            className="text-primaryBlue hover:underline flex items-center"
          >
            <ChevronRight className="rotate-180 mr-1" size={16} /> Kembali
          </button>
          <h2 className="text-2xl font-semibold">
            Hasil Analisis <span className="text-accentOrange">LinkedIn</span>
          </h2>
        </div>

        {profile && <LinkedInProfileDisplay profile={profile} />}
        {aiResult && (
          <LinkedInAnalysisResult
            result={typeof aiResult === "string" ? JSON.parse(aiResult) : aiResult}
            className="mt-6"
          />
        )}

        {/* Tombol Review Lagi */}
        <div className="flex justify-center mt-10 mb-6">
          <button
            onClick={() => {
              setShowResults(false);
              setUsername("");
              setProfile(null);
              setAiResult(null);
              setError(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-primaryBlue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full flex items-center gap-2 transition-all"
          >
            <ArrowRight className="rotate-180" size={18} />
            Review Profil LinkedIn Lainnya
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl items-center pt-20 lg:pt-0">
      <section className="w-full">
        {/* Hero Section */}
        <div className="flex w-full items-center py-12 lg:min-h-screen lg:py-0">
          <div className="flex w-full items-center gap-10 px-6 lg:flex-row lg:px-0">
            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex-1"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-TextPrimary text-2xl font-semibold text-center lg:text-start md:text-3xl lg:text-4xl"
              >
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                  className="mb-2 hidden items-center gap-1 text-sm lg:flex"
                >
                  <Link
                    href="/"
                    className="hover:text-TextPrimary/80 text-gray-500/50 transition-colors"
                  >
                    Home
                  </Link>
                  <ChevronRight size={16} className="text-gray-400" />
                  <span className="text-accentOrange font-medium">
                    Improve Profile LinkedIn
                  </span>
                </motion.span>
                Profil{" "}
                <span className="text-accentOrange">
                  LinkedIn Lebih Standout
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-TextSecondary mt-3 text-lg text-center lg:text-start"
              >
                Masukkan URL LinkedIn kamu, biarkan AI menganalisis headline,
                summary, dan skill. Dapatkan saran kata kunci dan tips supaya
                recruiter lebih mudah menemukan kamu.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="mx-auto mt-8 w-full"
              >
                <h2 className="text-TextSecondary mb-2 font-medium">
                  Masukan URL profil LinkedIn Kamu
                </h2>
                <div className="flex w-full gap-2">
                  <input
                    type="text"
                    placeholder="Masukan username atau URL profil LinkedIn kamu"
                    className="flex-1 rounded-full border px-4 py-3"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className={`rounded-full px-4 py-3 text-white transition-colors flex items-center justify-center ${loading ? "bg-primaryBlue/70 cursor-not-allowed" : "bg-primaryBlue hover:bg-primaryBlue/90"
                      }`}
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
                  </button>
                </div>
                {error && (
                  <div className="mt-4 rounded-lg bg-red-50 border border-red-300 text-red-700 px-4 py-2">
                    {error}
                  </div>
                )}
                {!isLoggedIn && (
                  <div className="mt-2 text-sm text-gray-600">
                    {attemptsLeft > 0 ? (
                      <span>
                        Kamu punya <span className="font-medium">{attemptsLeft}</span> dari 5 percobaan tersisa.{" "}
                        <Link href="/login" className="text-primaryBlue hover:underline">
                          Login
                        </Link> untuk akses tak terbatas.
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium flex items-center gap-1">
                        <Lock size={16} /> Batas percobaan habis. Silakan login.
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Illustration Section - Hidden below lg */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="hidden flex-1 lg:block"
            >
              <Image
                className="relative"
                draggable={false}
                src={illustration}
                alt="illustration improve linkedin"
              />
            </motion.div>
          </div>
        </div>

        {/* Cara Kerja Section */}
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <div className="border-primaryBlue rounded-full border-2 px-3 py-1.5">
              <p className="text-primaryBlue font-medium">Cara kerja</p>
            </div>

            <div className="mt-2 max-w-3xl flex-col text-center">
              <h2 className="text-TextPrimary text-3xl font-semibold md:text-4xl">
                Cara Pintar untuk Wujudkan Karier{" "}
                <br className="hidden md:block" /> Impianmu
              </h2>
              <p className="text-TextSecondary mt-4 text-lg">
                Cetha membantu kamu membuat CV standout, mengoptimalkan profil
                LinkedIn, dan memberikan rekomendasi lowongan sesuai skill semua
                dalam satu platform.
              </p>
            </div>

            <div className="mt-10 grid w-full gap-6 md:grid-cols-3">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex h-full flex-col justify-between rounded-xl border border-gray-300 bg-white p-6 text-start shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    <Image
                      src={card.logo}
                      alt={card.title}
                      className="mb-4 h-10 w-10"
                    />
                    <h3 className="text-TextPrimary text-lg font-semibold">
                      {card.title}
                    </h3>
                    <p className="text-TextSecondary mt-2 text-sm font-normal">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}