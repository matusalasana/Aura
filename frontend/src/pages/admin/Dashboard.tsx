import { useAdmin } from "../../hooks/useAdmin";
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Loader2,
  ArrowUpRight,
  Clock,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { stats, loading } = useAdmin();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-slate-900" />
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Syncing Data...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      gradient: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-100",
      link: "/admin/products",
    },
    {
      title: "Orders to Date",
      value: stats.totalOrders,
      icon: ShoppingBag,
      gradient: "from-emerald-400 to-teal-600",
      shadow: "shadow-emerald-100",
      link: "/admin/orders",
    },
    {
      title: "Gross Revenue",
      value: `$${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      gradient: "from-slate-800 to-slate-950",
      shadow: "shadow-slate-200",
      link: "/admin/orders",
    },
    {
      title: "Market Growth",
      value: "+12.4%", // Example static growth
      icon: TrendingUp,
      gradient: "from-rose-400 to-orange-500",
      shadow: "shadow-rose-100",
      link: "/admin/analytics",
    },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Overview</span>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mt-1">Hello, Admin.</h1>
          <p className="text-slate-500 font-medium mt-1">Here's what is happening with Aura today.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <Clock size={16} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-600">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className={`group bg-white p-7 rounded-[2rem] border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${stat.shadow}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-2xl text-white shadow-lg`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1">
                {stat.title}
              </p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Grid: Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table-Style List */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Shipments</h2>
            <Link to="/admin/orders" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">
              View All
            </Link>
          </div>

          <div className="p-2">
            {stats.recentOrders.length > 0 ? (
              <div className="space-y-1">
                {stats.recentOrders.slice(0, 5).map((order: any) => (
                  <div
                    key={order.id}
                    className="group flex items-center justify-between p-5 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                        #{order.id.slice(-4).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Order Ref: {order.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-slate-400 font-medium italic">
                          {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        order.status === 'delivered' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-amber-50 text-amber-600'
                      }`}>
                        {order.status}
                      </span>
                      <div className="text-right min-w-[80px]">
                        <p className="font-black text-slate-900">${order.total_amount.toFixed(2)}</p>
                        <ChevronRight className="inline h-4 w-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-300 mb-4">
                  <ShoppingBag size={32} />
                </div>
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                  No orders found
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Sidebar / Card */}
        <div className="space-y-6">
           <div className="bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Inventory Alert</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Some of your products are running low. Check your stock levels.</p>
                <Link to="/admin/products" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-xs uppercase transition-transform active:scale-95">
                  Manage Stock
                </Link>
              </div>
              <Package className="absolute -bottom-4 -right-4 h-32 w-32 text-white/5 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
           </div>

           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                Live Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-600">Active Users</span>
                  <span className="font-black">24</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-2/3 rounded-full" />
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
