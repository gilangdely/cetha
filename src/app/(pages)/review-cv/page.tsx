"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { Badge } from "@/components/ui/badge"
import { ChevronRight, FileText, Trash, Trash2 } from "lucide-react";

import illustration from "@/assets/img/illustration-review-cv.jpg";
import logo from "@/assets/icons/upload-docs.svg";
import office from "@/assets/icons/office-docsx.svg";

export default function ReviewCVPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Saat pilih file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    // Kalau PDF → buat blob URL
    if (file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  // Upload file ke backend
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Silakan pilih file terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    try {
      setUploading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Respon server:", res.data);
      alert("File berhasil diunggah!");
    } catch (err: any) {
      console.error("Upload gagal:", err.response?.data || err.message);
      alert("Upload gagal, coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl items-center">
      <section>
        {/* Hero Section */}
        <div className="flex min-h-screen w-full items-center">
          <div className="flex w-full flex-col-reverse items-center gap-10 px-6 md:flex-row lg:px-0">
            <div className="flex-1">
              <h2 className="text-TextPrimary text-4xl font-semibold">
                <span className="mb-2 flex items-center gap-1 text-lg">
                  <Link
                    href="/"
                    className="hover:text-TextPrimary/80 text-gray-500/50 transition-colors"
                  >
                    Home
                  </Link>
                  <ChevronRight size={20} className="text-gray-400" />
                  <span className="text-accentOrange font-medium">
                    Review CV
                  </span>
                </span>
                CV Lebih Baik, Peluang Lebih Besar
              </h2>
              <p className="text-TextSecondary mt-3 text-lg">
                Dapatkan feedback otomatis dari AI agar CV kamu makin standout
                di mata recruiter.
              </p>
            </div>
            <div className="flex-1">
              <Image
                className="relative"
                draggable={false}
                src={illustration}
                alt="illustration review cv"
              />
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="mx-auto w-full max-w-4xl px-6 py-12">
          <div className="relative flex h-80 items-center justify-center rounded-2xl border-3 border-dashed border-gray-400">
            {!selectedFile ? (
              <div className="flex flex-col justify-center gap-8 text-center">
                <Image src={logo} alt="upload" className="mx-auto" />
                <h2 className="text-TextPrimary font-medium">
                  Seret dan taruh file disini <br /> atau{" "}
                  <label
                    htmlFor="insertFile"
                    className="text-primaryBlue cursor-pointer hover:underline underline-offset-2"
                  >
                    Unggah File
                  </label>
                </h2>
                <input
                  id="insertFile"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center relative">
                {selectedFile.type === "application/pdf" && previewUrl ? (
                  <div className="overflow-hidden rounded-2xl w-full h-full">
                    <embed
                      src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                      type="application/pdf"
                      className="w-full h-full rounded p-2"
                    />
                    {selectedFile && (
                      <div className="flex justify-between mb-2 items-center absolute top-4 right-6">

                        {selectedFile && (
                          <div onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                          >
                            <Badge
                              variant="destructive" className="rounded-full size-8">
                              <Trash2 />
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                ) : (
                  <div className="flex flex-col items-center gap-3 text-gray-700">
                    <Image src={office} alt="office-docx" />
                    <span className="font-medium">{selectedFile.name}</span>
                    {selectedFile && (
                      <div className="flex justify-between mb-2 items-center absolute top-4 right-4">

                        {selectedFile && (
                          <div onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                          >
                            <Badge
                              variant="destructive" className="rounded-full size-8">
                              <Trash2 />
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mt-4">
            <p className="text-TextSecondary font-medium">
              File yang dapat terbaca: DOC, DOCX, PDF
            </p>
          </div>

          {/* Button Upload */}
          <div className="mx-auto w-full pt-6 pb-12">
            <div className="flex justify-end">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-primaryBlue flex ml-auto cursor-pointer items-center gap-1 rounded-full px-4 py-2.5 font-medium text-white disabled:opacity-50"
              >
                {uploading ? "Mengunggah..." : "Analisis Sekarang"}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

      </section>
    </main >
  );
}
