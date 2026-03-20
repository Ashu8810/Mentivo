import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className="font-sans selection:bg-teal-100 selection:text-teal-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 lg:px-12 w-full text-center mt-12 mb-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-teal-50/40 blur-3xl -z-10" />
        
        <div className="w-24 h-24 bg-teal-50 text-emerald-700 border border-teal-100 rounded-full flex items-center justify-center mb-10 mx-auto shadow-sm">
           <PlayCircle className="w-12 h-12 stroke-[1.5]" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] mb-6">
          Interactive Demo
        </h1>
        
        <p className="text-xl text-[#475569] mb-12 max-w-2xl mx-auto leading-relaxed">
          We're putting the final polish on our interactive platform walkthrough. Check back soon for a comprehensive look at how Mentivo connects the exact dots between your unique aptitude and your future.
        </p>
        
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-medium text-sm mb-16 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
            Coming Soon
        </div>

        <div>
           <Link href="/" className="text-[#059669] font-medium hover:text-[#047857] transition-colors flex items-center gap-2 group">
             <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Homepage
           </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
