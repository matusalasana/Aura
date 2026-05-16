import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const ProductQuantity = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-3">
      {/* Label for Context */}
      <p className="text-xs font-medium tracking-wider uppercase text-neutral-500">
        Quantity
      </p>

      {/* Unified Selector Capsule */}
      <div className="inline-flex items-center border border-neutral-200 rounded-full p-1 bg-neutral-50/50">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors disabled:opacity-30 disabled:hover:text-neutral-500 rounded-full active:scale-95"
          aria-label="Decrease quantity"
        >
          <Minus size={14} strokeWidth={2.5} />
        </button>

        <span className="w-8 text-center text-sm font-medium font-mono text-neutral-900 tabular-nums select-none">
          {quantity}
        </span>

        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors rounded-full active:scale-95"
          aria-label="Increase quantity"
        >
          <Plus size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default ProductQuantity;
