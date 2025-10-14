"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useJobResultStore } from "@/store/jobResultStore";
import { Briefcase } from "lucide-react";
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
          className="mb-10 text-center"
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
          <div className="mb-6 flex items-center gap-3">
            <Briefcase className="text-blue-600" size={26} />
            <h2 className="text-TextPrimary text-2xl font-semibold">
              {jobResult.jabatan_ideal}
            </h2>
          </div>

          <NamedSectionResult title="Alasan Kecocokan" list={jobResult.alasan_kecocokan} />
          <NamedSectionResult
            title="Deskripsi Pekerjaan"
            list={jobResult.deskripsi_pekerjaan}
          />
          <NamedSectionResult title="Potensi Karier" list={jobResult.potensi_karir} />

          <h3 className="text-TextPrimary mt-6 text-lg font-semibold">
            Kisaran Gaji
          </h3>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {Object.entries(jobResult.kisaran_gaji).map(([level, salary]) => (
              <div
                key={level}
                className="rounded-lg bg-blue-50 p-4 text-center"
              >
                <p className="text-sm text-gray-500 capitalize">{level}</p>
                <p className="font-semibold text-blue-700">{salary}</p>
              </div>
            ))}
          </div>

          <NamedSectionResult
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



