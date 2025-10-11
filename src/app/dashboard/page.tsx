"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/lib/auth";
import { auth } from "@/app/lib/firebase";

import LinkedAccounts from "@/components/linked-account";

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || "Pengguna");
      } else {
        setUsername(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <p className="mr-5 text-center">
        {username ? `Halo, ${username}!` : "Kamu belum login"}
      </p>
      <LinkedAccounts />
    </div>
  );
}
