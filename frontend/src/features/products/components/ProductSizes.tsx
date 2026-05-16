import { useState } from "react";

const ProductSizes = () => {
  const sizes = ["S", "M", "L", "XL"];

  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="space-y-3">
      {/* Label */}
      <div className="flex justify-between items-center">
        <p className="text-xs font-medium tracking-wider uppercase text-neutral-500">
          Size: <span className="text-neutral-900 font-semibold">{selectedSize || "Select"}</span>
        </p>
        <button disabled className="text-xs text-neutral-400 underline underline-offset-4 hover:text-neutral-900 transition-colors">
          Size Guide
        </button>
      </div>

      {/* Size Grid */}
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 text-sm font-mono tracking-tight transition-all duration-200 active:scale-98 rounded-md border ${
                isSelected
                  ? "bg-neutral-950 border-neutral-950 text-white font-medium"
                  : "bg-white border-neutral-200 text-neutral-800 hover:border-neutral-400"
              }`}
              aria-label={`Size ${size}`}
              aria-pressed={isSelected}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSizes;