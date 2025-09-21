"use client";

import Image from "next/image";
import Link from "next/link";

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
  },
  {
    id: 2,
    image: icons2,
    title: "Profil LinkedIn Lebih Standout",
    description:
      "Dapatkan masukan untuk headline, summary, dan skill agar lebih mudah ditemukan recruiter.",
  },
  {
    id: 3,
    image: icons3,
    title: "Lowongan yang Tepat untuk Kamu",
    description:
      "AI mencarikan pekerjaan sesuai skill, pengalaman, dan lokasi. Jadi kamu hanya lihat lowongan yang relevan.",
  },
];

const AdventagesSection = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-12">
      <div className="flex flex-col items-center text-center">
        <div className="border-primaryBlue rounded-full border-2 px-5 py-2">
          <p className="text-primaryBlue font-medium">Kenapa Cetha</p>
        </div>
        <div className="mt-4 max-w-3xl flex-col text-center">
          <h2 className="text-TextPrimary mt-2 text-3xl font-semibold md:text-4xl">
            Cara Pintar Untuk Mencapai Karier <br className="hidden md:block" />{" "}
            Impianmu
          </h2>
          <p className="text-TextSecondary mt-4 text-lg">
            Cetha bantu kamu bikin CV standout, optimalkan profil LinkedIn, dan
            dapatkan rekomendasi kerja sesuai skill semuanya di satu platform.
          </p>
        </div>
        <div className="mt-10 grid w-full gap-6 md:grid-cols-3">
          {Cards.map((card) => (
            <div
              key={card.id}
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
                href=""
                className="group hover:border-primaryBlue mt-4 inline-flex items-center gap-2 border-b-2  border-transparent w-fit font-medium"
              >
                <span className="text-primaryBlue">Coba sekarang</span>
                <MoveRight
                  size={20}
                  className="text-primaryBlue"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdventagesSection;
