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
            <h2 className="text-2xl font-normal text-center">Berikut adalah rangkuman dari cv kamu</h2>
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-between border-2 border-primaryBlue rounded-full">
                    <div className="flex items-center gap-32 pl-4 pr-2 py-1.5">
                        <p>Kami melihat beberapa potensi yang kamu miliki</p>
                        <div className="flex items-center p-2 bg-primaryBlue rounded-full">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.5 5.25L7.113 6.2955C6.606 7.6665 6.3525 8.352 5.85225 8.85225C5.352 9.3525 4.6665 9.606 3.2955 10.113L2.25 10.5L3.2955 10.887C4.6665 11.394 5.352 11.6483 5.85225 12.1478C6.3525 12.6473 6.606 13.3335 7.113 14.7045L7.5 15.75L7.887 14.7045C8.394 13.3335 8.64825 12.648 9.14775 12.1478C9.64725 11.6475 10.3335 11.394 11.7045 10.887L12.75 10.5L11.7045 10.113C10.3335 9.606 9.648 9.3525 9.14775 8.85225C8.6475 8.352 8.394 7.6665 7.887 6.2955L7.5 5.25ZM13.5 2.25L13.3342 2.69775C13.1167 3.28575 13.008 3.57975 12.7943 3.7935C12.5798 4.008 12.2858 4.11675 11.6978 4.3335L11.25 4.5L11.6985 4.66575C12.2857 4.88325 12.5798 4.992 12.7935 5.20575C13.008 5.42025 13.1167 5.71425 13.3335 6.30225L13.5 6.75L13.6658 6.30225C13.8833 5.71425 13.992 5.42025 14.2057 5.2065C14.4202 4.992 14.7142 4.88325 15.3022 4.6665L15.75 4.5L15.3015 4.33425C14.7143 4.11675 14.4202 4.008 14.2065 3.79425C13.992 3.57975 13.8833 3.28575 13.6665 2.69775L13.5 2.25Z"
                                    stroke="white"
                                    strokeWidth="1.125"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="space-y-4 flex-1">
                    <div>
                        <p className="font-normal mb-1">Kelengkapan Informasi</p>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100">
                            <div className="h-full rounded-full bg-primaryBlue transition-all duration-300" style={{ width: `${kelengkapan}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <p className="font-normal mb-1">Keterbacaan dan Format</p>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100">
                            <div className="h-full rounded-full bg-primaryBlue transition-all duration-300" style={{ width: `${keterbacaan}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <p className="font-normal mb-1">Dampak Pengalaman Kerja</p>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100">
                            <div className="h-full rounded-full bg-primaryBlue transition-all duration-300" style={{ width: `${dampak}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <p className="grid justify-end gap-8 text-lg font-normal">
                        Skor Keseluruhan
                        <span className="flex items-baseline justify-center font-semibold text-6xl">
                            {skorKeseluruhan}
                            <span className="text-lg font-normal">/100</span>
                        </span>
                    </p>
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
