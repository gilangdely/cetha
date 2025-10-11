"use client";

import Image from "next/image";
import CtaSection from "@/components/sections/CtaSection";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

import { ChevronRight, Heart, Star, Goal, FileText } from "lucide-react";

import iyanImage from "@/assets/img/iyan.jpg";
import firmanImage from "@/assets/img/firman.jpg";
import gilangImage from "@/assets/img/gilang.jpg";
import illustration from "@/assets/img/illustration-about-us.jpg";
import Link from "next/link";

const profiles = [
  {
    id: 1,
    foto: iyanImage,
    nama: "Agus Priyanto",
    role: "Frontend Developer",
  },
  {
    id: 2,
    foto: gilangImage,
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

const testimonials = [
  {
    quote:
      "Cetha benar-benar membantu saya menyusun CV yang lebih profesional. Hasilnya, saya lebih percaya diri melamar pekerjaan.",
    name: "Andi Pratama",
    title: "Fresh Graduate",
  },
  {
    quote:
      "Saya suka cara Cetha memberikan rekomendasi lowongan sesuai profil LinkedIn saya. Sangat relevan!",
    name: "Siti Rahma",
    title: "UI/UX Designer",
  },
  {
    quote:
      "Proses optimasi CV sangat mudah dipahami. Dalam hitungan menit, CV saya terlihat jauh lebih menarik.",
    name: "Bima Nugraha",
    title: "Software Engineer",
  },
  {
    quote:
      "Fitur analisis CV membantu saya menemukan kekurangan yang tidak pernah saya sadari sebelumnya.",
    name: "Dewi Lestari",
    title: "Marketing Specialist",
  },
  {
    quote:
      "Saya berhasil dipanggil interview di perusahaan impian setelah memperbaiki CV lewat Cetha.",
    name: "Rudi Hartono",
    title: "Data Analyst",
  },
  {
    quote:
      "Sangat terbantu! Cetha memberikan insight yang membuat profil saya lebih menarik di mata recruiter.",
    name: "Nadia Putri",
    title: "Product Manager",
  },
  {
    quote: "Pengalaman yang menyenangkan! Antarmuka simpel, hasilnya maksimal.",
    name: "Fajar Kurniawan",
    title: "Frontend Developer",
  },
  {
    quote:
      "Dengan bantuan Cetha, saya bisa lebih percaya diri dalam mencari pekerjaan. Sangat direkomendasikan.",
    name: "Aulia Syah",
    title: "HR Specialist",
  },
];

const stats = [
  { icon: Goal, name: "100+ Pengguna" },
  { icon: FileText, name: "CV Lebih Standout" },
];

export default function AboutUsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl items-center">
      <section>
        {/* Hero Section */}
        <div className="flex min-h-screen w-full items-center">
          <div className="flex w-full flex-col-reverse items-center gap-10 px-6 md:flex-row lg:px-0">
            <div className="flex-1 space-y-4">
              <nav className="flex items-center gap-2 text-sm">
                <Link
                  href="/"
                  className="text-gray-500 transition-colors hover:text-gray-700"
                >
                  Home
                </Link>
                <ChevronRight size={16} className="text-gray-400" />
                <span className="text-accentOrange font-medium">About Us</span>
              </nav>
              <h2 className="text-TextPrimary text-4xl font-semibold">
                Crafting{" "}
                <span className="text-accentOrange">Careers Together</span>
              </h2>

              <p className="text-TextSecondary mt-3 text-lg">
                Di Cetha, kami percaya bahwa setiap orang berhak memiliki
                peluang karier terbaik. Dengan tim yang berdedikasi, kami
                membantu kamu membuat CV standout dan memaksimalkan profil
                profesional.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl p-4"
                  >
                    <div className="border-primaryBlue flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white">
                      <stat.icon size={28} className="text-primaryBlue" />
                    </div>
                    <div>
                      <p className="text-TextPrimary text-base font-semibold">
                        {stat.name}
                      </p>
                      <p className="text-TextSecondary text-sm">
                        Bukti nyata dampak kami
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <Image
                className="relative"
                height={550}
                draggable={false}
                src={illustration}
                alt="illustration about us"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mx-auto w-full max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Left Section */}
            <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="group relative flex flex-col items-center overflow-hidden rounded-lg border border-gray-300 shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <Image
                    src={profile.foto}
                    alt={profile.nama}
                    className="h-64 w-56 rounded-lg object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                  <div className="absolute bottom-0 left-0 w-full translate-y-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <h3 className="text-lg font-semibold">{profile.nama}</h3>
                    <p className="text-sm opacity-80">{profile.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Section */}
            <div className="space-y-4 text-left">
              <div className="border-primaryBlue w-fit rounded-full border-2 px-3 py-1.5">
                <p className="text-primaryBlue font-medium">Kenali Tim Kami</p>
              </div>
              <h2 className="text-TextPrimary text-3xl font-bold md:text-4xl">
                Tim Kami
              </h2>
              <p className="text-TextSecondary text-lg leading-relaxed">
                Kami bangga dengan dedikasi dan inovasi tim kami. Dengan
                semangat dan keahlian yang dimiliki, kami terus menghadirkan
                solusi kreatif yang membantu masyarakat indonesia.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full px-6 py-12">
          <div className="flex flex-col items-center text-center">
            <div className="border-primaryBlue rounded-full border-2 px-3 py-1.5">
              <p className="text-primaryBlue font-medium">
                Apa kata pengguna Cetha
              </p>
            </div>
            <div className="mt-3 flex flex-col items-center">
              <h2 className="text-TextPrimary text-3xl font-bold md:text-4xl">
                Cara Cetha Bantu Kamu Dapat <br className="hidden md:block" />
                Kerjaan Impian
              </h2>
              <p className="text-TextSecondary mt-4 max-w-2xl text-lg leading-relaxed">
                Ikuti langkah sederhana ini untuk optimalkan CV, tingkatkan
                profil LinkedIn, dan temukan lowongan yang paling cocok untukmu.
              </p>
            </div>
          </div>
          <div className="py-10">
            <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-white antialiased">
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
              />
            </div>
            <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-white antialiased">
              <InfiniteMovingCards
                items={testimonials}
                direction="left"
                speed="slow"
              />
            </div>
          </div>
          <CtaSection />
        </div>
      </section>
    </main>
  );
}
