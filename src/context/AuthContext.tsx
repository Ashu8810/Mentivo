'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User, Session } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If Supabase falls back to the Site URL because /auth/callback wasn't added to Redirect URLs,
    // we must manually forward the `code` to the server-side Next.js route handler to set cookies.
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      if (code && pathname !== '/auth/callback') {
        window.location.href = `/auth/callback?code=${code}`;
        return;
      }
    }

    // Check active sessions and set the user
    const handleInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setSession(session);
        setUser(session?.user ?? null);

        if (session) {
          // Clean URL if token exists
          if (window.location.hash.includes('access_token')) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }

          // Redirect to dashboard ONLY if we are on login, signup, or root
          if (pathname === '/login' || pathname === '/signup' || pathname === '/') {
            router.push('/dashboard');
          }
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    handleInitialSession();

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === 'SIGNED_IN') {
        const hash = window.location.hash;
        if (hash && hash.includes('access_token')) {
          // Clean up the URL by removing the access_token hash
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        
        // Push safely using standard routing
        if (pathname === '/login' || pathname === '/signup' || pathname === '/') {
          router.push('/dashboard');
        }
      } else if (event === 'SIGNED_OUT') {
        router.push('/login');
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router, pathname]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
