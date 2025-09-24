"use client";

import Link from "next/link";
import Image from "next/image";

import { ChevronRight } from "lucide-react";

import illustration from "@/assets/img/illustration-linkedIn-standout.png";
import pen from "@/assets/icons/pen.svg";
import streamLine from "@/assets/icons/list-edit-streamline.svg";
import maskHappy from "@/assets/icons/mask-happy.svg";

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
                    Improve Profile LinkedIn
                  </span>
                </span>
                Profil LinkedIn Lebih Standout
              </h2>
              <p className="text-TextSecondary mt-3 text-lg">
                Masukkan URL LinkedIn kamu, biarkan AI menganalisis headline,
                summary, dan skill. Dapatkan saran kata kunci dan tips supaya
                recruiter lebih mudah menemukan kamu.
              </p>
            </div>
            <div className="flex-1">
              <Image
                className="relative lg:h-140 lg:w-140"
                draggable={false}
                src={illustration}
                alt="illustration review cv"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto h-80 w-full max-w-7xl px-6">
          <h2 className="text-TextPrimary mb-2 font-medium">
            Masukan URL profil LinkedIn Kamu
          </h2>
          <div className="flex w-full gap-2">
            <input
              type="text"
              placeholder="Masukan username atau URL profil LinkedIn kamu"
              className="flex-1 rounded-full border px-4 py-3"
            />
            <Link
              href={""}
              className="bg-primaryBlue rounded-full px-4 py-3 font-medium text-white"
            >
              Review Sekarang
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center text-center">
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
              {cards.map((card) => (
                <div
                  key={card.id}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
