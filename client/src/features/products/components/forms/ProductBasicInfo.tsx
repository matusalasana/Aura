import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import ProductMedia from "@/features/products/components/forms/ProductMedia";
import {
  basicInfoSchema,
  type BasicInfoData,
} from "@/features/products/schemas";

interface Props {
  defaultValues: BasicInfoData;
  onClickNext: (data: BasicInfoData) => void;
}

const ProductBasicInfo = ({ onClickNext, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues,
  });

  const onSubmit = (data: BasicInfoData) => {
    onClickNext(data);
  };

  return (
    <main className="w-full max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Package className="size-5" />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Add a product
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Step 1 of 3 · Basic information
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Product details</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Give your product a clear name, description, and images so
              customers know what you're selling.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Product name</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Khaki Jeans"
              autoComplete="off"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Product slug</Label>
            <Input
              id="slug"
              type="text"
              placeholder="e.g. khaki-jeans"
              autoComplete="off"
              aria-invalid={!!errors.slug}
              aria-describedby={errors.slug ? "slug-error" : undefined}
              {...register("slug")}
            />
            <p className="text-xs text-muted-foreground">
              A URL-friendly identifier for your product.
            </p>
            {errors.slug && (
              <p id="slug-error" className="text-sm text-destructive">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Product images</Label>
            <ProductMedia
              onChange={(files) => {
                setValue("images", files, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            {errors.images && (
              <p className="text-sm text-destructive">
                {errors.images.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={5}
              placeholder="Describe the product, its materials, features, or anything customers should know..."
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
              {...register("description")}
            />
            {errors.description && (
              <p id="description-error" className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Product type</Label>
            <select
              id="type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.type}
              aria-describedby={errors.type ? "type-error" : undefined}
              {...register("type")}
            >
              <option value="">Select product type</option>
              <option value="simple">Simple product</option>
              <option value="variant">Product with variations</option>
            </select>

            <p className="text-xs leading-5 text-muted-foreground">
              Choose variations if customers can select different sizes,
              colors, or other options.
            </p>

            {errors.type && (
              <p id="type-error" className="text-sm text-destructive">
                {errors.type.message}
              </p>
            )}
          </div>

          <div className="flex justify-end border-t border-border pt-5">
            <Button type="submit" className="w-full rounded-xl sm:w-auto">
              Next: Inventory
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProductBasicInfo;