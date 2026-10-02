/**
 * Official Economics Academy Curriculum, Levels, Mathematical Models, and Cases
 * Grounded in Microeconomics and Macroeconomics Foundations
 */

export interface EconomicsLevel {
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

export const ECONOMICS_LEVELS: EconomicsLevel[] = [
  {
    levelNumber: 1,
    id: 'econ-lvl-1-foundations',
    name: 'Economic Foundations',
    tagline: 'Kelangkaan, Biaya Peluang, & Trade-Off',
    goal: 'Memahami definisi ilmu ekonomi, kelangkaan sumber daya, biaya peluang (opportunity cost), Production Possibility Frontier (PPF), serta keunggulan komparatif.',
    xpReward: 350,
    prerequisiteLevel: 0,
    summary: 'Fondasi penalaran ekonomi: bagaimana individu dan masyarakat mengambil keputusan dalam kondisi keterbatasan sumber daya.',
    coreConcepts: [
      'Kelangkaan (Scarcity), Pilihan (Choice), & Biaya Peluang (Opportunity Cost)',
      'Trade-Off & Marginal Thinking (Marginal Benefit vs Marginal Cost)',
      'Mikroekonomi vs Makroekonomi; Ekonomi Positif vs Normatif',
      'Kurva Kemungkinan Produksi (Production Possibility Frontier - PPF)',
      'Efisiensi Produktif vs Efisiensi Alokatif',
      'Keunggulan Absolut vs Keunggulan Komparatif (David Ricardo)',
      'Spesialisasi & Manfaat Perdagangan (Gains from Trade)'
    ],
    challengeTypes: ['Opportunity Cost Calculator', 'PPF Trade-Off Analyzer', 'Comparative Advantage Matrix']
  },
  {
    levelNumber: 2,
    id: 'econ-lvl-2-consumer-behavior',
    name: 'Consumer Behavior (Perilaku Konsumen)',
    tagline: 'Teori Utilitas, Hukum Gossen I & II, & Indifference Curve',
    goal: 'Menguasai pendekatan kardinal dan ordinal: Total Utility, Marginal Utility, Hukum Gossen I & II, Budget Line, Indifference Curve, serta Efek Substitusi & Pendapatan.',
    xpReward: 450,
    prerequisiteLevel: 1,
    summary: 'Membedah bagaimana konsumen memaksimumkan kepuasan dengan batasan anggaran tertentu secara matematis dan grafis.',
    coreConcepts: [
      'Utilitas Kardinal vs Ordinal (Kepuasan Konsumsi)',
      'Total Utility (TU) & Marginal Utility (MU = ΔTU / ΔQ)',
      'Law of Diminishing Marginal Utility (Hukum Gossen I: penurunan kepuasan marginal)',
      'Keseimbangan Konsumen Banyak Barang (Hukum Gossen II: MUx/Px = MUy/Py)',
      'Garis Anggaran (Budget Line: I = Px.X + Py.Y) & Kemiringan Garis Anggaran (-Px/Py)',
      'Kurva Indiferensi (Indifference Curve) & Marginal Rate of Substitution (MRS = MUx/MUy)',
      'Titik Keseimbangan Konsumen: Titik Singgung IC dan Budget Line (MRS = Px/Py)',
      'Efek Substitusi vs Efek Pendapatan (Barang Normal, Inferior, & Giffen)'
    ],
    challengeTypes: ['Gossen I & II Utility Maximizer', 'Budget Line & Indifference Optimizer', 'Income & Substitution Effect Dissector']
  },
  {
    levelNumber: 3,
    id: 'econ-lvl-3-demand-supply-equilibrium',
    name: 'Demand, Supply, & Market Equilibrium',
    tagline: 'Mekanisme Pasar, Elastisitas, & Beban Pajak',
    goal: 'Menganalisis hukum permintaan dan penawaran, elastisitas harga/silang/pendapatan, surplus konsumen/produsen, serta deadweight loss akibat intervensi pajak atau subsidi.',
    xpReward: 550,
    prerequisiteLevel: 2,
    summary: 'Interaksi pembeli dan penjual dalam pembentukan harga dan alokasi efisien pasar.',
    coreConcepts: [
      'Fungsi Permintaan (Qd = a - bP) & Faktor Pergeseran Kurva (Shift vs Movement)',
      'Fungsi Penawaran (Qs = c + dP) & Faktor Biaya Input/Teknologi',
      'Keseimbangan Pasar (Market Equilibrium: Qd = Qs)',
      'Elastisitas Harga Permintaan (Ed = %ΔQ / %ΔP): Elastis, Inelastis, Uniter',
      'Elastisitas Silang (Barang Substitusi vs Komplementer) & Elastisitas Pendapatan (Normal vs Inferior)',
      'Plafon Harga (Price Ceiling - Shortage) & Harga Dasar (Price Floor - Surplus)',
      'Pengaruh Pajak Per Unit: Pergeseran Penawaran, Tax Incidence, & Deadweight Loss (DWL)',
      'Surplus Konsumen & Surplus Produsen'
    ],
    challengeTypes: ['Market Equilibrium & Tax Incidence Calculator', 'Elasticity Diagnostic', 'Deadweight Loss & Welfare Grapher']
  },
  {
    levelNumber: 4,
    id: 'econ-lvl-4-production-costs',
    name: 'Production & Costs',
    tagline: 'Fungsi Produksi & Struktur Biaya Jangka Pendek/Panjang',
    goal: 'Menghitung Total/Average/Marginal Product, Law of Diminishing Returns, serta struktur biaya: FC, VC, TC, AFC, AVC, ATC, dan Marginal Cost (MC).',
    xpReward: 650,
    prerequisiteLevel: 3,
    summary: 'Bagaimana produsen mengombinasikan faktor produksi dan meminimalkan biaya per unit output.',
    coreConcepts: [
      'Fungsi Produksi Jangka Pendek: Input Tetap vs Variabel',
      'Total Product (TP), Average Product (AP = TP/L), Marginal Product (MP = ΔTP/ΔL)',
      'The Law of Diminishing Marginal Returns (Tahap Produksi I, II, dan III)',
      'Isoquant & Isocost (MRTS = -w/r)',
      'Biaya Eksplisit vs Biaya Implisit (Laba Akuntansi vs Laba Ekonomi)',
      'Biaya Tetap (FC), Biaya Variabel (VC), Biaya Total (TC = FC + VC)',
      'Biaya Rata-Rata (ATC, AVC, AFC) & Biaya Marginal (MC = ΔTC / ΔQ)',
      'Kurva Biaya Jangka Panjang: Skala Ekonomis (Economies of Scale) vs Diseconomies'
    ],
    challengeTypes: ['Production Stages Identifier', 'Cost Curve Step-by-Step Calculator', 'Economies of Scale Diagnostician']
  },
  {
    levelNumber: 5,
    id: 'econ-lvl-5-market-structures',
    name: 'Market Structures (Struktur Pasar)',
    tagline: 'Persaingan Sempurna, Monopoli, Oligopoli, & Monopolistik',
    goal: 'Membedah perilaku penetapan harga dan kuantitas laba maksimum (MR = MC) pada pasar persaingan sempurna, monopoli, oligopoli, dan persaingan monopolistik.',
    xpReward: 750,
    prerequisiteLevel: 4,
    summary: 'Menilai efisiensi pasar berdasarkan tingkat kompetisi dan kekuatan monopoli (market power).',
    coreConcepts: [
      'Karakteristik 4 Struktur Pasar: Hambatan Masuk, Jumlah Penjual, Sifat Produk',
      'Pasar Persaingan Sempurna: Price Taker, P = MR = AR, Titik Impas & Titik Tutup Usaha (Shutdown: P < AVC)',
      'Monopoli: Price Maker, Hambatan Masuk, Kurva Permintaan Menurun (MR < P), Aturan MR = MC',
      'Inefisiensi Monopoli: Deadweight Loss & Kerugian Kesejahteraan Sosial',
      'Persaingan Monopolistik: Diferensiasi Produk, Perang Iklan, Laba Normal Jangka Panjang',
      'Oligopoli: Interdependensi Strategis, Kurva Permintaan Patah (Kinked Demand Curve), Game Theory & Nash Equilibrium'
    ],
    challengeTypes: ['MR=MC Profit Maximizer', 'Market Structure Classifier', 'Monopoly vs Perfect Competition Welfare Comparison']
  },
  {
    levelNumber: 6,
    id: 'econ-lvl-6-market-failure-welfare',
    name: 'Market Failure & Public Goods',
    tagline: 'Eksternalitas, Barang Publik, & Pajak Pigouvian',
    goal: 'Menganalisis kegagalan mekanisme pasar: eksternalitas negatif/positif, barang publik (non-rival & non-excludable), free rider, asimetri informasi, dan instrumen korektif pemerintah.',
    xpReward: 850,
    prerequisiteLevel: 5,
    summary: 'Kapan pasar gagal mengalokasikan sumber daya secara optimal dan bagaimana peran intervensi fiskal negara.',
    coreConcepts: [
      'Efisiensi Pareto & Kondisi Alokasi Optimal',
      'Eksternalitas Negatif: Biaya Sosial > Biaya Privat, Overproduction, Polusi',
      'Eksternalitas Positif: Manfaat Sosial > Manfaat Privat, Underproduction, Pendidikan/Vaksin',
      'Pajak Korektif Pigouvian (Pigouvian Tax) & Subsidi Korektif',
      'Teorema Coase & Negosiasi Hak Milik (Property Rights)',
      'Klasifikasi Barang: Rival vs Non-Rival, Excludable vs Non-Excludable',
      'Barang Publik Murni vs Common Pool Resources (Tragedy of the Commons)',
      'Asimetri Informasi: Moral Hazard vs Adverse Selection'
    ],
    challengeTypes: ['Pigouvian Tax Calibrator', 'Public Goods & Free-Rider Analyzer', 'Externalities Social Cost Evaluator']
  },
  {
    levelNumber: 7,
    id: 'econ-lvl-7-macroeconomics',
    name: 'Macroeconomics (Perekonomian Agregat)',
    tagline: 'PDB, Inflasi, Pengangguran, & Model Keynesian',
    goal: 'Menghitung dan menganalisis Produk Domestik Bruto (Pendekatan Pengeluaran & Pendapatan), deflator PDB, tingkat inflasi, pengangguran, serta fungsi konsumsi dan angka pengganda (multiplier).',
    xpReward: 950,
    prerequisiteLevel: 6,
    summary: 'Kinerja perekonomian nasional secara keseluruhan dan indikator stabilitas makroekonomi.',
    coreConcepts: [
      'PDB (GDP) Pengeluaran: Y = C + I + G + (X - M)',
      'PDB Nominal vs PDB Riil & PDB Deflator',
      'Inflasi: IHK (CPI), Inflasi Tarikan Permintaan (Demand-Pull) vs Dorongan Biaya (Cost-Push)',
      'Pengangguran: Friksional, Struktural, Siklikal, & Tingkat Pengangguran Alamiah (NAIRU)',
      'Fungsi Konsumsi Keynes: C = a + b.Yd (MPC & MPS, di mana MPC + MPS = 1)',
      'Angka Pengganda Belanja Pemerintah (Government Spending Multiplier: k = 1 / (1 - MPC))',
      'Keseimbangan Pendapatan Nasional Sederhana & 3 Sektor',
      'Kurva Phillips: Trade-off Inflasi dan Pengangguran Jangka Pendek'
    ],
    challengeTypes: ['Real GDP & Deflator Calculator', 'Keynesian Multiplier Simulator', 'Macroeconomic Health Scanner']
  },
  {
    levelNumber: 8,
    id: 'econ-lvl-8-monetary-fiscal-policy',
    name: 'Monetary & Fiscal Policy',
    tagline: 'Bank Sentral, Kebijakan Anggaran, & Crowding-Out',
    goal: 'Menganalisis bekerjanya kebijakan moneter (suku bunga acuan, cadangan kas wajib, operasi pasar terbuka) dan kebijakan fiskal (pajak dan belanja negara) dalam stabilisasi siklus bisnis.',
    xpReward: 1050,
    prerequisiteLevel: 7,
    summary: 'Koordinasi bauran kebijakan makroekonomi (policy mix) antara Kementerian Keuangan dan Bank Sentral.',
    coreConcepts: [
      'Penciptaan Uang & Money Multiplier (1 / Reserve Requirement Ratio)',
      'Instrumen Moneter Bank Indonesia: BI-Rate, Giro Wajib Minimum (GWM), Operasi Moneter Terbuka',
      'Transmisi Kebijakan Moneter: Jalur Suku Bunga, Nilai Tukar, Kredit, dan Ekspektasi',
      'Kebijakan Fiskal Ekspansif vs Kontraktif',
      'Defisit Anggaran, Utang Pemerintah, & Efek Crowding-Out Investasi Swasta',
      'Penstabil Otomatis (Automatic Stabilizers: Pajak Progresif & Bantuan Sosial)',
      'Model IS-LM Sederhana: Keseimbangan Pasar Barang dan Pasar Uang'
    ],
    challengeTypes: ['Monetary Policy Transmission Simulator', 'Fiscal Policy Stimulus Calibrator', 'Crowding-Out Evaluator']
  },
  {
    levelNumber: 9,
    id: 'econ-lvl-9-international-development',
    name: 'International & Development Economics',
    tagline: 'Perdagangan Global, Kurs Valuta Asing, & Pertumbuhan',
    goal: 'Menganalisis dampak tarif impor dan kuota perdagangan, penentuan kurs valas (apresiasi/depresiasi), neraca pembayaran, serta faktor penentu pertumbuhan ekonomi jangka panjang.',
    xpReward: 1150,
    prerequisiteLevel: 8,
    summary: 'Keterhubungan ekonomi terbuka dalam era globalisasi dan pembangunan berkelanjutan.',
    coreConcepts: [
      'Dampak Kebijakan Proteksi Perdagangan: Tarif Impor, Kuota, & Subsidi Ekspor',
      'Neraca Pembayaran (Balance of Payments): Transaksi Berjalan vs Transaksi Finansial',
      'Sistem Kurs Valuta Asing: Mengambang Bebas (Floating), Tetap (Fixed), & Terkelola',
      'Dampak Apresiasi & Depresiasi Mata Uang terhadap Ekspor-Impor',
      'Faktor Pertumbuhan Ekonomi: Akumulasi Modal, Tenaga Kerja, Modal Manusia (Human Capital), & Inovasi Teknologi',
      'Kemiskinan, Ketimpangan Pendapatan (Rasio Gini & Kurva Lorenz)',
      'Tujuan Pembangunan Berkelanjutan (SDGs)'
    ],
    challengeTypes: ['Tariff Welfare Impact Calculator', 'Foreign Exchange & Trade Balance Simulator', 'Gini Coefficient & Inequality Plotter']
  },
  {
    levelNumber: 10,
    id: 'econ-lvl-10-applied-economics-mastery',
    name: 'Applied Economics & Case Mastery',
    tagline: 'Simulasi Kasus Kebijakan Publik & Ekonomi Terapan',
    goal: 'Menyelesaikan skenario kebijakan ekonomi komprehensif yang mengintegrasikan teori mikroekonomi, makroekonomi, dan fiskal tanpa petunjuk awal.',
    xpReward: 1500,
    prerequisiteLevel: 9,
    summary: 'Evaluasi puncak kemampuan analitis ekonom dan analis kebijakan publik.',
    coreConcepts: [
      'Multi-Variable Policy Crisis Simulation',
      'Cost-Benefit Analysis Proyek Publik',
      'Macro-Fiscal Stress Testing',
      'Comprehensive Economic Advisory Memorandum'
    ],
    challengeTypes: ['Applied Policy Memo', 'Blind Economic Scenario Evaluator', 'Capstone AI Defense']
  }
];

export interface EconomicsCase {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  topic: string;
  scenario: string;
  parameters: Record<string, any>;
  relevantFacts: string[];
  irrelevantFacts: string[];
  analysisQuestions: string[];
  rubric: {
    conceptWeight: number;
    mathWeight: number;
    graphWeight: number;
    interpretationWeight: number;
  };
  keySolution: {
    numericalSteps: Array<{ title: string; calculation: string; result: string }>;
    graphicalInterpretation: string;
    policyRecommendation: string;
  };
}

export const PREBUILT_ECONOMICS_CASES: EconomicsCase[] = [
  {
    id: 'econ-case-01-tax-incidence-market',
    title: 'Analisis Dampak Pajak Spesifik atas Pasar Minuman Manis (Cukai Minuman Bergula)',
    difficulty: 'Intermediate',
    topic: 'Keseimbangan Pasar, Insidensi Pajak, & Deadweight Loss',
    scenario: 'Pemerintah merencanakan pengenaan cukai spesifik atas minuman berpemanis dalam kemasan (MBDK) sebesar Rp 2.000 per liter untuk menekan konsumsi gula. Fungsi permintaan pasar diestimasi: Qd = 100.000 - 10P, sedangkan fungsi penawaran produsen sebelum cukai: Qs = -20.000 + 20P (P dalam rupiah per liter, Q dalam liter per minggu).',
    parameters: {
      demandFunction: 'Qd = 100.000 - 10P',
      supplyFunction: 'Qs = -20.000 + 20P',
      specificTax: 2000
    },
    relevantFacts: [
      'Fungsi permintaan memiliki elastisitas yang dipengaruhi kemiringan b = 10',
      'Cukai sebesar Rp 2.000 menggeser kurva penawaran ke kiri atas',
      'Persamaan penawaran baru dengan pajak: Qs_t = -20.000 + 20(P - 2.000) = -60.000 + 20P'
    ],
    irrelevantFacts: [
      'Pabrik minuman manis menggunakan botol plastik ramah lingkungan',
      'Iklan produk ditayangkan di media sosial saat jam prime-time'
    ],
    analysisQuestions: [
      'Hitung harga dan kuantitas keseimbangan sebelum dikenakan cukai!',
      'Hitung harga yang dibayar konsumen (Pb), harga yang diterima produsen (Ps), dan kuantitas setelah cukai!',
      'Hitung beban pajak yang ditanggung konsumen vs produsen (Tax Incidence) serta Deadweight Loss (DWL) yang timbul!'
    ],
    rubric: {
      conceptWeight: 25,
      mathWeight: 35,
      graphWeight: 20,
      interpretationWeight: 20
    },
    keySolution: {
      numericalSteps: [
        {
          title: 'Keseimbangan Awal (Sebelum Cukai)',
          calculation: 'Qd = Qs -> 100.000 - 10P = -20.000 + 20P -> 30P = 120.000 -> P0 = Rp 4.000/liter. Q0 = 100.000 - 10(4.000) = 60.000 liter.',
          result: 'P0 = Rp 4.000, Q0 = 60.000 liter.'
        },
        {
          title: 'Keseimbangan Baru (Setelah Cukai Rp 2.000)',
          calculation: 'Penawaran baru: Qs_t = -20.000 + 20(P - 2.000) = -60.000 + 20P. Keseimbangan: 100.000 - 10P = -60.000 + 20P -> 30P = 160.000 -> Pb = Rp 5.333,33. Ps = Pb - 2.000 = Rp 3.333,33. Qt = 100.000 - 10(5.333,33) = 46.667 liter.',
          result: 'Pb = Rp 5.333, Ps = Rp 3.333, Qt = 46.667 liter.'
        },
        {
          title: 'Insidensi Pajak & Deadweight Loss (DWL)',
          calculation: 'Beban Konsumen = Pb - P0 = 5.333 - 4.000 = Rp 1.333 (66,7%). Beban Produsen = P0 - Ps = 4.000 - 3.333 = Rp 667 (33,3%). Penerimaan Pajak = 2.000 x 46.667 = Rp 93.334.000. Penurunan output ΔQ = 60.000 - 46.667 = 13.333 liter. DWL = 0.5 x t x ΔQ = 0.5 x 2.000 x 13.333 = Rp 13.333.000.',
          result: 'DWL = Rp 13.333.000; Konsumen menanggung porsi beban lebih besar karena permintaan lebih inelastis dibanding penawaran.'
        }
      ],
      graphicalInterpretation: 'Kurva penawaran bergeser ke atas sebesar nilai cukai Rp 2.000. Terjadi penurunan surplus konsumen dan surplus produsen, sebagian bertransformasi menjadi penerimaan kas negara, dan segitiga harberger deadweight loss sebesar Rp 13,3 juta menunjukkan hilangnya efisiensi pasar.',
      policyRecommendation: 'Cukai berhasil menurunkan konsumsi MBDK sebesar 22,2% (dari 60 ribu liter menjadi 46,7 ribu liter), mendukung tujuan kesehatan publik, dengan penerimaan negara Rp 93,3 juta per minggu.'
    }
  }
];
