"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

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
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      // ✅ Read session from URL
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        console.log("✅ Logged in:", data.session.user)

        // 🔥 Redirect after login
        router.push("/dashboard")
      }
    }

    handleAuth()

    // ✅ Listen for login
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_IN") {
          router.push("/dashboard")
        }
      }
    )

    // ✅ Clean URL
    if (window.location.hash.includes("access_token")) {
      window.history.replaceState(null, "", window.location.pathname)
    }

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

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