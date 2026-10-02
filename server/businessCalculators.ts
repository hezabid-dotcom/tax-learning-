/**
 * Accounting and Economics Computational Engines
 * Deterministic mathematical models with step-by-step transparency
 */

export interface BusinessCalculationResult {
  module: 'accounting' | 'economics';
  calculatorType: string;
  inputs: Record<string, any>;
  formula: string;
  steps: Array<{ stepNumber: number; title: string; calculation: string; note?: string }>;
  finalResult: Record<string, any>;
}

// 1. Depreciation Calculator
export function calculateDepreciation(params: {
  assetCost: number;
  salvageValue: number;
  usefulLifeYears: number;
  method: 'straight_line' | 'double_declining' | 'units_of_production';
  unitsProducedThisYear?: number;
  totalEstimatedUnits?: number;
}): BusinessCalculationResult {
  const { assetCost, salvageValue, usefulLifeYears, method } = params;
  const depreciableBase = Math.max(0, assetCost - salvageValue);

  if (method === 'straight_line') {
    const annualDepreciation = Math.round(depreciableBase / usefulLifeYears);
    const monthlyDepreciation = Math.round(annualDepreciation / 12);

    return {
      module: 'accounting',
      calculatorType: 'Penyusutan Aset Tetap - Metode Garis Lurus (Straight-Line)',
      inputs: {
        'Harga Perolehan Aset': `Rp ${assetCost.toLocaleString('id-ID')}`,
        'Nilai Residu / Sisa': `Rp ${salvageValue.toLocaleString('id-ID')}`,
        'Masa Manfaat': `${usefulLifeYears} Tahun`,
        'Dasar Penyusutan (Depreciable Cost)': `Rp ${depreciableBase.toLocaleString('id-ID')}`
      },
      formula: 'Beban Penyusutan Tahunan = (Harga Perolehan - Nilai Residu) / Umur Manfaat',
      steps: [
        {
          stepNumber: 1,
          title: 'Penghitungan Nilai yang Dapat Disusutkan (Depreciable Base)',
          calculation: `Rp ${assetCost.toLocaleString('id-ID')} - Rp ${salvageValue.toLocaleString('id-ID')} = Rp ${depreciableBase.toLocaleString('id-ID')}.`
        },
        {
          stepNumber: 2,
          title: 'Penerapan Tarif Penyusutan Garis Lurus',
          calculation: `Rp ${depreciableBase.toLocaleString('id-ID')} / ${usefulLifeYears} tahun = Rp ${annualDepreciation.toLocaleString('id-ID')} per tahun (atau Rp ${monthlyDepreciation.toLocaleString('id-ID')} per bulan).`
        }
      ],
      finalResult: {
        annualDepreciation,
        monthlyDepreciation,
        bookValueYear1: assetCost - annualDepreciation,
        summaryText: `Beban penyusutan periodik adalah Rp ${annualDepreciation.toLocaleString('id-ID')} per tahun. Nilai buku akhir tahun ke-1 adalah Rp ${(assetCost - annualDepreciation).toLocaleString('id-ID')}.`
      }
    };
  } else if (method === 'double_declining') {
    const straightRate = 1 / usefulLifeYears;
    const doubleRate = straightRate * 2;
    const year1Depreciation = Math.round(assetCost * doubleRate);
    const bookValueEndYear1 = assetCost - year1Depreciation;
    const year2Depreciation = Math.round(bookValueEndYear1 * doubleRate);

    return {
      module: 'accounting',
      calculatorType: 'Penyusutan Aset Tetap - Metode Saldo Menurun Ganda (Double Declining)',
      inputs: {
        'Harga Perolehan Aset': `Rp ${assetCost.toLocaleString('id-ID')}`,
        'Nilai Residu': `Rp ${salvageValue.toLocaleString('id-ID')}`,
        'Masa Manfaat': `${usefulLifeYears} Tahun`,
        'Tarif Garis Lurus': `${(straightRate * 100).toFixed(2)}%`,
        'Tarif Saldo Menurun Ganda': `${(doubleRate * 100).toFixed(2)}% (2 x Tarif Garis Lurus)`
      },
      formula: 'Beban Penyusutan = Nilai Buku Awal Tahun x (2 / Umur Manfaat)',
      steps: [
        {
          stepNumber: 1,
          title: 'Penentuan Tarif Berganda',
          calculation: `Tarif = 2 x (1 / ${usefulLifeYears}) = ${(doubleRate * 100).toFixed(2)}%.`
        },
        {
          stepNumber: 2,
          title: 'Penyusutan Tahun Pertama (Atas Nilai Perolehan Tanpa Residu)',
          calculation: `Rp ${assetCost.toLocaleString('id-ID')} x ${(doubleRate * 100).toFixed(2)}% = Rp ${year1Depreciation.toLocaleString('id-ID')}. Nilai buku akhir tahun 1 = Rp ${bookValueEndYear1.toLocaleString('id-ID')}.`
        },
        {
          stepNumber: 3,
          title: 'Penyusutan Tahun Kedua (Atas Nilai Buku Baru)',
          calculation: `Rp ${bookValueEndYear1.toLocaleString('id-ID')} x ${(doubleRate * 100).toFixed(2)}% = Rp ${year2Depreciation.toLocaleString('id-ID')}.`
        }
      ],
      finalResult: {
        year1Depreciation,
        year2Depreciation,
        bookValueEndYear1,
        summaryText: `Penyusutan tahun pertama sebesar Rp ${year1Depreciation.toLocaleString('id-ID')} dan tahun kedua sebesar Rp ${year2Depreciation.toLocaleString('id-ID')}.`
      }
    };
  } else {
    // units of production
    const totalUnits = params.totalEstimatedUnits || 100000;
    const unitsThisYear = params.unitsProducedThisYear || 15000;
    const ratePerUnit = depreciableBase / totalUnits;
    const yearDepreciation = Math.round(ratePerUnit * unitsThisYear);

    return {
      module: 'accounting',
      calculatorType: 'Penyusutan Aset Tetap - Metode Unit Produksi (Units of Activity)',
      inputs: {
        'Harga Perolehan': `Rp ${assetCost.toLocaleString('id-ID')}`,
        'Total Estimasi Output': `${totalUnits.toLocaleString('id-ID')} Unit`,
        'Output Periode Berjalan': `${unitsThisYear.toLocaleString('id-ID')} Unit`
      },
      formula: 'Beban = [(Harga Perolehan - Residu) / Total Estimasi Unit] x Unit Periode Berjalan',
      steps: [
        {
          stepNumber: 1,
          title: 'Penghitungan Tarif per Unit Output',
          calculation: `Rp ${depreciableBase.toLocaleString('id-ID')} / ${totalUnits.toLocaleString('id-ID')} unit = Rp ${ratePerUnit.toFixed(2)} per unit.`
        },
        {
          stepNumber: 2,
          title: 'Beban Penyusutan Berdasarkan Output Nyata',
          calculation: `${unitsThisYear.toLocaleString('id-ID')} unit x Rp ${ratePerUnit.toFixed(2)} = Rp ${yearDepreciation.toLocaleString('id-ID')}.`
        }
      ],
      finalResult: {
        ratePerUnit,
        yearDepreciation,
        summaryText: `Beban penyusutan atas produksi ${unitsThisYear.toLocaleString('id-ID')} unit adalah Rp ${yearDepreciation.toLocaleString('id-ID')}.`
      }
    };
  }
}

