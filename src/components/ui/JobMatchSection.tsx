"use client";

import Image from "next/image";
import Link from "next/link";

import { MoveRight } from "lucide-react";

const JobMatchSection = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <div className="flex w-full flex-col-reverse items-center gap-10 px-6 md:flex-row lg:px-0">
        <div className="max-w-2xl flex-1">
          <div className="border-primaryBlue w-fit rounded-full border-2 px-3 py-1.5">
            <p className="text-primaryBlue font-medium">
              Rekomendasi Pekerjaan
            </p>
          </div>
          <div className="mt-2 flex-col text-start">
            <h2 className="text-TextPrimary text-3xl font-semibold md:text-4xl">
              Kerja yang Cocok, Peluang Lebih Besar
            </h2>
            <p className="text-TextSecondary mt-4 max-w-2xl text-lg">
              Biarkan AI mencarikan lowongan yang paling relevan untukmu, jadi
              kamu hanya melamar pekerjaan yang benar-benar sesuai.
            </p>
          </div>
          <Link
            href=""
            className="group hover:border-primaryBlue mt-8 inline-flex w-fit items-center gap-2 border-b-2 border-transparent font-medium"
          >
            <span className="text-primaryBlue">Coba sekarang</span>
            <MoveRight size={20} className="text-primaryBlue" />
          </Link>
        </div>
        <div className="flex-1">{/* <Image src={""} alt=""></Image> */}</div>
      </div>
    </section>
  );
};

export default JobMatchSection;
