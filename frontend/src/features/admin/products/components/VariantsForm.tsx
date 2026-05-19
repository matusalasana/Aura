// External imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";

// Internal imports
import { addProductSchema } from "../types";
import { useAddProduct } from "../hooks/useAddProduct";

const VariantsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProductSchema),
  });

  const { mutate: addProduct, isPending } = useAddProduct();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  
  const sizes = ["S", "M", "L", "XL"];
  
  const colors = [
    { label: "Black", hexCode: "#000000" },
    { label: "White", hexCode: "#ffffff" },
    { label: "Blue", hexCode: "#3b82f6" },
    { label: "Red", hexCode: "#dc2626" }
  ]

  const onFormSubmit = (data) => {
    const finalData = {
      ...data,
      size: selectedSize,
    };

    addProduct(finalData, {
      onSuccess: () => {
        reset();
        setSelectedSize("");
      },
    });
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

        {/* Colors */}
        <div className="w-full">
          <p className="mb-2 font-medium">Selected Color: {selectedColor}</p>

          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => {
              const isSelected = selectedColor === color.label;

              return (
                <button
                  key={color.label}
                  type="button"
                  onClick={() => setSelectedColor(color.label)}
                  className={`w-6 h-6 rounded-full transition-all duration-200 active:scale-90 relative ${
                    isSelected
                      ? "ring-2 ring-neutral-950 ring-offset-2"
                      : "hover:scale-105 ring-1 ring-neutral-200"
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                  aria-label={`Color ${color}`}
                  aria-pressed={isSelected}
                >                
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Sizes */}
        <div className="w-full">
          <p className="mb-2 font-medium">Selected Size: {selectedSize}</p>

          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => {
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm font-mono tracking-tight transition-all duration-200 active:scale-95 rounded-md border ${
                    isSelected
                      ? "bg-neutral-950 border-neutral-950 text-white font-medium"
                      : "bg-white border-neutral-200 text-neutral-800 hover:border-neutral-400"
                  }`}
                  aria-label={`Size ${size}`}
                  aria-pressed={isSelected}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price */}
        <div className="space-y-1 w-full">
          <input
            type="number"
            placeholder="Price"
            {...register("price", {
              valueAsNumber: true,
            })}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
          />

          {errors.price && (
            <p className="text-sm text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 py-4 w-full rounded-lg"
          aria-label="Add product"
          aria-busy={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default VariantsForm;