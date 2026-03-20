import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function CareersPage() {
  return (
    <div className="font-sans selection:bg-teal-100 selection:text-teal-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] mb-6">
          Build the future of education.
        </h1>
        <div className="prose prose-lg prose-slate text-[#475569]">
          <p className="mb-10 text-xl font-medium text-slate-500">
            We’re a fast-moving, design-obsessed startup on a mission to kill career confusion. If you believe education software should look and feel as good as consumer apps, you belong here.
          </p>
          
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4 mt-12">Why join Mentivo?</h2>
          <p className="mb-8">
            We don't do red tape. We do impact. Every line of code you write and every pixel you push directly helps a student sleep better at night, knowing their future is secure.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4 mt-12">Who we’re looking for</h2>
          <ul className="space-y-4 mb-12">
            <li><strong>Product Engineers:</strong> Hackers who love Next.js, AI, and flawless animations.</li>
            <li><strong>Product Designers:</strong> Visionaries who think in components, typography, and empathy.</li>
            <li><strong>Psychologists & Educators:</strong> The brains behind our assessment logic and AI guardrails.</li>
          </ul>

          <hr className="my-12 border-[#E2E8F0]" />
          
          <p className="text-sm text-slate-500 italic">
            Don’t see your role? Send us your portfolio anyway at careers@mentivo.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
