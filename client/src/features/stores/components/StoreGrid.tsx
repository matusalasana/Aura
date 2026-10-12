import StoreCard from "@/features/stores/components/StoreCard";
import type { Store } from "@/types/store";

interface Props {
  stores: Store[];
}

const StoreGrid = ({stores}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {stores.slice(0, 8).map((store: Store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  )
}

export default StoreGrid