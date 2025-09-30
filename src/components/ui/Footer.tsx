"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Facebook, Instagram, Globe } from "lucide-react";

import logo from "@/assets/icons/cetha-logo-white.svg";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mt-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-12 text-gray-300"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand & Deskripsi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link href="/" className="flex items-center gap-3">
            <Image src={logo} alt="logo" priority />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
            Menjelajahi dunia herbal dengan AI, terinspirasi oleh tradisi
            penyembuhan Nusantara.
          </p>
          <div className="mt-4 flex gap-4">
            {[
              {
                href: "https://www.instagram.com/kurawal.creative/?hl=id",
                icon: <Instagram size={20} />,
                color: "#E1306C",
              },
              {
                href: "https://www.facebook.com/profile.php?id=61578699331169",
                icon: <Facebook size={20} />,
                color: "#1877F2",
              },
              {
                href: "https://kurawal.site/",
                icon: <Globe size={20} />,
                color: "#f97316",
              },
            ].map((sosmed, i) => (
              <motion.a
                key={i}
                href={sosmed.href}
                target="_blank"
                whileHover={{ scale: 1.15, color: sosmed.color }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {sosmed.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-6 text-sm"
        >
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Navigasi</h3>
            <ul className="space-y-2">
              {[
                { href: "/review-cv", label: "Review CV" },
                { href: "/improve-linkedIn", label: "Review LinkedIn" },
                { href: "/career-tips", label: "Blog Karier" },
                { href: "/interview-guide", label: "Video Tips" },
                { href: "/pricing", label: "Harga" },
                { href: "/about", label: "Tentang Kami" },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="hover:text-primaryBlue transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Lainnya</h3>
            <ul className="space-y-2">
              {[
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Hubungi Kami" },
                { href: "/privacy", label: "Kebijakan Privasi" },
                { href: "/terms", label: "Syarat & Ketentuan" },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="hover:text-primaryBlue transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Kontak */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm"
        >
          <h3 className="mb-3 text-lg font-semibold text-white">Kontak Kami</h3>
          <ul className="space-y-2">
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

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-10 border-t border-gray-700 py-4 text-center text-xs text-white"
      >
        © {new Date().getFullYear()} Cetha. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
