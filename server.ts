import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { db } from './server/db.ts';
import { 
  askTutorChat, 
  evaluateCaseIRAC, 
  generateSteppedHint, 
  generateTaxCase, 
  simulateDisputeTurn, 
  evaluateWhyReasoning 
} from './server/ai.ts';
import { calculateTax } from './server/taxCalculator.ts';
import { LEVEL_CURRICULUM, TRAINING_METHODS } from './server/taxData.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// ==========================================
// API ROUTES
// ==========================================

// 1. User & Profile
app.get('/api/user/profile', (req, res) => {
  res.json({ success: true, user: db.getUser() });
});

app.post('/api/user/profile', (req, res) => {
  const updated = db.updateUser(req.body);
  res.json({ success: true, user: updated });
});

app.get('/api/dashboard/overview', (req, res) => {
  const overview = db.getDashboardOverview();
  res.json({ success: true, ...overview });
});

// 2. Diagnostic Test
app.get('/api/diagnostic/questions', (req, res) => {
  res.json({ success: true, questions: db.getDiagnosticQuestions() });
});

app.get('/api/diagnostic/state', (req, res) => {
  res.json({ success: true, ...db.getDiagnosticState() });
});

app.post('/api/diagnostic/submit', (req, res) => {
  const { answers } = req.body;
  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ success: false, error: 'Jawaban diagnostik tidak valid' });
  }
  const result = db.saveDiagnosticResult({ answers });
  res.json({ success: true, result });
});

// 3. Levels (Level 1 to 7)
app.get('/api/levels', (req, res) => {
  const userLevels = db.getLevels();
  const merged = LEVEL_CURRICULUM.map(lvl => {
    const userProgress = userLevels.find(ul => ul.levelNumber === lvl.levelNumber) || {
      unlocked: lvl.levelNumber === 1,
      completed: false,
      bestScore: 0,
      attempts: 0
    };
    return { ...lvl, ...userProgress };
  });
  res.json({ success: true, levels: merged });
});

app.get('/api/levels/:levelNumber', (req, res) => {
  const levelNum = parseInt(req.params.levelNumber, 10);
  const curriculum = LEVEL_CURRICULUM.find(l => l.levelNumber === levelNum);
  if (!curriculum) {
    return res.status(404).json({ success: false, error: 'Level tidak ditemukan' });
  }
  const progress = db.getLevels().find(l => l.levelNumber === levelNum);
  res.json({ success: true, curriculum, progress });
});

app.post('/api/levels/:levelNumber/submit', (req, res) => {
  const levelNum = parseInt(req.params.levelNumber, 10);
  const { score, challengeId, answers } = req.body;
  const numScore = Math.min(100, Math.max(0, Number(score) || 0));

  const updatedProgress = db.updateLevelProgress(levelNum, numScore);
  const xpReward = Math.round(numScore * 3);
  db.addXpAndStreak(xpReward);

  // If score < 70, record into mistake bank automatically
  if (numScore < 70 && req.body.mistakeNote) {
    db.addMistake({
      topic: `Level ${levelNum}: ${LEVEL_CURRICULUM.find(l => l.levelNumber === levelNum)?.name || 'Pajak'}`,
      concept: challengeId || 'Latihan Level',
      mistakeDescription: req.body.mistakeNote || 'Evaluasi latihan level di bawah ambang 70%',
      userGivenAnswer: JSON.stringify(answers || {}),
      correctExplanation: req.body.explanation || 'Perlu penguatan konsep dan pembacaan regulasi terkait.',
      legalBasis: req.body.legalBasis || 'UU KUP/PPh/PPN',
      category: 'Prosedur KUP/Sengketa'
    });
  }

  res.json({ 
    success: true, 
    progress: updatedProgress, 
    xpEarned: xpReward,
    unlockedNext: numScore >= 70 && levelNum < 7
  });
});

// 4. Training Methods (10 Methods)
app.get('/api/training/methods', (req, res) => {
  res.json({ success: true, methods: TRAINING_METHODS });
});

