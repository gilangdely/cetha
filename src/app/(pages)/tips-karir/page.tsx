"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Book,
  Video,
  ArrowRight,
  MoveDown,
  MoveUp,
  PlayCircle,
} from "lucide-react";

import illustration from "@/assets/img/illustration-tips-karir.jpg";
import article1 from "@/assets/img/article1.jpg";
import article2 from "@/assets/img/article2.jpg";
import article3 from "@/assets/img/article3.jpg";
import article4 from "@/assets/img/article4.jpg";

const allArticles = [
  {
    id: 1,
    img: article1,
    title: "5 Kesalahan Umum Saat Interview dan Cara Menghindarinya",
    description:
      "Pertanyaan ini gampang tapi tricky! Simak cara bikin jawaban yang singkat, menarik, dan bikin HR ingat sama kamu.",
    href: "#",
  },
  {
    id: 2,
    img: article2,
    title: "Bahasa Tubuh yang Menentukan Kesuksesan Interview",
    description:
      "Bukan cuma kata-kata, gesture dan ekspresi kamu juga penting. Pelajari bahasa tubuh yang bikin kamu terlihat profesional.",
    href: "#",
  },
  {
    id: 3,
    img: article3,
    title: "Cara Menulis CV Profesional yang Bikin HR Langsung Tertarik",
    description:
      "Pelajari format, kata kunci, dan trik menulis CV yang menarik perhatian perusahaan dalam hitungan detik.",
    href: "#",
  },
  {
    id: 4,
    img: article4,
    title: "Tips Membangun Personal Branding di LinkedIn",
    description:
      "Bangun reputasi profesional kamu di LinkedIn dengan strategi yang tepat agar dilirik oleh recruiter.",
    href: "#",
  },
];

// Dummy data video
const allVideos = [
  {
    id: 1,
    title: "Cara Jawab Pertanyaan HR dengan Efektif",
    description: "Simak tips biar jawabanmu saat interview bikin HR terkesan.",
    thumbnail: article2,
    href: "#",
  },
  {
    id: 2,
    title: "Personal Branding di LinkedIn untuk Pemula",
    description:
      "Bangun profil LinkedIn profesional dan mudah ditemukan recruiter.",
    thumbnail: article4,
    href: "#",
  },
];

export default function TipsKarirPage() {
  const [visibleCount, setVisibleCount] = useState(2);
  const [activeTab, setActiveTab] = useState<"artikel" | "video">("artikel");
  const initialVisible = 2;

  const visibleArticles = allArticles.slice(0, visibleCount);
  const isAllVisible = visibleCount >= allArticles.length;

  const handleLoadMore = () => {
    if (visibleCount < allArticles.length) {
      setVisibleCount(allArticles.length);
    } else {
      setVisibleCount(initialVisible);
    }
  };

  const handleTabChange = (tab: "artikel" | "video") => {
    setActiveTab(tab);
    setVisibleCount(initialVisible);
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl items-center pt-20 lg:pt-0">
      <section className="w-full">
        {/* HERO SECTION */}
        <div className="flex w-full items-center py-12 lg:min-h-screen lg:py-0">
          <div className="flex w-full items-center gap-10 px-6 lg:px-0">
            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex-1 space-y-4"
            >
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="hidden items-center gap-2 text-sm lg:flex"
              >
                <Link
                  href="/"
                  className="text-gray-500 transition-colors hover:text-gray-700"
                >
                  Home
                </Link>
                <ChevronRight size={16} className="text-gray-400" />
                <span className="text-accentOrange font-medium">
                  Tips Karir
                </span>
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-TextPrimary text-2xl font-semibold md:text-3xl lg:text-4xl"
              >
                Tingkatkan Skill & Pengetahuanmu
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-TextSecondary mt-3 text-lg"
              >
                Dari tips bikin CV, trik LinkedIn, sampai strategi interview
                semua ada di blog & video kami untuk bantu kamu siap masuk dunia
                kerja.
              </motion.p>

              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="flex gap-4"
              >
                <button
                  onClick={() => handleTabChange("artikel")}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 transition ${activeTab === "artikel"
                      ? "bg-primaryBlue text-white"
                      : "bg-Background text-TextSecondary hover:bg-gray-100"
                    }`}
                >
                  <Book size={18} /> Artikel
                </button>
                <button
                  onClick={() => handleTabChange("video")}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 transition ${activeTab === "video"
                      ? "bg-primaryBlue text-white"
                      : "bg-Background text-TextSecondary hover:bg-gray-100"
                    }`}
                >
                  <Video size={18} /> Video
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="flex w-full gap-2"
              >
                <input
                  type="text"
                  placeholder="Cari artikel atau tips keren"
                  className="flex-1 rounded-full border px-4 py-2"
                />
                <button className="bg-primaryBlue rounded-full px-2 py-2 font-medium text-white transition-transform hover:scale-105">
                  <ArrowRight />
                </button>
              </motion.div>
            </motion.div>

            {/* Illustration - Hidden below lg */}
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
                alt="illustration tips karir"
              />
            </motion.div>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <AnimatePresence mode="wait">
          {activeTab === "artikel" ? (
            <motion.div
              key="artikel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* ARTICLES */}
              <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-6 md:grid-cols-2">
                {visibleArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="relative h-80 w-full">
                      <Image
                        src={article.img}
                        alt={article.title}
                        fill
                        className="rounded-t-2xl object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-TextPrimary mb-2 line-clamp-2 text-lg leading-snug font-semibold">
                        {article.title}
                      </h3>
                      <p className="text-TextSecondary mb-4 line-clamp-3 text-sm leading-relaxed">
                        {article.description}
                      </p>
                      <Link
                        href={article.href}
                        className="text-primaryBlue inline-flex items-center text-sm font-medium hover:underline"
                      >
                        Baca artikel
                        <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mx-auto pt-8 pb-12">
                <motion.button
                  onClick={handleLoadMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primaryBlue hover:bg-primaryBlue/90 mx-auto flex items-center gap-2 rounded-full px-4 py-3 text-white transition"
                >
                  {isAllVisible ? (
                    <>
                      <MoveUp size={16} /> Tampilkan Lebih Sedikit
                    </>
                  ) : (
                    <>
                      <MoveDown size={16} /> Muat Lebih Banyak
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* VIDEOS */}
              <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-6 md:grid-cols-2">
                {allVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="relative h-80 w-full">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="rounded-t-2xl object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <PlayCircle
                          size={48}
                          className="text-white opacity-90"
                        />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-TextPrimary mb-2 line-clamp-2 text-lg leading-snug font-semibold">
                        {video.title}
                      </h3>
                      <p className="text-TextSecondary mb-4 line-clamp-3 text-sm leading-relaxed">
                        {video.description}
                      </p>
                      <Link
                        href={video.href}
                        className="text-primaryBlue inline-flex items-center text-sm font-medium hover:underline"
                      >
                        Tonton Video
                        <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
