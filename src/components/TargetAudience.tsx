'use client';

import { motion } from 'framer-motion';
import { BookOpen, School, GraduationCap } from 'lucide-react';

export function TargetAudience() {
  const personas = [
    {
      icon: <BookOpen className="w-8 h-8 text-emerald-950" />,
      title: "High School Students",
      description: "Get early direction on which subjects to focus on and explore potential career pathways before applying to college.",
      tag: "Exploration Phase"
    },
    {
      icon: <School className="w-8 h-8 text-indigo-600" />,
      title: "Pre-University Students",
      description: "Make confident decisions about your major and choose the right university programs that fit your profile.",
      tag: "Decision Phase"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-purple-600" />,
      title: "Undergraduates",
      description: "Realign your current path or discover specializations, minors, and post-grad opportunities tailored to you.",
      tag: "Refinement Phase"
    }
  ];

  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4"
          >
            Who is <span className="text-[#059669]">Mentivo</span> For?
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="text-lg text-[#475569]"
          >
            Guidance tailored specifically for where you are in your academic journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content Cards */}
          <div className="flex flex-col gap-6">
            {personas.map((persona, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:shadow-emerald-950/5 hover:border-teal-200 transition-all group flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-teal-50 transition-colors">
                  {persona.icon}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#059669] transition-colors">{persona.title}</h3>
                    <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1 bg-gray-100 text-[#475569] rounded-full group-hover:bg-teal-100 group-hover:text-emerald-950 transition-colors">
                      {persona.tag}
                    </span>
                  </div>
                  <p className="text-[#475569] leading-relaxed">
                    {persona.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[500px] lg:h-[600px] rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" 
              alt="Students collaborating" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Overlay badge */}
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-lg">Join 10,000+ Students</p>
                <p className="text-sm text-white/80">Taking control of their future.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
