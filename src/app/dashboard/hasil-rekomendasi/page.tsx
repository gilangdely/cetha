"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useJobResultStore } from "@/store/jobResultStore";
import { Briefcase, ChartNoAxesCombined, Handshake, IceCream, Icon, Star, Wallet } from "lucide-react";

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

          <div className="mt-4">
            <JobLinksSection jobResult={jobResult} />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
