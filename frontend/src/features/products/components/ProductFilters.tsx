import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import Categories from "./productFilters/Categories"

const ProductFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFiltersChange = (category: string) => {
    setSelectedFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filter Content Component to avoid repetition
  const FilterContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between lg:justify-start gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
            <SlidersHorizontal size={18} />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">Filters</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Refine your products</p>
          </div>
        </div>
        {/* Close button for mobile */}
        <button 
          onClick={() => setIsOpen(false)} 
          className="lg:hidden p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
        >
          <X size={20} />
        </button>
      </div>
      

      {/* Categories */}
      <Categories
        setCategories={(category) => handleFiltersChange(category)}
        categoriesFilters={selectedFilters}
      />

      {/* Product Type */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Product Type
        </h3>
        <div className="space-y-3">
          {["Top Wear", "Bottom Wear", "Footwear"].map((item) => (
            <label key={item} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 bg-transparent"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Price Range
        </h3>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-500"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button className="flex-1 rounded-xl bg-zinc-900 dark:bg-zinc-100 py-3 text-sm font-medium text-zinc-100 dark:text-zinc-900 transition hover:opacity-90">
          Apply
        </button>
        <button className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-5 py-3 text-sm text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">
          Reset
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3 rounded-full shadow-2xl active:scale-95 transition-transform"
      >
        <SlidersHorizontal size={18} />
        <span className="font-medium">Filters</span>
      </button>

      {/* Mobile Overlay & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-[350px] bg-white dark:bg-zinc-900 z-[60] p-6 space-y-8 shadow-2xl lg:hidden overflow-y-auto"
            >
              <FilterContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Always Visible) */}
      <aside className="hidden lg:block w-[320px] sticky top-8 h-fit rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-8">
        <FilterContent />
      </aside>
    </>
  );
};

export default ProductFilters;
