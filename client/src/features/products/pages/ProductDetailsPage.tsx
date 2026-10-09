import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "@/features/products/hooks/useProduct";
import QuantitySelector from "@/features/products/components/QuantitySelector";
import AddToCartButton from "@/features/products/components/AddToCartButton";
import { useCartStore } from "@/features/cart/store/cartStore";
import type { ProductVariant } from "@/types/product";

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data: product, isLoading, isError } = useProduct(productId!);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState<string>("");
  
  useEffect(() => {
    if (
      product?.type === "variant" &&
      product.variants?.length &&
      !selectedVariantId
    ) {
      setSelectedVariantId(product.variants[0].id ?? null);
    }
  }, [product, selectedVariantId]);

  useEffect(() => {
    if (product?.images?.length && !selectedImage) {
      setSelectedImage(product.images[0].url);
    }
  }, [product, selectedImage]);
  
  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return <div className="mx-auto max-w-7xl p-6">Loading...</div>;
  }

  if (isError || !product) {
    return <div className="mx-auto max-w-7xl p-6">Product not found.</div>;
  }

  const isVariantProduct = product.type === "variant";

  const selectedVariant = product.variants?.find(
    (variant) => variant.id === selectedVariantId,
  );

  const price = isVariantProduct
    ? selectedVariant?.price
    : product.price;

  const stock = isVariantProduct
    ? selectedVariant?.stock ?? 0
    : product.stock ?? 0;

  const sku = isVariantProduct
    ? selectedVariant?.sku
    : product.sku;

  const hasSelectedVariant = !isVariantProduct || !!selectedVariant;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[80px_minmax(0,1.2fr)_minmax(0,1fr)]">
  
        {/* Column 1: Thumbnail images */}
        <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
          {product.images?.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedImage(image.url)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border ${
                selectedImage === image.url
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
              }`}
            >
              <img
                src={image.url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
  
        {/* Column 2: Main product image */}
        <div className="order-1 aspect-square min-w-0 overflow-hidden rounded-xl bg-gray-50 md:order-2">
          {selectedImage || product.images?.[0]?.url ? (
            <img
              src={selectedImage || product.images?.[0]?.url}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          ) : (
            <img
              src={"https://placehold.co/600x400?text=No+Image"}
              alt={"product image placeholder"}
              className="h-full w-full object-contain"
            />
          )}
        </div>
  
        {/* Column 3: Product details */}
        <div className="order-3 flex min-w-0 flex-col justify-center">
          <p className="text-sm capitalize text-muted-foreground">
            {product.type} product
          </p>
  
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {product.name}
          </h1>
  
          <p className="mt-4 text-2xl font-semibold">
            {price !== undefined && price !== null
              ? `$${price}`
              : "Select a variant"}
          </p>
  
          <p className="mt-6 leading-7 text-muted-foreground">
            {product.description}
          </p>
  
          {/* Variants */}
          {isVariantProduct && (product.variants?.length ?? 0) > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-sm font-medium">
                Select variant
              </p>
  
              <div className="flex flex-wrap gap-2">
                {product.variants?.map((variant: ProductVariant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => {
                      setSelectedVariantId(variant.id ?? null);
                      setQuantity(1);
                    }}
                    disabled={variant.stock <= 0}
                    className={`rounded-lg border px-4 py-2 text-sm transition ${
                      selectedVariantId === variant.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-muted"
                    } ${
                      variant.stock <= 0
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                  </button>
                ))}
              </div>
            </div>
          )}
  
          {/* Product details */}
          <div className="mt-6 space-y-2 text-sm">
            <p>
              <span className="font-medium">SKU:</span>{" "}
              {sku || "N/A"}
            </p>
  
            <p>
              <span className="font-medium">Stock:</span>{" "}
              {!hasSelectedVariant
                ? "Select a variant"
                : stock > 0
                  ? `${stock} available`
                  : "Out of stock"}
            </p>
          </div>
  
          {/* Cart */}
          {hasSelectedVariant && stock > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">Quantity</p>
  
              <QuantitySelector
                quantity={quantity}
                max={stock}
                onChange={setQuantity}
              />
  
              <AddToCartButton
                onClick={() => {
                  addItem({
                    productId: product.id,
                    variantId: selectedVariant?.id,
                    name: product.name,
                    price: String(price!),
                    quantity,
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;