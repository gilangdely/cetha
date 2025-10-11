"use client";

import { useDataReviewStore } from "@/store/dataReviewStore";
import ReactMarkdown from "react-markdown";

const NeedImprovementDashboard = () => {
  const reviewData = useDataReviewStore((state) => state.reviewData);
  const markdown = String(reviewData?.result ?? "");

  const perbaikiSection = markdown.match(
    /💡 Poin yang Perlu Diperbaiki:([\s\S]*)/,
  );
  const halPerluDiperbaiki = perbaikiSection ? perbaikiSection[1].trim() : "";

  return (
    <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h3 className="text-accentOrange mb-2 text-xl font-semibold">
        💡 Poin yang Perlu Diperbaiki
      </h3>
      <div className="prose prose-p:text-TextSecondary prose-ul:list-disc prose-li:marker:text-accentOrange max-w-none">
        <ReactMarkdown>{halPerluDiperbaiki}</ReactMarkdown>
      </div>
    </div>
  );
};

export default NeedImprovementDashboard;
