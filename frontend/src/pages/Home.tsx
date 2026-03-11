import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

function Home() {
  const { data: products, isLoading, error } = useProducts();

  console.log('Home page - products:', products);
  console.log('Home page - error:', error);

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

  if (error) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading products: {error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-[#f8f8f8] min-h-screen p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Our Collection</h2>
          <p className="text-gray-500 mt-1">Discover the latest trends in {new Date().getFullYear()} fashion.</p>
        </header>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product._id}
              _id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image || []}
              category={product.category}
              subCategory={product.subCategory}
              sizes={product.sizes || []}
              date={product.date || Date.now()}
              bestseller={product.bestseller || false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;