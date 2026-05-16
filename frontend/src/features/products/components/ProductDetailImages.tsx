import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

interface ProductDetailImagesProps {
  images: string[];
  product: any;
}

const ProductDetailImages = ({images, product}: ProductDetailImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  return (
    <div>
          {/* Main Image */}
          <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={images[selectedImage].url}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </AnimatePresence>

            {/* Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImage((p) =>
                      p === 0 ? images.length - 1 : p - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2"
                >
                  <ChevronLeft />
                </button>

                <button
                  onClick={() =>
                    setSelectedImage((p) => (p + 1) % images.length)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-[3/4] overflow-hidden border ${
                    selectedImage === i
                      ? "border-black"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img.url}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
  )
}

export default ProductDetailImages