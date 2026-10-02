import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  RotateCcw,
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';
import { CalculationResult } from '../types.ts';
import { api } from '../api.ts';

export const CalculatorView: React.FC = () => {
  const [selectedTaxModule, setSelectedTaxModule] = useState<string>('pph21_ter');
  const [periodYear, setPeriodYear] = useState<number>(2026);

  // Form states
  // 1. PPh 21 TER
  const [grossMonthly, setGrossMonthly] = useState<number>(8500000);
  const [ptkpStatus, setPtkpStatus] = useState<string>('TK/0');
  const [isMasaDesember, setIsMasaDesember] = useState<boolean>(false);
  const [grossAnnual, setGrossAnnual] = useState<number>(102000000);
  const [iuranPensiunAnnual, setIuranPensiunAnnual] = useState<number>(2400000);
  const [taxPaidJanNov, setTaxPaidJanNov] = useState<number>(1320000);

  // 2. PPh 21 Bukan Pegawai
  const [grossBukanPegawai, setGrossBukanPegawai] = useState<number>(25000000);
  const [hasNPWPBukanPegawai, setHasNPWPBukanPegawai] = useState<boolean>(true);

  // 3. PPh Final UMKM PP 55/2022
  const [umkmTaxpayerType, setUmkmTaxpayerType] = useState<string>('WPOP');
  const [grossOmzetMonthly, setGrossOmzetMonthly] = useState<number>(150000000);
  const [accumulatedOmzetPrior, setAccumulatedOmzetPrior] = useState<number>(450000000);

  // 4. PPh 23
  const [pph23TransactionType, setPph23TransactionType] = useState<string>('Jasa Konsultan / Manajemen / Teknik');
  const [pph23Gross, setPph23Gross] = useState<number>(50000000);
  const [hasNPWPPph23, setHasNPWPPph23] = useState<boolean>(true);

  // 5. PPN
  const [ppnGrossSales, setPpnGrossSales] = useState<number>(200000000);
  const [ppnMasukan, setPpnMasukan] = useState<number>(14000000);
  const [ppnRate, setPpnRate] = useState<number>(0.11);

  // 6. PPh Badan
  const [badanRevenue, setBadanRevenue] = useState<number>(4200000000);
  const [badanPKP, setBadanPKP] = useState<number>(450000000);

  // Calculation output state
  const [loading, setLoading] = useState<boolean>(false);
  const [calcResult, setCalcResult] = useState<CalculationResult | null>(null);

  const handleCalculate = async () => {
    try {
      setLoading(true);
      let params: Record<string, any> = {};

      if (selectedTaxModule === 'pph21_ter') {
        params = {
          grossMonthly,
          ptkpStatus,
          isMasaDesember,
          grossAnnual: isMasaDesember ? grossAnnual : grossMonthly * 12,
          iuranPensiunAnnual,
          taxPaidJanNov
        };
      } else if (selectedTaxModule === 'pph21_bukan_pegawai') {
        params = {
          gross: grossBukanPegawai,
          hasNPWP: hasNPWPBukanPegawai
        };
      } else if (selectedTaxModule === 'pph_final_umkm') {
        params = {
          taxpayerType: umkmTaxpayerType,
          grossOmzet: grossOmzetMonthly,
          accumulatedOmzetPrior
        };
      } else if (selectedTaxModule === 'pph23') {
        params = {
          transactionType: pph23TransactionType,
          gross: pph23Gross,
          hasNPWP: hasNPWPPph23
        };
      } else if (selectedTaxModule === 'ppn') {
        params = {
          grossSales: ppnGrossSales,
          ppnMasukan,
          ppnRate
        };
      } else if (selectedTaxModule === 'pph_badan') {
        params = {
          grossRevenue: badanRevenue,
          pkp: badanPKP
        };
      }

      const res = await api.calculateTax(selectedTaxModule, params, periodYear);
      if (res.success && res.result) {
        setCalcResult(res.result);
      }
    } catch (e: any) {
      console.error(e);
      alert(`Gagal menghitung: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
            MODULAR INDONESIAN TAX CALCULATOR
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Kalkulator Pajak Komprehensif
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Pemisahan transparan 4 pilar: Input Data → Rumus Yuridis → Proses Langkah demi Langkah → Hasil Akhir.
          </p>
        </div>

        {/* Year Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Tahun Pajak / Regulasi:</span>
          <select
            value={periodYear}
            onChange={e => setPeriodYear(Number(e.target.value))}
            className="p-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
          >
            <option value={2026}>2026 (UU HPP & PMK-168/2023)</option>
            <option value={2025}>2025 (UU HPP & PMK-168/2023)</option>
            <option value={2024}>2024 (Awal TER PMK-168)</option>
          </select>
        </div>
      </div>

      {/* Module Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {[
          { id: 'pph21_ter', label: 'PPh 21 TER Pegawai' },
          { id: 'pph21_bukan_pegawai', label: 'PPh 21 Bukan Pegawai' },
          { id: 'pph_final_umkm', label: 'UMKM PP 55 (0,5%)' },
          { id: 'pph23', label: 'PPh 23 Jasa & Sewa' },
          { id: 'ppn', label: 'PPN 11% (PK-PM)' },
          { id: 'pph_badan', label: 'PPh Badan (Pasal 31E)' },
        ].map(m => (
          <button
            key={m.id}
            type="button"
            onClick={() => {
              setSelectedTaxModule(m.id);
              setCalcResult(null);
            }}
            className={`
              p-3 rounded-2xl text-xs font-bold transition-all text-center border
              ${selectedTaxModule === m.id 
                ? 'bg-blue-600 border-blue-600 text-white shadow-xs' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'}
            `}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Layout: Input Panel & Results Panel */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* INPUT PANEL (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>Input Parameter Perhitungan</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-500">Pilar 1: Data Transaksi</span>
          </div>

          {/* Module 1: PPh 21 TER */}
          {selectedTaxModule === 'pph21_ter' && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Masa Pajak:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMasaDesember(false)}
                    className={`p-2 rounded-xl font-bold border transition-all ${
                      !isMasaDesember ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Januari - November (TER)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMasaDesember(true)}
                    className={`p-2 rounded-xl font-bold border transition-all ${
                      isMasaDesember ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Desember (Pasal 17)
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Status PTKP Pegawai:</label>
                <select
                  value={ptkpStatus}
                  onChange={e => setPtkpStatus(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                >
                  <option value="TK/0">TK/0 (TER Kategori A - PTKP 54 Juta)</option>
                  <option value="TK/1">TK/1 (TER Kategori A - PTKP 58.5 Juta)</option>
                  <option value="K/0">K/0 (TER Kategori A - PTKP 58.5 Juta)</option>
                  <option value="TK/2">TK/2 (TER Kategori B - PTKP 63 Juta)</option>
                  <option value="TK/3">TK/3 (TER Kategori B - PTKP 67.5 Juta)</option>
                  <option value="K/1">K/1 (TER Kategori B - PTKP 63 Juta)</option>
                  <option value="K/2">K/2 (TER Kategori B - PTKP 67.5 Juta)</option>
                  <option value="K/3">K/3 (TER Kategori C - PTKP 72 Juta)</option>
                </select>
              </div>

              {!isMasaDesember ? (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Penghasilan Bruto Sebulan (Rp):</label>
                  <input
                    type="number"
                    value={grossMonthly}
                    onChange={e => setGrossMonthly(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Gaji pokok + tunjangan tetap + uang lembur + natura yang tidak dikecualikan
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Penghasilan Bruto Setahun Penuh (Rp):</label>
                    <input
                      type="number"
                      value={grossAnnual}
                      onChange={e => setGrossAnnual(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Iuran Pensiun / JHT Dibayar Pegawai Setahun (Rp):</label>
                    <input
                      type="number"
                      value={iuranPensiunAnnual}
                      onChange={e => setIuranPensiunAnnual(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">PPh 21 Telah Dipotong Jan - Nov (Rp):</label>
                    <input
                      type="number"
                      value={taxPaidJanNov}
                      onChange={e => setTaxPaidJanNov(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs text-blue-700 font-bold"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Module 2: PPh 21 Bukan Pegawai */}
          {selectedTaxModule === 'pph21_bukan_pegawai' && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Jumlah Imbalan Bruto (Rp):</label>
                <input
                  type="number"
                  value={grossBukanPegawai}
                  onChange={e => setGrossBukanPegawai(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="npwpBukanPegawai"
                  checked={hasNPWPBukanPegawai}
                  onChange={e => setHasNPWPBukanPegawai(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="npwpBukanPegawai" className="text-slate-800 font-medium">
                  Memiliki NPWP / NIK Tervalidasi (Tanpa kenaikan 20%)
                </label>
              </div>
            </div>
          )}

          {/* Module 3: UMKM PP 55/2022 */}
          {selectedTaxModule === 'pph_final_umkm' && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Bentuk Wajib Pajak:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUmkmTaxpayerType('WPOP')}
                    className={`p-2 rounded-xl font-bold border transition-all ${
                      umkmTaxpayerType === 'WPOP' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Orang Pribadi (Fasilitas 500 Jt)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUmkmTaxpayerType('Badan')}
                    className={`p-2 rounded-xl font-bold border transition-all ${
                      umkmTaxpayerType === 'Badan' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Badan (PT/CV/Koperasi)
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Peredaran Bruto / Omzet Bulan Ini (Rp):</label>
                <input
                  type="number"
                  value={grossOmzetMonthly}
                  onChange={e => setGrossOmzetMonthly(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs"
                />
              </div>

              {umkmTaxpayerType === 'WPOP' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Akumulasi Omzet Bulan-Bulan Sebelumnya (Rp):</label>
                  <input
                    type="number"
                    value={accumulatedOmzetPrior}
                    onChange={e => setAccumulatedOmzetPrior(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Batas kumulatif bebas pajak: Rp 500.000.000 dalam 1 tahun pajak.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Module 4: PPh 23 */}
          {selectedTaxModule === 'pph23' && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Jenis Objek Transaksi:</label>
                <select
                  value={pph23TransactionType}
                  onChange={e => setPph23TransactionType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                >
                  <option value="Jasa Konsultan / Manajemen / Teknik">Jasa Konsultan / Manajemen / Teknik (2%)</option>
                  <option value="Sewa Harta Selain Tanah & Bangunan">Sewa Kendaraan / Peralatan / Harta (2%)</option>
                  <option value="Royalti">Royalti (15%)</option>
                  <option value="Dividen">Dividen kepada WP Badan Dalam Negeri (15%)</option>
                  <option value="Bunga">Bunga Pinjaman (15%)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nilai Bruto Tagihan (Tidak Termasuk PPN) (Rp):</label>
                <input
                  type="number"
                  value={pph23Gross}
                  onChange={e => setPph23Gross(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="npwpPph23"
                  checked={hasNPWPPph23}
                  onChange={e => setHasNPWPPph23(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="npwpPph23" className="text-slate-800 font-medium">
                  Rekanan Memiliki NPWP Valid (Jika tanpa NPWP tarif +100%)
                </label>
              </div>
            </div>
          )}

          {/* Module 5: PPN */}
          {selectedTaxModule === 'ppn' && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tarif PPN:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPpnRate(0.11)}
                    className={`p-2 rounded-xl font-bold border transition-all ${
                      ppnRate === 0.11 ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    11% (UU HPP Berlaku)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPpnRate(0.12)}
                    className={`p-2 rounded-xl font-bold border transition-all ${
                      ppnRate === 0.12 ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    12% (UU HPP Masa Depan)
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">DPP Penyerahan BKP / JKP (Rp):</label>
                <input
                  type="number"
                  value={ppnGrossSales}
                  onChange={e => setPpnGrossSales(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Pajak Masukan yang Dapat Dikreditkan (Rp):</label>
                <input
                  type="number"
                  value={ppnMasukan}
                  onChange={e => setPpnMasukan(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* Module 6: PPh Badan */}
          {selectedTaxModule === 'pph_badan' && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Peredaran Bruto Komersial Setahun (Rp):</label>
                <input
                  type="number"
                  value={badanRevenue}
                  onChange={e => setBadanRevenue(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Batas Fasilitas Pasal 31E: s.d. Rp 4,8 M (diskon 50% penuh); Rp 4,8 M - 50 M (diskon proporsional); di atas 50 M (tarif normal 22%).
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Penghasilan Kena Pajak (PKP Fiskal) (Rp):</label>
                <input
                  type="number"
                  value={badanPKP}
                  onChange={e => setBadanPKP(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <span>Jalankan Kalkulasi & Bedah Langkah</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* RESULTS PANEL (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {calcResult ? (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              {/* Header result */}
              <div className="border-b border-slate-100 pb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {calcResult.taxType}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">{calcResult.subType}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block font-medium">Pajak Terutang</span>
                  <span className="text-xl sm:text-2xl font-black font-mono text-blue-600">
                    Rp {calcResult.finalResult.taxPayable.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Legal Basis & Formula (Pilar 2) */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Dasar Hukum Yuridis:</span>
                  <p className="font-mono text-blue-800 text-[11px]">{calcResult.legalBasis}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Formula Perhitungan:</span>
                  <p className="font-mono text-slate-800 text-[11px] bg-white p-2 rounded border border-slate-200">
                    {calcResult.formula}
                  </p>
                </div>
              </div>

              {/* Step-by-Step Breakdown (Pilar 3) */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-900 block">Langkah demi Langkah Perhitungan:</span>
                <div className="space-y-2">
                  {calcResult.steps.map(s => (
                    <div key={s.stepNumber} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                          {s.stepNumber}
                        </span>
                        <h5 className="font-bold text-slate-900">{s.title}</h5>
                      </div>
                      <p className="font-mono text-slate-700 whitespace-pre-line pl-7 text-[11px]">
                        {s.calculation}
                      </p>
                      {s.note && (
                        <p className="text-slate-500 italic pl-7 text-[10px]">
                          Catatan: {s.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Statement (Pilar 4) */}
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-blue-950 space-y-1">
                <strong className="block font-bold">Kesimpulan & Ketetapan Administrasi:</strong>
                <p className="leading-relaxed">{calcResult.finalResult.summaryText}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs text-center py-16 space-y-3">
              <Calculator className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">Menunggu Parameter Masukan</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Pilih modul pajak di samping kiri, isi nilai transaksi dan parameter PTKP atau NPWP, lalu tekan tombol "Jalankan Kalkulasi".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
