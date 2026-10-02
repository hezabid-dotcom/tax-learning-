import fs from 'fs';
import path from 'path';
import { 
  OFFICIAL_REGULATIONS, 
  DIAGNOSTIC_QUESTIONS, 
  LEVEL_CURRICULUM, 
  PREBUILT_CASES, 
  INITIAL_SPACED_REPETITION_ITEMS,
  TRAINING_METHODS,
  TaxRegulation,
  TaxCaseStudy,
  SpacedRepetitionItem
} from './taxData.ts';
import { 
  ACCOUNTING_LEVELS, 
  PREBUILT_ACCOUNTING_CASES, 
  AccountingCase, 
  AccountingLevel 
} from './accountingData.ts';
import { 
  ECONOMICS_LEVELS, 
  PREBUILT_ECONOMICS_CASES, 
  EconomicsCase, 
  EconomicsLevel 
} from './economicsData.ts';

export interface UserProfile {
  id: string;
  name: string;
  studentStatus: string; // e.g. "Mahasiswa D3 Perpajakan"
  semester: string; // e.g. "Semester 4"
  targetGoal: string; // e.g. "Lulus Ujian Brevet AB & Nilai A Hukum Pajak"
  dailyStudyMinutes: number; // e.g. 30
  selfAssessedLevel: string; // "Pemula" | "Menengah" | "Lanjut"
  isOnboarded: boolean;
  currentLevel: number;
  accountingLevel?: number;
  economicsLevel?: number;
  xp: number;
  streak: number;
  lastActiveDate: string;
  accuracyRate: number; // 0 - 100
  accountingAccuracy?: number;
  economicsAccuracy?: number;
  casesSolved: number;
  rulesMastered: number;
  weakTopics: string[];
  totalStudyTimeMinutes: number;
  achievements: Array<{ id: string; name: string; desc: string; unlockedAt?: string; icon: string }>;
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
  category: 'Subjek vs Objek' | 'Penghitungan Tarif/TER' | 'Faktur Pajak' | 'Prosedur KUP/Sengketa' | 'Natura & Fasilitas' | 'Lainnya';
}

export interface CaseSubmission {
  id: string;
  caseId: string;
  timestamp: string;
  submission: {
    facts: string;
    issue: string;
    rule: string;
    application: string;
    calculation?: string;
    conclusion: string;
  };
  evaluation: any;
  xpEarned: number;
}

export interface LevelProgress {
  levelNumber: number;
  unlocked: boolean;
  completed: boolean;
  bestScore: number;
  attempts: number;
  lastAttemptAt?: string;
}

export interface DatabaseSchema {
  user: UserProfile;
  diagnosticCompleted: boolean;
  diagnosticResult?: {
    completedAt: string;
    totalQuestions: number;
    correctAnswers: number;
    scorePercent: number;
    determinedStartingLevel: number;
    strengths: string[];
    weaknesses: string[];
    recommendedTraining: string[];
    dailyStudyPlan: Record<string, string>;
  };
  levels: LevelProgress[];
  accountingLevels: LevelProgress[];
  economicsLevels: LevelProgress[];
  mistakeBank: MistakeEntry[];
  spacedRepetition: SpacedRepetitionItem[];
  cases: TaxCaseStudy[];
  accountingCases: AccountingCase[];
  economicsCases: EconomicsCase[];
  regulations: TaxRegulation[];
  caseSubmissions: CaseSubmission[];
  accountingSubmissions: any[];
  economicsSubmissions: any[];
  bookmarks: Array<{ id: string; type: 'regulation' | 'case'; referenceId: string; note: string; createdAt: string }>;
  weeklyActivity: Array<{ date: string; minutes: number; xp: number; cases: number }>;
}

const DB_FILE = path.join(process.cwd(), 'data', 'tax_mastery_db.json');

