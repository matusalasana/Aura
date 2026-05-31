import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailImagesProps {
  images: string [];
  product: {
    name: string;
  };
}

const ProductDetailImages = ({ images, product }: ProductDetailImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-[3/4] w-full bg-neutral-50 overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImage}
            src={images[selectedImage]}
            alt={`${product.name} - View ${selectedImage + 1}`}
            className="w-full h-full object-cover select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Minimalist Slide Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-white/40 backdrop-blur-md px-2.5 py-1.5 rounded-full">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  selectedImage === i ? "w-4 bg-neutral-900" : "w-1 bg-neutral-900/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2.5">
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setSelectedImage(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative aspect-[3/4] rounded-lg overflow-hidden transition-all duration-200 bg-neutral-50 ${
                selectedImage === i
                  ? "ring-1 ring-neutral-900 ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${product.name} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetailImages;
