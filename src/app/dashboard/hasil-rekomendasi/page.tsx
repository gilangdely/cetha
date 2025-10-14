"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useJobResultStore } from "@/store/jobResultStore";
import { Briefcase } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import NamedSectionResult from "@/components/named-section-result";
import JobLinksSection from "@/components/job-link-section";

export default function HasilRekomendasiDashboardPage() {
  const router = useRouter();
  const jobResult = useJobResultStore((state) => state.jobResult);
  const [hydrated, setHydrated] = useState(false);

  // Pastikan Zustand sudah siap sebelum render
  useEffect(() => {
    const unsub = useJobResultStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    setHydrated(useJobResultStore.persist.hasHydrated());
    return unsub;
  }, []);

  // Redirect kalau tidak ada hasil
  useEffect(() => {
    if (hydrated && !jobResult) {
      router.push("/dashboard/rekomendasi-pekerjaan");
    }
  }, [hydrated, jobResult, router]);

  if (!hydrated || !jobResult) return null;

  return (
    <div className="w-full p-4 md:px-10">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/rekomendasi-pekerjaan">
              Rekomendasi Pekerjaan
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Hasil Rekomendasi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="mt-6 mb-8">
        <h1 className="text-TextPrimary text-3xl font-semibold">
          Hasil Rekomendasi Pekerjaan
        </h1>
        <p className="text-TextSecondary mt-2 max-w-2xl text-base">
          Berdasarkan hasil analisis CV kamu, berikut pekerjaan yang cocok
          beserta alasan dan potensi karier yang bisa kamu kembangkan.
        </p>
      </div>

      {/* Main Content */}
      <section className="w-full flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center gap-3">
            <Briefcase className="text-blue-600" size={26} />
            <h2 className="text-TextPrimary text-2xl font-semibold">
              {jobResult.jabatan_ideal}
            </h2>
          </div>

          <NamedSectionResult
            title="Alasan Kecocokan"
            list={jobResult.alasan_kecocokan}
          />
          <NamedSectionResult
            title="Deskripsi Pekerjaan"
            list={jobResult.deskripsi_pekerjaan}
          />
          <NamedSectionResult
            title="Potensi Karier"
            list={jobResult.potensi_karir}
          />

          <h3 className="text-TextPrimary mt-6 text-lg font-semibold">
            Kisaran Gaji
          </h3>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {Object.entries(jobResult.kisaran_gaji).map(([level, salary]) => (
              <div key={level} className="rounded-lg bg-blue-50 p-4 text-center">
                <p className="text-sm text-gray-500 capitalize">{level}</p>
                <p className="font-semibold text-blue-700">{salary}</p>
              </div>
            ))}
          </div>

          <NamedSectionResult
            title="Kelebihan Tambahan"
            list={jobResult.kelebihan_tambahan}
          />

          <div className="mt-8">
            <JobLinksSection jobResult={jobResult} />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
