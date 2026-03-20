'use client';

import { useEffect, useState, use } from 'react';
import Link from "next/link";
import { 
  ArrowLeft, 
  Target, 
  ChevronRight, 
  Activity, 
  ShieldAlert, 
  Loader2
} from "lucide-react";
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion, Variants } from 'framer-motion';

type Assessment = {
  id: string;
  primary_stream: string;
  secondary_stream: string;
  confidence: string;
  created_at: string;
  analytical: number;
  creativity: number;
  business: number;
  structure: number;
  people: number;
  risk: number;
};

export default function ReportPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const { user, loading: authLoading } = useAuth();
  const [report, setReport] = useState<Assessment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchReport() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Report not found');

        setReport(data);
      } catch (err: unknown) {
        const error = err as Error;
        console.error('Error fetching report:', error);
        setError(error.message || 'An error occurred while fetching the report');
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchReport();
    }
  }, [user, params.id]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-md text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Report Not Found</h1>
          <p className="text-slate-500 mb-8">{error || "The report you're looking for doesn't exist or you don't have permission to view it."}</p>
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 font-sans pb-24 text-slate-800">
        {/* Top Navigation */}
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
          <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-3">
               <div className="px-3 py-1 rounded-sm bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border border-slate-200">
                 Final Assessment Report
               </div>
            </div>
          </div>
        </header>

        {/* Main Container */}
        <main className="max-w-[1100px] mx-auto px-6 pt-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-50/50 blur-[100px] -z-10 rounded-full pointer-events-none" />
          
          {/* Header Section */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="text-center mb-16 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-100 bg-emerald-50/50 text-[#059669] text-sm font-semibold mb-8 shadow-sm">
              <Activity className="w-4 h-4" />
              Comprehensive Cognitive Analysis
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-[#0F172A] mb-6 tracking-tight leading-tight">
              Your Ideal <span className="text-[#059669]">Pathway</span>
            </h1>
            
            <p className="text-lg md:text-[20px] text-[#475569] max-w-[800px] mx-auto leading-relaxed">
              Based on your behavioral patterns, problem-solving approach, and innate psychological traits, we have mapped your optimal academic trajectory.
            </p>
          </motion.div>

          {/* The Cards Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative z-10 items-stretch"
          >
            {/* Main Card (Left) */}
            <motion.div 
              variants={itemVariants} 
              className="flex-1 rounded-[32px] bg-white border border-[#E2E8F0] shadow-xl shadow-emerald-950/5 overflow-hidden flex flex-col relative"
            >
              <div className="h-2 w-[calc(100%-4rem)] rounded-full mx-auto bg-[#059669] absolute top-[-4px] left-8 shadow-[0_4px_10px_rgba(5,150,105,0.3)]" />
              <div className="h-1.5 w-[90%] bg-[#059669] absolute top-0 left-[5%] rounded-b-xl" />
              
              <div className="p-8 md:p-12 flex-1 flex flex-col pt-12">
                <div className="flex items-center gap-2 mb-6 text-[#059669] font-bold text-sm tracking-wide uppercase">
                   <Target className="w-5 h-5 stroke-[2.5]" />
                   Primary Recommendation
                </div>

                <h3 className="text-4xl md:text-[46px] font-bold text-[#0F172A] mb-6 tracking-tight">
                  {report.primary_stream}
                </h3>

                <p className="text-[17px] text-[#475569] leading-[1.8] mb-12 max-w-[580px]">
                  Your profile matrix reveals a distinct natural inclination: your intersection of core traits and problem-solving methods points strongly toward fields within {report.primary_stream}, where your unique strengths can truly excel.
                </p>

                <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-[72px] h-[72px] rounded-full bg-emerald-50/80 border border-emerald-100 flex items-center justify-center shadow-inner">
                       <span className="text-[22px] font-bold text-[#059669]">{report.confidence}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold tracking-[0.08em] text-[#475569] leading-tight">
                        ENGINE MATCH<br/>CONFIDENCE
                      </span>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] transition-colors text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-emerald-600/20 group w-full sm:w-auto justify-center text-[15px]">
                    Explore Timeline
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Secondary Card (Right) */}
            <motion.div 
              variants={itemVariants} 
              className="lg:w-[380px] rounded-[32px] bg-white border border-[#E2E8F0] shadow-lg shadow-emerald-950/5 p-8 md:p-10 flex flex-col"
            >
               <div className="flex-1">
                 <div className="text-[13px] font-bold tracking-[0.1em] text-[#64748B] mb-5 uppercase">
                   Secondary Option
                 </div>
                 
                 <h4 className="text-[28px] font-bold text-[#0F172A] mb-5 leading-[1.2] tracking-tight">
                   {report.secondary_stream || 'Alternative Path'}
                 </h4>
                 
                 <p className="text-[15px] text-[#64748B] leading-[1.7] max-w-[280px]">
                   A pivot into {report.secondary_stream || 'this alternative'} anchors your strong foundational skills into highly stable, yet deeply rewarding, professional trajectories.
                 </p>
               </div>

               <div className="mt-12 flex items-center justify-center w-full">
                 <div className="h-1.5 w-[90%] bg-gray-100 rounded-full overflow-hidden shrink-0">
                   <div className="h-full w-[75%] bg-gradient-to-r from-teal-300 to-teal-400 rounded-full" />
                 </div>
               </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
