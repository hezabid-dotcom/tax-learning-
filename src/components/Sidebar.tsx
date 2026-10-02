import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Target, 
  Briefcase, 
  Calculator, 
  BookOpen, 
  AlertTriangle, 
  TrendingUp, 
  Bot, 
  Settings as SettingsIcon,
  Flame,
  Award,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import { UserProfile } from '../types.ts';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  user: UserProfile | null;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  user,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'learn', label: 'Learn (7 Levels)', icon: GraduationCap, badge: `Lvl ${user?.currentLevel || 1}` },
    { id: 'training', label: 'Training (10 Methods)', icon: Target, badge: 'Methods' },
    { id: 'cases', label: 'Cases & IRAC', icon: Briefcase, badge: 'Lab' },
    { id: 'calculator', label: 'Tax Calculator', icon: Calculator, badge: 'TER/PPN' },
    { id: 'regulations', label: 'Regulation Library', icon: BookOpen, badge: 'Official' },
    { id: 'mistakes', label: 'Mistake Bank', icon: AlertTriangle, badge: (user?.weakTopics?.length || 0) > 0 ? `${user?.weakTopics?.length}` : null },
    { id: 'progress', label: 'Progress & Mastery', icon: TrendingUp, badge: `${user?.accuracyRate || 0}%` },
    { id: 'ai-tutor', label: 'AI Tutor Socratic', icon: Bot, badge: 'AI' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, badge: null },
  ];

  const handleNav = (id: string) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <ScaleIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-white text-base tracking-tight">Tax Mastery Lab</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  D3
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Tax Reasoning System</p>
            </div>
          </div>

          <button 
            onClick={onCloseMobile}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Status Bar */}
        {user && (
          <div className="p-4 mx-3 my-3 bg-slate-800/50 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-200 truncate max-w-[130px]">{user.name}</span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                  <Flame className="w-3.5 h-3.5" />
                  {user.streak}d
                </span>
                <span className="text-blue-400 font-bold bg-blue-400/10 px-1.5 py-0.5 rounded border border-blue-400/20">
                  Lvl {user.currentLevel}
                </span>
              </div>
            </div>

            {/* XP progress to next level */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>XP Progress</span>
                <span className="font-mono text-slate-300">{user.xp} XP</span>
              </div>
              <div className="w-full bg-slate-700/60 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (user.xp % 500) / 5)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Menu Utama
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`
                    text-[10px] font-semibold px-2 py-0.5 rounded-full
                    ${isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-200 border border-slate-700/60'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info & Brevet badge */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-400 bg-slate-900/60">
          <div className="flex items-center gap-2 mb-1 text-slate-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Target: Brevet AB & Nilai A</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Metode IRAC, Socratic, & Spaced Repetition untuk calon tax analyst profesional.
          </p>
        </div>
      </aside>
    </>
  );
};

function ScaleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}
