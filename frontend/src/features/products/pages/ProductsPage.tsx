import { useProducts } from "../hooks/useProducts";

const ProductsPage = () => {
  const { data: products, isLoading, error } = useProducts();
  
  if(isLoading){
    return <p>Loading...</p>
  };
  
  if(error){
    const err = err.message || "Error fetching products"
    return <p>{err}</p>
  };
  
  return (
    <div>
    
      {products.map((p) =>(
        <>
        <p>{p.name}</p>
        </>
      ))}
    
    </div>
  );
};

export default ProductsPage