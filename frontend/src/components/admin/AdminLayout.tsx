// components/admin/AdminLayout.tsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/admin/customers', icon: Users, label: 'Customers' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-black italic">AURA ADMIN</h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:w-64 flex-shrink-0
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-black italic tracking-tighter">AURA</h1>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1">Admin Panel</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Sign Out */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl hover:bg-red-50 text-red-600 transition-colors w-full"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;