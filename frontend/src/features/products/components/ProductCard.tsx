import React from 'react';
import { ShoppingCart, Star, Heart, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ProductCardProps = {
  category: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating_count: number;
  rating: number;
  image: string;
  isAdding: boolean;
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
  isAdding,
  onClickWishlist,
  onClickAddToCart,
}) => {
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-slate-900"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={onClickWishlist}
          className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-slate-900 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 dark:bg-slate-800/80 dark:text-slate-100"
        >
          <Heart size={20} className="transition-transform active:scale-90" />
        </button>

        {/* Stock Badge */}
        {stock < 5 && stock > 0 && (
          <div className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Low Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {category}
        </span>
        
        <h3 className="mb-2 line-clamp-1 text-lg font-bold text-slate-800 dark:text-slate-100">
          {name}
        </h3>
        
        <p className="mb-4 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>

        {/* Rating & Price Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex items-center text-yellow-400">
              <Star size={16} fill="currentColor" />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{rating}</span>
            <span className="text-xs text-slate-400">({rating_count})</span>
          </div>
          
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {Number(price).toLocaleString()} ETB
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            disabled={stock === 0 || isAdding}
            onClick={onClickAddToCart}
            className={`relative flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
              ${stock === 0 
                ? 'cursor-not-allowed bg-slate-200 text-slate-400' 
                : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-700'
              }`}
          >
            <AnimatePresence mode="wait">
              {isAdding ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart size={18} />
                  {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
