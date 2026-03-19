"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { AssessmentResultData } from '@/lib/scoringEngine';
import { CheckCircle2, ChevronRight, BrainCircuit, Target, Lightbulb, Rocket, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchResult() {
      if (params?.id === 'guest') {
        const local = localStorage.getItem('guest_result');
        if (local) {
          const parsed = JSON.parse(local);
          setResult(parsed.recommendation ? parsed.recommendation : parsed);
        }
        setLoading(false);
        return;
      }

      if (!params?.id) return;
      
      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('assessment_id', params.id)
        .single();
        
      if (error) {
        console.error("Error fetching result:", error);
      } else if (data) {
        setResult(data.report_data as AssessmentResultData);
      }
      setLoading(false);
    }
    
    fetchResult();
  }, [params?.id, router]);

  const handleSaveToDashboard = async () => {
    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    try {
      const local = localStorage.getItem('guest_result');
      if (local) {
        const payload = JSON.parse(local);
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('assessments')
          .insert([{ user_id: user.id, student_level: payload.level || '10th', status: 'completed' }])
          .select().single();
          
        if (assessmentError) throw assessmentError;

        const { error: resultError } = await supabase.from('assessment_results').insert([{
           assessment_id: assessmentData.id,
           user_id: user.id,
           trait_scores: payload.scores,
           top_recommendation: payload.recommendation.primary || payload.recommendation.recommended,
           secondary_recommendation: payload.recommendation.secondary || payload.recommendation.secondary,
           confidence_score: payload.recommendation.confidence,
           report_data: payload.recommendation
        }]);

        if (resultError) throw resultError;
        
        localStorage.removeItem('guest_result');
        router.push('/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error(error);
      alert("Database Sync Failed: " + (error.message || "Please ensure your Supabase tables are set up."));
      setIsSaving(false);
    }
  };

  if (loading || !result) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center p-6 text-[#0F172A]">
        <div className="w-16 h-16 border-4 border-[#059669] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#475569] font-medium">Loading your profile matrix...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center p-6 text-[#0F172A] text-center">
        <h2 className="text-2xl font-bold mb-4">Report Not Found</h2>
        <button onClick={() => router.push('/assessment')} className="text-[#059669] hover:text-emerald-700 underline font-medium">
          Take Assessment Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center py-16 px-6 relative overflow-hidden text-[#0F172A]">
      
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-teal-50/50 blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-50/50 blur-3xl opacity-60" />
      </div>

      {/* Premium Header Map */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1000px] mx-auto text-center space-y-4 mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-emerald-950 text-sm font-medium mx-auto">
          <BrainCircuit className="w-4 h-4 text-[#059669]" /> Comprehensive Cognitive Analysis
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.15] tracking-tight">
          Your Ideal <span className="text-[#059669]">Pathway</span>
        </h1>
        <p className="text-lg md:text-xl text-[#475569] max-w-[700px] mx-auto leading-relaxed mt-4">
          Based on your behavioral patterns, problem-solving approach, and innate psychological traits, we have mapped your optimal academic trajectory.
        </p>
      </motion.div>

      <div className="w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        
        {/* Recommendation Primary Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-8 bg-white border border-[#E2E8F0] p-8 md:p-10 rounded-3xl shadow-xl shadow-emerald-950/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#059669] to-teal-400" />
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-teal-50/50 blur-[80px] rounded-full group-hover:bg-teal-100/50 transition-all duration-700 pointer-events-none" />
          
          <h2 className="text-[#475569] uppercase tracking-wider text-sm font-bold mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#059669]" /> Primary Recommendation
          </h2>
          <h3 className="text-3xl lg:text-5xl font-bold text-[#0F172A] mb-6 tracking-tight">
            {result.recommendation?.primary || 'Pathway Found'}
          </h3>
          <p className="text-[#475569] leading-relaxed text-lg mb-10 max-w-[600px]">
            {result.analysis}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-gray-100 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-[#059669] font-bold text-xl shadow-inner">
                {result.confidence}%
              </div>
              <div className="text-[#475569] text-sm font-semibold uppercase tracking-wider leading-tight">
                Engine Match<br/>Confidence
              </div>
            </div>
            
            <Link href="/dashboard" className="px-8 py-4 bg-[#059669] text-white font-semibold rounded-xl hover:bg-[#047857] transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-950/10 hover:-translate-y-0.5">
              Explore Timeline <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* Secondary Recommendation */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-4 bg-white border border-[#E2E8F0] p-8 rounded-3xl flex flex-col shadow-sm"
        >
          <h2 className="text-[#475569] uppercase tracking-wider text-xs font-bold mb-3">Secondary Option</h2>
          <h3 className="text-2xl font-bold text-[#0F172A] mb-4">{result.recommendation?.secondary || 'Alternative Path'}</h3>
          <p className="text-[#475569] leading-relaxed text-sm">
            {result.alternative_reason}
          </p>
          <div className="mt-auto pt-6">
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-300 rounded-full w-[80%]" />
            </div>
          </div>
        </motion.div>

        {/* Strengths Matrix */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-6 bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-sm"
        >
          <h2 className="text-[#475569] uppercase tracking-wider text-sm font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" /> Core Strengths Detected
          </h2>
          <ul className="space-y-4">
            {result.strengths.map((strength, i) => (
              <li key={i} className="flex items-center gap-3 text-[#0F172A] font-medium bg-gray-50 p-3 rounded-xl border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-[#059669] flex-shrink-0" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Suitable Careers */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-6 bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-sm"
        >
          <h2 className="text-[#475569] uppercase tracking-wider text-sm font-bold mb-6 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-indigo-500" /> Future Trajectories
          </h2>
          <div className="flex flex-wrap gap-3">
            {result.career_paths?.map((career, i) => (
              <span key={i} className="px-5 py-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 font-semibold text-sm">
                {career}
              </span>
            ))}
          </div>
        </motion.div>

      </div>

      {params?.id === 'guest' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-[1000px] mx-auto mt-8 flex flex-col md:flex-row items-center justify-between bg-teal-50 border border-teal-200 p-6 md:p-8 rounded-3xl shadow-sm z-10"
        >
          <div>
            <h3 className="text-[#0F172A] font-bold text-xl mb-1">Save this Assessment</h3>
            <p className="text-[#475569] text-base">Don't lose your data! Save this personalized report to your dashboard permanently.</p>
          </div>
          <button 
            onClick={handleSaveToDashboard}
            disabled={isSaving}
            className="mt-6 md:mt-0 px-8 py-4 bg-[#059669] text-white font-bold rounded-xl hover:bg-[#047857] hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/10 transition-all flex items-center justify-center whitespace-nowrap disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            {isSaving ? "Saving..." : "Save to Dashboard"}
          </button>
        </motion.div>
      )}

    </div>
  );
}
