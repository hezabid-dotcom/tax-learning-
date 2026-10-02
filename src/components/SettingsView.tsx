import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, RotateCcw, Award, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types.ts';
import { api } from '../api.ts';

interface SettingsViewProps {
  user: UserProfile | null;
  onRefreshUser: () => void;
  onOpenDiagnostic: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onRefreshUser,
  onOpenDiagnostic,
}) => {
  const [name, setName] = useState(user?.name || 'Revalina');
  const [semester, setSemester] = useState(user?.semester || 'Semester 4');
  const [targetGoal, setTargetGoal] = useState(user?.targetGoal || 'Lulus Ujian Brevet AB');
  const [dailyStudyMinutes, setDailyStudyMinutes] = useState(user?.dailyStudyMinutes || 30);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateUserProfile({
        name,
        semester,
        targetGoal,
        dailyStudyMinutes,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      onRefreshUser();
    } catch (e) {
      console.error(e);
      alert('Gagal menyimpan profil.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Pengaturan Profil & Studi</h3>
            <p className="text-xs text-slate-500 mt-0.5">Kelola target studi, alokasi waktu harian, dan preferensi evaluasi.</p>
          </div>
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Tersimpan
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Nama Mahasiswa</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Semester</label>
              <select
                value={semester}
                onChange={e => setSemester(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white"
              >
                <option value="Semester 1">Semester 1 (Dasar Perpajakan)</option>
                <option value="Semester 2">Semester 2 (KUP & PPh OP)</option>
                <option value="Semester 3">Semester 3 (PPh Pemotongan & PPN)</option>
                <option value="Semester 4">Semester 4 (PPh Badan & Akuntansi Pajak)</option>
                <option value="Semester 5">Semester 5 (Pemeriksaan & Sengketa)</option>
                <option value="Semester 6">Semester 6 (Tugas Akhir / Brevet C)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Target Pembelajaran Utama</label>
            <input
              type="text"
              required
              value={targetGoal}
              onChange={e => setTargetGoal(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Target Waktu Belajar Harian (Menit)</label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map(mins => (
                <button
                  type="button"
                  key={mins}
                  onClick={() => setDailyStudyMinutes(mins)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    dailyStudyMinutes === mins ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {mins} Menit
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>

      {/* Retake Diagnostic Box */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-slate-900">Uji Ulang Diagnostic Test</h4>
            <p className="text-xs text-slate-500">Mulai ulang evaluasi 20 pertanyaan untuk memperbarui pemetaan kekuatan dan kelemahan.</p>
          </div>

          <button
            onClick={onOpenDiagnostic}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Ulang Tes</span>
          </button>
        </div>
      </div>

      {/* Official Legal & Academic Disclaimer */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-600 text-xs leading-relaxed space-y-1">
        <strong className="text-slate-800 block">Komitmen Kualitas & Anti-Halusinasi:</strong>
        <p>
          Aplikasi Tax Mastery Lab dirancang khusus untuk mahasiswa D3 Perpajakan dengan penegakan regulasi perpajakan Indonesia resmi (UU KUP No. 6/1983 stddt UU HPP No. 7/2021, UU PPh stddt UU HPP, UU PPN stddt UU HPP, PMK-168/2023, PP 55/2022). Semua pemanggilan AI didukung oleh model Google Gemini 3.8 Flash melalui server-side proxy yang aman.
        </p>
      </div>
    </div>
  );
};
