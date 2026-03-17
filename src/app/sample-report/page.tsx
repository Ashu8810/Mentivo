'use client';

import Link from "next/link";
import { ArrowLeft, Download, RotateCcw, TrendingUp, Target, Activity, ShieldAlert, BarChart, Eye, CheckCircle2 } from "lucide-react";

export default function SampleReportPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24 text-slate-800">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/#sample" className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 rounded-sm bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border border-slate-200">
               Sample Analytical View
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
            <span className="text-sm font-semibold text-slate-400">Report ID: MNT-88X2-94A</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              value="82%" 
              label="Science Alignment" 
              subtext="Strong Match" 
              trend="up"
            />
            <MetricCard 
              value="68%" 
              label="Commerce Alignment" 
              subtext="Moderate" 
              trend="neutral"
            />
            <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px] flex flex-col justify-center">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Profile Type</span>
              <div className="inline-flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-md border border-indigo-100 mb-2">
                Analytical–Structured
              </div>
              <span className="text-xs text-slate-400 font-medium mt-auto">Dominant cognitive pattern</span>
            </div>
            <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px] flex flex-col justify-center">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Confidence Index</span>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-900 tracking-tight">High</span>
                <span className="text-lg font-bold text-emerald-600 mb-1">(87%)</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Trait consistency across responses.</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 — TRAIT RADAR + BAR COMBINATION */}
        <section>
           <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6 border-b border-slate-200 pb-2">Cognitive Trait Mapping</h2>
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
             {/* LEFT — Radar Chart */}
             <div className="lg:col-span-4 bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px] flex flex-col items-center justify-center min-h-[400px]">
                <RadarChart />
             </div>
             {/* RIGHT — Trait Breakdown Table */}
             <div className="lg:col-span-8 bg-white rounded-[14px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                        <th className="p-4 font-bold">Trait Axis</th>
                        <th className="p-4 font-bold">Raw Score</th>
                        <th className="p-4 font-bold">Interpretation</th>
                        <th className="p-4 font-bold">Weight Impact</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-teal-700">Analytical</td>
                        <td className="p-4 font-bold text-slate-900">18 / 20</td>
                        <td className="p-4 text-slate-600">High logical deduction capacity</td>
                        <td className="p-4 font-medium"><span className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs border border-teal-100">Strong Science Influence</span></td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-indigo-700">Structure</td>
                        <td className="p-4 font-bold text-slate-900">14 / 20</td>
                        <td className="p-4 text-slate-600">Prefers systematic workflows</td>
                        <td className="p-4 font-medium"><span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs border border-indigo-100">Stability Alignment</span></td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-4 font-semibold border-l-2 border-transparent">Risk Tolerance</td>
                        <td className="p-4 font-bold text-slate-900">12 / 20</td>
                        <td className="p-4 text-slate-600">Calculated decision making</td>
                        <td className="p-4 font-medium"><span className="text-slate-500">Moderate Impact</span></td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-4 font-semibold border-l-2 border-transparent">Business Acumen</td>
                        <td className="p-4 font-bold text-slate-900">10 / 20</td>
                        <td className="p-4 text-slate-600">Average market orientation</td>
                        <td className="p-4 font-medium"><span className="text-slate-500">Neutral</span></td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-4 font-semibold border-l-2 border-transparent">Creativity</td>
                        <td className="p-4 font-bold text-slate-900">9 / 20</td>
                        <td className="p-4 text-slate-600">Follows established patterns</td>
                        <td className="p-4 font-medium"><span className="text-slate-500">Low Art Influence</span></td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold border-l-2 border-transparent">People Orientation</td>
                        <td className="p-4 font-bold text-slate-900">8 / 20</td>
                        <td className="p-4 text-slate-600">Independent working style</td>
                        <td className="p-4 font-medium"><span className="text-slate-500">Low Impact</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </div>
           </div>
        </section>

        {/* SECTION 3 & 4 — STREAM SCORING MODEL EXPLAINED + COMPARISON */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SECTION 4 — STREAM COMPARISON BAR GRAPH */}
          <section className="lg:col-span-8 bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px]">
            <div className="flex justify-between flex-wrap gap-4 items-end mb-8">
              <h2 className="text-lg font-bold tracking-tight text-slate-900">Stream Alignment Vectors</h2>
              <div className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded flex items-center gap-1.5 border border-green-200">
                <TrendingUp className="w-3.5 h-3.5" />
                Science +14% above Commerce
              </div>
            </div>
            <div className="space-y-6">
              <ProgressBar label="Science" score={82} color="bg-teal-600" active />
              <ProgressBar label="Commerce" score={68} color="bg-slate-400" />
              <ProgressBar label="Arts & Humanities" score={45} color="bg-slate-300" />
            </div>
          </section>

          {/* SECTION 3 — STREAM SCORING MODEL */}
          <section className="lg:col-span-4 bg-slate-900 rounded-[14px] text-zinc-300 p-[28px] flex flex-col items-start border border-slate-800 shadow-xl">
             <div className="flex items-center gap-2 mb-6">
               <Activity className="w-5 h-5 text-teal-400" />
               <h2 className="text-lg font-bold text-white tracking-tight">Scoring Model</h2>
             </div>
             <p className="text-sm text-slate-400 mb-6 leading-relaxed">
               Algorithm relies on a weighted distribution of prime traits to calculate the final vector alignment.
             </p>
             <div className="w-full bg-slate-800/50 rounded-lg p-4 font-mono text-sm border border-slate-700/50">
               <div className="text-slate-400 mb-2 font-semibold">Science Score Formula:</div>
               <div className="text-teal-300 mb-4 break-words">
                 (Analytical × 0.4) + (Structure × 0.3) + (Risk × 0.3)
               </div>
               <div className="text-slate-400 mb-2 font-semibold">Calculation:</div>
               <div className="text-white flex items-center justify-between">
                 <span>(18×0.4) + (14×0.3) + (12×0.3)</span>
                 <span className="text-teal-400 font-bold">= 82%</span>
               </div>
             </div>
          </section>
        </div>

        {/* SECTION 5 & 6 — RESPONSE CONSISTENCY & DEGREE HEATMAP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SECTION 5 — RESPONSE CONSISTENCY INDEX */}
          <section className="lg:col-span-4 bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px]">
             <h2 className="text-lg font-bold tracking-tight text-slate-900 mb-6 flex items-center gap-2">
               <Target className="w-5 h-5 text-indigo-500" />
               Validation Index
             </h2>
             <div className="flex items-end gap-3 mb-4">
                <span className="text-5xl font-black text-slate-900 tracking-tighter">87</span>
                <span className="text-2xl font-bold text-slate-400 mb-1">%</span>
             </div>
             <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
               <div className="h-full bg-indigo-500 rounded-full" style={{ width: '87%' }} />
             </div>
             <p className="text-sm text-slate-600 font-medium leading-relaxed">
               <strong className="text-slate-900">Reliable Data.</strong> High internal alignment detected between abstract thinking style and concrete subject preferences across the 65 data points.
             </p>
          </section>

          {/* SECTION 6 — DEGREE CLUSTER MAPPING */}
          <section className="lg:col-span-8 bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px]">
             <h2 className="text-lg font-bold tracking-tight text-slate-900 mb-6">Degree Cluster Heatmap</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border-2 border-teal-500 bg-teal-50/30">
                  <div className="text-teal-800 font-bold text-sm uppercase tracking-wider mb-2">Technology Cluster</div>
                  <div className="text-3xl font-black text-teal-900 mb-2">78%</div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className={`h-1.5 flex-1 rounded-sm ${i <= 4 ? 'bg-teal-500' : 'bg-teal-200'}`} />)}
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="text-slate-600 font-bold text-sm uppercase tracking-wider mb-2">Finance Cluster</div>
                  <div className="text-3xl font-black text-slate-800 mb-2">64%</div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className={`h-1.5 flex-1 rounded-sm ${i <= 3 ? 'bg-slate-400' : 'bg-slate-200'}`} />)}
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="text-slate-600 font-bold text-sm uppercase tracking-wider mb-2">Creative Cluster</div>
                  <div className="text-3xl font-black text-slate-800 mb-2">48%</div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className={`h-1.5 flex-1 rounded-sm ${i <= 2 ? 'bg-slate-400' : 'bg-slate-200'}`} />)}
                  </div>
                </div>
             </div>
          </section>
        </div>

        {/* SECTION 7 & 8 — CAREER MATCH + RISK/ACADEMIC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
           {/* SECTION 7 — CAREER MATCH PROBABILITY */}
           <section className="lg:col-span-8 bg-white rounded-[14px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-[28px] border-b border-slate-100">
                <h2 className="text-lg font-bold tracking-tight text-slate-900">Target Career Probabilities</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="p-4 pl-[28px] font-bold">Career Designation</th>
                      <th className="p-4 font-bold">Match Prob.</th>
                      <th className="p-4 font-bold">Primary Skill Alignment</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-slate-100">
                      <td className="p-4 pl-[28px] font-semibold text-slate-900">Software Engineer</td>
                      <td className="p-4 font-bold text-teal-600">84%</td>
                      <td className="p-4 text-slate-600">High Analytical, High Logic</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-4 pl-[28px] font-semibold text-slate-900">Data Analyst</td>
                      <td className="p-4 font-bold text-teal-600">79%</td>
                      <td className="p-4 text-slate-600">Logical Deduction, Structured</td>
                    </tr>
                    <tr>
                      <td className="p-4 pl-[28px] font-semibold text-slate-900">Product Engineer</td>
                      <td className="p-4 font-bold text-indigo-600">72%</td>
                      <td className="p-4 text-slate-600">System Design, Mid-Creativity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
           </section>

           {/* SECTION 8 — RISK & ACADEMIC PRESSURE FIT */}
           <section className="lg:col-span-4 space-y-4 text-sm">
              <div className="bg-white rounded-[14px] border border-amber-200/60 shadow-sm p-5 border-l-4 border-l-amber-400">
                 <div className="flex gap-3">
                   <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                   <div>
                     <div className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1">Competitive Exam Readiness</div>
                     <div className="font-semibold text-amber-700 text-lg mb-1">Moderate-High</div>
                     <div className="text-slate-600">Shows resilience for high-pressure academic scenarios (e.g., JEE/NEET).</div>
                   </div>
                 </div>
              </div>
              <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-5 border-l-4 border-l-slate-400">
                 <div className="flex gap-3">
                   <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                   <div>
                     <div className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1">Long-Term Study Commitment</div>
                     <div className="font-semibold text-slate-700 text-lg mb-1">Stable</div>
                     <div className="text-slate-600">Suitable for 4-5 year rigorous technical degree programs.</div>
                   </div>
                 </div>
              </div>
           </section>
        </div>

        {/* SECTION 9 — STRATEGIC RECOMMENDATION SUMMARY */}
        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6 border-b border-slate-200 pb-2">Strategic Pathway Directives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-teal-900 rounded-[14px] border border-teal-800 shadow-xl p-[28px] text-white">
               <span className="inline-block px-2 py-1 bg-teal-800 text-teal-300 text-[10px] font-black uppercase tracking-widest rounded mb-6">Primary Path</span>
               <h3 className="text-2xl font-bold mb-2">Science</h3>
               <p className="text-teal-200/80 text-sm font-medium leading-relaxed">Technology-Oriented. High probability of success in Engineering and Applied Sciences based on analytical dominance.</p>
             </div>
             <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px]">
               <span className="inline-block px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded mb-6 border border-slate-200">Secondary Path</span>
               <h3 className="text-2xl font-bold text-slate-900 mb-2">Commerce</h3>
               <p className="text-slate-600 text-sm font-medium leading-relaxed">Analytics-Focused. Viable alternative leveraging structural preference for Economics or Data-heavy Finance roles.</p>
             </div>
             <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px] opacity-70">
               <span className="inline-block px-2 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded mb-6 border border-slate-100">Exploratory Path</span>
               <h3 className="text-2xl font-bold text-slate-700 mb-2">Applied Arts</h3>
               <p className="text-slate-500 text-sm font-medium leading-relaxed">Optional mapping. Requires significant upskilling in creative dimensions to reach competitive parity.</p>
             </div>
          </div>
        </section>

        {/* SECTION 10 — ACTION ANALYTICS PANEL */}
        <section className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px] border-t-4 border-t-slate-800 flex flex-col items-center">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 mb-2 text-center">Analytic Review Complete</h2>
            <p className="text-slate-500 text-sm mb-8 text-center max-w-md">Data compiled from 65 internal assessment vectors. Select your preferred next action.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <button className="flex items-center justify-center gap-2 p-4 rounded-lg bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors">
                <BarChart className="w-4 h-4" />
                Compare Sci vs Com
              </button>
              <button className="flex items-center justify-center gap-2 p-4 rounded-lg bg-teal-50 text-teal-700 font-semibold text-sm hover:bg-teal-100 transition-colors border border-teal-200">
                <Download className="w-4 h-4" />
                Download Report (.pdf)
              </button>
              <button className="flex items-center justify-center gap-2 p-4 rounded-lg bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm">
                <Eye className="w-4 h-4 text-indigo-500" />
                View Skill Gap Analysis
              </button>
              <button className="flex items-center justify-center gap-2 p-4 rounded-lg bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm">
                <RotateCcw className="w-4 h-4 text-slate-400" />
                Retake Assessment
              </button>
            </div>
        </section>

      </main>
    </div>
  );
}

