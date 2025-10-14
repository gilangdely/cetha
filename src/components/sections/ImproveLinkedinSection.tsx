"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveLeft } from "lucide-react";

import illustration from "@/assets/img/illustration-optimize-linkedIn.jpg";

const ImproveLinkedinSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto w-full max-w-7xl px-6 py-12"
    >
      <div className="flex w-full flex-col-reverse items-center gap-10 px-6 md:flex-row lg:px-0">
        {/* Left (Image) */}
        <motion.div
          className="hidden md:flex-1 md:block"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src={illustration}
            alt="ilustrasi improve"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Right (Content) */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-end">
            <div className="border-primaryBlue w-fit rounded-full border-2 px-2 py-1 lg:px-3 lg:py-1.5">
              <p className="text-primaryBlue font-medium">
                Improve LinkedIn Kamu
              </p>
            </div>
          </div>

          <div className="mt-4 flex-col text-end">
            <h2 className="text-TextPrimary text-2xl font-semibold md:text-4xl lg:text-3xl">
              Biar Profil LinkedIn Kamu Lebih Standout
            </h2>
            <p className="text-TextSecondary mt-2 max-w-2xl text-base lg:text-lg">
              AI bantu perbaiki headline, ringkasan, dan skill kamu supaya lebih
              menarik, profesional, dan siap dilihat oleh perekrut.
            </p>
          </div>

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href={"/tingkatkan-linkedIn"}
              className="group hover:border-primaryBlue mt-8 inline-flex w-fit items-center gap-2 border-b-2 border-transparent font-medium"
            >
              <MoveLeft size={20} className="text-primaryBlue" />
              <span className="text-primaryBlue">Coba sekarang</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ImproveLinkedinSection;
