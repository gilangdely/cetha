"use client";

import { ReactNode } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import CethaBot from "@/components/cethabot";

export default function Layout(props: { children: ReactNode }) {
  const pathname = usePathname();

  const isExcluded = pathname === "/hasil";

  if (isExcluded) {
    return <>{props.children}</>;
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
