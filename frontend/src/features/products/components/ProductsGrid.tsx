import ProductCard from "./ProductCard";
import { useAddToCart } from "../../cart/hooks/useAddToCart";
import { useState} from "react"
import { Product } from "../types"

type ProductsGridProps = {
  products?: Product[];
  isLoading: boolean;
};

const ProductsGrid = ({
  products,
  isLoading,
}: ProductsGridProps) => {
  
  const { mutate: addToCart, isPending } = useAddToCart();
  const handleAddToCart = (id: string) => {
    addToCart({
      productId: id,
      quantity: 1
    });
  }
  const [addingProductId, setAddingProductId] = useState<string| null>(null)
  const handleIsAdding = (id: string) =>{
    setAddingProductId(id)
  }
  
  // LOADING STATE
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white"></div>
      </div>
    );
  }

  // EMPTY STATE
  if (!products || products.length === 0){
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        No products found.
      </div>
    );
  }

  // GRID
  return (
    <div className="grid grid-cols-2 gap-3 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;