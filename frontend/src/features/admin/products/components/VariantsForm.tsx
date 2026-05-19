// External imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Internal imports
import { type VariantsInput, variantsSchema } from "../types";

const VariantsForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
  const [formData, setFormData] = useState<VariantsInput | null>(null);

  // Sizes
  const sizes = ["S", "M", "L", "XL"];

  // Colors
  const colors = [
    { label: "Black", hexCode: "#000000" },
    { label: "White", hexCode: "#ffffff" },
    { label: "Blue", hexCode: "#3b82f6" },
    { label: "Red", hexCode: "#dc2626" },
  ];

  // Submit handler
  const onFormSubmit = (data: VariantsInput) => {
    alert(data.color);
    alert(data.size);
    alert(data.price);
    alert(data.stock_quantity);
    alert(data.sku);

    setFormData(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="w-full max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 border flex flex-col gap-6"
    >
      <h2 className="text-xl font-semibold">
        Product Variants
      </h2>

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
      
      {/* ================= SKU ================= */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="eg. PROD-WHT-X"
          {...register("sku")}
          className="
            w-full border border-gray-300
            px-3 py-2 rounded-lg
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
          "
        />

        {errors.sku && (
          <p className="text-sm text-red-500">
            {errors.sku.message}
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