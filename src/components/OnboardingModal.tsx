import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, GraduationCap, Target, Clock } from 'lucide-react';
import { UserProfile } from '../types.ts';

interface OnboardingModalProps {
  user: UserProfile | null;
  onSave: (data: Partial<UserProfile>) => Promise<void>;
  onStartDiagnostic: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  user,
  onSave,
  onStartDiagnostic,
}) => {
  const [name, setName] = useState(user?.name || 'Revalina');
  const [semester, setSemester] = useState(user?.semester || 'Semester 4');
  const [studentStatus, setStudentStatus] = useState('Mahasiswa D3 Perpajakan');
  const [targetGoal, setTargetGoal] = useState('Membangun Legal Reasoning & Lolos Ujian Brevet AB');
  const [dailyStudyMinutes, setDailyStudyMinutes] = useState(30);
  const [selfAssessedLevel, setSelfAssessedLevel] = useState('Menengah');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await onSave({
        name,
        semester,
        studentStatus,
        targetGoal,
        dailyStudyMinutes,
        selfAssessedLevel,
      });
      onStartDiagnostic();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Selamat Datang di Tax Mastery Lab
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Konfigurasi Profil Akademis & Penalaran Pajak
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Tax Mastery Lab bukan sekadar aplikasi flashcard, melainkan sistem pelatihan penalaran hukum perpajakan berbasis IRAC, Socratic, dan Spaced Repetition untuk mahasiswa D3 Perpajakan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Status */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Panggilan / Mahasiswa</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: Reval"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Status Pendidikan</label>
              <select
                value={studentStatus}
                onChange={e => setStudentStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="Mahasiswa D3 Perpajakan">Mahasiswa D3 Perpajakan</option>
                <option value="Mahasiswa D4 / S1 Akuntansi Perpajakan">Mahasiswa D4 / S1 Akuntansi Perpajakan</option>
                <option value="Peserta Brevet Pajak AB">Peserta Brevet Pajak AB</option>
                <option value="Praktisi / Junior Tax Consultant">Praktisi / Junior Tax Consultant</option>
              </select>
            </div>
          </div>

          {/* Semester & Self-Assessed Level */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Semester Saat Ini</label>
              <select
                value={semester}
                onChange={e => setSemester(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="Semester 1">Semester 1 (Pengantar Hukum Pajak)</option>
                <option value="Semester 2">Semester 2 (KUP & PPh OP)</option>
                <option value="Semester 3">Semester 3 (PPh Pemotongan & PPN)</option>
                <option value="Semester 4">Semester 4 (PPh Badan & Akuntansi Pajak)</option>
                <option value="Semester 5">Semester 5 (Pemeriksaan & Sengketa Pajak)</option>
                <option value="Semester 6">Semester 6 (Tugas Akhir / Brevet C)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kemampuan Mandiri (Self-Assessment)</label>
              <select
                value={selfAssessedLevel}
                onChange={e => setSelfAssessedLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="Pemula">Pemula (Baru mengenal konsep dasar)</option>
                <option value="Menengah">Menengah (Bisa menghitung PPh/PPN standar)</option>
                <option value="Lanjut">Lanjut (Siap analisis kasus sengketa & IRAC)</option>
              </select>
            </div>
          </div>

          {/* Target Goal */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Pembelajaran Utama</label>
            <input
              type="text"
              required
              value={targetGoal}
              onChange={e => setTargetGoal(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: Menguasai IRAC kasus PPh 21 TER dan Lolos Brevet AB"
            />
          </div>

          {/* Daily Study Time Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Alokasi Waktu Belajar Harian</label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map(mins => (
                <button
                  type="button"
                  key={mins}
                  onClick={() => setDailyStudyMinutes(mins)}
                  className={`
                    py-2 rounded-xl text-xs font-bold border transition-all text-center
                    ${dailyStudyMinutes === mins 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xs' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}
                  `}
                >
                  {mins} Menit
                </button>
              ))}
            </div>
          </div>

          {/* Information box about diagnostic */}
          <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-900 leading-relaxed">
              Setelah menyimpan profil, Anda akan mengikuti <strong>Diagnostic Test (20 Pertanyaan)</strong>. AI akan menguji pemahaman faktual, pasal, dan kalkulasi untuk menentukan starting level yang paling presisi.
            </p>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <span>Simpan Profil & Lanjut ke Tes Diagnostik</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
