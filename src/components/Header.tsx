import React from 'react';
import { Menu, Flame, Clock, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { UserProfile } from '../types.ts';

interface HeaderProps {
  title: string;
  subtitle?: string;
  user: UserProfile | null;
  onOpenMobile: () => void;
  onOpenDiagnostic: () => void;
  dueReviewsCount: number;
  onOpenTrainingMethod?: (methodId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  user,
  onOpenMobile,
  onOpenDiagnostic,
  dueReviewsCount,
  onOpenTrainingMethod,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3.5 flex items-center justify-between transition-all">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Stats & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Spaced Review Due Badge */}
        {dueReviewsCount > 0 && (
          <button
            onClick={() => onOpenTrainingMethod && onOpenTrainingMethod('method-4-spaced-repetition')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors shadow-2xs"
            title={`${dueReviewsCount} materi perlu diulang hari ini`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="hidden sm:inline">Review:</span>
            <span className="font-bold">{dueReviewsCount}</span>
          </button>
        )}

        {/* Diagnostic Test Trigger / Status */}
        <button
          onClick={onOpenDiagnostic}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">{user?.isOnboarded ? 'Tes Diagnostik' : 'Mulai Diagnostik'}</span>
        </button>

        {/* Streak Pill */}
        {user && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span>{user.streak} Hari</span>
          </div>
        )}

        {/* Semester / Status Badge */}
        {user && (
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
            <Award className="w-3.5 h-3.5 text-slate-500" />
            <span>{user.semester}</span>
          </div>
        )}
      </div>
    </header>
  );
};
