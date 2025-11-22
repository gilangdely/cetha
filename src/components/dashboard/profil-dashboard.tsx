// filepath: d:\Projectan\cetha\src\components\dashboard\profil-dashboard.tsx
"use client";
import { useRouter } from "next/navigation";
import { Avatar } from "@radix-ui/react-avatar";
import UserAvatar from "@/components/user-avatar";
import { Edit, FileUser } from "lucide-react";

interface ProfilDashboardProps {
  username: string | null;
  email: string | null;
  skills: string[];
  role?: string | null;
  onEditProfile?: () => void;
  onViewCV?: () => void;
}

export default function ProfilDashboard({
  username,
  email,
  skills,
  role = "-",
  onEditProfile,
  onViewCV,
}: ProfilDashboardProps) {
  const router = useRouter();

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
              <p className="mt-2 font-medium text-blue-600 capitalize">
                {role || "-"}
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
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-xs text-gray-400">Belum ada skill.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
