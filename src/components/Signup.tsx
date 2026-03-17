'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, BarChart3, CheckCircle2 } from 'lucide-react';
import { authService } from '@/lib/auth';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await authService.signUp({
        email,
        password,
        name,
      });

      if (error) {
        if (error.message.includes('rate limit')) {
          setError('Too many sign-up attempts. Please wait a few minutes before trying again.');
        } else {
          setError(error.message);
        }
        setIsLoading(false);
      } else {

        setIsSuccess(true);
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
      <div className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-screen bg-gradient-to-b from-[#059669] to-[#047857] flex flex-col items-center justify-center p-8 lg:p-12 overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 to-transparent animate-pulse" style={{ animationDuration: '8s' }} />
        
        <div className="relative z-10 w-full max-w-[480px] flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
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
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="h-2 w-24 bg-white/30 rounded-full mb-2" />
                <div className="h-1.5 w-16 bg-white/20 rounded-full" />
              </div>
            </div>

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
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 blur-[40px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* ⚪ RIGHT SIDE — SIGNUP FORM PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:px-12 md:px-16 lg:px-20 bg-white relative shadow-[-4px_0_24px_rgba(15,23,42,0.03)] border-l border-[#F1F5F9] z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-[400px]"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Create Account</h2>
            <p className="text-[15px] text-[#64748B]">Sign up to get started with Mentivo.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-[13px] rounded-xl">
              {error}
            </div>
          )}

          {isSuccess ? (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">Check your email</h3>
              <p className="text-sm text-[#475569] mb-6">
                We&apos;ve sent a verification link to <strong>{email}</strong>. Please click the link to confirm your account.
              </p>
              <Link
                href="/login"
                className="text-sm font-bold text-[#059669] hover:underline"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-[20px]">
              <div>
                <label htmlFor="name" className="block text-[13px] font-medium text-[#475569] mb-1.5">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-emerald-950/20 focus:border-emerald-950 transition-all shadow-sm"
                />
              </div>

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

              <div>
                <label htmlFor="password" className="block text-[13px] font-medium text-[#475569] mb-1.5">
                  Password
                </label>
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

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#059669] text-white rounded-xl text-[15px] font-medium hover:bg-[#047857] transition-all flex items-center justify-center disabled:opacity-70"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
                </button>
              </div>
            </form>
          )}

          <div className="my-8 flex items-center gap-4">
            <div className="h-px bg-[#E2E8F0] flex-1" />
            <span className="text-[13px] font-medium text-[#94A3B8]">or</span>
            <div className="h-px bg-[#E2E8F0] flex-1" />
          </div>

          <div className="mt-8 text-center">
            <p className="text-[14px] text-[#475569]">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-[#059669] hover:text-[#047857] transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
