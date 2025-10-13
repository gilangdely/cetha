"use client";

import LoadingScreen from "@/components/loading-screen";
import axios from "axios";
import Image from "next/image";
import { useDataReviewStore } from "@/store/dataReviewStore";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Trash2, ChevronRight } from "lucide-react";

import logo from "@/assets/icons/upload-docs.svg";
import office from "@/assets/icons/office-docsx.svg";

const UploadCv = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadEnabled, setUploadEnabled] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();

  const setReviewData = useDataReviewStore((state) => state.setReviewData);
  // Helper: Buat preview jika file PDF
  const generatePreview = (file: File) => {
    if (file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  // Saat pilih file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    generatePreview(file);
  };

  // Saat drag & drop file
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

  // Upload file ke backend
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Pilih file terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    try {
      setUploading(true);
      setProgress(0);

      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = event.total
            ? Math.round((event.loaded * 100) / event.total)
            : 0;
          setProgress(percent);
        },
      });

      toast.success("File berhasil diunggah!");
      console.log("Respon server:", res.data);
      setReviewData({
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileUrl: "",
        result: res.data.result.data,
      });

      const targetRoute = pathname.startsWith("/dashboard")
        ? "/dashboard/hasil"
        : "/hasil";

      router.push(targetRoute);
      router.push(targetRoute);
    } catch (err: any) {
      console.error("Upload gagal:", err.response?.data || err.message);
      toast.error("Gagal Upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full pt-6">
      <div
        className={`relative flex h-50 items-center justify-center rounded-2xl border-3 border-dashed ${uploadEnabled ? "cursor-pointer border-gray-400" : "cursor-not-allowed border-gray-300 bg-gray-100 opacity-60"}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => {
          if (uploadEnabled) document.getElementById("insertFile")?.click();
        }}
      >
        {!selectedFile ? (
          <div className="flex flex-col justify-center gap-2 text-center">
            <Image src={logo} alt="upload" className="mx-auto h-15 w-15" />
            <h2 className="text-TextPrimary font-medium">
              {uploadEnabled ? (
                <>
                  Seret dan taruh file disini <br /> atau{" "}
                  <label
                    htmlFor="insertFile"
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
              id="insertFile"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
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
                {selectedFile && (
                  <div className="absolute top-3 right-6 mb-2 flex items-center justify-between">
                    {selectedFile && (
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
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-gray-700">
                <Image
                  src={office}
                  alt="office-docx"
                  className="mx-auto h-15 w-15"
                />
                <span className="font-medium">{selectedFile.name}</span>
                {selectedFile && (
                  <div className="absolute top-3 right-3 mb-2 flex items-center justify-between">
                    {selectedFile && (
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
      <div className="mx-auto w-full pt-4 pb-12">
        <div className="flex justify-end lg:justify-start">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-primaryBlue flex cursor-pointer items-center gap-1 rounded-full px-4 py-2.5 font-medium text-white disabled:opacity-50"
          >
            Prediksi Sekarang
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      {uploading && <LoadingScreen progress={progress} />}
    </div>
  );
};

export default UploadCv;
