import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="font-sans selection:bg-teal-100 selection:text-teal-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] mb-6">
          Built by students, for students.
        </h1>
        <div className="prose prose-lg prose-slate text-[#475569] leading-relaxed">
          <p className="mb-6">
            We know the exact feeling. The pressure from parents, the confusion of endless options, and the fear of making the wrong choice at age 15.
          </p>
          <p className="mb-6">
            We built Mentivo because we believe no student should have to guess their future. We saw traditional career counseling that was outdated, biased, and frankly, boring. We wanted something better, faster, and smarter.
          </p>
          <p className="mb-12">
            Our mission is simple: To give every student the exact clarity they need to make the biggest decision of their academic life with absolute confidence. We combine advanced AI with human psychology to show you not just what you <em>can</em> do, but what you were <em>made</em> to do.
          </p>
          
          <div className="bg-slate-50 p-8 rounded-2xl border border-[#E2E8F0] mt-12">
             <h3 className="text-xl font-bold text-[#0F172A] mb-3">Ready to find your path?</h3>
             <Link href="/assessment" className="text-[#059669] font-semibold hover:text-[#047857]">Start Free Assessment →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
