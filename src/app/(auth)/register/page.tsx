"use client";

import { useState } from "react";
import { registerUser } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import AuthCarousel from "@/components/AuthCarousel";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("semua field harus diisi!");
      return;
    }

    setLoading(true);
    try {
      await registerUser(username, email, password, confirmPassword);
      alert("Registrasi berhasil!");
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen max-w-screen bg-[#F9FAFB]">
      <section className="max-w-8xl mx-auto flex min-h-screen w-full flex-row gap-4">
        {/* Right Panel */}
        <AuthCarousel />

        {/* Left Panel */}
        <div className="flex flex-1 p-5">
          <div className="flex flex-1 flex-col rounded-xl bg-white">
            <div className="flex flex-1 items-center justify-center">
              <div className="flex w-full max-w-md flex-1 flex-col gap-4">
                <div className="flex flex-col gap-2 text-center">
                  <div className="text-TextPrimary text-3xl font-semibold">
                    Daftar Akun Baru
                  </div>
                  <div className="text-TextSecondary text-sm">
                    Buat profilmu, unggah CV, dan biarkan sistem kami
                    rekomendasikan pekerjaan yang tepat.
                  </div>
                </div>

                <div className="mt-1 flex w-full flex-col gap-1">
                  <div className="text-TextPrimary text-sm font-medium">
                    Username
                  </div>
                  <input
                    type="username"
                    placeholder="Masukan username kamu"
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-TextPrimary h-10 rounded-xl border-2 border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400"
                  />
                </div>

                <div className="flex w-full flex-col gap-1">
                  <div className="text-TextPrimary text-sm font-medium">
                    Email
                  </div>
                  <input
                    type="email"
                    placeholder="Masukan email kamu"
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-TextPrimary h-10 rounded-xl border-2 border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400"
                  />
                </div>

                <div className="flex w-full flex-col gap-1">
                  <div className="text-TextPrimary text-sm font-medium">
                    Password
                  </div>
                  <input
                    type="password"
                    placeholder="Masukan password kamu"
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-TextPrimary h-10 rounded-xl border-2 border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400"
                  />
                </div>

                <div className="flex w-full flex-col gap-1">
                  <div className="text-TextPrimary text-sm font-medium">
                    Konfirmasi Password
                  </div>
                  <input
                    type="password"
                    placeholder="Masukan password kamu"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="text-TextPrimary h-10 rounded-xl border-2 border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400"
                  />
                </div>

                <div className="mt-2 w-full">
                  <button
                    onClick={handleRegister}
                    className="bg-primaryBlue h-12 w-full cursor-pointer rounded-full font-semibold text-white"
                  >
                    Buat Akun
                  </button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="h-0.5 w-full rounded-lg bg-gray-200" />
                  <div className="text-TextSecondary text-sm">atau</div>
                  <div className="h-0.5 w-full rounded-lg bg-gray-200" />
                </div>

                <div className="flex w-full flex-col gap-4 lg:flex-row">
                  <div className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#E0E1E2] bg-[#F9FAFB]">
                    <svg className="h-5 w-5" viewBox="0 0 48 48">
                      <path
                        fill="#fbc02d"
                        d="M43.6 20.5H42V20H24v8h11.3C33.3 32.3 29.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-3.5z"
                      />
                      <path
                        fill="#e53935"
                        d="M6.3 14.6l6.6 4.8C14.4 16.2 18.9 14 24 14c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4c-7.3 0-13.6 3.9-17.1 9.6z"
                      />
                      <path
                        fill="#4caf50"
                        d="M24 44c5.1 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.6 35.7 26.9 37 24 37c-5 0-9.2-3.3-10.7-7.9l-6.6 5.1C10.3 39.6 16.7 44 24 44z"
                      />
                      <path
                        fill="#1565c0"
                        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.7-6.1 7.2l6.2 5.2c-0.4 0.3 6.6-4.8 6.6-13.9 0-1.3-.1-2.7-.4-3.5z"
                      />
                    </svg>
                    <p className="text-TextPrimary font-medium">
                      Login dengan Google
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
