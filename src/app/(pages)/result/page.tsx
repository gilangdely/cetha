"use client"

import { useDataReviewStore } from "@/store/dataReviewStore";

export default function ResultPage() {
    const reviewData = useDataReviewStore((state) => state.reviewData);

    if (!reviewData) {
        return <p>Data tidak ditemukan, silahkan upload terlebih dahulu.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-7xl font-semibold mb-4">Hasil Review CV</h2>

            <p><strong>Nama File:</strong> {reviewData.fileName}</p>
            <p><strong>Tipe File:</strong> {reviewData.fileType}</p>
            {reviewData.fileUrl && (
                <a
                    href={reviewData.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primaryBlue underline"
                >
                    Lihat File
                </a>
            )}

            <div className="mt-6 p-4 bg-white rounded-lg whitespace-pre-line">
                {reviewData.result}
            </div>
        </div>
    );
}
