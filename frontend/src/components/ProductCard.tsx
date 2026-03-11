import React, { useState } from 'react';
import { ShoppingCart, Star, Loader2, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from "../hooks/useCart";

interface ProductProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

const ProductCard: React.FC<ProductProps> = ({
  _id,
  name,
  price,
  image,
  sizes,
  bestseller,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, isAdding } = useCart();

  // Helper to safely get images
  const primaryImage = image?.[0] || 'https://via.placeholder.com/600x800';
  const secondaryImage = image?.[1] || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ productId: _id, size });
  };

  return (
    <div 
      className="group relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#F8F8F8] transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/5">
        <Link to={`/product/${_id}`} className="block h-full w-full">
          {/* Badge System */}
          <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
            {bestseller && (
              <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black backdrop-blur-md shadow-sm">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                Bestseller
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-900 opacity-0 transition-all duration-300 hover:bg-black hover:text-white group-hover:opacity-100 backdrop-blur-sm">
            <Heart className="h-4 w-4" />
          </button>

          {/* Main Product Image */}
          <img
            src={isHovered ? secondaryImage : primaryImage}
            alt={name}
            className="h-full w-full object-cover object-top transition-all duration-1000 ease-in-out group-hover:scale-110"
          />

          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full px-4 pb-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
            <div className="rounded-2xl bg-white/90 p-4 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500">Quick Select</span>
                <ArrowUpRight className="h-3 w-3 text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes?.slice(0, 4).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAdd(e, size)}
                    className="flex-1 rounded-lg border border-gray-200 py-2 text-[11px] font-bold transition-all hover:border-black hover:bg-black hover:text-white"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Content Area */}
      <div className="mt-5 space-y-1 px-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${_id}`} className="group/title">
            <h3 className="text-[15px] line-clamp-2 font-semibold text-gray-900 transition-colors group-hover/title:text-indigo-600">
              {name}
            </h3>
            <p className="text-xs text-gray-500">Premium Essentials</p>
          </Link>
          <span className="text-[16px] font-bold text-gray-900">
            ${price.toLocaleString()}
          </span>
        </div>

        {/* Dynamic CTA for Mobile/Static View */}
        <div className="pt-2 sm:hidden">
          <button 
            disabled={isAdding}
            onClick={(e) => handleQuickAdd(e, sizes[0])}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-xs font-bold text-white active:scale-95 transition-all"
          >
            {isAdding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
