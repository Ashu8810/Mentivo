"use client"

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProblemSection } from '@/components/ProblemSection';
import { HowItWorks } from '@/components/HowItWorks';
import { WhatYouReceive } from '@/components/WhatYouReceive';
import { TargetAudience } from '@/components/TargetAudience';
import { SamplePreview } from '@/components/SamplePreview';
import { TrustSection } from '@/components/TrustSection';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { AIAssistant } from '@/components/AIAssistant';

export default function Home() {
  return (
    <main className="min-h-screen font-sans bg-[var(--color-bg-primary)] overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <WhatYouReceive />
      <TargetAudience />
      <SamplePreview />
      <TrustSection />
      <FinalCTA />
      <Footer />
      <AIAssistant />
    </main>
  );
}