/**
 * Official Accounting Academy Curriculum, Levels, Challenges, and Cases
 * Grounded in SAK Indonesia, SAK Entitas Privat (SAK EP), and SAK EMKM
 */

export interface AccountingLevel {
  levelNumber: number;
  id: string;
  name: string;
  tagline: string;
  goal: string;
  xpReward: number;
  prerequisiteLevel: number;
  summary: string;
  coreConcepts: string[];
  challengeTypes: string[];
}

export const ACCOUNTING_LEVELS: AccountingLevel[] = [
  {
    levelNumber: 1,
    id: 'acc-lvl-1-foundations',
    name: 'Accounting Foundations',
    tagline: 'Persamaan Dasar Akuntansi & Karakteristik Entitas',
    goal: 'Memahami tujuan pelaporan keuangan, pengguna informasi, entitas bisnis, serta persamaan dasar akuntansi: Aset = Liabilitas + Ekuitas.',
    xpReward: 350,
    prerequisiteLevel: 0,
    summary: 'Membangun logika pencatatan: setiap transaksi ekonomi mengubah komposisi aset, liabilitas, atau ekuitas secara seimbang (dual-aspect concept).',
    coreConcepts: [
      'Definisi & Pengguna Akuntansi (Internal vs Eksternal)',
      'Perbedaan Bookkeeping vs Accounting',
      'Persamaan Dasar: Aset = Liabilitas + Ekuitas',
      'Unsur Laporan: Aset, Liabilitas, Ekuitas, Pendapatan, Beban, Prive/Dividen',
      'Asumsi Dasar: Going Concern, Basis Akrual vs Kas, Periodisasi',
      'Prinsip Kualitatif: Materialitas, Konsistensi, Substansi Mengungguli Bentuk',
      'Chart of Accounts (COA) & Kode Akun Baku'
    ],
    challengeTypes: ['Persamaan Dasar Akuntansi Balancer', 'Klasifikasi Akun & Saldo Normal', 'Identifikasi Perubahan Elemen']
  },
  {
    levelNumber: 2,
    id: 'acc-lvl-2-journal',
    name: 'Debit, Credit, and Journal',
    tagline: 'Mekanisme Debit-Kredit & Buku Besar',
    goal: 'Menguasai aturan debit-kredit, struktur akun T, pencatatan jurnal umum & jurnal khusus, posting ke buku besar, serta neraca saldo.',
    xpReward: 450,
    prerequisiteLevel: 1,
    summary: 'Menghilangkan kebingungan debit-kredit. Memastikan setiap transaksi memiliki nilai debit yang sama persis dengan kredit (balanced entry).',
    coreConcepts: [
      'Struktur Akun T & Saldo Normal (Aset & Beban bertambah di Debit; Liabilitas, Ekuitas, Pendapatan di Kredit)',
      'Jurnal Umum (General Journal)',
      'Jurnal Khusus: Penjualan, Pembelian, Penerimaan Kas, Pengeluaran Kas',
      'Posting Buku Besar (Ledger)',
      'Neraca Saldo (Trial Balance) & Pendeteksian Selisih',
      'Koreksi Kesalahan Jurnal (Correcting Entries)'
    ],
    challengeTypes: ['Interactive Journal Builder', 'Balance Debit-Credit Validator', 'Trial Balance Reconciler']
  },
  {
    levelNumber: 3,
    id: 'acc-lvl-3-adjusting-cycle',
    name: 'Adjusting Entries and Accounting Cycle',
    tagline: 'Jurnal Penyesuaian, Worksheet, & Siklus Lengkap',
    goal: 'Menuntaskan siklus akuntansi dari penyesuaian akrual & deferral, kertas kerja 10 kolom, hingga jurnal penutup dan pembalik.',
    xpReward: 550,
    prerequisiteLevel: 2,
    summary: 'Menerapkan asas penandingan (matching principle) dan periodisasi untuk mencerminkan posisi keuangan yang wajar.',
    coreConcepts: [
      'Beban Dibayar di Muka (Prepaid Expenses - Deferral)',
      'Pendapatan Diterima di Muka (Unearned Revenue - Deferral)',
      'Beban Akrual / Masih Harus Dibayar (Accrued Expenses)',
      'Pendapatan Akrual / Masih Harus Diterima (Accrued Revenue)',
      'Penyusutan Aset Tetap & Perlengkapan Terpakai',
      'Neraca Saldo Disesuaikan (Adjusted Trial Balance)',
      'Kertas Kerja (Worksheet 10 Kolom)',
      'Jurnal Penutup (Closing Entries) & Jurnal Pembalik (Reversing Entries)'
    ],
    challengeTypes: ['Adjusting Entry Solver', '10-Column Worksheet Completer', 'Closing Cycle Master']
  },
  {
    levelNumber: 4,
    id: 'acc-lvl-4-financial-statements',
    name: 'Financial Statements',
    tagline: 'Penyusunan & Hubungan Antar Laporan Keuangan',
    goal: 'Menyusun Laporan Laba Rugi, Laporan Perubahan Ekuitas, Laporan Posisi Keuangan (Neraca), Laporan Arus Kas, dan CALK.',
    xpReward: 650,
    prerequisiteLevel: 3,
    summary: 'Memahami artikulasi antar laporan keuangan: bagaimana laba bersih mengalir ke ekuitas dan arus kas mencerminkan likuiditas.',
    coreConcepts: [
      'Laporan Laba Rugi Komprehensif (Single Step vs Multi Step)',
      'Laporan Posisi Keuangan (Klasifikasi Lancar vs Tidak Lancar)',
      'Laporan Perubahan Ekuitas',
      'Laporan Arus Kas (Metode Langsung vs Tidak Langsung)',
      'Catatan Atas Laporan Keuangan (CALK)',
      'Artikulasi & Hubungan Lintas Laporan'
    ],
    challengeTypes: ['Statement Balance Checker', 'Cash Flow Direct/Indirect Builder', 'Inter-statement Linkage']
  },
  {
    levelNumber: 5,
    id: 'acc-lvl-5-intermediate-financial',
    name: 'Intermediate Financial Accounting',
    tagline: 'Persediaan, Aset Tetap, & Piutang Berdasarkan SAK',
    goal: 'Menerapkan standar akuntansi pada transaksi spesifik: persediaan (FIFO/Average), aset tetap (penyusutan & pelepasan), dan cadangan piutang.',
    xpReward: 750,
    prerequisiteLevel: 4,
    summary: 'Mendalami perlakuan aset operasional perusahaan dengan kalkulator inventaris dan tabel depresiasi.',
    coreConcepts: [
      'Persediaan: Sistem Periodik vs Perpetual, Metode FIFO & Rata-rata Tertimbang (Weighted Average)',
      'Lower of Cost or Net Realizable Value (LCNRV)',
      'Aset Tetap: Nilai Perolehan, Kapitalisasi vs Expense',
      'Metode Penyusutan: Garis Lurus, Saldo Menurun Ganda, Unit Produksi',
      'Pelepasan Aset & Laba/Rugi Penjualan Aset',
      'Piutang Usaha & Estimasi Kerugian Kredit Ekspektasian (ECL)'
    ],
    challengeTypes: ['Inventory Valuation Simulator', 'Fixed Asset Depreciation Schedule', 'Receivables Aging Matrix']
  },
  {
    levelNumber: 6,
    id: 'acc-lvl-6-cost-management',
    name: 'Cost and Management Accounting',
    tagline: 'Akuntansi Biaya, CVP, & Break-Even Point (BEP)',
    goal: 'Mengklasifikasikan biaya manufaktur, menghitung HPP, melakukan analisis Cost-Volume-Profit, BEP, dan penentuan harga pokok pesanan/proses.',
    xpReward: 850,
    prerequisiteLevel: 5,
    summary: 'Menyediakan informasi biaya internal untuk pengambilan keputusan manajerial dan penentuan margin laba.',
    coreConcepts: [
      'Biaya Bahan Baku Langsung, Tenaga Kerja Langsung, & Overhead Pabrik (BOP)',
      'Prime Cost vs Conversion Cost',
      'Biaya Tetap, Variabel, & Campuran (High-Low Method)',
      'Job Order Costing vs Process Costing',
      'Analisis Cost-Volume-Profit (CVP) & Break-Even Point (BEP)',
      'Margin of Safety & Operating Leverage',
      'Absorption Costing vs Variable Costing'
    ],
    challengeTypes: ['BEP & Margin Calculator', 'Manufacturing Cost Sheet Builder', 'CVP Sensitivity Simulator']
  },
  {
    levelNumber: 7,
    id: 'acc-lvl-7-tax-accounting',
    name: 'Tax Accounting (Akuntansi Pajak)',
    tagline: 'Rekonsiliasi Fiskal & Pajak Tangguhan (PSAK 46)',
    goal: 'Menghubungkan laporan keuangan komersial dengan ketentuan perpajakan Indonesia: beda tetap, beda temporer, dan pajak tangguhan.',
    xpReward: 950,
    prerequisiteLevel: 6,
    summary: 'Jembatan krusial antara akuntansi dan perpajakan. Melakukan koreksi fiskal positif & negatif hingga menyusun SPT Tahunan 1771.',
    coreConcepts: [
      'Laba Komersial vs Laba Fiskal',
      'Beda Tetap (Permanent Differences): Natura lama, sumbangan non-3M, dividen non-objek',
      'Beda Temporer (Timing Differences): Beda metode penyusutan, cadangan piutang',
      'Koreksi Fiskal Positif & Negatif',
      'Pajak Kini (Current Tax) & Pajak Tangguhan (Deferred Tax Asset/Liability - PSAK 46)',
      'Rekonsiliasi Pajak Penghasilan Badan & Pengisian Lampiran I SPT 1771'
    ],
    challengeTypes: ['Fiscal Reconciliation Canvas', 'Deferred Tax Calculator', 'SPT 1771 Matcher']
  },
  {
    levelNumber: 8,
    id: 'acc-lvl-8-auditing-control',
    name: 'Auditing and Internal Control',
    tagline: 'Pengendalian Internal, Asersi, & Bukti Audit',
    goal: 'Memahami prinsip audit laporan keuangan, sistem pengendalian internal COSO, penilaian risiko audit, dan pengujian asersi manajemen.',
    xpReward: 1050,
    prerequisiteLevel: 7,
    summary: 'Mengevaluasi keandalan laporan keuangan dari kacamata auditor independen.',
    coreConcepts: [
      'Tujuan Audit & Asersi Laporan Keuangan (Keberadaan, Kelengkapan, Hak & Kewajiban, Penilaian, Penyajian)',
      'Materialitas Audit & Risiko Audit (Inherent Risk, Control Risk, Detection Risk)',
      'Internal Control Framework COSO & Pemisahan Tugas (Segregation of Duties)',
      'Bukti Audit: Konfirmasi Eksternal, Vouching, Tracing, Rekonsiliasi Fisik',
      'Audit Kas, Piutang, Persediaan, & Siklus Pendapatan',
      'Opini Auditor: WTP, WDP, Tidak Wajar (Adverse), Tidak Memberikan Pendapat (Disclaimer)'
    ],
    challengeTypes: ['Audit Trail Detective', 'Internal Control Risk Spotter', 'Audit Evidence Evaluator']
  },
  {
    levelNumber: 9,
    id: 'acc-lvl-9-advanced-financial-analysis',
    name: 'Advanced Accounting & Financial Analysis',
    tagline: 'Analisis Rasio Komprehensif, DuPont, & Konsolidasi',
    goal: 'Menganalisis kinerja kesehatan keuangan entitas melalui rasio likuiditas, solvabilitas, profitabilitas, aktivitas, serta analisis DuPont.',
    xpReward: 1150,
    prerequisiteLevel: 8,
    summary: 'Membaca makna di balik angka keuangan untuk evaluasi investasi dan strategi bisnis.',
    coreConcepts: [
      'Rasio Likuiditas: Current Ratio, Quick Ratio, Cash Ratio',
      'Rasio Solvabilitas: Debt to Equity (DER), Debt to Assets (DAR), Times Interest Earned',
      'Rasio Profitabilitas: GPM, OPM, Net Profit Margin (NPM), ROA, ROE',
      'Rasio Aktivitas: Inventory Turnover, DSO, DPO, Cash Conversion Cycle',
      'DuPont Analysis (ROE = Net Profit Margin x Asset Turnover x Equity Multiplier)',
      'Analisis Tren Horisontal & Common-Size Vertikal',
      'Pengantar Laporan Konsolidasi & Kepentingan Non-Pengendali'
    ],
    challengeTypes: ['DuPont Decomposition Simulator', 'Comprehensive Ratio Diagnostic', 'Company Financial Health Audit']
  },
  {
    levelNumber: 10,
    id: 'acc-lvl-10-case-mastery',
    name: 'Accounting Case Mastery',
    tagline: 'Capstone Kasus Akuntansi Multi-Dimensi',
    goal: 'Menyelesaikan kasus akuntansi bisnis komprehensif dari pencatatan jurnal, penyesuaian, penyusunan laporan, rekonsiliasi fiskal, hingga analisis rasio.',
    xpReward: 1500,
    prerequisiteLevel: 9,
    summary: 'Ujian terpadu kemampuan akuntan profesional tingkat tinggi.',
    coreConcepts: [
      'End-to-End Business Accounting Dossier',
      'Multi-currency & Inter-company Transactions',
      'Complex Adjusting & Fiscal Alignment',
      'Integrated Strategic Recommendations'
    ],
    challengeTypes: ['Master Accounting Case Dossier', 'Blind Ledger Reconciliation', 'Capstone AI Audit']
  }
];

