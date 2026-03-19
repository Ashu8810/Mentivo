import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const loadingSteps = [
  "Processing cognitive responses...",
  "Analyzing behavioral patterns...",
  "Mapping psychological traits...",
  "Generating career pathways...",
  "Finalizing your report..."
];

export const AnalyzingState: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      {/* Mentivo scanning ring */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 border-t-2 border-b-2 border-[#059669] rounded-full opacity-70"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-2 border-l-2 border-r-2 border-emerald-300 rounded-full opacity-50"
        />
        <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-xl animate-pulse" />
        <span className="text-3xl drop-shadow-md">🧠</span>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#059669] to-teal-600 animate-pulse">
          Analyzing Profile
        </h2>
        <motion.p 
          key={stepIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-[#475569] font-mono text-sm font-medium"
        >
          {loadingSteps[stepIndex]}
        </motion.p>
      </div>
    </div>
  );
};
