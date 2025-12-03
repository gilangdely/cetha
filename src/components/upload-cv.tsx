// filepath: d:\Projectan\cetha\src\components\upload-cv.tsx
"use client";

import LoadingScreen from "@/components/loading-screen";
import axios from "axios";
import Image from "next/image";
import { useDataReviewStore } from "@/store/dataReviewStore";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useUploadStore } from "@/store/uploadStore";

import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Trash2, ChevronRight } from "lucide-react";

import logo from "@/assets/icons/upload-docs.svg";
import office from "@/assets/icons/office-docsx.svg";

import { auth } from "@/app/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "@/app/lib/firebase"; // Sesuaikan path Firebase config

const UploadCv = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const uploading = useUploadStore((s) => s.uploading);
  const setGlobalUploading = useUploadStore((s) => s.setUploading);
  const setProgressGlobal = useUploadStore((s) => s.setProgress);
  const [uploadEnabled, setUploadEnabled] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const [ip, setIp] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    fetch("/api/ip")
      .then((res) => res.json())
      .then((data) => {
        const ipAddr = data.ip;
        setIp(ipAddr);

        const count = localStorage.getItem(`upload-count-${ipAddr}`);
        const parsedCount = Number(count) || 0;
        setUploadCount(parsedCount);

        if (!auth.currentUser && parsedCount >= 5) {
          toast.warning("Kamu sudah mencapai batas 5x upload tanpa login.");
        }
      });

    return () => unsubscribe();
  }, []);

  const setReviewData = useDataReviewStore((state) => state.setReviewData);

  // Interface untuk hasil review CV
  interface CvReview {
    id: string;
    userId: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    result: any;
    createdAt: string;
  }

  const uploadToCloudinary = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!); // Unsigned preset
      formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/raw/upload`); // 'raw' untuk non-image (PDF/DOCX)

      // Progress tracking
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgressGlobal(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText);
          console.log("Cloudinary upload sukses:", result.secure_url);
          resolve(result.secure_url); // URL permanen
        } else {
          reject(new Error(`Upload gagal: ${xhr.status} - ${xhr.responseText}`));
        }
      };

      xhr.onerror = () => reject(new Error("Koneksi gagal"));
      xhr.send(formData);
    });
  };

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

  const saveReviewToFirestore = async (fileUrl: string, result: any) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const reviewData: Omit<CvReview, "id"> = {
        userId: user.uid,
        fileName: selectedFile!.name,
        fileUrl,
        fileType: selectedFile!.type,
        result,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "cvReviews"), reviewData);
      console.log("Review saved to Firestore");
    } catch (error) {
      console.error("Firestore save error:", error);
      toast.error("Gagal simpan hasil review");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const progress = useUploadStore((s) => s.progress);
  if (uploading) {
    return <LoadingScreen progress={progress} type="cv" />;
  }

  if (!isLoggedIn && uploadCount >= 5) {
    toast.error("Kamu sudah mencapai batas 5x upload tanpa login.");
    return;
  }

  // Fungsi simpan file ke Firebase Storage
  const uploadToStorage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const user = auth.currentUser;
      if (!user) {
        reject(new Error("User harus login"));
        return;
      }

      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `cv-files/${user.uid}/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = snapshot.totalBytes
            ? Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            : 0;
          setProgressGlobal(percent);
        },
        (error) => {
          console.error("Storage upload error:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(storageRef);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };


  // Upload file ke backend (setelah simpan ke Storage)
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Pilih file terlebih dahulu!");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error("Login untuk menyimpan hasil review");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    try {
      setGlobalUploading(true, "cv");
      setProgressGlobal(0);

      // Langkah 1: Simpan ke Cloudinary
      toast.info("Mengupload file ke cloud...");
      const fileUrl = await uploadToCloudinary(selectedFile);
      setProgressGlobal(50);
      toast.info("File disimpan, memproses review...");

      // Langkah 2: Kirim ke backend untuk review
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
        onUploadProgress: (event) => {
          const percent = event.total
            ? Math.round((event.loaded * 100) / event.total)
            : 0;
          setProgressGlobal(50 + (percent / 2));
        },
      });

      // Langkah 3: Simpan hasil ke Firestore
      await saveReviewToFirestore(fileUrl, res.data.result.data);

      toast.success("Review CV selesai dan disimpan!");
      console.log("Respon server:", res.data);

      setReviewData({
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileUrl,
        result: res.data.result.data,
      });

      if (!isLoggedIn) {
        const newCount = uploadCount + 1;
        setUploadCount(newCount);
        localStorage.setItem(`upload-count-${ip}`, String(newCount));
      }

      const targetRoute = pathname.startsWith("/dashboard")
        ? "/dashboard/hasil"
        : "/hasil";

      router.push(targetRoute);
    } catch (err: any) {
      console.error("Upload gagal detail:", {
        message: err.message,
        fileSize: selectedFile?.size,
      });
      toast.error(err.message || "Gagal Upload. Coba lagi.");
    } finally {
      setGlobalUploading(false);
      setProgressGlobal(0);
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
      <div className="mt-2 text-center text-sm text-gray-500">
        {!isLoggedIn && (
          <span>
            Sisa upload tanpa login: {Math.max(0, 5 - uploadCount)} dari 5 kali
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-TextSecondary font-medium">
          File yang dapat terbaca: DOC, DOCX, PDF
        </p>
      </div>

      {/* Button Upload */}
      <div className="mx-auto w-full pt-10 pb-12 md:pt-4">
        <div className="flex justify-end lg:justify-start">
          <button
            onClick={handleUpload}
            disabled={uploading || (!isLoggedIn && uploadCount >= 5)}
            className="bg-primaryBlue flex cursor-pointer items-center gap-1 rounded-full px-4 py-2.5 font-medium text-white disabled:opacity-50"
          >
            {uploading ? "Memproses..." : "Prediksi Sekarang"}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCv;