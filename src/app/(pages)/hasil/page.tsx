"use client";

import GoodThingMd from "@/components/good-things-md";
import NeedImprovementMd from "@/components/need-improvement-md";
import { motion } from "framer-motion";
import Image from "next/image";

import cardImg from "@/assets/img/article2.jpg";

export default function ResultPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl items-start justify-center gap-6 px-6 pt-14 sm:px-6 md:pt-18 lg:gap-8 lg:px-8 lg:pt-22">
      {/* Left Card  */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="sticky top-24 hidden w-70 flex-shrink-0 lg:block"
      >
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="relative h-30 w-full bg-gradient-to-br from-blue-50 to-blue-100">
            <Image
              src={cardImg}
              alt="CV Review"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-2">
            <h3 className="mb-3 text-sm font-semibold text-gray-800">
              Coba nilai CV-mu berdasarkan pekerjaan impian mu
            </h3>
            <button className="mt-2 w-full rounded-lg bg-primaryBlue px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Coba sekarang
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <section className="w-full max-w-3xl flex-shrink-0">
        <div className="flex w-full items-center py-8 sm:py-12 lg:min-h-screen lg:py-0">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full"
            >
              <h2 className="text-center text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl">
                Berikut adalah rangkuman dari CV kamu
              </h2>

              {/* Info Box */}
              <div className="mt-6 flex items-center justify-center sm:mt-8">
                <div className="border-primaryBlue w-full max-w-2xl rounded-full border-2">
                  <div className="flex items-center gap-3 px-2 py-1.5 sm:justify-between sm:gap-4 sm:py-2 md:gap-6 md:px-6 lg:gap-10">
                    <p className="text-center text-xs sm:text-left sm:text-sm md:text-base lg:text-lg">
                      Kami melihat beberapa potensi yang kamu miliki
                    </p>
                    <div className="bg-primaryBlue flex shrink-0 items-center rounded-full p-2">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                      >
                        <path
                          d="M7.5 5.25L7.113 6.2955C6.606 7.6665 6.3525 8.352 5.85225 8.85225C5.352 9.3525 4.6665 9.606 3.2955 10.113L2.25 10.5L3.2955 10.887C4.6665 11.394 5.352 11.6483 5.85225 12.1478C6.3525 12.6473 6.606 13.3335 7.113 14.7045L7.5 15.75L7.887 14.7045C8.394 13.3335 8.64825 12.648 9.14775 12.1478C9.64725 11.6475 10.3335 11.394 11.7045 10.887L12.75 10.5L11.7045 10.113C10.3335 9.606 9.648 9.3525 9.14775 8.85225C8.6475 8.352 8.394 7.6665 7.887 6.2955L7.5 5.25ZM13.5 2.25L13.3342 2.69775C13.1167 3.28575 13.008 3.57975 12.7943 3.7935C12.5798 4.008 12.2858 4.11675 11.6978 4.3335L11.25 4.5L11.6985 4.66575C12.2857 4.88325 12.5798 4.992 12.7935 5.20575C13.008 5.42025 13.1167 5.71425 13.3335 6.30225L13.5 6.75L13.6658 6.30225C13.8833 5.71425 13.992 5.42025 14.2057 5.2065C14.4202 4.992 14.7142 4.88325 15.3022 4.6665L15.75 4.5L15.3015 4.33425C14.7143 4.11675 14.4202 4.008 14.2065 3.79425C13.992 3.57975 13.8833 3.28575 13.6665 2.69775L13.5 2.25Z"
                          stroke="white"
                          strokeWidth="1.125"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Good & Need Improvement Sections */}
              <div className="my-8 space-y-8 sm:mt-12 sm:space-y-12">
                <GoodThingMd />
                <NeedImprovementMd />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="mt-8 sm:mt-12 lg:hidden"
              >
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
                  <div className="p-6 sm:p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex p-2 items-center justify-center rounded-full bg-primaryBlue">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 5.25L9.484 6.794C8.808 8.888 8.47 9.936 7.768 10.638C7.066 11.34 6.018 11.678 3.922 12.354L2.378 12.87L3.922 13.386C6.018 14.062 7.066 14.4 7.768 15.102C8.47 15.804 8.808 16.852 9.484 18.946L10 20.49L10.516 18.946C11.192 16.852 11.53 15.804 12.232 15.102C12.934 14.4 13.982 14.062 16.078 13.386L17.622 12.87L16.078 12.354C13.982 11.678 12.934 11.34 12.232 10.638C11.53 9.936 11.192 8.888 10.516 6.794L10 5.25ZM18 3L17.7789 3.597C17.4889 4.381 17.344 4.773 17.0591 5.058C16.7742 5.343 16.3819 5.488 15.5973 5.778L15 6L15.598 6.221C16.3819 6.511 16.7742 6.656 17.0591 6.941C17.344 7.226 17.4889 7.619 17.7789 8.403L18 9L18.2211 8.403C18.5111 7.619 18.656 7.227 18.9409 6.942C19.2258 6.657 19.6181 6.512 20.4027 6.222L21 6L20.402 5.779C19.6181 5.489 19.2258 5.344 18.9409 5.059C18.656 4.774 18.5111 4.381 18.2211 3.597L18 3Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 sm:text-2xl">
                        Coba Rekomendasi Pekerjaan
                      </h3>
                    </div>
                    <p className="mb-6 text-sm text-gray-600 sm:text-base">
                      Temukan pekerjaan yang sesuai dengan skill dan pengalaman
                      yang kamu miliki berdasarkan analisis CV kamu.
                    </p>
                    <button className="w-full rounded-xl bg-primaryBlue px-6 py-3.5 font-medium text-white shadow-md transition-all hover:bg-blue-600 hover:shadow-lg sm:text-lg">
                      Lihat Rekomendasi Pekerjaan
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="hidden w-80 flex-shrink-0 lg:block" />
    </main>
  );
}
