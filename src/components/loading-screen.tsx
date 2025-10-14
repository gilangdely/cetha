"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";

import loadingIcons1 from "@/assets/icons/loading-bulb.svg";
import loadingIcons2 from "@/assets/icons/loading-horse.svg";
import loadingIcons3 from "@/assets/icons/loading-paperline.svg";

interface LoadingScreenProps {
  progress: number;
  type: "cv" | "job";
}

const Icons = [loadingIcons1, loadingIcons2, loadingIcons3];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, type }) => {
  const [dots, setDots] = useState("");
  const [currentIcon, setCurrentIcon] = useState(0);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % Icons.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTextCv = () => {
    if (progress < 50) return "Sedang menganalisis CV kamu";
    if (progress < 80)
      return "Cari kata kunci yang pas biar HR gampang nemuin kamu";
    return "Siap! CV kamu akan jadi lebih siap dilirik recruiter.";
  };

  const getTextJob = () => {
    if (progress < 50) return "Mencari peluang kerja yang cocok buat kamu";
    if (progress < 80)
      return "Menganalisis keahlian dan preferensimu untuk hasil terbaik";
    return "Rekomendasi pekerjaan siap ditampilkan!";
  };

  const getText = type === "cv" ? getTextCv : getTextJob;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overscroll-none bg-white">
      <div className="mb-6 flex h-16 w-16 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIcon}
            initial={{ y: 20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Image
              src={Icons[currentIcon]}
              alt="Loading"
              className="h-16 w-16"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="max-w-md text-center text-lg text-gray-700">
        {getText()}
        {dots}
      </p>
    </div>
  );
};

export default LoadingScreen;
