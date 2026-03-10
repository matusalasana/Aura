import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Authenticate
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      toast.error('Invalid login credentials');
      setLoading(false);
      return;
    }

    // 2. Verify Admin Status
    const { data: adminRecord, error: adminError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', authData.user.id)
      .maybeSingle();

    if (adminError || !adminRecord) {
      toast.error('Access Denied: You are not an authorized admin');
      await supabase.auth.signOut(); // Wipe session
    } else {
      toast.success('Access Granted');
      navigate('/admin');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-black italic tracking-tighter">AURA</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">Internal Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-5 rounded-2xl font-bold hover:shadow-lg disabled:opacity-50 flex items-center justify-center transition-all"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
