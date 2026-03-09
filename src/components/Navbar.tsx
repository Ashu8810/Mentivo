'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';


export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAiEnabled, setIsAiEnabled] = useState(true);
  const { user, signOut } = useAuth();


  useEffect(() => {
    // Only access localStorage on the client side after mount
    const stored = localStorage.getItem('mentivo-ai-enabled');
    if (stored !== null) {
      setTimeout(() => setIsAiEnabled(stored === 'true'), 0);
    }
  }, []);

  const toggleAi = () => {
    const newState = !isAiEnabled;
    setIsAiEnabled(newState);
    localStorage.setItem('mentivo-ai-enabled', String(newState));
    window.dispatchEvent(new CustomEvent('mentivo-ai-toggle', { detail: newState }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'What You Receive', href: '/#what-you-receive' },
    { name: 'Sample Result', href: '/#sample' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-[var(--color-border-light)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Mentivo Logo" className="w-10 h-10 object-contain transition-transform group-hover:scale-105" />
          <span className="font-semibold text-2xl tracking-tight text-[#0F172A]">Mentivo</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleAi}
            className="flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors pr-2 border-r border-[#E2E8F0]"
          >
            <div className={`w-8 h-4 rounded-full relative transition-colors ${isAiEnabled ? 'bg-[#059669]' : 'bg-gray-200'}`}>
              <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${isAiEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            AI Guide
          </button>
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 rounded-lg transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-[#0F172A] hover:text-[#059669] transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="group relative flex items-center gap-2 bg-[#059669] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#047857] transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#475569] hover:bg-[#F8FAFC] rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-[var(--color-border-light)] shadow-lg p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-[#0F172A] py-2 border-b border-[#F8FAFC]"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={toggleAi}
                className="w-full flex items-center justify-between text-[#0F172A] font-medium py-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-4"
              >
                <span>AI Guide</span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isAiEnabled ? 'bg-[#059669]' : 'bg-gray-200'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isAiEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </button>
              {user ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    className="w-full flex items-center justify-center gap-2 text-[#0F172A] font-medium py-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 text-red-600 font-medium py-3 rounded-lg bg-red-50 border border-red-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="w-full text-center text-[#0F172A] font-medium py-3 rounded-lg bg-[#F8FAFC] hover:bg-[#E2E8F0] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/login"
                    className="w-full text-center text-white font-medium py-3 rounded-lg bg-[#059669] hover:bg-[#047857] transition-colors flex items-center justify-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
