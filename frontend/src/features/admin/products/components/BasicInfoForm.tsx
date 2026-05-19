// External imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

// Internal imports
import { type BasicInfoInput, basicInfoSchema } from "../types";

const BasicInfoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
  });

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
    const finalData = {
      ...data,
      size: selectedSize,
    };
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-50"
        aria-label="Close form"
      >
        <X size={20} />
      </button>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full max-w-md mx-auto bg-base-100 shadow-xl rounded-xl p-6 border border-base-200 flex flex-col items-center gap-4"
      >
        <h2 className="text-lg font-semibold text-base-content">
          Publish Product
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
            {...register("category")}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
          >
            <option value="">Select category</option>
            <option value="Kids">Kids</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>

          {errors.category && (
            <p className="text-sm text-red-500">
              {errors.category.message}
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
              {...register("bestseller")}
            />

            <label htmlFor="bestseller">
              Bestseller
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              defaultChecked
              {...register("featured")}
            />

            <label htmlFor="featured">
              Featured
            </label>
          </div>
        </div>

      </form>
    </div>
  );
}; 

export default BasicInfoForm;