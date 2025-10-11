"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const PricingList = [
  {
    tier: "Gratis",
    price: { month: "0 IDR", year: "0 IDR" },
    per: { month: "/ Bulan", year: "/ Tahun" },
    tagline: "Cocok bagi pengguna baru yang ingin mencoba fitur dasar Cetha.",
    features: [
      { name: "Review CV & LinkedIn dasar", available: true },
      { name: "Analisis kata kunci pekerjaan", available: true },
      { name: "Saran perbaikan umum", available: true },
      { name: "Rekomendasi pekerjaan terbatas", available: true },
      { name: "Tampilan responsif (mobile & desktop)", available: true },
      { name: "Tanpa riwayat review tersimpan", available: false },
      { name: "Tanpa filter pekerjaan lanjutan", available: false },
      { name: "Tanpa pembaruan mingguan pekerjaan", available: false },
    ],
    buttonText: "Mulai Gratis",
    featured: false,
  },
  {
    tier: "Pro",
    price: { month: "75.000 IDR", year: "749.000 IDR" },
    per: { month: "/ Bulan", year: "/ Tahun" },
    tagline:
      "Untuk pencari kerja aktif yang ingin hasil review lebih mendalam.",
    features: [
      { name: "Semua fitur paket Gratis", available: true },
      { name: "Review CV & LinkedIn mendetail", available: true },
      { name: "Saran personalisasi konten", available: true },
      { name: "Simpan riwayat hasil review", available: true },
      { name: "Rekomendasi pekerjaan real-time", available: true },
      { name: "Mode hemat data", available: true },
      { name: "Analisis AI lanjutan", available: false },
      { name: "Notifikasi lowongan baru", available: false },
    ],
    buttonText: "Upgrade ke Pro",
    featured: true,
  },
  {
    tier: "Eksklusif",
    price: { month: "149.000 IDR", year: "1.499.000 IDR" },
    per: { month: "/ Bulan", year: "/ Tahun" },
    tagline: "Akses premium untuk rekomendasi kerja paling akurat dan cepat.",
    features: [
      { name: "Semua fitur paket Pro", available: true },
      { name: "Analisis AI tingkat lanjut", available: true },
      {
        name: "Kesesuaian pekerjaan berdasarkan minat & pengalaman",
        available: true,
      },
      { name: "Notifikasi lowongan baru real-time", available: true },
      { name: "Prioritas dukungan pengguna", available: true },
      { name: "Akses offline hasil review", available: true },
      { name: "Akses fitur eksperimental", available: true },
    ],
    buttonText: "Pilih Paket Eksklusif",
    featured: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto max-w-7xl px-4 py-16 pt-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-8 text-center"
      >
        <div className="border-primaryBlue mx-auto w-fit rounded-full border-2 px-2 py-1 lg:px-3 lg:py-1.5">
          <p className="text-primaryBlue lg:font-medium">Paket Langganan</p>
        </div>
        <div className="mt-4 mx-auto max-w-3xl flex-col text-center">
          <h2 className="text-TextPrimary text-2xl font-semibold md:text-4xl lg:text-3xl">
            Harga yang Sederhana & Transparan
          </h2>
          <p className="text-TextSecondary mt-2 text-base lg:text-lg">
            Tingkatkan peluang karier Anda dengan fitur Cetha yang didukung AI.
            Mulai gratis, upgrade kapan saja.
          </p>
        </div>
      </motion.div>
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className="text-base font-semibold">Bulanan</span>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
          aria-label="Toggle harga"
        />
        <span className="text-base font-semibold">Tahunan</span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PricingList.map((plan, i) => (
          <motion.div
            key={plan.tier}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className={`relative flex h-full flex-col rounded-2xl border px-6 py-8 shadow-md transition-all duration-300 ${
              plan.featured
                ? "border-[#2563eb] bg-[#2563eb] text-white"
                : "border-slate-200 bg-white text-gray-800"
            }`}
          >
            {plan.featured && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-700 px-3 py-1.5 text-xs font-semibold shadow"
              >
                Paling Populer
              </motion.div>
            )}
            <div className="mb-4">
              <h3 className="mb-1 text-xl font-bold">{plan.tier}</h3>
              <p className="text-sm opacity-90">{plan.tagline}</p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold">
                  {isYearly ? plan.price.year : plan.price.month}
                </span>
                <span className="text-sm opacity-80">
                  {isYearly ? plan.per.year : plan.per.month}
                </span>
              </div>

              {isYearly && plan.tier !== "Gratis" && (
                <span className="mt-2 inline-block rounded-md bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  Hemat {plan.tier === "Pro" ? "50.000 IDR" : "100.000 IDR"}
                  /tahun
                </span>
              )}
            </div>
            <ul className="mb-8 flex flex-1 flex-col gap-2 text-sm">
              {plan.features.map((f) => (
                <li
                  key={f.name}
                  className={`flex items-center gap-2 ${
                    plan.featured
                      ? f.available
                        ? "text-white"
                        : "text-blue-100/70"
                      : f.available
                        ? "text-gray-700"
                        : "text-gray-400"
                  }`}
                >
                  {f.available ? (
                    <CheckCircle
                      className={
                        plan.featured ? "text-white" : "text-[#2563eb]"
                      }
                      size={15}
                    />
                  ) : (
                    <Clock
                      className={
                        plan.featured ? "text-blue-100/70" : "text-gray-300"
                      }
                      size={15}
                    />
                  )}
                  <span>{f.name}</span>
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full rounded-lg py-3 text-base font-medium transition-all duration-200 ${
                plan.featured
                  ? "bg-white text-[#2563eb] hover:bg-blue-50"
                  : "bg-[#2563eb] text-white hover:bg-blue-600"
              }`}
            >
              {plan.buttonText}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
