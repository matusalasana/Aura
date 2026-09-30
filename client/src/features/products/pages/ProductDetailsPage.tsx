import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "@/features/products/hooks/useProduct";
import QuantitySelector from "@/features/products/components/QuantitySelector";
import AddToCartButton from "@/features/products/components/AddToCartButton";

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data: product, isLoading, isError } = useProduct(productId!);

  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return <div className="mx-auto max-w-7xl p-6">Loading...</div>;
  }

  if (isError || !product) {
    return <div className="mx-auto max-w-7xl p-6">Product not found.</div>;
  }

  return (
  <div className="mx-auto max-w-7xl p-6">
    <div className="grid gap-8 md:grid-cols-2">
      {/* Product Image */}
      <div className="object-cover rounded-xl bg-muted">
        <img src="https://images.unsplash.com/photo-1612654442146-84f661a0bc25?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3" alt="product image" />
      </div>

      {/* Product Information */}
      <div className="flex flex-col justify-center">
        <p className="text-sm capitalize text-muted-foreground">
          {product.type} product
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {product.name}
        </h1>

        <p className="mt-4 text-2xl font-semibold">
          ${product.price}
        </p>

        <p className="mt-6 leading-7 text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-6 space-y-2 text-sm">
          <p>
            <span className="font-medium">SKU:</span>{" "}
            {product.sku || "N/A"}
          </p>

          <p>
            <span className="font-medium">Stock:</span>{" "}
            {product.stock > 0
              ? `${product.stock} available`
              : "Out of stock"}
          </p>
          {product.stock > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">Quantity</p>
          
              <QuantitySelector
                quantity={quantity}
                max={product.stock}
                onChange={setQuantity}
              />

              <AddToCartButton
                onClick={() => {
                  console.log("Add to cart:", {
                    productId: product.id,
                    quantity,
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default ProductDetailsPage;