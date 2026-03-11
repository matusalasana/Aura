// pages/admin/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-toastify';
import { Loader2, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const userRole = data.user?.user_metadata?.role;
      
      if (userRole === 'admin') {
        toast.success('Authentication Successful');
        navigate('/admin');
      } else {
        toast.error('Access Denied: Admin privileges required');
        await supabase.auth.signOut();
      }
    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex">
      {/* Brand Side (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 bg-black relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-50" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        
        <div className="relative z-10 text-center">
          <h1 className="text-8xl font-black text-white italic tracking-tighter mb-4">AURA</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-sm italic">High End Management</p>
        </div>

        {/* Floating Decoration */}
        <div className="absolute bottom-12 left-12 flex items-center gap-3 text-zinc-500">
          <div className="h-[1px] w-12 bg-zinc-800" />
          <span className="text-[10px] uppercase font-bold tracking-widest">v 2.0.4 — Secure Cloud</span>
        </div>
      </div>

      {/* Login Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-12">
            <h1 className="text-5xl font-black italic tracking-tighter">AURA</h1>
            <div className="h-1 w-12 bg-black mx-auto mt-2" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 mb-2">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Admin Portal</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Login.</h2>
            <p className="text-slate-500 font-medium">Enter your credentials to access the central hub.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div className="group relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-5 rounded-2xl border border-slate-200 bg-white focus:border-black focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium pr-12"
                  required
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-black transition-colors">
                  <Lock size={18} />
                </div>
              </div>

              <div className="group relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-5 rounded-2xl border border-slate-200 bg-white focus:border-black focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium pr-12"
                  required
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-black transition-colors">
                  <ShieldCheck size={18} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-black text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-zinc-800 hover:shadow-2xl hover:shadow-black/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 overflow-hidden"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>Initialize Access</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="pt-12 text-center">
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              Unauthorized access is strictly prohibited. <br />
              IP addresses are logged for security purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
