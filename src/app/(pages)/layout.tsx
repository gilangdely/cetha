"use client";

import { ReactNode } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";

export default function Layout(props: { children: ReactNode }) {
  const pathname = usePathname();

  // Jika di halaman /result, jangan tampilkan layout
  const isExcluded = pathname === "/result";

  if (isExcluded) {
    return <>{props.children}</>;
  }

  return (
    <>
      <Navbar />
      {props.children}
      <Toaster />
      <Footer />
    </>
  );
}
