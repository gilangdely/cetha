"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import UploadCv from "@/components/upload-cv";

export default function ReviewCVDashboard() {
  return (
    <div className="w-full p-4 md:px-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Review CV</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-6 mb-8">
        <h2 className="text-TextPrimary text-3xl font-semibold">
          CV Lebih Baik,{" "}
          <span className="text-accentOrange">Peluang Lebih Besar</span>
        </h2>
        <p className="text-TextSecondary mt-2 max-w-2xl text-base">
          Dapatkan feedback otomatis dari AI agar CV kamu makin standout di mata
          recruiter.
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h3 className="text-TextPrimary mb-4 text-xl font-medium">
          Upload CV Kamu
        </h3>
        <p className="text-TextSecondary mb-6 text-sm">
          Unggah file CV dalam format PDF untuk mendapatkan penilaian otomatis.
        </p>
        <UploadCv />
      </div>
    </div>
  );
}