// Helper Components
function MetricCard({ value, label, subtext, trend }: { value: string, label: string, subtext: string, trend: 'up' | 'down' | 'neutral' }) {
  return (
    <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-[28px] flex flex-col relative overflow-hidden group hover:border-teal-200 transition-colors">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-full -z-0 opacity-50 group-hover:from-teal-50/50 transition-colors" />
      <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 relative z-10">{label}</span>
      <div className="text-4xl font-extrabold text-slate-900 tracking-tighter mb-1 relative z-10">{value}</div>
      <div className={`text-sm font-medium relative z-10 ${trend === 'up' ? 'text-teal-600' : 'text-slate-400'}`}>
        {subtext}
      </div>
    </div>
  );
}

function ProgressBar({ label, score, color, active = false }: { label: string, score: number, color: string, active?: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-bold text-slate-700">
        <span className={active ? "text-teal-700" : ""}>{label}</span>
        <span className="text-slate-900 font-black">{score}%</span>
      </div>
      <div className="h-4 w-full bg-slate-100 rounded overflow-hidden flex">
        <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
        {/* Remaining filler pattern */}
        <div className="flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBMMjAgMEgxMkwwIDEyVjIweiIgZmlsbD0iI2UzZTg1ZiIgZmlsbC1vcGFjaXR5PSIwLjUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-30" />
      </div>
    </div>
  );
}

