import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Flame, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Briefcase, 
  Target, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  BarChart2
} from 'lucide-react';
import { UserProfile, LevelCurriculum } from '../types.ts';

interface ProgressViewProps {
  user: UserProfile | null;
  levels: LevelCurriculum[];
  onOpenDiagnostic: () => void;
  onNavigateTab: (tab: string, subParam?: any) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  user,
  levels,
  onOpenDiagnostic,
  onNavigateTab,
}) => {
  // Topic mastery estimations
  const topicMastery = [
    { topic: 'Konsep Dasar & Peta Pajak (KUP)', mastery: 85, color: 'bg-emerald-500' },
    { topic: 'PPh Pasal 21 Pegawai Tetap & TER', mastery: 78, color: 'bg-blue-500' },
    { topic: 'PPh Final PP 55 UMKM 0,5%', mastery: 90, color: 'bg-emerald-500' },
    { topic: 'PPh Pasal 23 Jasa & Sewa', mastery: 72, color: 'bg-indigo-500' },
    { topic: 'PPN & Pengkreditan Faktur Masukan', mastery: 65, color: 'bg-amber-500' },
    { topic: 'Rekonsiliasi Fiskal & Fasilitas 31E', mastery: 60, color: 'bg-purple-500' },
    { topic: 'Sengketa Keberatan & Banding Pengadilan Pajak', mastery: 55, color: 'bg-rose-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Retake Diagnostic */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
            PERFORMANCE & MASTERY ANALYTICS
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Analitik Kemajuan & Penguasaan Topik
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Skor ini murni merefleksikan ketepatan penalaran hukum dan penyelesaian kasus, bukan ukuran kecerdasan statis.
          </p>
        </div>

        <button
          onClick={onOpenDiagnostic}
          className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-2 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Uji Ulang Tes Diagnostik (20 Soal)</span>
        </button>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Tingkat Akurasi</span>
            <Target className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">{user?.accuracyRate || 75}%</p>
          <span className="text-[11px] text-emerald-600 font-semibold block">+4% dari pekan lalu</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Kasus Dipecahkan</span>
            <Briefcase className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">{user?.casesSolved || 0}</p>
          <span className="text-[11px] text-slate-500 block">Metode IRAC & Putusan</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Aturan Dikuasai</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">{user?.rulesMastered || 0}</p>
          <span className="text-[11px] text-slate-500 block">7 Dimensi Pembacaan</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Jam Belajar</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
            {Math.round((user?.totalStudyTimeMinutes || 240) / 60)} Jam
          </p>
          <span className="text-[11px] text-slate-500 block">Target: {user?.dailyStudyMinutes || 30}m/hari</span>
        </div>
      </div>

      {/* Topic Mastery Progress Bars */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-blue-600" />
              Tingkat Penguasaan per Kluster Pajak
            </h3>
            <span className="text-xs font-semibold text-slate-500">Indikator Subsumpsi</span>
          </div>

          <div className="space-y-3 pt-2">
            {topicMastery.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-800">{item.topic}</span>
                  <span className="font-mono font-bold text-slate-900">{item.mastery}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
                  <div 
                    className={`${item.color} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${item.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level Progression Summary */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Capaian Level Kurikulum (7 Levels)
            </h3>
            <span className="text-xs font-bold text-blue-600">Level {user?.currentLevel || 1} Aktif</span>
          </div>

          <div className="space-y-2.5 pt-1">
            {levels.map(lvl => (
              <div 
                key={lvl.levelNumber}
                className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 block">
                    Level {lvl.levelNumber}: {lvl.name}
                  </span>
                  <span className="text-[11px] text-slate-500">{lvl.tagline}</span>
                </div>

                <div>
                  {lvl.completed ? (
                    <span className="px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 text-[10px]">
                      Selesai (Skor {lvl.bestScore}%)
                    </span>
                  ) : lvl.unlocked ? (
                    <span className="px-2.5 py-1 rounded-full font-bold bg-blue-100 text-blue-800 text-[10px]">
                      Sedang Dipelajari
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium text-[11px]">Terkunci</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gamification Achievements Grid */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Lencana Prestasi Akademis (Achievements)
            </h3>
            <p className="text-xs text-slate-500 font-medium">Penghargaan berbasis pencapaian nyata penalaran pajak.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {user?.achievements?.map(ach => (
            <div 
              key={ach.id}
              className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                ach.unlockedAt ? 'bg-white border-blue-200 shadow-xs' : 'bg-slate-50 border-slate-200/60 opacity-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl mx-auto flex items-center justify-center ${
                ach.unlockedAt ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-400'
              }`}>
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">{ach.name}</h4>
              <p className="text-[11px] text-slate-500 leading-snug">{ach.desc}</p>
              {ach.unlockedAt && (
                <span className="text-[10px] font-bold text-emerald-600 block mt-1">
                  Terbuka ✓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
