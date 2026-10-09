import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowLeft, Plus } from "lucide-react";

import {
  variantsSchema,
  type VariantsData,
} from "@/features/products/schemas";
import VariantCard from "@/features/products/components/forms/VariantCard";

interface Props {
  onClickNext: (data: VariantsData[]) => void;
  onClickPrev: () => void;
  variants: VariantsData[];
}

const ProductVariants = ({
  onClickNext,
  onClickPrev,
  variants,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VariantsData>({
    resolver: zodResolver(variantsSchema),
  });

  const [variantsData, setVariantsData] = useState<VariantsData[]>([]);

  const onSubmit = (data: VariantsData) => {
    setVariantsData((prev) => [...prev, data]);
    reset();
  };

  const allVariants = [...variants, ...variantsData];

  return (
    <main className="card w-full max-w-2xl shadow-lg animate-scale-in">
      {/* Existing + newly added variants */}
      {allVariants.map((variant, index) => (
        <div className="card" key={index}>
          <VariantCard variant={variant} />
        </div>
      ))}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-5"
      >
        <div>
          <h2 className="heading text-xl font-bold">
            Add variants
          </h2>

          <p className="subheading mt-1 text-xs">
            Add variations to your product.
          </p>
        </div>

        {/* Size */}
        <div>
          <label htmlFor="size" className="label">
            Size
          </label>

          <input
            id="size"
            type="text"
            placeholder="eg. 34, 30 plus, XL..."
            className="input"
            {...register("size")}
          />

          {errors.size && (
            <p className="text-destructive mt-1">
              {errors.size.message}
            </p>
          )}
        </div>

        {/* Color */}
        <div>
          <label htmlFor="color" className="label">
            Color
          </label>

          <input
            id="color"
            type="text"
            placeholder="eg. blue, black..."
            className="input"
            {...register("color")}
          />

          {errors.color && (
            <p className="text-destructive mt-1">
              {errors.color.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="label">
            Price
          </label>

          <input
            id="price"
            type="number"
            placeholder="2,000"
            className="input"
            {...register("price")}
          />

          {errors.price && (
            <p className="text-destructive mt-1">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="label">
            How many are in stock?
          </label>

          <input
            id="stock"
            type="number"
            placeholder="100"
            className="input"
            {...register("stock", {
              valueAsNumber: true,
            })}
          />

          {errors.stock && (
            <p className="text-destructive mt-1">
              {errors.stock.message}
            </p>
          )}
        </div>

        {/* SKU */}
        <div>
          <label htmlFor="sku" className="label">
            SKU
          </label>

          <input
            id="sku"
            type="text"
            placeholder="KAH-WHT-XL"
            className="input"
            {...register("sku")}
          />

          {errors.sku && (
            <p className="text-destructive mt-1">
              {errors.sku.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary gap-2 text-xs"
        >
          <Plus className="h-4 w-4" />
          Add Variant
        </button>

        <div className="flex-between pt-4">
          <button
            type="button"
            onClick={onClickPrev}
            className="btn-ghost gap-2 text-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            type="button"
            onClick={() => onClickNext(allVariants)}
            disabled={allVariants.length < 1}
            className="btn-primary gap-2 text-xs"
          >
            Next: Review & Publish
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </main>
  );
};

export default ProductVariants;