import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReviewData {
  fileName: string;
  fileType: string;
  fileUrl?: string;
  result: string;
}

interface DataReviewStore {
  reviewData: ReviewData | null;
  setReviewData: (data: ReviewData) => void;
  clearReviewData: () => void;
}

export const useDataReviewStore = create<DataReviewStore>()(
  persist(
    (set) => ({
      reviewData: null,
      setReviewData: (data) => set({ reviewData: data }),
      clearReviewData: () => set({ reviewData: null }),
    }),
    {
      name: "review-data-storage",
    },
  ),
);
