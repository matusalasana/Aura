import { Link } from "react-router-dom";
import { MoreVertical, ImageOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/features/products/components/AddToCartButton";
import { useCartStore } from "@/features/cart/store/cartStore";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const isVariantProduct = product.type === "variant";
  const selectedVariant = isVariantProduct
    ? product.variants?.find((variant) => variant.stock > 0)
    : undefined;

  const price = isVariantProduct
    ? selectedVariant?.price ?? product.price
    : product.price;

  const formattedPrice = Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const isAvailable =
    product.status === "active" &&
    (isVariantProduct
      ? !!selectedVariant
      : product.type === "simple" && product.stock > 0);

  const image = product.images?.[0]?.url;

  return (
    <Card className="group overflow-hidden border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Product Image */}
      <Link
        to={`/products/${product.id}`}
        className="relative block overflow-hidden bg-muted"
      >
        <div className="aspect-square">
          {image ? (
            <img
              src={image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageOff className="h-10 w-10" />
              <span className="text-sm">No image available</span>
            </div>
          )}
        </div>

        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
            isAvailable
              ? "bg-background/90 text-foreground"
              : "bg-destructive text-destructive-foreground"
          }`}
        >
          {isAvailable ? "In stock" : "Out of stock"}
        </span>
      </Link>

      <CardContent className="p-4">
        {/* Product Details */}
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/products/${product.id}`}
            className="min-w-0 flex-1"
          >
            <h3 className="truncate text-base font-medium tracking-tight text-card-foreground transition-colors hover:text-primary">
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
            className="h-8 w-8 shrink-0 text-muted-foreground"
            aria-label="More product options"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Price */}
        <div className="mt-4">
          <p className="text-xl font-semibold tracking-tight text-card-foreground">
            {formattedPrice}
          </p>
        </div>

        {/* Add to Cart */}
        <AddToCartButton
          disabled={!isAvailable}
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              price: String(price),
              quantity: 1,
            })
          }
        />
      </CardContent>
    </Card>
  );
}