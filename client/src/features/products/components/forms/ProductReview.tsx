import { ArrowLeft, Check, Package } from "lucide-react";

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
  return (
    <main className="card w-full max-w-2xl shadow-lg animate-scale-in">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="heading text-xl font-bold">
            Review Product
          </h2>

          <p className="subheading mt-1 text-xs">
            Review your product information before publishing.
          </p>
        </div>

        {/* Product Preview */}
        <div className="flex items-center gap-4 rounded-lg border p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Package className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h3 className="font-semibold">
              {basicData.name || "Untitled Product"}
            </h3>

            <p className="text-xs text-muted-foreground">
              /{basicData.slug}
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <section className="space-y-3">
          <h3 className="font-semibold">
            Basic Information
          </h3>

          <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
            <ReviewItem
              label="Product Name"
              value={basicData.name}
            />

            <ReviewItem
              label="Slug"
              value={basicData.slug}
            />

            <ReviewItem
              label="Product Type"
              value={basicData.type}
            />

            <div className="col-span-2">
              <ReviewItem
                label="Description"
                value={basicData.description}
              />
            </div>
          </div>
        </section>

        {/* Variants */}
        {type === "variant" && (
        <section className="space-y-3">
          <h3 className="font-semibold">
            Variants
          </h3>

          {variantsData.map((variant) => (
            <VariantCard variant={variant} />
          ))}
        </section>
        )}

        
        {/* Inventory */}
        {type === "simple" && (
        <section className="space-y-3">
          <h3 className="font-semibold">
            Inventory
          </h3>

          <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
            <ReviewItem
              label="Price"
              value={`ETB ${inventoryData.price.toLocaleString()}`}
            />

            <ReviewItem
              label="Stock"
              value={inventoryData.stock.toLocaleString()}
            />

            <ReviewItem
              label="SKU"
              value={inventoryData.sku || "—"}
            />

            <ReviewItem
              label="Status"
              value={inventoryData.status}
            />
          </div>
        </section>
        )}

        {/* Actions */}
        <div className="flex-between pt-4">
          <button
            disabled={isCreating}
            type="button"
            onClick={onClickPrev}
            className="btn-ghost gap-2 text-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            disabled={isCreating}
            type="button"
            onClick={onSubmit}
            className="btn-primary gap-2 text-xs"
          >
            <Check className="h-4 w-4" />
            {isCreating ? "Creating..." : "Create Product"}
          </button>
        </div>
      </div>
    </main>
  );
};

interface ReviewItemProps {
  label: string;
  value: string | number;
}

const ReviewItem = ({
  label,
  value,
}: ReviewItemProps) => {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="text-sm font-medium capitalize">
        {value || "—"}
      </p>
    </div>
  );
};

export default ProductReview;