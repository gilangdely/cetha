"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Book,
    Video,
    MoveDown,
    MoveUp,
    ArrowRight,
    PlayCircle,
} from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

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

export default function TipsKarirDashboard() {
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
        <div className="w-full p-4 md:px-10">
            {/* Breadcrumb */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Artikel & Video</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Header Section */}
            <div className="mt-6 mb-8">
                <h2 className="text-TextPrimary text-3xl font-semibold">
                    Jelajahi{" "}
                    <span className="text-accentOrange">Artikel dan Video Karier</span>
                </h2>
                <p className="text-TextSecondary mt-2 max-w-2xl text-base">
                    Tingkatkan wawasan kariermu dengan berbagai artikel dan video
                    informatif yang membantu kamu menjadi lebih siap menghadapi dunia
                    kerja.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-6">
                <button
                    onClick={() => handleTabChange("artikel")}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${activeTab === "artikel"
                        ? "bg-primaryBlue text-white"
                        : "bg-Background text-TextSecondary hover:bg-gray-100"
                        }`}
                >
                    <Book size={18} /> Artikel
                </button>
                <button
                    onClick={() => handleTabChange("video")}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${activeTab === "video"
                        ? "bg-primaryBlue text-white"
                        : "bg-Background text-TextSecondary hover:bg-gray-100"
                        }`}
                >
                    <Video size={18} /> Video
                </button>
            </div>

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
                        <div className="grid w-full gap-8 md:grid-cols-2">
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
                                    <div className="relative h-60 w-full">
                                        <Image
                                            src={article.img}
                                            alt={article.title}
                                            fill
                                            className="rounded-t-2xl object-cover"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-TextPrimary mb-2 line-clamp-2 text-lg font-semibold">
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

                        <div className="mt-8 flex justify-center">
                            <motion.button
                                onClick={handleLoadMore}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primaryBlue hover:bg-primaryBlue/90 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition"
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
                        <div className="grid w-full gap-8 md:grid-cols-2">
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
                                    <div className="relative h-60 w-full">
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
                                        <h3 className="text-TextPrimary mb-2 line-clamp-2 text-lg font-semibold">
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
        </div>
    );
}
