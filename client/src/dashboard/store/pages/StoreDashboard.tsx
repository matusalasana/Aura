import DashboardStats from "@/dashboard/store/components/DashboardStats";
import SalesOverview from "@/dashboard/store/components/SalesOverview";
import RecentOrders from "@/dashboard/store/components/RecentOrders";
import LowStockProducts from "@/dashboard/store/components/LowStockProducts";

const StoreDashboard = () => {
  return (
    <div className="min-h-screen bg-foreground text-foreground font-sans antialiased px-5 space-y-4">
      
      <DashboardStats />
      <SalesOverview />
      <RecentOrders />
      <LowStockProducts />
      
    </div>
  )
}

export default StoreDashboard