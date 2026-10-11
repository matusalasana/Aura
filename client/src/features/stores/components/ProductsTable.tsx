import { MoreHorizontal, Package, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const formatPrice = (price: string | number | null | undefined) => {
  if (price === null || price === undefined || price === "") return "—";

  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(Number(price));
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "active":
      return "default" as const;
    case "draft":
      return "secondary" as const;
    case "archived":
      return "outline" as const;
    default:
      return "secondary" as const;
  }
};

const ProductsTable = () => {
  const navigate = useNavigate();
  
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useProducts();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="space-y-4 p-4 sm:p-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse items-center gap-4"
            >
              <div className="size-12 shrink-0 rounded-lg bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 rounded bg-muted" />
                <div className="h-3 w-1/4 rounded bg-muted" />
              </div>
              <div className="hidden h-4 w-20 rounded bg-muted sm:block" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <Package className="mb-3 size-10 text-muted-foreground" />
          <h3 className="font-semibold">Couldn't load products</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Check your connection and try again.
          </p>
          <Button
            variant="outline"
            className="mt-4 gap-2"
            onClick={() => refetch()}
          >
            <RefreshCw className="size-4" />
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!products.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Package className="size-7" />
          </div>
          <h3 className="font-semibold">No products yet</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Your product listings will appear here once you add your first
            product.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr className="text-left text-muted-foreground">
                <th scope="col" className="px-5 py-3.5 font-medium sm:px-6">
                  Product
                </th>
                <th scope="col" className="px-5 py-3.5 font-medium">
                  Type
                </th>
                <th scope="col" className="px-5 py-3.5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-5 py-3.5 font-medium">
                  Stock
                </th>
                <th scope="col" className="px-5 py-3.5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-4 py-3.5">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {products.map((product) => {
                const imageUrl = product.images?.[0]?.url;

                return (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/40">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt=""
                              loading="lazy"
                              className="size-full object-cover"
                            />
                          ) : (
                            <Package className="size-5 text-muted-foreground" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-[240px] truncate font-medium text-foreground">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            SKU: {product.sku || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="capitalize text-muted-foreground">
                        {product.type === "variant" ? "Variants" : "Simple"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-medium tabular-nums">
                      {formatPrice(product.price)}
                    </td>

                    <td className="px-5 py-4 tabular-nums">
                      {product.type === "variant"
                        ? "Multiple variants"
                        : (product.stock ?? 0).toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <Badge variant={getStatusVariant(product.status)}>
                        {product.status}
                      </Badge>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`Actions for ${product.name}`}
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={() => navigate(`/products/${product.id}`)}
                          >
                            View
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onSelect={() =>
                              navigate(
                                `/products/${product.id}/edit`,
                              )
                            }
                          >
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            disabled
                            title="Connect this action to your archive mutation"
                          >
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="border-t border-border px-5 py-3 sm:px-6">
          <p className="text-xs text-muted-foreground">
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            total
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsTable;