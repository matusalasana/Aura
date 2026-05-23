import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type VariantsInput } from "../types";

interface VariantsState {
  variants: VariantsInput | null;

  setVariantsData: (data: VariantsInput) => void;
};

export const useVariantsStore = create<VariantsState>()(
  persist(
    (set) => ({
      variants: null,

      setVariantsData: (variants) =>
        set({
          variants,
        }),
    }),
    {
      name: "product-variants-storage",
    }
  )
);