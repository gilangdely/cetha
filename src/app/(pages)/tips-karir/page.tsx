"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

// Dummy data artikel
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
        description: "Bangun profil LinkedIn profesional dan mudah ditemukan recruiter.",
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

    return (
        <main className="mx-auto flex w-full max-w-7xl items-center">
            <section>
                {/* HERO SECTION */}
                <div className="flex min-h-screen w-full items-center">
                    <div className="flex w-full flex-col-reverse items-center gap-10 px-6 md:flex-row lg:px-0">
                        <div className="flex-1 space-y-4">
                            <nav className="flex items-center gap-2 text-sm">
                                <Link
                                    href="/"
                                    className="text-gray-500 transition-colors hover:text-gray-700"
                                >
                                    Home
                                </Link>
                                <ChevronRight size={16} className="text-gray-400" />
                                <span className="text-accentOrange font-medium">Tips Karir</span>
                            </nav>

                            <h2 className="text-TextPrimary text-4xl font-semibold">
                                Tingkatkan Skill & Pengetahuanmu
                            </h2>
                            <p className="text-TextSecondary mt-3 text-lg">
                                Dari tips bikin CV, trik LinkedIn, sampai strategi interview semua
                                ada di blog & video kami untuk bantu kamu siap masuk dunia kerja.
                            </p>

                            {/* Tabs */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setActiveTab("artikel")}
                                    className={`px-3 py-2 flex items-center gap-2 rounded-full cursor-pointer transition ${activeTab === "artikel"
                                            ? "bg-primaryBlue text-white"
                                            : "bg-Background text-TextSecondary hover:bg-gray-100"
                                        }`}
                                >
                                    <Book size={18} /> Artikel
                                </button>
                                <button
                                    onClick={() => setActiveTab("video")}
                                    className={`px-3 py-2 flex items-center gap-2 rounded-full cursor-pointer transition ${activeTab === "video"
                                            ? "bg-primaryBlue text-white"
                                            : "bg-Background text-TextSecondary hover:bg-gray-100"
                                        }`}
                                >
                                    <Video size={18} /> Video
                                </button>
                            </div>

                            <div className="flex w-full gap-2">
                                <input
                                    type="text"
                                    placeholder="Cari artikel atau tips keren"
                                    className="flex-1 rounded-full border px-4 py-2"
                                />
                                <button className="bg-primaryBlue rounded-full px-2 py-2 font-medium text-white">
                                    <ArrowRight />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1">
                            <Image
                                className="relative"
                                draggable={false}
                                src={illustration}
                                alt="illustration"
                            />
                        </div>
                    </div>
                </div>

                {/* CONTENT SECTION */}
                {activeTab === "artikel" ? (
                    <>
                        {/* ARTICLES */}
                        <div className="mx-auto w-full max-w-7xl px-6 py-6 grid gap-8 md:grid-cols-2">
                            {visibleArticles.map((article) => (
                                <div
                                    key={article.id}
                                    className="overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm transition hover:shadow-md"
                                >
                                    <div className="relative h-80 w-full">
                                        <Image
                                            src={article.img}
                                            alt={article.title}
                                            fill
                                            className="object-cover rounded-t-2xl"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-TextPrimary mb-2 text-lg font-semibold leading-snug line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-TextSecondary mb-4 text-sm leading-relaxed line-clamp-3">
                                            {article.description}
                                        </p>
                                        <Link
                                            href={article.href}
                                            className="inline-flex items-center text-primaryBlue text-sm font-medium hover:underline"
                                        >
                                            Baca artikel
                                            <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mx-auto pt-8 pb-12">
                            <button
                                onClick={handleLoadMore}
                                className="px-4 py-3 bg-primaryBlue text-white flex items-center mx-auto gap-2 rounded-full hover:bg-primaryBlue/90 transition"
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
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* VIDEOS */}
                        <div className="mx-auto w-full max-w-7xl px-6 py-6 grid gap-8 md:grid-cols-2">
                            {allVideos.map((video) => (
                                <div
                                    key={video.id}
                                    className="overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm transition hover:shadow-md"
                                >
                                    <div className="relative h-80 w-full">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.title}
                                            fill
                                            className="object-cover rounded-t-2xl"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <PlayCircle size={48} className="text-white opacity-90" />
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-TextPrimary mb-2 text-lg font-semibold leading-snug line-clamp-2">
                                            {video.title}
                                        </h3>
                                        <p className="text-TextSecondary mb-4 text-sm leading-relaxed line-clamp-3">
                                            {video.description}
                                        </p>
                                        <Link
                                            href={video.href}
                                            className="inline-flex items-center text-primaryBlue text-sm font-medium hover:underline"
                                        >
                                            Tonton Video
                                            <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}
