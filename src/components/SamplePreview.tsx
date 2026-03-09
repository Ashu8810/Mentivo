'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, BrainCircuit } from 'lucide-react';

export function SamplePreview() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="sample" className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-100/50 blur-[100px] -z-10 rounded-full" />
      
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.5 }}
           className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">See a Sample Result</h2>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto">
            Experience the depth of insight you&apos;ll receive after completing the assessment.
          </p>
        </motion.div>

        {/* The Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl shadow-emerald-950/5 overflow-hidden text-left hover:shadow-emerald-950/10 transition-shadow duration-500"
        >
          {/* Card Header */}
          <div className="p-8 pb-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-teal-50/50 to-transparent">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-emerald-950" />
                <span className="text-sm font-bold tracking-wide text-emerald-950 uppercase">AI Match Analysis</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A]">Cognitive Science & HCI</h3>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-500 mb-1">Match Accuracy</span>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-[#0F172A] leading-none">94</span>
                <span className="text-lg font-bold text-gray-400 leading-none">%</span>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
             {/* Progress Animation Row */}
             <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-[#0F172A]">Aptitude Alignment</span>
                  <span className="text-[#059669]">Exceptional</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "94%" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-950 to-indigo-500 rounded-full"
                  />
                </div>
             </motion.div>

             {/* Content Rows */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <motion.div variants={itemVariants} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                     <BrainCircuit className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A] mb-1">Why This Fits You</h4>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      Your profile shows a rare combination of empathetic reasoning and systems thinking—perfect for Human-Computer Interaction.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                     <BookOpen className="w-5 h-5 text-emerald-950" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A] mb-1">Recommended Minors</h4>
                    <p className="text-sm text-[#475569] leading-relaxed">
                       Consider pairing this with Psychology, Data Analytics, or Interactive Media Design.
                    </p>
                  </div>
                </motion.div>
             </div>
          </div>

          {/* Card Footer / Action */}
          <div className="p-6 bg-slate-50 border-t border-gray-100 flex justify-center">
             <a 
                href="/sample-report" 
                className="group flex items-center gap-2 text-sm font-semibold text-[#0F172A] hover:text-[#059669] transition-colors py-2 px-4 rounded-lg hover:bg-white border border-transparent hover:border-gray-200"
             >
                View Full Sample Report
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
