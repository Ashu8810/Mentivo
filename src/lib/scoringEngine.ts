import { TraitScores } from './assessmentData';

export type AssessmentResultData = {
  recommendation: {
    primary: string;
    secondary: string;
  };
  confidence: number; // Storing as number for UI progress bars, can be formatted
  analysis: string;
  strengths: string[];
  career_paths: string[];
  alternative_reason: string;
};

// Vocabulary Banks for Dynamic Generation
const intros = [
  "Looking at your unique cognitive footprint, it's clear that",
  "Based on the intricate pattern of your responses,",
  "Your trajectory is fascinating;",
  "The intersection of your dominant traits strongly suggests that",
  "Your profile matrix reveals a distinct natural inclination:"
];

const analyticalAdjectives = ["highly logical", "data-driven", "methodical", "precision-oriented", "structured"];
const creativityAdjectives = ["imaginative", "out-of-the-box", "innovative", "aesthetically driven", "visionary"];
const businessAdjectives = ["strategic", "execution-focused", "leadership-oriented", "resourceful", "value-driven"];
const socialAdjectives = ["empathetic", "people-centric", "communicative", "emotionally intelligent", "collaborative"];
const practicalAdjectives = ["hands-on", "action-oriented", "tactile", "mechanically inclined", "solution-driven"];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function calculateScores(answers: any[]): TraitScores {
  const totals: TraitScores = { analytical: 0, creativity: 0, business: 0, social: 0, practical: 0 };
  
  answers.forEach(answer => {
    if (answer?.selectedOption?.scores) {
      const optionScores = answer.selectedOption.scores;
      for (const [trait, value] of Object.entries(optionScores)) {
        totals[trait as keyof TraitScores] += (value as number);
      }
    }
  });
  
  return totals;
}

export function generateRecommendation(scores: TraitScores, userLevel: string): AssessmentResultData {
  // Sort traits by value descending
  const sortedTraits = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primaryTrait = sortedTraits[0][0];
  const secondaryTrait = sortedTraits[1][0];

  const totalPoints = Object.values(scores).reduce((acc, val) => acc + val, 0);
  
  // Calculate confidence = (top_trait / total_traits) * 100
  // Adjusting for standard multi-trait spread to reflect user's requested logic
  const rawConfidence = (sortedTraits[0][1] / (totalPoints || 1)) * 100;
  // Let's normalize it so it looks realistic (usually between 60-95%)
  const confidence = Math.min(Math.round(rawConfidence * 1.5 + 30), 98);

  const report = buildDynamicReport(primaryTrait, secondaryTrait, userLevel, confidence);
  return report;
}

