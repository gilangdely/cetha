// filepath: d:\Projectan\cetha\src\components\dashboard\cv-review-history.tsx
"use client";
import { useState, useEffect } from "react";
import { Download, Trash2, FileText, Eye } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { db } from "@/app/lib/firebase";
import { toast } from "sonner";
import { collection, query, where, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore"; // Hanya Firestore functions
import { ref, deleteObject } from "firebase/storage"; // Fix: Impor ref & deleteObject dari Storage
import { storage } from "@/app/lib/firebase";
import { auth } from "@/app/lib/firebase";

interface CvReview {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  result: any;
  createdAt: string;
}

export default function CvReviewHistory() {
  const [reviews, setReviews] = useState<CvReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<CvReview | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Login dulu untuk melihat riwayat review");
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "cvReviews"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CvReview[];
        setReviews(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching reviews:", error);
        toast.error("Gagal memuat riwayat");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (review: CvReview) => {
    if (!confirm(`Hapus review ${review.fileName}?`)) return;

    try {
      // Extract public_id dari URL (e.g., https://res.cloudinary.com/demo/raw/upload/v123/cv-files/user/123-file.pdf → cv-files/user/123-file.pdf)
      const urlParts = review.fileUrl.split("/");
      const publicId = urlParts.slice(-3).join("/").replace(/v\d+\/+/, ""); // Hapus version

      // Hapus dari Cloudinary via API
      const res = await fetch("/api/delete-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (!res.ok) throw new Error("Gagal hapus file Cloudinary");

      // Hapus dari Firestore
      await deleteDoc(doc(db, "cvReviews", review.id));

      toast.success("Review dihapus!");
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || "Gagal hapus review");
    }
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  };

  if (loading) {
    return <div className="text-center py-8">Memuat riwayat...</div>;
  }

  return (
    <>
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Riwayat Review CV</h3>
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText size={40} className="mx-auto mb-2" />
            Belum ada review CV
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
              >
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => setSelectedReview(review)}
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                  >
                    <Eye size={20} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-800">{review.fileName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(review.fileUrl, review.fileName)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-md"
                    title="Download CV"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(review)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Sheet untuk hasil review */}
      <Sheet open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        {selectedReview && (
          <SheetContent className="max-w-2xl">
            <SheetHeader>
              <SheetTitle>{selectedReview.fileName}</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              {/* Tampilkan hasil review (sesuaikan dengan struktur result dari API) */}
              <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto max-h-64">
                {JSON.stringify(selectedReview.result, null, 2)}
              </pre>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(selectedReview.fileUrl, selectedReview.fileName)}
                  className="flex-1 bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
                >
                  Download CV
                </button>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="flex-1 border p-2 rounded-md hover:bg-gray-100"
                >
                  Tutup
                </button>
              </div>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </>
  );
}