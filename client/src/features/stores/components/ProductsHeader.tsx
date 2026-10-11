import { useState } from "react";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductModal from "@/features/products/components/forms/ProductModal";

const ProductsHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Products
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your store's products, inventory, and listings.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full gap-2 sm:w-auto"
        >
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-sm">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            className="h-10 pl-9"
          />
        </div>
      </div>

      <ProductModal open={isOpen} onOpenChange={setIsOpen} />
    </section>
  );
};

export default ProductsHeader;