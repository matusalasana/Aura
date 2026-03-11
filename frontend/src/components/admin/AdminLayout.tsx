// components/admin/AdminLayout.tsx
import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 
        transform transition-all duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="p-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
                <span className="text-white font-black text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">AURA</h1>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    group flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200
                    ${active 
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-200' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-5 w-5 transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                    {item.label}
                  </div>
                  {active && <ChevronRight className="h-4 w-4 opacity-50" />}
                </Link>
              );
            })}
          </nav>

          {/* Footer / User Action */}
          <div className="p-4 mt-auto">
            <div className="bg-slate-50 rounded-2xl p-2 border border-slate-100">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
              >
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header - Mobile only or for global search/actions */}
        <header className="h-16 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-slate-200 lg:hidden">
          <h1 className="text-lg font-bold italic">AURA</h1>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        {/* Dynamic Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
