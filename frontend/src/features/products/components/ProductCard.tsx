import React from "react";
import { Heart, ShoppingCart, Star, ArrowRight } from "lucide-react";

type ProductCardProps = {
  category: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating_count: number;
  rating: number;
  image: string;
  onClickWishlist: () => void;
  onClickAddToCart: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  category,
  name,
  description,
  price,
  stock,
  rating_count,
  rating,
  image,
  onClickWishlist,
  onClickAddToCart,
}) => {
  const isInStock = stock > 0;

  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-900 dark:shadow-none">
      
      {/* IMAGE CONTAINER */}
      <div className="relative h-72 w-full overflow-hidden rounded-[1.5rem] bg-gray-100 dark:bg-gray-800">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Floating Price Tag */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="rounded-2xl bg-white/80 px-4 py-2 font-bold text-gray-900 backdrop-blur-md dark:bg-gray-900/80 dark:text-white">
            {price} ETB
          </div>
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button
            onClick={onClickWishlist}
            className="group/heart flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all hover:bg-red-50 dark:bg-gray-800/90 dark:hover:bg-red-950"
            aria-label="Add to wishlist"
          >
            <Heart 
              size={18} 
              className="text-gray-600 transition-colors group-hover/heart:fill-red-500 group-hover/heart:text-red-500 dark:text-gray-300" 
            />
          </button>
        </div>

        {/* Out of Stock Mask */}
        {!isInStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 backdrop-blur-[2px]">
            <span className="rotate-[-10deg] rounded-lg border-2 border-white px-4 py-1 text-sm font-bold uppercase tracking-widest text-white">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="px-3 pb-4 pt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{rating}</span>
            <span className="text-[10px] text-gray-400">({rating_count})</span>
          </div>
        </div>

        <h3 className="mb-2 line-clamp-1 text-xl font-bold text-gray-900 dark:text-white">
          {name}
        </h3>
        
        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>

        {/* INTERACTIVE FOOTER */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
             <span className={`text-[11px] font-medium ${isInStock ? 'text-emerald-500' : 'text-red-400'}`}>
               {isInStock ? `● ${stock} in stock` : '○ Restocking soon'}
             </span>
          </div>

          <button
            onClick={onClickAddToCart}
            disabled={!isInStock}
            className="group/btn relative flex items-center gap-2 overflow-hidden rounded-xl bg-gray-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-black hover:pr-8 disabled:bg-gray-300 dark:bg-white dark:text-gray-900 dark:disabled:bg-gray-700"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ShoppingCart size={16} />
              Add
            </span>
            <ArrowRight 
              size={14} 
              className="absolute right-2 opacity-0 transition-all group-hover/btn:right-3 group-hover/btn:opacity-100" 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
