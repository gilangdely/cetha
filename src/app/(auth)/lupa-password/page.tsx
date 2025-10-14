"use client";

import { useState } from "react";
import { resetPassword } from "@/app/lib/auth";

import AuthCarousel from "@/components/auth-carousel";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Masukkan email terlebih dahulu.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "✅ Link reset password telah dikirim ke email kamu. Silakan cek inbox atau folder spam."
      );
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/user-not-found") {
        setMessage("❌ Email tidak terdaftar di sistem kami.");
      } else if (error.code === "auth/invalid-email") {
        setMessage("❌ Format email tidak valid.");
      } else {
        setMessage("❌ Terjadi kesalahan: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
                    Lupa password?
                  </div>
                  <div className="text-TextSecondary text-sm">
                    Tenang, kita buatkan yang baru.
                  </div>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Masukkan email kamu"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-3 rounded-lg text-white font-semibold ${loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                    {loading ? "Mengirim..." : "Kirim Link Reset"}
                  </button>
                </form>

                {message && (
                  <p
                    className={`mt-4 text-sm text-center ${message.startsWith("✅")
                        ? "text-green-600"
                        : message.startsWith("❌")
                          ? "text-red-600"
                          : "text-gray-700"
                      }`}
                  >
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
