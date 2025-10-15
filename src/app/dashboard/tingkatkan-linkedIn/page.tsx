"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ArrowRight, Loader2, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

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

interface SummaryProfile {
  name: string;
  headline: string;
  about: string;
  location: string;
  followerCount: number;
  connectionsCount: number;
}

export default function ImproveLinkedInDashboard() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [showAllEducation, setShowAllEducation] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setProfile(null);
    setAiResult(null);

    const cleanUsername = username
      .trim()
      .replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, "")
      .replace(/\/$/, "");

    if (!cleanUsername) {
      setError("Masukkan username atau URL LinkedIn yang valid.");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Ambil data LinkedIn lengkap
      const res = await fetch(`/api/linkedin?username=${encodeURIComponent(cleanUsername)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengambil data profil LinkedIn.");

      const { overview, details, experience, education } = data;
      setProfile({ overview, details, experience, education });

      // 2️⃣ Pilih data penting untuk dikirim ke AI
      const selectedData = {
        name: overview?.fullName || "",
        headline: overview?.headline || "",
        about: details?.about || "",
        location: overview?.location?.fullLocation || "",
        followerCount: overview?.followerCount || 0,
        connectionsCount: overview?.connectionsCount || 0,
        education: education?.map((edu: Education) => ({
          university: edu.university,
          degree: edu.degree,
          duration: edu.duration,
          description: edu.description || "",
        })),
        experience: experience?.map((exp: Experience) => ({
          companyName: exp.companyName,
          title: exp.title,
          duration: exp.duration,
          description: exp.description || "",
        })),
      };

      // 3️⃣ Kirim ke API review (AI)
      const aiRes = await fetch("/api/linkedin/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedData),
      });

      const aiData = await aiRes.json();
      if (!aiRes.ok) throw new Error(aiData.message || "Gagal menganalisis dengan AI.");

      // 4️⃣ Simpan hasil AI ke state
      setAiResult(aiData.result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat memproses permintaan.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="w-full p-4 md:px-10">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Improve LinkedIn</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="mt-6 mb-8">
        <h2 className="text-TextPrimary text-3xl font-semibold">
          Profil <span className="text-accentOrange">LinkedIn Lebih Standout</span>
        </h2>
        <p className="text-TextSecondary mt-2 max-w-2xl text-base">
          Masukkan URL LinkedIn kamu, biarkan AI menganalisis headline, summary, dan skill.
        </p>
      </div>

      {/* Input */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm mb-10">
        <h3 className="text-TextPrimary mb-4 text-xl font-medium">
          Masukkan Profil LinkedIn Kamu
        </h3>
        <div className="flex w-full gap-2">
          <input
            type="text"
            placeholder="Masukan username atau URL profil LinkedIn kamu"
            className="focus:ring-primaryBlue flex-1 rounded-full border px-4 py-3 focus:ring-2 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`rounded-full px-4 py-3 text-white transition-colors flex items-center justify-center ${loading
              ? "bg-primaryBlue/70 cursor-not-allowed"
              : "bg-primaryBlue hover:bg-primaryBlue/90"
              }`}
          >
            {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-300 text-red-700 px-4 py-2">
            {error}
          </div>
        )}
      </div>

      {/* Profile Display */}
      {profile && (
        <div className="rounded-lg overflow-hidden bg-white border shadow-sm">
          {/* Banner */}
          <div className="relative h-48 w-full">
            {profile.overview.backgroundImageURL ? (
              <Image
                src={profile.overview.backgroundImageURL}
                alt="Background"
                fill
                className="object-cover"
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
            {/* Pengalaman */}

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
      )}

      {aiResult && (
        <div className="mt-6 border rounded-lg p-4 bg-gray-50 whitespace-pre-wrap">
          <h3 className="font-semibold text-lg mb-2 text-blue-700">Hasil Analisis AI:</h3>
          <ReactMarkdown >
            {aiResult}
          </ReactMarkdown>
        </div>
      )}

    </div>
  );
}
