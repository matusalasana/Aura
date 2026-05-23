import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type BasicInfoInput } from "../types";

interface BasicInfoState {
  data: BasicInfoInput | null;

  setBasicData: (data: BasicInfoInput) => void;
};

export const useProductBasicInfoStore = create<BasicInfoState>()(
  persist(
    (set) => ({
      data: null,

      setBasicData: (data) =>
        set({
          data,
        }),
    }),
    {
      name: "product-basic-info-storage",
    }
  )
);