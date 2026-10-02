/**
 * Modular Indonesian Tax Calculation Engine
 * Compliant with:
 * - UU PPh No. 7/1983 stddt UU HPP No. 7/2021
 * - PMK No. 168 Tahun 2023 (TER PPh 21)
 * - PP No. 55 Tahun 2022 (PPh Final UMKM 0.5% & Fasilitas 500 Juta)
 * - UU PPN No. 8/1983 stddt UU HPP
 */

// PTKP Status to TER Category mapping under PMK-168/2023
export function getTERCategory(ptkpStatus: string): 'A' | 'B' | 'C' {
  switch (ptkpStatus) {
    case 'TK/0':
    case 'TK/1':
    case 'K/0':
      return 'A';
    case 'TK/2':
    case 'TK/3':
    case 'K/1':
    case 'K/2':
      return 'B';
    case 'K/3':
      return 'C';
    default:
      return 'A';
  }
}

// Get Annual PTKP Value
export function getPTKPValue(ptkpStatus: string): number {
  switch (ptkpStatus) {
    case 'TK/0': return 54000000;
    case 'TK/1': return 58500000;
    case 'TK/2': return 63000000;
    case 'TK/3': return 67500000;
    case 'K/0': return 58500000;
    case 'K/1': return 63000000;
    case 'K/2': return 67500000;
    case 'K/3': return 72000000;
    default: return 54000000;
  }
}

// TER Monthly Table lookup under PMK-168/2023 (simplified key brackets)
export function getMonthlyTERRate(category: 'A' | 'B' | 'C', grossMonthly: number): number {
  if (category === 'A') {
    if (grossMonthly <= 5400000) return 0;
    if (grossMonthly <= 5650000) return 0.0025;
    if (grossMonthly <= 5950000) return 0.005;
    if (grossMonthly <= 6300000) return 0.0075;
    if (grossMonthly <= 6750000) return 0.01;
    if (grossMonthly <= 7500000) return 0.0125;
    if (grossMonthly <= 8550000) return 0.015;
    if (grossMonthly <= 9650000) return 0.0175;
    if (grossMonthly <= 10050000) return 0.02;
    if (grossMonthly <= 10350000) return 0.0225;
    if (grossMonthly <= 10700000) return 0.025;
    if (grossMonthly <= 12500000) return 0.03;
    if (grossMonthly <= 13750000) return 0.04;
    if (grossMonthly <= 15100000) return 0.05;
    if (grossMonthly <= 16950000) return 0.06;
    if (grossMonthly <= 19750000) return 0.07;
    if (grossMonthly <= 24150000) return 0.08;
    if (grossMonthly <= 26450000) return 0.09;
    if (grossMonthly <= 28000000) return 0.10;
    if (grossMonthly <= 30050000) return 0.11;
    if (grossMonthly <= 32400000) return 0.12;
    if (grossMonthly <= 35400000) return 0.13;
    if (grossMonthly <= 39100000) return 0.14;
    if (grossMonthly <= 43850000) return 0.15;
    if (grossMonthly <= 47800000) return 0.16;
    if (grossMonthly <= 51400000) return 0.17;
    if (grossMonthly <= 56300000) return 0.18;
    if (grossMonthly <= 62200000) return 0.19;
    if (grossMonthly <= 68600000) return 0.20;
    if (grossMonthly <= 77500000) return 0.21;
    if (grossMonthly <= 89000000) return 0.22;
    if (grossMonthly <= 103000000) return 0.23;
    if (grossMonthly <= 125000000) return 0.24;
    if (grossMonthly <= 157000000) return 0.25;
    if (grossMonthly <= 206000000) return 0.26;
    if (grossMonthly <= 337000000) return 0.27;
    if (grossMonthly <= 454000000) return 0.28;
    if (grossMonthly <= 550000000) return 0.29;
    if (grossMonthly <= 695000000) return 0.30;
    if (grossMonthly <= 910000000) return 0.31;
    if (grossMonthly <= 1400000000) return 0.32;
    return 0.34;
  } else if (category === 'B') {
    if (grossMonthly <= 6200000) return 0;
    if (grossMonthly <= 6500000) return 0.0025;
    if (grossMonthly <= 6850000) return 0.005;
    if (grossMonthly <= 7300000) return 0.0075;
    if (grossMonthly <= 9200000) return 0.01;
    if (grossMonthly <= 10750000) return 0.015;
    if (grossMonthly <= 12300000) return 0.02;
    if (grossMonthly <= 15200000) return 0.03;
    if (grossMonthly <= 18500000) return 0.04;
    if (grossMonthly <= 21400000) return 0.05;
    if (grossMonthly <= 24100000) return 0.06;
    if (grossMonthly <= 27000000) return 0.07;
    if (grossMonthly <= 30000000) return 0.08;
    if (grossMonthly <= 35000000) return 0.10;
    if (grossMonthly <= 45000000) return 0.12;
    if (grossMonthly <= 65000000) return 0.15;
    if (grossMonthly <= 100000000) return 0.20;
    if (grossMonthly <= 200000000) return 0.25;
    return 0.30;
  } else {
    // Category C
    if (grossMonthly <= 6600000) return 0;
    if (grossMonthly <= 6950000) return 0.0025;
    if (grossMonthly <= 7350000) return 0.005;
    if (grossMonthly <= 7800000) return 0.0075;
    if (grossMonthly <= 9800000) return 0.01;
    if (grossMonthly <= 11800000) return 0.015;
    if (grossMonthly <= 14300000) return 0.02;
    if (grossMonthly <= 17000000) return 0.03;
    if (grossMonthly <= 20500000) return 0.04;
    if (grossMonthly <= 24000000) return 0.05;
    if (grossMonthly <= 27500000) return 0.06;
    if (grossMonthly <= 32000000) return 0.08;
    if (grossMonthly <= 40000000) return 0.10;
    if (grossMonthly <= 55000000) return 0.14;
    if (grossMonthly <= 80000000) return 0.18;
    if (grossMonthly <= 120000000) return 0.22;
    if (grossMonthly <= 250000000) return 0.26;
    return 0.32;
  }
}

