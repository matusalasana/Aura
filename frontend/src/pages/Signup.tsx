import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, User, Loader2 } from 'lucide-react';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName } // This adds the name to the user profile
      }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Check your email for the confirmation link!');
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fcfcfc] p-6">
      <div className="w-full max-w-[400px] space-y-8 rounded-[2rem] bg-white p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)]">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 italic">AURA</h1>
          <p className="mt-2 text-sm text-gray-500 font-medium tracking-tight">Join the movement</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full rounded-2xl border-0 bg-gray-50 py-4 pl-12 pr-4 ring-1 ring-gray-100 focus:ring-2 focus:ring-black transition-all"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

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
            className="flex w-full items-center justify-center rounded-2xl bg-black py-4 font-bold text-white hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm font-medium text-gray-500">
          Already part of the community?{' '}
          <Link to="/login" className="font-bold text-black underline decoration-indigo-500 underline-offset-4">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
