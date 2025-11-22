// filepath: d:\Projectan\cetha\src\components\dashboard\profil-dashboard.tsx
"use client";
import { useRouter } from "next/navigation";
import { Avatar } from "@radix-ui/react-avatar";
import UserAvatar from "@/components/user-avatar";
import { Edit, FileUser } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "@/app/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

interface ProfilDashboardProps {
  username: string | null;
  email: string | null;
  skills: string[];
  role?: string[] | string;
  onEditProfile?: () => void;
  onViewCV?: () => void;
}

interface UserData {
  username?: string;
  email?: string;
  photoURL?: string;
  createdAt?: any;
  lastLogin?: any;
  role?: string[];
  skills?: string[];
}

export default function ProfilDashboard({
  username,
  email,
  skills,
  role = "-",
  onEditProfile,
  onViewCV,
}: ProfilDashboardProps) {

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const user = auth.currentUser;

  // === PALETTE WARNA UNTUK CHIP ===
  const chipColors = [
    "bg-red-100 text-red-700 border-red-200",
    "bg-yellow-100 text-yellow-700 border-yellow-200",
    "bg-green-100 text-green-700 border-green-200",
    "bg-blue-100 text-blue-700 border-blue-200",
    "bg-indigo-100 text-indigo-700 border-indigo-200",
    "bg-purple-100 text-purple-700 border-purple-200",
    "bg-pink-100 text-pink-700 border-pink-200",
    "bg-orange-100 text-orange-700 border-orange-200",
    "bg-teal-100 text-teal-700 border-teal-200",
    "bg-cyan-100 text-cyan-700 border-cyan-200",
  ];

  // Fungsi hash sederhana → warna sama setiap skill/role
  const getChipColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return chipColors[Math.abs(hash % chipColors.length)];
  };

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUserData(snap.data() as UserData);
      } else {
        const seed: UserData = {
          username: user.displayName || user.email?.split("@")[0],
          email: user.email || "",
          photoURL: user.photoURL || "",
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          role: ["mahasiswa"],
          skills: ["React", "TypeScript", "Node.js"],
        };
        await setDoc(ref, seed);
        setUserData(seed);
      }
      setLoading(false);
    };
    load();
  }, [user]);


  const handleEditClick = () => {
    if (onEditProfile) {
      onEditProfile();
    } else {
      router.push("/dashboard/profile");
    }
  };
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md lg:col-span-7">
      <div className="to-accentOrange h-24 bg-gradient-to-r from-purple-200" />
      <div className="px-6 pb-6">
        <div className="-mt-12 flex justify-start">
          <Avatar>
            <UserAvatar className="h-20 w-20 rounded-full" />
          </Avatar>
        </div>
        <div className="mt-4 text-start">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {username || "Kamu belum login"}
              </h2>
              <p className="text-gray-600">{email}</p>
              <p className="mt-2 font-medium text-blue-600 capitalize gap-2 flex flex-wrap gap-2">
                {(userData?.role || []).length > 0 ? (
                  userData!.role!.map((r) => (
                    <span
                      key={r}
                      className={`inline-block rounded-full border px-3 py-1 text-sm font-medium transition-all hover:scale-105 ${getChipColor(
                        r
                      )}`}
                    >
                      {r}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">Belum ada role.</p>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEditClick}
                className="flex items-center rounded-md px-2 py-2 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-500"
              >
                <Edit className="mr-1" size={18} /> Edit Profil
              </button>
              <button
                onClick={onViewCV}
                className="flex items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-500"
              >
                <FileUser className="mr-1" size={18} /> Lihat CV
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-100 pt-3">
          <h3 className="mb-3 font-medium text-gray-600">Skill Highlights</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {(userData?.skills || []).length > 0 ? (
                  userData!.skills!.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-block rounded-full border px-3 py-1 text-sm font-medium transition-all hover:scale-105 ${getChipColor(
                        skill
                      )}`}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">Belum ada skill.</p>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}