const DEFAULT_ACHIEVEMENTS = [
  { id: 'ach-first-step', name: 'Langkah Pertama', desc: 'Selesaikan Diagnostic Test awal untuk memetakan kemampuan Anda.', icon: 'CheckCircle' },
  { id: 'ach-first-case', name: 'First Case Solved', desc: 'Selesaikan analisis kasus IRAC pertama Anda dengan penilaian AI.', icon: 'Briefcase' },
  { id: 'ach-10-cases', name: '10 Cases Mastered', desc: 'Selesaikan 10 studi kasus perpajakan nyata.', icon: 'Award' },
  { id: 'ach-rule-master', name: 'Rule Master', desc: 'Kuasai 7 dimensi pembacaan regulasi pada Level 2.', icon: 'BookOpen' },
  { id: 'ach-calc-master', name: 'Calculation Virtuoso', desc: 'Selesaikan 5 simulasi penghitungan PPh & PPN tanpa celah.', icon: 'Calculator' },
  { id: 'ach-streak-7', name: '7-Day Discipline', desc: 'Pertahankan streak belajar berturut-turut selama 7 hari.', icon: 'Flame' },
  { id: 'ach-dispute-advocate', name: 'Tax Litigator', desc: 'Menangkan babak bantahan pada simulasi sengketa pajak Level 6.', icon: 'Scale' },
  { id: 'ach-tax-master', name: 'Tax Strategist', desc: 'Tuntaskan Level 7 Capstone Exam dengan skor di atas 85.', icon: 'Crown' }
];

function getInitialDb(): DatabaseSchema {
  const initialWeekly = [
    { date: 'Senin', minutes: 25, xp: 120, cases: 1 },
    { date: 'Selasa', minutes: 35, xp: 210, cases: 2 },
    { date: 'Rabu', minutes: 40, xp: 250, cases: 2 },
    { date: 'Kamis', minutes: 30, xp: 180, cases: 1 },
    { date: 'Jumat', minutes: 45, xp: 300, cases: 3 },
    { date: 'Sabtu', minutes: 50, xp: 350, cases: 3 },
    { date: 'Minggu', minutes: 30, xp: 200, cases: 1 }
  ];

  return {
    user: {
      id: 'usr-default',
      name: 'Revalina',
      studentStatus: 'Mahasiswa D3 Perpajakan',
      semester: 'Semester 4',
      targetGoal: 'Membangun Legal Reasoning & Lolos Ujian Brevet AB',
      dailyStudyMinutes: 30,
      selfAssessedLevel: 'Menengah',
      isOnboarded: false, // will show diagnostic / onboarding initially if not set
      currentLevel: 1,
      xp: 250,
      streak: 3,
      lastActiveDate: new Date().toISOString().split('T')[0],
      accuracyRate: 78,
      casesSolved: 3,
      rulesMastered: 8,
      weakTopics: ['Faktur Pajak Cacat', 'Penghitungan Masa Terakhir PPh 21 TER'],
      totalStudyTimeMinutes: 255,
      achievements: DEFAULT_ACHIEVEMENTS.map(a => a.id === 'ach-first-step' ? { ...a, unlockedAt: new Date().toISOString() } : a)
    },
    diagnosticCompleted: false,
    levels: [
      { levelNumber: 1, unlocked: true, completed: false, bestScore: 85, attempts: 2 },
      { levelNumber: 2, unlocked: true, completed: false, bestScore: 0, attempts: 0 },
      { levelNumber: 3, unlocked: false, completed: false, bestScore: 0, attempts: 0 },
      { levelNumber: 4, unlocked: false, completed: false, bestScore: 0, attempts: 0 },
      { levelNumber: 5, unlocked: false, completed: false, bestScore: 0, attempts: 0 },
      { levelNumber: 6, unlocked: false, completed: false, bestScore: 0, attempts: 0 },
      { levelNumber: 7, unlocked: false, completed: false, bestScore: 0, attempts: 0 }
    ],
    accountingLevels: Array.from({ length: 10 }, (_, i) => ({
      levelNumber: i + 1,
      unlocked: i === 0,
      completed: false,
      bestScore: 0,
      attempts: 0
    })),
    economicsLevels: Array.from({ length: 10 }, (_, i) => ({
      levelNumber: i + 1,
      unlocked: i === 0,
      completed: false,
      bestScore: 0,
      attempts: 0
    })),
    mistakeBank: [
      {
        id: 'mstk-1',
        timestamp: new Date().toISOString(),
        topic: 'PPh 21 TER PMK 168/2023',
        concept: 'Pemotongan Masa Pajak Terakhir (Desember)',
        mistakeDescription: 'Menggunakan tarif TER bulanan untuk menghitung pemotongan bulan Desember.',
        userGivenAnswer: 'Gaji Desember x TER Kategori A (5%)',
        correctExplanation: 'Masa pajak terakhir (Desember) TIDAK menggunakan TER, melainkan dihitung setahun menggunakan tarif progresif Pasal 17 ayat (1) huruf a UU PPh atas PKP setahun dikurangi PPh yang telah dipotong Jan-Nov.',
        legalBasis: 'Pasal 16 PMK No. 168 Tahun 2023',
        reviewCount: 2,
        resolved: false,
        category: 'Penghitungan Tarif/TER'
      },
      {
        id: 'mstk-2',
        timestamp: new Date().toISOString(),
        topic: 'PPN & Faktur Pajak',
        concept: 'Pengkreditan Faktur Pajak Cacat',
        mistakeDescription: 'Menganggap faktur pajak tanpa NPWP pembeli tetap dapat dikreditkan selama barang fisik ada.',
        userGivenAnswer: 'Pajak Masukan tetap dapat dikreditkan karena barang fisik diterima di gudang.',
        correctExplanation: 'Secara formil Pasal 9 ayat (8) huruf f UU PPN menegaskan Faktur Pajak yang tidak memuat keterangan lengkap tidak dapat dikreditkan.',
        legalBasis: 'Pasal 9 ayat (8) & Pasal 13 ayat (5) UU PPN',
        reviewCount: 1,
        resolved: false,
        category: 'Faktur Pajak'
      }
    ],
    spacedRepetition: INITIAL_SPACED_REPETITION_ITEMS,
    cases: PREBUILT_CASES,
    accountingCases: PREBUILT_ACCOUNTING_CASES,
    economicsCases: PREBUILT_ECONOMICS_CASES,
    regulations: OFFICIAL_REGULATIONS,
    caseSubmissions: [],
    accountingSubmissions: [],
    economicsSubmissions: [],
    bookmarks: [],
    weeklyActivity: initialWeekly
  };
}

class TaxDatabase {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        // Ensure default arrays and structures exist without data loss
        if (!parsed.regulations || parsed.regulations.length === 0) {
          parsed.regulations = OFFICIAL_REGULATIONS;
        }
        if (!parsed.cases || parsed.cases.length === 0) {
          parsed.cases = PREBUILT_CASES;
        }
        if (!parsed.accountingCases || parsed.accountingCases.length === 0) {
          parsed.accountingCases = PREBUILT_ACCOUNTING_CASES;
        }
        if (!parsed.economicsCases || parsed.economicsCases.length === 0) {
          parsed.economicsCases = PREBUILT_ECONOMICS_CASES;
        }
        if (!parsed.accountingLevels || parsed.accountingLevels.length === 0) {
          parsed.accountingLevels = Array.from({ length: 10 }, (_, i) => ({
            levelNumber: i + 1,
            unlocked: i === 0,
            completed: false,
            bestScore: 0,
            attempts: 0
          }));
        }
        if (!parsed.economicsLevels || parsed.economicsLevels.length === 0) {
          parsed.economicsLevels = Array.from({ length: 10 }, (_, i) => ({
            levelNumber: i + 1,
            unlocked: i === 0,
            completed: false,
            bestScore: 0,
            attempts: 0
          }));
        }
        if (!parsed.accountingSubmissions) parsed.accountingSubmissions = [];
        if (!parsed.economicsSubmissions) parsed.economicsSubmissions = [];
        if (!parsed.user.accountingLevel) parsed.user.accountingLevel = 1;
        if (!parsed.user.economicsLevel) parsed.user.economicsLevel = 1;
        if (!parsed.user.accountingAccuracy) parsed.user.accountingAccuracy = 80;
        if (!parsed.user.economicsAccuracy) parsed.user.economicsAccuracy = 75;

