"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useJobResultStore } from "@/store/jobResultStore";
import { Briefcase, ChartNoAxesCombined, Handshake, Sparkle, Star, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import JobLinksSection from "@/components/job-link-section";
import NamedSectionResult from "@/components/named-section-result";

import cardImg from "@/assets/img/article1.jpg";

export default function HasilRekomendasiPage() {
  const router = useRouter();
  const jobResult = useJobResultStore((state) => state.jobResult);
  const clearJobResult = useJobResultStore((state) => state.clearJobResult);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useJobResultStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    setHydrated(useJobResultStore.persist.hasHydrated());
    return unsub;
  }, []);

  useEffect(() => {
    if (hydrated && !jobResult) {
      router.push("/rekomendasi-pekerjaan");
    }
  }, [hydrated, jobResult, router]);

  if (!hydrated || !jobResult) return null;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col-reverse items-start justify-center gap-6 px-6 pt-14 pb-12 sm:px-6 md:pt-18 lg:flex-row lg:gap-8 lg:px-8 lg:pt-22">
      {/* Left Aside (tetap di kiri desktop) */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="sticky top-24 hidden w-72 flex-shrink-0 lg:block"
      >
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="relative h-32 w-full bg-gradient-to-br from-indigo-50 to-blue-100">
            <Image
              src={cardImg}
              alt="Review CV"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-TextPrimary mb-3 text-sm font-semibold">
              Sudah dapat rekomendasi pekerjaan? Sekarang coba review CV kamu!
            </h3>
            <Link
              href="/review-cv"
              className="bg-primaryBlue block w-full rounded-lg px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Coba Review CV
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <section className="w-full max-w-3xl flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 text-center"
        >
          <h1 className="text-TextPrimary text-3xl font-bold">
            Rekomendasi Pekerjaan untuk Kamu
          </h1>
          <p className="mt-2 text-gray-600">
            Berdasarkan hasil analisis CV kamu
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full rounded-2xl bg-white p-5"
        >
          <div className="bg-blue-50 mb-6 flex justify-start items-center p-2 rounded-full border-2 border-primaryBlue  gap-3">
            <div className="bg-blue-500 p-2 rounded-full shadow-inner shadow-white/50">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 5.25L7.113 6.2955C6.606 7.6665 6.3525 8.352 5.85225 8.85225C5.352 9.3525 4.6665 9.606 3.2955 10.113L2.25 10.5L3.2955 10.887C4.6665 11.394 5.352 11.6483 5.85225 12.1478C6.3525 12.6473 6.606 13.3335 7.113 14.7045L7.5 15.75L7.887 14.7045C8.394 13.3335 8.64825 12.648 9.14775 12.1478C9.64725 11.6475 10.3335 11.394 11.7045 10.887L12.75 10.5L11.7045 10.113C10.3335 9.606 9.648 9.3525 9.14775 8.85225C8.6475 8.352 8.394 7.6665 7.887 6.2955L7.5 5.25ZM13.5 2.25L13.3342 2.69775C13.1167 3.28575 13.008 3.57975 12.7943 3.7935C12.5798 4.008 12.2858 4.11675 11.6978 4.3335L11.25 4.5L11.6985 4.66575C12.2857 4.88325 12.5798 4.992 12.7935 5.20575C13.008 5.42025 13.1167 5.71425 13.3335 6.30225L13.5 6.75L13.6658 6.30225C13.8833 5.71425 13.992 5.42025 14.2057 5.2065C14.4202 4.992 14.7142 4.88325 15.3022 4.6665L15.75 4.5L15.3015 4.33425C14.7143 4.11675 14.4202 4.008 14.2065 3.79425C13.992 3.57975 13.8833 3.28575 13.6665 2.69775L13.5 2.25Z" stroke="white" strokeWidth="1.125" strokeLinejoin="round" />
              </svg>

            </div>
            <motion.h2
              className="text-gray-700 text-xl font-semibold"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {jobResult.jabatan_ideal}
            </motion.h2>
          </div>

          <NamedSectionResult
            icon={<Handshake size={16} />}
            color="amber"
            className="mt-4"
            title="Alasan Kecocokan"
            list={jobResult.alasan_kecocokan}
          />
          <NamedSectionResult
            icon={<Briefcase size={16} />}
            className="mt-4"
            title="Deskripsi Pekerjaan"
            list={jobResult.deskripsi_pekerjaan}
          />
          <NamedSectionResult
            icon={<ChartNoAxesCombined size={16} />}
            color="green"
            className="mt-4"
            title="Potensi Karier"
            list={jobResult.potensi_karir}
          />


          <h3 className="text-TextPrimary mt-6 text-lg font-semibold">
            Kisaran Gaji
          </h3>

          <div className="mt-6 rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50 p-4 rounded-t-xl flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600">
                <Wallet size={16} />
              </div>
              <h3 className="text-TextPrimary text-lg font-semibold">
                Kisaran Gaji
              </h3>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {Object.entries(jobResult.kisaran_gaji).map(([level, salary]) => (
                  <div
                    key={level}
                    className="rounded-lg border border-blue-100 p-4 text-center transition-all hover:shadow-md"
                  >
                    <p className="text-md font-medium text-gray-500 mb-1 capitalize">{level}</p>
                    <p className="font-semibold text-lg text-blue-700">{salary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <NamedSectionResult
            className="mt-4"
            icon={<Star size={16} />}
            color="amber"
            title="Kelebihan Tambahan"
            list={jobResult.kelebihan_tambahan}
          />

          {/* Mobile version of Job Links (di bawah konten) */}
          <div className="mt-8 block lg:hidden">
            <JobLinksSection jobResult={jobResult} />
          </div>
        </motion.div>
      </section>

      {/* Right Aside for Desktop */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className="sticky top-24 hidden w-72 flex-shrink-0 lg:block"
      >
        <JobLinksSection jobResult={jobResult} />
      </motion.aside>
    </main>
  );
}



