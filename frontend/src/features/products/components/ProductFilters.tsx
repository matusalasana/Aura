import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../../home/hooks/useCategories";
import { useAddToCart } from "../../cart/hooks/useAddToCart";
import ProductsGrid from "../components/ProductsGrid";
import ProductFilters, { Filters } from "../components/ProductFilters";
import ProductSort from "../components/ProductSort";
import Title from "../../../shared/ui/Title";

interface Product {
  id: string;
  category_id: string;
  price: number;
  name: string;
}

const Collections = () => {
  const { data: products = [], isLoading: productsLoading, isError: productsError } = useProducts();
  const { data: categories = [], isLoading: catsLoading, isError: catsError } = useCategories();
  
  const { mutate: addToCart, isPending } = useAddToCart(); 

  // Hosting array state for active filters
  const [activeFilters, setActiveFilters] = useState<Filters>({
    category_ids: [],
    minPrice: "",
    maxPrice: "",
  });

  // Client-side Multi-Category Filtering Logic
  const filteredProducts = products.filter((product: Product) => {
    // Multi-category match: if categories are selected, check if product belongs to any of them
    if (
      activeFilters.category_ids.length > 0 && 
      !activeFilters.category_ids.includes(product.category_id)
    ) {
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
          products={filteredProducts}
          isAdding={isPending}
        />
      )}
    </div>
  );
};

export default Collections;