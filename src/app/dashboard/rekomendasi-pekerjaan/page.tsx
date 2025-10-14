"use client"

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import UploadJobs from "@/components/upload-jobs";

export default function RekomendasiPekerjaanDashboard() {
  return (
    <div className="w-full p-4 md:px-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Rekomendasi Pekerjaan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-6 mb-8">
        <h2 className="text-TextPrimary text-3xl font-semibold">
          Temukan{" "}
          <span className="text-accentOrange">Pekerjaan yang Tepat</span>{" "}
          untukmu
        </h2>
        <p className="text-TextSecondary mt-2 max-w-2xl text-base">
          Dapatkan rekomendasi pekerjaan yang paling sesuai dengan keahlian dan
          pengalamanmu, langsung dari analisis CV kamu.
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h3 className="text-TextPrimary mb-4 text-xl font-medium">
          Upload CV Kamu
        </h3>
        <p className="text-TextSecondary mb-6 text-sm">
          Unggah file CV dalam format PDF untuk mendapatkan penilaian otomatis.
        </p>
        <UploadJobs />
      </div>
    </div>
  );
}
