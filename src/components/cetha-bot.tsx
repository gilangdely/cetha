"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BotMessageSquare, MoveRight, ChevronRight, EllipsisVertical, ArrowLeft } from "lucide-react";
import { auth } from "@/app/lib/firebase";

import Favicon from "@/assets/icons/favicon-white.svg"
import ChatCethaBot from "./chat-cetha-bot";
import WhatIsCetha from "./what-is-cetha";
import HowCethaWorks from "./how-cetha-works";
import HowUseCetha from "./how-use-cetha";

const FAQs = [
    {
        id: 1,
        faq: "Apa itu Cetha?",
        page: "what-is-cetha",
    },
    {
        id: 2,
        faq: "Bagaimana cara kerja Cetha?",
        page: "how-cetha-works",
    },
    {
        id: 3,
        faq: "Cara pakai Cetha?",
        page: "how-use-cetha",
    },
];


export default function CethaBot() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [showChat, setShowChat] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [activePage, setActivePage] = useState('home');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.displayName) {
                setUsername(user.displayName);
            } else {
                setUsername(null);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setShowChat(false);
            setShowMenu(false);
            setActivePage('home');
        }
    }, [isOpen]);

    useEffect(() => {
        if (!showChat) setShowMenu(false);
    }, [showChat]);

    const handleFAQClick = (page: string) => {
        if (page) setActivePage(page);
    };

    const handleBackToHome = () => {
        setActivePage('home');
        setShowChat(false);
    };

    if (!username) return null;

    return (
        <div className="fixed right-8 bottom-8 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mb-3 w-90 h-120 overflow-hidden rounded-2xl bg-Background shadow-2xl"
                    >
                        {/* Header */}
                        {(showChat ||
                            activePage === "what-is-cetha" ||
                            activePage === "how-cetha-works" ||
                            activePage === "how-use-cetha") && (
                                <div className="relative">
                                    <div className="flex items-center justify-between px-4 py-3 bg-white text-sm text-TextPrimary border-b border-gray-200">
                                        {/* Kiri: Tombol Kembali + Info */}
                                        <div className="flex items-center gap-2">
                                            <Image src={Favicon} alt="Icon" className="h-12 w-12" />
                                            <div className="flex-col">
                                                <h2 className="text-sm font-semibold">
                                                    {activePage === "what-is-cetha"
                                                        ? "Apa itu Cetha?"
                                                        : activePage === "how-cetha-works"
                                                            ? "Bagaimana Cetha Bekerja?"
                                                            : activePage === "how-use-cetha"
                                                                ? "Cara Menggunakan Cetha"
                                                                : "CethaBot"}
                                                </h2>
                                                <p className="text-xs text-gray-500">
                                                    {activePage === "what-is-cetha"
                                                        ? "Pelajari tentang Cetha secara singkat."
                                                        : activePage === "how-cetha-works"
                                                            ? "Lihat cara kerja dan teknologi di balik Cetha."
                                                            : activePage === "how-use-cetha"
                                                                ? "Panduan langkah Cetha"
                                                                : "Cetha sedang aktif nih!"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Ellipsis */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowMenu((prev) => !prev)}
                                                className="p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <EllipsisVertical size={20} />
                                            </button>

                                            {showMenu && (
                                                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                    <button
                                                        onClick={() => {
                                                            handleBackToHome();
                                                            setShowMenu(false);
                                                        }}
                                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                    >
                                                        Kembali
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            setShowMenu(false);
                                                            setShowChat(false);
                                                        }}
                                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                                                    >
                                                        Tutup
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                        {/* Content Area */}
                        {activePage === 'home' && !showChat ? (
                            <div className="flex flex-col items-center justify-between px-4 py-3 text-TextPrimary">
                                <div className="space-y-3">
                                    <Image src={Favicon} className="h-15 w-15" alt="Logo Cetha" />
                                    <div>
                                        <h2 className="text-xl font-semibold">Hallo {username}!</h2>
                                        <p className="mt-2 text-sm text-TextSecondary">Terimakasih sudah menggunakan platform Cetha ada yang bisa kami bantu untuk meningkatkan cv kamu?</p>
                                    </div>
                                    <div className="border p-2.5 rounded-xl text-sm space-y-1.5 bg-white border-gray-200 shadow-sm">
                                        <h2 className="text-TextPrimary font-semibold text-base">Bot kami sedang online loh!</h2>
                                        <p className="text-TextSecondary font-medium">Ingin bertanya seputar cv dan karir?</p>
                                        <button onClick={() => setShowChat(true)} className="mt-4 flex gap-2 items-center text-primaryBlue font-semibold cursor-pointer group hover:border-primaryBlue w-fit border-b-2 border-transparent">Mulai bertanya <MoveRight size={16} /></button>
                                    </div>
                                    <div className="border p-2.5 rounded-xl text-sm space-y-1.5 bg-white border-gray-200 shadow-sm">
                                        <h2 className="text-TextPrimary font-semibold text-base">Pertanyaan populer</h2>
                                        <div className="mt-4 space-y-3 w-full">
                                            {FAQs.map((faq) => (
                                                <button
                                                    key={faq.id}
                                                    onClick={() => faq.page && handleFAQClick(faq.page)}
                                                    className="flex items-center justify-between w-full text-TextSecondary font-semibold cursor-pointer group hover:text-TextPrimary"
                                                >
                                                    <span className="border-b-2 border-transparent group-hover:border-TextPrimary transition">
                                                        {faq.faq}
                                                    </span>
                                                    <ChevronRight
                                                        size={16}
                                                        className="text-TextSecondary group-hover:text-TextPrimary transition"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : activePage === 'what-is-cetha' ? (
                            <WhatIsCetha />
                        ) : activePage === 'how-cetha-works' ? (
                            <HowCethaWorks />
                        ) : activePage === 'how-use-cetha' ? (
                            <HowUseCetha />
                        ) : (
                            <ChatCethaBot />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-18 w-18 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"
            >
                <BotMessageSquare size={35} className="-scale-x-100 transform" />
            </motion.button>
        </div>
    );
}