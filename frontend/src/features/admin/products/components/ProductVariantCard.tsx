import { Package2 } from "lucide-react";

interface VariantProps {
  color?: string;
  size?: string;
  price?: number;
  stock_quantity?: number;
}

const ProductVariantCard = ({
  color,
  size,
  price,
  stock_quantity,
}: VariantProps) => {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {color} / {size}
          </h3>
        </div>

        <div
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            stock_quantity > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {stock_quantity > 0 ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-500">Price</p>

          <h2 className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Package2 size={18} />

          <span>{stock_quantity} pcs</span>
        </div>
      </div>
    </div>
  );
};

export default ProductVariantCard;