// 5. Cases & IRAC
app.get('/api/cases', (req, res) => {
  const { difficulty, taxType } = req.query;
  let cases = db.getCases();
  if (difficulty) {
    cases = cases.filter(c => c.difficulty.toLowerCase() === (difficulty as string).toLowerCase());
  }
  if (taxType) {
    cases = cases.filter(c => c.taxType.toLowerCase().includes((taxType as string).toLowerCase()));
  }
  res.json({ success: true, cases });
});

app.get('/api/cases/:id', (req, res) => {
  const c = db.getCaseById(req.params.id);
  if (!c) {
    return res.status(404).json({ success: false, error: 'Kasus tidak ditemukan' });
  }
  res.json({ success: true, case: c });
});

app.post('/api/cases/generate', async (req, res) => {
  const { topic, difficulty, taxType } = req.body;
  const result = await generateTaxCase(topic, difficulty || 'Intermediate', taxType || 'PPh & PPN');
  if (result.success && result.case) {
    db.addCase(result.case);
    return res.json({ success: true, case: result.case });
  }
  res.status(500).json({ success: false, error: result.error || 'Gagal membuat kasus baru' });
});

app.post('/api/cases/:id/evaluate', async (req, res) => {
  const c = db.getCaseById(req.params.id);
  if (!c) {
    return res.status(404).json({ success: false, error: 'Kasus tidak ditemukan' });
  }

  const { submission } = req.body;
  if (!submission || !submission.issue || !submission.rule) {
    return res.status(400).json({ success: false, error: 'Submission IRAC tidak lengkap (minimal fakta, isu, dan aturan)' });
  }

  const evalResult = await evaluateCaseIRAC(c, submission);
  const evaluation = evalResult.success ? evalResult.data : evalResult.fallback;

  // Save submission
  const saved = db.saveCaseSubmission(c.id, submission, evaluation);

  // If score is low in rule or application, add to Mistake Bank
  const overallScore = evaluation.scores?.overallScore || 70;
  if (overallScore < 70) {
    db.addMistake({
      topic: `${c.topic} (${c.difficulty})`,
      concept: `Analisis IRAC Kasus: ${c.title}`,
      mistakeDescription: evaluation.weaknesses?.[0] || 'Kelemahan dalam penalaran hukum atau identifikasi aturan',
      userGivenAnswer: `Isu: ${submission.issue.substring(0, 120)}... | Aturan: ${submission.rule.substring(0, 120)}...`,
      correctExplanation: c.keySolution || evaluation.feedback?.ruleFeedback || 'Perhatikan regulasi spesifik yang mengatur kasus ini.',
      legalBasis: c.legalBasis?.map((l: any) => `${l.regulation} ${l.article}`).join('; ') || 'UU KUP/PPh/PPN',
      category: 'Prosedur KUP/Sengketa'
    });
  }

  res.json({ 
    success: true, 
    evaluation, 
    submissionId: saved.id,
    xpEarned: saved.xpEarned 
  });
});

app.post('/api/cases/:id/hint', async (req, res) => {
  const c = db.getCaseById(req.params.id);
  if (!c) {
    return res.status(404).json({ success: false, error: 'Kasus tidak ditemukan' });
  }
  const { hintLevel, userNotes } = req.body;
  const result = await generateSteppedHint(c, Number(hintLevel) || 1, userNotes || '');
  res.json(result);
});

// 6. Socratic AI Tutor & Chat
app.post('/api/ai/tutor-chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ success: false, error: 'Messages array is required' });
  }
  const user = db.getUser();
  const response = await askTutorChat(messages, user);
  res.json(response);
});

app.post('/api/ai/evaluate-why', async (req, res) => {
  const { ruleContext, userExplanation } = req.body;
  if (!ruleContext || !userExplanation) {
    return res.status(400).json({ success: false, error: 'ruleContext and userExplanation are required' });
  }
  const result = await evaluateWhyReasoning(ruleContext, userExplanation);
  if (result.data?.score) {
    db.addXpAndStreak(Math.round(result.data.score * 1.5));
  }
  res.json(result);
});

