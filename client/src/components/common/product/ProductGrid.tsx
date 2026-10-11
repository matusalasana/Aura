import ProductCard from "@/components/common/product/ProductCard";
import type { Product } from "@/types/product";

interface Props {
  products: Product[];
}

const ProductGrid = ({products}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.slice(0, 8).map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid