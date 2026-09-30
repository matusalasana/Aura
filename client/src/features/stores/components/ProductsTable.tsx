import { MoreHorizontal, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useProducts } from "@/features/products/hooks/useProducts";

const ProductsTable = () => {
  const { data: products = [], isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Loading products...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-destructive">
            Failed to load products.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!products.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="mb-3 h-10 w-10 text-muted-foreground" />

          <h3 className="font-semibold">No products yet</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Add your first product to start selling.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left">
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{product.name}</p>

                      <p className="text-xs text-muted-foreground">
                        SKU: {product.sku || "—"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {product.type}
                  </td>

                  <td className="px-6 py-4">
                    ${product.price}
                  </td>

                  <td className="px-6 py-4">
                    {product.type === "variant"
                      ? "—"
                      : product.stock}
                  </td>

                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        product.status === "active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {product.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          View
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsTable;