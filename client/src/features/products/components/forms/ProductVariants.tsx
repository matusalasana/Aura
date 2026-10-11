import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const allVariants = [...variants, ...variantsData];

  const onSubmit = (data: VariantsData) => {
    setVariantsData((prev) => [...prev, data]);
    reset();
  };

  const removeVariant = (index: number) => {
    if (index < variants.length) return;

    setVariantsData((prev) =>
      prev.filter((_, i) => i !== index - variants.length),
    );
  };

  return (
    <main className="mx-auto w-full max-w-2xl animate-in fade-in duration-300">
      <div className="space-y-6 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">
            Product Variants
          </h2>
          <p className="text-sm text-muted-foreground">
            Add different sizes, colors, or other variations of your product.
          </p>
        </div>

        {/* Variant list */}
        {allVariants.length > 0 && (
          <section className="space-y-3" aria-label="Added variants">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Added variants</h3>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {allVariants.length}{" "}
                {allVariants.length === 1 ? "variant" : "variants"}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {allVariants.map((variant, index) => (
                <div key={`${variant.sku}-${index}`} className="relative">
                  <VariantCard variant={variant} />

                  {index >= variants.length && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove variant ${variant.color} ${variant.size}`}
                      onClick={() => removeVariant(index)}
                      className="absolute right-2 top-2 size-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Add variant form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-lg border border-border bg-background p-4 sm:p-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Boxes className="size-5" />
            </div>
            <div>
              <h3 className="font-semibold">Add a variant</h3>
              <p className="text-xs text-muted-foreground">
                Enter the details for one variation.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                placeholder="e.g. XL, 34"
                aria-invalid={!!errors.size}
                {...register("size")}
              />
              {errors.size && (
                <p className="text-sm text-destructive">{errors.size.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                placeholder="e.g. Blue, Black"
                aria-invalid={!!errors.color}
                {...register("color")}
              />
              {errors.color && (
                <p className="text-sm text-destructive">{errors.color.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="any"
                placeholder="2000"
                aria-invalid={!!errors.price}
                {...register("price")}
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Available stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                step="1"
                placeholder="100"
                aria-invalid={!!errors.stock}
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && (
                <p className="text-sm text-destructive">{errors.stock.message}</p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                placeholder="KAH-WHT-XL"
                aria-invalid={!!errors.sku}
                {...register("sku")}
              />
              {errors.sku && (
                <p className="text-sm text-destructive">{errors.sku.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" variant="outline" className="w-full gap-2">
            <Plus className="size-4" />
            Add Variant
          </Button>
        </form>

        {/* Step navigation */}
        <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={onClickPrev}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          <Button
            type="button"
            onClick={() => onClickNext(allVariants)}
            disabled={allVariants.length === 0}
            className="gap-2"
          >
            Next: Review & Publish
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProductVariants;