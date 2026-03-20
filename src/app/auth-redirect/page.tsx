'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { authService } from '@/lib/auth';

export default function AuthRedirectPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await authService.signInWithOAuth('google');
      // Supabase OAuth handles redirecting the window automatically to the provider
      // and then to /dashboard upon success.
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative premium background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-100/40 to-indigo-50/50 blur-[100px] rounded-full -z-10 pointer-events-none" />

      {/* Back navigation */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 left-8"
      >
        <Link href="/login" className="flex items-center gap-2 text-[14px] font-medium text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // smooth, premium ease
        className="w-full max-w-md bg-white rounded-[24px] shadow-2xl shadow-slate-200/50 p-10 flex flex-col items-center text-center border border-slate-100/80 relative"
      >
        {/* Playful Icon */}
        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[18px] flex items-center justify-center mb-8 shadow-sm relative group">
           <svg width="28" height="28" viewBox="0 0 24 24" fill="#0F172A" className="opacity-80" xmlns="http://www.w3.org/2000/svg">
             <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.076 1.52-.05 2.095-.984 3.921-.984 1.808 0 2.336.984 3.945.952 1.644-.025 2.664-1.493 3.666-2.962 1.157-1.693 1.636-3.333 1.66-3.418-.035-.02-3.218-1.233-3.245-4.935-.02-3.097 2.529-4.57 2.636-4.636-1.444-2.109-3.692-2.39-4.498-2.434-2.028-.21-4.14 1.183-4.488 1.183zM15.42 4.143c.84-.984 1.4-2.35 1.246-3.71-1.168.046-2.618.775-3.483 1.76-.776.88-1.45 2.274-1.274 3.599 1.304.1 2.673-.664 3.51-1.649z"/>
           </svg>
           {/* Funny strike-through effect */}
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: "40px" }}
             transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[3px] bg-red-400 rotate-[-45deg] rounded-full" 
           />
        </div>

        <h1 className="text-2xl md:text-[26px] font-bold text-[#0F172A] mb-3 tracking-tight">
          Plot twist.
        </h1>
        
        <p className="text-[15px] md:text-[16px] text-[#64748B] mb-10 leading-relaxed max-w-[290px]">
          We tried asking Apple nicely… it said no.<br/><br/>
          But Google? Way more chill. Let's get you in.
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full h-14 flex items-center justify-center gap-3 bg-white border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 text-[15px] font-medium text-[#0F172A] disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <p className="mt-5 text-[13px] font-medium text-slate-400">
          Takes 2 seconds. No drama.
        </p>
      </motion.div>
    </div>
  );
}
