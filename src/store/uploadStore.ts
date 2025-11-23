import { create } from "zustand";

interface UploadState {
  uploading: boolean;
  progress: number;
  uploadType: "cv" | "job" | null;
  setUploading: (v: boolean, type?: "cv" | "job" | null) => void;
  setProgress: (v: number) => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  uploading: false,
  progress: 0,
  uploadType: null,
  setUploading: (v, type = null) => set({ uploading: v, uploadType: type }),
  setProgress: (v) => set({ progress: v }),
}));
