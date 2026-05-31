import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isAdding: boolean;
  onClickWishlist: () => void;
  onClickAddToCart: () => void;
}

const ProductCard = ({ 
  product, 
  isAdding, 
  onClickAddToCart, 
  onClickWishlist }: ProductCardProps) => {

  return (
    <motion.div 
      className="group relative"
    >
      {/* Image Container */}
      <Link to={`/products/${product.id}`}>
        <div className="aspect-[3/4] overflow-hidden bg-aura-soft relative">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full rounded-lg object-cover grayscale hover:grayscale-0 transition-all duration-700"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            referrerPolicy="no-referrer"
          />
          
          {/* Quick Actions overlay */}
          <div className="absolute inset-0 bg-aura-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Info */}
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-xs uppercase tracking-widest font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[70%]">
            <Link to={`/products/${product.id}`} className="hover:text-aura-accent transition-colors text-gray-600 dark:text-white">
              {product.name}
            </Link>
          </h3>
          <p className="text-xs font-bold tabular-nums">
            {Number(product.price ?? 0).toLocaleString()} 
            <span className="text-[8px] font-light text-gray-600 dark:text-white"> ETB</span>
          </p>
        </div>
        <p className="text-[10px] uppercase tracking-[0.1em]">
          {product.category_name}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
