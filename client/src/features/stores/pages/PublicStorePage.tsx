import { useParams } from "react-router-dom";
import { useStore } from "@/features/stores/hooks/useStore";

export default function PublicStorePage() {
const { slug = "" } = useParams();
const { data: store, isLoading, isError } = useStore(slug);

if (isLoading) {
return <main className="p-6">Loading store...</main>;
}

if (isError || !store) {
return <main className="p-6">Store not found.</main>;
}

return (
<main className="mx-auto max-w-6xl p-6 bg-background">
{store.logo && (
<img
src={store.logo}
alt={"${store.storeName} logo"}
className="mb-4 h-20 w-20 rounded-lg object-cover"
/>
)}

  <h1 className="text-3xl font-bold">{store.storeName}</h1>

  {store.description && (
    <p className="mt-2 text-muted-foreground">
      {store.description}
    </p>
  )}
</main>

);
}