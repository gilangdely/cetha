"use client";

import Link from "next/link";
import Image from "next/image";

import { Send, CircleCheck } from "lucide-react";
import illustration from "@/assets/img/illustration-hero.png";

const HeroSection = () => {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-7xl items-center">
      <div className="flex w-full flex-col-reverse items-center gap-10 px-6 md:flex-row lg:px-0">
        <div className="flex-1">
          <div>
            <h2 className="text-TextPrimary text-4xl font-semibold">
              <span className="text-accentOrange">
                Upgrade CV, upgrade karier.
              </span>{" "}
              Platform pintar buat kamu yang mau naik level dan dapet kerja
              lebih cepat.
            </h2>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <p className="text-TextSecondary text-lg">
              Cetha bantu kamu bikin CV standout, optimalkan profil, dan temukan
              kerjaan yang pas semuanya di satu tempat.
            </p>
            <Link
              href={"/login"}
              className="bg-primaryBlue mt-5 flex w-fit cursor-pointer items-center gap-2 rounded-full px-4.5 py-3 font-medium text-white"
            >
              <p>Mulai Sekarang</p> <Send height={20} />
            </Link>
            <div className="mt-3 flex gap-5">
              <p className="flex gap-2">
                <CircleCheck className="text-primaryBlue" />{" "}
                <span className="text-TextSecondary">
                  Coba gratis tanpa ribet
                </span>
              </p>
              <p className="flex gap-2">
                <CircleCheck className="text-primaryBlue" />{" "}
                <span className="text-TextSecondary">
                  Rekomendasi kerja sesuai skill
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Image
            className="relative"
            draggable={false}
            src={illustration}
            alt="illustration build CV"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
