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
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-base-content/60">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          category={p.category_name}
          name={p.name}
          description={p.description}
          price={p.price}
          stock={p.stock_quantity}
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