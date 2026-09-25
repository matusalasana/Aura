interface Variant {
  color: string;
  size: string;
  price: string;
  sku: string;
  stock: number;
}

interface VariantCardProps {
  variant: Variant;
}

const VariantCard = ({ variant }: VariantCardProps) => {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">
            {variant.color} / {variant.size}
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            SKU: {variant.sku}
          </p>
        </div>

        <p className="font-semibold">
          ${variant.price}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm">
        <span className="text-muted-foreground">Stock</span>
        <span className="font-medium">{variant.stock}</span>
      </div>
    </div>
  );
};

export default VariantCard;