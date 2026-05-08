import { useProducts } from "../hooks/useProducts";
import { useAddToCart } from "../../cart/hooks/useAddToCart";
import ProductsGrid from "../components/ProductsGrid"

const Collections = () => {
  const { data: products, isLoading, isError } = useProducts();
  const { mutate: addToCart, isPending } = useProducts();
  
  const handleAddToCart = (id: string) => {
    useAddToCart(id);
  }
  if(isLoading){
    return<p>Loading products...</p>;
  }
  if(isError){
    return<p>Something went wrong</p>;
  }
  if(products.length===0){
    return<p>No products available</p>
  }
  
  return (
    <div>
      <ProductsGrid
        isLoading={isLoading}
        products={products}
        isAdding={isPending}
      />
    </div>
  )
}

export default Collections;