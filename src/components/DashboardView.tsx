import React from 'react';
import { 
  Flame, 
  Award, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  BookOpen, 
  Briefcase, 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Layers, 
  ChevronRight,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { UserProfile, LevelCurriculum } from '../types.ts';

interface DashboardViewProps {
  user: UserProfile | null;
  levels: LevelCurriculum[];
  onNavigateTab: (tab: string, subParam?: any) => void;
  onOpenDiagnostic: () => void;
  dueReviewsCount: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  levels,
  onNavigateTab,
  onOpenDiagnostic,
  dueReviewsCount,
}) => {
  // Determine greeting based on current local hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat pagi';
    if (hour < 15) return 'Selamat siang';
    if (hour < 18) return 'Selamat sore';
    return 'Selamat malam';
  };

  const currentLevelData = levels.find(l => l.levelNumber === (user?.currentLevel || 1)) || levels[0];
  const weakestTopic = (user?.weakTopics && user.weakTopics.length > 0) 
    ? user.weakTopics[0] 
    : 'Penghitungan Masa Pajak Terakhir PPh 21 TER';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Tax Reasoning Engine Aktif
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {getGreeting()}, {user?.name || 'Mahasiswa'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Target Anda: <span className="text-blue-300 font-semibold">{user?.targetGoal || 'Lulus Ujian Brevet AB'}</span>. Fokus hari ini: bangun penalaran hukum dan pisahkan fakta hukum dari distraksi bisnis.
            </p>
          </div>

          {/* Quick Mission & Streak Widget */}
          <div className="bg-slate-800/80 p-4 sm:p-5 rounded-2xl border border-slate-700/80 backdrop-blur-md flex items-center gap-4 sm:gap-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block">Current Streak</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">{user?.streak || 1} Hari</span>
              </div>
            </div>

            <div className="w-px h-10 bg-slate-700" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block">Mastery Score</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">{user?.accuracyRate || 75}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Row: Today's Mission & Weakest Topic */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Today's Mission */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Misi Belajar Hari Ini</span>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Target: {user?.dailyStudyMinutes || 30} Menit
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {currentLevelData ? `Lanjutkan ${currentLevelData.name}: ${currentLevelData.tagline}` : 'Mempelajari Level Pajak'}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {currentLevelData?.summary || 'Kuasai konsep inti perpajakan sesuai urutan kurikulum.'}
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('learn')}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs"
              >
                Mulai
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Uji Kasus IRAC dengan 5-Level Socratic Hint
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Pecahkan kasus PT Mahardika (PPh 21 TER resign tengah tahun) atau simulasi PPN faktur cacat.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('cases')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs"
              >
                Analisis
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Kasus Diselesaikan: <strong>{user?.casesSolved || 0} Kasus</strong></span>
            <span>Regulasi Dikuasai: <strong>{user?.rulesMastered || 0} Aturan</strong></span>
          </div>
        </div>

        {/* Weakest Topic Alert Card */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Topik Paling Lemah</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
              Needs Attention
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-900 leading-snug">
              {weakestTopic}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Algoritma mendeteksi Anda sering salah pada penentuan batasan aturan atau pemotongan terkait topik ini.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => onNavigateTab('mistakes')}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <span>Latihan Remedial Khusus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('ai-tutor')}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors text-center"
            >
              Tanyakan Filosofi Topik ke AI Tutor
            </button>
          </div>
        </div>
      </div>

      {/* Level Roadmap Grid Preview */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Peta Level Penalaran Pajak (7 Levels)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Dari pemetaan konsep sistemik (Level 1) hingga ujian sengketa komprehensif (Level 7)
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('learn')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Buka Semua Level</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {levels.map((lvl) => {
            const isCurrent = lvl.levelNumber === (user?.currentLevel || 1);
            const isUnlocked = lvl.unlocked || lvl.levelNumber <= (user?.currentLevel || 1);
            const isCompleted = lvl.completed;

            return (
              <div
                key={lvl.levelNumber}
                onClick={() => isUnlocked && onNavigateTab('learn')}
                className={`
                  p-3 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col justify-between min-h-[110px]
                  ${isCurrent 
                    ? 'bg-blue-50/70 border-blue-500 shadow-xs ring-1 ring-blue-500' 
                    : isCompleted 
                      ? 'bg-emerald-50/50 border-emerald-300 text-slate-800' 
                      : isUnlocked 
                        ? 'bg-white border-slate-200 hover:border-slate-300' 
                        : 'bg-slate-50 border-slate-200/60 opacity-60 cursor-not-allowed'}
                `}
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                    isCurrent ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
                  }`}>
                    Lvl {lvl.levelNumber}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    {lvl.name}
                  </h4>
                </div>

                <div className="mt-2">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Lulus
                    </span>
                  ) : isCurrent ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                      Aktif
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400">
                      {isUnlocked ? 'Tersedia' : 'Terkunci'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Launchpad to Core Modules */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Module 1: Training Methods */}
        <div 
          onClick={() => onNavigateTab('training')}
          className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">10 Training Methods</h4>
            <p className="text-xs text-slate-500 mt-1">Rule→Why→Case, IRAC, Active Recall, Rapid Review, hingga Sengketa.</p>
          </div>
        </div>

        {/* Module 2: Tax Calculator */}
        <div 
          onClick={() => onNavigateTab('calculator')}
          className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Tax Calculator</h4>
            <p className="text-xs text-slate-500 mt-1">PPh 21 TER PMK-168/2023, PPN PK-PM, PP 55 UMKM 0.5%, Fasilitas 31E.</p>
          </div>
        </div>

        {/* Module 3: Regulation Library */}
        <div 
          onClick={() => onNavigateTab('regulations')}
          className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Regulation Library</h4>
            <p className="text-xs text-slate-500 mt-1">Pustaka hukum UU KUP, PPh, PPN, PMK resmi tervalidasi JDIH Kemenkeu.</p>
          </div>
        </div>

        {/* Module 4: Socratic AI Tutor */}
        <div 
          onClick={() => onNavigateTab('ai-tutor')}
          className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">AI Tutor Socratic</h4>
            <p className="text-xs text-slate-500 mt-1">Tanya konsep, uji dialektika pasal, atau minta simulasi bantahan sengketa.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
