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
import Image from "next/image";
import ProfilDashboard from "@/components/dashboard/profil-dashboard";
import PencapaianTerbaru from "@/components/dashboard/pencapaian";
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

interface UserData {
  username?: string;
  email?: string;
  photoURL?: string;
  createdAt?: any;
  lastLogin?: any;
  role?: string;
  skills?: string[];
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const user = auth.currentUser;

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
          role: "mahasiswa",
          skills: ["React", "TypeScript", "Node.js"],
        };
        await setDoc(ref, seed);
        setUserData(seed);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user || !userData) return;
    // TODO: Simpan ke Firebase nanti
    // const ref = doc(db, "users", user.uid);
    // await updateDoc(ref, {
    //   username: userData.username,
    //   role: userData.role,
    //   skills: userData.skills,
    // });
    console.log("Profile updated (dummy):", userData);
    setEditOpen(false);
  };

  const handleChangeField = (field: keyof UserData, value: any) => {
    setUserData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleViewCV = () => {
    // placeholder logic
    alert("Fitur lihat CV belum tersedia.");
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="border-primaryBlue h-10 w-10 animate-spin rounded-full border-t-2 border-b-2" />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="p-6">
        <h2 className="text-TextPrimary text-xl font-semibold">Profil</h2>
        <p className="text-TextSecondary mt-2 text-sm">
          Kamu belum login. Silakan masuk terlebih dahulu.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Profil</h1>
            <p className="mt-1 text-gray-500">Kelola informasi akun kamu</p>
          </div>
          <button
            onClick={() => setEditOpen(true)}
            className="bg-primaryBlue hover:bg-primaryBlue/90 rounded-lg px-4 py-2 text-sm font-medium text-white"
          >
            Edit Profil
          </button>
        </div>

        {/* Profile Info Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Photo Profile Section */}
          <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Avatar className="border-primaryBlue h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-4 shadow-lg">
              <UserAvatar className="h-32 w-32 rounded-full" />
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                {userData?.username || user.displayName || "Pengguna"}
              </h2>
              <p className="text-gray-600">{userData?.email || user.email}</p>
              <div className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1">
                <p className="text-primaryBlue text-sm font-medium capitalize">
                  {userData?.role || "Pengguna"}
                </p>
              </div>
            </div>
          </div>

          <hr className="mb-6 border-gray-100" />

          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                Username
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {userData?.username || user.displayName || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                Email
              </p>
              <p className="mt-1 text-lg text-gray-700">
                {userData?.email || user.email}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                Role Saat Ini
              </p>
              <p className="mt-1 text-lg text-gray-700 capitalize">
                {userData?.role || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                Skill Highlights
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(userData?.skills || []).length > 0 ? (
                  (userData?.skills || []).map((skill) => (
                    <span
                      key={skill}
                      className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
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

        {/* Pencapaian */}
        <div className="mt-8">
          <PencapaianTerbaru />
        </div>
      </div>

      {/* Sheet Edit Profile */}
      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent className="px-6">
          <SheetHeader>
            <SheetTitle>Edit Profil</SheetTitle>
            <SheetDescription>Ubah informasi dasar akun kamu.</SheetDescription>
          </SheetHeader>
          {userData && (
            <div className="mt-6 space-y-4 text-sm">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Username
                </label>
                <input
                  value={userData.username || ""}
                  onChange={(e) =>
                    handleChangeField("username", e.target.value)
                  }
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="Username"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Role Saat Ini
                </label>
                <input
                  value={userData.role || ""}
                  onChange={(e) => handleChangeField("role", e.target.value)}
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="Contoh: Mahasiswa, Junior Dev, Intern"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Skill Highlights (pisahkan dengan koma)
                </label>
                <input
                  value={(userData.skills || []).join(", ")}
                  onChange={(e) =>
                    handleChangeField(
                      "skills",
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="React, Node.js, UI/UX"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={handleSaveProfile}>
                  Simpan
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditOpen(false)}
                >
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
