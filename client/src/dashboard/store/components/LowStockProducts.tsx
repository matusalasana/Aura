import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const products = [
  {
    name: "React T-Shirt",
    sku: "TSH-001",
    stock: 3,
  },
  {
    name: "Aura Hoodie",
    sku: "HOD-014",
    stock: 5,
  },
  {
    name: "Classic Sneakers",
    sku: "SNK-021",
    stock: 2,
  },
  {
    name: "Canvas Backpack",
    sku: "BAG-008",
    stock: 4,
  },
];

const LowStockProducts = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Low Stock</CardTitle>
          <CardDescription>
            Products that need restocking.
          </CardDescription>
        </div>

        <AlertTriangle className="h-5 w-5 text-warning" />
      </CardHeader>

      <CardContent className="space-y-4">
        {products.map((product) => (
          <div
            key={product.sku}
            className="flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {product.name}
              </p>

              <p className="text-xs text-muted-foreground">
                SKU: {product.sku}
              </p>
            </div>

            <Badge variant="outline" className="shrink-0">
              {product.stock} left
            </Badge>
          </div>
        ))}

        <Button variant="outline" className="w-full" onClick={() => navigate("/stores")}>
          View all
        </Button>
      </CardContent>
    </Card>
  );
};

export default LowStockProducts;