import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "@/features/products/hooks/useProduct";
import QuantitySelector from "@/features/products/components/QuantitySelector";
import AddToCartButton from "@/features/products/components/AddToCartButton";
import { useCartStore } from "@/features/cart/store/cartStore";

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data: product, isLoading, isError } = useProduct(productId!);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  
  useEffect(() => {
    if (
      product?.type === "variant" &&
      product.variants?.length &&
      !selectedVariantId
    ) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product, selectedVariantId]);
  
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
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="overflow-hidden rounded-xl bg-muted">
          <img
            src="https://images.unsplash.com/photo-1612654442146-84f661a0bc25?q=80&w=1227&auto=format&fit=crop"
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">
          <p className="text-sm capitalize text-muted-foreground">
            {product.type} product
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {product.name}
          </h1>

          {/* Price */}
          <p className="mt-4 text-2xl font-semibold">
            {price !== undefined && price !== null
              ? `$${price}`
              : "Select a variant"}
          </p>

          <p className="mt-6 leading-7 text-muted-foreground">
            {product.description}
          </p>

          {/* Variants */}
          {isVariantProduct && product.variants?.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-sm font-medium">
                Select variant
              </p>

              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => {
                      setSelectedVariantId(variant.id);
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
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Details */}
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
              <p className="mb-2 text-sm font-medium">
                Quantity
              </p>

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
                    price: price!,
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