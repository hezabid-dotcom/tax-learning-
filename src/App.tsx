import React, { useState, useEffect } from 'react';
import { 
  Home, 
  GraduationCap, 
  Briefcase, 
  Bot, 
  User, 
  RefreshCw 
} from 'lucide-react';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { LearnView } from './components/LearnView.tsx';
import { TrainingView } from './components/TrainingView.tsx';
import { CasesView } from './components/CasesView.tsx';
import { CalculatorView } from './components/CalculatorView.tsx';
import { RegulationsView } from './components/RegulationsView.tsx';
import { MistakeBankView } from './components/MistakeBankView.tsx';
import { ProgressView } from './components/ProgressView.tsx';
import { AITutorView } from './components/AITutorView.tsx';
import { SettingsView } from './components/SettingsView.tsx';
import { OnboardingModal } from './components/OnboardingModal.tsx';
import { DiagnosticTestView } from './components/DiagnosticTestView.tsx';
import { UserProfile, LevelCurriculum } from './types.ts';
import { api } from './api.ts';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [levels, setLevels] = useState<LevelCurriculum[]>([]);
  const [dueReviewsCount, setDueReviewsCount] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Modals
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [activeTrainingMethodParam, setActiveTrainingMethodParam] = useState<string | undefined>(undefined);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoadingInitial(true);
      const [userRes, levelsRes, srRes] = await Promise.all([
        api.getUserProfile(),
        api.getLevels(),
        api.getSpacedRepetition()
      ]);

      if (userRes.user) {
        setUser(userRes.user);
        if (!userRes.user.isOnboarded) {
          setShowOnboarding(true);
        }
      }
      if (levelsRes.levels) {
        setLevels(levelsRes.levels);
      }
      if (srRes.dueCount !== undefined) {
        setDueReviewsCount(srRes.dueCount);
      }
    } catch (e) {
      console.error('App init error:', e);
    } finally {
      setLoadingInitial(false);
    }
  };

  const handleRefreshUserData = async () => {
    try {
      const [uRes, lRes, srRes] = await Promise.all([
        api.getUserProfile(),
        api.getLevels(),
        api.getSpacedRepetition()
      ]);
      if (uRes.user) setUser(uRes.user);
      if (lRes.levels) setLevels(lRes.levels);
      if (srRes.dueCount !== undefined) setDueReviewsCount(srRes.dueCount);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveOnboarding = async (profileData: Partial<UserProfile>) => {
    try {
      const res = await api.updateUserProfile(profileData);
      if (res.user) {
        setUser(res.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartDiagnosticFromOnboarding = () => {
    setShowOnboarding(false);
    setShowDiagnostic(true);
  };

  const handleDiagnosticComplete = () => {
    setShowDiagnostic(false);
    handleRefreshUserData();
    setCurrentTab('dashboard');
  };

  const handleNavigateTab = (tab: string, subParam?: any) => {
    if (tab === 'training' && typeof subParam === 'string') {
      setActiveTrainingMethodParam(subParam);
    } else {
      setActiveTrainingMethodParam(undefined);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'Dashboard Evaluasi';
      case 'learn': return 'Kurikulum 7 Level';
      case 'training': return '10 Metode Pelatihan';
      case 'cases': return 'Studi Kasus & IRAC Lab';
      case 'calculator': return 'Kalkulator Pajak Modular';
      case 'regulations': return 'Perpustakaan Regulasi';
      case 'mistakes': return 'Bank Kesalahan (Mistake Bank)';
      case 'progress': return 'Kemajuan & Mastery';
      case 'ai-tutor': return 'AI Socratic Tax Tutor';
      case 'settings': return 'Pengaturan Profil';
      default: return 'Tax Mastery Lab';
    }
  };

  const getPageSubtitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'Selamat datang kembali, bangun pola pikir hukum pajak tingkat tinggi hari ini.';
      case 'learn': return 'Dari pemahaman peta siklus pajak hingga simulasi ujian capstone.';
      case 'training': return 'Rule→Why→Case, IRAC, Active Recall, Spaced Repetition, dan Rapid Review.';
      case 'cases': return 'Bedah kasus nyata, saring distraksi fakta, dan minta petunjuk bertingkat.';
      case 'calculator': return 'Simulasi perhitungan PPh 21 TER, PP 55 UMKM, PPN, dan PPh Badan dengan rumus transparan.';
      case 'regulations': return 'Undang-undang dan PMK resmi terverifikasi JDIH Kementerian Keuangan RI.';
      case 'mistakes': return 'Eliminasi kekeliruan pemikiran dan perkuat konsep yang belum tuntas.';
      case 'progress': return 'Statistik akurasi, waktu belajar, dan lencana prestasi kompetensi.';
      case 'ai-tutor': return 'Bimbingan reflektif tanpa spoiler jawaban untuk melatih penalaran mandiri.';
      case 'settings': return 'Konfigurasi target Brevet AB, alokasi waktu belajar, dan identitas mahasiswa.';
      default: return '';
    }
  };

  if (loadingInitial && !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center animate-pulse">
          <RefreshCw className="w-6 h-6 animate-spin text-white" />
        </div>
        <h2 className="text-lg font-bold">Memuat Tax Mastery Lab...</h2>
        <p className="text-xs text-slate-400">Menyiapkan pangkalan data regulasi & penalaran kasus</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Desktop Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleNavigateTab}
        user={user}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-72 flex flex-col min-h-screen pb-20 md:pb-8">
        {/* Top Header */}
        <Header
          title={getPageTitle()}
          subtitle={getPageSubtitle()}
          user={user}
          onOpenMobile={() => setIsMobileMenuOpen(true)}
          onOpenDiagnostic={() => setShowDiagnostic(true)}
          dueReviewsCount={dueReviewsCount}
          onOpenTrainingMethod={methodId => handleNavigateTab('training', methodId)}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {showDiagnostic ? (
            <DiagnosticTestView
              onComplete={handleDiagnosticComplete}
              onClose={() => setShowDiagnostic(false)}
            />
          ) : (
            <>
              {currentTab === 'dashboard' && (
                <DashboardView
                  user={user}
                  levels={levels}
                  onNavigateTab={handleNavigateTab}
                  onOpenDiagnostic={() => setShowDiagnostic(true)}
                  dueReviewsCount={dueReviewsCount}
                />
              )}

              {currentTab === 'learn' && (
                <LearnView
                  levels={levels}
                  user={user}
                  onRefreshLevels={handleRefreshUserData}
                  onNavigateTab={handleNavigateTab}
                />
              )}

              {currentTab === 'training' && (
                <TrainingView
                  user={user}
                  onNavigateTab={handleNavigateTab}
                  defaultMethodId={activeTrainingMethodParam}
                />
              )}

              {currentTab === 'cases' && (
                <CasesView
                  user={user}
                  onRefreshUser={handleRefreshUserData}
                />
              )}

              {currentTab === 'calculator' && (
                <CalculatorView />
              )}

              {currentTab === 'regulations' && (
                <RegulationsView />
              )}

              {currentTab === 'mistakes' && (
                <MistakeBankView
                  onNavigateTab={handleNavigateTab}
                />
              )}

              {currentTab === 'progress' && (
                <ProgressView
                  user={user}
                  levels={levels}
                  onOpenDiagnostic={() => setShowDiagnostic(true)}
                  onNavigateTab={handleNavigateTab}
                />
              )}

              {currentTab === 'ai-tutor' && (
                <AITutorView
                  user={user}
                />
              )}

              {currentTab === 'settings' && (
                <SettingsView
                  user={user}
                  onRefreshUser={handleRefreshUserData}
                  onOpenDiagnostic={() => setShowDiagnostic(true)}
                />
              )}
            </>
          )}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around">
          {[
            { id: 'dashboard', label: 'Home', icon: Home },
            { id: 'learn', label: 'Learn', icon: GraduationCap },
            { id: 'cases', label: 'Cases', icon: Briefcase },
            { id: 'ai-tutor', label: 'AI', icon: Bot },
            { id: 'settings', label: 'Profil', icon: User },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleNavigateTab(tab.id)}
                className={`flex flex-col items-center gap-1 p-1 rounded-xl text-xs font-semibold transition-colors ${
                  isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px]">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Onboarding Questionnaire Modal */}
      {showOnboarding && (
        <OnboardingModal
          user={user}
          onSave={handleSaveOnboarding}
          onStartDiagnostic={handleStartDiagnosticFromOnboarding}
        />
      )}
    </div>
  );
}
