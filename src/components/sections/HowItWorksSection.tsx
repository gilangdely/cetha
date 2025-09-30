"use client";

import Image from "next/image";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { motion } from "framer-motion";

const HowWorks = [
  {
    id: 1,
    title: "Daftar & Buat Profil",
    description:
      "Buat akun gratis dan isi data dasar agar sistem mengenal latar belakang kamu.",
    features: [
      {
        highlight: "Mudah & Cepat.",
        text: "Daftar hanya butuh beberapa klik.",
      },
      {
        highlight: "Profil Terpersonalisasi.",
        text: "Rekomendasi disesuaikan dengan datamu.",
      },
    ],
  },
  {
    id: 2,
    title: "Review CV dengan AI",
    description:
      "Upload CV kamu, AI langsung menganalisis dan beri saran perbaikan agar CV lebih menarik & lolos ATS.",
    features: [
      { highlight: "Analisis otomatis oleh AI.", text: "" },
      { highlight: "Saran perbaikan berbasis data ATS.", text: "" },
    ],
  },
  {
    id: 3,
    title: "Optimalkan Profil LinkedIn",
    description:
      "Masukkan URL LinkedIn kamu dan dapatkan tips untuk headline, summary, dan skill agar profil lebih standout.",
    features: [
      { highlight: "Rekomendasi headline profesional.", text: "" },
      {
        highlight: "Optimasi skill & summary.",
        text: "agar mudah ditemukan recruiter.",
      },
    ],
  },
  {
    id: 4,
    title: "Dapatkan Rekomendasi Pekerjaan",
    description:
      "Lihat rekomendasi lowongan yang cocok dengan skill & pengalamanmu.",
    features: [
      { highlight: "Lowongan hanya yang relevan.", text: "" },
      { highlight: "Personalisasi sesuai lokasi & pengalaman.", text: "" },
    ],
  },
];

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const activeData = HowWorks.find((step) => step.id === activeStep);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto w-full max-w-7xl px-6 py-12"
    >
      {/* Heading */}
      <div className="flex flex-col items-center text-center">
        <div className="border-primaryBlue rounded-full border-2 px-2 py-1 lg:px-3 lg:py-1.5">
          <p className="text-primaryBlue font-medium">Cara Kerja Cetha</p>
        </div>
        <div className="mt-4 flex-col text-center">
          <h2 className="text-TextPrimary text-2xl lg:text-3xl font-semibold md:text-4xl">
            Cara Cetha Bantu Kamu Dapat <br className="hidden md:block" />{" "}
            Kerjaan Impian
          </h2>
          <p className="text-TextSecondary mt-2 max-w-2xl text-base lg:text-lg">
            Ikuti langkah mudah ini untuk optimalkan CV, profil LinkedIn, dan
            temukan lowongan yang paling cocok.
          </p>
        </div>
      </div>

      {/* Active Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 flex flex-col gap-6 md:flex-row"
      >
        <div className="flex h-auto w-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:h-96 md:flex-row">
          <div className="flex-1 flex items-center justify-center">
            {/* <Image src={""} alt=""></Image> */}
          </div>
          {activeData ? (
            <div className="flex-1 mt-4 md:mt-0 md:pl-6">
              <h3 className="text-TextPrimary text-2xl font-semibold md:text-3xl">
                0{activeData.id}
              </h3>
              <p className="text-primaryBlue mt-2 text-xl font-semibold md:text-2xl">
                {activeData.title}
              </p>
              <p className="text-TextSecondary my-3 text-base md:text-lg font-medium">
                {activeData.description}
              </p>
              <hr className="my-5 rounded border-2 text-gray-200/70" />
              <ul className="mt-4 flex flex-col gap-2">
                {activeData.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CircleCheck className="text-primaryBlue mt-1" size={18} />
                    <p className="text-TextPrimary font-medium">
                      {feature?.highlight}{" "}
                      <span className="text-TextSecondary font-normal">
                        {feature?.text}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-gray-400 italic flex-1 flex items-center">
              Klik salah satu langkah di kanan untuk melihat detail.
            </div>
          )}
        </div>
      </motion.div>

      {/* Steps List */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4"
      >
        {HowWorks.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`flex flex-col border-t-4 p-4 text-start transition-all ${
              activeStep === step.id
                ? "border-primaryBlue bg-blue-50/40"
                : "hover:border-primaryBlue border-gray-200 bg-white"
            }`}
          >
            <h4 className="text-TextPrimary text-lg font-semibold">
              0{step.id}
            </h4>
            <p
              className={`mt-1 text-sm md:text-base font-semibold ${
                activeStep === step.id ? "text-primaryBlue" : "text-TextPrimary"
              }`}
            >
              {step.title}
            </p>
            <p className="text-TextSecondary mt-2 text-sm line-clamp-3">
              {step.description}
            </p>
            <div className="flex-1"></div>
          </button>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default HowItWorksSection;
