
import { useMyStore } from "@/features/stores/hooks/useMyStore";
import DashboardStats from "@/dashboard/store/components/DashboardStats";
import SalesOverview from "@/dashboard/store/components/SalesOverview";
import RecentOrders from "@/dashboard/store/components/RecentOrders";
import LowStockProducts from "@/dashboard/store/components/LowStockProducts";
import ProductForm from "@/features/products/components/forms/ProductForm";

const StoreDashboard = () => {
  const {
    data: myStore,
    isLoading,
    isError,
  } = useMyStore();

  if (isLoading) {
    return (
      <main className="p-6" role="status">
        Loading your dashboard...
      </main>
    );
  }

  if (isError || !myStore) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">
          Store unavailable
        </h1>
        <p className="mt-2 text-muted-foreground">
          We couldn't load your store. Make sure you have created a store
          and try again.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background font-sans text-foreground antialiased">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <section aria-label="Store overview">
          <h1 className="mb-4 text-2xl font-bold">
            {myStore.name} Dashboard
          </h1>

          <DashboardStats
            products={myStore.products ?? []}
            customers={[]}
            orders={myStore.orders ?? []}
          />
        </section>

        <section aria-label="Sales analytics">
          <SalesOverview />
        </section>

        <section
          aria-label="Orders and inventory"
          className="grid grid-cols-1 gap-6 xl:grid-cols-2"
        >
          <RecentOrders />
          <LowStockProducts />
        </section>
      </div>
    </main>
  );
};

export default StoreDashboard;
