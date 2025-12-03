// filepath: d:\Projectan\cetha\src\components\dashboard\activity-history.tsx
// Buat file baru ini untuk komponen Riwayat Aktivitas yang reusable.
// Import ke dashboard utama: import ActivityHistory from "./activity-history";
// Lalu ganti snippet lama dengan <ActivityHistory />
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, BookOpenText, Briefcase, ChevronRight } from "lucide-react";
import { db } from "@/app/lib/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { auth } from "@/app/lib/firebase";
import { toast } from "sonner";

interface CvReview {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  result: any; // Sesuaikan dengan struktur result dari API review
  createdAt: string;
}

export default function ActivityHistory() {
  const [activities, setActivities] = useState<CvReview[]>([]); // Gunakan CvReview untuk riwayat CV
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Login dulu untuk melihat riwayat");
      setLoading(false);
      return;
    }

    // Query riwayat CV review (top 2 terbaru untuk tampilan ringkas)
    const q = query(
      collection(db, "cvReviews"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      // Limit 2 untuk ringkas, atau hapus untuk semua
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CvReview[];
        setActivities(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching activities:", error);
        toast.error("Gagal memuat riwayat");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleViewAll = () => {
    router.push("/dashboard/riwayat"); // Buat halaman riwayat khusus jika perlu, atau gunakan existing
  };

  const handleItemClick = (review: CvReview) => {
    // Redirect ke halaman hasil dengan param ID untuk load data spesifik
    router.push(`/dashboard/hasil?id=${review.id}`);
  };

  // Skeleton loading untuk 2 item
  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-md lg:col-span-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
            <div className="h-5 w-32 ml-2 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="h-10 w-10 animate-pulse rounded-md bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-gray-200"></div>
                <div className="h-3 w-64 rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md lg:col-span-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Clock className="mr-2 inline text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Riwayat Aktivitas
          </h3>
        </div>
        {activities.length > 0 && (
          <button
            onClick={handleViewAll}
            className="text-sm font-medium text-gray-400 hover:text-blue-500 flex items-center gap-1"
          >
            Lihat Semua <ChevronRight size={14} className="transition-transform hover:translate-x-0.5" />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.slice(0, 4).map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
              onClick={() => handleItemClick(activity)}
            >
              <div className="flex aspect-square items-center justify-center rounded-md bg-blue-50 p-2 text-blue-500 flex-shrink-0">
                <BookOpenText size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{activity.fileName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(activity.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                  {" • "}
                  {/* Snippet dari result: Ambil potongan deskripsi atau summary dari AI result */}
                  {activity.result?.summary || activity.result?.description || "Lihat insight lengkap review CV kamu"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BookOpenText size={40} className="mx-auto mb-2 opacity-50" />
            <p>Belum ada aktivitas review CV</p>
            <p className="text-xs mt-1">Coba upload CV pertama kamu!</p>
          </div>
        )}
      </div>
      {activities.length === 0 && (
        <p className="mt-6 text-sm text-gray-400">
          Coba fitur Review CV di Cetha buat ningkatin karir kamu ✨
        </p>
      )}
    </div>
  );
}