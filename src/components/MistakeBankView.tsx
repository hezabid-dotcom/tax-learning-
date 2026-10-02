import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  ShieldAlert, 
  BookOpen,
  Filter,
  Check
} from 'lucide-react';
import { MistakeEntry } from '../types.ts';
import { api } from '../api.ts';

interface MistakeBankViewProps {
  onNavigateTab: (tab: string, subParam?: any) => void;
}

export const MistakeBankView: React.FC<MistakeBankViewProps> = ({ onNavigateTab }) => {
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Unresolved' | 'Resolved'>('Unresolved');
  const [activeDrillMistake, setActiveDrillMistake] = useState<MistakeEntry | null>(null);
  const [drillAnswer, setDrillAnswer] = useState('');
  const [drillEvaluated, setDrillEvaluated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMistakes();
  }, []);

  const loadMistakes = async () => {
    try {
      setLoading(true);
      const res = await api.getMistakes();
      setMistakes(res.mistakes || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      await api.resolveMistake(id);
      loadMistakes();
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = mistakes.filter(m => {
    if (selectedFilter === 'Unresolved') return !m.resolved;
    if (selectedFilter === 'Resolved') return m.resolved;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
            ERROR-BASED LEARNING SYSTEM
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Mistake Bank (Bank Kesalahan & Miskonsepsi)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Semua kekeliruan analisis, kesalahan pasal, dan salah hitung dicatat otomatis untuk dieliminasi secara terarah.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {(['Unresolved', 'Resolved', 'All'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedFilter === filter ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {filter === 'Unresolved' ? 'Belum Tuntas' : filter === 'Resolved' ? 'Sudah Diperbaiki' : 'Semua'}
            </button>
          ))}
        </div>
      </div>

      {/* Active Remedial Drill Modal / Panel */}
      {activeDrillMistake && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 text-white p-6 sm:p-7 rounded-3xl border border-slate-700 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <span className="text-xs font-bold text-rose-400 bg-rose-500/20 px-2.5 py-0.5 rounded border border-rose-500/30">
              REMEDIAL DRILL: {activeDrillMistake.topic}
            </span>
            <button
              onClick={() => {
                setActiveDrillMistake(null);
                setDrillAnswer('');
                setDrillEvaluated(false);
              }}
              className="text-xs text-slate-400 hover:text-white"
            >
              Tutup Latihan ✕
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-bold text-white">
              Tantangan Pembenaran Konsep: {activeDrillMistake.concept}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jelaskan kembali konsep yang benar dan sebutkan rujukan pasal regulasinya untuk membuktikan Anda tidak akan mengulangi kesalahan serupa.
            </p>
          </div>

          <textarea
            rows={3}
            value={drillAnswer}
            onChange={e => setDrillAnswer(e.target.value)}
            disabled={drillEvaluated}
            placeholder="Tuliskan pemahaman perbaikan Anda..."
            className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800/80 text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
          />

          {!drillEvaluated ? (
            <div className="flex justify-end">
              <button
                onClick={() => setDrillEvaluated(true)}
                disabled={!drillAnswer.trim()}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-xs"
              >
                Evaluasi Perbaikan Konsep
              </button>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-emerald-950/70 border border-emerald-700 rounded-xl text-xs text-emerald-200 leading-relaxed">
                <strong className="block font-bold mb-0.5">Penjelasan Yuridis yang Sah:</strong>
                <p>{activeDrillMistake.correctExplanation}</p>
                <p className="text-[11px] text-emerald-400 pt-1 border-t border-emerald-900 mt-1">
                  Dasar Hukum: {activeDrillMistake.legalBasis}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    handleResolve(activeDrillMistake.id);
                    setActiveDrillMistake(null);
                    setDrillAnswer('');
                    setDrillEvaluated(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  Tandai Kesalahan Tuntas Diperbaiki ✓
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mistake Items Grid */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map(m => (
            <div 
              key={m.id}
              className={`p-5 rounded-3xl border transition-all space-y-3 ${
                m.resolved ? 'bg-white border-slate-200 opacity-75' : 'bg-white border-rose-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${m.resolved ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  <span className="text-xs font-bold text-slate-900">{m.topic}</span>
                  <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                    {m.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {m.resolved ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Tuntas
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Perlu Latihan
                    </span>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-200/60 space-y-1">
                  <span className="font-bold text-rose-900 block">Kekeliruan / Jawaban Anda:</span>
                  <p className="text-rose-800 leading-relaxed font-sans">{m.mistakeDescription}</p>
                </div>

                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/60 space-y-1">
                  <span className="font-bold text-emerald-900 block">Konsep & Pembahasan yang Benar:</span>
                  <p className="text-emerald-800 leading-relaxed font-sans">{m.correctExplanation}</p>
                  <p className="text-[11px] text-emerald-700 font-mono pt-1">Rujukan: {m.legalBasis}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-400 text-[11px]">
                  Terdeteksi: {new Date(m.timestamp).toLocaleDateString('id-ID')}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveDrillMistake(m);
                      setDrillAnswer('');
                      setDrillEvaluated(false);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-2xs flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Latihan Khusus Miskonsepsi Ini</span>
                  </button>

                  {!m.resolved && (
                    <button
                      onClick={() => handleResolve(m.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                    >
                      Tandai Sudah Paham
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs text-center py-16 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">Mistake Bank Kosong / Bersih!</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Tidak ada kesalahan aktif pada filter ini. Terus kerjakan kasus di level selanjutnya untuk mendeteksi celah pemahaman baru.
          </p>
        </div>
      )}
    </div>
  );
};
