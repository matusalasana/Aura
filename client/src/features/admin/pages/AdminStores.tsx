
import { useDeleteStore } from "@/features/admin/hooks/useDeleteStore";
import { useStores } from "@/features/stores/hooks/useStores";
import { Button } from "@/components/ui/button";

const AdminStores = () => {
  const { data: stores, isLoading, isError } = useStores();
  const { mutate: deleteStore, isPending } = useDeleteStore();

  if (isLoading) return <p>Loading stores...</p>;
  if (isError) return <p>Failed to load stores.</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Stores</h1>

      {stores?.map((store) => (
        <div
          key={store.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div>
            <p className="font-medium">{store.name}</p>
            <p className="text-sm text-muted-foreground">{store.slug}</p>
          </div>

          <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={() => {
              if (confirm(`Delete ${store.name}?`)) {
                deleteStore(store.id);
              }
            }}
          >
            Delete
          </Button>
        </div>
      ))}

      {!stores?.length && <p>No stores found.</p>}
    </div>
  );
};

export default AdminStores;
