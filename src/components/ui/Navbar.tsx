"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Menu,
  X,
  LogOut,
  User,
  Settings,
} from "lucide-react";

import logo from "@/assets/icons/cetha-logo.svg";
import { Avatar } from "@radix-ui/react-avatar";
import UserAvatar from "../user-avatar";
import { logoutUser } from "@/app/lib/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

const navLinks = [
  {
    label: "Fitur",
    key: "features",
    children: [
      {
        href: "/review-cv",
        title: "Review CV Instan",
        desc: "Dapatkan feedback profesional untuk CV kamu",
      },
      {
        href: "/tingkatkan-linkedIn",
        title: "Improve Profile LinkedIn",
        desc: "Optimalisasi profil LinkedIn kamu",
      },
      {
        href: "/rekomendasi-pekerjaan",
        title: "Job Match",
        desc: "Rekomendasi pekerjaan terbaik sesuai CV kamu",
      },
    ],
  },
  {
    label: "Blog & Tips",
    href: "/tips-karir",
  },
  { label: "Harga", href: "/daftar-harga" },
  { label: "Tentang Kami", href: "/tentang-kami" },
];

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState("Cetha");
  const [email, setEmail] = useState("m@example.com");
  const [openAvatarMenu, setOpenAvatarMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const avatarMenuRef = useRef<HTMLDivElement>(null);
  const desktopAvatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(
          user.displayName || user.email?.split("@")[0] || "Pengguna",
        );
        setEmail(user.email || "m@example.com");
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopAvatarRef.current &&
        !desktopAvatarRef.current.contains(event.target as Node)
      ) {
        setOpenAvatarMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setOpenAvatarMenu(false);
      setIsMobileMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setOpenAvatarMenu(false);
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
        <Link href="/" className="z-10 flex items-center">
          <Image alt="Cetha Logo" src={logo} height={50} />
        </Link>

        {/* Desktop Nav */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 transform lg:flex">
          <ul className="flex items-center gap-10 text-gray-700">
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
                    className="hover:text-primaryBlue flex items-center gap-1 whitespace-nowrap transition-colors"
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
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg backdrop-blur-md"
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
                    className="hover:text-primaryBlue whitespace-nowrap transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Avatar + Auth - Desktop */}
        <div
          className="z-10 hidden items-center lg:flex"
          ref={desktopAvatarRef}
        >
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="bg-primaryBlue hover:bg-primaryBlue/90 flex items-center justify-center rounded-full px-4 py-2.5 font-medium text-white transition-colors"
            >
              Masuk <ChevronRight size={20} />
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpenAvatarMenu(!openAvatarMenu)}
                className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-gray-50"
              >
                <Avatar>
                  <UserAvatar />
                </Avatar>
                <div className="flex max-w-[140px] flex-col truncate text-left md:max-w-[160px] lg:max-w-none">
                  <span className="truncate text-sm font-medium text-gray-800">
                    Hai, {username}
                  </span>
                  <span className="text-xs text-gray-500">Lihat profil</span>
                </div>
              </button>

              <AnimatePresence>
                {openAvatarMenu && (
                  <motion.div
                    ref={avatarMenuRef}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 flex w-48 flex-col rounded-lg border border-gray-200 bg-white shadow-md"
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setOpenAvatarMenu(false)}
                    >
                      <User size={16} /> Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setOpenAvatarMenu(false)}
                    >
                      <Settings size={16} /> Pengaturan
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut size={16} /> Keluar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="z-10 rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
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
            className="bg-white/95 shadow-md backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col space-y-4 p-4">
              {/* Avatar & Username di atas - Mobile */}
              {isLoggedIn && (
                <div className="border-b border-gray-200 pb-3">
                  <button
                    onClick={() => setOpenAvatarMenu(!openAvatarMenu)}
                    className="flex w-full items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <UserAvatar />
                      </Avatar>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-medium text-gray-800">
                          Hai, {username}
                        </span>
                        <span className="text-xs text-gray-500">{email}</span>
                      </div>
                    </div>
                    {openAvatarMenu ? (
                      <ChevronUp size={18} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-500" />
                    )}
                  </button>

                  {/* Avatar Dropdown Menu - Mobile */}
                  <AnimatePresence>
                    {openAvatarMenu && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 flex flex-col space-y-1 overflow-hidden border-t border-gray-100 pt-3"
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={closeMobileMenu}
                        >
                          <User size={16} /> Dashboard
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={closeMobileMenu}
                        >
                          <Settings size={16} /> Pengaturan
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-gray-700 hover:bg-gray-50"
                        >
                          <LogOut size={16} /> Keluar
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Nav Links */}
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
                          transition={{ duration: 0.2 }}
                          className="ml-3 flex flex-col border-l border-gray-200 pl-3"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="hover:text-primaryBlue px-2 py-1.5 text-sm text-gray-600 transition-colors"
                              onClick={closeMobileMenu}
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
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ),
              )}

              {/* Login Button on Mobile (if not logged in) */}
              {!isLoggedIn && (
                <Link
                  href="/login"
                  className="bg-primaryBlue hover:bg-primaryBlue/90 flex items-center justify-center rounded-full px-4 py-2.5 font-medium text-white transition-colors"
                  onClick={closeMobileMenu}
                >
                  Masuk <ChevronRight size={20} />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
