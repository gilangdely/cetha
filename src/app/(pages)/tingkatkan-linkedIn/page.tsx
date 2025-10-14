"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { ChevronRight, ArrowRight } from "lucide-react";

import illustration from "@/assets/img/illustration-improve-linkedIn.jpg";
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

export default function ImproveLinkedInPage() {
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
                  />
                  <button className="bg-primaryBlue rounded-full px-3 py-3 font-medium text-white transition-transform hover:scale-105">
                    <ArrowRight />
                  </button>
                </div>
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