import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../../home/hooks/useCategories";
import { useAddToCart } from "../../cart/hooks/useAddToCart";
import ProductsGrid from "../components/ProductsGrid";
import ProductFilters, { Filters } from "../components/ProductFilters";
import ProductSort from "../components/ProductSort";
import Title from "../../../shared/ui/Title";

// Define a matching interface for your products local data
interface Product {
  id: string;
  category_id: string;
  price: number;
  name: string;
}

const Collections = () => {
  // 1. Fetching Data
  const { data: products = [], isLoading: productsLoading, isError: productsError } = useProducts();
  const { data: categories = [], isLoading: catsLoading, isError: catsError } = useCategories();
  
  // Correcting useAddToCart (Hook called at root level now)
  const { mutate: addToCart, isPending } = useAddToCart(); 

  // 2. Hosting State for Active Applied Filters
  const [activeFilters, setActiveFilters] = useState<Filters>({
    category_id: "",
    minPrice: "",
    maxPrice: "",
  });

  // 3. Frontend Client-side Filtering Logic
  const filteredProducts = products.filter((product: Product) => {
    // Category match check
    if (activeFilters.category_id && product.category_id !== activeFilters.category_id) {
      return false;
    }
    // Min Price check
    if (activeFilters.minPrice && product.price < parseFloat(activeFilters.minPrice)) {
      return false;
    }
    // Max Price check
    if (activeFilters.maxPrice && product.price > parseFloat(activeFilters.maxPrice)) {
      return false;
    }
    return true;
  });

  const handleAddToCart = (id: string) => {
    addToCart(id);
  };

  if (productsLoading || catsLoading) {
    return <p>Loading products...</p>;
  }

  if (productsError || catsError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <Title txt1="YOUR" txt2="COLLECTIONS" />
      
      {/* Passing data props and the state trigger function */}
      <ProductFilters 
        categories={categories} 
        onApplyFilters={setActiveFilters} 
      />
      
      <ProductSort />
      
      {filteredProducts.length === 0 ? (
        <p className="mt-4 text-gray-500">No products match your filters.</p>
      ) : (
        <ProductsGrid
          isLoading={productsLoading}
          products={filteredProducts} // passing the locally filtered list
          isAdding={isPending}
        />
      )}
    </div>
  );
};

export default Collections;