// 2. Break-Even Point (BEP) & CVP Calculator
export function calculateBEP(params: {
  fixedCost: number;
  pricePerUnit: number;
  variableCostPerUnit: number;
  targetProfit?: number;
}): BusinessCalculationResult {
  const { fixedCost, pricePerUnit, variableCostPerUnit } = params;
  const targetProfit = params.targetProfit || 0;
  const contributionMarginPerUnit = pricePerUnit - variableCostPerUnit;
  const contributionMarginRatio = pricePerUnit > 0 ? contributionMarginPerUnit / pricePerUnit : 0;

  const bepUnits = contributionMarginPerUnit > 0 ? Math.ceil(fixedCost / contributionMarginPerUnit) : 0;
  const bepRevenue = contributionMarginRatio > 0 ? Math.round(fixedCost / contributionMarginRatio) : 0;

  const unitsForTarget = contributionMarginPerUnit > 0 ? Math.ceil((fixedCost + targetProfit) / contributionMarginPerUnit) : 0;
  const revenueForTarget = contributionMarginRatio > 0 ? Math.round((fixedCost + targetProfit) / contributionMarginRatio) : 0;

  return {
    module: 'accounting',
    calculatorType: 'Analisis Biaya-Volume-Laba (CVP) & Break-Even Point (BEP)',
    inputs: {
      'Total Biaya Tetap (Fixed Cost)': `Rp ${fixedCost.toLocaleString('id-ID')}`,
      'Harga Jual per Unit (Price)': `Rp ${pricePerUnit.toLocaleString('id-ID')}`,
      'Biaya Variabel per Unit': `Rp ${variableCostPerUnit.toLocaleString('id-ID')}`,
      'Target Laba Bersih': `Rp ${targetProfit.toLocaleString('id-ID')}`
    },
    formula: 'BEP (Unit) = Total Biaya Tetap / (Harga Jual - Biaya Variabel per Unit); BEP (Rupiah) = Total Biaya Tetap / Margin Kontribusi Rasio',
    steps: [
      {
        stepNumber: 1,
        title: 'Penghitungan Margin Kontribusi (Contribution Margin)',
        calculation: `Margin Kontribusi per Unit = Rp ${pricePerUnit.toLocaleString('id-ID')} - Rp ${variableCostPerUnit.toLocaleString('id-ID')} = Rp ${contributionMarginPerUnit.toLocaleString('id-ID')}. Rasio = ${(contributionMarginRatio * 100).toFixed(2)}%.`
      },
      {
        stepNumber: 2,
        title: 'Penghitungan Titik Impas (BEP)',
        calculation: `BEP Unit = Rp ${fixedCost.toLocaleString('id-ID')} / Rp ${contributionMarginPerUnit.toLocaleString('id-ID')} = ${bepUnits.toLocaleString('id-ID')} unit.\nBEP Rupiah = Rp ${fixedCost.toLocaleString('id-ID')} / ${(contributionMarginRatio * 100).toFixed(2)}% = Rp ${bepRevenue.toLocaleString('id-ID')}.`
      },
      ...(targetProfit > 0 ? [{
        stepNumber: 3,
        title: 'Penjualan yang Dibutuhkan untuk Target Laba',
        calculation: `Penjualan untuk Laba Rp ${targetProfit.toLocaleString('id-ID')} = (${fixedCost.toLocaleString('id-ID')} + ${targetProfit.toLocaleString('id-ID')}) / ${contributionMarginPerUnit.toLocaleString('id-ID')} = ${unitsForTarget.toLocaleString('id-ID')} unit (Rp ${revenueForTarget.toLocaleString('id-ID')}).`
      }] : [])
    ],
    finalResult: {
      contributionMarginPerUnit,
      contributionMarginRatio: `${(contributionMarginRatio * 100).toFixed(2)}%`,
      bepUnits,
      bepRevenue,
      unitsForTarget,
      revenueForTarget,
      summaryText: `Untuk mencapai titik impas (laba = 0), perusahaan harus menjual minimal ${bepUnits.toLocaleString('id-ID')} unit dengan omzet Rp ${bepRevenue.toLocaleString('id-ID')}.`
    }
  };
}

