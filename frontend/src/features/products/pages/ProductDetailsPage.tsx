import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProductDetailImages from "../components/ProductDetailImages"
import ProductColor from "../components/ProductColor"
import ProductSizes from "../components/ProductSizes"
import ProductQuantity from "../components/ProductQuantity"
import AddToCartBtn from "../components/AddToCartBtn"
import Breadcrumb from "../../../shared/ui/Breadcrumb"
import {
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  Share2,
  Info,
  ShoppingBag,
  Heart,
} from "lucide-react";

import { useProduct } from "../hooks/useProduct";
import { useAddToCart } from "../../cart/hooks/useAddToCart";

const FALLBACK_IMAGE =
  "https://placehold.co/800x1000?text=No+Image";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(id || "");

  const { mutate: addToCart, isPending } = useAddToCart();

  
  
  
  const breadcrumbLinks = [
    { name: "Home", linkTo: "/" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load product
      </div>
    );
  }

  // ---------------- SAFE DATA NORMALIZATION ----------------
  const images: string[] =
    product.images.length > 0
      ? product.images
      : [FALLBACK_IMAGE];

  const price = Number(product.price || 0);

  

  

  // ---------------- UI ----------------
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <Breadcrumb 
        links={breadcrumbLinks}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      
        {/* LEFT */}
        <ProductDetailImages 
          product={product}
          images={images}
        />

        {/* RIGHT */}
        <div className="space-y-8">
        
          <div>
            <h1 className="text-4xl font-serif">{product.name}</h1>
            <p className="text-xl mt-2">
              {Number(price).toFixed(2).toLocaleString()} ETB
            </p>
          </div>

          <p className="text-black/60">
            {product.description}
          </p>

          <ProductColor />
          <ProductSizes />
          <ProductQuantity />
          <AddToCartBtn />

          {/* EXTRA */}
          <div className="text-sm text-black/60 space-y-2">
            <p>✔ Free shipping</p>
            <p>✔ 30-day returns</p>
          </div>
        
      </div>
    </div>
  </div>
  );
};

export default ProductDetailsPage;