"use client";

import GoodThingSection from "@/components/good-things-dashboard";
import NeedImprovementSection from "@/components/need-improvement-dashboard";
import CvReviewResult from "@/components/cv-review-result"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function ReviewCVDashboardPage() {
  return (
    <div className="w-full p-4 md:px-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/review-cv">Review CV</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Hasil</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-6 mb-8">
        <h1 className="text-TextPrimary  text-3xl font-semibold">
          Hasil Review CV Kamu
        </h1>
        <p className="text-TextSecondary mt-2 max-w-2xl text-base">
          Berikut hasil analisis AI terhadap CV yang telah kamu unggah. Dapatkan
          insight tentang apa yang sudah bagus dan apa yang bisa ditingkatkan.
        </p>
      </div>

      {/* Sections */}
      <div className="grid gap-8 my-8">
        {/* <GoodThingSection />
        <NeedImprovementSection /> */}
        <CvReviewResult></CvReviewResult>
      </div>
    </div>
  );
}
