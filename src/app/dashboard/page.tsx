"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/lib/auth";
import { auth } from "@/app/lib/firebase";

import LinkedAccounts from "@/components/linked-account";

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true)


  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || user.email || "Pengguna")
      } else {
        router.push("/") // redirect ke landing/login
      }
      setLoading(false)
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <p className="mr-5 text-center">
        {username ? `Halo, ${username}!` : "Kamu belum login"}
      </p>
      <LinkedAccounts />
    </div>
  );
}
