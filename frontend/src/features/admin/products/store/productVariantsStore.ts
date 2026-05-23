import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type VariantsInput } from "../types";

interface VariantsState {
  variants: VariantsInput[];

  addVariant: (data: VariantsInput) => boolean;

  deleteVariant: (index: number) => void;

  updateVariant: (
    index: number,
    data: VariantsInput
  ) => void;
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

    updateVariant: (index, data) =>
      set((state) => ({
        variants: state.variants.map(
          (variant, i) =>
            i === index ? data : variant
        ),
      })),
  }),
  
  {
    name: "product-variants-storage",
  }
  
  )
);