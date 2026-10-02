import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  Sparkles, 
  RefreshCw,
  BookOpen,
  Calendar,
  Zap,
  TrendingUp,
  X
} from 'lucide-react';
import { api } from '../api.ts';
import { DiagnosticQuestion } from '../types.ts';

interface DiagnosticTestViewProps {
  onComplete: () => void;
  onClose?: () => void;
}

export const DiagnosticTestView: React.FC<DiagnosticTestViewProps> = ({ onComplete, onClose }) => {
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  useEffect(() => {
    loadDiagnostic();
  }, []);

  const loadDiagnostic = async () => {
    try {
      setLoading(true);
      const res = await api.getDiagnosticQuestions();
      setQuestions(res.questions || []);
    } catch (e) {
      console.error('Failed to load questions:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const currentQ = questions[currentIndex];
  const totalQ = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = totalQ > 0 ? Math.round((answeredCount / totalQ) * 100) : 0;

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await api.submitDiagnostic(userAnswers);
      if (res.success && res.result) {
        setResult(res.result);
      }
    } catch (e) {
      console.error('Submit error:', e);
      alert('Gagal mengirim hasil tes diagnostik. Silakan ulangi.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-sm font-medium text-slate-600">Menyiapkan 20 Soal Diagnostik Penalaran Pajak...</p>
      </div>
    );
  }

  // RESULT SCREEN
  if (result) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header result */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Laporan Evaluasi Diagnostik Objektif
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Tingkat Awal Ditetapkan: <span className="text-blue-400">Level {result.determinedStartingLevel}</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Hasil tes menunjukkan akurasi Anda sebesar <strong>{result.scorePercent}%</strong> ({result.correctAnswers} dari {result.totalQuestions} soal terjawab tepat). Sistem telah membuka Level 1 sampai Level {result.determinedStartingLevel}.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-700/80">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Skor Akurasi</span>
                <p className="text-xl font-bold font-mono text-emerald-400">{result.scorePercent}%</p>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Starting Level</span>
                <p className="text-xl font-bold font-mono text-blue-400">Level {result.determinedStartingLevel}</p>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Kekuatan Utama</span>
                <p className="text-xs font-semibold text-slate-200 mt-1 truncate">{result.strengths?.[0] || 'Dasar Konsep'}</p>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Topik Perlu Dilatih</span>
                <p className="text-xs font-semibold text-rose-300 mt-1 truncate">{result.weaknesses?.[0] || 'Prosedur Sengketa'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses Breakdown */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Area Penguasaan Tinggi (Strengths)
            </h3>
            {result.strengths && result.strengths.length > 0 ? (
              <ul className="space-y-2">
                {result.strengths.map((str: string, i: number) => (
                  <li key={i} className="text-xs text-slate-700 bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-2 rounded-xl flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    {str}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 italic">Perlu penguatan menyeluruh di seluruh kluster materi.</p>
            )}
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              Area Prioritas Perbaikan (Weaknesses)
            </h3>
            {result.weaknesses && result.weaknesses.length > 0 ? (
              <ul className="space-y-2">
                {result.weaknesses.map((w: string, i: number) => (
                  <li key={i} className="text-xs text-slate-700 bg-rose-50 text-rose-900 border border-rose-200 px-3 py-2 rounded-xl flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                    {w}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-emerald-600 font-medium">Luar biasa! Tidak ada kelemahan mendasar terdeteksi.</p>
            )}
          </div>
        </div>

        {/* 7-Day Study Plan Automatically Generated */}
        {result.dailyStudyPlan && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Rencana Belajar Otomatis (Adaptive 7-Day Study Plan)
              </h3>
              <span className="text-[11px] font-semibold text-slate-500">Rekomendasi AI: 30 menit/hari</span>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {Object.entries(result.dailyStudyPlan).map(([day, plan]) => (
                <div key={day} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">{day}</span>
                  <p className="text-xs font-medium text-slate-800 leading-snug">{plan as string}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onComplete}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <span>Mulai Petualangan Belajar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE TEST QUESTION VIEW
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Bar: Progress & Close */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Diagnostic Test • 20 Soal
          </span>
          <h2 className="text-lg font-bold text-slate-900 mt-1">Pemetaan Level Penalaran Pajak</h2>
        </div>

        {onClose && (
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Progress Bar & Question Counter */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-medium text-slate-600">
          <span>Soal {currentIndex + 1} dari {totalQ} ({currentQ.category})</span>
          <span>{answeredCount} Terjawab ({progressPercent}%)</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
          <div 
            className="bg-blue-600 h-full rounded-full transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      {currentQ && (
        <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          {/* Question Badge & Difficulty */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              Kategori: {currentQ.category}
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              currentQ.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
              currentQ.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
              'bg-purple-50 text-purple-700 border border-purple-200'
            }`}>
              {currentQ.difficulty}
            </span>
          </div>

          {/* Scenario Text (if any) */}
          {currentQ.scenario && (
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans border-l-4 border-l-blue-600">
              <span className="font-semibold text-slate-900 block mb-1">Kasus / Skenario:</span>
              {currentQ.scenario}
            </div>
          )}

          {/* Question Prompt */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h3>

          {/* Options List */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = userAnswers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={`
                    w-full text-left p-3.5 sm:p-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-start gap-3 border
                    ${isSelected 
                      ? 'bg-blue-50/80 border-blue-600 text-blue-950 ring-1 ring-blue-600 shadow-xs' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/60'}
                  `}
                >
                  <span className={`
                    w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5
                    ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'}
                  `}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Sebelumnya</span>
        </button>

        {/* Question Selector Numbers */}
        <div className="hidden md:flex items-center gap-1">
          {questions.map((q, idx) => {
            const isAns = userAnswers[q.id] !== undefined;
            const isCur = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`
                  w-6 h-6 rounded text-[11px] font-bold transition-colors
                  ${isCur ? 'bg-blue-600 text-white' : isAns ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}
                `}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {currentIndex < totalQ - 1 ? (
          <button
            onClick={() => setCurrentIndex(prev => Math.min(totalQ - 1, prev + 1))}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1.5 shadow-xs"
          >
            <span>Selanjutnya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2 shadow-sm shadow-emerald-600/30"
          >
            {submitting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Mengevaluasi...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Kirim & Evaluasi Diagnostik</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
