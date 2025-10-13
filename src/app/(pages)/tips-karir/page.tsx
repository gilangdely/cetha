"use client"

import Image from "next/image";
import Link from "next/link";

import { ChevronRight, Book, Video, ArrowRight } from "lucide-react";

import illustration from '@/assets/img/illustration-tips-karir.jpg';


export default function TipsKarirPage() {
    return (
        <main className="mx-auto flex w-full max-w-7xl items-center">
            <section>
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
                                Dari tips bikin CV, trik LinkedIn, sampai strategi interview semua ada di blog & video kami untuk bantu kamu siap masuk dunia kerja.
                            </p>
                            <div className="flex gap-4">
                                <div className="px-3 py-2 flex items-center gap-2 bg-primaryBlue rounded-full text-white cursor-pointer"> <Book size={18} /> Artikel</div>
                                <div className="px-3 py-2 flex items-center gap-2 bg-Background rounded-full text-TextSecondary cursor-pointer"> <Video size={18} /> Video</div>
                            </div>
                            <div className="flex w-full gap-2">
                                <input
                                    type="text"
                                    placeholder="Cari artikel atau tips tips keren"
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
                                height={550}
                                draggable={false}
                                src={illustration}
                                alt='illustration'
                            />
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </section>
        </main>
    )
}