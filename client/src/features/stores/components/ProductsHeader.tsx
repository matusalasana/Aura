import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductModal from '@/features/products/components/forms/ProductModal';

const ProductsHeader = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  
  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Products
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage the products in your store.
          </p>
        </div>

        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>

        <ProductModal open={isOpen} onOpenChange={setIsOpen} />
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search products..."
          className="pl-9"
        />
      </div>
    </div>
  );
};

export default ProductsHeader;