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
import LinkedInAnalysisResult from "@/components/linkedin-analysis";
import LinkedInProfileDisplay from "@/components/linkedin-profile-card";

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
       {profile && <LinkedInProfileDisplay profile={profile} />}
      {aiResult && (
        <LinkedInAnalysisResult
          result={typeof aiResult === "string" ? JSON.parse(aiResult) : aiResult}
          className="mt-6"
        />
      )}
    </div>
  );
}
