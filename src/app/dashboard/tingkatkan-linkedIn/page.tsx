"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ImproveLinkedInDashboard() {
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
            <BreadcrumbPage>Improve LinkedIn</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section */}
      <div className="mt-6 mb-8">
        <h2 className="text-TextPrimary text-3xl font-semibold">
          Profil{" "}
          <span className="text-accentOrange">LinkedIn Lebih Standout</span>
        </h2>
        <p className="text-TextSecondary mt-2 max-w-2xl text-base">
          Masukkan URL LinkedIn kamu, biarkan AI menganalisis headline, summary,
          dan skill. Dapatkan saran kata kunci dan tips supaya recruiter lebih
          mudah menemukan kamu.
        </p>
      </div>

      {/* Input Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h3 className="text-TextPrimary mb-4 text-xl font-medium">
          Masukkan Profil LinkedIn Kamu
        </h3>
        <p className="text-TextSecondary mb-6 text-sm">
          Tempelkan username atau URL profil LinkedIn kamu, lalu tekan tombol
          untuk mulai analisis.
        </p>
        <div className="flex w-full gap-2">
          <input
            type="text"
            placeholder="Masukan username atau URL profil LinkedIn kamu"
            className="focus:ring-primaryBlue flex-1 rounded-full border px-4 py-3 focus:ring-2 focus:outline-none"
          />
          <button className="bg-primaryBlue hover:bg-primaryBlue/90 rounded-full px-3 py-3 text-white transition-colors">
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
