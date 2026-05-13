import { useState } from "react";
import { ArrowUpDown } from "lucide-react";

type SortValue =
  | "newest"
  | "price_asc"
  | "price_desc"
  | "rating_desc";

interface Props {
  value: SortValue;
  onChange: (value: SortValue) => void;
}

const ProductSort = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  const options: { label: string; value: SortValue }[] = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Top Rated", value: "rating_desc" },
  ];

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative inline-block text-left m-3">
      
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 hover:bg-zinc-800 transition"
      >
        <ArrowUpDown size={16} />
        {selected?.label}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg overflow-hidden z-50">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition ${
                value === option.value
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSort;