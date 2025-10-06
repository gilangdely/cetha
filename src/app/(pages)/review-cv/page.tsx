"use client";

import Link from "next/link";
import Image from "next/image";
import UploadCv from "@/components/UploadCV";

import { ChevronRight } from "lucide-react";

import illustration from "@/assets/img/illustration-review-cv.jpg";

export default function ReviewCVPage() {
    return (
        <main className="mx-auto flex w-full max-w-7xl items-center">
            <section>
                {/* Hero Section */}
                <div className="flex min-h-screen w-full items-center">
                    <div className="flex w-full flex-col-reverse items-center gap-10 px-6 md:flex-row lg:px-0">
                        <div className="flex-1 lg:mt-28">
                            <h2 className="text-TextPrimary text-4xl font-semibold">
                                <span className="mb-2 flex items-center gap-1 text-lg">
                                    <Link href="/" className="hover:text-TextPrimary/80 text-gray-500/50 transition-colors">
                                        Home
                                    </Link>
                                    <ChevronRight size={20} className="text-gray-400" />
                                    <span className="text-accentOrange font-medium">Review CV</span>
                                </span>
                                CV Lebih Baik, <span className="text-accentOrange">Peluang Lebih Besar</span>
                            </h2>
                            <p className="text-TextSecondary mt-3 text-lg">Dapatkan feedback otomatis dari AI agar CV kamu makin standout di mata recruiter.</p>
                            <UploadCv />
                        </div>
                        <div className="flex-1">
                            <Image className="relative" draggable={false} src={illustration} alt="illustration review cv" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
