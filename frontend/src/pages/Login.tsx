import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Welcome back to Aura!');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fcfcfc] p-6">
      <div className="w-full max-w-[400px] space-y-8 rounded-[2rem] bg-white p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)]">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 italic">AURA</h1>
          <p className="mt-2 text-sm text-gray-500 font-medium tracking-tight">Access your collection</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
            <input
              type="email"
              placeholder="Email address"
              required
              className="w-full rounded-2xl border-0 bg-gray-50 py-4 pl-12 pr-4 ring-1 ring-gray-100 focus:ring-2 focus:ring-black transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-2xl border-0 bg-gray-50 py-4 pl-12 pr-4 ring-1 ring-gray-100 focus:ring-2 focus:ring-black transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="group relative flex w-full items-center justify-center rounded-2xl bg-black py-4 font-bold text-white hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In'}
            {!loading && <ArrowRight className="absolute right-6 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />}
          </button>
        </form>

        <p className="text-center text-sm font-medium text-gray-500">
          New to Aura?{' '}
          <Link to="/signup" className="font-bold text-black underline decoration-indigo-500 underline-offset-4">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};
