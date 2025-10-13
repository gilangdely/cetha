"use client";

import Link from "next/link";
import Image from "next/image";
import UploadCv from "@/components/upload-cv";
import { motion } from "framer-motion";

import { ChevronRight } from "lucide-react";

import illustration from "@/assets/img/illustration-review-cv.jpg";

export default function ReviewCVPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl items-center pt-20 lg:pt-0">
      <section className="w-full">
        {/* Hero Section */}
        <div className="flex w-full items-center py-12 lg:min-h-screen lg:py-0">
          <div className="flex w-full items-center gap-10 px-6 lg:flex-row lg:px-0">
            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex-1"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-TextPrimary text-2xl font-semibold md:text-3xl lg:text-4xl"
              >
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                  className="mb-2 hidden items-center gap-1 text-sm lg:flex"
                >
                  <Link
                    href="/"
                    className="hover:text-TextPrimary/80 text-gray-500/50 transition-colors"
                  >
                    Home
                  </Link>
                  <ChevronRight size={16} className="text-gray-400" />
                  <span className="text-accentOrange font-medium">
                    Review CV
                  </span>
                </motion.span>
                CV Lebih Baik,{" "}
                <span className="text-accentOrange">Peluang Lebih Besar</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-TextSecondary mt-3 text-lg"
              >
                Dapatkan feedback otomatis dari AI agar CV kamu makin standout
                di mata recruiter.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                <UploadCv />
              </motion.div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="hidden flex-1 lg:block"
            >
              <Image
                className="relative"
                draggable={false}
                src={illustration}
                alt="illustration review cv"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}