// 3. Market Equilibrium & Tax Incidence Calculator (Economics)
export function calculateMarketEquilibrium(params: {
  demandA: number; // Qd = a - bP
  demandB: number;
  supplyC: number; // Qs = c + dP
  supplyD: number;
  specificTax?: number;
}): BusinessCalculationResult {
  const { demandA, demandB, supplyC, supplyD } = params;
  const tax = params.specificTax || 0;

  // Equilibrium without tax:
  // a - bP = c + dP => (b + d)P = a - c => P0 = (a - c) / (b + d)
  const p0 = (demandA - supplyC) / (demandB + supplyD);
  const q0 = demandA - (demandB * p0);

  // Equilibrium with specific tax t (supply shifts up by t: Qs_t = c + d(P - t))
  // a - bP = c + dP - dt => (b + d)P = a - c + dt => Pb = (a - c + dt) / (b + d)
  const pb = tax > 0 ? (demandA - supplyC + (supplyD * tax)) / (demandB + supplyD) : p0;
  const ps = tax > 0 ? pb - tax : p0;
  const qt = tax > 0 ? demandA - (demandB * pb) : q0;

  const consumerTaxBurden = Math.max(0, pb - p0);
  const producerTaxBurden = Math.max(0, p0 - ps);
  const totalTaxRevenue = tax > 0 ? Math.round(tax * qt) : 0;
  const deltaQ = Math.max(0, q0 - qt);
  const deadweightLoss = tax > 0 ? 0.5 * tax * deltaQ : 0;

  return {
    module: 'economics',
    calculatorType: 'Keseimbangan Pasar & Analisis Dampak Pajak (Tax Incidence)',
    inputs: {
      'Fungsi Permintaan': `Qd = ${demandA} - ${demandB}P`,
      'Fungsi Penawaran': `Qs = ${supplyC} + ${supplyD}P`,
      'Pajak Spesifik per Unit': tax > 0 ? `Rp ${tax.toLocaleString('id-ID')}` : 'Tidak ada pajak'
    },
    formula: 'Keseimbangan: Qd = Qs; Dengan Pajak: Qs_t = c + d(P - t); DWL = 0.5 x t x (Q0 - Qt)',
    steps: [
      {
        stepNumber: 1,
        title: 'Penentuan Harga & Kuantitas Keseimbangan Awal (Sebelum Pajak)',
        calculation: `${demandA} - ${demandB}P = ${supplyC} + ${supplyD}P\n(${demandB} + ${supplyD})P = ${demandA} - ${supplyC}\nP0 = Rp ${p0.toFixed(2)}, Q0 = ${q0.toFixed(2)} unit.`
      },
      ...(tax > 0 ? [
        {
          stepNumber: 2,
          title: 'Keseimbangan Pasar Setelah Pengenaan Pajak',
          calculation: `Kurva penawaran baru: Qs = ${supplyC} + ${supplyD}(P - ${tax}) = ${supplyC - (supplyD * tax)} + ${supplyD}P.\nHarga yang dibayar konsumen (Pb) = Rp ${pb.toFixed(2)}.\nHarga yang diterima produsen (Ps) = Rp ${ps.toFixed(2)}.\nKuantitas keseimbangan baru (Qt) = ${qt.toFixed(2)} unit.`
        },
        {
          stepNumber: 3,
          title: 'Pembagian Beban Pajak (Tax Incidence) & Deadweight Loss',
          calculation: `Beban Konsumen = Rp ${consumerTaxBurden.toFixed(2)} (${tax > 0 ? ((consumerTaxBurden/tax)*100).toFixed(1) : 0}%).\nBeban Produsen = Rp ${producerTaxBurden.toFixed(2)} (${tax > 0 ? ((producerTaxBurden/tax)*100).toFixed(1) : 0}%).\nPenerimaan Pajak Pemerintah = Rp ${totalTaxRevenue.toLocaleString('id-ID')}.\nDeadweight Loss (Hilangnya Efisiensi) = Rp ${deadweightLoss.toFixed(2)}.`
        }
      ] : [])
    ],
    finalResult: {
      p0: Math.round(p0),
      q0: Math.round(q0),
      pb: Math.round(pb),
      ps: Math.round(ps),
      qt: Math.round(qt),
      consumerTaxBurden: Math.round(consumerTaxBurden),
      producerTaxBurden: Math.round(producerTaxBurden),
      totalTaxRevenue,
      deadweightLoss: Math.round(deadweightLoss),
      summaryText: tax > 0
        ? `Pengenaan pajak Rp ${tax.toLocaleString('id-ID')} menyebabkan harga pasar naik menjadi Rp ${Math.round(pb).toLocaleString('id-ID')}, kuantitas turun menjadi ${Math.round(qt).toLocaleString('id-ID')} unit, penerimaan negara Rp ${totalTaxRevenue.toLocaleString('id-ID')}, dan deadweight loss Rp ${Math.round(deadweightLoss).toLocaleString('id-ID')}.`
        : `Harga keseimbangan pasar adalah Rp ${Math.round(p0).toLocaleString('id-ID')} dengan kuantitas ${Math.round(q0).toLocaleString('id-ID')} unit.`
    }
  };
}

