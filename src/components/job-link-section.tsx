import { ExternalLink, Link2, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Helper untuk mendapatkan domain dari URL
const getDomain = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch (error) {
    return '';
  }
};

const JobLinksSection = ({ jobResult }: { jobResult: any }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-primaryBlue mb-4 flex items-center gap-2 text-lg font-semibold bg-blue-50 py-2 px-4 rounded-md">
        <Link2 size={20} /> Tautan Pencarian Pekerjaan
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(jobResult.tautan_pencarian).map(
          ([platform, link]: [any, any]) => {
            const domain = getDomain(link);
            const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=32` : '';
            
            return (
              <Link
                key={platform}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-gray-800 transition hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  {faviconUrl && (
                    <div className="w-5 h-5 flex-shrink-0 relative">
                      <Image 
                        src={faviconUrl}
                        alt={platform}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span>{platform}</span>
                </div>
                <ExternalLink size={16} className="text-gray-500" />
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
};

export default JobLinksSection;
