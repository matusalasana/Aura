import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (mounted && session?.user) {
          const currentUser = session.user;
          setUser(currentUser);
          
          // Check multiple places for role
          const userRole = 
            currentUser.user_metadata?.role || 
            currentUser.app_metadata?.role || 
            null;
          
          setRole(userRole);
          setIsAdmin(userRole === 'admin');
          
          console.log('Auth state:', {
            email: currentUser.email,
            user_metadata: currentUser.user_metadata,
            app_metadata: currentUser.app_metadata,
            role: userRole,
            isAdmin: userRole === 'admin'
          });
        } else if (mounted) {
          setUser(null);
          setRole(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        if (session?.user) {
          const currentUser = session.user;
          setUser(currentUser);
          
          const userRole = 
            currentUser.user_metadata?.role || 
            currentUser.app_metadata?.role || 
            null;
          
          setRole(userRole);
          setIsAdmin(userRole === 'admin');
          
          console.log('Auth state changed:', {
            email: currentUser.email,
            user_metadata: currentUser.user_metadata,
            app_metadata: currentUser.app_metadata,
            role: userRole,
            isAdmin: userRole === 'admin'
          });
        } else {
          setUser(null);
          setRole(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, role, isAdmin };
};