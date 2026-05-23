// ProductVariantCard.tsx

import {
  Package2,
  Pencil,
  Trash2,
} from "lucide-react";

interface VariantProps {
  color: string;
  size: string;
  price: number;
  stock_quantity: number;

  onDelete: () => void;

  onEdit: () => void;
}

const ProductVariantCard = ({
  color,
  size,
  price,
  stock_quantity,
  onDelete,
  onEdit,
}: VariantProps) => {
  return (
    <div
      className="
        w-full rounded-2xl
        border bg-white
        p-4 shadow-sm
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">
            {color} / {size}
          </h3>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onEdit}
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={onDelete}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div
        className={`
          mt-3 inline-block
          rounded-full px-2 py-1
          text-xs font-medium

          ${
            stock_quantity > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
        `}
      >
        {stock_quantity > 0
          ? "In Stock"
          : "Out of Stock"}
      </div>

      <div
        className="
          mt-4 flex items-center
          justify-between
          border-t pt-4
        "
      >
        <div>
          <p className="text-xs text-gray-500">
            Price
          </p>

          <h2 className="text-lg font-bold">
            $
            {price.toFixed(
              2
            )}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Package2 size={18} />

          <span>
            {stock_quantity} pcs
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductVariantCard;