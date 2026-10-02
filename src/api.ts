import { 
  UserProfile, 
  LevelCurriculum, 
  TaxCaseStudy, 
  TaxRegulation, 
  MistakeEntry, 
  SpacedRepetitionItem, 
  DiagnosticQuestion,
  IRACEvaluation,
  CalculationResult,
  TrainingMethod
} from './types.ts';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `HTTP error ${res.status}`);
  }
  return data;
}

export const api = {
  // User & Profile
  getUserProfile: () => request<{ success: boolean; user: UserProfile }>('/api/user/profile'),
  updateUserProfile: (profile: Partial<UserProfile>) => request<{ success: boolean; user: UserProfile }>('/api/user/profile', {
    method: 'POST',
    body: JSON.stringify(profile),
  }),
  getDashboardOverview: () => request<any>('/api/dashboard/overview'),

  // Diagnostic Test
  getDiagnosticQuestions: () => request<{ success: boolean; questions: DiagnosticQuestion[] }>('/api/diagnostic/questions'),
  getDiagnosticState: () => request<{ success: boolean; completed: boolean; result?: any }>('/api/diagnostic/state'),
  submitDiagnostic: (answers: Record<number, number>) => request<{ success: boolean; result: any }>('/api/diagnostic/submit', {
    method: 'POST',
    body: JSON.stringify({ answers }),
  }),

  // Levels
  getLevels: () => request<{ success: boolean; levels: LevelCurriculum[] }>('/api/levels'),
  getLevelDetail: (levelNumber: number) => request<{ success: boolean; curriculum: LevelCurriculum; progress: any }>(`/api/levels/${levelNumber}`),
  submitLevelChallenge: (levelNumber: number, payload: { score: number; challengeId?: string; answers?: any; mistakeNote?: string; explanation?: string; legalBasis?: string }) => 
    request<{ success: boolean; progress: any; xpEarned: number; unlockedNext: boolean }>(`/api/levels/${levelNumber}/submit`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Training Methods
  getTrainingMethods: () => request<{ success: boolean; methods: TrainingMethod[] }>('/api/training/methods'),

  // Cases
  getCases: (params?: { difficulty?: string; taxType?: string }) => {
    const q = new URLSearchParams();
    if (params?.difficulty) q.set('difficulty', params.difficulty);
    if (params?.taxType) q.set('taxType', params.taxType);
    return request<{ success: boolean; cases: TaxCaseStudy[] }>(`/api/cases?${q.toString()}`);
  },
  getCaseById: (id: string) => request<{ success: boolean; case: TaxCaseStudy }>(`/api/cases/${id}`),
  generateCase: (payload: { topic: string; difficulty: string; taxType: string }) => 
    request<{ success: boolean; case: TaxCaseStudy }>('/api/cases/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  evaluateCaseIRAC: (caseId: string, submission: { facts: string; issue: string; rule: string; application: string; calculation?: string; conclusion: string }) => 
    request<{ success: boolean; evaluation: IRACEvaluation; xpEarned: number; submissionId: string }>(`/api/cases/${caseId}/evaluate`, {
      method: 'POST',
      body: JSON.stringify({ submission }),
    }),
  getCaseHint: (caseId: string, hintLevel: number, userNotes?: string) => 
    request<{ success: boolean; data: { hintLevel: number; hintTitle: string; content: string; guidingQuestion: string; targetConcept: string } }>(`/api/cases/${caseId}/hint`, {
      method: 'POST',
      body: JSON.stringify({ hintLevel, userNotes }),
    }),

  // AI Tutor & Reasoning
  sendTutorChat: (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => 
    request<{ success: boolean; text: string; error?: string }>('/api/ai/tutor-chat', {
      method: 'POST',
      body: JSON.stringify({ messages }),
    }),
  evaluateWhy: (ruleContext: string, userExplanation: string) => 
    request<{ success: boolean; data: any }>('/api/ai/evaluate-why', {
      method: 'POST',
      body: JSON.stringify({ ruleContext, userExplanation }),
    }),
  simulateDispute: (payload: { caseTitle: string; disputeScenario: string; userRole: string; userArgument: string; history: Array<{ role: string; speaker: string; text: string }> }) => 
    request<{ success: boolean; data: any }>('/api/ai/dispute-round', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Tax Calculator
  calculateTax: (taxType: string, params: Record<string, any>, periodYear?: number) => 
    request<{ success: boolean; result: CalculationResult }>('/api/calculator/calculate', {
      method: 'POST',
      body: JSON.stringify({ taxType, params, periodYear }),
    }),

  // Regulations
  getRegulations: (params?: { q?: string; taxType?: string; status?: string }) => {
    const q = new URLSearchParams();
    if (params?.q) q.set('q', params.q);
    if (params?.taxType) q.set('taxType', params.taxType);
    if (params?.status) q.set('status', params.status);
    return request<{ success: boolean; regulations: TaxRegulation[] }>(`/api/regulations?${q.toString()}`);
  },
  getRegulationById: (id: string) => request<{ success: boolean; regulation: TaxRegulation }>(`/api/regulations/${id}`),

  // Mistake Bank
  getMistakes: () => request<{ success: boolean; mistakes: MistakeEntry[] }>('/api/mistakes'),
  addMistake: (mistake: Omit<MistakeEntry, 'id' | 'timestamp' | 'reviewCount' | 'resolved'>) => 
    request<{ success: boolean; mistake: MistakeEntry }>('/api/mistakes', {
      method: 'POST',
      body: JSON.stringify(mistake),
    }),
  resolveMistake: (id: string) => 
    request<{ success: boolean; mistake: MistakeEntry }>(`/api/mistakes/${id}/resolve`, {
      method: 'POST',
    }),

  // Spaced Repetition
  getSpacedRepetition: () => request<{ success: boolean; items: SpacedRepetitionItem[]; dueCount: number }>('/api/spaced-repetition'),
  reviewSpacedItem: (id: string, rating: number) => 
    request<{ success: boolean; item: SpacedRepetitionItem }>(`/api/spaced-repetition/${id}/review`, {
      method: 'POST',
      body: JSON.stringify({ rating }),
    }),

  // Bookmarks
  getBookmarks: () => request<{ success: boolean; bookmarks: any[] }>('/api/bookmarks'),
  addBookmark: (type: 'regulation' | 'case', referenceId: string, note?: string) => 
    request<{ success: boolean; bookmark: any }>('/api/bookmarks', {
      method: 'POST',
      body: JSON.stringify({ type, referenceId, note }),
    }),
  removeBookmark: (id: string) => 
    request<{ success: boolean }>(`/api/bookmarks/${id}`, {
      method: 'DELETE',
    }),
};
