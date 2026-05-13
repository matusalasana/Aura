import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

const ProductFilters = () => {
  return (
    <aside
      className="
        w-full lg:w-[320px]
        rounded-3xl
        border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-900
        p-6
        space-y-8
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <SlidersHorizontal size={18} />
        </div>

        <div>
          <h2 className="font-semibold text-lg">Filters</h2>
          <p className="text-sm text-zinc-500">
            Refine your products
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide">
          Categories
        </h3>

        <div className="space-y-3">
          {["Men", "Women", "Kids"].map((item) => (
            <label
              key={item}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-300"
                />

                <span className="text-sm">{item}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Product Type */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide">
          Product Type
        </h3>

        <div className="space-y-3">
          {["Top Wear", "Bottom Wear", "Footwear"].map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300"
              />

              <span className="text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide">
          Price Range
        </h3>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            className="
              w-full rounded-xl border
              border-zinc-300 dark:border-zinc-700
              bg-transparent
              px-4 py-3 text-sm
              outline-none focus:ring-2 focus:ring-zinc-400
            "
          />

          <input
            type="number"
            placeholder="Max"
            className="
              w-full rounded-xl border
              border-zinc-300 dark:border-zinc-700
              bg-transparent
              px-4 py-3 text-sm
              outline-none focus:ring-2 focus:ring-zinc-400
            "
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          className="
            flex-1 rounded-xl
            bg-black dark:bg-white
            py-3 text-sm font-medium
            text-white dark:text-black
            transition hover:opacity-90
          "
        >
          Apply Filters
        </button>

        <button
          className="
            rounded-xl border
            border-zinc-300 dark:border-zinc-700
            px-5 py-3 text-sm
            transition hover:bg-zinc-100 dark:hover:bg-zinc-800
          "
        >
          Reset
        </button>
      </div>
    </aside>
  );
};

export default ProductFilters;