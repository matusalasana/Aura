// External imports
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBasicInfoStore } from "../store/productBasicInfoStore";

// Internal imports 
import { type BasicInfoInput, basicInfoSchema } from "../types";
import { useCategories } from "../../categories/hooks/useCategories"

const BasicInfoForm = () => {
  const setBasicData = useBasicInfoStore(
    (state) => state.setBasicData
  );
  const basicInfo = useBasicInfoStore(
    (state) => state.basicInfo
  );
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: basicInfo?.name ?? "",
      description: basicInfo?.description ?? "",
      category_id: basicInfo?.category_id ?? "",
      is_bestseller: basicInfo?.is_bestseller ?? false,
      is_featured: basicInfo?.is_featured ?? true,
    },
  });
  
  const navigate = useNavigate();

  const { data: categories, isLoading, isError } = useCategories();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  
  const sizes = ["S", "M", "L", "XL"];
  
  const colors = [
    { label: "Black", hexCode: "#000000" },
    { label: "White", hexCode: "#ffffff" },
    { label: "Blue", hexCode: "#3b82f6" },
    { label: "Red", hexCode: "#dc2626" }
  ]

  const onFormSubmit = (data: BasicInfoInput) => {
    setBasicData(data);
    navigate("/admin/products/variants");
  };
  
  useEffect(() => {
  if (basicInfo?.category_id) {
    setValue("category_id", basicInfo.category_id);
  }
}, [setValue, isLoading, basicInfo?.category_id]);

  return (
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full max-w-md mx-auto bg-base-100 shadow-xl rounded-xl p-6 border border-base-200 flex flex-col items-center gap-4"
      >
        <h2 className="text-lg font-semibold text-base-content">
          Basic Product Info
        </h2>

        {/* Product name */}
        <div className="space-y-1 w-full">
          <input
            type="text"
            placeholder="Product name"
            {...register("name")}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
          />

          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-1 w-full">
          <select
            disabled={isLoading}
            {...register("category_id")}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
          >
            <option value="">Select category</option>
        
            {categories?.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        
          {errors.category_id && (
            <p className="text-sm text-red-500">
              {errors.category_id.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1 w-full">
          <textarea
            placeholder="Product description"
            {...register("description")}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
          />

          {errors.description && (
            <p className="text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 w-full">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="bestseller"
              {...register("is_bestseller")}
            />

            <label htmlFor="bestseller">
              Bestseller
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              {...register("is_featured")}
            />

            <label htmlFor="featured">
              Featured
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 py-4 w-full rounded-lg"
        >
          Next
        </button>

      </form>
  );
}; 

export default BasicInfoForm;