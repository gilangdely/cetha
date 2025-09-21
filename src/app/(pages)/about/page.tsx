"use client";

import { useState } from "react";

import iyanImage from "@/assets/img/iyan.jpg";
import firmanImage from "@/assets/img/firman.jpg";
import Image from "next/image";

const profiles = [
  {
    id: 1,
    foto: iyanImage,
    nama: "Agus Priyanto",
    role: "Frontend Developer",
  },
  {
    id: 2,
    foto: firmanImage,
    nama: "Gilang Dely",
    role: "Backend Developer",
  },
  {
    id: 3,
    foto: firmanImage,
    nama: "Firman Zamzami",
    role: "Machine Learning Developer",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center">
      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full border-2 border-blue-500 px-3 py-1.5">
            <p className="font-medium text-blue-500">Tim kami</p>
          </div>
          <div className="mt-2 max-w-3xl flex-col text-center">
            <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
              Anggota tim kami
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Cetha bantu kamu bikin CV standout, optimalkan profil LinkedIn,
              dan dapatkan rekomendasi kerja sesuai skill semuanya di satu
              platform.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="grid w-full max-w-2xl gap-2 py-10 md:grid-cols-3">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="group relative rounded-sm overflow-hidden  shadow-lg"
              >
                {/* Photo Container */}
                <div className="relative h-80 w-full overflow-hidden bg-gray-200">
                  <Image
                    src={profile.foto}
                    alt={profile.nama}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay with Name and Role */}
                <div className="bg-opacity-0 group-hover:bg-opacity-60 absolute inset-0 flex items-end transition-all duration-300">
                  <div className="w-full translate-y-full transform p-6 text-white transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="mb-1 text-xl font-semibold">
                      {profile.nama}
                    </h3>
                    <p className="text-sm text-gray-200">{profile.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
