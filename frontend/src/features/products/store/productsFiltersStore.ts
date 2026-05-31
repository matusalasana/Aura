import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductFilters {
  filteringCategories: string[];

  setCategoriesFilters: (category: string) => void;
}

export const useProductsFiltersStore = create<ProductFilters>()(
  persist(
    (set) => ({
      filteringCategories: [],

      setCategoriesFilters: (category) =>
        set((state) => ({
          filteringCategories:
            state.filteringCategories.includes(category)
              ? state.filteringCategories.filter(
                  (c) => c !== category
                )
              : [...state.filteringCategories, category],
        })),
    }),
    {
      name: "products-filters-storage",
    }
  )
);