import { useState } from "react";
import { useDataReviewStore } from "@/store/dataReviewStore";
import ReactMarkdown from "react-markdown";
import { Check, ArrowDownRight , Lightbulb} from "lucide-react";
export interface Reviewdata {
    skor_keseluruhan: number
    penilaian_per_kategori: PenilaianPerKategori
    highlights: Highlight[]
    improvements: Improvement[]
}

export interface PenilaianPerKategori {
    kelengkapan_informasi: number
    keterbacaan_dan_format: number
    dampak_pengalaman_kerja: number
}

export interface Highlight {
    point: string
    explanation: string
}

export interface Improvement {
    point: string
    explanation: string
}


const CvReviewResult = () => {
    const reviewData = useDataReviewStore((state) => state.reviewData);
    const resultData = reviewData?.result?.[0];

    // Multi-open: array of index
    const [openHighlights, setOpenHighlights] = useState<number[]>([]);
    const [openImprovements, setOpenImprovements] = useState<number[]>([]);

    if (!resultData) {
        return (
            <div className="text-gray-500 text-sm">
                Data penilaian belum tersedia.
            </div>
        );
    }
    const { skor_keseluruhan, penilaian_per_kategori, highlights, improvements } = resultData as unknown as Reviewdata;

    // Toggle logic
    const toggleHighlight = (idx: number) => {
        setOpenHighlights((prev) =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };
    const toggleImprovement = (idx: number) => {
        setOpenImprovements((prev) =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    return (
        <div className="space-y-10">
            {/* Score Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Hasil Penilaian CV</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="space-y-5 flex-1">
                        <div>
                            <div className="flex justify-between mb-2">
                                <p className="font-medium text-gray-700">Kelengkapan Informasi</p>
                                <span className="text-sm font-semibold text-blue-600">{penilaian_per_kategori.kelengkapan_informasi}%</span>
                            </div>
                            <div className="h-2.5 w-full overflow-hidden rounded-full bg-blue-50">
                                <div
                                    className="h-full rounded-full bg-primaryBlue transition-all duration-300"
                                    style={{ width: `${penilaian_per_kategori.kelengkapan_informasi}%` }}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <p className="font-medium text-gray-700">Keterbacaan dan Format</p>
                                <span className="text-sm font-semibold text-blue-600">{penilaian_per_kategori.keterbacaan_dan_format}%</span>
                            </div>
                            <div className="h-2.5 w-full overflow-hidden rounded-full bg-blue-50">
                                <div
                                    className="h-full rounded-full bg-primaryBlue transition-all duration-300"
                                    style={{ width: `${penilaian_per_kategori.keterbacaan_dan_format}%` }}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <p className="font-medium text-gray-700">Dampak Pengalaman Kerja</p>
                                <span className="text-sm font-semibold text-blue-600">{penilaian_per_kategori.dampak_pengalaman_kerja}%</span>
                            </div>
                            <div className="h-2.5 w-full overflow-hidden rounded-full bg-blue-50">
                                <div
                                    className="h-full rounded-full bg-primaryBlue transition-all duration-300"
                                    style={{ width: `${penilaian_per_kategori.dampak_pengalaman_kerja}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-gray-600 mb-2">Skor Keseluruhan</p>
                            <div className="relative">
                                <div className="flex items-center justify-center w-32 h-32 rounded-full bg-blue-50">
                                    <span className="font-bold text-5xl text-primaryBlue">{skor_keseluruhan}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlights Collapsible */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-green-50 rounded-full">
                        <Check className="text-green-600 size-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Point Menarik di CV Kamu</h3>
                </div>
                <ul className="space-y-4">
                    {highlights?.map((item: any, idx: number) => (
                        <li key={idx} className="border-b border-gray-100 pb-3 last:border-0">
                            <button
                                type="button"
                                className="flex justify-between items-center font-medium text-left w-full py-2 hover:text-primaryBlue focus:outline-none transition-colors"
                                onClick={() => toggleHighlight(idx)}
                            >
                                <span>{item.point}</span>
                                <span className={`transition-transform ${openHighlights.includes(idx) ? 'rotate-180' : ''}` }>
                                    <ArrowDownRight className="text-gray-400 hover:text-primaryBlue"></ArrowDownRight>
                                </span>
                            </button>
                            {openHighlights.includes(idx) && (
                                <div className="mt-2 text-gray-600 text-sm leading-relaxed bg-blue-50 p-3 rounded-lg">
                                    {item.explanation}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Improvements Collapsible */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-amber-50 rounded-full">
                        <span className="text-amber-600 text-lg font-bold"><Lightbulb></Lightbulb></span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Saran Perbaikan</h3>
                </div>
                <ul className="space-y-4">
                    {improvements?.map((item: any, idx: number) => (
                        <li key={idx} className="border-b border-gray-100 pb-3 last:border-0">
                            <button
                                type="button"
                                className="flex justify-between items-center font-medium text-left w-full py-2 hover:text-amber-600 focus:outline-none transition-colors"
                                onClick={() => toggleImprovement(idx)}
                            >
                                <span>{item.point}</span>
                                <span className={`transition-transform ${openImprovements.includes(idx) ? 'rotate-180' : ''}`}>
                                    <ArrowDownRight className="text-gray-400 hover:text-accentOrange"></ArrowDownRight>
                                </span>
                            </button>
                            {openImprovements.includes(idx) && (
                                <div className="mt-2 text-gray-600 text-sm leading-relaxed bg-amber-50 p-3 rounded-lg">
                                    {item.explanation}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CvReviewResult;