export interface AccountingCase {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  topic: string;
  entityName: string;
  industry: string;
  period: string;
  chronology: string;
  transactions: Array<{ date: string; desc: string; amount: number; docRef: string }>;
  unadjustedTrialBalance?: Array<{ accountCode: string; accountName: string; debit: number; credit: number }>;
  adjustmentData?: string[];
  relevantFacts: string[];
  irrelevantFacts: string[];
  missingInformation: string[];
  primaryQuestion: string;
  rubric: {
    conceptWeight: number;
    journalWeight: number;
    calculationWeight: number;
    presentationWeight: number;
    interpretationWeight: number;
  };
  keySolution: {
    journals: Array<{ date: string; debitAccount: string; creditAccount: string; amount: number; note: string }>;
    finalBalances?: Record<string, number>;
    summaryExplanation: string;
  };
  commonMistakes: string[];
}

export const PREBUILT_ACCOUNTING_CASES: AccountingCase[] = [
  {
    id: 'acc-case-01-jurnal-dagang',
    title: 'Pencatatan Transaksi Perusahaan Dagang & Penyesuaian Persediaan (UD Sumber Makmur)',
    difficulty: 'Intermediate',
    topic: 'Jurnal Umum, Persediaan Perpetual vs Periodik, & Penyesuaian',
    entityName: 'UD Sumber Makmur',
    industry: 'Perdagangan Elektronik',
    period: 'Bulan Desember 2025',
    chronology: 'UD Sumber Makmur menggunakan sistem persediaan perpetual. Pada bulan Desember 2025, terjadi transaksi pembelian barang dagang, penjualan kredit dengan syarat 2/10, n/30, retur barang rusak, pembayaran gaji, serta penyesuaian akhir tahun untuk sewa dibayar di muka dan cadangan kerugian piutang.',
    transactions: [
      { date: '02 Des 2025', desc: 'Membeli barang dagang secara kredit dari PT Elektronik Jaya Rp 50.000.000 dengan syarat 2/10, n/30, FOB Shipping Point.', amount: 50000000, docRef: 'Faktur Pembelian FP-101' },
      { date: '05 Des 2025', desc: 'Menjual barang dagang secara kredit kepada Toko Cahaya seharga Rp 70.000.000 (Harga Pokok Penjualan Rp 45.000.000) syarat 2/10, n/30.', amount: 70000000, docRef: 'Faktur Penjualan FJ-205' },
      { date: '08 Des 2025', desc: 'Menerima retur penjualan dari Toko Cahaya atas barang rusak seharga Rp 5.000.000 (HPP barang yang diretur Rp 3.200.000).', amount: 5000000, docRef: 'Nota Retur NR-12' },
      { date: '14 Des 2025', desc: 'Menerima pelunasan piutang dari Toko Cahaya atas penjualan tanggal 5 Desember setelah dikurangi retur (masih dalam masa potongan 2%).', amount: 63700000, docRef: 'Kuitansi Pelunasan BKM-88' },
      { date: '31 Des 2025', desc: 'Data penyesuaian: Sewa toko yang telah kadaluarsa bulan ini sebesar Rp 4.000.000 (dari saldo Sewa Dibayar di Muka).', amount: 4000000, docRef: 'Bukti Memorial BM-01' }
    ],
    relevantFacts: [
      'Metode pencatatan persediaan adalah Perpetual (setiap penjualan mendebit HPP dan mengkredit Persediaan)',
      'Syarat pelunasan 2/10, n/30 dimanfaatkan dalam masa 10 hari',
      'Nilai piutang setelah retur: 70 jt - 5 jt = 65 jt; Potongan 2% = 1.3 jt; Kas diterima = 63.7 jt'
    ],
    irrelevantFacts: [
      'UD Sumber Makmur baru saja mengganti software akuntansi ke sistem cloud',
      'Toko Cahaya berencana membuka cabang baru di Bekasi'
    ],
    missingInformation: ['Tidak ada data yang kurang untuk pencatatan transaksi di atas.'],
    primaryQuestion: 'Susunlah seluruh jurnal umum perpetual dari tanggal 2 s.d 31 Desember 2025 dan jelaskan dampaknya terhadap Laba Kotor!',
    rubric: {
      conceptWeight: 20,
      journalWeight: 35,
      calculationWeight: 20,
      presentationWeight: 15,
      interpretationWeight: 10
    },
    keySolution: {
      journals: [
        { date: '02 Des', debitAccount: 'Persediaan Barang Dagang', creditAccount: 'Utang Usaha', amount: 50000000, note: 'Pembelian kredit sistem perpetual' },
        { date: '05 Des (1)', debitAccount: 'Piutang Usaha', creditAccount: 'Penjualan', amount: 70000000, note: 'Penjualan kredit' },
        { date: '05 Des (2)', debitAccount: 'Harga Pokok Penjualan (HPP)', creditAccount: 'Persediaan Barang Dagang', amount: 45000000, note: 'Pengakuan HPP penjualan' },
        { date: '08 Des (1)', debitAccount: 'Retur & Potongan Penjualan', creditAccount: 'Piutang Usaha', amount: 5000000, note: 'Retur penjualan harga jual' },
        { date: '08 Des (2)', debitAccount: 'Persediaan Barang Dagang', creditAccount: 'Harga Pokok Penjualan (HPP)', amount: 3200000, note: 'Pengembalian persediaan fisik ke gudang' },
        { date: '14 Des', debitAccount: 'Kas (63.7jt) & Potongan Penjualan (1.3jt)', creditAccount: 'Piutang Usaha', amount: 65000000, note: 'Pelunasan piutang dalam periode diskon 2%' },
        { date: '31 Des', debitAccount: 'Beban Sewa', creditAccount: 'Sewa Dibayar di Muka', amount: 4000000, note: 'Penyesuaian sewa kadaluarsa' }
      ],
      summaryExplanation: 'Penjualan Bersih = Penjualan (70 jt) - Retur (5 jt) - Potongan (1.3 jt) = Rp 63.700.000. HPP Bersih = HPP (45 jt) - Retur HPP (3.2 jt) = Rp 41.800.000. Laba Kotor = Rp 63.700.000 - Rp 41.800.000 = Rp 21.900.000.'
    },
    commonMistakes: [
      'Lupa mencatat ayat jurnal kedua (HPP dan Persediaan) saat penjualan dan retur pada sistem perpetual',
      'Menghitung diskon 2% dari nilai awal 70 juta tanpa mengurangi retur 5 juta terlebih dahulu (seharusnya dari 65 juta)',
      'Mencatat potongan penjualan di sisi kredit bukannya debit'
    ]
  }
];
