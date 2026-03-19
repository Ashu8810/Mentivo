import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Option, Question } from '@/lib/assessmentData';

interface QuestionCardProps {
  question: Question;
  selectedOptionIndex: number | null;
  onSelectOption: (index: number, option: Option) => void;
  direction: number;
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    };
  }
};

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  selectedOptionIndex, 
  onSelectOption,
  direction 
}) => {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white border border-[var(--color-border-light)] p-6 md:p-10 rounded-3xl shadow-xl shadow-emerald-950/5">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#0F172A] leading-tight flex items-start gap-4">
          <span className="text-[#059669] text-xl opacity-60">Q.</span>
          {question.question}
        </h2>
        
        <div className="space-y-4">
          {question.options.map((option, index) => {
            const isSelected = selectedOptionIndex === index;
            
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelectOption(index, option)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group
                  ${isSelected 
                    ? 'bg-teal-50 border-[#059669] shadow-[0_0_15px_rgba(5,150,105,0.1)]' 
                    : 'bg-white border-[#E2E8F0] hover:border-teal-200 hover:bg-teal-50/50'
                  }
                `}
              >
                <span className={`text-lg transition-colors duration-300 ${isSelected ? 'text-[#0F172A] font-semibold' : 'text-[#475569] group-hover:text-[#0F172A]'}`}>
                  {option.text}
                </span>
                
                <div className={`flex-shrink-0 ml-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300
                  ${isSelected ? 'border-[#059669] bg-[#059669]' : 'border-gray-300 group-hover:border-teal-300'}
                `}>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
