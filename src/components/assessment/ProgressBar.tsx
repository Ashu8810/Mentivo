import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[#475569] text-sm font-bold uppercase tracking-wider">
          Analysis Progress
        </span>
        <span className="text-[#059669] font-bold">
          {Math.min(current, total)} <span className="text-[#475569] font-medium">/ {total}</span>
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-[#059669] rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
           <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};
