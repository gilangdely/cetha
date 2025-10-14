import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface JobResult {
  jabatan_ideal: string;
  alasan_kecocokan: string[];
  deskripsi_pekerjaan: string[];
  potensi_karir: string[];
  kisaran_gaji: {
    junior: string;
    mid_level: string;
    senior: string;
  };
  kelebihan_tambahan: string[];
  tautan_pencarian: {
    LinkedIn: string;
    JobStreet: string;
    Glints: string;
    Indeed: string;
    "Google Jobs": string;
  };
}

interface JobResultState {
  jobResult: JobResult | null;
  setJobResult: (data: JobResult) => void;
  clearJobResult: () => void;
}

export const useJobResultStore = create<JobResultState>()(
  persist(
    (set) => ({
      jobResult: null,
      setJobResult: (data) => set({ jobResult: data }),
      clearJobResult: () => set({ jobResult: null }),
    }),
    {
      name: "job-result-storage", 
    }
  )
);
