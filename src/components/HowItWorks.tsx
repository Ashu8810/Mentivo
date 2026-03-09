'use client';

import { motion } from 'framer-motion';
import { UserCircle2, BrainCircuit, Sparkles } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <UserCircle2 className="w-8 h-8 text-[#059669]" />,
      title: "Tell Us About You",
      description: "Answer a few questions about your interests, strengths, and goals in our quick assessment.",
      bgColor: "bg-teal-50",
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-indigo-600" />,
      title: "AI Analysis",
      description: "Our core engine processes your profile against thousands of successful academic pathways.",
      bgColor: "bg-indigo-50",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-600" />,
      title: "Get Matched",
      description: "Receive personalized degree recommendations and career roadmaps tailored just for you.",
      bgColor: "bg-purple-50",
    }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4"
          >
            How <span className="text-[#059669]">Mentivo</span> Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
             className="text-lg text-[#475569]"
          >
            Three simple steps to unlock your personalized academic roadmap.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-teal-100 via-indigo-200 to-purple-100 z-0 overflow-hidden">
             <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-[#059669] via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
             />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Number Badge */}
                <div className="absolute -top-4 -right-2 w-8 h-8 rounded-full bg-white border-2 border-[#E2E8F0] text-[#475569] font-bold flex items-center justify-center text-sm shadow-sm z-20 group-hover:border-blue-400 group-hover:text-emerald-950 transition-colors">
                  {index + 1}
                </div>

                {/* Icon Container */}
                <div className={`w-24 h-24 rounded-full ${step.bgColor} shadow-inner border border-white flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-300 ease-out z-10`}>
                  <div className="absolute inset-0 rounded-full bg-white opacity-50 backdrop-blur-sm group-hover:opacity-0 transition-opacity" />
                  <div className="relative z-10">{step.icon}</div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">{step.title}</h3>
                <p className="text-[#475569] leading-relaxed max-w-[280px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
