'use client';

import { motion, Variants } from 'framer-motion';
import { Compass, Telescope, Target, ShieldCheck } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      icon: <Compass className="w-6 h-6 text-emerald-950" />,
      title: "Overwhelming Choices",
      description: "Thousands of degrees and career paths leave students paralyzed with indecision about their future.",
    },
    {
      icon: <Telescope className="w-6 h-6 text-indigo-600" />,
      title: "Lack of Clarity",
      description: "Generic advice from counselors doesn't account for unique individual strengths and evolving market demands.",
    },
    {
      icon: <Target className="w-6 h-6 text-purple-600" />,
      title: "Misaligned Goals",
      description: "Students often choose paths based on peer pressure rather than personal aptitude, leading to later dissatisfaction.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-950" />,
      title: "Fear of Making the Wrong Choice",
      description: "The pressure of picking a lifelong career at a young age causes unnecessary stress and anxiety.",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <section className="section-padding bg-white relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 relative inline-block group"
          >
            The Problem With Traditional Guidance
            {/* Animated Underline */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 h-1 bg-[#059669] rounded-full opacity-30"
            />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#475569]"
          >
             Navigating your academic future shouldn&apos;t feel like guessing in the dark.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center flex-col-reverse lg:flex-row">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1"
          >
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 flex flex-col items-start hover:border-teal-200 hover:shadow-lg hover:shadow-emerald-950/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-5">
                  {problem.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{problem.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{problem.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="relative w-full h-[400px] lg:h-[600px] rounded-[32px] overflow-hidden shadow-2xl order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply z-10" />
            <img 
               src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop" 
               alt="Student working and planning" 
               className="absolute inset-0 w-full h-full object-cover grayscale-[20%] transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
