import { Boxes, Package, Tag } from "lucide-react";

import type { VariantsData } from "@/features/products/schemas";

interface VariantCardProps {
  variant: VariantsData;
}

const VariantCard = ({ variant }: VariantCardProps) => {
  return (
    <article className="rounded-xl border border-border bg-card p-4 text-card-foreground transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold tracking-tight">
              {variant.color} / {variant.size}
            </h3>

            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              <Boxes className="size-3" />
              Variant
            </span>
          </div>

          <p className="flex items-center gap-1.5 break-all text-xs text-muted-foreground">
            <Tag className="size-3.5 shrink-0" />
            SKU: {variant.sku}
          </p>
        </div>

        <p className="shrink-0 text-lg font-semibold tabular-nums">
          ${Number(variant.price).toLocaleString()}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="size-4" />
          Available stock
        </span>

        <span className="rounded-md bg-muted px-2.5 py-1 text-sm font-semibold tabular-nums">
          {variant.stock}
        </span>
      </div>
    </article>
  );
};

export default VariantCard;