import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { type VariantsInput, variantsSchema } from "../types";
import ProductVariantCard from "./ProductVariantCard";
import { useVariantsStore } from "../store/productVariantsStore";

const SIZES = ["28", "29", "30", "32", "36", "38"];
const COLORS = [
  { label: "Black", hexCode: "#000000" },
  { label: "White", hexCode: "#ffffff" },
  { label: "Blue", hexCode: "#3b82f6" },
  { label: "Red", hexCode: "#dc2626" },
];

const DEFAULT_VALUES: VariantsInput = {
  size: "",
  color: "",
  price: 0,
  stock_quantity: 0,
};

const VariantsForm = () => {
  const navigate = useNavigate();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { variants, addVariant, deleteVariant, updateVariant } = useVariantsStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<VariantsInput>({
    resolver: zodResolver(variantsSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const selectedSize = watch("size");
  const selectedColor = watch("color");

  const clearForm = () => {
    reset(DEFAULT_VALUES);
    setEditingIndex(null);
  };

  const handleAddVariant = async () => {
    if (!(await trigger())) return;
    
    const values = getValues();
    const success = editingIndex !== null 
      ? updateVariant(editingIndex, values) 
      : addVariant(values);

    if (!success) {
      alert("Variant with same color and size already exists.");
      return;
    }
    
    clearForm();
  };

  const handleEdit = (variant: VariantsInput, index: number) => {
    setEditingIndex(index);
    Object.entries(variant).forEach(([key, val]) => {
      setValue(key as keyof VariantsInput, val);
    });
  };

  const onFormSubmit = () => {
    if (variants.length === 0) {
      toast.error("Please add at least one variant.");
      return;
    }
    navigate("/admin/products/images");
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 shadow-xl rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-6 text-zinc-900 dark:text-zinc-100"
    >
      <h2 className="text-xl font-semibold">Product Variants</h2>

      {/* VARIANTS LIST */}
      {variants.length > 0 && (
        <div className="w-full max-h-[420px] overflow-x-auto flex flex-col lg:flex-row items-stretch lg:items-start gap-4 lg:gap-6 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          {variants.map((v, index) => (
            <div key={index} className="min-w-[240px] sm:min-w-[260px] lg:min-w-[280px] flex-shrink-0">
              <ProductVariantCard
                {...v}
                onDelete={() => deleteVariant(index)}
                onEdit={() => handleEdit(v, index)}
              />
            </div>
          ))}
        </div>
      )}

      {/* COLORS SELECTOR */}
      <div className="space-y-2">
        <p className="font-medium">Selected Color: {selectedColor || "None"}</p>
        <div className="flex gap-3">
          {COLORS.map((color) => {
            const isSelected = selectedColor === color.label;
            return (
              <button
                key={color.label}
                type="button"
                onClick={() => setValue("color", color.label, { shouldValidate: true, shouldDirty: true })}
                className={`w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 transition-all ${
                  isSelected
                    ? "ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-zinc-900 scale-110"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: color.hexCode }}
                aria-label={`Select ${color.label}`}
              />
            );
          })}
        </div>
        {errors.color && <p className="text-sm text-red-500 dark:text-red-400">{errors.color.message}</p>}
      </div>

      {/* SIZES SELECTOR */}
      <div className="space-y-2">
        <p className="font-medium">Selected Size: {selectedSize || "None"}</p>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => setValue("size", size, { shouldValidate: true, shouldDirty: true })}
                className={`py-3 rounded-md border font-medium transition-all ${
                  isSelected
                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                    : "bg-white hover:border-black dark:bg-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-500"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
        {errors.size && <p className="text-sm text-red-500 dark:text-red-400">{errors.size.message}</p>}
      </div>

      {/* INPUT FIELDS */}
      {(["price", "stock_quantity"] as const).map((field) => (
        <div key={field} className="space-y-2">
          <input
            type="number"
            placeholder={field === "price" ? "Price" : "Stock"}
            {...register(field, { valueAsNumber: true })}
            className="w-full border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-zinc-100"
          />
          {errors[field] && <p className="text-sm text-red-500 dark:text-red-400">{errors[field]?.message}</p>}
        </div>
      ))}

      {/* ACTIONS */}
      <button
        type="button"
        onClick={handleAddVariant}
        className="bg-black text-white dark:bg-white dark:text-black hover:opacity-90 py-3 rounded-lg font-medium transition-opacity"
      >
        {editingIndex !== null ? "Update Variant" : "Add Variant"}
      </button>

      <button
        type="submit"
        className="bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black hover:opacity-90 py-3 rounded-lg font-medium transition-opacity"
      >
        Next
      </button>
    </form>
  );
};

export default VariantsForm;
