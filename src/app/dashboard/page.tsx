"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/lib/auth";
import { auth } from "@/app/lib/firebase";
import { Avatar } from "@radix-ui/react-avatar";
import UserAvatar from "@/components/user-avatar";
import {
  Briefcase,
  Calendar,
  Award,
  BarChart2,
  Book,
  Target,
  Linkedin,
  Github,
  Edit,
  TrendingUp,
  Check,
  Clock,
  FileUser,
  Dot,
  CircleStar,
  Lightbulb,
  BookOpenText
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();
  var achivements = ["Menyelesaikan Kursus React Lanjutan", "Mendapatkan Sertifikat Cloud", "Berhasil Melakukan Presentasi Proyek", "Mengikuti Workshop UX Design"];
  var skills = ["React", "Node.js", "TypeScript", "UX Design", "Firebase"];
  const steps = [
    "Pelajari materi System Design dasar",
    "Ikuti simulasi interview System Design",
    "Buat proyek mini dengan arsitektur microservices"
  ];
  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || "Pengguna");
        setEmail(user.email || "emailpengguna@mail.com");
      } else {
        setUsername(null);
        setEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6 w-full">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="">
            <h1 className="text-2xl font-bold text-gray-800">Halo, {username}</h1>
            <h3 className="text-lg text-gray-500"> Selamat datang di Dashboard Karir</h3>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden col-span-7 ">
            <div className="bg-gradient-to-r from-purple-200 to-accentOrange h-24"></div>
            <div className="px-6 pb-6">
              <div className="flex justify-start -mt-12">
                <Avatar className="">
                  <UserAvatar className="h-20 w-20 rounded-full" />
                </Avatar>
              </div>
              <div className="text-start mt-4">
                <div className="flex justify-between items-start">
                  <div className="">
                    <h2 className="text-xl font-bold text-gray-800"> {username || "Kamu belum login"} </h2>
                    <p className="text-gray-600">{email}</p>
                    <p className="text-blue-600 font-medium mt-2">Full-Stack Developer</p>
                    {/* <p className="text-gray-500 text-sm mt-1">Jakarta, Indonesia</p> */}
                  </div>
                  <div className="">
                    <div className="flex justify-center gap-2">
                      <button className="flex items-center px-2 text-sm py-2 text-gray-500 rounded-md hover:text-blue-500 hover:bg-blue-50">
                        <Edit className="mr-1 " size={20} />
                        Edit Profil
                      </button>
                      <button className="flex items-center px-4 text-sm  text-gray-500 rounded-md hover:text-blue-500 hover:bg-blue-50">
                        <FileUser className="mr-1" size={20} />
                        Lihat CV
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 border-t-2 border-gray-100">
                <h3 className="text-gray-600 font-medium mb-3">Skill Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 col-span-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock className="inline mr-2 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Riwayat Aktivitas bareng CETHA
                </h3>
              </div>
              <button className="text-gray-400 hover:text-blue-400 font-medium text-sm">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3  w-full">
                <div className="bg-blue-50 text-blue-500 p-2 aspect-square flex items-center justify-center rounded-md">
                  <BookOpenText size={20} />
                </div>
                <div className="w-full">
                  <div className="flex justify-between  w-full">
                    <p className="font-medium">Review CV</p>
                    <p className="text-sm text-gray-500">25 Oct, 10:00 - 11:00</p>
                  </div>
                  <p className="text-sm text-gray-500">Coba tambahkan beberapa poin ini..</p>
                </div>
              </div>
              <div className="flex gap-3  w-full">
                <div className="bg-orange-50 text-orange-500 p-2 aspect-square flex items-center justify-center rounded-md">
                  <Briefcase size={20} />
                </div>
                <div className="w-full">
                  <div className="flex justify-between  w-full">
                    <p className="font-medium">Rekomendasi Pekerjaan</p>
                    <p className="text-sm text-gray-500">25 Oct, 10:00 - 11:00</p>
                  </div>
                  <p className="text-sm text-gray-500">Pelajari detailnya</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-8">Coba fitur menarik lainnya di Cetha buat ningkatin kemampuan dan karir kamu</p>
          </div>
        </div>

        <div className="mt-4">
          {/* Career Progress */}
          <div className="flex gap-4 justify-center">
            {/* Career Goals */}
            <div className="w-full">
              <div className="bg-white h-full rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Target className="inline mr-2 text-rose-400" size={30} />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Target Karir
                    </h3>
                  </div>
                  <button className="text-gray-400 hover:text-blue-600 text-sm"><Edit size={20}></Edit></button>
                </div>
                <div className="space-y-4 mt-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Senior Developer Path</span>
                      <span className="text-sm font-medium text-blue-600">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Technical Interview Prep</span>
                      <span className="text-sm font-medium text-blue-600">42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cloud Certification</span>
                      <span className="text-sm font-medium text-blue-600">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 w-full">
              {/* Recent Achivement */}
              <div className="bg-white rounded-lg shadow-md p-6 w-full ">
                <div className="flex items-center">
                  <CircleStar className="inline mr-2 text-orange-300" size={30} />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Pencapaian Terbaru
                  </h3>
                </div>
                <hr className="my-4 border-t border-gray-200" />
                <div className="space-y-4">
                  {achivements.map(achivement => (
                    <div key={achivement} className="flex items-center gap-4">
                      <div className="bg-green-50 border-2 border-green-400 p-1 rounded-full">
                        <Check className="text-green-400" strokeWidth={4} size={10} />
                      </div>
                      <p className="text-sm">{achivement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-orange-600 text-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">Next Step</h3>
                      <TrendingUp size={20} />
                    </div>
                    <p className="text-sm opacity-90 mb-4">
                      Based on your profile and career goals, we recommend these actions:
                    </p>
                    <div className="space-y-3">
                      {steps.map(step => (
                        <div key={step} className="flex items-center gap-2">
                          <div className="bg-white/20 p-1 rounded-full border border-white">
                            <Lightbulb className="text-white" strokeWidth={2} size={16} />
                          </div>
                          <p className="text-sm">{step}</p>
                        </div >
                      ))}
                    </div>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
