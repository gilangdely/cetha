"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

import icons1 from "@/assets/icons/pencils-quils.svg";
import icons2 from "@/assets/icons/human-resources.svg";
import icons3 from "@/assets/icons/jobs-search.svg";

const Cards = [
  {
    id: 1,
    image: icons1,
    title: "Review CV Instan",
    description:
      "Upload CV kamu, biarkan AI menganalisis, dan dapatkan saran perbaikan agar CV lebih menarik dan lolos ATS.",
    link: "/review-cv",
  },
  {
    id: 2,
    image: icons2,
    title: "Profil LinkedIn Lebih Standout",
    description:
      "Dapatkan masukan untuk headline, summary, dan skill agar lebih mudah ditemukan recruiter.",
    link: "/improve-linkedIn",
  },
  {
    id: 3,
    image: icons3,
    title: "Lowongan yang Tepat untuk Kamu",
    description:
      "AI mencarikan pekerjaan sesuai skill, pengalaman, dan lokasi. Jadi kamu hanya lihat lowongan yang relevan.",
    link: "/review-cv",
  },
];

const AdventagesSection = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-12">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col items-center text-center"
      >
        <div className="border-primaryBlue rounded-full border-2 px-2 py-1 lg:px-3 lg:py-1.5">
          <p className="text-primaryBlue lg:font-medium">Kenapa Cetha</p>
        </div>
        <div className="mt-4 max-w-3xl flex-col text-center">
          <h2 className="text-TextPrimary text-2xl font-semibold md:text-4xl lg:text-3xl">
            Cara Pintar Untuk Mencapai Karier <br className="hidden md:block" />{" "}
            Impianmu
          </h2>
          <p className="text-TextSecondary mt-2 text-base lg:text-lg">
            Cetha bantu kamu bikin CV standout, optimalkan profil LinkedIn, dan
            dapatkan rekomendasi kerja sesuai skill semuanya di satu platform.
          </p>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="mt-10 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Cards.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: idx * 0.2, // kasih efek stagger manual
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex h-full flex-col justify-between rounded-xl border border-gray-300 bg-white p-6 text-start shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <Image
                src={card.image}
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
            <Link
              href={card.link}
              className="group hover:border-primaryBlue mt-4 inline-flex w-fit items-center gap-2 border-b-2 border-transparent font-medium"
            >
              <span className="text-primaryBlue">Coba sekarang</span>
              <MoveRight size={20} className="text-primaryBlue" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdventagesSection;
