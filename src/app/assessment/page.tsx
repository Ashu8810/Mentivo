'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Assessment() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Mock assessment state
  const [scores] = useState({
    analytical: 85,
    creativity: 70,
    business: 60,
    structure: 75,
    people: 80,
    risk: 50
  });

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);

    const { error } = await supabase.from('assessments').insert([{
      user_id: user.id,
      ...scores,
      primary_stream: 'Computer Science & HCI',
      secondary_stream: 'Design Strategy',
      confidence: '94'
    }]);

    if (error) {
      alert('Error saving assessment: ' + error.message);
      setIsSubmitting(false);
    } else {
      setIsFinished(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        
        <main className="max-w-3xl mx-auto px-6 py-12 pt-32">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E2E8F0] shadow-sm">
            {!isFinished ? (
              <>
                <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Complete Your Assessment</h1>
                <p className="text-[#64748B] mb-12">
                  We&apos;ve simulated your responses for this demonstration. Review your profile before saving it to your dashboard.
                </p>

                <div className="space-y-8 mb-12">
                  {Object.entries(scores).map(([key, value]) => (
                    <div key={key} className="space-y-3">
                      <div className="flex justify-between text-sm font-semibold capitalize">
                        <span className="text-[#0F172A]">{key}</span>
                        <span className="text-emerald-600">{value}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          className="h-full bg-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#059669] text-white rounded-2xl font-bold text-lg hover:bg-[#047857] transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg shadow-emerald-950/10"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Save & Finish
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Assessment Saved!</h2>
                <p className="text-[#64748B]">Redirecting you to your dashboard...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