app.post('/api/ai/dispute-round', async (req, res) => {
  const { caseTitle, disputeScenario, userRole, userArgument, history } = req.body;
  if (!userArgument) {
    return res.status(400).json({ success: false, error: 'userArgument is required' });
  }
  const result = await simulateDisputeTurn({
    caseTitle: caseTitle || 'Sengketa Pajak Umum',
    disputeScenario: disputeScenario || 'Pemeriksaan Pajak dan Koreksi Fiskus',
    userRole: userRole || 'Konsultan Pajak',
    userArgument,
    history: history || []
  });
  if (result.data?.evaluation?.totalScore) {
    db.addXpAndStreak(Math.round(result.data.evaluation.totalScore * 2));
  }
  res.json(result);
});

// 7. Tax Calculator
app.post('/api/calculator/calculate', (req, res) => {
  try {
    const { taxType, periodYear, params } = req.body;
    if (!taxType || !params) {
      return res.status(400).json({ success: false, error: 'taxType and params are required' });
    }
    const result = calculateTax({ taxType, periodYear: periodYear || 2026, params });
    db.addXpAndStreak(25); // reward for using calculation engine
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 8. Regulation Library
app.get('/api/regulations', (req, res) => {
  const { q, taxType, status } = req.query;
  let regs = db.getRegulations();

  if (q) {
    const query = (q as string).toLowerCase();
    regs = regs.filter(r => 
      r.name.toLowerCase().includes(query) ||
      r.number.toLowerCase().includes(query) ||
      r.summary.toLowerCase().includes(query) ||
      r.topic.toLowerCase().includes(query) ||
      r.keyArticles.some(a => a.article.toLowerCase().includes(query) || a.content.toLowerCase().includes(query))
    );
  }

  if (taxType) {
    regs = regs.filter(r => r.taxType.toLowerCase() === (taxType as string).toLowerCase());
  }

  if (status) {
    regs = regs.filter(r => r.activeStatus === status);
  }

  res.json({ success: true, regulations: regs });
});

app.get('/api/regulations/:id', (req, res) => {
  const reg = db.getRegulationById(req.params.id);
  if (!reg) {
    return res.status(404).json({ success: false, error: 'Regulasi tidak ditemukan' });
  }
  res.json({ success: true, regulation: reg });
});

// 9. Mistake Bank
app.get('/api/mistakes', (req, res) => {
  res.json({ success: true, mistakes: db.getMistakes() });
});

app.post('/api/mistakes', (req, res) => {
  const mistake = db.addMistake(req.body);
  res.json({ success: true, mistake });
});

app.post('/api/mistakes/:id/resolve', (req, res) => {
  const resolved = db.resolveMistake(req.params.id);
  if (!resolved) {
    return res.status(404).json({ success: false, error: 'Item kesalahan tidak ditemukan' });
  }
  db.addXpAndStreak(50);
  res.json({ success: true, mistake: resolved });
});

// 10. Spaced Repetition
app.get('/api/spaced-repetition', (req, res) => {
  const items = db.getSpacedRepetitionItems();
  const today = new Date().toISOString().split('T')[0];
  const dueItems = items.filter(i => i.nextReviewDate <= today);
  res.json({ success: true, items, dueCount: dueItems.length });
});

app.post('/api/spaced-repetition/:id/review', (req, res) => {
  const { rating } = req.body; // 0 - 5
  const updated = db.updateSpacedRepetitionReview(req.params.id, Number(rating) || 3);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Item spaced repetition tidak ditemukan' });
  }
  db.addXpAndStreak(30);
  res.json({ success: true, item: updated });
});

// 11. Bookmarks
app.get('/api/bookmarks', (req, res) => {
  res.json({ success: true, bookmarks: db.getBookmarks() });
});

app.post('/api/bookmarks', (req, res) => {
  const { type, referenceId, note } = req.body;
  const bm = db.addBookmark(type, referenceId, note || '');
  res.json({ success: true, bookmark: bm });
});

app.delete('/api/bookmarks/:id', (req, res) => {
  db.removeBookmark(req.params.id);
  res.json({ success: true });
});

// ==========================================
// VITE INTEGRATION / STATIC SERVING
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tax Mastery Lab server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server boot error:', err);
});
