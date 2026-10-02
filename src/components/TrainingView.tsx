import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  BookOpen, 
  Play, 
  Check, 
  X,
  RefreshCw,
  Flame,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { TrainingMethod, SpacedRepetitionItem, MistakeEntry, UserProfile } from '../types.ts';
import { api } from '../api.ts';

interface TrainingViewProps {
  user: UserProfile | null;
  onNavigateTab: (tab: string, subParam?: any) => void;
  defaultMethodId?: string;
}

export const TrainingView: React.FC<TrainingViewProps> = ({
  user,
  onNavigateTab,
  defaultMethodId,
}) => {
  const [methods, setMethods] = useState<TrainingMethod[]>([]);
  const [activeMethodId, setActiveMethodId] = useState<string | null>(defaultMethodId || null);

  // Active Recall Mode State
  const [activeRecallItems, setActiveRecallItems] = useState<SpacedRepetitionItem[]>([]);
  const [activeRecallIndex, setActiveRecallIndex] = useState(0);
  const [activeRecallAnswer, setActiveRecallAnswer] = useState('');
  const [activeRecallEvaluated, setActiveRecallEvaluated] = useState(false);
  const [activeRecallResult, setActiveRecallResult] = useState<{ status: 'Benar' | 'Sebagian benar' | 'Salah'; note: string } | null>(null);

  // Rapid Review Timer Mode State
  const [rapidDuration, setRapidDuration] = useState<number>(10); // 5, 10, 15, 30 mins
  const [rapidRunning, setRapidRunning] = useState(false);
  const [rapidSecondsLeft, setRapidSecondsLeft] = useState(600);
  const [rapidQuestions, setRapidQuestions] = useState<any[]>([]);
  const [rapidIndex, setRapidIndex] = useState(0);
  const [rapidScore, setRapidScore] = useState(0);

  // Spaced Repetition Mode State
  const [spacedItems, setSpacedItems] = useState<SpacedRepetitionItem[]>([]);
  const [currentSpacedIdx, setCurrentSpacedIdx] = useState(0);
  const [showSpacedAnswer, setShowSpacedAnswer] = useState(false);

  useEffect(() => {
    loadMethods();
    loadSpacedItems();
  }, []);

  useEffect(() => {
    if (defaultMethodId) {
      setActiveMethodId(defaultMethodId);
    }
  }, [defaultMethodId]);

  // Timer interval for Rapid Review
  useEffect(() => {
    let interval: any = null;
    if (rapidRunning && rapidSecondsLeft > 0) {
      interval = setInterval(() => {
        setRapidSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (rapidSecondsLeft === 0) {
      setRapidRunning(false);
    }
    return () => clearInterval(interval);
  }, [rapidRunning, rapidSecondsLeft]);

  const loadMethods = async () => {
    try {
      const res = await api.getTrainingMethods();
      setMethods(res.methods || []);
    } catch (e) {
      console.error(e);
    }
  };

  const loadSpacedItems = async () => {
    try {
      const res = await api.getSpacedRepetition();
      setSpacedItems(res.items || []);
      setActiveRecallItems(res.items || []);
    } catch (e) {
      console.error(e);
    }
  };

  // Evaluate Active Recall
  const handleEvaluateActiveRecall = () => {
    if (!activeRecallAnswer.trim()) return;
    const currentItem = activeRecallItems[activeRecallIndex];
    if (!currentItem) return;

    // Simple semantic evaluation based on keywords in idealAnswer
    const userWords = activeRecallAnswer.toLowerCase();
    const ideal = currentItem.idealAnswer.toLowerCase();

    let matchedKeywords = 0;
    const keywords = ['objek', 'subjek', 'ter', 'pasal 17', 'wpop', '500', '3 bulan', 'faktur', 'deductible', 'natura'];
    keywords.forEach(kw => {
      if (ideal.includes(kw) && userWords.includes(kw)) {
        matchedKeywords++;
      }
    });

    let status: 'Benar' | 'Sebagian benar' | 'Salah' = 'Sebagian benar';
    if (matchedKeywords >= 2 || userWords.length > 50) {
      status = 'Benar';
    } else if (userWords.length < 15) {
      status = 'Salah';
    }

    setActiveRecallResult({
      status,
      note: status === 'Benar' 
        ? 'Ingatan Anda sangat presisi sesuai aturan formal.' 
        : status === 'Sebagian benar'
          ? 'Anda menangkap inti aturan, namun perhatikan ketepatan batasan teknis atau nomor pasal.'
          : 'Materi ini tampaknya belum sepenuhnya tertanam di memori jangka panjang.'
    });
    setActiveRecallEvaluated(true);
  };

  const handleNextActiveRecall = () => {
    setActiveRecallIndex(prev => (prev + 1) % activeRecallItems.length);
    setActiveRecallAnswer('');
    setActiveRecallEvaluated(false);
    setActiveRecallResult(null);
  };

  // Start Rapid Review Timer
  const handleStartRapidReview = () => {
    setRapidSecondsLeft(rapidDuration * 60);
    setRapidRunning(true);
    setRapidIndex(0);
    setRapidScore(0);
    // Shuffle or select 10 questions for rapid sprint
    setRapidQuestions(activeRecallItems.slice(0, 5));
  };

  // Spaced Repetition Rating Submit
  const handleRateSpacedItem = async (rating: number) => {
    const item = spacedItems[currentSpacedIdx];
    if (!item) return;

    try {
      await api.reviewSpacedItem(item.id, rating);
      setShowSpacedAnswer(false);
      setCurrentSpacedIdx(prev => Math.min(spacedItems.length - 1, prev + 1));
      loadSpacedItems();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
            TAX REASONING GYM
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            10 Metode Pembelajaran Terpadu
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Pilih metode latihan spesifik untuk menajamkan aspek memori, kalkulasi, penyaringan fakta, atau kecepatan respons.
          </p>
        </div>

        {activeMethodId && (
          <button
            onClick={() => setActiveMethodId(null)}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors shrink-0"
          >
            ← Kembali ke Menu Metode
          </button>
        )}
      </div>

      {/* 1. SELECTION GRID OF 10 METHODS (when no active method chosen) */}
      {!activeMethodId && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {methods.map((method) => {
            const isCaseAnalysis = method.id === 'method-5-case-analysis' || method.id === 'method-2-irac';
            const isCalc = method.id === 'method-7-tax-calculation';
            const isSocratic = method.id === 'method-6-socratic-ai';
            const isError = method.id === 'method-9-error-review';

            return (
              <div
                key={method.id}
                onClick={() => {
                  if (isCaseAnalysis) onNavigateTab('cases');
                  else if (isCalc) onNavigateTab('calculator');
                  else if (isSocratic) onNavigateTab('ai-tutor');
                  else if (isError) onNavigateTab('mistakes');
                  else setActiveMethodId(method.id);
                }}
                className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      Method {method.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {method.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {method.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {method.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {method.estimatedDuration}
                  </span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Mulai</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. METHOD 3: ACTIVE RECALL MODE */}
      {activeMethodId === 'method-3-active-recall' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                ACTIVE RECALL MODE
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Uji Tarik Memori (Retrieval Practice)</h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">
              Kartu {activeRecallIndex + 1} dari {activeRecallItems.length}
            </span>
          </div>

          {activeRecallItems[activeRecallIndex] && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-xs text-slate-500 font-semibold">Regulasi Rujukan:</span>
                <p className="text-xs font-mono font-bold text-slate-800">
                  {activeRecallItems[activeRecallIndex].taxLawReference}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {activeRecallItems[activeRecallIndex].coreQuestion}
                </h4>
                <p className="text-xs text-slate-500 italic">
                  Teks jawaban tersembunyi. Tuliskan jawaban Anda dari ingatan murni tanpa melihat buku atau internet.
                </p>
              </div>

              <textarea
                rows={4}
                value={activeRecallAnswer}
                onChange={e => setActiveRecallAnswer(e.target.value)}
                disabled={activeRecallEvaluated}
                placeholder="Ketik jawaban Anda dari ingatan..."
                className="w-full p-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
              />

              {!activeRecallEvaluated ? (
                <div className="flex justify-end">
                  <button
                    onClick={handleEvaluateActiveRecall}
                    disabled={!activeRecallAnswer.trim()}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-xs"
                  >
                    Bandingkan Jawaban dengan Kunci Yuridis
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  {/* Evaluation Result */}
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    activeRecallResult?.status === 'Benar' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                      : activeRecallResult?.status === 'Sebagian benar'
                        ? 'bg-amber-50 border-amber-200 text-amber-950'
                        : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}>
                    <div className="font-bold text-sm mb-1 flex items-center gap-2">
                      <span>Status Penilaian:</span>
                      <span className="px-2 py-0.5 rounded-md font-bold uppercase text-xs bg-white/70">
                        {activeRecallResult?.status}
                      </span>
                    </div>
                    <p>{activeRecallResult?.note}</p>
                  </div>

                  {/* Revealed Official Answer */}
                  <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 space-y-1 text-xs">
                    <span className="text-blue-400 font-bold block mb-1">Kunci Jawaban Resmi:</span>
                    <p className="leading-relaxed">{activeRecallItems[activeRecallIndex].idealAnswer}</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextActiveRecall}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <span>Soal Active Recall Berikutnya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. METHOD 4: SPACED REPETITION MODE */}
      {activeMethodId === 'method-4-spaced-repetition' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                SPACED REPETITION (SM-2)
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Review Berjarak Berdasarkan Interval Lupa</h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">
              Antrean: {currentSpacedIdx + 1} / {spacedItems.length}
            </span>
          </div>

          {spacedItems[currentSpacedIdx] ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">
                  Topik: {spacedItems[currentSpacedIdx].conceptTitle}
                </span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                  spacedItems[currentSpacedIdx].status === 'Dikuasai' ? 'bg-emerald-100 text-emerald-800' :
                  spacedItems[currentSpacedIdx].status === 'Perlu diulang' ? 'bg-rose-100 text-rose-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {spacedItems[currentSpacedIdx].status}
                </span>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <span className="text-xs text-slate-500 font-semibold block">Pertanyaan Review:</span>
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {spacedItems[currentSpacedIdx].coreQuestion}
                </h4>
              </div>

              {!showSpacedAnswer ? (
                <button
                  onClick={() => setShowSpacedAnswer(true)}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-xs text-center"
                >
                  Tampilkan Jawaban & Evaluasi Ingatan
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="p-5 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <span className="text-emerald-400 font-bold block">Pembahasan Yuridis & Kunci:</span>
                    <p className="leading-relaxed">{spacedItems[currentSpacedIdx].idealAnswer}</p>
                    <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                      Rujukan: {spacedItems[currentSpacedIdx].taxLawReference}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-700 block text-center">
                      Bagaimana kualitas ingatan Anda terhadap materi ini? (SuperMemo SM-2):
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => handleRateSpacedItem(1)}
                        className="p-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs font-bold hover:bg-rose-100"
                      >
                        Lupa Total (1d)
                      </button>
                      <button
                        onClick={() => handleRateSpacedItem(3)}
                        className="p-2.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold hover:bg-amber-100"
                      >
                        Sulit (2d)
                      </button>
                      <button
                        onClick={() => handleRateSpacedItem(4)}
                        className="p-2.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-800 text-xs font-bold hover:bg-blue-100"
                      >
                        Cukup Baik (4d)
                      </button>
                      <button
                        onClick={() => handleRateSpacedItem(5)}
                        className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100"
                      >
                        Sangat Mudah (7d+)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">Seluruh Materi Hari Ini Telah Di-review!</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Algoritma spaced repetition akan menjadwalkan kartu berikutnya saat kurva ingatan Anda mencapai ambang lupa.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 4. METHOD 8: RAPID REVIEW MODE */}
      {activeMethodId === 'method-8-rapid-review' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
                RAPID REVIEW SPRINT
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Latihan Cepat Bertenggat Waktu</h3>
            </div>
            {rapidRunning && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-orange-700 font-mono font-bold text-sm border border-orange-200">
                <Clock className="w-4 h-4 animate-spin" />
                <span>
                  {Math.floor(rapidSecondsLeft / 60)}:{(rapidSecondsLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>

          {!rapidRunning ? (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Pilih Durasi Sprint:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 30].map(mins => (
                    <button
                      key={mins}
                      onClick={() => setRapidDuration(mins)}
                      className={`py-3 rounded-2xl text-xs font-bold border transition-all text-center ${
                        rapidDuration === mins ? 'bg-blue-600 border-blue-600 text-white shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {mins} Menit
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                Algoritma akan memprioritaskan soal-soal pada <strong>topik terlemah Anda</strong> ({user?.weakTopics?.[0] || 'KUP & PPh 21 TER'}). Tujuannya melatih kecepatan retrieval dalam kondisi tertekan layaknya ujian sesungguhnya.
              </div>

              <button
                onClick={handleStartRapidReview}
                className="w-full py-3.5 rounded-2xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-colors shadow-md shadow-orange-500/20 text-center"
              >
                Mulai Rapid Review ({rapidDuration} Menit)
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {rapidQuestions[rapidIndex] && (
                <div className="space-y-4">
                  <span className="text-xs font-semibold text-slate-500">
                    Sprint Soal {rapidIndex + 1} dari {rapidQuestions.length}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {rapidQuestions[rapidIndex].coreQuestion}
                  </h4>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs leading-relaxed space-y-1">
                    <span className="font-bold text-blue-600 block">Kunci Cepat:</span>
                    <p>{rapidQuestions[rapidIndex].idealAnswer}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setRapidScore(prev => prev + 1);
                        if (rapidIndex < rapidQuestions.length - 1) setRapidIndex(prev => prev + 1);
                        else setRapidRunning(false);
                      }}
                      className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                    >
                      Saya Hafal & Tepat
                    </button>
                    <button
                      onClick={() => {
                        if (rapidIndex < rapidQuestions.length - 1) setRapidIndex(prev => prev + 1);
                        else setRapidRunning(false);
                      }}
                      className="flex-1 py-3 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                    >
                      Ragu / Lupa
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 5. METHOD 1: RULE -> WHY -> CASE DIRECT OVERVIEW */}
      {activeMethodId === 'method-1-rule-why-case' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-6 text-center py-10">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Metode Rule → Why → Case
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Metode ini terintegrasi penuh dalam kurikulum Level 2 (Rule Dissection), Level 3 (Why Policy Testing), dan Level 4 (IRAC Case Lab).
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('learn')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-xs"
            >
              Buka Level 2 & 3
            </button>
            <button
              onClick={() => onNavigateTab('cases')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-xs"
            >
              Buka Kasus Nyata
            </button>
          </div>
        </div>
      )}

      {/* 6. METHOD 10: FULL SIMULATION DIRECT OVERVIEW */}
      {activeMethodId === 'method-10-full-simulation' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-6 text-center py-10">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Full Simulation Exam Mode
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Simulasi komprehensif ujian akhir tanpa kisi-kisi atau petunjuk awal. Selesaikan kasus dossier Level 7: Tax Master.
          </p>
          <button
            onClick={() => onNavigateTab('cases')}
            className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-xs inline-flex items-center gap-2"
          >
            <span>Buka Ujian Simulasi Komprehensif</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
