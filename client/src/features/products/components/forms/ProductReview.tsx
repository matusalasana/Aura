import {
  ArrowLeft,
  Check,
  ClipboardCheck,
  Package,
  Boxes,
  LoaderCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type {
  BasicInfoData,
  InventoryInfoData,
  VariantsData,
} from "@/features/products/schemas";
import VariantCard from "@/features/products/components/forms/VariantCard";

interface Props {
  isCreating: boolean;
  type: string;
  basicData: BasicInfoData;
  variantsData: VariantsData[];
  inventoryData: InventoryInfoData;
  onClickPrev: () => void;
  onSubmit: () => void;
}

const ProductReview = ({
  isCreating,
  type,
  basicData,
  variantsData,
  inventoryData,
  onClickPrev,
  onSubmit,
}: Props) => {
  const isVariantProduct = type === "variant";

  return (
    <main className="mx-auto w-full max-w-2xl animate-in fade-in duration-300">
      <div className="space-y-7 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-8">
        {/* Header */}
        <div className="space-y-1">
          <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardCheck className="size-5" />
          </div>

          <h2 className="text-xl font-semibold tracking-tight">
            Review Product
          </h2>

          <p className="text-sm text-muted-foreground">
            Check your product details before creating your listing.
          </p>
        </div>

        {/* Product Preview */}
        <div className="flex min-w-0 items-center gap-4 rounded-xl border border-border bg-background p-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Package className="size-7" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold">
              {basicData.name || "Untitled Product"}
            </h3>

            <p className="mt-1 truncate text-sm text-muted-foreground">
              /{basicData.slug || "no-slug"}
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize text-muted-foreground">
            {isVariantProduct ? (
              <Boxes className="size-3.5" />
            ) : (
              <Package className="size-3.5" />
            )}
            {isVariantProduct ? "Variants" : "Simple"}
          </span>
        </div>

        {/* Basic Information */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold">Basic Information</h3>

          <div className="grid grid-cols-1 gap-5 rounded-xl border border-border p-4 sm:grid-cols-2 sm:p-5">
            <ReviewItem label="Product Name" value={basicData.name} />
            <ReviewItem label="Slug" value={basicData.slug} />
            <ReviewItem label="Product Type" value={basicData.type} />

            <div className="sm:col-span-2">
              <ReviewItem
                label="Description"
                value={basicData.description ?? ""}
              />
            </div>
          </div>
        </section>

        {/* Variants */}
        {isVariantProduct && (
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold">Product Variants</h3>

              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {variantsData.length}{" "}
                {variantsData.length === 1 ? "variant" : "variants"}
              </span>
            </div>

            {variantsData.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {variantsData.map((variant, index) => (
                  <VariantCard
                    key={`${variant.sku}-${index}`}
                    variant={variant}
                  />
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
                No variants have been added.
              </p>
            )}
          </section>
        )}

        {/* Simple Product Inventory */}
        {!isVariantProduct && (
          <section className="space-y-3">
            <h3 className="text-sm font-semibold">Inventory Information</h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5 rounded-xl border border-border p-4 sm:p-5">
              <ReviewItem
                label="Price"
                value={`ETB ${Number(inventoryData.price).toLocaleString()}`}
              />

              <ReviewItem
                label="Available Stock"
                value={Number(inventoryData.stock).toLocaleString()}
              />

              <ReviewItem
                label="SKU"
                value={inventoryData.sku || "—"}
              />

              <ReviewItem
                label="Listing Status"
                value={inventoryData.status || "draft"}
              />
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            disabled={isCreating}
            onClick={onClickPrev}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          <Button
            type="button"
            disabled={isCreating}
            onClick={onSubmit}
            className="gap-2"
          >
            {isCreating ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Creating Product...
              </>
            ) : (
              <>
                <Check className="size-4" />
                Create Product
              </>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};

interface ReviewItemProps {
  label: string;
  value: string | number;
}

const ReviewItem = ({ label, value }: ReviewItemProps) => {
  const displayValue = String(value ?? "").trim() || "—";

  return (
    <div className="min-w-0 space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="break-words text-sm font-medium capitalize">
        {displayValue}
      </p>
    </div>
  );
};

export default ProductReview;