"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

import illustration from "@/assets/img/illustration-upgrade-cv.jpg";

const CvUpgradeSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto w-full max-w-7xl px-6 py-12"
    >
      <div className="flex w-full flex-col-reverse items-center gap-10 px-6 md:flex-row lg:px-0">
        {/* Left (Text) */}
        <motion.div
          className="max-w-2xl flex-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="border-primaryBlue w-fit rounded-full border-2 px-2 py-1 lg:px-3 lg:py-1.5">
            <p className="text-primaryBlue font-medium">Upgrade CV Kamu</p>
          </div>
          <div className="mt-4 flex-col text-start">
            <h2 className="text-TextPrimary text-2xl font-semibold lg:text-3xl">
              Perbaiki CV, Tingkatkan Peluangmu
            </h2>
            <p className="text-TextSecondary mt-2 max-w-2xl text-base lg:text-lg">
              AI kami akan mengecek CV-mu, memberi masukan detail, dan membantu
              menjadikannya lebih menarik di mata recruiter.
            </p>
          </div>
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href={"/review-cv"}
              className="group hover:border-primaryBlue mt-8 inline-flex w-fit items-center gap-2 border-b-2 border-transparent font-medium"
            >
              <span className="text-primaryBlue">Coba sekarang</span>
              <MoveRight size={20} className="text-primaryBlue" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right (Image) */}
        <motion.div
          className="hidden md:block md:flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Image
            src={illustration}
            alt="ilustrasi upgrade cv"
            className="h-auto w-full object-contain"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CvUpgradeSection;
