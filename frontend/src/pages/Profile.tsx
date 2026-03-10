// pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabaseClient';
import { User, Package, Heart, LogOut, Clock, MapPin, ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items (*)')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) toast.success('Signed out successfully');
  };

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-105">
                <User className="h-10 w-10 text-white" />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border border-gray-100 hover:bg-gray-50">
                <Settings className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                {user?.user_metadata?.full_name || 'My Account'}
              </h1>
              <p className="text-gray-500 font-medium">{user?.email}</p>
            </div>
          </div>
          
          <button 
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 hover:border-red-100 transition-all active:scale-95 shadow-sm"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <nav className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                    ? 'bg-black text-white shadow-lg shadow-gray-200' 
                    : 'bg-transparent text-gray-500 hover:bg-white hover:text-black'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-gray-100 min-h-[500px]">
              
              {activeTab === 'orders' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Order History</h2>
                    <span className="text-sm font-medium text-gray-400">{orders.length} orders total</span>
                  </div>

                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 w-full bg-gray-50 animate-pulse rounded-3xl" />
                      ))}
                    </div>
                  ) : orders.length === 0 ? (
                    <EmptyState 
                      icon={Package} 
                      title="No orders yet" 
                      desc="Looks like you haven't made your first purchase."
                      cta="Start Shopping"
                    />
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order: any) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Other tabs follow the same pattern... */}
              {activeTab !== 'orders' && (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <Heart className="h-10 w-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                  <p className="text-gray-500">We're still polishing the {activeTab} section.</p>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

/* Sub-components for cleaner code */

const OrderCard = ({ order }: { order: any }) => (
  <div className="group bg-white border border-gray-100 p-5 rounded-3xl hover:border-black hover:shadow-md transition-all cursor-pointer">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-black transition-colors">
          <Package className="h-6 w-6 text-gray-400 group-hover:text-white" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 uppercase tracking-tight text-sm">Order #{order.id.slice(0, 8)}</h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="h-3 w-3" /> {new Date(order.created_at).toLocaleDateString()}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            }`}>
              {order.status}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-4 sm:pt-0">
        <div className="text-right">
          <p className="text-xs text-gray-400 font-medium">Amount Paid</p>
          <p className="font-black text-lg">${order.total_amount}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-black transform group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  </div>
);

const EmptyState = ({ icon: Icon, title, desc, cta }: any) => (
  <div className="text-center py-16">
    <div className="inline-flex items-center justify-center h-20 w-20 bg-gray-50 rounded-[2rem] mb-6">
      <Icon className="h-10 w-10 text-gray-300" />
    </div>
    <h3 className="text-xl font-black mb-2">{title}</h3>
    <p className="text-gray-500 mb-8 max-w-xs mx-auto">{desc}</p>
    <Link to="/" className="inline-block bg-black text-white px-8 py-4 rounded-2xl text-sm font-bold shadow-lg shadow-gray-200 hover:scale-105 transition-transform">
      {cta}
    </Link>
  </div>
);
