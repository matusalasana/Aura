import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { Package, ShoppingBag, DollarSign, TrendingUp, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { stats, loading } = useAdmin();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'bg-green-500',
      link: '/admin/orders'
    },
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      link: '/admin/orders'
    },
    {
      title: 'Conversion Rate',
      value: '2.4%',
      icon: TrendingUp,
      color: 'bg-amber-500',
      link: '/admin/analytics'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tighter">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back to your store overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {stat.title}
              </span>
            </div>
            <p className="text-3xl font-black">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
        {stats?.recentOrders?.length > 0 ? (
          <div className="space-y-4">
            {stats.recentOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-bold">#{order.id.slice(0, 8)}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="font-black">${order.total_amount}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No orders yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;