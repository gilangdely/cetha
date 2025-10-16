import { useState } from "react";
import Image from "next/image";

interface Position {
  companyName: string;
  companyId?: string;
  companyLink?: string;
  companyLogo?: string;
  location?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  duration?: string;
}

interface Experience {
  companyName: string;
  companyId?: string;
  companyLink?: string;
  companyLogo?: string;
  location?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  duration?: string;
  totalDuration?: string;
  isMultiPositions?: boolean;
  positions?: Position[];
}

interface Education {
  duration: string;
  university: string;
  universityLink?: string;
  degree?: string;
  description?: string;
  subDescription?: string;
}

interface Overview {
  fullName: string;
  headline: string;
  profilePictureURL: string;
  backgroundImageURL: string;
  location?: { fullLocation?: string };
  followerCount?: number;
  connectionsCount?: number;
  CurrentPositions?: { name: string; logoURL: string; url: string }[];
}

interface Detail {
  about?: string;
  positions?: Position[];
  featuredPosts?: { postLink: string; postText: string }[];
  languages?: {
    languages: { Language: string; Level: string }[];
  };
}

interface Profile {
  overview: Overview;
  details: Detail;
  experience: Experience[];
  education: Education[];
}

interface LinkedInProfileDisplayProps {
  profile: Profile;
  className?: string;
}

const LinkedInProfileDisplay: React.FC<LinkedInProfileDisplayProps> = ({ profile, className = "" }) => {
  const [showAllEducation, setShowAllEducation] = useState(false);

  return (
    <div className={`rounded-lg overflow-hidden bg-white border shadow-sm ${className}`}>
      {/* Banner */}
      <div className="relative h-48 w-full">
        {profile.overview.backgroundImageURL ? (
          <Image
            src={profile.overview.backgroundImageURL}
            alt="Background"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="bg-gray-200 h-full" />
        )}
        <div className="absolute -bottom-16 left-6 flex items-end gap-4">
          {profile?.overview?.profilePictureURL ? (
            <Image
              src={profile.overview.profilePictureURL}
              alt={profile.overview.fullName || "Profile Picture"}
              width={120}
              height={120}
              className="rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              N/A
            </div>
          )}
        </div>
      </div>

      {/* Spacing untuk foto */}
      <div className="mt-12 p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {profile.overview.fullName}
          </h2>
          <p className="text-gray-700">{profile.overview.headline}</p>
        </div>
        
        {/* Tentang */}
        {profile.details.about && (
          <section className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Tentang</h3>
            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {profile.details.about}
            </p>
          </section>
        )}

        <div className="flex gap-4">
          {/* Pengalaman */}
          {profile?.experience && profile.experience.length > 0 && (
            <div className="mt-10 flex-1">
              <h3 className="text-xl font-semibold mb-4">Pengalaman Kerja</h3>

              {profile.experience.map((exp, index) => (
                <div key={index} className="mb-8 border-b pb-9">
                  <div className="flex gap-4 items-center">
                    {exp.companyLogo && (
                      <Image
                        src={exp.companyLogo}
                        alt={exp.companyName}
                        width={48}
                        height={48}
                        className="rounded-md border bg-white"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div>
                      <h4 className="text-lg font-medium">{exp.companyName}</h4>
                      <p className="text-sm text-gray-500">{exp.totalDuration}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                    </div>
                  </div>

                  {/* Tampilkan posisi di perusahaan tersebut */}
                  {exp.positions && exp.positions.length > 0 && (
                    <div className="mt-3 ml-12 space-y-2">
                      {exp.positions.map((pos, i) => (
                        <div key={i}>
                          <p className="font-semibold">{pos.title}</p>
                          <p className="text-sm text-gray-600">{pos.duration}</p>
                          {pos.description && (
                            <p className="text-sm text-gray-500 mt-1">{pos.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pendidikan */}
          {profile?.education && profile.education.length > 0 && (
            <div className="mt-10 flex-1">
              <h3 className="text-xl font-semibold mb-4">Pendidikan</h3>
              {(showAllEducation ? profile.education : profile.education.slice(0, 2)).map((edu, index) => (
                <div key={index} className="mb-8 border-b pb-4">
                  <div className="flex gap-4 items-center">
                    <div>
                      <h4 className="text-lg font-medium">{edu.university}</h4>
                      <p className="text-sm text-gray-500">{edu.duration}</p>
                      <p className="text-sm text-gray-500">{edu.degree}</p>
                    </div>
                  </div>
                </div>
              ))}
              {profile.education.length > 2 && (
                <button
                  className="text-primaryBlue text-sm mt-2 underline"
                  onClick={() => setShowAllEducation((prev) => !prev)}
                >
                  {showAllEducation ? "Sembunyikan" : "Lihat Semua"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bahasa */}
        {profile.details.languages?.languages?.length ? (
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Bahasa</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              {profile.details.languages.languages.map((lang, i) => (
                <li key={i}>
                  {lang.Language} – <span className="text-gray-500">{lang.Level}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default LinkedInProfileDisplay;