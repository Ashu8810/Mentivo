import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function BlogPage() {
  return (
    <div className="font-sans selection:bg-teal-100 selection:text-teal-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 lg:px-12 max-w-4xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] mb-6">
          The Mentivo Journal
        </h1>
        <p className="text-xl text-[#475569] mb-16">
          Insights, stories, and strategy to help you navigate the chaos of student life. No fluff, just signal.
        </p>
        
        {/* Placeholder for blog grid */}
        <div className="text-slate-400 font-medium py-32 border-2 border-dashed border-[#E2E8F0] rounded-3xl bg-slate-50/50">
          Publishing soon. Check back later for stream deep-dives and career horizons.
        </div>
      </main>
      <Footer />
    </div>
  );
}
