"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto w-full max-w-7xl px-6 py-16"
    >
      <div className="flex flex-col items-center text-center">
        {/* Title + Subtitle */}
        <motion.div
          className="max-w-3xl flex-col text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-TextPrimary text-2xl font-semibold md:text-3xl">
            Mulai Tingkatkan Kariermu
          </h2>
          <p className="text-TextSecondary mt-2 text-base lg:text-lg">
            Review CV kamu atau tingkatkan profil LinkedIn-mu sekarang. Dapatkan
            insight yang membantu kamu stand out di mata recruiter!
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href={"/tingkatkan-linkedIn"}
            className="border-primaryBlue text-primaryBlue flex w-full items-center justify-center rounded-full border bg-white px-5 py-3 sm:w-auto"
          >
            Perbaiki LinkedIn
          </Link>
          <Link
            href={"/review-cv"}
            className="bg-primaryBlue flex w-full items-center justify-center rounded-full px-5 py-3 text-white sm:w-auto"
          >
            Mulai Sekarang
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CtaSection;
