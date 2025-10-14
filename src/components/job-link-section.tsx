import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";

const JobLinksSection = ({ jobResult }: { jobResult: any }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-TextPrimary mb-4 flex items-center gap-2 text-lg font-semibold">
        <Star size={18} /> Tautan Pencarian Pekerjaan
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(jobResult.tautan_pencarian).map(
          ([platform, link]: [any, any]) => (
            <Link
              key={platform}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-gray-800 transition hover:bg-gray-100"
            >
              <span>{platform}</span>
              <ExternalLink size={16} className="text-gray-500" />
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default JobLinksSection;
