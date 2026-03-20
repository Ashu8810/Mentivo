import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function CookiesPage() {
  return (
    <div className="font-sans selection:bg-teal-100 selection:text-teal-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 lg:px-12 max-w-3xl mx-auto w-full prose prose-slate">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-10">Cookie Policy</h1>
        
        <p className="mb-8 text-lg text-[#475569]">A better experience, baked in. We use a minimal amount of cookies to make sure Mentivo runs beautifully on your device.</p>

        <h4 className="font-semibold text-[#0F172A] mt-8 mb-2">The Essentials</h4>
        <p className="mb-6 text-[#475569]">We use secure cookies to keep you logged in and ensure your assessment progress isn't lost if you accidentally close your tab.</p>

        <h4 className="font-semibold text-[#0F172A] mt-8 mb-2">The Analytics</h4>
        <p className="mb-6 text-[#475569]">We use anonymous, aggregated tracking to see which buttons get clicked and which pages load slowly. This helps our engineers make the app faster and better for everyone.</p>

        <h4 className="font-semibold text-[#0F172A] mt-8 mb-2">Your Choice</h4>
        <p className="mb-10 text-[#475569]">We don't use invasive third-party ad-tracking cookies. You can clear your browser cookies at any time, though it will log you out of your current session.</p>
      </main>
      <Footer />
    </div>
  );
}
