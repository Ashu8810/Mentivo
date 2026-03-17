'use client';

import { useEffect, useState, use } from 'react';
import Link from "next/link";
import { 
  ArrowLeft, 
  Download, 
  RotateCcw, 
  Activity, 
  ShieldAlert, 
  BarChart, 
  Eye, 
  TrendingUp,
  Loader2
} from "lucide-react";
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

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
      <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24 text-slate-800">
        {/* Top Navigation */}
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
          <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-3">
               <div className="px-3 py-1 rounded-sm bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border border-slate-200">
                 Full Analytical View
               </div>
            </div>
          </div>
        </header>

        {/* Main Container - 1200px Max Width */}
        <main className="max-w-[1200px] mx-auto px-6 pt-32 space-y-[72px]">
          
          {/* SECTION 1 — KPI METRIC HEADER */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Psychometric Alignment Metrics</h1>
              <span className="text-sm font-semibold text-slate-400">Report ID: {report.id.substring(0, 8).toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard 
                value={`${report.analytical}%`} 
                label="Analytical Score" 
                subtext={report.analytical >= 80 ? "Exceptional" : "Strong Match"} 
                trend="up"
              />
              <MetricCard 
                value={`${report.creativity}%`} 
                label="Creativity Index" 
                subtext={report.creativity >= 70 ? "Strong" : "Moderate"} 
                trend="neutral"
              />
              <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px] flex flex-col justify-center text-center">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Primary Stream</span>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-md border border-emerald-100 mb-2">
                  {report.primary_stream}
                </div>
                <span className="text-xs text-slate-400 font-medium mt-auto">Highest matching vector</span>
              </div>
              <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px] flex flex-col justify-center">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Confidence Index</span>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">{parseInt(report.confidence) >= 80 ? "High" : "Mid"}</span>
                  <span className="text-lg font-bold text-emerald-600 mb-1">({report.confidence}%)</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">Trait consistency score.</span>
              </div>
            </div>
          </section>

          {/* SECTION 2 — TRAIT RADAR + TABLE */}
          <section>
             <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6 border-b border-slate-200 pb-2">Cognitive Trait Mapping</h2>
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
               {/* LEFT — Radar Chart Mockup */}
               <div className="lg:col-span-4 bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px] flex flex-col items-center justify-center min-h-[400px]">
                  <RadarChart report={report} />
               </div>
               {/* RIGHT — Trait Breakdown Table */}
               <div className="lg:col-span-8 bg-white rounded-[14px] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                          <th className="p-4 font-bold">Trait Axis</th>
                          <th className="p-4 font-bold">Score</th>
                          <th className="p-4 font-bold">Interpretation</th>
                          <th className="p-4 font-bold">Alignment</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <TraitRow label="Analytical" score={report.analytical} />
                        <TraitRow label="Structure" score={report.structure} />
                        <TraitRow label="Risk Tolerance" score={report.risk} />
                        <TraitRow label="Business Acumen" score={report.business} />
                        <TraitRow label="Creativity" score={report.creativity} />
                        <TraitRow label="People Orientation" score={report.people} />
                      </tbody>
                    </table>
                  </div>
               </div>
             </div>
          </section>

          {/* SECTION 3 & 4 — STREAM ANALYSIS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-8 bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px]">
              <div className="flex justify-between flex-wrap gap-4 items-end mb-8">
                <h2 className="text-lg font-bold tracking-tight text-slate-900">Alignment Probability</h2>
                <div className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded flex items-center gap-1.5 border border-green-200">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Optimal: {report.primary_stream}
                </div>
              </div>
              <div className="space-y-6">
                <ProgressBar label={report.primary_stream} score={92} color="bg-emerald-600" active />
                <ProgressBar label={report.secondary_stream} score={74} color="bg-indigo-400" />
                <ProgressBar label="Alternative Path" score={45} color="bg-slate-300" />
              </div>
            </section>

            <section className="lg:col-span-4 bg-slate-900 rounded-[14px] text-zinc-300 p-[28px] flex flex-col items-start border border-slate-800 shadow-xl">
               <div className="flex items-center gap-2 mb-6">
                 <Activity className="w-5 h-5 text-teal-400" />
                 <h2 className="text-lg font-bold text-white tracking-tight">Logic Model</h2>
               </div>
               <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                 Alignment is calculated based on weighted distribution of your top 3 traits.
               </p>
               <div className="w-full bg-slate-800/50 rounded-lg p-4 font-mono text-[12px] border border-slate-700/50">
                 <div className="text-slate-400 mb-2 font-semibold">Primary Matching Vector:</div>
                 <div className="text-teal-300 mb-2 break-words">
                   {report.primary_stream}
                 </div>
                 <div className="text-slate-500 mt-4 italic">
                   Dominance: {(report.analytical + report.structure) / 2}% combined precision in core metrics.
                 </div>
               </div>
            </section>
          </div>

          {/* SECTION 5 — ACTION PANEL */}
          <section className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px] border-t-4 border-t-emerald-600 flex flex-col items-center">
              <h2 className="text-lg font-bold tracking-tight text-slate-900 mb-2 text-center">Pathway Verified</h2>
              <p className="text-slate-500 text-sm mb-8 text-center max-w-md">Your psychometric data reveals a strong alignment with {report.primary_stream}.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <button className="flex items-center justify-center gap-2 p-4 rounded-lg bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors">
                  <BarChart className="w-4 h-4" />
                  View Skill Gaps
                </button>
                <button className="flex items-center justify-center gap-2 p-4 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-sm hover:bg-emerald-100 transition-colors border border-emerald-200">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="flex items-center justify-center gap-2 p-4 rounded-lg bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm">
                  <Eye className="w-4 h-4 text-indigo-500" />
                  Stream Comparison
                </button>
                <button 
                  onClick={() => router.push('/assessment')}
                  className="flex items-center justify-center gap-2 p-4 rounded-lg bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm"
                >
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  Retake Assessment
                </button>
              </div>
          </section>

        </main>
      </div>
    </ProtectedRoute>
  );
}

