import { useStores } from "@/features/stores/hooks/useStores";
import StoreGrid from "@/features/stores/components/StoreGrid";

export default function PublicStoresPage() {
  const { data: stores = [], isLoading, isError } = useStores();
  
  if (isLoading) {
    return <main className="p-6">Loading stores...</main>;
  }
  
  if (isError || !stores.length) {
    return <main className="p-6">Store not found.</main>;
  }

  return (
    <main className="mx-auto max-w-6xl p-6 bg-background">
      <StoreGrid stores={stores} />
    </main>
  
  );
}