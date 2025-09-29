import { create } from "zustand";

interface CarouselState {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const useCarouselStore = create<CarouselState>((set) => ({
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
}));
