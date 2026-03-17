'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Plus, Calendar, ArrowRight, BarChart3, BrainCircuit } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProtectedRoute from '@/components/ProtectedRoute';

type Assessment = {
  id: string;
  primary_stream: string;
  confidence: string;
  created_at: string;
  analytical: number;
  creativity: number;
};

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchAssessments() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching assessments:', error.message || error);
        if (error.message?.includes('does not exist')) {
          console.warn('The "assessments" table may not exist yet. Please run the SQL schema in your Supabase SQL Editor.');
        }
      } else {
        setAssessments(data || []);
      }
      setIsFetching(false);
    }


    if (user) {
      fetchAssessments();
    }
  }, [user]);

  if (loading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

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

          {assessments.length === 0 ? (
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
              {assessments.map((report) => (
                <motion.div 
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <BrainCircuit className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Confidence</span>
                      <span className="text-lg font-bold text-emerald-600">{report.confidence}%</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] mb-1">{report.primary_stream}</h3>
                  <div className="flex items-center gap-2 text-sm text-[#64748B] mb-6">
                    <Calendar className="w-4 h-4" />
                    {new Date(report.created_at).toLocaleDateString()}
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${report.analytical}%` }} />
                    </div>
                    <div className="flex justify-between text-[12px] font-medium text-[#64748B]">
                      <span>Analytical Skill</span>
                      <span>{report.analytical}%</span>
                    </div>
                  </div>

                  <Link 
                    href={`/report/${report.id}`}
                    className="w-full py-3 bg-slate-50 text-[#0F172A] rounded-xl font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-[#059669] group-hover:text-white transition-all"
                  >
                    View Full Report
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
