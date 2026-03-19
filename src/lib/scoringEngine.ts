import { TraitScores } from './assessmentData';

export function calculateScores(answers: any[]): TraitScores {
  const totals: TraitScores = { analytical: 0, creativity: 0, business: 0, social: 0, practical: 0 };
  
  answers.forEach(answer => {
    // Expected answer format: { questionId: string, selectedOption: Option }
    if (answer?.selectedOption?.scores) {
      const optionScores = answer.selectedOption.scores;
      for (const [trait, value] of Object.entries(optionScores)) {
        totals[trait as keyof TraitScores] += (value as number);
      }
    }
  });
  
  return totals;
}

export type AssessmentResultData = {
  recommended: string;
  why: string;
  strengths: string[];
  careers: string[];
  secondary: string;
  confidence: number;
};

export function generateRecommendation(scores: TraitScores, userLevel: string): AssessmentResultData {
  const sortedTraits = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primaryTrait = sortedTraits[0][0];
  const secondaryTrait = sortedTraits[1][0];

  const totalPoints = Object.values(scores).reduce((acc, val) => acc + val, 0);
  // Base confidence score normalized
  const baseConfidence = Math.round((sortedTraits[0][1] / (totalPoints || 1)) * 100);
  const confidenceScore = Math.min(baseConfidence + 40, 99); // Inflated for UX perception

  return mapTraitsToResult(primaryTrait, secondaryTrait, userLevel, confidenceScore);
}

function mapTraitsToResult(primary: string, secondary: string, level: string, confidence: number): AssessmentResultData {
  if (level === '10th') {
    if (primary === 'analytical' && ['practical', 'business'].includes(secondary)) {
      return {
        recommended: "Science (PCM/PCB)",
        why: "Your strong analytical skills map perfectly to logical problem-solving required in STEM, while your secondary trait suits experimental and structural application.",
        strengths: ["Logical Reasoning", "Data Comprehension", "Complex Problem Solving"],
        careers: ["Engineering", "Data Science", "Medicine"],
        secondary: "Commerce with Math",
        confidence
      };
    }
    if (primary === 'business' || (primary === 'social' && secondary === 'business')) {
      return {
        recommended: "Commerce",
        why: "You naturally lean towards resource management, strategy, and understanding human or market behavior.",
        strengths: ["Leadership", "Strategic Planning", "Financial Intuition"],
        careers: ["Business Management", "Finance", "Chartered Accountancy", "Marketing"],
        secondary: "Arts (Economics)",
        confidence
      };
    }
    if (primary === 'creativity' || (primary === 'social' && secondary === 'creativity')) {
      return {
        recommended: "Arts / Humanities",
        why: "Your scores indicate high imagination, empathy, and out-of-the-box thinking perfectly suited for creative and social sciences.",
        strengths: ["Creative Expression", "Empathy", "Abstract Thinking"],
        careers: ["Design", "Psychology", "Journalism", "Law"],
        secondary: "Commerce",
        confidence
      };
    }
    if (primary === 'practical') {
      return {
        recommended: "Vocational / Applied Sciences",
        why: "You have a strong bias for action, hands-on creation, and working in physical environments over purely theoretical ones.",
        strengths: ["Hands-on Execution", "Spatial Awareness", "Tangible Problem Solving"],
        careers: ["Architecture", "Industrial Design", "Aviation", "Specialized Engineering"],
        secondary: "Science (PCM)",
        confidence
      };
    }
  } else if (level === '12th') {
    // 12th Grade specialized mapping
    if (primary === 'analytical') {
       return {
        recommended: "B.Tech / B.Sc / Medical Sciences",
        why: "You possess a highly methodical and logical mind essential for advanced technical degrees.",
        strengths: ["Deep Analysis", "Algorithmic Thinking"],
        careers: ["Software Engineer", "Research Scientist", "Doctor"],
        secondary: "BCA / Statistics",
        confidence
      };
    }
    if (primary === 'business') {
      return {
        recommended: "BBA / B.Com / Fintech",
        why: "You show natural aptitude for commerce, scaling operations, and financial analysis.",
        strengths: ["Execution", "Negotiation", "Management"],
        careers: ["Investment Banker", "Product Manager", "Consultant"],
        secondary: "Economics Honors",
        confidence
      };
    }
    if (primary === 'creativity') {
      return {
        recommended: "B.Des / Mass Comm / Fine Arts",
        why: "Your creative instinct makes conventional degrees too restrictive; you thrive in generative environments.",
        strengths: ["Design Thinking", "Storytelling", "Aesthetics"],
        careers: ["UI/UX Designer", "Filmmaker", "Creative Director"],
        secondary: "BA English / Architecture",
        confidence
      };
    }
    if (primary === 'social') {
      return {
        recommended: "Psychology / Law / HR",
        why: "Your ability to read people and situations makes you ideal for careers focused on human interaction and mediation.",
        strengths: ["Empathy", "Public Speaking", "Mediation"],
        careers: ["Clinical Psychologist", "Lawyer", "HR Director"],
        secondary: "Sociology / Journalism",
        confidence
      };
    }
  }

  // Fallback / College / Generic
  return {
    recommended: "Multidisciplinary Studies / Management",
    why: "Your traits are highly balanced and versatile, making you adaptable to a wide range of analytical and social fields.",
    strengths: ["Adaptability", "Balanced Intellect", "Cross-domain skills"],
    careers: ["Entrepreneurship", "Management Consulting", "Product Ownership"],
    secondary: "Liberal Arts",
    confidence: confidence - 10
  };
}
