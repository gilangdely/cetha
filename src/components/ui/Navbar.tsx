"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

import logo from "@/assets/icons/cetha-logo.svg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-gray-200 border-b-gray-200 bg-white/80 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image alt="logo cetha" src={logo} height={50} className="relative"/>
          </Link>
          <ul className="flex gap-10 text-gray-700">
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter("features")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="hover:text-primaryBlue flex cursor-pointer items-center gap-1 transition-colors">
                Fitur{" "}
                {activeDropdown === "features" ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>

              {/* Dropdown Menu for Features */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300 ${
                  activeDropdown === "features"
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="py-2">
                  <Link
                    href="/review-cv"
                    className="hover:text-primaryBlue block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <div className="font-medium">Review CV Instan</div>
                    <div className="text-sm text-gray-500">
                      Dapatkan feedback profesional untuk CV Anda
                    </div>
                  </Link>
                  <Link
                    href="/improve-linkedIn"
                    className="hover:text-primaryBlue block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <div className="font-medium">Improve Profile LinkedIn</div>
                    <div className="text-sm text-gray-500">
                      Optimalisasi profil LinkedIn Anda
                    </div>
                  </Link>
                </div>
              </div>
            </li>

            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter("blog")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/blog"
                className="hover:text-primaryBlue flex items-center gap-1 transition-colors"
              >
                Blog & Tips{" "}
                {activeDropdown === "blog" ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </Link>

              {/* Dropdown Menu for Blog & Tips */}
              <div
                className={`absolute top-full left-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300 ${
                  activeDropdown === "blog"
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="py-2">
                  <Link
                    href="/career-tips"
                    className="hover:text-primaryBlue block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <div className="font-medium">Blog Karier</div>
                    <div className="text-sm text-gray-500">
                      Artikel & insight untuk bantu perkembangan karirmu
                    </div>
                  </Link>
                  <Link
                    href="/interview-guide"
                    className="hover:text-primaryBlue block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <div className="font-medium">Video Tips</div>
                    <div className="text-sm text-gray-500">
                      Kumpulan tips karier dalam format video singkat & seru
                    </div>
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/pricing"
                className="hover:text-primaryBlue transition-colors"
              >
                Harga
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="hover:text-primaryBlue transition-colors"
              >
                Tentang Kami
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Link
            href="/login"
            className="bg-primaryBlue hover:bg-primaryBlue/90 flex items-center rounded-full px-4 py-2.5 font-medium text-white transition-colors active:border-[#BBCFF9]"
          >
            Masuk <ChevronRight className="relative" size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
