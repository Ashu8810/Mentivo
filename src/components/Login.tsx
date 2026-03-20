'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, BarChart3, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await authService.signIn({
        email,
        password,
      });

      if (error) {
        if (error.message === 'Invalid login credentials' || error.status === 400) {
          setError('Invalid email or password.');
        } else {
          setError(error.message || 'Login failed.');
        }
        setIsLoading(false);
      } else {
        router.push('/dashboard');
      }
    } catch (_err: unknown) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await authService.signInWithOAuth(provider);
      if (error) {
        setError(error.message);
        setIsLoading(false);
      }
    } catch (_err: unknown) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* 🟦 LEFT SIDE — BRAND PANEL */}
      <div className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-screen bg-gradient-to-b from-[#059669] to-[#047857] flex flex-col items-center justify-center p-8 lg:p-12 overflow-hidden overflow-hidden">
        
        {/* Very subtle background gradient shift animation */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 to-transparent animate-pulse" style={{ animationDuration: '8s' }} />
        
        <div className="relative z-10 w-full max-w-[480px] flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group mb-12">
              <img src="/logo.png" alt="Mentivo Logo" className="w-10 h-10 object-contain transition-transform group-hover:scale-105" />
              <span className="font-semibold text-2xl tracking-tight text-white">Mentivo</span>
            </Link>

            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
              Clarity for Your Academic Future.
            </h1>
            <p className="text-teal-100 text-[15px] leading-relaxed mb-12 max-w-[360px]">
              Make confident academic decisions with structured AI guidance.
            </p>
          </motion.div>

          {/* Minimal Dashboard Mock Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl relative"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          >
            <style jsx>{`
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
              }
            `}</style>
            
            {/* Mock Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="h-2 w-24 bg-white/30 rounded-full mb-2" />
                <div className="h-1.5 w-16 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Mock Content Blocks */}
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3 flex items-center gap-3 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-teal-400/30 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white/80" />
                  </div>
                  <div className="h-1.5 w-full max-w-[140px] bg-white/20 rounded-full" />
                </div>
              ))}
            </div>
            
            {/* Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 blur-[40px] rounded-full pointer-events-none" />
          </motion.div>

        </div>
      </div>

      {/* ⚪ RIGHT SIDE — LOGIN FORM PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:px-12 md:px-16 lg:px-20 bg-white relative shadow-[-4px_0_24px_rgba(15,23,42,0.03)] border-l border-[#F1F5F9] z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-[400px]"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Welcome Back</h2>
            <p className="text-[15px] text-[#64748B]">Sign in to continue your progress.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-[13px] rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-[20px]">
            
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-[#475569] mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-emerald-950/20 focus:border-emerald-950 transition-all shadow-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-[13px] font-medium text-[#475569]">
                  Password
                </label>
                <Link href="#" className="text-[13px] font-medium text-[#059669] hover:text-[#047857] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-4 pr-11 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-emerald-950/20 focus:border-emerald-950 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#059669] text-white rounded-xl text-[15px] font-medium hover:bg-[#047857] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(37,99,235,0.2)] transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px bg-[#E2E8F0] flex-1" />
            <span className="text-[13px] font-medium text-[#94A3B8]">or continue with</span>
            <div className="h-px bg-[#E2E8F0] flex-1" />
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="h-11 flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all text-[14px] font-medium text-[#0F172A] shadow-sm disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button 
              type="button" 
              onClick={() => router.push('/auth-redirect')}
              disabled={isLoading}
              className="h-11 flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all text-[14px] font-medium text-[#0F172A] shadow-sm disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.076 1.52-.05 2.095-.984 3.921-.984 1.808 0 2.336.984 3.945.952 1.644-.025 2.664-1.493 3.666-2.962 1.157-1.693 1.636-3.333 1.66-3.418-.035-.02-3.218-1.233-3.245-4.935-.02-3.097 2.529-4.57 2.636-4.636-1.444-2.109-3.692-2.39-4.498-2.434-2.028-.21-4.14 1.183-4.488 1.183zM15.42 4.143c.84-.984 1.4-2.35 1.246-3.71-1.168.046-2.618.775-3.483 1.76-.776.88-1.45 2.274-1.274 3.599 1.304.1 2.673-.664 3.51-1.649z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[14px] text-[#475569]">
              New to Mentivo?{' '}
              <Link href="/signup" className="font-medium text-[#059669] hover:text-[#047857] transition-colors">
                Create account
              </Link>
            </p>
          </div>

        </motion.div>
      </div>

    </div>
  );
}
