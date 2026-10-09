import { Link } from "react-router-dom";
import { MoreVertical, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ImageType = {
  url: string;
  productId: string;
};

export type Product = {
  id: string;
  storeId: string;
  images: ImageType[];
  name: string;
  description: string;
  status: "active" | "draft" | "archived";
  type: "simple" | "variant";
  price: string;
  stock: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
};

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
const formattedPrice = Number(product.price).toLocaleString("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const isSimpleAvailable = product.status === "active" && product.stock > 0 && product.type === "simple";
  
const isVariantAvailable = product.type === "variant" && product.variants?.filter(p => p.stock>0).length

const image = product.images?.[0]?.url;
const isAvailable = isSimpleAvailable || isVariantAvailable

return (
    <Card className="group overflow-hidden rounded-xl border bg-background shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <Link
        to={`products/${product.id}`}
        className="relative block overflow-hidden bg-muted"
      >
        <div className="aspect-square">
          <img
            src={image || "https://placehold.co/600x600?text=No+Image"}
            alt={product.name}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
  
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
            isAvailable
              ? "bg-background text-foreground"
              : "bg-destructive text-white"
          }`}
        >
          {isAvailable ? "In stock" : "Out of Stock"}
        </span>
      </Link>
      
      <CardContent className="p-4">
        {/* Product details */}
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/products/${product.id}`}
            className="min-w-0 flex-1"
          >
            <h3 className="truncate text-base font-medium tracking-tight hover:underline">
              {product.name}
            </h3>
    
            <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
              {product.description || "No description available."}
            </p>
          </Link>
    
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            aria-label="More product options"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
    
        {/* Price */}
        <div className="mt-4">
          <p className="text-xl font-semibold tracking-tight">
            {formattedPrice}
          </p>
        </div>
    
        {/* Add to cart */}
        <Button
          type="button"
          className="mt-4 w-full gap-2"
          disabled={!isAvailable}
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart className="h-4 w-4" />
          {isAvailable ? "Add to cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  );
};