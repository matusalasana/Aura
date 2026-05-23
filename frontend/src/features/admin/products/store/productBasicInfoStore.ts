import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type BasicInfoInput } from "../types";

interface BasicInfoState {
  basicInfo: BasicInfoInput | null;

  setBasicData: (basicInfo: BasicInfoInput) => void;
};

export const useBasicInfoStore = create<BasicInfoState>()(
  persist(
    (set) => ({
      basicInfo: null,

      setBasicData: (basicInfo) =>
        set({
          basicInfo,
        }),
    }),
    {
      name: "product-basic-info-storage",
    }
  )
);