// Simple Radar SVG specifically for Data-heavy aesthetic
function RadarChart() {
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
          
          {/* Grid Hexagons */}
          {[20, 40, 60, 80, 100].map((r, i) => (
             <polygon 
               key={i}
               points={`50,${50-r*0.5} ${50+r*0.43*0.866},${50-r*0.43*0.5} ${50+r*0.43*0.866},${50+r*0.43*0.5} 50,${50+r*0.5} ${50-r*0.43*0.866},${50+r*0.43*0.5} ${50-r*0.43*0.866},${50-r*0.43*0.5}`}
               fill="none"
               stroke={i === 4 ? "#cbd5e1" : "#f1f5f9"}
               strokeWidth="0.5"
             />
          ))}

          {/* Connectors */}
          <line x1="50" y1="50" x2="50" y2="0" stroke="#cbd5e1" strokeWidth="0.5"/>
          <line x1="50" y1="50" x2="93.3" y2="25" stroke="#cbd5e1" strokeWidth="0.5"/>
          <line x1="50" y1="50" x2="93.3" y2="75" stroke="#cbd5e1" strokeWidth="0.5"/>
          <line x1="50" y1="50" x2="50" y2="100" stroke="#cbd5e1" strokeWidth="0.5"/>
          <line x1="50" y1="50" x2="6.7" y2="75" stroke="#cbd5e1" strokeWidth="0.5"/>
          <line x1="50" y1="50" x2="6.7" y2="25" stroke="#cbd5e1" strokeWidth="0.5"/>

          {/* Data Polygon 
             Scale mapping (roughly):
             Analytical: 18/20 = 90% (y=5 -> 50-(50*0.9)=5)
             Structure: 14/20 = 70%
             People: 8/20 = 40%
             Risk: 12/20 = 60%
             Creativity: 9/20 = 45%
             Business: 10/20 = 50%
          */}
          <polygon
             points={`
               50,5
               80.31,32.5
               67.32,60
               50,80
               30.5,61.25
               28.35,37.5
             `}
             fill="rgba(13, 148, 136, 0.2)"
             stroke="#0f766e"
             strokeWidth="1.5"
          />
          
          {/* Points */}
          <circle cx="50" cy="5" r="1.5" fill="#0f766e" />
          <circle cx="80.31" cy="32.5" r="1.5" fill="#0f766e" />
          <circle cx="67.32" cy="60" r="1.5" fill="#0f766e" />
          <circle cx="50" cy="80" r="1.5" fill="#0f766e" />
          <circle cx="30.5" cy="61.25" r="1.5" fill="#0f766e" />
          <circle cx="28.35" cy="37.5" r="1.5" fill="#0f766e" />
       </svg>
    </div>
  )
}
