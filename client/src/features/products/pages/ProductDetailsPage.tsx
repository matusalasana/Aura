import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AlertCircle,
  Check,
  Image as ImageIcon,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProduct } from "@/features/products/hooks/useProduct";
import QuantitySelector from "@/features/products/components/QuantitySelector";
import AddToCartButton from "@/features/products/components/AddToCartButton";
import { useCartStore } from "@/features/cart/store/cartStore";
import type { ProductVariant } from "@/types/product";

const formatPrice = (price: string | number) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(Number(price));

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading, isError } = useProduct(productId!);
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!product) return;

    const firstAvailableVariant = product.variants?.find(
      (variant) => variant.stock > 0,
    );

    setSelectedVariantId(
      product.type === "variant"
        ? firstAvailableVariant?.id ?? product.variants?.[0]?.id ?? null
        : null,
    );

    setSelectedImage(product.images?.[0]?.url ?? "");
    setQuantity(1);
  }, [product]);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl p-4 sm:p-6">
        <div className="grid animate-pulse gap-8 md:grid-cols-2">
          <div className="aspect-square rounded-2xl bg-muted" />
          <div className="space-y-5 py-4">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-9 w-3/4 rounded bg-muted" />
            <div className="h-7 w-36 rounded bg-muted" />
            <div className="h-20 rounded bg-muted" />
            <div className="h-12 rounded bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="size-7" />
          </div>
          <h1 className="text-xl font-semibold">Product not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This product may have been removed or is temporarily unavailable.
          </p>
        </div>
      </main>
    );
  }

  const isVariantProduct = product.type === "variant";
  const images = product.images ?? [];
  const selectedVariant = product.variants?.find(
    (variant) => variant.id === selectedVariantId,
  );

  const price = isVariantProduct ? selectedVariant?.price : product.price;
  const stock = isVariantProduct
    ? selectedVariant?.stock ?? 0
    : product.stock ?? 0;
  const sku = isVariantProduct ? selectedVariant?.sku : product.sku;

  const hasSelectedVariant = !isVariantProduct || !!selectedVariant;
  const canAddToCart =
    hasSelectedVariant &&
    stock > 0 &&
    price !== undefined &&
    price !== null &&
    Number.isFinite(Number(price));

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      name: product.name,
      price: String(price),
      quantity,
    });
  };

  return (
    <main className="bg-background mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
        {/* Product gallery */}
        <section className="min-w-0 space-y-3">
          <div className="overflow-hidden rounded-2xl border border-border bg-muted/30">
            <div className="flex aspect-square items-center justify-center">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="size-full object-contain p-3 sm:p-6"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <ImageIcon className="size-12" />
                  <p className="text-sm">No product image available</p>
                </div>
              )}
            </div>
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((image, index) => {
                const isSelected = selectedImage === image.url;

                return (
                  <button
                    key={image.id}
                    type="button"
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedImage(image.url)}
                    className={`size-16 shrink-0 overflow-hidden rounded-lg border bg-background transition-colors sm:size-20 ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name}, image ${index + 1}`}
                      className="size-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Product information */}
        <section className="min-w-0 lg:sticky lg:top-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
              {isVariantProduct ? "Multiple variants" : "Standard product"}
            </span>

            {stock > 0 && hasSelectedVariant && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                In stock
              </span>
            )}
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4">
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {price !== undefined && price !== null
                ? formatPrice(price)
                : "Select a variant"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Price in Ethiopian birr (ETB)
            </p>
          </div>

          {product.description && (
            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-muted-foreground">
              {product.description}
            </p>
          )}

          {/* Variant selection */}
          {isVariantProduct && (
            <div className="mt-7 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold">Choose a variant</h2>
                {selectedVariant && (
                  <span className="text-xs text-muted-foreground">
                    {selectedVariant.color} / {selectedVariant.size}
                  </span>
                )}
              </div>

              {(product.variants?.length ?? 0) > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.variants?.map((variant: ProductVariant) => {
                    const isSelected = selectedVariantId === variant.id;
                    const isOutOfStock = variant.stock <= 0;

                    return (
                      <button
                        key={variant.id}
                        type="button"
                        disabled={isOutOfStock}
                        aria-pressed={isSelected}
                        onClick={() => {
                          setSelectedVariantId(variant.id ?? null);
                          setQuantity(1);
                        }}
                        className={`flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background hover:border-primary/50"
                        } ${
                          isOutOfStock
                            ? "cursor-not-allowed opacity-40"
                            : ""
                        }`}
                      >
                        <span>
                          {[variant.color, variant.size]
                            .filter(Boolean)
                            .join(" / ") || variant.sku || "Option"}
                        </span>

                        {isSelected && <Check className="size-4" />}
                        {isOutOfStock && (
                          <span className="text-xs">Sold out</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                  No variants are currently available.
                </p>
              )}
            </div>
          )}

          {/* SKU and availability */}
          <div className="mt-7 space-y-3 border-y border-border py-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="text-muted-foreground">SKU</span>
              <span className="break-all text-right font-medium">
                {sku || "Not available"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Availability</span>
              <span
                className={`font-medium ${
                  !hasSelectedVariant || stock <= 0
                    ? "text-destructive"
                    : "text-foreground"
                }`}
              >
                {!hasSelectedVariant
                  ? "Select a variant"
                  : stock > 0
                    ? `${stock.toLocaleString()} available`
                    : "Out of stock"}
              </span>
            </div>
          </div>

          {/* Purchase controls */}
          <div className="mt-6 space-y-4">
            {canAddToCart ? (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Quantity</p>
                  <QuantitySelector
                    quantity={quantity}
                    max={stock}
                    onChange={setQuantity}
                  />
                </div>

                <AddToCartButton onClick={handleAddToCart} />
              </>
            ) : (
              <Button type="button" size="lg" className="w-full" disabled>
                <ShoppingBag className="size-4" />
                {!hasSelectedVariant
                  ? "Select a variant"
                  : stock <= 0
                    ? "Out of Stock"
                    : "Price Unavailable"}
              </Button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;