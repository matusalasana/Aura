import ProductCard from "./ProductCard";

type Product = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating_count: number;
  rating: number;
  image: string;
};

type ProductsGridProps = {
  products?: Product[];
  isLoading: boolean;
};

const ProductsGrid = ({
  products = [],
  isLoading,
}: ProductsGridProps) => {
  // LOADING STATE
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white"></div>
      </div>
    );
  }

  // EMPTY STATE
  if (!products.length) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        No products found.
      </div>
    );
  }

  // GRID
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          category={p.category_name}
          name={p.name}
          description={p.description}
          price={p.price}
          stock={p.stock_quantitl}
          rating_count={p.rating_count}
          rating={p.average_rating}
          image={"https://bxxwonszqwilodfqvjbv.supabase.co/storage/v1/object/public/product-images/New-Arrival-High-Quality-Male-Jacket.jpeg"}
          onClickWishlist={() => alert(`${p.name} added to wishlist`)}
          onClickAddToCart={() => alert(`${p.name} added to cart`)}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;