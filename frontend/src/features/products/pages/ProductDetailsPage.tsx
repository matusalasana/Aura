import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProductDetailImages from "../components/ProductDetailImages"
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

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);

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
    product.images.length > 0 || product.images
      ? product.images
      : [FALLBACK_IMAGE];

  const price = Number(product.price || 0);

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Black", "Blue", "Red"];

  const colorMap: Record<string, string> = {
    Black: "#000000",
    Blue: "#2563eb",
    Red: "#dc2626",
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  // ---------------- UI ----------------
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs uppercase text-black/50 mb-10">
        <Link to="/">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/collections">Collections</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black">{product.name}</span>
      </nav>

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
              {price.toFixed(2)} ETB
            </p>
          </div>

          <p className="text-black/60">
            {product.description}
          </p>

          {/* COLORS */}
          <div>
            <p className="text-xs uppercase mb-2">
              Color: {selectedColor}
            </p>

            <div className="flex gap-3">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === c
                      ? "border-black"
                      : "border-transparent"
                  }`}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: colorMap[c],
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div>
            <p className="text-xs uppercase mb-2">Size</p>

            <div className="grid grid-cols-4 gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-2 border ${
                    selectedSize === s
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
            >
              <Minus />
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
            >
              <Plus />
            </button>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            disabled={isPending}
            className="w-full bg-black text-white py-3"
          >
            {isPending ? "Adding..." : "Add to Cart"}
          </button>

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