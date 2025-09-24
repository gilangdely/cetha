"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Facebook, Instagram, Globe } from "lucide-react";

import logo from "@/assets/icons/logo-cetha.svg";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
      className="mt-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-12 text-gray-300"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 md:grid-cols-3">
        {/* Brand & Deskripsi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link href="/" className="flex items-center gap-3">
            <Image src={logo} alt="logo" height={35} />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
            Menjelajahi dunia herbal dengan AI, terinspirasi oleh tradisi
            penyembuhan Nusantara.
          </p>
          <div className="mt-4 flex gap-4">
            <Link
              href="https://www.instagram.com/kurawal.creative/?hl=id"
              target="_blank"
              className="transition-colors hover:text-[#E1306C]"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61578699331169"
              target="_blank"
              className="transition-colors hover:text-[#1877F2]"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://kurawal.site/"
              target="_blank"
              className="hover:text-accentOrange transition-colors"
            >
              <Globe size={20} />
            </Link>
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="flex gap-10 md:col-span-2 md:justify-end lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6 text-sm"
          >
            <div>
              <h3 className="mb-3 text-lg font-semibold text-white">
                Navigasi
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/cv-review"
                    className="hover:underline hover:underline-offset-2"
                  >
                    Review CV
                  </Link>
                </li>
                <li>
                  <Link
                    href="/linkedin-review"
                    className="hover:underline hover:underline-offset-2"
                  >
                    Review LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career-tips"
                    className="hover:underline hover:underline-offset-2"
                  >
                    Blog Karier
                  </Link>
                </li>
                <li>
                  <Link
                    href="/interview-guide"
                    className="hover:underline hover:underline-offset-2"
                  >
                    Video Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:underline hover:underline-offset-2"
                  >
                    Harga
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:underline hover:underline-offset-2"
                  >
                    Tentang Kami
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-white">Lainnya</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/faq"
                    className="hover:underline hover:underline-offset-2"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:underline hover:underline-offset-2"
                  >
                    Hubungi Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:underline hover:underline-offset-2"
                  >
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:underline hover:underline-offset-2"
                  >
                    Syarat & Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Kontak & Sosmed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="mb-3 text-lg font-semibold text-white">
              Kontak Kami
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} /> +62 123-456-789
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> kurawal.creative@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Purwokerto, Indonesia
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="mt-10 border-t border-gray-700 py-4 text-center text-xs text-white">
        © {new Date().getFullYear()} Daunesia. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
