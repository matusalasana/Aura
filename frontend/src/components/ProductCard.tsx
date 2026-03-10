import React, { useState } from 'react';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

import {useCart} from "../hooks/useCart"

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
  category,
  subCategory,
  sizes,
  bestseller,
}) => {
  // Local state to handle image swapping for that "pro" look
  const [currentImage, setCurrentImage] = useState(image[0]);
  const {addToCart} = useCart();

  return (
    <div 
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
      onMouseEnter={() => image[1] && setCurrentImage(image[1])}
      onMouseLeave={() => setCurrentImage(image[0])}
    >
      {/* Image Wrapper - Link to product detail */}
      <Link to={`/product/${_id}`} className="relative aspect-[4/5] overflow-hidden bg-[#f3f3f3]">
        {/* Bestseller Badge */}
        {bestseller && (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-amber-400/90 px-3 py-1 backdrop-blur-sm shadow-sm">
            <Star className="h-3 w-3 fill-white text-white" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white">Bestseller</span>
          </div>
        )}

        {/* Primary Image */}
        <img
          src={currentImage}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
        />

        {/* Quick-Action Icons */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md hover:bg-black hover:text-white transition-colors">
            <Eye className="h-4 w-4" />
          </button>
        </div>

        {/* Hover Overlay: Size Quick-Select */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-black/40 to-transparent">
          <div className="rounded-xl bg-white/95 p-3 backdrop-blur-md shadow-xl">
            <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-tighter text-gray-400">Quick Add Size</p>
            <div className="flex justify-center gap-1.5">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => { e.preventDefault(); /* Add to cart logic here */ }}
                  className="flex h-8 min-w-[32px] items-center justify-center rounded-md border border-gray-100 text-[11px] font-semibold transition-all hover:bg-black hover:text-white hover:border-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex flex-col p-4 pt-5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
            {category}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
            {subCategory}
          </span>
        </div>

        <Link to={`/product/${_id}`}>
          <h3 className="mt-2 text-sm md:text-base font-bold text-gray-800 line-clamp-1 hover:underline decoration-2 underline-offset-4">
            {name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-gray-400 line-through tracking-tight leading-none">$250.00</span>
            <span className="text-lg font-black text-gray-900 tracking-tight">${price}</span>
          </div>

          <button 
             onClick={() => {/* Add to cart logic */}}
             className="group/btn relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-white transition-all hover:w-28 hover:bg-indigo-600"
          >
            <span className="absolute left-3 transition-all">
              <ShoppingCart className="h-4 w-4" />
            </span>
            <span className="absolute left-10 opacity-0 text-[11px] font-bold uppercase tracking-wider transition-all group-hover/btn:opacity-100 whitespace-nowrap">
              Buy Now
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