        if (!parsed.spacedRepetition || parsed.spacedRepetition.length === 0) {
          parsed.spacedRepetition = INITIAL_SPACED_REPETITION_ITEMS;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Error reading DB_FILE, creating fresh database:', e);
    }

    const init = getInitialDb();
    this.saveDirect(init);
    return init;
  }

  private saveDirect(state: DatabaseSchema) {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving DB_FILE:', e);
    }
  }

  public save() {
    this.saveDirect(this.data);
  }

  // Getters
  public getUser(): UserProfile {
    return this.data.user;
  }

  public updateUser(partial: Partial<UserProfile>): UserProfile {
    this.data.user = { ...this.data.user, ...partial };
    this.save();
    return this.data.user;
  }

  public addXpAndStreak(xpToAdd: number) {
    const today = new Date().toISOString().split('T')[0];
    const user = this.data.user;
    
    user.xp += xpToAdd;

    // Check streak
    if (user.lastActiveDate !== today) {
      const last = new Date(user.lastActiveDate).getTime();
      const now = new Date(today).getTime();
      const diffDays = Math.round((now - last) / (1000 * 3600 * 24));
      
      if (diffDays === 1) {
        user.streak += 1;
      } else if (diffDays > 1) {
        user.streak = 1;
      }
      user.lastActiveDate = today;
    }

    this.checkAchievements();
    this.save();
  }

  private checkAchievements() {
    const user = this.data.user;
    user.achievements.forEach(ach => {
      if (ach.unlockedAt) return;

      if (ach.id === 'ach-first-step' && this.data.diagnosticCompleted) {
        ach.unlockedAt = new Date().toISOString();
      } else if (ach.id === 'ach-first-case' && user.casesSolved >= 1) {
        ach.unlockedAt = new Date().toISOString();
      } else if (ach.id === 'ach-10-cases' && user.casesSolved >= 10) {
        ach.unlockedAt = new Date().toISOString();
      } else if (ach.id === 'ach-streak-7' && user.streak >= 7) {
        ach.unlockedAt = new Date().toISOString();
      } else if (ach.id === 'ach-dispute-advocate' && this.data.levels.find(l => l.levelNumber === 6 && l.completed)) {
        ach.unlockedAt = new Date().toISOString();
      } else if (ach.id === 'ach-tax-master' && this.data.levels.find(l => l.levelNumber === 7 && l.completed)) {
        ach.unlockedAt = new Date().toISOString();
      }
    });
  }

  public getLevels(): LevelProgress[] {
    return this.data.levels;
  }

  public updateLevelProgress(levelNumber: number, score: number): LevelProgress {
    let lvl = this.data.levels.find(l => l.levelNumber === levelNumber);
    if (!lvl) {
      lvl = { levelNumber, unlocked: true, completed: false, bestScore: score, attempts: 1, lastAttemptAt: new Date().toISOString() };
      this.data.levels.push(lvl);
    } else {
      lvl.attempts += 1;
      lvl.bestScore = Math.max(lvl.bestScore, score);
      lvl.lastAttemptAt = new Date().toISOString();
    }

    if (score >= 70) {
      lvl.completed = true;
      // Unlock next level
      const nextLvl = this.data.levels.find(l => l.levelNumber === levelNumber + 1);
      if (nextLvl) {
        nextLvl.unlocked = true;
      }
      if (this.data.user.currentLevel <= levelNumber) {
        this.data.user.currentLevel = Math.min(7, levelNumber + 1);
      }
    }

    this.save();
    return lvl;
  }

  public getDiagnosticQuestions() {
    return DIAGNOSTIC_QUESTIONS;
  }

  public saveDiagnosticResult(submission: { answers: Record<number, number> }) {
    let correctCount = 0;
    const questions = DIAGNOSTIC_QUESTIONS;
    const categoryScores: Record<string, { correct: number; total: number }> = {};

    questions.forEach(q => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { correct: 0, total: 0 };
      }
      categoryScores[q.category].total += 1;

      if (submission.answers[q.id] === q.correctIndex) {
        correctCount += 1;
        categoryScores[q.category].correct += 1;
      }
    });

    const scorePercent = Math.round((correctCount / questions.length) * 100);

    // Determine starting level based on performance, not self-claim
    let startingLevel = 1;
    if (scorePercent >= 85) startingLevel = 5;
    else if (scorePercent >= 70) startingLevel = 4;
    else if (scorePercent >= 55) startingLevel = 3;
    else if (scorePercent >= 40) startingLevel = 2;
    else startingLevel = 1;

    // Identify strengths and weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    Object.entries(categoryScores).forEach(([cat, stats]) => {
      const rate = (stats.correct / stats.total) * 100;
      if (rate >= 75) strengths.push(`${cat} (${Math.round(rate)}%)`);
      else weaknesses.push(`${cat} (${Math.round(rate)}%)`);
    });

    const recommendedTraining = [
      weaknesses.length > 0 ? `Latihan Terfokus: ${weaknesses[0]}` : 'Active Recall Fundamental',
      'Penerapan Kasus IRAC Bertahap',
      'Bedah Regulasi 7 Dimensi'
    ];

    const dailyPlan = {
      Senin: 'PPh + Active Recall (Penguatan Konsep & Tarif)',
      Selasa: 'PPN + Rule Dissection (Faktur & Pengkreditan PM)',
      Rabu: 'Case Analysis & IRAC Problem Solving',
      Kamis: 'KUP & Prosedur Pembayaran / Pelaporan',
      Jumat: 'Tax Calculation Engine (TER, PPh 23, PPN)',
      Sabtu: 'Tax Dispute & Dialektika Argumen Sengketa',
      Minggu: 'Rapid Review Mingguan & Mistake Bank Cleansing'
    };

    this.data.diagnosticCompleted = true;
    this.data.diagnosticResult = {
      completedAt: new Date().toISOString(),
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      scorePercent,
      determinedStartingLevel: startingLevel,
      strengths,
      weaknesses,
      recommendedTraining,
      dailyStudyPlan: dailyPlan
    };

    // Update user profile
    this.data.user.isOnboarded = true;
    this.data.user.currentLevel = startingLevel;
    this.data.user.weakTopics = weaknesses;
    this.data.user.accuracyRate = scorePercent;
    this.addXpAndStreak(200);

    // Unlock levels up to startingLevel
    this.data.levels.forEach(l => {
      if (l.levelNumber <= startingLevel) {
        l.unlocked = true;
      }
    });

    this.save();
    return this.data.diagnosticResult;
  }

  public getDiagnosticState() {
    return {
      completed: this.data.diagnosticCompleted,
      result: this.data.diagnosticResult
    };
  }

  public getMistakes(): MistakeEntry[] {
    return this.data.mistakeBank;
  }

  public addMistake(entry: Omit<MistakeEntry, 'id' | 'timestamp' | 'reviewCount' | 'resolved'>): MistakeEntry {
    const newEntry: MistakeEntry = {
      id: `mstk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      reviewCount: 0,
      resolved: false,
      ...entry
    };
    this.data.mistakeBank.unshift(newEntry);
    this.save();
    return newEntry;
  }

  public resolveMistake(id: string) {
    const item = this.data.mistakeBank.find(m => m.id === id);
    if (item) {
      item.resolved = true;
      item.reviewCount += 1;
      this.save();
    }
    return item;
  }

  public getSpacedRepetitionItems(): SpacedRepetitionItem[] {
    return this.data.spacedRepetition;
  }

  public updateSpacedRepetitionReview(id: string, performanceRating: number) {
    // performanceRating 0 - 5 (SuperMemo SM-2)
    const item = this.data.spacedRepetition.find(s => s.id === id);
    if (!item) return null;

    item.reviewCount += 1;
    item.lastScore = performanceRating * 20;

    // SM-2 Algorithm update
    if (performanceRating >= 3) {
      if (item.reviewCount === 1) {
        item.intervalDays = 1;
      } else if (item.reviewCount === 2) {
        item.intervalDays = 3;
      } else {
        item.intervalDays = Math.round(item.intervalDays * item.easeFactor);
      }
      item.easeFactor = Math.max(1.3, item.easeFactor + (0.1 - (5 - performanceRating) * (0.08 + (5 - performanceRating) * 0.02)));

      if (item.intervalDays > 14) {
        item.status = 'Dikuasai';
      } else if (item.intervalDays > 5) {
        item.status = 'Hampir dikuasai';
      } else {
        item.status = 'Sedang dipelajari';
      }
    } else {
      item.intervalDays = 1;
      item.status = 'Perlu diulang';
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + item.intervalDays);
    item.nextReviewDate = nextDate.toISOString().split('T')[0];

    this.save();
    return item;
  }

  public getCases(): TaxCaseStudy[] {
    return this.data.cases;
  }

  public addCase(c: TaxCaseStudy) {
    this.data.cases.unshift(c);
    this.save();
    return c;
  }

  public getCaseById(id: string): TaxCaseStudy | undefined {
    return this.data.cases.find(c => c.id === id);
  }

  public saveCaseSubmission(caseId: string, submission: any, evaluation: any) {
    const xp = Math.round((evaluation.scores?.overallScore || 70) * 2.5);
    const rec: CaseSubmission = {
      id: `sub-${Date.now()}`,
      caseId,
      timestamp: new Date().toISOString(),
      submission,
      evaluation,
      xpEarned: xp
    };
    this.data.caseSubmissions.unshift(rec);
    this.data.user.casesSolved += 1;
    this.addXpAndStreak(xp);
    this.save();
    return rec;
  }

  public getRegulations(): TaxRegulation[] {
    return this.data.regulations;
  }

  public getRegulationById(id: string): TaxRegulation | undefined {
    return this.data.regulations.find(r => r.id === id);
  }

  // ==========================================
  // ACCOUNTING ACADEMY METHODS
  // ==========================================
  public getAccountingLevels(): LevelProgress[] {
    return this.data.accountingLevels || [];
  }

  public updateAccountingLevelProgress(levelNumber: number, score: number): LevelProgress {
    if (!this.data.accountingLevels) this.data.accountingLevels = [];
    let lvl = this.data.accountingLevels.find(l => l.levelNumber === levelNumber);
    if (!lvl) {
      lvl = { levelNumber, unlocked: true, completed: false, bestScore: score, attempts: 1, lastAttemptAt: new Date().toISOString() };
      this.data.accountingLevels.push(lvl);
    } else {
      lvl.attempts += 1;
      lvl.bestScore = Math.max(lvl.bestScore, score);
      lvl.lastAttemptAt = new Date().toISOString();
    }

    if (score >= 70) {
      lvl.completed = true;
      const nextLvl = this.data.accountingLevels.find(l => l.levelNumber === levelNumber + 1);
      if (nextLvl) nextLvl.unlocked = true;
      if ((this.data.user.accountingLevel || 1) <= levelNumber) {
        this.data.user.accountingLevel = Math.min(10, levelNumber + 1);
      }
    }

    this.save();
    return lvl;
  }

  public getAccountingCases(): AccountingCase[] {
    return this.data.accountingCases || [];
  }

  public getAccountingCaseById(id: string): AccountingCase | undefined {
    return (this.data.accountingCases || []).find(c => c.id === id);
  }

  public saveAccountingSubmission(caseId: string, submission: any, evaluation: any) {
    const xp = Math.round((evaluation.scores?.overallScore || 70) * 2.5);
    const rec = {
      id: `acc-sub-${Date.now()}`,
      caseId,
      timestamp: new Date().toISOString(),
      submission,
      evaluation,
      xpEarned: xp
    };
    if (!this.data.accountingSubmissions) this.data.accountingSubmissions = [];
    this.data.accountingSubmissions.unshift(rec);
    this.addXpAndStreak(xp);
    this.save();
    return rec;
  }

  // ==========================================
  // ECONOMICS ACADEMY METHODS
  // ==========================================
  public getEconomicsLevels(): LevelProgress[] {
    return this.data.economicsLevels || [];
  }

  public updateEconomicsLevelProgress(levelNumber: number, score: number): LevelProgress {
    if (!this.data.economicsLevels) this.data.economicsLevels = [];
    let lvl = this.data.economicsLevels.find(l => l.levelNumber === levelNumber);
    if (!lvl) {
      lvl = { levelNumber, unlocked: true, completed: false, bestScore: score, attempts: 1, lastAttemptAt: new Date().toISOString() };
      this.data.economicsLevels.push(lvl);
    } else {
      lvl.attempts += 1;
      lvl.bestScore = Math.max(lvl.bestScore, score);
      lvl.lastAttemptAt = new Date().toISOString();
    }

    if (score >= 70) {
      lvl.completed = true;
      const nextLvl = this.data.economicsLevels.find(l => l.levelNumber === levelNumber + 1);
      if (nextLvl) nextLvl.unlocked = true;
      if ((this.data.user.economicsLevel || 1) <= levelNumber) {
        this.data.user.economicsLevel = Math.min(10, levelNumber + 1);
      }
    }

    this.save();
    return lvl;
  }

  public getEconomicsCases(): EconomicsCase[] {
    return this.data.economicsCases || [];
  }

  public getEconomicsCaseById(id: string): EconomicsCase | undefined {
    return (this.data.economicsCases || []).find(c => c.id === id);
  }

  public saveEconomicsSubmission(caseId: string, submission: any, evaluation: any) {
    const xp = Math.round((evaluation.scores?.overallScore || 70) * 2.5);
    const rec = {
      id: `econ-sub-${Date.now()}`,
      caseId,
      timestamp: new Date().toISOString(),
      submission,
      evaluation,
      xpEarned: xp
    };
    if (!this.data.economicsSubmissions) this.data.economicsSubmissions = [];
    this.data.economicsSubmissions.unshift(rec);
    this.addXpAndStreak(xp);
    this.save();
    return rec;
  }

  public getDashboardOverview() {
    const user = this.data.user;
    const completedTaxLevels = this.data.levels.filter(l => l.completed).length;
    const completedAccLevels = (this.data.accountingLevels || []).filter(l => l.completed).length;
    const completedEconLevels = (this.data.economicsLevels || []).filter(l => l.completed).length;
    const pendingMistakes = this.data.mistakeBank.filter(m => !m.resolved).length;
    const dueSpacedReviews = this.data.spacedRepetition.filter(s => {
      const today = new Date().toISOString().split('T')[0];
      return s.nextReviewDate <= today;
    }).length;

    return {
      user,
      completedLevelsCount: completedTaxLevels,
      completedTaxLevels,
      completedAccLevels,
      completedEconLevels,
      pendingMistakes,
      dueSpacedReviews,
      totalCases: this.data.cases.length + (this.data.accountingCases?.length || 0) + (this.data.economicsCases?.length || 0),
      levels: this.data.levels,
      accountingLevels: this.data.accountingLevels || [],
      economicsLevels: this.data.economicsLevels || [],
      weeklyActivity: this.data.weeklyActivity,
      recentCases: this.data.cases.slice(0, 3),
      recentMistakes: this.data.mistakeBank.slice(0, 3)
    };
  }

  public getBookmarks() {
    return this.data.bookmarks;
  }

  public addBookmark(type: 'regulation' | 'case', referenceId: string, note: string) {
    const newBm = {
      id: `bm-${Date.now()}`,
      type,
      referenceId,
      note,
      createdAt: new Date().toISOString()
    };
    this.data.bookmarks.unshift(newBm);
    this.save();
    return newBm;
  }

  public removeBookmark(id: string) {
    this.data.bookmarks = this.data.bookmarks.filter(b => b.id !== id);
    this.save();
  }
}

export const db = new TaxDatabase();
