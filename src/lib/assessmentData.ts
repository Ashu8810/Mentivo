export type TraitScores = {
  analytical: number;
  creativity: number;
  business: number;
  social: number;
  practical: number;
};

export type Option = {
  text: string;
  scores: Partial<TraitScores>;
};

export type Question = {
  id: string;
  question: string;
  options: Option[];
};

export const assessmentQuestions: Question[] = [
  {
    id: "q1",
    question: "Your school is organizing a major event. Which role do you naturally gravitate towards?",
    options: [
      { text: "Managing the budget, sponsorships, and scheduling.", scores: { business: 3, analytical: 1 } },
      { text: "Designing the posters, stage layout, and overall theme.", scores: { creativity: 3, practical: 1 } },
      { text: "Handling the technical setup: sound, lighting, and logistics.", scores: { practical: 3, analytical: 1 } },
      { text: "Coordinating between teams and resolving conflicts.", scores: { social: 3, business: 1 } }
    ]
  },
  {
    id: "q2",
    question: "When confronted with a complex, multi-step problem, what is your initial reaction?",
    options: [
      { text: "Break it down into data points and analyze the root causes.", scores: { analytical: 3, business: 1 } },
      { text: "Brainstorm wild, unconventional ideas to bypass the problem.", scores: { creativity: 3 } },
      { text: "Find a hands-on, immediate workaround to get things moving.", scores: { practical: 3 } },
      { text: "Consult with peers to gather different perspectives first.", scores: { social: 3 } }
    ]
  },
  {
    id: "q3",
    question: "You have a free weekend with no obligations. How are you most likely to spend it?",
    options: [
      { text: "Reading about new technologies, science, or market trends.", scores: { analytical: 2, business: 1 } },
      { text: "Working on a DIY project, fixing things, or outdoor activities.", scores: { practical: 3 } },
      { text: "Volunteering, socializing, or helping a friend with their issues.", scores: { social: 3 } },
      { text: "Painting, writing, coding a side project, or creating music.", scores: { creativity: 3 } }
    ]
  },
  {
    id: "q4",
    question: "Which of these documentaries would you most likely watch?",
    options: [
      { text: "Inside the mind of a Wall Street billionaire.", scores: { business: 3 } },
      { text: "How modern engineering feats (like massive bridges) are built.", scores: { practical: 2, analytical: 2 } },
      { text: "The psychological impact of social media on human behavior.", scores: { social: 3, analytical: 1 } },
      { text: "The evolution of modern art and cinematography.", scores: { creativity: 3 } }
    ]
  },
  {
    id: "q5",
    question: "A popular app you use has just released a terrible update. What is your reaction?",
    options: [
      { text: "I try to understand why the developers made these UI/UX decisions.", scores: { analytical: 2, creativity: 1 } },
      { text: "I sketch out a better layout for how it actually should look.", scores: { creativity: 3 } },
      { text: "I read reviews to see how it's affecting user retention and company stock.", scores: { business: 3, analytical: 1 } },
      { text: "I complain to my friends but quickly figure out how to navigate the new layout.", scores: { social: 1, practical: 2 } }
    ]
  },
  {
    id: "q6",
    question: "You are given a blank plot of land and unlimited funds. What do you build?",
    options: [
      { text: "A high-tech research facility or advanced laboratory.", scores: { analytical: 3, practical: 1 } },
      { text: "A massive commercial hub with high ROI and premium retail spaces.", scores: { business: 4 } },
      { text: "An architectural wonder, a museum, or an art district.", scores: { creativity: 4 } },
      { text: "A vibrant community center or a hospital.", scores: { social: 3, practical: 1 } }
    ]
  },
  {
    id: "q7",
    question: "If you were to write a bestselling book, what genre would it be?",
    options: [
      { text: "A complex sci-fi novel based on real quantum physics.", scores: { analytical: 2, creativity: 2 } },
      { text: "A guide to building a scalable empire and mastering negotiation.", scores: { business: 3 } },
      { text: "An epic, imaginative fantasy world with entirely new languages.", scores: { creativity: 4 } },
      { text: "A deep dive into human psychology, relationships, and healing.", scores: { social: 4 } }
    ]
  },
  {
    id: "q8",
    question: "In a group project, you realize someone isn't pulling their weight. What do you do?",
    options: [
      { text: "Re-calculate the timeline and re-assign their tasks efficiently.", scores: { analytical: 2, business: 2 } },
      { text: "Just do the hands-on work yourself so the project doesn't fail.", scores: { practical: 3 } },
      { text: "Sit down with them, ask what's wrong, and offer to help.", scores: { social: 3 } },
      { text: "Get creative and change the project scope so less work is needed from them.", scores: { creativity: 2, business: 1 } }
    ]
  },
  {
    id: "q9",
    question: "Which of these subjects feels the least like 'work' to you?",
    options: [
      { text: "Mathematics, Physics, or Computer Science.", scores: { analytical: 4 } },
      { text: "Economics, Accounts, or Business Studies.", scores: { business: 4 } },
      { text: "History, Psychology, or Sociology.", scores: { social: 3, analytical: 1 } },
      { text: "Robotics shop, P.E., or Design technology.", scores: { practical: 4 } }
    ]
  },
  {
    id: "q10",
    question: "You've been handed a complex new gadget you've never seen before. What's your first move?",
    options: [
      { text: "I open the manual to understand its specs and logic.", scores: { analytical: 3 } },
      { text: "I start pressing things and taking it apart to see how it ticks.", scores: { practical: 4 } },
      { text: "I admire the aesthetic design and form factor.", scores: { creativity: 2 } },
      { text: "I look up how much it costs and who the target market is.", scores: { business: 3 } }
    ]
  },
  {
    id: "q11",
    question: "You're at a networking event where you don't know anyone. How do you handle it?",
    options: [
      { text: "I actively introduce myself to key people who might be useful connections.", scores: { business: 3, social: 1 } },
      { text: "I find one or two people and try to have a deep, meaningful conversation.", scores: { social: 3 } },
      { text: "I awkwardly hover around the tech demo booth to look at the gear.", scores: { practical: 2, analytical: 1 } },
      { text: "I analyze the room's layout, demographics, and social dynamics from the corner.", scores: { analytical: 3 } }
    ]
  },
  {
    id: "q12",
    question: "When explaining a difficult concept to a friend, you rely mostly on:",
    options: [
      { text: "Analogies, visual diagrams, and metaphors.", scores: { creativity: 3, social: 1 } },
      { text: "Hard data, charts, and logical steps.", scores: { analytical: 3 } },
      { text: "Real-world, practical examples that they can physically relate to.", scores: { practical: 3 } },
      { text: "Patiently asking them questions to guide them to the answer (Socratic method).", scores: { social: 4 } }
    ]
  }
];
