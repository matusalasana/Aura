import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type VariantsInput } from "../types";

interface VariantsState {
  variants: VariantsInput[];

  addVariant: (data: VariantsInput) => boolean;

  deleteVariant: (index: number) => void;
}

export const useVariantsStore = create<VariantsState>()(
  persist((set, get) => ({
    
    variants: [],

    addVariant: (data) => {
      const exists = get().variants.some(
        (v) =>
          v.size === data.size &&
          v.color === data.color
      );

      if (exists) {
        return false;
      }

      set((state) => ({
        variants: [...state.variants, data],
      }));

      return true;
    },

    deleteVariant: (index) =>
      set((state) => ({
        variants: state.variants.filter(
          (_, i) => i !== index
        ),
      })),

  }),
  
  {
    name: "product-variants-storage",
  }
  
  )
);