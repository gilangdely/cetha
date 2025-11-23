"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/lib/auth";
import { auth } from "@/app/lib/firebase";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Briefcase,
  Target,
  Edit,
  TrendingUp,
  Check,
  Clock,
  FileUser,
  CircleStar,
  Lightbulb,
  BookOpenText,
  Trash2,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EditTargetKarir from "@/components/dashboard/edit-target-karir";
import TargetKarir from "@/components/dashboard/target-karir";
import PencapaianTerbaru from "@/components/dashboard/pencapaian";
import ProfilDashboard from "@/components/dashboard/profil-dashboard";

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const router = useRouter();

  const skills = ["React", "Node.js", "TypeScript", "UX Design", "Firebase"];
  const steps = [
    "Pelajari materi System Design dasar",
    "Ikuti simulasi interview System Design",
    "Buat proyek mini dengan arsitektur microservices",
  ];

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUsername(user.displayName || "Pengguna");
      setEmail(user.email || "email@mail.com");
    }
  }, []);

  return (
    <div className="min-h-screen w-full p-4 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Halo, {username}
            </h1>
            <h3 className="text-lg text-gray-500">
              Selamat datang di Dashboard Karir
            </h3>
          </div>
        </div>

        {/* Profile & Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Profile Card */}
          <ProfilDashboard username={username} email={email} skills={skills} />

          {/* Activity */}
          <div className="rounded-xl bg-white p-6 shadow-md lg:col-span-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="mr-2 inline text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Riwayat Aktivitas
                </h3>
              </div>
              <button className="text-sm font-medium text-gray-400 hover:text-blue-500">
                Lihat Semua
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex aspect-square items-center justify-center rounded-md bg-blue-50 p-2 text-blue-500">
                  <BookOpenText size={20} />
                </div>
                <div>
                  <p className="font-medium">Review CV</p>
                  <p className="text-sm text-gray-500">
                    25 Oct, 10:00 - 11:00 • Coba tambahkan beberapa poin ini..
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex aspect-square items-center justify-center rounded-md bg-orange-50 p-2 text-orange-500">
                  <Briefcase size={20} />
                </div>
                <div>
                  <p className="font-medium">Rekomendasi Pekerjaan</p>
                  <p className="text-sm text-gray-500">
                    25 Oct, 10:00 - 11:00 • Pelajari detailnya
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              Coba fitur lain di Cetha buat ningkatin kemampuan dan karir kamu
              ✨
            </p>
          </div>
        </div>

        {/* Career Progress & Achievements & Next Steps */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Target Karir */}
          <TargetKarir />

          {/* Achievements */}
          <PencapaianTerbaru />

          {/* Next Steps */}
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-orange-600 p-6 text-white shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Next Step</h3>
              <TrendingUp size={20} />
            </div>
            <p className="mb-4 text-sm opacity-90">
              Berdasarkan profilmu, berikut langkah yang direkomendasikan:
            </p>
            <div className="space-y-3">
              {steps.map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="rounded-full border border-white bg-white/20 p-1">
                    <Lightbulb
                      className="text-white"
                      strokeWidth={2}
                      size={16}
                    />
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
