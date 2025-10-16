"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/lib/auth";
import { auth } from "@/app/lib/firebase";
import { Avatar } from "@radix-ui/react-avatar";
import UserAvatar from "@/components/user-avatar";
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
} from "lucide-react";

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  const achivements = [
    "Menyelesaikan Kursus React Lanjutan",
    "Mendapatkan Sertifikat Cloud",
    "Berhasil Melakukan Presentasi Proyek",
    "Mengikuti Workshop UX Design",
  ];
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
    <div className="min-h-screen p-4 md:px-8 lg:px-10 w-full">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden lg:col-span-7">
            <div className="bg-gradient-to-r from-purple-200 to-accentOrange h-24"></div>
            <div className="px-6 pb-6">
              <div className="flex justify-start -mt-12">
                <Avatar>
                  <UserAvatar className="h-20 w-20 rounded-full" />
                </Avatar>
              </div>
              <div className="text-start mt-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {username || "Kamu belum login"}
                    </h2>
                    <p className="text-gray-600">{email}</p>
                    <p className="text-blue-600 font-medium mt-2">
                      Full-Stack Developer
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center px-2 text-sm py-2 text-gray-500 rounded-md hover:text-blue-500 hover:bg-blue-50">
                      <Edit className="mr-1" size={18} />
                      Edit Profil
                    </button>
                    <button className="flex items-center px-3 text-sm py-2 text-gray-500 rounded-md hover:text-blue-500 hover:bg-blue-50">
                      <FileUser className="mr-1" size={18} />
                      Lihat CV
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <h3 className="text-gray-600 font-medium mb-3">
                  Skill Highlights
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock className="inline mr-2 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Riwayat Aktivitas
                </h3>
              </div>
              <button className="text-gray-400 hover:text-blue-500 font-medium text-sm">
                Lihat Semua
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="bg-blue-50 text-blue-500 p-2 aspect-square flex items-center justify-center rounded-md">
                  <BookOpenText size={20} />
                </div>
                <div>
                  <p className="font-medium">Review CV</p>
                  <p className="text-sm text-gray-500">
                    25 Oct, 10:00 - 11:00 • Coba tambahkan beberapa poin ini..
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-orange-50 text-orange-500 p-2 aspect-square flex items-center justify-center rounded-md">
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
            <p className="text-sm text-gray-400 mt-6">
              Coba fitur lain di Cetha buat ningkatin kemampuan dan karir kamu ✨
            </p>
          </div>
        </div>

        {/* Career Progress & Achievements & Next Steps */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Target Karir */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Target className="inline mr-2 text-rose-400" size={28} />
                <h3 className="text-lg font-semibold text-gray-800">
                  Target Karir
                </h3>
              </div>
              <button className="text-gray-400 hover:text-blue-600 text-sm">
                <Edit size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Senior Developer Path", progress: 65 },
                { label: "Technical Interview Prep", progress: 42 },
                { label: "Cloud Certification", progress: 78 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm font-medium text-blue-600">
                      {item.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <CircleStar className="inline mr-2 text-orange-300" size={28} />
              <h3 className="text-lg font-semibold text-gray-800">
                Pencapaian Terbaru
              </h3>
            </div>
            <div className="space-y-3 mt-4">
              {achivements.map((achivement) => (
                <div key={achivement} className="flex items-center gap-3">
                  <div className="bg-green-50 border-2 border-green-400 p-1 rounded-full">
                    <Check
                      className="text-green-400"
                      strokeWidth={4}
                      size={10}
                    />
                  </div>
                  <p className="text-sm text-gray-700">{achivement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-500 to-orange-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Next Step</h3>
              <TrendingUp size={20} />
            </div>
            <p className="text-sm opacity-90 mb-4">
              Berdasarkan profilmu, berikut langkah yang direkomendasikan:
            </p>
            <div className="space-y-3">
              {steps.map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="bg-white/20 p-1 rounded-full border border-white">
                    <Lightbulb className="text-white" strokeWidth={2} size={16} />
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
