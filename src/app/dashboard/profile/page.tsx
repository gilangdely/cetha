"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/app/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import UserAvatar from "@/components/user-avatar";
import { Avatar } from "@radix-ui/react-avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import PencapaianTerbaru from "@/components/dashboard/pencapaian";

interface UserData {
  username?: string;
  email?: string;
  photoURL?: string;
  createdAt?: any;
  lastLogin?: any;
  role?: string[];
  skills?: string[];
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
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

  // === LOAD DATA USER ===
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

  // === SIMPAN KE FIRESTORE ===
  const handleSaveProfile = async () => {
    if (!user || !userData) return;

    try {
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, {
        username: userData.username || "",
        role: userData.role || [],
        skills: userData.skills || [],
        // lastLogin bisa di-update juga kalau mau
      });
      console.log("Profile berhasil disimpan ke Firestore!");
      setEditOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan profile:", error);
      alert("Gagal menyimpan, cek console untuk detail.");
    }
  };

  // === UPDATE STATE ===
  const handleChangeField = (field: keyof UserData, value: any) => {
    setUserData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  // === TAMBAH ROLE / SKILL ===
  const addItem = (
    input: string,
    setInput: (v: string) => void,
    field: "role" | "skills"
  ) => {
    const trimmed = input.trim();
    if (trimmed && userData) {
      const current = userData[field] || [];
      if (!current.includes(trimmed)) {
        handleChangeField(field, [...current, trimmed]);
      }
      setInput("");
    }
  };

  // === HAPUS ITEM ===
  const removeItem = (field: "role" | "skills", index: number) => {
    if (!userData) return;
    const current = userData[field] || [];
    handleChangeField(field, current.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-primaryBlue" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg">Kamu belum login.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Profil</h1>
            <p className="mt-1 text-gray-500">Kelola informasi akun kamu</p>
          </div>
          <button
            onClick={() => setEditOpen(true)}
            className="rounded-lg bg-primaryBlue px-4 py-2 text-sm font-medium text-white hover:bg-primaryBlue/90"
          >
            Edit Profil
          </button>
        </div>

        {/* Profile Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Avatar + Nama */}
          <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Avatar className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-4 border-primaryBlue shadow-lg">
              <UserAvatar className="h-full w-full rounded-full object-cover" />
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                {userData?.username || user.displayName || "Pengguna"}
              </h2>
              <p className="text-gray-600">{userData?.email || user.email}</p>
            </div>
          </div>
 
          <hr className="mb-6 border-gray-100" />

          {/* Info Detail */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Username
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {userData?.username || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Role Saat Ini
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
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
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Skill Highlights
              </p>
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

        <div className="mt-8">
          <PencapaianTerbaru />
        </div>
      </div>

      {/* Sheet Edit Profil */}
      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent className="overflow-y-auto px-6">
          <SheetHeader>
            <SheetTitle>Edit Profil</SheetTitle>
            <SheetDescription>
              Ubah informasi dasar akun kamu.
            </SheetDescription>
          </SheetHeader>

          {userData && (
            <div className="mt-6 space-y-6">
              {/* Username */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Username
                </label>
                <input
                  value={userData.username || ""}
                  onChange={(e) => handleChangeField("username", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 focus:border-primaryBlue focus:outline-none"
                  placeholder="Username"
                />
              </div>

              {/* Role */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Role (tekan Enter atau koma)
                </label>
                <input
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addItem(roleInput, setRoleInput, "role");
                    }
                  }}
                  className="w-full rounded-md border px-3 py-2 focus:border-primaryBlue focus:outline-none"
                  placeholder="Mahasiswa, Frontend Dev, dll"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {(userData.role || []).map((r, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium ${getChipColor(
                        r
                      )}`}
                    >
                      {r}
                      <button
                        onClick={() => removeItem("role", i)}
                        className="ml-1 hover:text-red-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Skill Highlights (tekan Enter atau koma)
                </label>
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addItem(skillInput, setSkillInput, "skills");
                    }
                  }}
                  className="w-full rounded-md border px-3 py-2 focus:border-primaryBlue focus:outline-none"
                  placeholder="React, Next.js, Tailwind CSS"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {(userData.skills || []).map((s, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium ${getChipColor(
                        s
                      )}`}
                    >
                      {s}
                      <button
                        onClick={() => removeItem("skills", i)}
                        className="ml-1 hover:text-red-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Tombol */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSaveProfile}>Simpan Perubahan</Button>
                <Button variant="outline" onClick={() => setEditOpen(false)}>
                  Batal
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}