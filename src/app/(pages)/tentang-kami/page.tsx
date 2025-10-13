"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CtaSection from "@/components/sections/CtaSection";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { ChevronRight, Goal, FileText } from "lucide-react";

import iyanImage from "@/assets/img/iyan.jpg";
import firmanImage from "@/assets/img/firman.jpg";
import gilangImage from "@/assets/img/gilang.jpg";
import illustration from "@/assets/img/illustration-about-us.jpg";

const profiles = [
  { id: 1, foto: iyanImage, nama: "Agus Priyanto", role: "Frontend Developer" },
  { id: 2, foto: gilangImage, nama: "Gilang Dely", role: "Backend Developer" },
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
  { icon: FileText, name: "CV Lebih keren" },
];

export default function AboutUsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center pt-20 lg:pt-0">
      <section className="w-full">
        {/* Hero Section */}
        <div className="flex w-full items-center py-12 lg:min-h-screen lg:py-0">
          <div className="flex w-full items-center gap-10 px-6 lg:gap-14 lg:px-0">
            {/* Text Section */}
            <motion.div
              className="w-full flex-1 space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="hidden items-center gap-2 text-sm lg:flex"
              >
                <Link
                  href="/"
                  className="text-gray-500 transition-colors hover:text-gray-700"
                >
                  Home
                </Link>
                <ChevronRight size={16} className="text-gray-400" />
                <span className="text-accentOrange font-medium">About Us</span>
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-TextPrimary text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl"
              >
                Crafting{" "}
                <span className="text-accentOrange">Careers Together</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-TextSecondary mt-3 lg:text-lg"
              >
                Di Cetha, kami percaya bahwa setiap orang berhak memiliki
                peluang karier terbaik. Dengan tim yang berdedikasi, kami
                membantu kamu membuat CV standout dan memaksimalkan profil
                profesional.
              </motion.p>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + index * 0.1,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="border-primaryBlue flex items-center justify-center rounded-full border-2 p-2 sm:h-11 sm:w-11">
                      <stat.icon size={26} className="text-primaryBlue" />
                    </div>
                    <div className="text-start">
                      <p className="text-TextPrimary text-xs font-semibold sm:text-base">
                        {stat.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Illustration - Hidden below lg */}
            <motion.div
              className="hidden flex-1 justify-center lg:flex lg:justify-end"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Image
                className="w-full object-contain"
                draggable={false}
                src={illustration}
                alt="illustration about us"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Team Section */}
        <div className="flex flex-col-reverse items-center gap-10 px-6 py-16 md:flex-row md:gap-16 lg:py-20">
          {/* Left Section - Team Cards */}
          <motion.div
            className="flex flex-1 flex-row justify-center gap-4 overflow-x-auto sm:gap-6 md:overflow-visible"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {profiles.map((profile, i) => (
              <motion.div
                key={profile.id}
                className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Image
                  src={profile.foto}
                  alt={profile.nama}
                  className="h-44 w-36 rounded-xl object-cover grayscale transition-all duration-300 group-hover:grayscale-0 sm:h-52 sm:w-40 md:h-56 md:w-44 lg:h-60 lg:w-48"
                />
                <div className="absolute bottom-0 left-0 w-full translate-y-full bg-gradient-to-t from-black/70 to-transparent p-2 text-white transition-transform duration-500 ease-out group-hover:translate-y-0 sm:p-3 md:p-4">
                  <h3 className="text-sm font-semibold sm:text-base md:text-lg">
                    {profile.nama}
                  </h3>
                  <p className="text-[10px] opacity-80 sm:text-xs md:text-sm">
                    {profile.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Section - Team Description */}
          <motion.div
            className="flex-1 space-y-4 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="border-primaryBlue mx-auto w-fit rounded-full border-2 px-2 py-1 md:mx-0 lg:px-3 lg:py-1.5">
              <p className="text-primaryBlue lg:font-medium">Kenali Tim Kami</p>
            </div>
            <div className="mt-4 max-w-3xl flex-col">
              <h2 className="text-TextPrimary text-2xl font-semibold md:text-3xl">
                Tim Kami
              </h2>
              <p className="text-TextSecondary mt-2 text-base lg:text-lg">
                Kami bangga dengan dedikasi dan inovasi tim kami. Dengan
                semangat dan keahlian yang dimiliki, kami terus menghadirkan
                solusi kreatif yang membantu masyarakat Indonesia.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <div className="mx-auto w-full px-4 py-16 sm:px-6 lg:py-20">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="border-primaryBlue rounded-full border-2 px-2 py-1 lg:px-3 lg:py-1.5">
              <p className="text-primaryBlue lg:font-medium">
                Apa kata pengguna Cetha
              </p>
            </div>
            <div className="mt-4 max-w-3xl flex-col text-center">
              <h2 className="text-TextPrimary text-2xl font-semibold md:text-3xl">
                Cara Cetha Bantu Kamu Dapat <br className="hidden md:block" />
                Kerjaan Impian
              </h2>
              <p className="text-TextSecondary mt-2 text-base lg:text-lg">
                Ikuti langkah sederhana ini untuk optimalkan CV, tingkatkan
                profil LinkedIn, dan temukan lowongan yang paling cocok untukmu.
              </p>
            </div>
          </motion.div>

          <div className="py-10">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
            <InfiniteMovingCards
              items={testimonials}
              direction="left"
              speed="slow"
            />
          </div>

          <CtaSection />
        </div>
      </section>
    </main>
  );
}