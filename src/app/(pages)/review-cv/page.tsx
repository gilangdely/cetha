"use client";

import Link from "next/link";
import Image from "next/image";

import { ChevronRight } from "lucide-react";

import illustration from "@/assets/img/illustration-review-cv.jpg";
import logo from "@/assets//icons/upload-docs.svg";

export default function ReviewCVPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl items-center">
      <section>
        {/* Hero Section */}
        <div className="flex min-h-screen w-full items-center">
          <div className="flex w-full flex-col-reverse items-center gap-10 px-6 md:flex-row lg:px-0">
            <div className="flex-1">
              <h2 className="text-TextPrimary text-4xl font-semibold">
                <span className="mb-2 flex items-center gap-1 text-lg">
                  <Link
                    href="/"
                    className="hover:text-TextPrimary/80 text-gray-500/50 transition-colors"
                  >
                    Home
                  </Link>
                  <ChevronRight size={20} className="text-gray-400" />
                  <span className="text-accentOrange font-medium">
                    Review CV
                  </span>
                </span>
                CV Lebih Baik, Peluang Lebih Besar
              </h2>
              <p className="text-TextSecondary mt-3 text-lg">
                Dapatkan feedback otomatis dari AI agar CV kamu makin standout
                di mata recruiter. Cetha akan memberikan saran perbaikan,
                memeriksa kesesuaian format, dan menyoroti kelebihanmu sehingga
                CV terlihat lebih profesional dan siap menarik perhatian HR.
              </p>
            </div>
            <div className="flex-1">
              <Image
                className="relative"
                draggable={false}
                src={illustration}
                alt="illustration review cv"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-4xl px-6 py-12">
          <div className="flex h-80 items-center justify-center rounded-2xl border-3 border-dashed border-gray-400">
            <div className="flex flex-col justify-center gap-8">
              <Image src={logo} alt="" className="mx-auto" />
              <h2 className="text-TextPrimary text-center font-medium">
                Seret dan taruh file disini <br /> atau{" "}
                <span className="text-primaryBlue cursor-pointer underline underline-offset-2">
                  Unggah file
                </span>
              </h2>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-TextSecondary text-start font-medium">
              File yang dapat terbaca: DOCS, PDF, HTML, TXT
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl pb-12">
          <div className="flex justify-end">
            <Link
              href={""}
              className="bg-primaryBlue flex items-center gap-1 rounded-full px-4 py-2.5 font-medium text-white"
            >
              Analisis Sekarang <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
