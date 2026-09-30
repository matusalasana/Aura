import ProductsHeader from "@/features/stores/components/ProductsHeader";
import ProductsTable from "@/features/stores/components/ProductsTable";

const ProductsPage = () => {
  return (
    <div className="space-y-6">
      <ProductsHeader />
      
      <ProductsTable />
    </div>
  );
};

export default ProductsPage;