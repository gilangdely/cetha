"use client";

import { useState } from "react";
import { resetPassword } from "@/app/lib/auth";

import AuthCarousel from "@/components/AuthCarousel";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      alert("Email wajib diisi");
      return;
    }

    setLoading(true);
    try {
      const message = await resetPassword(email);
      alert(message);
    } catch (error: any) {
      console.error("Error saat reset password:", error);
      alert(error.message);
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

                {/* Tombol Login */}
                <div className="mt-2 w-full">
                  <button
                    onClick={handleResetPassword}
                    className="bg-primaryBlue h-12 w-full cursor-pointer rounded-full font-semibold text-white"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
