"use client";

import Image from "next/image";
import Link from "next/link";

import { MoveLeft } from "lucide-react";

import illustration from "@/assets/img/illustration-optimize-linkedIn.jpg";

const ImproveLinkedinSection = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <div className="flex w-full flex-col-reverse items-center gap-10 px-6 md:flex-row lg:px-0">
        <div className="flex-1">
          <Image src={illustration} alt="ilustrasi improve" />
        </div>
        <div className="flex-1">
          <div className="flex justify-end">
            <div className="border-primaryBlue w-fit rounded-full border-2 px-3 py-1.5">
              <p className="text-primaryBlue font-medium">
                Improve LinkedIn Kamu
              </p>
            </div>
          </div>

          <div className="mt-2 flex-col text-end">
            <h2 className="text-TextPrimary text-3xl font-semibold md:text-4xl">
              Biar Profil LinkedIn Kamu Lebih Standout
            </h2>
            <p className="text-TextSecondary mt-4 max-w-2xl text-lg">
              AI bantu perbaiki headline, ringkasan, dan skill kamu supaya lebih
              menarik, profesional, dan siap dilihat oleh perekrut.
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              href={"/improve-linkedIn"}
              className="group hover:border-primaryBlue mt-8 inline-flex w-fit items-center gap-2 border-b-2 border-transparent font-medium"
            >
              <MoveLeft size={20} className="text-primaryBlue" />
              <span className="text-primaryBlue">Coba sekarang</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImproveLinkedinSection;
