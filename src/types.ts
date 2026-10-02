export interface UserProfile {
  id: string;
  name: string;
  studentStatus: string;
  semester: string;
  targetGoal: string;
  dailyStudyMinutes: number;
  selfAssessedLevel: string;
  isOnboarded: boolean;
  currentLevel: number;
  xp: number;
  streak: number;
  lastActiveDate: string;
  accuracyRate: number;
  casesSolved: number;
  rulesMastered: number;
  weakTopics: string[];
  totalStudyTimeMinutes: number;
  achievements: Array<{ id: string; name: string; desc: string; unlockedAt?: string; icon: string }>;
}

export interface LevelCurriculum {
  levelNumber: number;
  id: string;
  name: string;
  tagline: string;
  goal: string;
  xpReward: number;
  prerequisiteLevel: number;
  summary: string;
  coreConcepts: string[];
  challengeTypes: string[];
  unlocked: boolean;
  completed: boolean;
  bestScore: number;
  attempts: number;
}

export interface TaxCaseStudy {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  topic: string;
  taxType: string;
  parties: string;
  chronology: string;
  transactions: Array<{ desc: string; amount: number; date: string; doc: string }>;
  specialConditions: string;
  relevantFacts: string[];
  irrelevantFacts: string[];
  potentialRisks: string[];
  analysisQuestions: string[];
  rubric: {
    issueWeight: number;
    ruleWeight: number;
    applicationWeight: number;
    calculationWeight: number;
    conclusionWeight: number;
  };
  legalBasis: Array<{ regulation: string; article: string; status: string; source: string }>;
  keySolution: string;
  commonPitfalls: string[];
  followUpCase: string;
}

export interface TaxRegulation {
  id: string;
  name: string;
  number: string;
  year: number;
  topic: string;
  taxType: 'PPh' | 'PPN' | 'KUP' | 'Pajak Daerah' | 'Cukai & PBB';
  activeStatus: 'BERLAKU' | 'DICABUT' | 'DIUBAH SEBAGIAN';
  summary: string;
  keyArticles: Array<{ article: string; content: string }>;
  source: string;
  sourceUrl: string;
  lastCheckedDate: string;
  officialVerification: boolean;
}

export interface MistakeEntry {
  id: string;
  timestamp: string;
  topic: string;
  concept: string;
  mistakeDescription: string;
  userGivenAnswer: string;
  correctExplanation: string;
  legalBasis: string;
  reviewCount: number;
  resolved: boolean;
  category: string;
}

export interface SpacedRepetitionItem {
  id: string;
  topicId: string;
  conceptTitle: string;
  taxLawReference: string;
  coreQuestion: string;
  idealAnswer: string;
  status: 'Belum dipelajari' | 'Sedang dipelajari' | 'Perlu diulang' | 'Hampir dikuasai' | 'Dikuasai';
  easeFactor: number;
  intervalDays: number;
  nextReviewDate: string;
  reviewCount: number;
  lastScore: number;
}

export interface DiagnosticQuestion {
  id: number;
  category: 'Konsep' | 'Definisi' | 'Analisis Regulasi' | 'Perhitungan' | 'Case Study' | 'Sengketa';
  question: string;
  scenario?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  legalBasis: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface TrainingMethod {
  id: string;
  number: number;
  name: string;
  badge: string;
  description: string;
  estimatedDuration: string;
  targetSkill: string;
}

export interface IRACEvaluation {
  scores: {
    factsScore: number;
    issueScore: number;
    ruleScore: number;
    applicationScore: number;
    calculationScore: number;
    argumentationScore: number;
    conclusionScore: number;
    overallScore: number;
  };
  feedback: {
    factsFeedback: string;
    issueFeedback: string;
    ruleFeedback: string;
    applicationFeedback: string;
    calculationFeedback: string;
    conclusionFeedback: string;
  };
  strengths: string[];
  weaknesses: string[];
  socraticFollowupQuestion: string;
  officialSources: Array<{
    name: string;
    article: string;
    status: string;
    verificationNote: string;
  }>;
  commonPitfallsNoticed: string;
}

export interface CalculationResult {
  taxType: string;
  subType: string;
  inputs: Record<string, any>;
  legalBasis: string;
  formula: string;
  steps: Array<{ stepNumber: number; title: string; calculation: string; note?: string }>;
  finalResult: {
    dpp: number;
    effectiveRate: number | string;
    taxPayable: number;
    taxWithheldBefore?: number;
    underpaymentOrOverpayment?: number;
    summaryText: string;
  };
}
