"use client";

import UploadJobs from "@/components/upload-jobs";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import illustration from "@/assets/img/illustration-rekomendasi-pekerjaan.jpg";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl items-center pt-20 lg:pt-0">
      <section className="w-full">
        {/* Hero Section */}
        <div className="flex w-full items-center py-12 lg:min-h-screen lg:py-0">
          <div className="flex w-full items-center gap-10 px-6 lg:flex-row lg:px-0">
            <div className="w-full flex-1 lg:mt-24">
              <h2 className="text-TextPrimary text-2xl font-semibold md:text-3xl lg:text-4xl">
                <span className="mb-2 hidden items-center gap-1 text-sm lg:flex">
                  <Link
                    href="/"
                    className="hover:text-TextPrimary/80 text-gray-500/50 transition-colors"
                  >
                    Home
                  </Link>
                  <ChevronRight size={16} className="text-gray-400" />
                  <span className="text-accentOrange font-medium">
                    Rekomendasi Pekerjaan
                  </span>
                </span>
                Temukan{" "}
                <span className="text-accentOrange">Pekerjaan yang Tepat</span>{" "}
                untukmu
              </h2>
              <p className="text-TextSecondary mt-3 text-lg">
                Dapatkan rekomendasi pekerjaan yang paling sesuai dengan
                keahlian dan pengalamanmu, langsung dari analisis CV kamu.
              </p>
              <div>
                <UploadJobs />
              </div>
            </div>
            <div className="hidden flex-1 lg:block">
              <Image alt="illustration" src={illustration}></Image>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
