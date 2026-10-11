import DashboardStats from "@/dashboard/store/components/DashboardStats";
import SalesOverview from "@/dashboard/store/components/SalesOverview";
import RecentOrders from "@/dashboard/store/components/RecentOrders";
import LowStockProducts from "@/dashboard/store/components/LowStockProducts";

const StoreDashboard = () => {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground antialiased">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Overview */}
        <section aria-label="Store overview">
          <DashboardStats />
        </section>

        {/* Sales analytics */}
        <section aria-label="Sales analytics">
          <SalesOverview />
        </section>

        {/* Orders and inventory */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <RecentOrders />
          <LowStockProducts />
        </section>
      </div>
    </main>
  );
};

export default StoreDashboard;