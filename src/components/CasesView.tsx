import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  HelpCircle, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  FileText, 
  Scale, 
  Award,
  Layers,
  Search,
  PlusCircle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { TaxCaseStudy, IRACEvaluation, UserProfile } from '../types.ts';
import { api } from '../api.ts';

interface CasesViewProps {
  user: UserProfile | null;
  onRefreshUser: () => void;
}

export const CasesView: React.FC<CasesViewProps> = ({ user, onRefreshUser }) => {
  const [cases, setCases] = useState<TaxCaseStudy[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [taxTypeFilter, setTaxTypeFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  // IRAC Submission form state
  const [factsInput, setFactsInput] = useState('');
  const [issueInput, setIssueInput] = useState('');
  const [ruleInput, setRuleInput] = useState('');
  const [applicationInput, setApplicationInput] = useState('');
  const [calculationInput, setCalculationInput] = useState('');
  const [conclusionInput, setConclusionInput] = useState('');

  // Socratic Hint Engine State
  const [currentHintStep, setCurrentHintStep] = useState<number>(0);
  const [hintHistory, setHintHistory] = useState<any[]>([]);
  const [loadingHint, setLoadingHint] = useState(false);

  // Case Generator Modal State
  const [showGenModal, setShowGenModal] = useState(false);
  const [genTopic, setGenTopic] = useState('PPh 21 TER dan Pemotongan Natura');
  const [genDifficulty, setGenDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');
  const [genTaxType, setGenTaxType] = useState('PPh 21');
  const [generating, setGenerating] = useState(false);

  // Evaluation Result State
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<IRACEvaluation | null>(null);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      setLoading(true);
      const res = await api.getCases();
      setCases(res.cases || []);
      if (res.cases && res.cases.length > 0 && !selectedCaseId) {
        setSelectedCaseId(res.cases[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  // Request Stepped Hint from Socratic AI
  const handleRequestNextHint = async () => {
    if (!selectedCase) return;
    const nextStep = currentHintStep + 1;
    if (nextStep > 5) return;

    try {
      setLoadingHint(true);
      const res = await api.getCaseHint(
        selectedCase.id, 
        nextStep, 
        `Isu: ${issueInput}; Aturan: ${ruleInput}`
      );
      if (res.success && res.data) {
        setCurrentHintStep(nextStep);
        setHintHistory(prev => [...prev, res.data]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingHint(false);
    }
  };

  // Submit IRAC Analysis
  const handleSubmitIRAC = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;

    if (!factsInput.trim() || !issueInput.trim() || !ruleInput.trim() || !applicationInput.trim() || !conclusionInput.trim()) {
      alert('Harap isi minimal seluruh elemen utama IRAC (Fakta, Isu, Aturan, Penerapan, dan Kesimpulan).');
      return;
    }

    try {
      setEvaluating(true);
      const res = await api.evaluateCaseIRAC(selectedCase.id, {
        facts: factsInput,
        issue: issueInput,
        rule: ruleInput,
        application: applicationInput,
        calculation: calculationInput,
        conclusion: conclusionInput,
      });

      if (res.success && res.evaluation) {
        setEvaluationResult(res.evaluation);
        onRefreshUser();
      }
    } catch (e) {
      console.error(e);
      alert('Gagal mengevaluasi kasus. Silakan periksa koneksi.');
    } finally {
      setEvaluating(false);
    }
  };

  // Generate Custom Case via Gemini
  const handleGenerateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setGenerating(true);
      const res = await api.generateCase({
        topic: genTopic,
        difficulty: genDifficulty,
        taxType: genTaxType,
      });
      if (res.success && res.case) {
        setCases(prev => [res.case, ...prev]);
        setSelectedCaseId(res.case.id);
        setShowGenModal(false);
        // reset form
        setFactsInput('');
        setIssueInput('');
        setRuleInput('');
        setApplicationInput('');
        setCalculationInput('');
        setConclusionInput('');
        setEvaluationResult(null);
        setCurrentHintStep(0);
        setHintHistory([]);
      }
    } catch (e) {
      console.error(e);
      alert('Gagal membuat kasus baru. Silakan ulangi.');
    } finally {
      setGenerating(false);
    }
  };

  // Filter cases
  const filteredCases = cases.filter(c => {
    if (difficultyFilter !== 'All' && c.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) return false;
    if (taxTypeFilter !== 'All' && !c.taxType.toLowerCase().includes(taxTypeFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header with Case Generator Button */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
            THE TAX CASE ENGINE & IRAC LAB
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Laboratorium Penalaran Kasus & IRAC
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Analisis fakta hukum, spot isu sentral, identifikasi dasar regulasi, terapkan rumus stelsel, dan tarik kesimpulan.
          </p>
        </div>

        <button
          onClick={() => setShowGenModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-2 shrink-0 shadow-blue-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Buat Kasus Nyata Baru (AI Engine)</span>
        </button>
      </div>

      {/* Main Layout: Case Selector & IRAC Workbench */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Case Selector & Filters (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-bold text-slate-800 block">Filter Kasus:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <select
                value={difficultyFilter}
                onChange={e => setDifficultyFilter(e.target.value)}
                className="p-2 rounded-xl border border-slate-300 text-slate-800 bg-white"
              >
                <option value="All">Semua Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>

              <select
                value={taxTypeFilter}
                onChange={e => setTaxTypeFilter(e.target.value)}
                className="p-2 rounded-xl border border-slate-300 text-slate-800 bg-white"
              >
                <option value="All">Semua Pajak</option>
                <option value="PPh">PPh</option>
                <option value="PPN">PPN</option>
                <option value="KUP">KUP / Sengketa</option>
              </select>
            </div>
          </div>

          {/* Cases List */}
          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredCases.map(c => {
              const isSelected = c.id === selectedCaseId;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCaseId(c.id);
                    setEvaluationResult(null);
                    setCurrentHintStep(0);
                    setHintHistory([]);
                  }}
                  className={`
                    p-4 rounded-2xl border transition-all cursor-pointer space-y-2
                    ${isSelected 
                      ? 'bg-blue-50/70 border-blue-600 shadow-xs ring-1 ring-blue-600' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      c.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      c.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {c.difficulty}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {c.taxType}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {c.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {c.chronology}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Details & IRAC Workbench (8 cols) */}
        {selectedCase && (
          <div className="lg:col-span-8 space-y-6">
            {/* Case Dossier Header */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  {selectedCase.topic}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  ID: {selectedCase.id}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {selectedCase.title}
              </h3>

              {/* Parties & Chronology */}
              <div className="space-y-3 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="font-bold text-slate-900 block mb-0.5">Identitas Para Pihak:</span>
                  <p>{selectedCase.parties}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                  <span className="font-bold text-slate-900 block">Kronologi Peristiwa & Transaksi:</span>
                  <p className="leading-relaxed">{selectedCase.chronology}</p>
                  
                  {selectedCase.transactions && selectedCase.transactions.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 space-y-1.5">
                      <span className="font-semibold text-slate-800 text-xs block">Rincian Transaksi Moneter:</span>
                      <div className="space-y-1">
                        {selectedCase.transactions.map((t, idx) => (
                          <div key={idx} className="flex justify-between text-xs font-mono p-1.5 bg-white rounded border border-slate-200">
                            <span>{t.desc} ({t.doc})</span>
                            <span className="font-bold text-blue-700">Rp {t.amount.toLocaleString('id-ID')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selectedCase.specialConditions && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950">
                    <span className="font-bold block mb-0.5">Kondisi Khusus / Legal Constraints:</span>
                    <p>{selectedCase.specialConditions}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Stepped Socratic Hint Engine */}
            <div className="bg-slate-900 text-slate-100 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">Socratic Hint Engine (Bertingkat 1-5)</h4>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Tahap Hint: {currentHintStep} / 5
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                AI tidak langsung memberikan jawaban. Hint disusun berjenjang: Pertanyaan Ringan → Arahkan Konsep → Rujukan Regulasi → Struktur IRAC → Solusi Lengkap.
              </p>

              {/* Hint History Display */}
              {hintHistory.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  {hintHistory.map((h, i) => (
                    <div key={i} className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-amber-300 font-bold">
                        <span>HINT {h.hintLevel}: {h.hintTitle}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">{h.targetConcept}</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed">{h.content}</p>
                      {h.guidingQuestion && (
                        <p className="text-blue-300 italic pt-1">
                          Pertanyaan Pemandu: "{h.guidingQuestion}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {currentHintStep < 5 ? (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleRequestNextHint}
                    disabled={loadingHint}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-xs"
                  >
                    {loadingHint ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Menganalisis Petunjuk Socratic...</span>
                      </>
                    ) : (
                      <>
                        <span>Minta Petunjuk Tahap {currentHintStep + 1}</span>
                        <Lightbulb className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-200 text-center">
                  Seluruh 5 tingkatan petunjuk telah terbuka.
                </div>
              )}
            </div>

            {/* IRAC Submission Form */}
            <form onSubmit={handleSubmitIRAC} className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Lembar Kerja IRAC (Issue, Rule, Application, Conclusion)
                  </h4>
                </div>
                <span className="text-xs text-slate-500 font-medium">Format Fakultas Hukum & Pajak</span>
              </div>

              {/* 1. FACTS FILTERING */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>1. FAKTA RELEVAN (Facts Filtering)</span>
                  <span className="text-[11px] font-normal text-slate-500">Pisahkan fakta hukum dari fakta distraksi</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={factsInput}
                  onChange={e => setFactsInput(e.target.value)}
                  placeholder="Sebutkan fakta-fakta yang memiliki konsekuensi yuridis (misal: status PTKP, periode kerja 8 bulan, adanya arus uang)..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 2. ISSUE SPOTTING */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>2. ISU PERPAJAKAN (Issue Spotting)</span>
                  <span className="text-[11px] font-normal text-slate-500">Rumuskan isu pokok dan isu sekunder</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={issueInput}
                  onChange={e => setIssueInput(e.target.value)}
                  placeholder="Apa isu perpajakan utama? (Contoh: Apakah pemotongan bulan Agustus menggunakan TER atau Pasal 17?)..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 3. RULE & LEGAL BASIS */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>3. ATURAN HUKUM (Governing Rule)</span>
                  <span className="text-[11px] font-normal text-slate-500">Sebutkan pasal UU dan nomor PMK spesifik</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={ruleInput}
                  onChange={e => setRuleInput(e.target.value)}
                  placeholder="Contoh: Pasal 16 PMK No. 168/2023 jo. Pasal 17 ayat (1) huruf a UU PPh stddt UU HPP..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 4. APPLICATION & CALCULATION */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 block">
                    4. PENERAPAN KE KASUS (Application)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={applicationInput}
                    onChange={e => setApplicationInput(e.target.value)}
                    placeholder="Uraikan bagaimana aturan hukum diterapkan ke fakta transaksi..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 block">
                    5. PERHITUNGAN MATEMATIS PAJAK (Calculation)
                  </label>
                  <textarea
                    rows={4}
                    value={calculationInput}
                    onChange={e => setCalculationInput(e.target.value)}
                    placeholder="Tuliskan formula: DPP x Tarif = Pajak terutang. Tunjukkan langkah selisih..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* 5. CONCLUSION */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>6. KESIMPULAN & MITIGASI RISIKO (Conclusion)</span>
                  <span className="text-[11px] font-normal text-slate-500">Solusi lugas dan langkah praktis bagi Wajib Pajak</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={conclusionInput}
                  onChange={e => setConclusionInput(e.target.value)}
                  placeholder="Kesimpulan akhir: Berapa pajak kurang/lebih potong, dan apa kewajiban formal yang harus dilakukan..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  disabled={evaluating}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2"
                >
                  {evaluating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Mengevaluasi dengan Rubrik Akademis AI...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Jawaban Kasus ke Evaluator AI</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* AI EVALUATION RUBRIC RESULTS */}
            {evaluationResult && (
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-blue-200 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      LEGAL REASONING RUBRIC REPORT
                    </span>
                    <h4 className="text-lg font-bold text-slate-900">
                      Hasil Evaluasi Komprehensif AI
                    </h4>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Overall Score</span>
                    <span className="text-2xl font-black font-mono text-blue-600">
                      {evaluationResult.scores?.overallScore || 75}/100
                    </span>
                  </div>
                </div>

                {/* Score Components Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { label: 'Issue Spotting', score: evaluationResult.scores?.issueScore },
                    { label: 'Rule Accuracy', score: evaluationResult.scores?.ruleScore },
                    { label: 'Application', score: evaluationResult.scores?.applicationScore },
                    { label: 'Calculation', score: evaluationResult.scores?.calculationScore },
                    { label: 'Fact Filtering', score: evaluationResult.scores?.factsScore },
                    { label: 'Argumentation', score: evaluationResult.scores?.argumentationScore },
                    { label: 'Conclusion', score: evaluationResult.scores?.conclusionScore },
                    { label: 'Overall', score: evaluationResult.scores?.overallScore }
                  ].map((sc, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      <span className="text-[11px] text-slate-500 font-medium block truncate">{sc.label}</span>
                      <span className="text-base font-bold font-mono text-slate-900">{sc.score ?? 70}%</span>
                    </div>
                  ))}
                </div>

                {/* Qualitative Feedback */}
                <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {evaluationResult.feedback?.issueFeedback && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-slate-900 block mb-0.5">Isu Hukum (Issue Spotting):</strong>
                      <p>{evaluationResult.feedback.issueFeedback}</p>
                    </div>
                  )}

                  {evaluationResult.feedback?.ruleFeedback && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-slate-900 block mb-0.5">Ketepatan Regulasi (Rule):</strong>
                      <p>{evaluationResult.feedback.ruleFeedback}</p>
                    </div>
                  )}

                  {evaluationResult.feedback?.applicationFeedback && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-slate-900 block mb-0.5">Penalaran Penerapan (Application):</strong>
                      <p>{evaluationResult.feedback.applicationFeedback}</p>
                    </div>
                  )}

                  {/* Socratic Follow-up Question */}
                  {evaluationResult.socraticFollowupQuestion && (
                    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-indigo-950 space-y-1">
                      <strong className="text-indigo-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        Pertanyaan Reflektif Penguji (Socratic Follow-up):
                      </strong>
                      <p className="italic leading-relaxed">{evaluationResult.socraticFollowupQuestion}</p>
                    </div>
                  )}

                  {/* Official Verified Sources */}
                  {evaluationResult.officialSources && evaluationResult.officialSources.length > 0 && (
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                      <span className="font-bold text-slate-900 block">Rujukan Regulasi Sah (Terverifikasi):</span>
                      <div className="space-y-1">
                        {evaluationResult.officialSources.map((src, i) => (
                          <div key={i} className="flex justify-between items-center text-slate-700 bg-white p-2 rounded border border-slate-200 font-mono text-[11px]">
                            <span>{src.name} ({src.article})</span>
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">{src.verificationNote || 'Sah JDIH'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Case Generator Modal */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                AI TAX CASE GENERATOR
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Buat Kasus Perpajakan Baru Orisinal
              </h3>
              <p className="text-xs text-slate-600">
                Sistem akan memformulasikan kasus realistis dengan 17 komponen lengkap (kronologi, transaksi, dokumen, dan distractor).
              </p>
            </div>

            <form onSubmit={handleGenerateCase} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Topik Kasus:</label>
                <input
                  type="text"
                  required
                  value={genTopic}
                  onChange={e => setGenTopic(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: PPh 21 TER dan Pemotongan Natura"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tingkat Kesulitan:</label>
                  <select
                    value={genDifficulty}
                    onChange={e => setGenDifficulty(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced (17 Elemen)</option>
                    <option value="Expert">Expert (17 Elemen)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Pajak:</label>
                  <select
                    value={genTaxType}
                    onChange={e => setGenTaxType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    <option value="PPh 21">PPh 21</option>
                    <option value="PPh 23">PPh 23</option>
                    <option value="PPN">PPN</option>
                    <option value="PPh Badan">PPh Badan</option>
                    <option value="KUP & Sengketa">KUP & Sengketa</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowGenModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={generating}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
                >
                  {generating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Merumuskan Kasus...</span>
                    </>
                  ) : (
                    <span>Formulasikan Kasus</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
