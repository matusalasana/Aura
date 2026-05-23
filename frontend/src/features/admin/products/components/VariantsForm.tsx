// VariantsForm.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import {
  type VariantsInput,
  variantsSchema,
} from "../types";

import ProductVariantCard from "./ProductVariantCard";

import { useVariantsStore } from "../store/productVariantsStore";

const VariantsForm = () => {
  const navigate = useNavigate();

  const variants = useVariantsStore(
    (state) => state.variants
  );

  const addVariant = useVariantsStore(
    (state) => state.addVariant
  );

  const deleteVariant =
    useVariantsStore(
      (state) => state.deleteVariant
    );

  const updateVariant =
    useVariantsStore(
      (state) => state.updateVariant
    );

  const [
    editingIndex,
    setEditingIndex,
  ] = useState<number | null>(
    null
  );

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
    resolver:
      zodResolver(variantsSchema),

    defaultValues: {
      size: "",
      color: "",
      price: 0,
      stock_quantity: 0,
    },
  });

  const selectedSize =
    watch("size");

  const selectedColor =
    watch("color");

  const sizes = [
    "28",
    "29",
    "30",
    "32",
    "36",
    "38",
  ];

  const colors = [
    {
      label: "Black",
      hexCode: "#000000",
    },
    {
      label: "White",
      hexCode: "#ffffff",
    },
    {
      label: "Blue",
      hexCode: "#3b82f6",
    },
    {
      label: "Red",
      hexCode: "#dc2626",
    },
  ];

  const clearForm = () => {
    reset({
      size: "",
      color: "",
      price: 0,
      stock_quantity: 0,
    });

    setEditingIndex(null);
  };

  const handleAddVariant =
    async () => {
      const isValid =
        await trigger();

      if (!isValid) return;

      const values = getValues();

      if (
        editingIndex !== null
      ) {
        const updated =
          updateVariant(
            editingIndex,
            values
          );

        if (!updated) {
          alert(
            "Variant with same color and size already exists."
          );

          return;
        }

        clearForm();

        return;
      }

      const added =
        addVariant(values);

      if (!added) {
        alert(
          "Variant with same color and size already exists."
        );

        return;
      }

      clearForm();
    };

  const handleEdit = (
    variant: VariantsInput,
    index: number
  ) => {
    setEditingIndex(index);

    setValue(
      "color",
      variant.color
    );

    setValue(
      "size",
      variant.size
    );

    setValue(
      "price",
      variant.price
    );

    setValue(
      "stock_quantity",
      variant.stock_quantity
    );
  };

  const onFormSubmit = () => {
    if (
      variants.length === 0
    ) {
      alert(
        "Please add at least one variant."
      );

      return;
    }

    navigate(
      "/admin/products/images"
    );
  };

  return (
    <form
      onSubmit={handleSubmit(
        onFormSubmit
      )}
      className="
        w-full max-w-md mx-auto
        bg-white shadow-xl
        rounded-xl p-6 border
        flex flex-col gap-6
      "
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

            flex flex-col lg:flex-row
            items-stretch lg:items-start
            gap-4 lg:gap-6

            p-2 sm:p-3
            rounded-xl

            bg-zinc-50
            border
          "
        >
          {variants.map(
            (v, index) => (
              <div
                key={index}
                className="
                  min-w-[240px]
                  sm:min-w-[260px]
                  lg:min-w-[280px]
                  flex-shrink-0
                "
              >
                <ProductVariantCard
                  color={v.color}
                  size={v.size}
                  price={v.price}
                  stock_quantity={
                    v.stock_quantity
                  }
                  onDelete={() =>
                    deleteVariant(
                      index
                    )
                  }
                  onEdit={() =>
                    handleEdit(
                      v,
                      index
                    )
                  }
                />
              </div>
            )
          )}
        </div>
      )}

      {/* COLORS */}
      <div className="space-y-2">
        <p className="font-medium">
          Selected Color:{" "}
          {selectedColor ||
            "None"}
        </p>

        <div className="flex gap-3">
          {colors.map((color) => {
            const isSelected =
              selectedColor ===
              color.label;

            return (
              <button
                key={
                  color.label
                }
                type="button"
                onClick={() =>
                  setValue(
                    "color",
                    color.label,
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    }
                  )
                }
                className={`
                  w-8 h-8
                  rounded-full
                  border
                  transition-all
                  ${
                    isSelected
                      ? "ring-2 ring-black ring-offset-2 scale-110"
                      : "hover:scale-105"
                  }
                `}
                style={{
                  backgroundColor:
                    color.hexCode,
                }}
              />
            );
          })}
        </div>

        {errors.color && (
          <p className="text-sm text-red-500">
            {
              errors.color
                .message
            }
          </p>
        )}
      </div>

      {/* SIZES */}
      <div className="space-y-2">
        <p className="font-medium">
          Selected Size:{" "}
          {selectedSize ||
            "None"}
        </p>

        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => {
            const isSelected =
              selectedSize ===
              size;

            return (
              <button
                key={size}
                type="button"
                onClick={() =>
                  setValue(
                    "size",
                    size,
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    }
                  )
                }
                className={`
                  py-3 rounded-md
                  border font-medium
                  transition-all

                  ${
                    isSelected
                      ? "bg-black text-white border-black"
                      : "bg-white hover:border-black"
                  }
                `}
              >
                {size}
              </button>
            );
          })}
        </div>

        {errors.size && (
          <p className="text-sm text-red-500">
            {
              errors.size
                .message
            }
          </p>
        )}
      </div>

      {/* PRICE */}
      <div className="space-y-2">
        <input
          type="number"
          placeholder="Price"
          {...register(
            "price",
            {
              valueAsNumber: true,
            }
          )}
          className="
            w-full border
            px-3 py-2 rounded-lg
          "
        />

        {errors.price && (
          <p className="text-sm text-red-500">
            {
              errors.price
                .message
            }
          </p>
        )}
      </div>

      {/* STOCK */}
      <div className="space-y-2">
        <input
          type="number"
          placeholder="Stock"
          {...register(
            "stock_quantity",
            {
              valueAsNumber: true,
            }
          )}
          className="
            w-full border
            px-3 py-2 rounded-lg
          "
        />

        {errors.stock_quantity && (
          <p className="text-sm text-red-500">
            {
              errors
                .stock_quantity
                .message
            }
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={
          handleAddVariant
        }
        className="
          bg-black text-white
          py-3 rounded-lg
        "
      >
        {editingIndex !==
        null
          ? "Update Variant"
          : "Add Variant"}
      </button>

      <button
        type="submit"
        className="
          bg-zinc-800 text-white
          py-3 rounded-lg
        "
      >
        Next
      </button>
    </form>
  );
};

export default VariantsForm;