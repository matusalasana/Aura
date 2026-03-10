import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

function Home() {
  const { data: products, isLoading, error } = useProducts();

  // Skeleton Loader for a "Shimmer" effect while loading
  if (isLoading) {
    return (
      <div className="pt-20 bg-[#f8f8f8] min-h-screen p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-80 rounded-2xl w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="p-10 text-center text-red-500">Error loading products.</div>;

  return (
    <div className="pt-20 bg-[#f8f8f8] min-h-screen p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Our Collection</h2>
          <p className="text-gray-500 mt-1">Discover the latest trends in {new Date().getFullYear()} fashion.</p>
        </header>
        
        {/* The Grid: 2 columns for mobile, 4 for desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard 
              key={product._id} // Using _id from your data
              _id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              category={product.category}
              subCategory={product.subCategory}
              sizes={product.sizes}
              date={product.date}
              bestseller={product.bestseller}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
