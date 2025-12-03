// src/app/dashboard/riwayat/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Clock, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface CvReview {
    id: string;
    fileName: string;
    fileUrl: string;
    createdAt: string;
    result: any; // atau ganti dengan tipe lebih spesifik jika ada
}

export default function RiwayatReviewPage() {
    const [reviews, setReviews] = useState<CvReview[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthAndFetch = async () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    toast.error("Silakan login untuk melihat riwayat.");
                    router.push("/login");
                    return;
                }

                try {
                    setLoading(true);
                    const q = query(
                        collection(db, "cvReviews"),
                        where("userId", "==", user.uid),
                        orderBy("createdAt", "desc")
                    );

                    const querySnapshot = await getDocs(q);
                    const reviewsData: CvReview[] = [];

                    querySnapshot.forEach((doc) => {
                        reviewsData.push({
                            id: doc.id,
                            ...doc.data(),
                        } as CvReview);
                    });

                    setReviews(reviewsData);
                } catch (error) {
                    console.error("Gagal mengambil riwayat:", error);
                    toast.error("Gagal memuat riwayat. Coba lagi nanti.");
                } finally {
                    setLoading(false);
                }
            });

            return () => unsubscribe();
        };

        checkAuthAndFetch();
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-muted-foreground">Memuat riwayat...</div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <h1 className="text-2xl font-bold mb-6">Riwayat Review CV</h1>

            {reviews.length === 0 ? (
                <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Belum ada riwayat review.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-medium truncate">{review.fileName}</h3>
                                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                                        <Clock className="mr-1 h-4 w-4" />
                                        {format(new Date(review.createdAt), "dd MMM yyyy HH:mm", {
                                            locale: id,
                                        })}
                                    </div>
                                </div>
                                <Link href={`/dashboard/hasil?reviewId=${review.id}`}>
                                    <Button
                                        size="sm"
                                        className="bg-primaryBlue hover:bg-primaryBlue flex cursor-pointer items-center gap-1 rounded-full px-4 py-2.5 font-medium text-white transition-colors disabled:opacity-50"
                                    >
                                        Lihat Hasil <ChevronRight size={18} />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}