// Progressive Tax Rate Pasal 17 ayat (1) huruf a UU HPP
export function calculatePasal17Annual(pkp: number): {
  taxTotal: number;
  tiers: Array<{ tier: string; rate: number; taxableInTier: number; taxAmount: number }>;
} {
  const brackets = [
    { limit: 60000000, rate: 0.05, label: '0 s.d. Rp60.000.000 (5%)' },
    { limit: 190000000, rate: 0.15, label: '> Rp60.000.000 s.d. Rp250.000.000 (15%)' },
    { limit: 250000000, rate: 0.25, label: '> Rp250.000.000 s.d. Rp500.000.000 (25%)' },
    { limit: 4500000000, rate: 0.30, label: '> Rp500.000.000 s.d. Rp5.000.000.000 (30%)' },
    { limit: Infinity, rate: 0.35, label: '> Rp5.000.000.000 (35%)' }
  ];

  let remaining = Math.max(0, pkp);
  let taxTotal = 0;
  const tiers: Array<{ tier: string; rate: number; taxableInTier: number; taxAmount: number }> = [];

  for (const b of brackets) {
    if (remaining <= 0) break;
    const taxableInTier = Math.min(remaining, b.limit);
    const taxAmount = taxableInTier * b.rate;
    taxTotal += taxAmount;
    tiers.push({
      tier: b.label,
      rate: b.rate,
      taxableInTier,
      taxAmount
    });
    remaining -= taxableInTier;
  }

  return { taxTotal, tiers };
}

export interface CalculationResult {
  taxType: string;
  subType: string;
  inputs: Record<string, any>;
  legalBasis: string;
  formula: string;
  steps: Array<{ stepNumber: number; title: string; calculation: string; note?: string }>;
  finalResult: {
    dpp: number;
    effectiveRate: number | string;
    taxPayable: number;
    taxWithheldBefore?: number;
    underpaymentOrOverpayment?: number;
    summaryText: string;
  };
}

