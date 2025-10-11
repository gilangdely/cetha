"use client";

import { useDataReviewStore } from "@/store/dataReviewStore";
import ReactMarkdown from "react-markdown";

const GoodThingDashboard = () => {
  const reviewData = useDataReviewStore((state) => state.reviewData);
  const markdown = String(reviewData?.result ?? "");

  // Extract skor keseluruhan
  const skorKeseluruhanMatch = markdown.match(
    /⭐ Skor Keseluruhan:\s*([\d.]+)\s*\/\s*100/,
  );
  const skorKeseluruhan = skorKeseluruhanMatch
    ? parseFloat(skorKeseluruhanMatch[1])
    : 0;

  // Extract skor per kategori
  const kelengkapanMatch = markdown.match(
    /Kelengkapan Informasi[\s\S]*?(\d+)\s*\/\s*100/,
  );
  const keterbacaanMatch = markdown.match(
    /Keterbacaan Dan Format[\s\S]*?(\d+)\s*\/\s*100/,
  );
  const dampakMatch = markdown.match(
    /Dampak Pengalaman Kerja[\s\S]*?(\d+)\s*\/\s*100/,
  );

  const kelengkapan = kelengkapanMatch ? parseInt(kelengkapanMatch[1]) : 0;
  const keterbacaan = keterbacaanMatch ? parseInt(keterbacaanMatch[1]) : 0;
  const dampak = dampakMatch ? parseInt(dampakMatch[1]) : 0;

  // Extract isi
  const baikSection = markdown.match(
    /\*\*✅ Hal yang Sudah Baik:\*\*([\s\S]*?)💡/,
  );
  const halBaik = baikSection ? baikSection[1].trim() : "";

  return (
    <div className="space-y-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-TextPrimary text-center text-2xl font-semibold">
        Rangkuman Review CV Kamu
      </h2>

      {/* Skor Section */}
      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <div className="w-full flex-1 space-y-4">
          <ProgressBar title="Kelengkapan Informasi" value={kelengkapan} />
          <ProgressBar title="Keterbacaan dan Format" value={keterbacaan} />
          <ProgressBar title="Dampak Pengalaman Kerja" value={dampak} />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="mb-2 text-lg font-medium text-gray-600">
            Skor Keseluruhan
          </p>
          <span className="text-primaryBlue text-6xl font-semibold">
            {skorKeseluruhan}
            <span className="text-lg font-normal text-gray-400"> / 100</span>
          </span>
        </div>
      </div>

      {/* Hal yang Sudah Baik */}
      <div className="prose max-w-none">
        <h3 className="text-primaryBlue mb-2 text-xl font-semibold">
          ✅ Hal yang Sudah Baik
        </h3>
        <div className="prose-p:text-TextSecondary prose-ul:list-disc prose-li:marker:text-primaryBlue">
          <ReactMarkdown>{halBaik}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

// Progress bar component
const ProgressBar = ({ title, value }: { title: string; value: number }) => (
  <div>
    <p className="mb-1 font-normal">{title}</p>
    <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100">
      <div
        className="bg-primaryBlue h-full rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

export default GoodThingDashboard;
