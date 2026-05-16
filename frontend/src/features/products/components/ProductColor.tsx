import { useState } from "react";

const ProductColor = () => {
  const colors = ["Black", "White", "Blue", "Red"];
  const colorMap: Record<string, string> = {
    Black: "#000000",
    White: "#ffffff",
    Blue: "#2563eb",
    Red: "#dc2626",
  };
  
  const [selectedColor, setSelectedColor] = useState("Black");
  
  return (
    <div className="space-y-3">
      {/* Label */}
      <p className="text-xs font-medium tracking-wider uppercase text-neutral-500">
        Color: <span className="text-neutral-900 font-semibold">{selectedColor}</span>
      </p>

      {/* Swatches */}
      <div className="flex items-center gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor === color;
          return (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{ backgroundColor: colorMap[color] }}
              className={`w-6 h-6 rounded-full transition-all duration-200 active:scale-90 relative ${
                isSelected 
                  ? "ring-2 ring-neutral-950 ring-offset-2" 
                  : "hover:scale-105 ring-1 ring-neutral-200"
              }`}
              title={color}
              aria-label={`Select ${color}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductColor;
