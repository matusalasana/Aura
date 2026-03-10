// components/ProductCard.tsx
import React, { useState } from 'react';
import { ShoppingCart, Star, Loader2 } from 'lucide-react';
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
  const [currentImage, setCurrentImage] = useState(image?.[0] || '');
  const { addToCart, isAdding } = useCart();

  const handleAddToCart = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ productId: _id, size });
  };

  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      <Link to={`/product/${_id}`} className="relative aspect-[4/5] overflow-hidden bg-[#f3f3f3]">
        {bestseller && (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-amber-400/90 px-3 py-1 backdrop-blur-sm shadow-sm">
            <Star className="h-3 w-3 fill-white text-white" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white">Bestseller</span>
          </div>
        )}

        <img
          src={currentImage || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-black/40 to-transparent">
          <div className="rounded-xl bg-white/95 p-3 backdrop-blur-md shadow-xl">
            <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-tighter text-gray-400">Quick Add</p>
            <div className="flex justify-center gap-1.5">
              {sizes?.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleAddToCart(e, size)}
                  className="flex h-8 min-w-[32px] items-center justify-center rounded-md border border-gray-100 text-[11px] font-semibold hover:bg-black hover:text-white"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Link>

      <div className="flex flex-col p-4 pt-5">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-black text-gray-900">${price}</span>
          <button 
             disabled={isAdding}
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               if (sizes && sizes.length > 0) {
                 addToCart({ productId: _id, size: sizes[0] });
               }
             }}
             className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-indigo-600 disabled:bg-gray-400"
          >
            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;