-- We will create new tables as per the approved implementation plan.
-- These tables perfectly map to the dynamic JSON questions and 5 traits.

-- 1. Assessments Table
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    student_level VARCHAR(50) NOT NULL, -- '10th', '12th', 'college'
    status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 2. Results Table
CREATE TABLE IF NOT EXISTS public.assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    trait_scores JSONB NOT NULL,
    top_recommendation VARCHAR(100) NOT NULL,
    secondary_recommendation VARCHAR(100),
    confidence_score INTEGER,
    report_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Enable RLS
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

-- Policies for assessments
CREATE POLICY "Users can insert their own assessments" 
ON public.assessments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own assessments" 
ON public.assessments FOR SELECT USING (auth.uid() = user_id);

-- Policies for assessment_results
CREATE POLICY "Users can insert their own results" 
ON public.assessment_results FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own results" 
ON public.assessment_results FOR SELECT USING (auth.uid() = user_id);