// Helper Components
function MetricCard({ value, label, subtext, trend }: { value: string, label: string, subtext: string, trend: 'up' | 'down' | 'neutral' }) {
  return (
    <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px] flex flex-col relative overflow-hidden group hover:border-emerald-200 transition-colors">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-full -z-0 opacity-50 group-hover:from-emerald-50/50 transition-colors" />
      <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 relative z-10">{label}</span>
      <div className="text-4xl font-extrabold text-slate-900 tracking-tighter mb-1 relative z-10">{value}</div>
      <div className={`text-sm font-medium relative z-10 ${trend === 'up' ? 'text-emerald-600' : 'text-slate-400'}`}>
        {subtext}
      </div>
    </div>
  );
}

function TraitRow({ label, score }: { label: string, score: number }) {
  const getInterpretation = (l: string, s: number) => {
    if (s >= 80) return "High performance indicator";
    if (s >= 60) return "Above average capacity";
    return "Standard development range";
  };

  const getColor = (s: number) => {
    if (s >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-100";
    if (s >= 60) return "text-indigo-700 bg-indigo-50 border-indigo-100";
    return "text-slate-600 bg-slate-50 border-slate-100";
  };

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
      <td className="p-4 font-semibold text-slate-800">{label}</td>
      <td className="p-4 font-bold text-slate-900">{score}%</td>
      <td className="p-4 text-slate-600">{getInterpretation(label, score)}</td>
      <td className="p-4">
        <span className={`px-2 py-1 rounded text-[11px] font-bold border ${getColor(score)} uppercase`}>
          {score >= 80 ? "Dominant" : score >= 60 ? "Stable" : "Standard"}
        </span>
      </td>
    </tr>
  );
}

function ProgressBar({ label, score, color, active = false }: { label: string, score: number, color: string, active?: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-bold text-slate-700">
        <span className={active ? "text-emerald-700" : ""}>{label}</span>
        <span className="text-slate-900 font-black">{score}%</span>
      </div>
      <div className="h-4 w-full bg-slate-100 rounded overflow-hidden flex">
        <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function RadarChart({ report }: { report: Assessment }) {
  // Simple polygon mapping based on scores
  const getPoint = (score: number, angle: number) => {
    const r = (score / 100) * 45;
    const rad = (angle - 90) * (Math.PI / 180);
    return `${50 + r * Math.cos(rad)},${50 + r * Math.sin(rad)}`;
  };

  const points = [
    getPoint(report.analytical, 0),
    getPoint(report.structure, 60),
    getPoint(report.people, 120),
    getPoint(report.risk, 180),
    getPoint(report.creativity, 240),
    getPoint(report.business, 300)
  ].join(' ');

  return (
    <div className="relative w-full max-w-[280px] aspect-square">
       <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Axis labels */}
          <text x="50" y="-5" fontSize="4" fontWeight="bold" fill="#334155" textAnchor="middle">Analytical</text>
          <text x="105" y="25" fontSize="4" fontWeight="bold" fill="#334155" textAnchor="start">Structure</text>
          <text x="105" y="75" fontSize="4" fontWeight="bold" fill="#334155" textAnchor="start">People</text>
          <text x="50" y="105" fontSize="4" fontWeight="bold" fill="#334155" textAnchor="middle">Risk</text>
          <text x="-5" y="75" fontSize="4" fontWeight="bold" fill="#334155" textAnchor="end">Creativity</text>
          <text x="-5" y="25" fontSize="4" fontWeight="bold" fill="#334155" textAnchor="end">Business</text>
          
          {/* Grid Circles */}
          {[20, 40, 60, 80, 100].map((r, i) => (
             <circle 
               key={i}
               cx="50" cy="50" r={r/2}
               fill="none"
               stroke={i === 4 ? "#cbd5e1" : "#f1f5f9"}
               strokeWidth="0.5"
             />
          ))}

          {/* Connectors */}
          {[0, 60, 120, 180, 240, 300].map(angle => (
            <line 
              key={angle}
              x1="50" y1="50" 
              x2={50 + 50 * Math.cos((angle - 90) * Math.PI / 180)} 
              y2={50 + 50 * Math.sin((angle - 90) * Math.PI / 180)} 
              stroke="#cbd5e1" strokeWidth="0.5"
            />
          ))}

          {/* Data Polygon */}
          <polygon
             points={points}
             fill="rgba(16, 185, 129, 0.2)"
             stroke="#059669"
             strokeWidth="1.5"
          />
       </svg>
    </div>
  )
}
