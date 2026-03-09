-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  analytical INTEGER NOT NULL,
  creativity INTEGER NOT NULL,
  business INTEGER NOT NULL,
  structure INTEGER NOT NULL,
  people INTEGER NOT NULL,
  risk INTEGER NOT NULL,
  primary_stream TEXT NOT NULL,
  secondary_stream TEXT,
  confidence TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can insert only their own data
CREATE POLICY "Users can insert only their own data" 
ON assessments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy 2: Users can select only their own data
CREATE POLICY "Users can select only their own data" 
ON assessments 
FOR SELECT 
USING (auth.uid() = user_id);
