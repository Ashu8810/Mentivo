'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2, PlayCircle, BarChart3, GraduationCap, MapPin } from 'lucide-react';
import Link from 'next/link';


export function Hero() {
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden flex items-center">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-teal-50/50 blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-50/50 blur-3xl opacity-60" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content (60%) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-emerald-950 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-950 animate-pulse" />
              AI-Powered Student Guidance
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.15] mb-6 tracking-tight"
            >
              Find your perfect academic path with <span className="text-[#059669]">Mentivo</span>.
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              className="text-lg md:text-xl text-[#475569] mb-8 max-w-[600px] leading-relaxed"
            >
              Stop guessing your future. Our AI analyzes your skills, interests, and goals to recommend the exact degrees and careers that fit you best.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8"
            >
              <Link 
                href="/assessment"
                className="w-full sm:w-auto group relative flex items-center justify-center gap-2 bg-[#059669] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#047857] transition-all hover:shadow-xl hover:shadow-emerald-950/20 hover:-translate-y-1"
              >
                Start Free Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/demo" className="w-full sm:w-auto flex items-center justify-center gap-2 text-[#0F172A] px-8 py-4 rounded-xl text-base font-semibold border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                <PlayCircle className="w-5 h-5 text-[#475569]" />
                See How It Works
              </Link>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              className="flex items-center gap-6 text-sm text-[#475569] font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Takes less than 3 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No sign-up required</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dashboard Mock (40%) */}
          <div className="lg:col-span-5 relative w-full lg:h-[600px] flex items-center justify-center mt-8 lg:mt-0">
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              className="w-full max-w-[500px] bg-white rounded-2xl border border-[var(--color-border-light)] shadow-2xl shadow-emerald-950/5 p-6 relative z-10"
            >
              {/* Mock Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Your Match</h3>
                  <div className="text-xl font-bold text-[#0F172A] mt-1">Computer Science</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                  <span className="text-emerald-950 font-bold text-lg">98%</span>
                </div>
              </div>

              {/* Mock Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-[#475569]">Analysis Progress</span>
                  <span className="text-[#059669]">Complete</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="h-full bg-[#059669] rounded-full relative"
                  >
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </div>

              {/* Mock Cards */}
              <div className="space-y-4">
                <div className="group p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-teal-200 hover:shadow-md transition-all cursor-pointer flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0F172A] group-hover:text-emerald-950 transition-colors">Skill Compatibility</div>
                    <div className="text-xs text-[#475569]">High aptitude in logic & math</div>
                  </div>
                </div>

                <div className="group p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-teal-200 hover:shadow-md transition-all cursor-pointer flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0F172A] group-hover:text-emerald-950 transition-colors">Top Degree</div>
                    <div className="text-xs text-[#475569]">B.S. Software Engineering</div>
                  </div>
                </div>

                <div className="group p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-teal-200 hover:shadow-md transition-all cursor-pointer flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-950">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0F172A] group-hover:text-emerald-950 transition-colors">Career Pathways</div>
                    <div className="text-xs text-[#475569]">AI Engineer, Data Scientist</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative background circle behind mock */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-teal-50 to-transparent rounded-full -z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
