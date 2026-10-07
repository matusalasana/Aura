import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type Product = {
  id: string;
  storeId: string;
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
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = Number(product.price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Card className="overflow-hidden">
      <Link to={`/products/${product.id}`}>
        {/* Product image placeholder */}
        <div className="container h-44 items-center justify-center bg-muted">
          <img src="https://images.unsplash.com/photo-1612654442146-84f661a0bc25?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="product image" />
        </div>
      </Link>

      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">
              {product.name}
            </h3>

            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>

          <Button variant="ghost" size="icon" className="shrink-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Price */}
        <div className="mt-4">
          <span className="text-xl font-bold">
            {formattedPrice}
          </span>
        </div>

        {/* Product information */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Stock</p>
            <p className="font-medium">{product.stock}</p>
          </div>

          <div>
            <p className="text-muted-foreground">SKU</p>
            <p className="truncate font-medium">{product.sku}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Type</p>
            <p className="capitalize font-medium">{product.type}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Status</p>
            <p className="capitalize font-medium">{product.status}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}