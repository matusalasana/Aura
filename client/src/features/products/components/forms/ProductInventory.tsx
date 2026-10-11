import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  inventoryInfoSchema,
  type InventoryInfoData,
} from "@/features/products/schemas";

interface Props {
  onClickNext: (data: InventoryInfoData) => void;
  onClickPrev: () => void;
  defaultValues: InventoryInfoData;
}

const ProductInventory = ({
  onClickNext,
  onClickPrev,
  defaultValues,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InventoryInfoData>({
    resolver: zodResolver(inventoryInfoSchema),
    defaultValues,
  });

  const onSubmit = (data: InventoryInfoData) => {
    onClickNext(data);
  };

  return (
    <main className="mx-auto w-full max-w-2xl animate-in fade-in duration-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-8"
      >
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">
            Inventory Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Set your product price, available stock, and listing status.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Product Price</Label>
          <Input
            id="price"
            type="number"
            step="any"
            placeholder="2000"
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? "price-error" : undefined}
            {...register("price")}
          />
          {errors.price && (
            <p id="price-error" className="text-sm text-destructive">
              {errors.price.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Available Stock</Label>
          <Input
            id="stock"
            type="number"
            step="1"
            placeholder="100"
            aria-invalid={!!errors.stock}
            aria-describedby={errors.stock ? "stock-error" : undefined}
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <p id="stock-error" className="text-sm text-destructive">
              {errors.stock.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            type="text"
            placeholder="KAH-WHT-XL"
            aria-invalid={!!errors.sku}
            aria-describedby={errors.sku ? "sku-error" : undefined}
            {...register("sku")}
          />
          <p className="text-xs text-muted-foreground">
            A unique identifier to help you track this product.
          </p>
          {errors.sku && (
            <p id="sku-error" className="text-sm text-destructive">
              {errors.sku.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Listing Status</Label>
          <select
            id="status"
            aria-invalid={!!errors.status}
            aria-describedby={errors.status ? "status-error" : undefined}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            {...register("status")}
          >
            <option value="">Select a status</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
          {errors.status && (
            <p id="status-error" className="text-sm text-destructive">
              {errors.status.message}
            </p>
          )}
        </div>

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

          <Button type="submit" className="gap-2">
            Next: Review & Publish
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>
    </main>
  );
};

export default ProductInventory;