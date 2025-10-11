import { useDataReviewStore } from "@/store/dataReviewStore";
import ReactMarkdown from "react-markdown";

const NeedImprovementMd = () => {
    const reviewData = useDataReviewStore((state) => state.reviewData);
    const markdown = String(reviewData?.result ?? "");

    const perbaikiSection = markdown.match(/💡 Poin yang Perlu Diperbaiki:([\s\S]*)/);
    const halPerluDiperbaiki = perbaikiSection ? perbaikiSection[1].trim() : "";

    return (
        <div className="space-y-8">
            <div className="prose">
                <h3>💡 Poin yang Perlu Diperbaiki</h3>
                <ReactMarkdown>{halPerluDiperbaiki}</ReactMarkdown>
            </div>
        </div>
    );
};

export default NeedImprovementMd;
