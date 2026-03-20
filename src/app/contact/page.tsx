import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="font-sans selection:bg-teal-100 selection:text-teal-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 lg:px-12 max-w-3xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] mb-6">
          We’re here to help.
        </h1>
        <p className="text-xl text-[#475569] mb-12">
          Have a question about your report? Need technical support? Just want to say hi?
        </p>

        <div className="bg-[#F8FAFC] p-8 md:p-12 rounded-3xl border border-[#E2E8F0] shadow-sm">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Email us at:</h3>
          <a href="mailto:support@mentivo.com" className="text-2xl md:text-3xl font-bold text-[#059669] hover:text-[#047857] transition-colors break-all">
            support@mentivo.com
          </a>
          <p className="mt-8 text-[#475569] leading-relaxed">
            We’re a small team, but we’re fast. You can expect a human response from one of our core team members within 24 hours. No automated bots jumping in your way.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
