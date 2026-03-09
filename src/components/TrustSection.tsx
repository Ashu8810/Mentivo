'use client';

import { motion } from 'framer-motion';
import { Lock, UserX, UserCheck, Globe } from 'lucide-react';

export function TrustSection() {
  const trustPoints = [
    {
      icon: <Lock className="w-5 h-5 text-gray-500" />,
      text: "Secure data handling"
    },
    {
      icon: <UserX className="w-5 h-5 text-gray-500" />,
      text: "No sign-up required"
    },
    {
      icon: <UserCheck className="w-5 h-5 text-gray-500" />,
      text: "Private & confidential"
    },
    {
      icon: <Globe className="w-5 h-5 text-gray-500" />,
      text: "Accessible globally"
    }
  ];

  return (
    <section className="py-12 border-y border-[#E2E8F0] bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {trustPoints.map((point, index) => (
             <motion.div 
               key={index}
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.4, delay: index * 0.1 }}
               className="flex items-center gap-3"
             >
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                  {point.icon}
                </div>
                <span className="text-sm font-medium text-[#475569]">{point.text}</span>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
