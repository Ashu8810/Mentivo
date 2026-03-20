import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="font-sans selection:bg-teal-100 selection:text-teal-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 lg:px-12 max-w-3xl mx-auto w-full prose prose-slate">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-10">Terms of Service</h1>
        
        <p className="mb-8 text-lg text-[#475569]">Ground rules for using Mentivo. By using our platform, you agree to these simple principles.</p>

        <h4 className="font-semibold text-[#0F172A] mt-8 mb-2">1. Personal Use Only</h4>
        <p className="mb-6 text-[#475569]">Mentivo is designed for individual students and parents. Please don't scrape our data or resell our reports.</p>

        <h4 className="font-semibold text-[#0F172A] mt-8 mb-2">2. AI is a Guide, Not a Guarantee</h4>
        <p className="mb-6 text-[#475569]">Our AI is incredibly smart, but it's not a crystal ball. Our reports are meant to guide your academic choices, not serve as absolute legal or professional mandates.</p>

        <h4 className="font-semibold text-[#0F172A] mt-8 mb-2">3. Play Fair</h4>
        <p className="mb-10 text-[#475569]">Don't attempt to breach our security, reverse-engineer our scoring engine, or disrupt the platform for other students.</p>
      </main>
      <Footer />
    </div>
  );
}
