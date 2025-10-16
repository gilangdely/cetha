import React from "react";
import ReactMarkdown from "react-markdown";

interface AnalysisResult {
    skor_keseluruhan: number;
    penilaian_per_kategori: {
        kelengkapan_informasi: number;
        keterbacaan_dan_format: number;
        dampak_pengalaman_kerja: number;
    };
    highlights: {
        point: string;
        explanation: string;
    }[];
    improvements: {
        point: string;
        explanation: string;
    }[];
    kesimpulan: string;
}

interface LinkedInAnalysisResultProps {
    result: AnalysisResult;
    className?: string;
}

const LinkedInAnalysisResult: React.FC<LinkedInAnalysisResultProps> = ({ result, className = "" }) => {
    if (!result) return null;

    return (
        <div className={`border rounded-lg p-6 bg-white shadow-sm space-y-6 ${className}`}>
            <h3 className="font-semibold text-xl text-primaryBlue border-b pb-3">
                Hasil Analisis AI Profil LinkedIn
            </h3>

            {/* Skor Keseluruhan */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex-1 space-y-2">
                    <p className="font-medium text-gray-700">Kelengkapan Informasi</p>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                            className="h-2 bg-primaryBlue rounded-full transition-all"
                            style={{ width: `${result.penilaian_per_kategori.kelengkapan_informasi}%` }}
                        />
                    </div>

                    <p className="font-medium text-gray-700">Keterbacaan dan Format</p>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                            className="h-2 bg-primaryBlue rounded-full transition-all"
                            style={{ width: `${result.penilaian_per_kategori.keterbacaan_dan_format}%` }}
                        />
                    </div>

                    <p className="font-medium text-gray-700">Dampak Pengalaman Kerja</p>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                            className="h-2 bg-primaryBlue rounded-full transition-all"
                            style={{ width: `${result.penilaian_per_kategori.dampak_pengalaman_kerja}%` }}
                        />
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-gray-600 text-lg">Skor Keseluruhan</p>
                    <p className="text-5xl font-bold text-primaryBlue">
                        {result.skor_keseluruhan}
                        <span className="text-lg font-normal text-gray-500">/100</span>
                    </p>
                </div>
            </div>

            {/* ✅ Kelebihan Profil */}
            {result.highlights && result.highlights.length > 0 && (
                <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold text-green-700 mb-2">
                        ✅ Kelebihan Profil
                    </h4>
                    <ul className="list-disc list-inside space-y-3 text-gray-700">
                        {result.highlights.map((item, i) => (
                            <li key={i}>
                                <p className="font-medium">{item.point}</p>
                                <p className="text-sm text-gray-600">{item.explanation}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 💡 Saran Perbaikan */}
            {result.improvements && result.improvements.length > 0 && (
                <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold text-amber-700 mb-2">
                        💡 Saran Perbaikan
                    </h4>
                    <ul className="list-disc list-inside space-y-3 text-gray-700">
                        {result.improvements.map((item, i) => (
                            <li key={i}>
                                <p className="font-medium">{item.point}</p>
                                <p className="text-sm text-gray-600">{item.explanation}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 🧩 Kesimpulan */}
            {result.kesimpulan && (
                <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold text-blue-700 mb-2">
                        🧩 Kesimpulan
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                        {result.kesimpulan}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LinkedInAnalysisResult;