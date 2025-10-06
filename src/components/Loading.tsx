"use client"

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";

import loadingIcons1 from "@/assets/icons/loading-bulb.svg"
import loadingIcons2 from "@/assets/icons/loading-horse.svg"
import loadingIcons3 from "@/assets/icons/loading-paperline.svg"

interface LoadingScreenProps {
    progress: number;
}

const Icons = [
    loadingIcons1, loadingIcons2, loadingIcons3
]

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
    const [dots, setDots] = useState("")
    const [currentIcon, setCurrentIcon] = useState(0)

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

    const getText = () => {
        if (progress < 50) return "Sedang menganalisis CV kamu";
        if (progress < 80) return "Cari kata kunci yang pas biar HR gampang nemuin kamu";
        return "Siap! CV kamu akan jadi lebih siap dilirik recruiter.";
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <div className="mb-6 h-16 w-16 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIcon}
                        initial={{ y: 20, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -20, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Image src={Icons[currentIcon]} alt="Loading" className="w-16 h-16" />
                    </motion.div>
                </AnimatePresence>
            </div>
            <p className="text-gray-700 text-center text-lg max-w-md">
                {getText()}
                {dots}
            </p>
        </div>
    )
}

export default LoadingScreen;