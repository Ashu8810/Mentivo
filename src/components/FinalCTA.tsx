'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FinalCTA() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white">
       {/* Background gradient tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-50/30 -z-10 pointer-events-none" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-100/40 rounded-full blur-[80px] -z-10" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center z-10 w-full py-20">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="relative"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 mb-8 mx-auto">
             <span className="text-sm font-semibold text-emerald-950 tracking-wide uppercase">Your Future Awaits</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#0F172A] mb-8 leading-tight tracking-tight">
             Stop guessing.<br />
             <span className="text-[#059669]">Start building.</span>
          </h2>
          
          <p className="text-xl text-[#475569] mb-12 max-w-2xl mx-auto leading-relaxed">
             Join thousands of students who have discovered their perfect academic path. It takes less than 3 minutes to gain a lifetime of clarity.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
               href="/assessment"

               className="group flex items-center justify-center gap-3 bg-[#059669] text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-[#047857] transition-all hover:shadow-2xl hover:shadow-emerald-950/20 hover:-translate-y-1 w-full sm:w-auto"
            >
               Take the Free Assessment
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-sm text-[#475569] sm:ml-4 flex items-center gap-2">
               No credit card required.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
