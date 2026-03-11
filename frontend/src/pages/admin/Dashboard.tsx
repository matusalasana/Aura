import { useAdmin } from "../../hooks/useAdmin";
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { stats, loading } = useAdmin();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
      link: "/admin/products",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "bg-green-500",
      link: "/admin/orders",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-purple-500",
      link: "/admin/orders",
    },
    {
      title: "Growth",
      value: "2.4%",
      icon: TrendingUp,
      color: "bg-amber-500",
      link: "/admin/analytics",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tighter">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back to your store overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase">
                {stat.title}
              </span>
            </div>

            <p className="text-3xl font-black">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Recent Orders</h2>

        {stats.recentOrders.length > 0 ? (
          <div className="space-y-4">
            {stats.recentOrders.map((order: any) => (
              <div
                key={order.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="text-sm font-bold">
                    #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                    {order.status}
                  </span>

                  <span className="font-bold">
                    ${order.total_amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">
            No orders yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;