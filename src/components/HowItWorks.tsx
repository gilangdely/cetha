"use client";

import Image from "next/image";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { text } from "stream/consumers";

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
        text: "Sistem akan menyesuaikan rekomendasi sesuai datamu.",
      },
    ],
  },
  {
    id: 2,
    title: "Review CV dengan AI",
    description:
      "Upload CV kamu, AI langsung menganalisis dan beri saran perbaikan agar CV lebih menarik & lolos ATS.",
    features: [
      {
        highlight: "Analisis otomatis oleh AI.",
        text: "",
      },
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

      ,
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
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <div className="flex flex-col items-center text-center">
        <div className="border-primaryBlue rounded-full border-2 px-5 py-2">
          <p className="text-primaryBlue font-medium">Cara Kerja Cetha</p>
        </div>
        <h2 className="text-TextPrimary mt-4 text-3xl font-semibold md:text-4xl">
          Cara Cetha Bantu Kamu Dapat <br className="hidden md:block" /> Kerjaan
          Impian
        </h2>
        <p className="text-TextSecondary mt-4 max-w-2xl text-lg">
          Ikuti langkah mudah ini untuk optimalkan CV, profil LinkedIn, dan
          temukan lowongan yang paling cocok.
        </p>
      </div>

      {/* Active Cards */}
      <div className="mt-10 flex flex-col gap-8">
        <div className="flex h-80 flex-row rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex-1">
            <Image src={""} alt=""></Image>
          </div>
          {activeData ? (
            <div className="flex-1">
              <h3 className="text-primaryBlue/90 text-3xl font-semibold">
                0{activeData.id}
              </h3>
              <p className="text-primaryBlue mt-2 text-3xl font-semibold">
                {activeData.title}
              </p>
              <p className="text-TextSecondary my-3 text-lg font-medium">
                {activeData.description}
              </p>
              <hr className="rounded border-2 text-gray-200" />
              <ul className="mt-4 flex flex-col gap-2">
                {activeData.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
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
            <div className="text-gray-400 italic">
              Klik salah satu langkah di kanan untuk melihat detail.
            </div>
          )}
        </div>

        {/* Nonactive Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {HowWorks.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex flex-col border-t-3 text-start transition-all ${
                activeStep === step.id
                  ? "border-primaryBlue"
                  : "hover:border-primaryBlue border-gray-200"
              }`}
            >
              <h4 className="text-TextPrimary mt-5 text-lg font-semibold">
                0{step.id}
              </h4>
              <p
                className={`text-lg font-semibold ${
                  activeStep === step.id
                    ? "text-primaryBlue"
                    : "text-TextPrimary"
                }`}
              >
                {step.title}
              </p>
              <p className="text-TextSecondary mt-2 text-sm">
                {step.description}
              </p>
              <div className="flex-1"></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
