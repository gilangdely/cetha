"use client";

import LoadingScreen from "@/components/loading-screen";
import axios from "axios";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Trash2, ChevronRight } from "lucide-react";

import logo from "@/assets/icons/upload-docs.svg";
import office from "@/assets/icons/office-docsx.svg";
import { auth } from "@/app/lib/firebase";
import { useJobResultStore } from "@/store/jobResultStore";

const UploadJobs = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [uploadEnabled, setUploadEnabled] = useState(true);

  const [ip, setIp] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const setJobResult = useJobResultStore((state) => state.setJobResult);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    fetch("/api/ip")
      .then((res) => res.json())
      .then((data) => {
        const ipAddr = data.ip;
        setIp(ipAddr);

        const count = localStorage.getItem(`upload-job-count-${ipAddr}`);
        const parsedCount = Number(count) || 0;
        setUploadCount(parsedCount);

        if (!auth.currentUser && parsedCount >= 5) {
          toast.warning("Kamu sudah mencapai batas 5x upload tanpa login.");
        }
      });

    return () => unsubscribe();
  }, []);

  const generatePreview = (file: File) => {
    if (file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    generatePreview(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!uploadEnabled) return;
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    generatePreview(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Pilih file CV terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    try {
      setUploading(true);
      setProgress(0);

      const res = await axios.post("/api/jobrecommend", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = event.total
            ? Math.round((event.loaded * 100) / event.total)
            : 0;
          setProgress(percent);
        },
      });

      toast.success("Analisis CV berhasil!");
      console.log("🔍 Respons rekomendasi:", res.data);

      const hasil = res.data.result?.data?.[0];
      if (!hasil) throw new Error("Data hasil tidak ditemukan.");

      setJobResult(hasil);

      // batas upload guest
      if (!isLoggedIn) {
        const newCount = uploadCount + 1;
        setUploadCount(newCount);
        localStorage.setItem(`upload-job-count-${ip}`, String(newCount));
      }

      const targetRoute = pathname.startsWith("/dashboard")
        ? "/dashboard/hasil-rekomendasi"
        : "/hasil-rekomendasi";

      router.push(targetRoute);
    } catch (err: any) {
      console.error("❌ Upload gagal:", err.response?.data || err.message);
      toast.error("Gagal mengunggah atau menganalisis CV");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full pt-6">
      {/* Upload Area */}
      <div
        className={`relative flex h-50 items-center justify-center rounded-2xl border-3 border-dashed ${
          uploadEnabled
            ? "cursor-pointer border-gray-400"
            : "cursor-not-allowed border-gray-300 bg-gray-100 opacity-60"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => {
          if (uploadEnabled) document.getElementById("insertJobFile")?.click();
        }}
      >
        {!selectedFile ? (
          <div className="flex flex-col justify-center gap-2 text-center">
            <Image src={logo} alt="upload" className="mx-auto h-15 w-15" />
            <h2 className="text-TextPrimary font-medium">
              {uploadEnabled ? (
                <>
                  Seret dan taruh file CV di sini <br /> atau{" "}
                  <label
                    htmlFor="insertJobFile"
                    className="text-primaryBlue cursor-pointer underline-offset-2 hover:underline"
                  >
                    Unggah File
                  </label>
                </>
              ) : (
                <span className="text-gray-500">Upload dimatikan</span>
              )}
            </h2>
            <input
              id="insertJobFile"
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={!uploadEnabled}
            />
          </div>
        ) : (
          <div className="relative flex h-full w-full items-center justify-center">
            {selectedFile.type === "application/pdf" && previewUrl ? (
              <div className="h-full w-full overflow-hidden rounded-2xl">
                <embed
                  src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  type="application/pdf"
                  className="h-full w-full rounded p-2"
                />
                <div className="absolute top-3 right-6 mb-2 flex items-center justify-between">
                  <div
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                  >
                    <Badge
                      variant="destructive"
                      className="size-8 rounded-full"
                    >
                      <Trash2 />
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-gray-700">
                <Image
                  src={office}
                  alt="office-docx"
                  className="mx-auto h-15 w-15"
                />
                <span className="font-medium">{selectedFile.name}</span>
                <div className="absolute top-3 right-3 mb-2 flex items-center justify-between">
                  <div
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                  >
                    <Badge
                      variant="destructive"
                      className="size-8 rounded-full"
                    >
                      <Trash2 />
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info batas upload */}
      <div className="mt-2 text-center text-sm text-gray-500">
        {!isLoggedIn && (
          <span>
            Sisa upload tanpa login: {Math.max(0, 5 - uploadCount)} dari 5 kali
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-TextSecondary font-medium">
          File yang dapat terbaca: PDF
        </p>
      </div>

      {/* Tombol Analisis */}
      <div className="mx-auto w-full pt-4 pb-12">
        <div className="flex justify-end lg:justify-start">
          <button
            onClick={handleUpload}
            disabled={uploading || (!isLoggedIn && uploadCount >= 5)}
            className="bg-primaryBlue flex cursor-pointer items-center gap-1 rounded-full px-4 py-2.5 font-medium text-white disabled:opacity-50"
          >
            Analisis Sekarang
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {uploading && <LoadingScreen progress={progress} type="job" />}
    </div>
  );
};

export default UploadJobs;
