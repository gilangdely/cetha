"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser, loginWithGoogle } from "@/app/lib/auth";
import AuthCarousel from "@/components/AuthCarousel";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/lib/firebase"

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email dan Password wajib diisi");
      return;
    }
    setLoading(true);
    try {
      await loginUser(email, password);
      alert("Login berhasil!");
      router.push("/dashboard");
    } catch (error: any) {
      console.log("Error login : "+error);
      if (error.code === "auth/wrong-password") {
        setErrorMsg("Password salah. Coba lagi.")
      } else if (error.code === "auth/user-not-found") {
        setErrorMsg("Email belum terdaftar.")
      } else {
        setErrorMsg("Email atau password yang kamu masukkan tidak cocok.")
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      alert(`Selamat datang, ${user.displayName}!`);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error saat login dengan Google:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard") // ✅ Redirect kalau sudah login
      }
    })
    return () => unsubscribe()
  }, [])


  return (
    <main className="flex h-screen max-w-screen bg-[#F9FAFB]">
      <section className="max-w-8xl mx-auto flex min-h-screen w-full flex-row">
        {/* Right Panel */}
        <AuthCarousel />

        {/* Left Panel */}
        <div className="flex flex-1 p-5">
          <div className="flex flex-1 flex-col rounded-xl bg-white">
            <div className="flex flex-1 items-center justify-center">
              <div className="flex w-full max-w-md flex-1 flex-col gap-4">
                <div className="flex flex-col gap-2 text-center">
                  <div className="text-TextPrimary text-3xl font-semibold">
                    Hai, senang melihatmu lagi!
                  </div>
                  <div className="text-TextSecondary text-sm">
                    Login dan lanjutkan upgrade CV serta kariermu sekarang.
                  </div>
                </div>

                {/* Form Login */}
                <div className="mt-1 flex w-full flex-col gap-1">
                  <div className="text-TextPrimary text-sm font-medium">
                    Email
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukan email kamu"
                    className="text-TextPrimary h-10 rounded-xl border-2 border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400"
                  />
                </div>

                <div className="flex w-full flex-col gap-1">
                  <div className="text-TextPrimary text-sm font-medium">
                    Password
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukan password kamu"
                    className="text-TextPrimary h-10 rounded-xl border-2 border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400"
                  />
                </div>

                {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

                {/* Lupa Password */}
                <div className="text-primaryBlue -mt-2 mb-2 text-start font-medium underline-offset-2 hover:underline">
                  <Link href={"/forgot-password"}>Lupa password?</Link>
                </div>

                {/* Tombol Login */}
                <div className="mt-2 w-full">
                  <button
                    onClick={handleLogin}
                    className="bg-primaryBlue h-12 w-full cursor-pointer rounded-full font-semibold text-white"
                  >
                    Login
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-6">
                  <div className="h-0.5 w-full rounded-lg bg-gray-200" />
                  <div className="text-TextSecondary text-sm">atau</div>
                  <div className="h-0.5 w-full rounded-lg bg-gray-200" />
                </div>

                {/* Tombol Login Sosial */}
                <div className="flex w-full flex-col gap-4 lg:flex-row">
                  <button
                    onClick={handleGoogleLogin}
                    className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#E0E1E2] bg-[#F9FAFB]"
                  >
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
                  </button>
                </div>
                <div className="text-TextSecondary mt-5 text-center font-medium">
                  <p className="hidden lg:inline">{"Belum ada akun? "}</p>
                  <Link
                    href={"/register"}
                    className="text-primaryBlue underliner-offset-2 hover:underline"
                  >
                    Daftar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
