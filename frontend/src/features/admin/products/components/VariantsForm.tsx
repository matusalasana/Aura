// External imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Internal imports
import { type VariantsInput, variantsSchema } from "../types";
import ProductVariantCard from "./ProductVariantCard";

const VariantsForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<VariantsInput>({
    resolver: zodResolver(variantsSchema),
    defaultValues: {
      size: "",
      color: "",
      price: 0,
    },
  });

  // Watch form values
  const selectedSize = watch("size");
  const selectedColor = watch("color");

  // Optional state for testing submitted data
  const [variants, setVariants] = useState<VariantsInput[]>([]);

  // Sizes
  const sizes = ["28", "29", "30", "32", "36", "38"];

  // Colors
  const colors = [
    { label: "Black", hexCode: "#000000" },
    { label: "White", hexCode: "#ffffff" },
    { label: "Blue", hexCode: "#3b82f6" },
    { label: "Red", hexCode: "#dc2626" },
  ];

  // Submit handler
  const onFormSubmit = (data: VariantsInput) => {
    setVariants([...variants, data]);
    reset({
      size: "",
      color: "",
      price: 0,
      stock_quantity: 0,
    });
  };

  return (
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 border flex flex-col gap-6"
      >
        <h2 className="text-xl font-semibold">
          Product Variants
        </h2>
        
        {variants.length > 0 && (
  <div
    className="
      w-full
      max-h-[420px]
      overflow-x-auto
      overflow-y-hidden

      flex flex-col lg:flex-row
      items-stretch lg:items-start
      gap-4 lg:gap-6

      p-2 sm:p-3
      rounded-xl

      bg-zinc-50 dark:bg-zinc-900
      border border-zinc-200 dark:border-zinc-800

      scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700
    "
  >
    {variants.map((v, index) => (
      <div
        key={index}
        className="
          min-w-[240px] sm:min-w-[260px] lg:min-w-[280px]
          flex-shrink-0
        "
      >
        <ProductVariantCard
          color={v.color}
          size={v.size}
          price={v.price}
          stock_quantity={v.stock_quantity}
        />
      </div>
    ))}
  </div>
)}
    
        {/* ================= COLORS ================= */}
        <div className="space-y-2">
          <p className="font-medium">
            Selected Color: {selectedColor || "None"}
          </p>
    
          <div className="flex gap-3">
            {colors.map((color) => {
              const isSelected =
                selectedColor === color.label;
    
              return (
                <button
                  key={color.label}
                  type="button"
                  onClick={() => {
                    setValue("color", color.label, {
                      shouldValidate: true,
                    });
                  }}
                  className={`
                    w-8 h-8 rounded-full border transition-all
                    ${
                      isSelected
                        ? "ring-2 ring-black ring-offset-2 scale-110"
                        : "hover:scale-105"
                    }
                  `}
                  style={{
                    backgroundColor: color.hexCode,
                  }}
                  aria-label={`Color ${color.label}`}
                />
              );
            })}
          </div>
    
          {/* Color Error */}
          {errors.color && (
            <p className="text-sm text-red-500">
              {errors.color.message}
            </p>
          )}
        </div>
    
        {/* ================= SIZES ================= */}
        <div className="space-y-2">
          <p className="font-medium">
            Selected Size: {selectedSize || "None"}
          </p>
    
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => {
              const isSelected =
                selectedSize === size;
    
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setValue("size", size, {
                      shouldValidate: true,
                    });
                  }}
                  className={`
                    py-3 rounded-md border font-medium transition-all
                    ${
                      isSelected
                        ? "bg-black text-white border-black"
                        : "bg-white hover:border-black"
                    }
                  `}
                  aria-label={`Size ${size}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
    
          {/* Size Error */}
          {errors.size && (
            <p className="text-sm text-red-500">
              {errors.size.message}
            </p>
          )}
        </div>
    
        {/* ================= PRICE ================= */}
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Price"
            {...register("price", {
              valueAsNumber: true,
            })}
            className="
              w-full border border-gray-300
              px-3 py-2 rounded-lg
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />
    
          {errors.price && (
            <p className="text-sm text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>
        
        {/* ================= STOCK ================= */}
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Stock"
            {...register("stock_quantity", {
              valueAsNumber: true,
            })}
            className="
              w-full border border-gray-300
              px-3 py-2 rounded-lg
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />
    
          {errors.stock_quantity && (
            <p className="text-sm text-red-500">
              {errors.stock_quantity.message}
            </p>
          )}
        </div>
      
        {/* ================= SUBMIT ================= */}
        <button
          type="submit"
          className="
            bg-black text-white
            py-3 rounded-lg
            hover:opacity-90 transition
          "
        >
          Add Product
        </button>
      </form>

  );
};

export default VariantsForm;