export function calculateTax(request: {
  taxType: 'pph21_ter' | 'pph21_bukan_pegawai' | 'pph_final_umkm' | 'pph23' | 'ppn' | 'pph_badan';
  periodYear: number;
  params: Record<string, any>;
}): CalculationResult {
  const { taxType, params } = request;

  switch (taxType) {
    case 'pph21_ter': {
      const gross = Number(params.grossMonthly) || 0;
      const ptkpStatus = params.ptkpStatus || 'TK/0';
      const isMasaDesember = Boolean(params.isMasaDesember);
      const category = getTERCategory(ptkpStatus);

      if (!isMasaDesember) {
        const terRate = getMonthlyTERRate(category, gross);
        const tax = Math.round(gross * terRate);

        return {
          taxType: 'PPh Pasal 21',
          subType: 'Pegawai Tetap - Masa Pajak Selain Masa Pajak Terakhir (TER)',
          inputs: {
            'Penghasilan Bruto Sebulan': `Rp ${gross.toLocaleString('id-ID')}`,
            'Status PTKP': ptkpStatus,
            'Kategori TER': `Kategori ${category}`,
            'Masa Pajak': 'Januari s.d. November'
          },
          legalBasis: 'Pasal 21 ayat (5) UU PPh stddt UU HPP jo. Pasal 2 & 5 PMK No. 168 Tahun 2023',
          formula: 'PPh 21 Terutang = Penghasilan Bruto Bulanan x Tarif Efektif Bulanan (TER)',
          steps: [
            {
              stepNumber: 1,
              title: 'Penentuan Kategori TER berdasarkan PTKP',
              calculation: `Status PTKP ${ptkpStatus} masuk ke dalam Kategori TER ${category}.`,
              note: 'Kategori A: TK/0 (54 jt), TK/1 (58.5 jt), K/0 (58.5 jt). Kategori B: TK/2, TK/3, K/1, K/2. Kategori C: K/3.'
            },
            {
              stepNumber: 2,
              title: 'Pencocokan Tarif TER pada Tabel Lampiran PMK-168/2023',
              calculation: `Untuk Penghasilan Bruto Rp ${gross.toLocaleString('id-ID')} pada Kategori ${category}, diperoleh tarif TER = ${(terRate * 100).toFixed(2)}%.`
            },
            {
              stepNumber: 3,
              title: 'Penghitungan Pemotongan PPh 21 Masa',
              calculation: `Rp ${gross.toLocaleString('id-ID')} x ${(terRate * 100).toFixed(2)}% = Rp ${tax.toLocaleString('id-ID')}.`
            }
          ],
          finalResult: {
            dpp: gross,
            effectiveRate: `${(terRate * 100).toFixed(2)}%`,
            taxPayable: tax,
            summaryText: `PPh Pasal 21 yang dipotong oleh pemberi kerja untuk masa ini adalah sebesar Rp ${tax.toLocaleString('id-ID')}.`
          }
        };
      } else {
        // Masa Desember
        const grossAnnual = Number(params.grossAnnual) || (gross * 12);
        const ptkpValue = getPTKPValue(ptkpStatus);
        const biayaJabatanRate = 0.05;
        const maxBiayaJabatan = 6000000;
        const calculatedBiayaJabatan = Math.min(grossAnnual * biayaJabatanRate, maxBiayaJabatan);
        const iuranPensiun = Number(params.iuranPensiunAnnual) || 0;

        const nettoAnnual = grossAnnual - calculatedBiayaJabatan - iuranPensiun;
        const pkp = Math.max(0, Math.floor((nettoAnnual - ptkpValue) / 1000) * 1000); // pembulatan ke bawah ribuan
        const pasal17Calc = calculatePasal17Annual(pkp);
        const taxAnnual = pasal17Calc.taxTotal;
        const taxPaidJanNov = Number(params.taxPaidJanNov) || 0;
        const taxMasaDesember = taxAnnual - taxPaidJanNov;

        return {
          taxType: 'PPh Pasal 21',
          subType: 'Pegawai Tetap - Masa Pajak Terakhir (Desember / Pasal 17)',
          inputs: {
            'Penghasilan Bruto Setahun': `Rp ${grossAnnual.toLocaleString('id-ID')}`,
            'Status PTKP': ptkpStatus,
            'Nilai PTKP': `Rp ${ptkpValue.toLocaleString('id-ID')}`,
            'Iuran Pensiun Disetor': `Rp ${iuranPensiun.toLocaleString('id-ID')}`,
            'PPh 21 Telah Dipotong (Jan-Nov)': `Rp ${taxPaidJanNov.toLocaleString('id-ID')}`
          },
          legalBasis: 'Pasal 17 ayat (1) huruf a UU PPh stddt UU HPP jo. Pasal 16 PMK-168/2023',
          formula: 'PPh 21 Masa Terakhir = PPh 21 Terutang Setahun (Tarif Pasal 17 x PKP) - PPh 21 Jan-Nov',
          steps: [
            {
              stepNumber: 1,
              title: 'Penghitungan Biaya Jabatan & Penghasilan Netto Setahun',
              calculation: `Biaya Jabatan (5% x Bruto, maks 6jt/th) = Rp ${calculatedBiayaJabatan.toLocaleString('id-ID')}. Penghasilan Netto = Bruto - Biaya Jabatan - Iuran = Rp ${nettoAnnual.toLocaleString('id-ID')}.`
            },
            {
              stepNumber: 2,
              title: 'Penghitungan Penghasilan Kena Pajak (PKP)',
              calculation: `PKP = Netto (Rp ${nettoAnnual.toLocaleString('id-ID')}) - PTKP (Rp ${ptkpValue.toLocaleString('id-ID')}) = Rp ${pkp.toLocaleString('id-ID')}.`
            },
            {
              stepNumber: 3,
              title: 'Penerapan Tarif Progresif Pasal 17 UU PPh/HPP',
              calculation: pasal17Calc.tiers.map(t => `${t.tier}: Rp ${t.taxableInTier.toLocaleString('id-ID')} x ${(t.rate * 100)}% = Rp ${t.taxAmount.toLocaleString('id-ID')}`).join('\n') + `\nTotal PPh 21 Setahun = Rp ${taxAnnual.toLocaleString('id-ID')}.`
            },
            {
              stepNumber: 4,
              title: 'Selisih Pemotongan Masa Desember',
              calculation: `PPh Terutang Setahun (Rp ${taxAnnual.toLocaleString('id-ID')}) - PPh Dipotong Jan-Nov (Rp ${taxPaidJanNov.toLocaleString('id-ID')}) = Rp ${taxMasaDesember.toLocaleString('id-ID')}.`
            }
          ],
          finalResult: {
            dpp: pkp,
            effectiveRate: pkp > 0 ? `${((taxAnnual / pkp) * 100).toFixed(2)}%` : '0%',
            taxPayable: taxMasaDesember,
            taxWithheldBefore: taxPaidJanNov,
            underpaymentOrOverpayment: taxMasaDesember,
            summaryText: taxMasaDesember >= 0 
              ? `PPh Pasal 21 kurang potong di Masa Desember yang harus dipotong adalah Rp ${taxMasaDesember.toLocaleString('id-ID')}.`
              : `Terjadi kelebihan potong sebesar Rp ${Math.abs(taxMasaDesember).toLocaleString('id-ID')} yang wajib dikembalikan oleh pemotong ke pegawai bersamaan dengan gaji Desember.`
          }
        };
      }
    }

    case 'pph21_bukan_pegawai': {
      const gross = Number(params.gross) || 0;
      const hasNPWP = params.hasNPWP !== false;
      const dpp = Math.floor(gross * 0.5);
      const pasal17 = calculatePasal17Annual(dpp);
      let tax = pasal17.taxTotal;
      if (!hasNPWP) {
        tax = Math.round(tax * 1.2); // Tarif 20% lebih tinggi jika tanpa NPWP
      }

      return {
        taxType: 'PPh Pasal 21',
        subType: 'Bukan Pegawai / Tenaga Ahli (Non-Berkesinambungan)',
        inputs: {
          'Penghasilan Bruto': `Rp ${gross.toLocaleString('id-ID')}`,
          'Kepemilikan NPWP': hasNPWP ? 'Memiliki NPWP/NIK tervalidasi' : 'Tidak memiliki NPWP (+20%)'
        },
        legalBasis: 'Pasal 21 ayat (1) & (5a) UU PPh stddt UU HPP jo. Pasal 11 PMK-168/2023',
        formula: 'DPP = 50% x Penghasilan Bruto; PPh 21 = Tarif Pasal 17 x DPP',
        steps: [
          {
            stepNumber: 1,
            title: 'Penentuan Dasar Pengenaan Pajak (DPP)',
            calculation: `DPP = 50% x Rp ${gross.toLocaleString('id-ID')} = Rp ${dpp.toLocaleString('id-ID')}.`,
            note: 'Berdasarkan PMK-168/2023, DPP Bukan Pegawai adalah 50% dari penghasilan bruto.'
          },
          {
            stepNumber: 2,
            title: 'Perhitungan Tarif Pasal 17',
            calculation: `Penerapan tarif Pasal 17 atas DPP Rp ${dpp.toLocaleString('id-ID')} = Rp ${pasal17.taxTotal.toLocaleString('id-ID')}.`
          },
          {
            stepNumber: 3,
            title: 'Sanksi Tidak Ber-NPWP (jika berlaku)',
            calculation: hasNPWP 
              ? 'Wajib Pajak memiliki NPWP, tidak dikenakan kenaikan tarif 20%.' 
              : `Tanpa NPWP dikenakan tarif 20% lebih tinggi: 120% x Rp ${pasal17.taxTotal.toLocaleString('id-ID')} = Rp ${tax.toLocaleString('id-ID')}.`
          }
        ],
        finalResult: {
          dpp,
          effectiveRate: `${((tax / gross) * 100).toFixed(2)}% dari Bruto`,
          taxPayable: tax,
          summaryText: `PPh Pasal 21 Bukan Pegawai yang dipotong adalah Rp ${tax.toLocaleString('id-ID')}.`
        }
      };
    }

    case 'pph_final_umkm': {
      const grossOmzet = Number(params.grossOmzet) || 0;
      const accumulatedOmzetPrior = Number(params.accumulatedOmzetPrior) || 0;
      const isWPOP = params.taxpayerType === 'WPOP'; // Orang Pribadi vs Badan
      const rate = 0.005; // 0.5% PP 55/2022

      let taxableOmzet = grossOmzet;
      let nonTaxableUsed = 0;

      if (isWPOP) {
        // Fasilitas batasan peredaran bruto tidak dikenai pajak s.d. Rp 500 juta setahun
        const THRESHOLD = 500000000;
        if (accumulatedOmzetPrior >= THRESHOLD) {
          taxableOmzet = grossOmzet;
        } else if (accumulatedOmzetPrior + grossOmzet <= THRESHOLD) {
          taxableOmzet = 0;
          nonTaxableUsed = grossOmzet;
        } else {
          nonTaxableUsed = THRESHOLD - accumulatedOmzetPrior;
          taxableOmzet = grossOmzet - nonTaxableUsed;
        }
      }

      const tax = Math.round(taxableOmzet * rate);

      return {
        taxType: 'PPh Final PP 55/2022',
        subType: 'Wajib Pajak Tertentu dengan Peredaran Bruto Tertentu (UMKM 0,5%)',
        inputs: {
          'Jenis Wajib Pajak': isWPOP ? 'Orang Pribadi (Mendapat Fasilitas 500 Juta)' : 'Badan (PT/CV/Koperasi - Tanpa Fasilitas 500 Juta)',
          'Omzet Bulan Ini': `Rp ${grossOmzet.toLocaleString('id-ID')}`,
          'Akumulasi Omzet Sebelumnya': `Rp ${accumulatedOmzetPrior.toLocaleString('id-ID')}`
        },
        legalBasis: 'Pasal 7 ayat (2a) UU HPP jo. PP No. 55 Tahun 2022',
        formula: isWPOP 
          ? 'PPh Final = 0,5% x (Omzet yang melebihi batas kumulatif Rp 500.000.000)'
          : 'PPh Final = 0,5% x Peredaran Bruto Bulanan',
        steps: [
          {
            stepNumber: 1,
            title: 'Pemeriksaan Batas Fasilitas Rp 500 Juta (WPOP)',
            calculation: isWPOP 
              ? `Akumulasi omzet sebelumnya Rp ${accumulatedOmzetPrior.toLocaleString('id-ID')}. Sisa kuota bebas pajak: Rp ${Math.max(0, 500000000 - accumulatedOmzetPrior).toLocaleString('id-ID')}.`
              : 'Wajib Pajak Badan tidak berhak atas fasilitas peredaran bruto tidak kena pajak Rp 500 juta.'
          },
          {
            stepNumber: 2,
            title: 'Penentuan Omzet Kena Pajak (DPP)',
            calculation: `Omzet yang dikenai tarif 0,5% pada masa ini adalah Rp ${taxableOmzet.toLocaleString('id-ID')}.`
          },
          {
            stepNumber: 3,
            title: 'Penghitungan PPh Final 0,5%',
            calculation: `Rp ${taxableOmzet.toLocaleString('id-ID')} x 0,5% = Rp ${tax.toLocaleString('id-ID')}.`
          }
        ],
        finalResult: {
          dpp: taxableOmzet,
          effectiveRate: '0.5%',
          taxPayable: tax,
          summaryText: tax > 0
            ? `PPh Final UMKM yang wajib disetor paling lambat tanggal 15 bulan berikutnya adalah Rp ${tax.toLocaleString('id-ID')}.`
            : `Nihil. Seluruh omzet masih dalam batas fasilitas Rp 500 juta tidak kena pajak bagi WPOP.`
        }
      };
    }

    case 'pph23': {
      const transactionType = params.transactionType || 'Jasa Konsultan / Manajemen / Teknik';
      const gross = Number(params.gross) || 0;
      const hasNPWP = params.hasNPWP !== false;

      let baseRate = 0.02; // default 2% jasa & sewa
      if (['Dividen', 'Royalti', 'Bunga', 'Hadiah/Penghargaan'].includes(transactionType)) {
        baseRate = 0.15;
      }

      let finalRate = baseRate;
      if (!hasNPWP) {
        finalRate = baseRate * 2; // Kenaikan 100% jika tanpa NPWP
      }

      const tax = Math.round(gross * finalRate);

      return {
        taxType: 'PPh Pasal 23',
        subType: `Pemotongan atas ${transactionType}`,
        inputs: {
          'Objek Transaksi': transactionType,
          'Jumlah Bruto Tidak Termasuk PPN': `Rp ${gross.toLocaleString('id-ID')}`,
          'NPWP Penerima Penghasilan': hasNPWP ? 'Ada (Tarif Normal)' : 'Tidak Ada (Dikenakan Kenaikan 100%)'
        },
        legalBasis: 'Pasal 23 ayat (1) & ayat (1a) UU PPh stddt UU HPP jo. PMK-141/PMK.03/2015',
        formula: 'PPh 23 Terutang = Tarif x Jumlah Bruto (tidak termasuk PPN)',
        steps: [
          {
            stepNumber: 1,
            title: 'Penentuan Objek & Tarif Dasar',
            calculation: `Transaksi kategori "${transactionType}" dikenai tarif dasar ${(baseRate * 100)}%.`
          },
          {
            stepNumber: 2,
            title: 'Evaluasi Status NPWP',
            calculation: hasNPWP 
              ? 'Wajib Pajak memiliki NPWP, tarif tetap.' 
              : `Tanpa NPWP berlaku Pasal 23 ayat (1a): Tarif lebih tinggi 100% sehingga menjadi ${(finalRate * 100)}%.`
          },
          {
            stepNumber: 3,
            title: 'Penghitungan Pemotongan',
            calculation: `Rp ${gross.toLocaleString('id-ID')} x ${(finalRate * 100)}% = Rp ${tax.toLocaleString('id-ID')}.`
          }
        ],
        finalResult: {
          dpp: gross,
          effectiveRate: `${(finalRate * 100)}%`,
          taxPayable: tax,
          summaryText: `PPh Pasal 23 yang wajib dipotong dan disetorkan adalah Rp ${tax.toLocaleString('id-ID')}. Bukti Potong elektronik (e-Bupot Unifikasi) wajib diterbitkan.`
        }
      };
    }

    case 'ppn': {
      const grossSales = Number(params.grossSales) || 0; // DPP Penyerahan BKP/JKP
      const ppnMasukan = Number(params.ppnMasukan) || 0; // PPN Masukan yang dapat dikreditkan
      const rate = Number(params.ppnRate) || 0.11; // 11% UU HPP (atau 12%)

      const ppnKeluaran = Math.round(grossSales * rate);
      const selisih = ppnKeluaran - ppnMasukan;

      return {
        taxType: 'Pajak Pertambahan Nilai (PPN)',
        subType: 'Mekanisme Pengkreditan Faktur Pajak (Keluaran - Masukan)',
        inputs: {
          'Dasar Pengenaan Pajak (DPP)': `Rp ${grossSales.toLocaleString('id-ID')}`,
          'Tarif PPN': `${(rate * 100)}% (UU HPP)`,
          'Pajak Masukan yang Dapat Dikreditkan': `Rp ${ppnMasukan.toLocaleString('id-ID')}`
        },
        legalBasis: 'Pasal 7 & Pasal 9 UU PPN No. 8/1983 stddt UU HPP No. 7/2021',
        formula: 'PPN Terutang = Pajak Keluaran (Tarif x DPP) - Pajak Masukan',
        steps: [
          {
            stepNumber: 1,
            title: 'Penghitungan Pajak Keluaran (PK)',
            calculation: `PK = ${(rate * 100)}% x Rp ${grossSales.toLocaleString('id-ID')} = Rp ${ppnKeluaran.toLocaleString('id-ID')}.`
          },
          {
            stepNumber: 2,
            title: 'Pengkreditan Pajak Masukan (PM)',
            calculation: `Pajak Masukan sah yang dikreditkan = Rp ${ppnMasukan.toLocaleString('id-ID')}.`
          },
          {
            stepNumber: 3,
            title: 'Penentuan Status SPT Masa PPN',
            calculation: selisih >= 0 
              ? `PK (Rp ${ppnKeluaran.toLocaleString('id-ID')}) > PM (Rp ${ppnMasukan.toLocaleString('id-ID')}) -> Kurang Bayar Rp ${selisih.toLocaleString('id-ID')}.`
              : `PK (Rp ${ppnKeluaran.toLocaleString('id-ID')}) < PM (Rp ${ppnMasukan.toLocaleString('id-ID')}) -> Lebih Bayar Rp ${Math.abs(selisih).toLocaleString('id-ID')}.`
          }
        ],
        finalResult: {
          dpp: grossSales,
          effectiveRate: `${(rate * 100)}%`,
          taxPayable: Math.max(0, selisih),
          taxWithheldBefore: ppnMasukan,
          underpaymentOrOverpayment: selisih,
          summaryText: selisih >= 0
            ? `SPT Masa PPN Kurang Bayar sebesar Rp ${selisih.toLocaleString('id-ID')} yang wajib disetor sebelum pelaporan SPT Masa PPN.`
            : `SPT Masa PPN Lebih Bayar sebesar Rp ${Math.abs(selisih).toLocaleString('id-ID')} yang dapat dikompensasikan ke masa pajak berikutnya atau dimintakan restitusi.`
        }
      };
    }

    case 'pph_badan': {
      const grossRevenue = Number(params.grossRevenue) || 0; // Peredaran Bruto Setahun
      const pkp = Number(params.pkp) || 0; // Penghasilan Kena Pajak Badan
      const standardRate = 0.22; // 22% UU HPP

      let tax = 0;
      let stepNote = '';

      if (grossRevenue <= 4800000000) {
        // Fasilitas Pasal 31E UU PPh penuh: diskon 50% tarif
        const discountedRate = standardRate * 0.5; // 11%
        tax = Math.round(pkp * discountedRate);
        stepNote = 'Peredaran bruto <= Rp 4,8 Miliar berhak mendapat fasilitas pengurangan tarif sebesar 50% atas seluruh PKP (Pasal 31E ayat 1 UU PPh).';
      } else if (grossRevenue <= 50000000000) {
        // Fasilitas Pasal 31E sebagian
        const pkpWithFacility = Math.round((4800000000 / grossRevenue) * pkp);
        const pkpWithoutFacility = pkp - pkpWithFacility;
        const taxFacility = Math.round(pkpWithFacility * (standardRate * 0.5));
        const taxNonFacility = Math.round(pkpWithoutFacility * standardRate);
        tax = taxFacility + taxNonFacility;
        stepNote = `Peredaran bruto antara Rp 4,8M - Rp 50M: PKP yang mendapat fasilitas = (4,8M / ${grossRevenue.toLocaleString('id-ID')}) x PKP = Rp ${pkpWithFacility.toLocaleString('id-ID')}. Sisa PKP non-fasilitas = Rp ${pkpWithoutFacility.toLocaleString('id-ID')}.`;
      } else {
        // Tanpa fasilitas (omzet > 50 M)
        tax = Math.round(pkp * standardRate);
        stepNote = 'Peredaran bruto > Rp 50 Miliar: seluruh PKP dikenai tarif normal 22% tanpa fasilitas Pasal 31E.';
      }

      return {
        taxType: 'PPh Wajib Pajak Badan',
        subType: 'PPh Badan Tahunan (Pasal 17 jo. Fasilitas Pasal 31E UU PPh)',
        inputs: {
          'Peredaran Bruto Komersial Setahun': `Rp ${grossRevenue.toLocaleString('id-ID')}`,
          'Penghasilan Kena Pajak (Fiskal)': `Rp ${pkp.toLocaleString('id-ID')}`,
          'Tarif Normal': '22% (UU HPP)'
        },
        legalBasis: 'Pasal 17 ayat (1) huruf b & Pasal 31E UU PPh stddt UU HPP No. 7/2021',
        formula: 'PPh Badan = (PKP Fasilitas x 50% x 22%) + (PKP Non-Fasilitas x 22%)',
        steps: [
          {
            stepNumber: 1,
            title: 'Evaluasi Ambang Batas Peredaran Bruto Pasal 31E',
            calculation: stepNote
          },
          {
            stepNumber: 2,
            title: 'Penghitungan PPh Terutang Badan',
            calculation: `Total PPh Badan Terutang Tahun Pajak Bersangkutan = Rp ${tax.toLocaleString('id-ID')}.`
          }
        ],
        finalResult: {
          dpp: pkp,
          effectiveRate: pkp > 0 ? `${((tax / pkp) * 100).toFixed(2)}% dari PKP` : '22%',
          taxPayable: tax,
          summaryText: `PPh Badan terutang yang harus dilaporkan dalam SPT Tahunan 1771 adalah Rp ${tax.toLocaleString('id-ID')}.`
        }
      };
    }

    default:
      throw new Error(`Tax type not supported: ${taxType}`);
  }
}
