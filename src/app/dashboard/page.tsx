'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Plus, Calendar, ArrowRight, BarChart3, BrainCircuit } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProtectedRoute from '@/components/ProtectedRoute';

type AssessmentResult = {
  id: string;
  assessment_id: string;
  top_recommendation: string;
  confidence_score: number;
  created_at: string;
  trait_scores: {
    analytical: number;
    creativity: number;
    business: number;
    social: number;
    practical: number;
  };
};

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching results:', error.message || error);
        if (error.message?.includes('does not exist')) {
          console.warn('The "assessment_results" table may not exist yet.');
        }
      } else {
        setResults(data || []);
      }
      setIsFetching(false);
    }

    if (user) {
      fetchResults();
    }
  }, [user]);

  if (loading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  // Helper to normalize the trait logic into a simple 100% scale
  const getPercentage = (traits: any, trait: string) => {
    if (!traits) return 0;
    const total = Object.values(traits).reduce((a: any, b: any) => a + Number(b), 0) as number;
    if (total === 0) return 0;
    return Math.round((traits[trait] / total) * 100);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-6 py-12 pt-32">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Welcome back, {user?.user_metadata?.full_name || 'Student'}</h1>
              <p className="text-[#64748B]">View and manage your academic assessment reports.</p>
            </div>
            
            <Link 
              href="/assessment" 
              className="flex items-center gap-2 bg-[#059669] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#047857] transition-all shadow-lg shadow-emerald-950/10 self-start"
            >
              <Plus className="w-5 h-5" />
              New Assessment
            </Link>
          </div>

          {results.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0] shadow-sm">
              <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <BarChart3 className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">No Reports Yet</h2>
              <p className="text-[#64748B] max-w-md mx-auto mb-8">
                Take your first assessment to discover your ideal academic stream and career path.
              </p>
              <Link 
                href="/assessment" 
                className="inline-flex items-center gap-2 text-[#059669] font-bold hover:underline"
              >
                Start Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((report) => {
                const analyticalPct = getPercentage(report.trait_scores, 'analytical');
                
                return (
                  <motion.div 
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <BrainCircuit className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Confidence</span>
                        <span className="text-lg font-bold text-emerald-600">{report.confidence_score}%</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#0F172A] mb-2 leading-tight flex-grow">
                      {report.top_recommendation}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-[#64748B] mb-6 border-t border-gray-100 pt-4">
                      <Calendar className="w-4 h-4" />
                      {new Date(report.created_at).toLocaleDateString()}
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-400 rounded-full" style={{ width: `${analyticalPct}%` }} />
                      </div>
                      <div className="flex justify-between text-[12px] font-semibold text-[#64748B]">
                        <span>Analytical Focus</span>
                        <span>{analyticalPct}%</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link 
                        href={`/assessment/result/${report.assessment_id}`}
                        className="w-full py-4 bg-gray-50 text-[#0F172A] rounded-xl font-semibold text-sm flex items-center justify-center gap-2 group-hover:bg-[#059669] group-hover:text-white transition-all border border-gray-100 group-hover:border-[#059669] shadow-sm"
                      >
                        View Full Report
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
