'use client';

import { motion, Variants } from 'framer-motion';
import { 
  CheckCircle2, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  TrendingUp,
  BarChart3
} from 'lucide-react';

export function WhatYouReceive() {
  const benefits = [
    {
      icon: <GraduationCap className="w-5 h-5 text-emerald-950" />,
      title: "Best-Fit Degree Suggestions",
      description: "Discover the exact university majors that align with your unique aptitude and interests."
    },
    {
      icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
      title: "Real-World Career Pathways",
      description: "Explore concrete job roles you can pursue, complete with day-to-day responsibilities."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-950" />,
      title: "Market Demand Insights",
      description: "Understand the future outlook and average earning potential for your recommended paths."
    },
    {
      icon: <MapPin className="w-5 h-5 text-purple-600" />,
      title: "Actionable Next Steps",
      description: "Get a customized timeline of the exact skills and milestones needed to reach your goal."
    }
  ];

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <section id="what-you-receive" className="section-padding bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left: Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            {/* Background Decoration */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-teal-50 to-indigo-50/50 rounded-[32px] -z-10" />
            
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl shadow-emerald-950/5 p-6 md:p-8 relative">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <div>
                  <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Your Report</div>
                  <div className="text-xl font-bold text-[#0F172A] mt-1">Data Science Pathway</div>
                </div>
                <div className="flex gap-2">
                   <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 text-xs font-semibold border border-emerald-100">High Match</span>
                </div>
              </div>

               <div className="space-y-6">
                 {/* Mock Chart Area */}
                 <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-sm font-semibold text-[#0F172A]">Core Strengths</span>
                       <BarChart3 className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                       {['Analytical Thinking', 'Mathematics', 'Problem Solving'].map((skill, i) => (
                         <div key={i} className="flex items-center gap-3">
                           <div className="w-1/3 text-xs text-[#475569] truncate">{skill}</div>
                           <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                             <div 
                               className="h-full bg-[#059669] rounded-full" 
                               style={{ width: `${90 - (i * 15)}%` }}
                             />
                           </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Mock Path List */}
                 <div>
                    <span className="text-sm font-semibold text-[#0F172A] block mb-3">Recommended Degrees</span>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-teal-100 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                        </div>
                        <div>
                           <div className="text-sm font-bold text-[#0F172A]">B.S. Statistics & Machine Learning</div>
                           <div className="text-xs text-[#475569] mt-1">Perfect blend of math and coding for your profile.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                           <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        </div>
                        <div>
                           <div className="text-sm font-semibold text-[#475569]">B.S. Computer Science</div>
                        </div>
                      </div>
                    </div>
                 </div>

               </div>
            </div>

            {/* Decorative Floating Element */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="hidden md:flex absolute -right-8 -bottom-8 bg-white p-4 rounded-xl shadow-lg border border-gray-100 items-center gap-3 w-48"
            >
               <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
               </div>
               <div>
                 <div className="text-xs text-gray-500 font-medium">Job Growth</div>
                 <div className="text-sm font-bold text-[#0F172A]">+36% by 2030</div>
               </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <motion.h2
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6"
            >
              Everything you need to make a <span className="text-[#059669]">confident decision</span>.
            </motion.h2>
            
            <motion.p
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
               className="text-lg text-[#475569] mb-10 max-w-xl"
            >
              We don&apos;t just give you a generic list. Your personalized report is a comprehensive guide designed to remove uncertainty from your future.
            </motion.p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  custom={index + 2}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUpVariant}
                  className="flex gap-4"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-1">{benefit.title}</h3>
                    <p className="text-[#475569] leading-relaxed max-w-md">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
