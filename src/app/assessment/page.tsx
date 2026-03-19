"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { assessmentQuestions } from '@/lib/assessmentData';
import { calculateScores, generateRecommendation } from '@/lib/scoringEngine';
import { supabase } from '@/lib/supabaseClient';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ProgressBar } from '@/components/assessment/ProgressBar';
import { AnalyzingState } from '@/components/assessment/AnalyzingState';
import { ArrowRight } from 'lucide-react';

export default function AssessmentPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [direction, setDirection] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [level, setLevel] = useState<'10th' | '12th' | 'college' | null>(null);

  const currentQuestion = assessmentQuestions[currentIndex];

  const handleSelectLevel = (selectedLevel: '10th' | '12th' | 'college') => {
    setLevel(selectedLevel);
  };

  const handleSelectOption = async (optionIndex: number, option: any) => {
    const newAnswers = [...answers, { questionId: currentQuestion.id, selectedOption: option }];
    setAnswers(newAnswers);

    if (currentIndex < assessmentQuestions.length - 1) {
      setDirection(1);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 400);
    } else {
      setIsAnalyzing(true);
      
      const scores = calculateScores(newAnswers);
      const recommendation = generateRecommendation(scores, level || '10th');
      let dbSuccess = false;

      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
           const { data: assessmentData, error: assessmentError } = await supabase
            .from('assessments')
            .insert([{ 
              user_id: user?.id, 
              student_level: level || '10th',
              status: 'completed'
            }])
            .select()
            .single();

          if (assessmentError) throw assessmentError;

          const { error: resultError } = await supabase
            .from('assessment_results')
            .insert([{
              assessment_id: assessmentData.id,
              user_id: user?.id,
              trait_scores: scores,
              top_recommendation: recommendation.recommendation.primary,
              secondary_recommendation: recommendation.recommendation.secondary,
              confidence_score: recommendation.confidence,
              report_data: recommendation
            }]);

          if (resultError) throw resultError;
          
          dbSuccess = true;
          setTimeout(() => {
            router.push(`/assessment/result/${assessmentData.id}`);
          }, 3000);
        }

      } catch (error) {
        console.error("Error saving assessment:", error);
        // We do not alert here anymore. We will silently fallback to local storage so the user experience continues.
      }

      // Guest / Fallback Mode (If no user, or if DB insertion failed)
      if (!dbSuccess) {
        localStorage.setItem('guest_result', JSON.stringify({ recommendation, scores, level: level || '10th' }));
        setTimeout(() => {
          router.push(`/assessment/result/guest`);
        }, 3000);
      }
    }
  };

  if (!level) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center p-6 text-[#0F172A] relative overflow-hidden">
        {/* Mentivo Background Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-teal-50/50 blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-50/50 blur-3xl opacity-60 pointer-events-none" />
        
        <div className="max-w-xl w-full text-center space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-emerald-950 text-sm font-medium mx-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-950 animate-pulse" />
            System Calibration
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.15] tracking-tight">
            Personalize Your <span className="text-[#059669]">Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-[#475569] leading-relaxed">
            Select your current academic stage so our AI can accurately calibrate the mapping algorithm to your specific educational milestone.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-4">
            {['10th', '12th', 'college'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => handleSelectLevel(lvl as any)}
                className="group relative flex items-center justify-center gap-2 bg-white text-[#0F172A] px-8 py-6 rounded-2xl border border-[#E2E8F0] text-lg font-semibold hover:bg-teal-50/50 hover:border-teal-200 hover:shadow-lg transition-all hover:-translate-y-1 capitalize"
              >
                {lvl} Grade
                <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#059669]" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center py-12 px-6 relative overflow-hidden text-[#0F172A]">
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-teal-50/50 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-50/50 blur-3xl opacity-60 pointer-events-none" />

      {isAnalyzing ? (
        <AnalyzingState />
      ) : (
        <div className="w-full max-w-4xl flex flex-col items-center justify-center min-h-[70vh] relative z-10">
          <ProgressBar current={currentIndex + 1} total={assessmentQuestions.length} />
          
          <div className="w-full relative overflow-hidden h-auto min-h-[400px] flex items-center justify-center py-8">
            <QuestionCard 
              key={currentIndex}
              question={currentQuestion}
              selectedOptionIndex={null}
              onSelectOption={handleSelectOption}
              direction={direction}
            />
          </div>
        </div>
      )}
    </div>
  );
}
