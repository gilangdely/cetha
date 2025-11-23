"use client";

import { ReactNode } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import CethaBot from "@/components/cetha-bot";
import { useUploadStore } from "@/store/uploadStore";
import LoadingScreen from "@/components/loading-screen";

export default function Layout(props: { children: ReactNode }) {
  const pathname = usePathname();
  const loading = useUploadStore((s) => s.uploading);
  const progress = useUploadStore((s) => s.progress);
  const uploadType = useUploadStore((s) => s.uploadType);

  const isExcluded = ["/hasil", "/hasil-rekomendasi"].includes(pathname);

  if (loading) {
    return (
      <>
        <LoadingScreen progress={progress} type={uploadType ?? "cv"} />
      </>
    );
  }

  if (isExcluded) {
    return (
      <>
        {props.children}
        <CethaBot />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {props.children}
      <Toaster />
      <CethaBot />
      <Footer />
    </>
  );
}