// 4. Consumer Utility & Gossen Law Calculator (Economics)
export function calculateConsumerUtility(params: {
  priceX: number;
  priceY: number;
  income: number;
  utilityFunctionType: 'cobb_douglas' | 'table';
  alpha?: number; // U = X^alpha * Y^(1 - alpha)
}): BusinessCalculationResult {
  const { priceX, priceY, income } = params;
  const alpha = params.alpha || 0.5;

  // Cobb-Douglas optimal bundle: X* = (alpha * I) / Px; Y* = ((1 - alpha) * I) / Py
  const optimalX = (alpha * income) / priceX;
  const optimalY = ((1 - alpha) * income) / priceY;
  const maxUtility = Math.pow(optimalX, alpha) * Math.pow(optimalY, 1 - alpha);

  return {
    module: 'economics',
    calculatorType: 'Keseimbangan Konsumen & Hukum Gossen II (Optimal Utility Bundle)',
    inputs: {
      'Harga Barang X (Px)': `Rp ${priceX.toLocaleString('id-ID')}`,
      'Harga Barang Y (Py)': `Rp ${priceY.toLocaleString('id-ID')}`,
      'Pendapatan Konsumen (Income)': `Rp ${income.toLocaleString('id-ID')}`,
      'Preferensi (Alpha)': `${alpha * 100}% pada Barang X, ${(1 - alpha) * 100}% pada Barang Y`
    },
    formula: 'Hukum Gossen II: MUx / Px = MUy / Py; Anggaran: Px.X + Py.Y = I; Keseimbangan Cobb-Douglas: X* = (alpha * I) / Px, Y* = ((1 - alpha) * I) / Py',
    steps: [
      {
        stepNumber: 1,
        title: 'Penentuan Persamaan Garis Anggaran (Budget Line)',
        calculation: `${priceX.toLocaleString('id-ID')}X + ${priceY.toLocaleString('id-ID')}Y = Rp ${income.toLocaleString('id-ID')}. Kemiringan Garis Anggaran (Slope) = -(Px / Py) = -${(priceX / priceY).toFixed(2)}.`
      },
      {
        stepNumber: 2,
        title: 'Optimasi Alokasi Berdasarkan Kepuasan Marginal per Rupiah (Hukum Gossen II)',
        calculation: `Konsumen membelanjakan ${alpha * 100}% pendapatannya pada barang X (Rp ${(alpha * income).toLocaleString('id-ID')}) dan ${(1 - alpha) * 100}% pada barang Y (Rp ${((1 - alpha) * income).toLocaleString('id-ID')}).`
      },
      {
        stepNumber: 3,
        title: 'Penghitungan Kombinasi Konsumsi Optimal (X*, Y*)',
        calculation: `Kuantitas Barang X* = Rp ${(alpha * income).toLocaleString('id-ID')} / Rp ${priceX.toLocaleString('id-ID')} = ${optimalX.toFixed(2)} unit.\nKuantitas Barang Y* = Rp ${((1 - alpha) * income).toLocaleString('id-ID')} / Rp ${priceY.toLocaleString('id-ID')} = ${optimalY.toFixed(2)} unit.\nUtilitas Maksimum = ${maxUtility.toFixed(2)} utils.`
      }
    ],
    finalResult: {
      optimalX: parseFloat(optimalX.toFixed(2)),
      optimalY: parseFloat(optimalY.toFixed(2)),
      maxUtility: parseFloat(maxUtility.toFixed(2)),
      summaryText: `Kombinasi konsumsi yang memaksimalkan kepuasan sesuai Hukum Gossen II adalah ${optimalX.toFixed(2)} unit barang X dan ${optimalY.toFixed(2)} unit barang Y, dengan menghabiskan seluruh pendapatan Rp ${income.toLocaleString('id-ID')}.`
    }
  };
}
