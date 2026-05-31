import { useState } from "react";
import { useCategories } from "../../../home/hooks/useCategories";
import { useProductsFiltersStore } from "../../store/productsFiltersStore"

interface Props {
 categoriesFilters: string[];
}

const Categories = ({categoriesFilters}: Props) => {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useCategories();

  const { 
    filteringCategories,
    setCategoriesFilters } = useProductsFiltersStore();

  const handleCategoryChange = (category: string) => {
    setCategoriesFilters(category)
  };

  if (isError) {
    return <p>Failed to load categories</p>;
  }

  return (
    <div className="space-y-4 text-xs">
      <h3 className=" font-bold uppercase tracking-widest">
        Categories
      </h3>

      <div className="space-y-3">
        {categories.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              disabled={isLoading}
              type="checkbox"
              checked={filteringCategories.includes(item.name)}
              onChange={() => handleCategoryChange(item.name)}
            />

            <span>{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Categories;