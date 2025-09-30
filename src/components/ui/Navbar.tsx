"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ChevronRight, Menu, X } from "lucide-react";

import logo from "@/assets/icons/cetha-logo.svg";

const navLinks = [
  {
    label: "Fitur",
    key: "features",
    children: [
      {
        href: "/review-cv",
        title: "Review CV Instan",
        desc: "Dapatkan feedback profesional untuk CV Anda",
      },
      {
        href: "/improve-linkedIn",
        title: "Improve Profile LinkedIn",
        desc: "Optimalisasi profil LinkedIn Anda",
      },
    ],
  },
  {
    label: "Blog & Tips",
    key: "blog",
    children: [
      {
        href: "/career-tips",
        title: "Blog Karier",
        desc: "Artikel & insight untuk bantu perkembangan karirmu",
      },
      {
        href: "/interview-guide",
        title: "Video Tips",
        desc: "Kumpulan tips karier dalam format video singkat & seru",
      },
    ],
  },
  { label: "Harga", href: "/pricing" },
  { label: "Tentang Kami", href: "/about-us" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isMobileMenuOpen
          ? "bg-white shadow-sm" 
          : isScrolled
            ? "bg-white/80 shadow-sm backdrop-blur-md" 
            : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image alt="Cetha Logo" src={logo} height={45} />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-10 text-gray-700 md:flex">
          {navLinks.map((link) =>
            link.children ? (
              <li
                key={link.key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown(link.key!)}
                  className="hover:text-primaryBlue flex items-center gap-1 transition-colors"
                >
                  {link.label}
                  {activeDropdown === link.key ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {activeDropdown === link.key && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white/80 shadow-lg backdrop-blur-md"
                    >
                      <div className="py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="hover:text-primaryBlue block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50/60"
                          >
                            <div className="font-medium">{child.title}</div>
                            <div className="text-sm text-gray-500">
                              {child.desc}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href!}
                  className="hover:text-primaryBlue transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className="bg-primaryBlue hover:bg-primaryBlue/90 flex items-center rounded-full px-4 py-2.5 font-medium text-white transition-colors"
          >
            Masuk <ChevronRight size={20} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="bg-white/80 shadow-md backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col space-y-3 p-4">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.key} className="flex flex-col">
                    <button
                      onClick={() => toggleDropdown(link.key!)}
                      className="flex items-center justify-between py-2 font-medium text-gray-700"
                    >
                      {link.label}
                      {activeDropdown === link.key ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                    <AnimatePresence>
                      {activeDropdown === link.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-3 flex flex-col"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="hover:text-primaryBlue px-2 py-2 text-sm text-gray-600 transition-colors"
                            >
                              {child.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href!}
                    className="hover:text-primaryBlue py-2 text-gray-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                ),
              )}

              {/* CTA on Mobile */}
              <Link
                href="/login"
                className="bg-primaryBlue hover:bg-primaryBlue/90 flex items-center justify-center rounded-full px-4 py-2.5 font-medium text-white transition-colors"
              >
                Masuk <ChevronRight size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
