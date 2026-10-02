import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  RefreshCw,
  Scale,
  Award,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Send,
  MessageSquare
} from 'lucide-react';
import { LevelCurriculum, UserProfile } from '../types.ts';
import { api } from '../api.ts';

interface LearnViewProps {
  levels: LevelCurriculum[];
  user: UserProfile | null;
  onRefreshLevels: () => void;
  onNavigateTab: (tab: string, subParam?: any) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  levels,
  user,
  onRefreshLevels,
  onNavigateTab,
}) => {
  const [selectedLevelNum, setSelectedLevelNum] = useState<number>(user?.currentLevel || 1);
  const [activeTabMode, setActiveTabMode] = useState<'overview' | 'challenge'>('overview');

  // Level 1: Tax Map Interactive Challenge State
  const [taxMapSelectedStep, setTaxMapSelectedStep] = useState<string | null>(null);
  const [taxMapAnswers, setTaxMapAnswers] = useState<Record<string, string>>({});
  const [taxMapSubmitted, setTaxMapSubmitted] = useState(false);
  const [taxMapFeedback, setTaxMapFeedback] = useState<any>(null);

  // Level 2: Rule Dissector State
  const [ruleInputs, setRuleInputs] = useState<Record<string, string>>({
    siapa: '',
    apa: '',
    kapan: '',
    berapa: '',
    bagaimana: '',
    pengecualian: '',
    konsekuensi: ''
  });
  const [ruleSubmitted, setRuleSubmitted] = useState(false);
  const [ruleScore, setRuleScore] = useState<number | null>(null);

  // Level 3: Why Policy Reasoning State
  const [whyExplanation, setWhyExplanation] = useState('');
  const [evaluatingWhy, setEvaluatingWhy] = useState(false);
  const [whyResult, setWhyResult] = useState<any>(null);

  // Level 6: Tax Dispute State
  const [disputeRole, setDisputeRole] = useState<'Wajib Pajak' | 'Konsultan Pajak' | 'Petugas Pajak'>('Konsultan Pajak');
  const [disputeArgument, setDisputeArgument] = useState('');
  const [disputeHistory, setDisputeHistory] = useState<Array<{ role: string; speaker: string; text: string }>>([
    {
      role: 'Pemeriksa Pajak DJP',
      speaker: 'Fiskus DJP',
      text: 'Berdasarkan pengujian arus uang dan dokumen, Faktur Pajak Masukan senilai Rp 150.000.000 kami koreksi positif karena alamat cabang pembeli tidak terdaftar dalam surat pemusatan PPN.'
    }
  ]);
  const [simulatingDispute, setSimulatingDispute] = useState(false);
  const [disputeEvaluation, setDisputeEvaluation] = useState<any>(null);

  const selectedLevel = levels.find(l => l.levelNumber === selectedLevelNum) || levels[0];
  const isUnlocked = selectedLevel?.unlocked || selectedLevel?.levelNumber <= (user?.currentLevel || 1);

  // Submit Level 1: Tax Map
  const handleSubmitTaxMap = async () => {
    // Check if user correctly mapped key questions
    const q1Correct = taxMapAnswers['q1'] === 'Tarif';
    const q2Correct = taxMapAnswers['q2'] === 'Pelaporan';
    const q3Correct = taxMapAnswers['q3'] === 'Keberatan';
    const q4Correct = taxMapAnswers['q4'] === 'Subjek Pajak';

    let correctCount = [q1Correct, q2Correct, q3Correct, q4Correct].filter(Boolean).length;
    const score = Math.round((correctCount / 4) * 100);

    setTaxMapSubmitted(true);
    setTaxMapFeedback({
      score,
      correctCount,
      q1Correct,
      q2Correct,
      q3Correct,
      q4Correct,
    });

    await api.submitLevelChallenge(1, {
      score,
      challengeId: 'tax-map-positioning',
      answers: taxMapAnswers,
      mistakeNote: score < 70 ? 'Keliru memposisikan komponen siklus hukum pajak materiil vs formil.' : undefined
    });
    onRefreshLevels();
  };

  // Submit Level 2: Rule 7-Dimension
  const handleSubmitRule = async () => {
    const filledCount = Object.values(ruleInputs).filter(v => v.trim().length > 5).length;
    const score = Math.min(100, Math.round((filledCount / 7) * 100));
    setRuleScore(score);
    setRuleSubmitted(true);

    await api.submitLevelChallenge(2, {
      score,
      challengeId: 'rule-7-dimension-dissection',
      answers: ruleInputs
    });
    onRefreshLevels();
  };

  // Submit Level 3: Why Policy Evaluation with Gemini AI
  const handleSubmitWhy = async () => {
    if (!whyExplanation.trim()) return;
    try {
      setEvaluatingWhy(true);
      const res = await api.evaluateWhy(
        "Pasal 4 ayat 1 huruf a UU PPh stddt UU HPP jo. PP 55/2022: Penggantian atau imbalan berkenaan dengan pekerjaan atau jasa yang diterima atau diperoleh termasuk natura dan/atau kenikmatan kini merupakan OBJEK PAJAK bagi penerima dan BIAYA PENGURANG BRUTO (deductible) bagi pemberi kerja.",
        whyExplanation
      );
      if (res.success && res.data) {
        setWhyResult(res.data);
        await api.submitLevelChallenge(3, {
          score: res.data.score || 75,
          challengeId: 'why-policy-reasoning',
          explanation: res.data.detailedFeedback
        });
        onRefreshLevels();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setEvaluatingWhy(false);
    }
  };

  // Submit Level 6: Tax Dispute Turn with Gemini AI
  const handleSendDisputeTurn = async () => {
    if (!disputeArgument.trim()) return;
    const currentArg = disputeArgument;
    setDisputeArgument('');

    const newHistory = [
      ...disputeHistory,
      { role: disputeRole, speaker: user?.name || 'Mahasiswa', text: currentArg }
    ];
    setDisputeHistory(newHistory);

    try {
      setSimulatingDispute(true);
      const res = await api.simulateDispute({
        caseTitle: 'Sengketa Pajak Masukan Alamat Cabang PT Logam Jaya',
        disputeScenario: 'Pemeriksa mengoreksi Pajak Masukan karena alamat cabang belum dipusatkan, sementara arus uang dan arus barang valid.',
        userRole: disputeRole,
        userArgument: currentArg,
        history: disputeHistory
      });

      if (res.success && res.data) {
        setDisputeEvaluation(res.data.evaluation);
        if (res.data.opponentCounterArgument) {
          setDisputeHistory(prev => [
            ...prev,
            { role: 'Pemeriksa Pajak DJP', speaker: res.data.opponentSpeaker || 'Fiskus DJP', text: res.data.opponentCounterArgument }
          ]);
        }
        await api.submitLevelChallenge(6, {
          score: res.data.evaluation?.totalScore || 75,
          challengeId: 'tax-dispute-dialectic'
        });
        onRefreshLevels();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSimulatingDispute(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Selector Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {levels.map((lvl) => {
            const isCurrent = lvl.levelNumber === selectedLevelNum;
            const isCompleted = lvl.completed;
            const lvlUnlocked = lvl.unlocked || lvl.levelNumber <= (user?.currentLevel || 1);

            return (
              <button
                key={lvl.levelNumber}
                onClick={() => {
                  if (lvlUnlocked) {
                    setSelectedLevelNum(lvl.levelNumber);
                    setActiveTabMode('overview');
                  }
                }}
                disabled={!lvlUnlocked}
                className={`
                  px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border
                  ${isCurrent 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                    : lvlUnlocked 
                      ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900' 
                      : 'bg-slate-100/50 border-slate-200/60 text-slate-400 opacity-60 cursor-not-allowed'}
                `}
              >
                <span>Lvl {lvl.levelNumber}: {lvl.name}</span>
                {isCompleted ? (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-emerald-600'}`} />
                ) : !lvlUnlocked ? (
                  <Lock className="w-3 h-3 text-slate-400" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Level Header Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                LEVEL {selectedLevel.levelNumber} • REWARD {selectedLevel.xpReward} XP
              </span>
              {selectedLevel.completed && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Selesai
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {selectedLevel.name}: {selectedLevel.tagline}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {selectedLevel.goal}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTabMode(activeTabMode === 'overview' ? 'challenge' : 'overview')}
              className={`
                px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs
                ${activeTabMode === 'challenge' 
                  ? 'bg-slate-900 text-white hover:bg-slate-800' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'}
              `}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{activeTabMode === 'challenge' ? 'Lihat Konsep Dasar' : 'Buka Latihan Interaktif'}</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Overview vs Challenge */}
        <div className="flex border-b border-slate-200 pt-2 text-xs font-bold">
          <button
            onClick={() => setActiveTabMode('overview')}
            className={`pb-2.5 px-4 border-b-2 transition-colors ${
              activeTabMode === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Silabus & Konsep Inti
          </button>
          <button
            onClick={() => setActiveTabMode('challenge')}
            className={`pb-2.5 px-4 border-b-2 transition-colors ${
              activeTabMode === 'challenge' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Simulasi & Tantangan Interaktif
          </button>
        </div>
      </div>

      {/* OVERVIEW MODE */}
      {activeTabMode === 'overview' && (
        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Daftar Konsep yang Wajib Dikuasai
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedLevel.summary}
            </p>

            <div className="grid sm:grid-cols-2 gap-2.5 pt-2">
              {selectedLevel.coreConcepts.map((concept, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 leading-snug">{concept}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveTabMode('challenge')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>Mulai Uji Tantangan Level Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Tipe Evaluasi Level
            </h3>
            <ul className="space-y-2">
              {selectedLevel.challengeTypes.map((type, i) => (
                <li key={i} className="text-xs text-slate-700 p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  {type}
                </li>
              ))}
            </ul>

            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-blue-900 space-y-1">
              <span className="font-bold block">Prasyarat Kelulusan:</span>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                Skor minimal kelulusan adalah <strong>70%</strong>. Nilai di bawah 70% otomatis ditampung ke <em>Mistake Bank</em> untuk latihan remedial.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CHALLENGE MODE */}
      {activeTabMode === 'challenge' && (
        <div className="space-y-6">
          {/* LEVEL 1: TAX MAP INTERACTIVE */}
          {selectedLevel.levelNumber === 1 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Tantangan Spasial: Peta Siklus Perpajakan (11 Komponen)</h3>
                <p className="text-xs text-slate-600">
                  Tentukan posisi yang tepat dari setiap konsep dalam rantai hukum materiil dan formil perpajakan Indonesia.
                </p>
              </div>

              {/* Visual Interactive Map of 11 Components */}
              <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
                  Peta Siklus Perpajakan Indonesia (Alur Yuridis)
                </span>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {[
                    '1. Subjek Pajak', '2. Objek Pajak', '3. DPP', '4. Tarif', '5. Penghitungan', '6. Pembayaran',
                    '7. Pelaporan', '8. Pemeriksaan', '9. Keberatan', '10. Banding', '11. Sengketa MA'
                  ].map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTaxMapSelectedStep(step)}
                      className={`
                        p-2.5 rounded-xl text-xs font-semibold text-center border transition-all
                        ${taxMapSelectedStep === step 
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-1 ring-blue-400' 
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'}
                      `}
                    >
                      {step}
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions Set for Level 1 */}
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">
                    1. Apakah fungsi komponen "Tarif" dalam siklus perpajakan?
                  </span>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    {[
                      { val: 'Tarif', label: 'Persentase atau jumlah tertentu yang dikalikan dengan DPP untuk menghasilkan utang pajak.' },
                      { val: 'DPP', label: 'Nilai moneter transaksi yang dijadikan dasar penetapan.' },
                      { val: 'Objek Pajak', label: 'Peristiwa atau keadaan yang menimbulkan kewajiban perpajakan.' },
                      { val: 'Pelaporan', label: 'Bukti fisik pertanggungjawaban dalam SPT.' }
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setTaxMapAnswers(prev => ({ ...prev, q1: opt.val }))}
                        className={`p-3 text-left rounded-xl border font-medium transition-all ${
                          taxMapAnswers['q1'] === opt.val ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold' : 'bg-white border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">
                    2. Pada tahap manakah instrumen Surat Pemberitahuan (SPT) Masa & Tahunan berfungsi?
                  </span>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    {['Penghitungan', 'Pelaporan', 'Pemeriksaan', 'Keberatan'].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setTaxMapAnswers(prev => ({ ...prev, q2: val }))}
                        className={`p-3 text-left rounded-xl border font-medium transition-all ${
                          taxMapAnswers['q2'] === val ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold' : 'bg-white border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">
                    3. Jika Wajib Pajak tidak menyetujui koreksi pemeriksa dalam SKPKB, apa upaya hukum tingkat pertama yang wajib diajukan ke Direktur Jenderal Pajak?
                  </span>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    {['Gugatan Pengadilan Negeri', 'Keberatan (Pasal 25 UU KUP)', 'Banding ke Pengadilan Pajak', 'Kasasi ke MA'].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setTaxMapAnswers(prev => ({ ...prev, q3: val.includes('Keberatan') ? 'Keberatan' : val }))}
                        className={`p-3 text-left rounded-xl border font-medium transition-all ${
                          taxMapAnswers['q3'] === (val.includes('Keberatan') ? 'Keberatan' : val) ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold' : 'bg-white border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">
                    4. Orang Pribadi atau Badan yang berdasarkan peraturan perundang-undangan perpajakan ditentukan untuk melakukan kewajiban perpajakan termasuk pemungut atau pemotong pajak tertentu disebut?
                  </span>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    {['Subjek Pajak', 'Wajib Pajak', 'Penanggung Pajak', 'Fiskus'].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setTaxMapAnswers(prev => ({ ...prev, q4: val }))}
                        className={`p-3 text-left rounded-xl border font-medium transition-all ${
                          taxMapAnswers['q4'] === val ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold' : 'bg-white border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feedback Alert */}
              {taxMapSubmitted && taxMapFeedback && (
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                  taxMapFeedback.score >= 70 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div className="font-bold text-sm mb-1 flex items-center gap-2">
                    {taxMapFeedback.score >= 70 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
                    Skor: {taxMapFeedback.score}% ({taxMapFeedback.correctCount} / 4 Benar)
                  </div>
                  <p>
                    {taxMapFeedback.score >= 70 
                      ? 'Selamat! Anda memahami konstruksi peta besar perpajakan dari subjek, objek, penetapan, hingga sengketa. Level 2 dibuka.' 
                      : 'Perlu penguatan: Pelajari kembali pemisahan fungsi hukum materiil (Subjek, Objek, Tarif, DPP) dan hukum formil (SPT, SKP, Keberatan).'}
                  </p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSubmitTaxMap}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Kirim & Nilai Pemetaan Peta Pajak
                </button>
              </div>
            </div>
          )}

          {/* LEVEL 2: RULE (7-DIMENSION DISSECTOR) */}
          {selectedLevel.levelNumber === 2 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Latihan Bedah Regulasi 7 Dimensi
                </span>
                <h3 className="font-bold text-slate-900 text-base">Bedah Pasal 21 ayat (1) & (5) UU PPh stddt PMK-168/2023</h3>
                <p className="text-xs text-slate-600">
                  Jangan menghafal teks pasal secara pasif. Uraikan setiap elemen yuridis ke dalam 7 kolom pertanyaan:
                </p>
              </div>

              {/* 7 Columns Input */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">1. SIAPA? (Subjek pemotong & penerima)</label>
                  <textarea
                    rows={2}
                    value={ruleInputs.siapa}
                    onChange={e => setRuleInputs({ ...ruleInputs, siapa: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                    placeholder="Pemberi kerja memotong atas penghasilan pegawai tetap / bukan pegawai..."
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">2. APA? (Objek yang dikenakan)</label>
                  <textarea
                    rows={2}
                    value={ruleInputs.apa}
                    onChange={e => setRuleInputs({ ...ruleInputs, apa: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                    placeholder="Gaji, tunjangan, bonus, honorarium sehubungan pekerjaan/jasa..."
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">3. KAPAN? (Saat terutang & batas lapor)</label>
                  <textarea
                    rows={2}
                    value={ruleInputs.kapan}
                    onChange={e => setRuleInputs({ ...ruleInputs, kapan: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                    placeholder="Saat dibayarkan/disediakan untuk dibayar; setor tgl 10, lapor tgl 20 bulan berikutnya..."
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">4. BERAPA? (DPP & Formula Tarif)</label>
                  <textarea
                    rows={2}
                    value={ruleInputs.berapa}
                    onChange={e => setRuleInputs({ ...ruleInputs, berapa: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                    placeholder="Masa Jan-Nov: Bruto x TER (A/B/C). Masa Des: Pasal 17 setahun dikurangi potongan..."
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">5. BAGAIMANA? (Prosedur & e-Bupot)</label>
                  <textarea
                    rows={2}
                    value={ruleInputs.bagaimana}
                    onChange={e => setRuleInputs({ ...ruleInputs, bagaimana: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                    placeholder="Menerbitkan bukti potong 1721-VIII / 1721-A1 via e-Bupot 21/26..."
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">6. PENGECUALIAN? (Bukan objek / Fasilitas)</label>
                  <textarea
                    rows={2}
                    value={ruleInputs.pengecualian}
                    onChange={e => setRuleInputs({ ...ruleInputs, pengecualian: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                    placeholder="Zakat, santunan asuransi kecelakaan/kesehatan, beasiswa tertentu..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-800 block mb-1">7. KONSEKUENSI? (Sanksi jika lalai memotong/menyetor)</label>
                  <textarea
                    rows={2}
                    value={ruleInputs.konsekuensi}
                    onChange={e => setRuleInputs({ ...ruleInputs, konsekuensi: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                    placeholder="Diterbitkan SKPKB + sanksi bunga Pasal 13 (2) KUP, denda terlambat lapor SPT Rp 100.000..."
                  />
                </div>
              </div>

              {ruleSubmitted && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900">
                  <span className="font-bold block mb-1">Hasil Bedah Regulasi: Skor {ruleScore}%</span>
                  <p>Anda telah mendemonstrasikan pembacaan aturan hukum secara sistematis 7 dimensi!</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleSubmitRule}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Kirim Analisis 7 Dimensi
                </button>
              </div>
            </div>
          )}

          {/* LEVEL 3: WHY (POLICY REASONING) */}
          {selectedLevel.levelNumber === 3 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  Socratic Policy Reasoning Challenge
                </span>
                <h3 className="font-bold text-slate-900 text-base">Uji Filosofi Regulasi: Mengapa Natura Dijadikan Objek Pajak di UU HPP?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pada rezim lama (sebelum UU HPP), imbalan berupa natura bukan objek pajak bagi pegawai dan tidak dapat dibebankan (non-deductible) bagi perusahaan. Mulai UU HPP dan PP 55/2022, natura menjadi OBJEK PAJAK bagi penerima dan DEDUCTIBLE bagi pemberi kerja.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 block">Pertanyaan Penguji (Socratic Prompt):</span>
                <p className="text-xs text-slate-700 italic">
                  "Mengapa pemerintah mengubah aturan natura ini? Asas keadilan apa yang ingin dicapai (misal antara eksekutif bergaji tinggi vs pegawai biasa)? Apa risiko jika aturan ini ditiadakan?"
                </p>
                <textarea
                  rows={4}
                  value={whyExplanation}
                  onChange={e => setWhyExplanation(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Tuliskan analisis argumentasi kebijakan hukum pajak Anda di sini..."
                />
              </div>

              {whyResult && (
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Evaluasi Penalaran AI Tutor:</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white font-mono">
                      Skor: {whyResult.score}/100 ({whyResult.reasoningDepth})
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {whyResult.detailedFeedback}
                  </p>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 space-y-1">
                    <span className="font-bold text-blue-600 block">Rasional Ekonomi Resmi:</span>
                    <p className="text-[11px] leading-relaxed">{whyResult.economicRationale}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleSubmitWhy}
                  disabled={evaluatingWhy || !whyExplanation.trim()}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-xs flex items-center gap-2"
                >
                  {evaluatingWhy ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Menguji Argumentasi...</span>
                    </>
                  ) : (
                    <span>Evaluasi Kedalaman Penalaran</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* LEVEL 4 & 5: IRAC & TAX ANALYST DIRECT TO CASES */}
          {(selectedLevel.levelNumber === 4 || selectedLevel.levelNumber === 5) && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-center py-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {selectedLevel.name}: Selesaikan Studi Kasus di IRAC Lab
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Tantangan level ini memerlukan pengerjaan studi kasus lengkap dengan memisahkan fakta relevan dari distraksi, merumuskan isu hukum, dan menerapkan aturan perundang-undangan.
              </p>
              <button
                onClick={() => onNavigateTab('cases')}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs inline-flex items-center gap-2"
              >
                <span>Buka Kasus IRAC Lab Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* LEVEL 6: TAX DISPUTE INTERACTIVE DIALECTIC */}
          {selectedLevel.levelNumber === 6 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Simulasi Dialektika Sengketa Pajak
                </span>
                <h3 className="font-bold text-slate-900 text-base">Sengketa Koreksi Pajak Masukan Alamat Cabang</h3>
                <p className="text-xs text-slate-600">
                  Pilih peran Anda dan susun bantahan hukum atas koreksi pemeriksa pajak:
                </p>
              </div>

              {/* Role Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-700">Peran Anda:</span>
                {(['Konsultan Pajak', 'Wajib Pajak', 'Petugas Pajak'] as const).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setDisputeRole(role)}
                    className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                      disputeRole === role ? 'bg-slate-900 text-white border-slate-900 shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {/* Courtroom / Dialogue History */}
              <div className="bg-slate-900 text-slate-200 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3 max-h-80 overflow-y-auto font-sans">
                {disputeHistory.map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-xl border text-xs leading-relaxed ${
                    item.role.includes('Fiskus') || item.role.includes('Pemeriksa') 
                      ? 'bg-slate-800/80 border-slate-700 text-slate-200' 
                      : 'bg-blue-900/60 border-blue-800 text-blue-100 ml-4'
                  }`}>
                    <span className="font-bold text-[11px] text-blue-400 block mb-1">
                      {item.speaker} ({item.role}):
                    </span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Input for Next Argument */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Argumen Tanggapan / Bantahan Hukum Anda:
                </label>
                <div className="flex gap-2">
                  <textarea
                    rows={3}
                    value={disputeArgument}
                    onChange={e => setDisputeArgument(e.target.value)}
                    placeholder="Koreksi pemeriksa tidak berdasar hukum materiil karena Pasal 9 ayat 2b UU PPN jo. PER-03/PJ/2022 mengatur bahwa sepanjang arus barang dan arus uang terbukti..."
                    className="flex-1 p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[11px] text-slate-500 italic">
                    AI mengevaluasi ketepatan fakta, konsistensi dalil, dan dasar hukum positif.
                  </span>
                  <button
                    onClick={handleSendDisputeTurn}
                    disabled={simulatingDispute || !disputeArgument.trim()}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-xs flex items-center gap-2"
                  >
                    {simulatingDispute ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Menganalisis Bantahan...</span>
                      </>
                    ) : (
                      <>
                        <span>Kirim Argumen Sengketa</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Dispute Evaluation Box */}
              {disputeEvaluation && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 space-y-2">
                  <span className="font-bold block text-sm">
                    Penilaian Evaluator Netral: Skor {disputeEvaluation.totalScore}/100
                  </span>
                  <p className="leading-relaxed">{disputeEvaluation.evaluatorNotes}</p>
                </div>
              )}
            </div>
          )}

          {/* LEVEL 7: TAX MASTER CAPSTONE */}
          {selectedLevel.levelNumber === 7 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-center py-10">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Level 7: Tax Master Comprehensive Dossier
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Ujian simulasi komprehensif tanpa kisi-kisi atau petunjuk. Kasus menggabungkan PPh Badan, PPN Masukan-Keluaran, withholding tax e-Bupot, serta pemeriksaan sengketa.
              </p>
              <button
                onClick={() => onNavigateTab('cases')}
                className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-md inline-flex items-center gap-2"
              >
                <span>Buka Berkas Kasus Tax Master</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