function buildDynamicReport(primary: string, secondary: string, level: string, confidence: number): AssessmentResultData {
  let primaryMatch = "";
  let secondaryMatch = "";
  let careerPaths: string[] = [];
  let strengths: string[] = [];
  let analysisChunk = "";
  let alternativeReason = "";

  const intro = pickRandom(intros);

  // 10th Grade Logic
  if (level === '10th') {
    if (primary === 'analytical') {
      strengths = [pickRandom(analyticalAdjectives), "Complex problem solving", "Critical thinking", "Algorithm mapping"];
      if (secondary === 'practical') {
        primaryMatch = "Science (PCM)";
        secondaryMatch = "Vocational Tech";
        careerPaths = ["Engineering", "Data Science", "Robotics", "Architecture"];
        analysisChunk = `you naturally dissect complex problems and enjoy applying hands-on, tangible solutions. Your strong analytical ability combined with practical thinking suggests you thrive in environments where theory meets real-world execution.`;
        alternativeReason = `If pure traditional science feels too rigid, a hands-on applied tech pathway allows you to build physical systems without intense theoretical boundaries.`;
      } else {
        primaryMatch = "Science (PCB / PCM)";
        secondaryMatch = "Commerce with Math";
        careerPaths = ["Medical Sciences", "Software Architecture", "Research", "Quantitative Finance"];
        analysisChunk = `your mind processes raw data into structured insights impeccably. You approach chaotic situations logically, ensuring every decision is calculated.`;
        alternativeReason = `Should the heavy science route feel misaligned, leveraging your math skills into high-finance or commerce provides an incredibly lucrative alternative.`;
      }
    } 
    else if (primary === 'business') {
      strengths = [pickRandom(businessAdjectives), "Resource management", "Negotiation", "Strategic planning"];
      primaryMatch = "Commerce";
      secondaryMatch = "Humanities (Economics)";
      careerPaths = ["Business Administration", "Chartered Accountancy", "Investment Banking", "Product Management"];
      analysisChunk = `you possess a sharp instinct for growth, leverage, and systems. You don't just see situations; you see opportunities for optimization and leadership.`;
      alternativeReason = `A deep dive into Economics within the Humanities stream is an excellent backup, feeding your strategic mind with macro-level market understanding.`;
    }
    else if (primary === 'creativity') {
      strengths = [pickRandom(creativityAdjectives), "Visual communication", "Lateral thinking", "Storytelling"];
      primaryMatch = "Arts / Humanities";
      secondaryMatch = "Commerce (Marketing)";
      careerPaths = ["Design (UI/UX)", "Media & Journalism", "Creative Direction", "Filmmaking"];
      analysisChunk = `your perspective is uniquely generative. Where others see constraints, you see a blank canvas for expression, meaning you require an academic stream that values innovation over rote memorization.`;
      alternativeReason = `If you want to commercialize your art, blending your creativity into the Commerce stream (focusing on advertising and brand marketing) is a powerful pivot.`;
    }
    else if (primary === 'social') {
      strengths = [pickRandom(socialAdjectives), "Conflict resolution", "Empathy mapping", "Public speaking"];
      primaryMatch = "Humanities / Arts";
      secondaryMatch = "Commerce (HR/Mgmt)";
      careerPaths = ["Psychology", "Law", "International Relations", "Human Resources"];
      analysisChunk = `you are intrinsically motivated by human behavior and societal dynamics. Your high emotional intelligence allows you to navigate complex interpersonal networks seamlessly.`;
      alternativeReason = `Leveraging your people-skills within the Commerce domain (such as human resources or corporate communications) is a highly viable alternative if you prefer the corporate environment.`;
    }
    else {
      strengths = [pickRandom(practicalAdjectives), "Operational efficiency", "Execution", "Spatial awareness"];
      primaryMatch = "Vocational / Applied Sciences";
      secondaryMatch = "Commerce";
      careerPaths = ["Industrial Design", "Aviation", "Operational Logistics", "Sports Management"];
      analysisChunk = `you have a profound bias for action. Theoretical concepts resonate best with you when they have immediate, physical applications in the real world.`;
      alternativeReason = `If vocational paths are limited, standard Commerce provides a structured yet flexible environment for you to apply practical execution frameworks.`;
    }
  } 
  // 12th Grade Logic
  else if (level === '12th') {
    if (primary === 'analytical') {
      primaryMatch = "B.Tech / Engineering";
      secondaryMatch = "B.Sc Statistics / Data Science";
      careerPaths = ["AI Engineer", "Quantitative Analyst", "Research Scientist", "Systems Architect"];
      strengths = ["Logical precision", "Data abstraction", "Technical resilience", pickRandom(analyticalAdjectives)];
      analysisChunk = `your cognitive engine thrives on complexity. You possess the rare ability to abstract complicated real-world phenomena into manageable logic models.`;
      alternativeReason = `If a traditional 4-year engineering program feels too broad, focusing purely on numerical degrees like Statistics provides a highly specialized and demanded alternative.`;
    }
    else if (primary === 'business') {
      primaryMatch = "BBA / Finance";
      secondaryMatch = "Economics Honors";
      careerPaths = ["Management Consultant", "Financial Analyst", "Venture Capitalist", "Startup Founder"];
      strengths = ["Market intuition", "Delegation", "Risk assessment", pickRandom(businessAdjectives)];
      analysisChunk = `your command over resources and macro-level strategy is highly elevated. You naturally evaluate ROI and lead structures efficiently.`;
      alternativeReason = `Should the standard business degree lack analytical depth for you, an Economics Honors degree provides rigorous market theory while still supporting a corporate trajectory.`;
    }
    else if (primary === 'creativity' || primary === 'social') {
      primaryMatch = "B.Des / Mass Media";
      secondaryMatch = "B.A Psychology / Law";
      careerPaths = ["Product Designer", "Copywriter", "Counseling Psychologist", "Media Producer"];
      strengths = ["Empathic design", "Narrative building", "Cultural awareness", pickRandom(creativityAdjectives)];
      analysisChunk = `your intersection of empathy and generative thinking points toward fields where human interaction and systemic design meet.`;
      alternativeReason = `A pivot into Psychology or Law anchors your strong communication skills into highly stable, yet deeply human-centric, professional services.`;
    }
    else {
      primaryMatch = "B.Arch / Specialized Applied Sciences";
      secondaryMatch = "BBA Supply Chain";
      careerPaths = ["Architect", "Logistics Director", "Hardware Entrepreneur", "Operations Manager"];
      strengths = ["Spatial logic", "Execution", "Resource management", pickRandom(practicalAdjectives)];
      analysisChunk = `you bridge the gap between abstract ideas and physical reality. Your traits lean heavily towards environments that require spatial and operational acumen.`;
      alternativeReason = `Moving into supply chain or operations management takes your practical mindset and scales it into the business sector flawlessly.`;
    }
  }
  // College/Career Level
  else {
    if (primary === 'analytical' && secondary === 'business') {
      primaryMatch = "Data Strategy / Tech Management";
      secondaryMatch = "Financial Engineering";
      careerPaths = ["VP of Engineering", "Technical Product Manager", "BI Director"];
      strengths = ["Algorithmic strategy", "Business intelligence", "Scalable logic"];
      analysisChunk = `you perfectly balance hardcore quantitative analysis with ruthless business execution. You belong at the intersection of tech and boardroom strategy.`;
      alternativeReason = `A pivot purely into Financial Engineering leverages your math skills while feeding your business-oriented competitive drive.`;
    }
    else if (primary === 'creativity' && secondary === 'analytical') {
      primaryMatch = "Product Design (UI/UX) / HCI";
      secondaryMatch = "Front-End Architecture";
      careerPaths = ["Lead Product Designer", "Creative Technologist", "Design Systems Architect"];
      strengths = ["Human-computer interaction", "Aesthetic logic", "Pixel precision"];
      analysisChunk = `you operate in the rare space where art meets mathematics. You understand that great design is inherently a rigorous problem-solving discipline.`;
      alternativeReason = `Focusing heavily on the technical implementation side (like front-end architecture) provides a stable fallback that still respects your creative eye.`;
    }
    else {
      primaryMatch = "Cross-Functional Leadership / Management";
      secondaryMatch = "Domain Consulting";
      careerPaths = ["Operations Director", "Chief of Staff", "Management Consultant"];
      strengths = ["Versatility", "Cross-domain communication", "Rapid adaptation"];
      analysisChunk = `your psychological trait distribution is highly versatile. You aren't boxed into a single silo, making you an exceptional cross-functional leader.`;
      alternativeReason = `Consulting across varied industries allows you to deploy your adaptable intellect without committing to a single stagnant vertical.`;
    }
  }

  // Final Output mapping
  const analysis = `${intro} ${analysisChunk}`;
  
  return {
    recommendation: {
      primary: primaryMatch,
      secondary: secondaryMatch
    },
    confidence,
    analysis,
    strengths,
    career_paths: careerPaths,
    alternative_reason: alternativeReason
  };
}
