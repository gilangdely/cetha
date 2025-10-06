import { useDataReviewStore } from "@/store/dataReviewStore";
import ReactMarkdown from "react-markdown";

const GoodThingMd = () => {
    const reviewData = useDataReviewStore((state) => state.reviewData);
    const markdown = String(reviewData?.result ?? "");

    // Extract skor keseluruhan
    const skorKeseluruhanMatch = markdown.match(/⭐ Skor Keseluruhan:\s*([\d.]+)\s*\/\s*100/);
    const skorKeseluruhan = skorKeseluruhanMatch ? parseFloat(skorKeseluruhanMatch[1]) : 0;

    // Extract skor per kategori
    const kelengkapanMatch = markdown.match(/Kelengkapan Informasi[\s\S]*?(\d+)\s*\/\s*100/);
    const keterbacaanMatch = markdown.match(/Keterbacaan Dan Format[\s\S]*?(\d+)\s*\/\s*100/);
    const dampakMatch = markdown.match(/Dampak Pengalaman Kerja[\s\S]*?(\d+)\s*\/\s*100/);

    const kelengkapan = kelengkapanMatch ? parseInt(kelengkapanMatch[1]) : 0;
    const keterbacaan = keterbacaanMatch ? parseInt(keterbacaanMatch[1]) : 0;
    const dampak = dampakMatch ? parseInt(dampakMatch[1]) : 0;

    // Extract bagian isi
    const baikSection = markdown.match(/\*\*✅ Hal yang Sudah Baik:\*\*([\s\S]*?)💡/);

    const halBaik = baikSection ? baikSection[1].trim() : "";
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold">Hasil Penilaian CV Anda</h2>

            <div className="space-y-2">
                <p className="text-lg font-semibold">⭐ Skor Keseluruhan: {skorKeseluruhan} / 100</p>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="font-semibold">Kelengkapan Informasi</p>
                    <div className="h-4 w-full overflow-hidden rounded-full bg-blue-100">
                        <div className="h-full rounded-full bg-blue-500 transition-all duration-300" style={{ width: `${kelengkapan}%` }}></div>
                    </div>
                </div>
                <div>
                    <p className="font-semibold">Keterbacaan dan Format</p>
                    <div className="h-4 w-full overflow-hidden rounded-full bg-blue-100">
                        <div className="h-full rounded-full bg-blue-500 transition-all duration-300" style={{ width: `${keterbacaan}%` }}></div>
                    </div>
                </div>
                <div>
                    <p className="font-semibold">Dampak Pengalaman Kerja</p>
                    <div className="h-4 w-full overflow-hidden rounded-full bg-blue-100">
                        <div className="h-full rounded-full bg-blue-500 transition-all duration-300" style={{ width: `${dampak}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="prose">
                <h3>✅ Hal yang Sudah Baik</h3>
                <ReactMarkdown>{halBaik}</ReactMarkdown>
            </div>
        </div>
    );
};

export default GoodThingMd;
