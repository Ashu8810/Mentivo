import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="font-sans selection:bg-teal-100 selection:text-teal-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 lg:px-12 max-w-3xl mx-auto w-full prose prose-slate">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-10">Privacy Policy</h1>
        
        <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">Your data is yours. Period.</h3>
        <p className="mb-6 text-[#475569]">We know trust is everything. Here is how we handle your information, in plain English.</p>

        <h4 className="font-semibold text-[#0F172A] mt-8 mb-2">What we collect</h4>
        <p className="mb-6 text-[#475569]">Only what we need. Your assessment answers, basic account info, and minimal usage data to make the app run smoothly.</p>

        <h4 className="font-semibold text-[#0F172A] mt-8 mb-2">Why we use it</h4>
        <p className="mb-6 text-[#475569]">To generate your highly personalized reports and to train our engine to give better advice. That’s it.</p>

        <h4 className="font-semibold text-[#059669] mt-8 mb-2">What we NEVER do</h4>
        <p className="mb-10 text-[#475569]">We will never sell, trade, or expose your personal data to third-party marketers, universities, or ad networks. Your future is not our product to sell.</p>
      </main>
      <Footer />
    </div>
  );
}
