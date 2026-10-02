/**
 * Official Indonesian Tax Reference Data, Curriculum Levels, Diagnostic Test & Seed Data
 * Sourced from official JDIH Kementerian Keuangan RI & DJP
 */

export interface TaxRegulation {
  id: string;
  name: string;
  number: string;
  year: number;
  topic: string;
  taxType: 'PPh' | 'PPN' | 'KUP' | 'Pajak Daerah' | 'Cukai & PBB';
  activeStatus: 'BERLAKU' | 'DICABUT' | 'DIUBAH SEBAGIAN';
  summary: string;
  keyArticles: Array<{ article: string; content: string }>;
  source: string;
  sourceUrl: string;
  lastCheckedDate: string;
  officialVerification: boolean;
}

export const OFFICIAL_REGULATIONS: TaxRegulation[] = [
  {
    id: 'reg-pmk-168-2023',
    name: 'Petunjuk Pemotongan Pajak atas Penghasilan Sehubungan dengan Pekerjaan, Jasa, atau Kegiatan Orang Pribadi (TER PPh 21)',
    number: 'PMK No. 168 Tahun 2023',
    year: 2023,
    topic: 'Tarif Efektif Rata-Rata (TER) PPh Pasal 21',
    taxType: 'PPh',
    activeStatus: 'BERLAKU',
    summary: 'Mengatur skema penyederhanaan penghitungan PPh Pasal 21 bulanan bagi pegawai tetap menggunakan Tarif Efektif Bulanan Kategori A, B, C untuk masa selain masa terakhir, serta penghitungan kembali pada masa pajak terakhir menggunakan tarif progresif Pasal 17 ayat (1) huruf a UU PPh.',
    keyArticles: [
      { article: 'Pasal 2 ayat (2)', content: 'Pemotong PPh 21 terdiri atas pemberi kerja, bendahara pemerintah, dana pensiun, badan, dan penyelenggara kegiatan.' },
      { article: 'Pasal 5', content: 'Penghitungan PPh 21 Pegawai Tetap masa selain masa terakhir = Penghasilan Bruto x Tarif Efektif Bulanan (Kategori A, B, atau C).' },
      { article: 'Pasal 16', content: 'Penghitungan PPh 21 masa pajak terakhir dihitung menggunakan tarif Pasal 17 ayat (1) huruf a UU PPh atas PKP setahun dikurangi jumlah PPh 21 yang telah dipotong.' }
    ],
    source: 'JDIH Kementerian Keuangan RI',
    sourceUrl: 'https://jdih.kemenkeu.go.id/download/12fb1a3c-b17b-4ef9-bb6e-213faee3683a/168~PMK.03~2023Per.pdf',
    lastCheckedDate: '2026-09-15',
    officialVerification: true
  },
  {
    id: 'reg-uu-hpp-7-2021',
    name: 'Undang-Undang tentang Harmonisasi Peraturan Perpajakan (UU HPP)',
    number: 'Undang-Undang No. 7 Tahun 2021',
    year: 2021,
    topic: 'Reformasi Komprehensif KUP, PPh, PPN, dan Pajak Karbon',
    taxType: 'PPh',
    activeStatus: 'BERLAKU',
    summary: 'Mereformasi struktur lapisan tarif PPh Orang Pribadi (lapisan 5% dinaikkan s.d 60 juta, penambahan tarif 35% di atas 5 miliar), tarif PPN menjadi 11% (mulai 1 April 2022) dan 12% (paling lambat 1 Januari 2025), batasan omzet UMKM Rp 500 juta tidak kena pajak bagi WPOP, serta integrasi NIK menjadi NPWP.',
    keyArticles: [
      { article: 'Pasal 2 UU KUP stddt UU HPP', content: 'Penggunaan Nomor Induk Kependudukan (NIK) sebagai Nomor Pokok Wajib Pajak (NPWP) bagi Wajib Pajak Orang Pribadi penduduk Indonesia.' },
      { article: 'Pasal 17 ayat (1) huruf a UU PPh stddt UU HPP', content: 'Tarif progresif PPh OP: 0-60 jt (5%), 60-250 jt (15%), 250-500 jt (25%), 500 jt - 5 M (30%), > 5 M (35%).' },
      { article: 'Pasal 7 ayat (1) UU PPN stddt UU HPP', content: 'Tarif PPN sebesar 11% mulai 1 April 2022 dan 12% paling lambat 1 Januari 2025.' },
      { article: 'Pasal 7 ayat (2a) UU PPh stddt UU HPP', content: 'Wajib Pajak Orang Pribadi dengan peredaran bruto tertentu tidak dikenai PPh atas bagian peredaran bruto sampai dengan Rp 500.000.000 dalam 1 tahun pajak.' }
    ],
    source: 'JDIH Kementerian Keuangan & Lembaran Negara RI No. 246 Tahun 2021',
    sourceUrl: 'https://jdih.kemenkeu.go.id/fulltext/2021/7TAHUN2021UU.pdf',
    lastCheckedDate: '2026-09-18',
    officialVerification: true
  },
  {
    id: 'reg-pp-55-2022',
    name: 'Peraturan Pemerintah tentang Penyesuaian Pengaturan di Bidang Pajak Penghasilan',
    number: 'Peraturan Pemerintah No. 55 Tahun 2022',
    year: 2022,
    topic: 'Penyesuaian Ketentuan PPh, Natura, dan Batasan UMKM',
    taxType: 'PPh',
    activeStatus: 'BERLAKU',
    summary: 'Mengatur secara rinci perlakuan perpajakan atas kenikmatan dan imbalan berupa natura (menjadi objek pajak dan deductible expense bagi pemberi kerja dengan pengecualian tertentu), serta teknis pembebasan omzet UMKM s.d Rp 500 juta bagi Orang Pribadi.',
    keyArticles: [
      { article: 'Pasal 24', content: 'Penggantian atau imbalan dalam bentuk natura dan/atau kenikmatan sehubungan dengan pekerjaan atau jasa dinilai berdasarkan nilai pasar atau nilai yang dikeluarkan pemberi kerja.' },
      { article: 'Pasal 56 & 60', content: 'WPOP yang memiliki peredaran bruto tertentu dikenai PPh Final 0,5% hanya atas bagian peredaran bruto kumulatif yang melebihi Rp 500.000.000 dalam satu Tahun Pajak.' }
    ],
    source: 'JDIH Kementerian Keuangan RI',
    sourceUrl: 'https://jdih.kemenkeu.go.id/fulltext/2022/55TAHUN2022PP.pdf',
    lastCheckedDate: '2026-09-12',
    officialVerification: true
  },
  {
    id: 'reg-uu-kup-6-1983',
    name: 'Ketentuan Umum dan Tata Cara Perpajakan',
    number: 'UU No. 6 Tahun 1983 stddt UU No. 7 Tahun 2021',
    year: 2021,
    topic: 'Hak dan Kewajiban Wajib Pajak, Pemeriksaan, Keberatan, dan Sanksi',
    taxType: 'KUP',
    activeStatus: 'BERLAKU',
    summary: 'Hukum formal perpajakan Indonesia yang mengatur pendaftaran NPWP, SPT, pembayaran, penetapan SKP, tata cara pemeriksaan pajak, surat paksa, permohonan keberatan (Pasal 25), banding ke Pengadilan Pajak (Pasal 27), dan sanksi bunga berbasis suku bunga acuan ditambah uplift margin.',
    keyArticles: [
      { article: 'Pasal 13 ayat (1)', content: 'Direktur Jenderal Pajak dapat menerbitkan Surat Ketetapan Pajak Kurang Bayar (SKPKB) dalam jangka waktu 5 tahun setelah saat terutangnya pajak atau berakhirnya Masa/Tahun Pajak.' },
      { article: 'Pasal 25 ayat (1)', content: 'Wajib Pajak dapat mengajukan keberatan kepada Direktur Jenderal Pajak atas suatu SKPKB, SKPKBT, SKPLB, SKPN, atau pemotongan/pemungutan pihak ketiga dalam jangka waktu 3 bulan sejak tanggal dikirimnya surat ketetapan.' },
      { article: 'Pasal 27 ayat (1)', content: 'Wajib Pajak dapat mengajukan permohonan banding hanya kepada Pengadilan Pajak atas Surat Keputusan Keberatan dalam jangka waktu 3 bulan sejak tanggal diterima Surat Keputusan Keberatan.' }
    ],
    source: 'JDIH Kemenkeu RI',
    sourceUrl: 'https://jdih.kemenkeu.go.id',
    lastCheckedDate: '2026-09-10',
    officialVerification: true
  },
  {
    id: 'reg-uu-ppn-8-1983',
    name: 'Pajak Pertambahan Nilai Barang dan Jasa dan Pajak Penjualan atas Barang Mewah',
    number: 'UU No. 8 Tahun 1983 stddt UU No. 7 Tahun 2021',
    year: 2021,
    topic: 'Pengenaan PPN, BKP, JKP, Pengkreditan Pajak Masukan, dan Faktur Pajak',
    taxType: 'PPN',
    activeStatus: 'BERLAKU',
    summary: 'Pajak atas konsumsi Barang Kena Pajak (BKP) dan Jasa Kena Pajak (JKP) di dalam Daerah Pabean yang menganut sistem indirect tax dan invoice credit method.',
    keyArticles: [
      { article: 'Pasal 4 ayat (1)', content: 'PPN dikenakan atas penyerahan BKP di dalam Daerah Pabean yang dilakukan oleh Pengusaha, impor BKP, penyerahan JKP, pemanfaatan BKP Tidak Berwujud/JKP dari luar Daerah Pabean, dan ekspor BKP/JKP oleh PKP.' },
      { article: 'Pasal 9 ayat (2) & (8)', content: 'Pajak Masukan dalam suatu Masa Pajak dikreditkan dengan Pajak Keluaran untuk Masa Pajak yang sama. Pajak Masukan yang tidak memenuhi ketentuan faktur atau tidak ada hubungan langsung dengan kegiatan usaha tidak dapat dikreditkan.' },
      { article: 'Pasal 13', content: 'PKP wajib membuat Faktur Pajak untuk setiap penyerahan BKP/JKP pada saat penyerahan atau saat penerimaan pembayaran.' }
    ],
    source: 'JDIH Kemenkeu RI',
    sourceUrl: 'https://jdih.kemenkeu.go.id',
    lastCheckedDate: '2026-09-20',
    officialVerification: true
  },
  {
    id: 'reg-uu-hkpd-1-2022',
    name: 'Hubungan Keuangan Antara Pemerintah Pusat dan Pemerintahan Daerah',
    number: 'UU No. 1 Tahun 2022',
    year: 2022,
    topic: 'Pajak Daerah dan Retribusi Daerah (PDRD)',
    taxType: 'Pajak Daerah',
    activeStatus: 'BERLAKU',
    summary: 'Menyederhanakan jenis pajak daerah, mengatur PBJT (Pajak Barang dan Jasa Tertentu yang menggabungkan Pajak Hotel, Restoran, Hiburan, Parkir, dan Penerangan Jalan), PBB-P2, BPHTB, serta opsen PKB dan BBNKB.',
    keyArticles: [
      { article: 'Pasal 4 ayat (1)', content: 'Jenis Pajak Daerah Kabupaten/Kota meliputi PBB-P2, BPHTB, PBJT, Pajak Reklame, PAT, MBLB, Pajak Sarang Burung Walet, Opsen PKB, Opsen BBNKB.' },
      { article: 'Pasal 58', content: 'Tarif PBJT ditetapkan paling tinggi sebesar 10%, kecuali jasa hiburan diskotik, karaoke, kelab malam, bar, dan spa ditetapkan paling rendah 40% dan paling tinggi 75%.' }
    ],
    source: 'JDIH Kemenkeu & Kemendagri RI',
    sourceUrl: 'https://jdih.kemenkeu.go.id',
    lastCheckedDate: '2026-09-14',
    officialVerification: true
  }
];

export interface DiagnosticQuestion {
  id: number;
  category: 'Konsep' | 'Definisi' | 'Analisis Regulasi' | 'Perhitungan' | 'Case Study' | 'Sengketa';
  question: string;
  scenario?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  legalBasis: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    category: 'Konsep',
    question: 'Manakah dari pernyataan berikut yang paling tepat membedakan "Subjek Pajak" dan "Wajib Pajak"?',
    options: [
      'Subjek pajak selalu memiliki kewajiban membayar pajak, sedangkan Wajib Pajak belum tentu.',
      'Subjek pajak adalah orang pribadi atau badan yang berpotensi dikenai pajak, dan baru menjadi Wajib Pajak apabila telah memenuhi syarat subjektif dan objektif.',
      'Wajib Pajak ditentukan berdasarkan kartu identitas KTP, sedangkan Subjek Pajak berdasarkan tempat kedudukan.',
      'Subjek pajak hanya berlaku untuk Pajak Penghasilan, sedangkan Wajib Pajak berlaku untuk semua jenis pajak.'
    ],
    correctIndex: 1,
    explanation: 'Sesuai UU KUP dan UU PPh, Subjek Pajak adalah pihak yang dituju oleh undang-undang untuk dikenai pajak. Namun ia baru menjadi Wajib Pajak jika telah memenuhi persyaratan subjektif dan objektif (misal: menerima penghasilan di atas PTKP).',
    legalBasis: 'Pasal 1 angka 2 UU KUP jo. Pasal 2 UU PPh',
    difficulty: 'Beginner'
  },
  {
    id: 2,
    category: 'Definisi',
    question: 'Berdasarkan Pasal 4 ayat (1) UU PPh, apakah karakteristik hakiki dari konsep "Penghasilan" menurut hukum pajak Indonesia?',
    options: [
      'Setiap kas yang masuk ke dalam rekening bank Wajib Pajak dalam tahun kalender berjalan.',
      'Hanya penerimaan laba bersih setelah dikurangi seluruh biaya konsumsi pribadi dan keluarga.',
      'Setiap tambahan kemampuan ekonomis yang diterima atau diperoleh Wajib Pajak, dari Indonesia maupun luar Indonesia, yang dapat dipakai untuk konsumsi atau menambah kekayaan.',
      'Semua transaksi penjualan barang atau penyerahan jasa yang memiliki bukti Faktur Pajak.'
    ],
    correctIndex: 2,
    explanation: 'Definisi yuridis penghasilan menganut konsep akresi (Schanz-Haig-Simons concept of income): setiap tambahan kemampuan ekonomis yang dapat dipakai untuk konsumsi atau menambah kekayaan Wajib Pajak dengan nama dan dalam bentuk apa pun.',
    legalBasis: 'Pasal 4 ayat (1) UU PPh stddt UU HPP',
    difficulty: 'Beginner'
  },
  {
    id: 3,
    category: 'Analisis Regulasi',
    question: 'Di bawah PMK No. 168 Tahun 2023, bagaimanakah mekanisme pemotongan PPh 21 bagi seorang Pegawai Tetap yang berstatus K/0 (Kawin, tanpa tanggungan) untuk Masa Pajak Januari?',
    options: [
      'Dihitung langsung menggunakan tarif progresif Pasal 17 ayat (1) huruf a atas estimasi PKP setahun dibagi 12.',
      'Dipotong menggunakan Tarif Efektif Bulanan (TER) Kategori A dikalikan Penghasilan Bruto bulan Januari.',
      'Dipotong menggunakan Tarif Efektif Bulanan (TER) Kategori B dikalikan Penghasilan Bruto bulan Januari.',
      'Dikenakan PPh Final 0,5% dari Penghasilan Bruto bulan Januari.'
    ],
    correctIndex: 1,
    explanation: 'Berdasarkan Lampiran PMK-168/2023, status PTKP TK/0, TK/1, dan K/0 dikelompokkan ke dalam Kategori TER A. Untuk masa selain masa terakhir, PPh 21 = Bruto x TER Kategori A.',
    legalBasis: 'Pasal 5 ayat (1) & Lampiran PMK No. 168 Tahun 2023',
    difficulty: 'Intermediate'
  },
  {
    id: 4,
    category: 'Perhitungan',
    scenario: 'Ibu Ratna adalah seorang karyawati berstatus TK/0 pada PT Nusantara. Pada bulan Februari 2026, gaji bruto dan tunjangannya berjumlah Rp 8.000.000. Sesuai tabel TER Kategori A, penghasilan di atas Rp 7.500.000 s.d Rp 8.550.000 dikenakan tarif efektif 1,5%.',
    question: 'Berapakah PPh Pasal 21 yang wajib dipotong PT Nusantara atas gaji Ibu Ratna bulan Februari 2026?',
    options: [
      'Rp 80.000',
      'Rp 120.000',
      'Rp 240.000',
      'Nihil, karena dipotong biaya jabatan 5% terlebih dahulu'
    ],
    correctIndex: 1,
    explanation: 'Penghitungan TER bulanan: Penghasilan Bruto Rp 8.000.000 x TER (1,5%) = Rp 120.000. Dalam skema TER bulanan, biaya jabatan dan PTKP tidak dikurangkan setiap bulan, melainkan telah diperhitungkan dalam formulasi tabel TER.',
    legalBasis: 'Pasal 5 PMK No. 168 Tahun 2023',
    difficulty: 'Intermediate'
  },
  {
    id: 5,
    category: 'Analisis Regulasi',
    scenario: 'PT Sentosa menyewa sebuah ruko dari Tuan Hendra (Orang Pribadi memiliki NPWP) dengan nilai sewa Rp 100.000.000 untuk 1 tahun.',
    question: 'Aspek PPh apakah yang wajib dipotong oleh PT Sentosa dan berapa tarifnya?',
    options: [
      'PPh Pasal 23 sebesar 2% tidak final.',
      'PPh Pasal 4 ayat (2) Final sebesar 10%.',
      'PPh Pasal 21 atas penggunaan harta sebesar 5%.',
      'PPh Pasal 22 sebesar 1,5%.'
    ],
    correctIndex: 1,
    explanation: 'Sewa tanah dan/atau bangunan dikenai PPh bersifat Final berdasarkan Pasal 4 ayat (2) UU PPh jo. PP No. 34 Tahun 2017 dengan tarif 10% dari jumlah bruto nilai persewaan.',
    legalBasis: 'Pasal 4 ayat (2) huruf d UU PPh jo. PP No. 34/2017',
    difficulty: 'Intermediate'
  },
  {
    id: 6,
    category: 'Konsep',
    question: 'Manakah dari biaya berikut ini yang TIDAK DAPAT dikurangkan dari penghasilan bruto (non-deductible expense) bagi Wajib Pajak Badan berdasarkan Pasal 9 ayat (1) UU PPh?',
    options: [
      'Biaya gaji pegawai dan tunjangan hari raya.',
      'Biaya penyusutan atas mesin operasional pabrik.',
      'Biaya yang dibebankan untuk kepentingan pribadi pemegang saham atau keluarganya.',
      'Premi asuransi kebakaran gedung kantor yang dibayar oleh perusahaan.'
    ],
    correctIndex: 2,
    explanation: 'Sesuai Pasal 9 ayat (1) huruf i UU PPh stddt UU HPP, biaya yang dibebankan atau dikeluarkan untuk kepentingan pribadi pemegang saham, sekutu, atau anggota tidak boleh dikurangkan dari penghasilan bruto perusahaan.',
    legalBasis: 'Pasal 9 ayat (1) UU PPh stddt UU HPP',
    difficulty: 'Beginner'
  },
  {
    id: 7,
    category: 'Perhitungan',
    scenario: 'Pak Doni adalah pengusaha kuliner Orang Pribadi yang memanfaatkan skema PPh Final UMKM PP No. 55 Tahun 2022. Pada tahun 2026, peredaran brutonya: Jan-Apr Rp 400.000.000, Mei Rp 200.000.000.',
    question: 'Berapakah PPh Final yang harus disetor Pak Doni untuk masa Mei 2026?',
    options: [
      'Rp 1.000.000 (0,5% x Rp 200.000.000)',
      'Rp 500.000 (0,5% x Rp 100.000.000)',
      'Nihil (karena omzet Mei masih di bawah 4,8 Miliar)',
      'Rp 3.000.000 (0,5% x akumulasi Rp 600.000.000)'
    ],
    correctIndex: 1,
    explanation: 'Berdasarkan UU HPP & PP 55/2022, WPOP berhak atas omzet s.d. Rp 500 juta tidak kena pajak. Akumulasi Jan-Apr = 400 juta (sisa kuota bebas pajak = 100 juta). Dari omzet Mei sebesar 200 juta, 100 juta masih bebas pajak, dan 100 juta sisanya dikenakan PPh Final 0,5% = Rp 500.000.',
    legalBasis: 'Pasal 7 ayat (2a) UU HPP jo. PP No. 55 Tahun 2022',
    difficulty: 'Intermediate'
  },
  {
    id: 8,
    category: 'Analisis Regulasi',
    question: 'Kapan batas daluwarsa penetapan pajak (penerbitan SKPKB) oleh Direktur Jenderal Pajak menurut Pasal 13 ayat (1) UU KUP?',
    options: [
      '3 (tiga) tahun setelah saat terutangnya pajak.',
      '5 (lima) tahun setelah saat terutangnya pajak atau berakhirnya Masa Pajak, Bagian Tahun Pajak, atau Tahun Pajak.',
      '10 (sepuluh) tahun sejak Wajib Pajak menyampaikan SPT Tahunan.',
      'Tidak ada daluwarsa apabila Wajib Pajak dalam kondisi rugi fiskal.'
    ],
    correctIndex: 1,
    explanation: 'Daluwarsa penetapan pajak diatur dalam Pasal 13 ayat (1) UU KUP, yaitu dalam jangka waktu 5 (lima) tahun setelah saat terutangnya pajak atau berakhirnya Masa/Tahun Pajak.',
    legalBasis: 'Pasal 13 ayat (1) UU KUP',
    difficulty: 'Beginner'
  },
  {
    id: 9,
    category: 'Case Study',
    scenario: 'PT Delta menerima Surat Ketetapan Pajak Kurang Bayar (SKPKB) PPN sebesar Rp 500.000.000 yang diterbitkan tanggal 10 Maret 2026. Direktur PT Delta tidak menyetujui hasil pemeriksaan tersebut dan ingin mengajukan Keberatan.',
    question: 'Berapakah jangka waktu maksimal pengajuan Surat Keberatan oleh PT Delta ke KPP sesuai Pasal 25 UU KUP?',
    options: [
      '1 (satu) bulan sejak tanggal diterimanya SKPKB.',
      '3 (tiga) bulan sejak tanggal dikirimnya surat ketetapan pajak.',
      '6 (enam) bulan setelah Wajib Pajak membayar lunas jumlah yang disetujui dalam pembahasan akhir.',
      '30 (tiga puluh) hari sebelum surat paksa diterbitkan.'
    ],
    correctIndex: 1,
    explanation: 'Pasal 25 ayat (3) UU KUP menetapkan keberatan harus diajukan dalam jangka waktu 3 (tiga) bulan sejak tanggal dikirimnya surat ketetapan pajak atau sejak tanggal pemotongan/pemungutan pajak.',
    legalBasis: 'Pasal 25 ayat (3) UU KUP stddt UU HPP',
    difficulty: 'Intermediate'
  },
  {
    id: 10,
    category: 'Perhitungan',
    scenario: 'PT Cipta Kreasi (PKP) pada masa Juni 2026 melakukan penyerahan BKP dengan DPP Rp 1.000.000.000 (tarif PPN 11%). Pada masa yang sama, PT Cipta Kreasi memiliki Faktur Pajak Masukan yang sah dan berkaitan dengan kegiatan usaha sebesar Rp 85.000.000.',
    question: 'Bagaimana status SPT Masa PPN PT Cipta Kreasi untuk masa Juni 2026?',
    options: [
      'Kurang Bayar sebesar Rp 25.000.000.',
      'Lebih Bayar sebesar Rp 85.000.000.',
      'Kurang Bayar sebesar Rp 110.000.000.',
      'Nihil.'
    ],
    correctIndex: 0,
    explanation: 'Pajak Keluaran (PK) = 11% x Rp 1.000.000.000 = Rp 110.000.000. Pajak Masukan (PM) = Rp 85.000.000. PPN Terutang = PK - PM = Rp 110.000.000 - Rp 85.000.000 = Kurang Bayar Rp 25.000.000.',
    legalBasis: 'Pasal 9 ayat (2) UU PPN No. 8/1983 stddt UU HPP',
    difficulty: 'Beginner'
  },
  {
    id: 11,
    category: 'Analisis Regulasi',
    question: 'Faktur Pajak Masukan yang diterbitkan oleh rekanan PKP tidak mencantumkan nama dan NPWP pembeli secara lengkap. Berdasarkan Pasal 13 ayat (5) jo. Pasal 9 ayat (8) UU PPN, bagaimanakah perlakuan hukumnya bagi pembeli?',
    options: [
      'Faktur Pajak tetap dapat dikreditkan selama ada bukti pembayaran bank transfer.',
      'Merupakan Faktur Pajak cacat formal sehingga Pajak Masukannya tidak dapat dikreditkan.',
      'Dapat dikreditkan dengan syarat membayar denda administrasi 1% dari DPP.',
      'Dapat dikreditkan otomatis apabila SPT Masa rekanan telah dilaporkan.'
    ],
    correctIndex: 1,
    explanation: 'Faktur Pajak yang tidak memuat keterangan lengkap sesuai Pasal 13 ayat (5) UU PPN dikategorikan sebagai Faktur Pajak yang tidak memenuhi persyaratan formal/cacat, sehingga Pajak Masukannya tidak dapat dikreditkan oleh pembeli.',
    legalBasis: 'Pasal 9 ayat (8) huruf f & Pasal 13 ayat (5) UU PPN',
    difficulty: 'Intermediate'
  },
  {
    id: 12,
    category: 'Konsep',
    question: 'Dalam hukum perpajakan internasional dan PPh Pasal 26, apakah yang menjadi indikator utama untuk menentukan status Wajib Pajak Luar Negeri (WPLN) Orang Pribadi?',
    options: [
      'Kewarganegaraan paspor yang dipegang.',
      'Tidak bertempat tinggal di Indonesia atau berada di Indonesia tidak lebih dari 183 hari dalam jangka waktu 12 bulan.',
      'Hanya memiliki rekening bank di luar negeri.',
      'Memperoleh penghasilan dalam mata uang asing (valuta asing).'
    ],
    correctIndex: 1,
    explanation: 'Sesuai Pasal 2 ayat (4) UU PPh stddt UU HPP, Subjek Pajak Luar Negeri Orang Pribadi adalah orang yang tidak bertempat tinggal di Indonesia atau berada di Indonesia tidak lebih dari 183 hari dalam jangka waktu 12 bulan.',
    legalBasis: 'Pasal 2 ayat (4) UU PPh stddt UU HPP',
    difficulty: 'Beginner'
  },
  {
    id: 13,
    category: 'Analisis Regulasi',
    scenario: 'PT Prima membayar jasa konsultasi manajemen kepada CV Konsultama sebesar Rp 50.000.000 (tidak termasuk PPN). CV Konsultama adalah Wajib Pajak Badan yang memiliki NPWP valid.',
    question: 'Kewajiban pemotongan PPh apakah yang timbul atas transaksi tersebut?',
    options: [
      'Memotong PPh Pasal 23 sebesar 2% (Rp 1.000.000).',
      'Memotong PPh Pasal 21 sebesar 5% (Rp 2.500.000).',
      'Memotong PPh Final Pasal 4 ayat (2) sebesar 10% (Rp 5.000.000).',
      'Tidak ada pemotongan karena CV Konsultama adalah badan usaha terpisah.'
    ],
    correctIndex: 0,
    explanation: 'Imbalan sehubungan dengan jasa teknik, jasa manajemen, jasa konstruksi, jasa konsultan, dan jasa lain selain jasa yang telah dipotong PPh 21, yang dibayarkan kepada Wajib Pajak Badan dalam negeri dikenai pemotongan PPh Pasal 23 sebesar 2%.',
    legalBasis: 'Pasal 23 ayat (1) huruf c UU PPh',
    difficulty: 'Intermediate'
  },
  {
    id: 14,
    category: 'Sengketa',
    question: 'Apabila permohonan Keberatan Wajib Pajak ditolak seluruhnya oleh DJP dalam Surat Keputusan Keberatan, apakah upaya hukum lanjutan yang dapat ditempuh Wajib Pajak dan ke institusi peradilan mana?',
    options: [
      'Gugatan ke Pengadilan Negeri setempat.',
      'Permohonan Banding hanya ke Pengadilan Pajak.',
      'Kasasi langsung ke Mahkamah Konstitusi.',
      'Peninjauan Kembali langsung ke Menteri Keuangan.'
    ],
    correctIndex: 1,
    explanation: 'Berdasarkan Pasal 27 ayat (1) UU KUP jo. UU No. 14 Tahun 2002 tentang Pengadilan Pajak, upaya hukum terhadap Surat Keputusan Keberatan adalah permohonan Banding yang diajukan ke Pengadilan Pajak.',
    legalBasis: 'Pasal 27 UU KUP & UU No. 14/2002',
    difficulty: 'Intermediate'
  },
  {
    id: 15,
    category: 'Perhitungan',
    scenario: 'PT Mega Sentosa memiliki peredaran bruto komersial setahun sebesar Rp 4.000.000.000 dengan Penghasilan Kena Pajak (PKP) setelah rekonsiliasi fiskal sebesar Rp 500.000.000.',
    question: 'Berdasarkan Pasal 31E UU PPh, berapakah PPh Badan terutang PT Mega Sentosa untuk tahun pajak bersangkutan (tarif umum 22%)?',
    options: [
      'Rp 110.000.000 (22% x Rp 500.000.000)',
      'Rp 55.000.000 (50% x 22% x Rp 500.000.000 = 11% x Rp 500.000.000)',
      'Rp 2.500.000 (0,5% x Rp 500.000.000)',
      'Rp 25.000.000 (5% x Rp 500.000.000)'
    ],
    correctIndex: 1,
    explanation: 'Karena peredaran bruto PT Mega Sentosa tidak melebihi Rp 4,8 Miliar, seluruh PKP berhak mendapat fasilitas pengurangan tarif sebesar 50% sesuai Pasal 31E ayat (1) UU PPh. Tarif efektif = 50% x 22% = 11%. PPh terutang = 11% x Rp 500.000.000 = Rp 55.000.000.',
    legalBasis: 'Pasal 31E UU PPh stddt UU HPP',
    difficulty: 'Advanced'
  },
  {
    id: 16,
    category: 'Case Study',
    scenario: 'Tuan Arya bekerja sebagai konsultan IT lepas (bukan pegawai dan tidak berkesinambungan). Pada bulan Juli 2026, ia menerima fee proyek dari PT Sinergi sebesar Rp 40.000.000. Tuan Arya memiliki NPWP.',
    question: 'Bagaimanakah penghitungan PPh Pasal 21 yang dipotong oleh PT Sinergi sesuai PMK-168/2023?',
    options: [
      'DPP = 50% x Rp 40.000.000 = Rp 20.000.000. PPh 21 = 5% x Rp 20.000.000 = Rp 1.000.000.',
      'DPP = Rp 40.000.000. PPh 21 = 5% x Rp 40.000.000 = Rp 2.000.000.',
      'Dipotong PPh 23 sebesar 2% = Rp 800.000 karena merupakan jasa konsultan.',
      'Bebas pajak karena penghasilannya di bawah batasan PTKP Rp 54.000.000.'
    ],
    correctIndex: 0,
    explanation: 'Bukan Pegawai yang menerima imbalan tidak berkesinambungan dikenai PPh 21 dengan DPP 50% dari jumlah bruto (Pasal 11 PMK-168/2023). DPP = 50% x 40 jt = 20 jt. Tarif Pasal 17 lapisan I (5%) diterapkan atas DPP: 5% x 20 jt = Rp 1.000.000.',
    legalBasis: 'Pasal 11 ayat (1) PMK No. 168 Tahun 2023',
    difficulty: 'Advanced'
  },
  {
    id: 17,
    category: 'Konsep',
    question: 'Apakah yang dimaksud dengan doktrin "Substance Over Form" dalam ranah hukum perpajakan dan pemeriksaan pajak?',
    options: [
      'Fiskus hanya boleh memeriksa dokumen kertas formal yang telah bermeterai.',
      'Hakikat ekonomis dan material dari suatu transaksi diutamakan di atas bentuk hukum atau nama formal yang dibuat para pihak.',
      'Wajib Pajak selalu dilindungi oleh nama kontrak perdata meskipun terjadi penghindaran pajak.',
      'Pajak hanya terutang apabila ada formulir SPT resmi yang ditandatangani.'
    ],
    correctIndex: 1,
    explanation: 'Prinsip Substance Over Form menegaskan bahwa otoritas pajak berwenang menilai substansi ekonomi yang sesungguhnya terjadi di balik skema transaksi formal untuk mencegah pengelabuan pajak (tax avoidance/evasion).',
    legalBasis: 'Doktrin Hukum Pajak & UU HPP Pasal 18',
    difficulty: 'Advanced'
  },
  {
    id: 18,
    category: 'Analisis Regulasi',
    scenario: 'Perusahaan memberikan fasilitas rumah dinas mewah dan mobil operasional direksi yang juga digunakan untuk liburan keluarga pribadi direktur.',
    question: 'Berdasarkan PP No. 55 Tahun 2022 dan PMK No. 66 Tahun 2023 tentang Natura, bagaimanakah status fiskal atas kenikmatan tersebut bagi direktur dan bagi perusahaan?',
    options: [
      'Bagi direktur bukan objek pajak, bagi perusahaan tidak dapat dibebankan sama sekali.',
      'Bagi direktur merupakan objek PPh Pasal 21 (sebesar nilai pasar kenikmatan), dan bagi perusahaan dapat dibebankan sebagai pengurang penghasilan bruto (deductible) sepanjang memenuhi 3M.',
      'Dikenakan PPN Barang Mewah atas fasilitas tersebut.',
      'Tetap berlaku aturan lama (bukan objek pajak dan non-deductible).'
    ],
    correctIndex: 1,
    explanation: 'Sejak UU HPP dan PP 55/2022 jo. PMK-66/2023, natura/kenikmatan diubah paradigmanya: menjadi objek pajak bagi penerima dan menjadi biaya pengurang penghasilan bruto (deductible) bagi pemberi kerja sepanjang berhubungan dengan 3M.',
    legalBasis: 'Pasal 4 ayat (1) huruf a UU PPh jo. PP 55/2022 & PMK-66/2023',
    difficulty: 'Advanced'
  },
  {
    id: 19,
    category: 'Sengketa',
    question: 'Dalam hal Wajib Pajak mengajukan Keberatan atas SKPKB dan Keberatan tersebut DITOLAK atau DITERIMA SEBAGIAN oleh Direktur Jenderal Pajak, sanksi administrasi apakah yang dikenakan menurut Pasal 25 ayat (9) UU KUP stddt UU HPP?',
    options: [
      'Sanksi pidana penjara 1 tahun.',
      'Sanksi denda sebesar 30% dari jumlah pajak berdasarkan keputusan keberatan dikurangi dengan pajak yang telah dibayar sebelum mengajukan keberatan.',
      'Sanksi kenaikan 100% dari jumlah pajak semula.',
      'Tidak ada sanksi denda tambahan jika Wajib Pajak beritikad baik.'
    ],
    correctIndex: 1,
    explanation: 'UU HPP merevisi sanksi keberatan pada Pasal 25 ayat (9) UU KUP: denda diturunkan dari semula 50% menjadi 30% dari jumlah pajak berdasarkan keputusan keberatan dikurangi pajak yang telah dibayar sebelum keberatan.',
    legalBasis: 'Pasal 25 ayat (9) UU KUP stddt UU HPP',
    difficulty: 'Advanced'
  },
  {
    id: 20,
    category: 'Analisis Regulasi',
    scenario: 'Sebuah hotel di Kota Surabaya membebankan pajak atas sewa kamar hotel kepada tamu sebesar 10%.',
    question: 'Pajak apakah yang dipungut atas layanan hotel tersebut menurut UU No. 1 Tahun 2022 (HKPD)?',
    options: [
      'PPN Pusat sebesar 11% yang disetor ke kas negara.',
      'Pajak Barang dan Jasa Tertentu (PBJT) atas Jasa Perhotelan yang merupakan Pajak Daerah Kabupaten/Kota.',
      'Pajak Pertambahan Nilai Daerah (PPND) gabungan provinsi.',
      'PPh Pasal 4 ayat (2) Final atas sewa kamar.'
    ],
    correctIndex: 1,
    explanation: 'Berdasarkan UU No. 1 Tahun 2022 tentang HKPD, jasa perhotelan bukan merupakan objek PPN pusat (non-BKP/non-JKP Pasal 4A UU PPN), melainkan objek Pajak Daerah Kabupaten/Kota dengan nomenklatur Pajak Barang dan Jasa Tertentu (PBJT).',
    legalBasis: 'Pasal 4 ayat (2) & Pasal 53 UU No. 1 Tahun 2022 (HKPD)',
    difficulty: 'Intermediate'
  }
];

export interface LevelCurriculum {
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

export const LEVEL_CURRICULUM: LevelCurriculum[] = [
  {
    levelNumber: 1,
    id: 'level-1-tax-map',
    name: 'TAX MAP',
    tagline: 'Memahami Peta Besar Perpajakan Indonesia',
    goal: 'Membangun pemahaman spasial-sistemik atas 11 komponen utama siklus perpajakan Indonesia: Subjek Pajak, Objek Pajak, DPP, Tarif, Penghitungan, Pembayaran, Pelaporan, Pemeriksaan, Keberatan, Banding, hingga Peninjauan Kembali.',
    xpReward: 300,
    prerequisiteLevel: 0,
    summary: 'Mahasiswa dilatih memposisikan setiap konsep dan peristiwa hukum ke dalam urutan logis hukum pajak materiil dan formil.',
    coreConcepts: [
      'Subjek Pajak vs Wajib Pajak',
      'Objek Pajak (Pasal 4 UU PPh & Pasal 4 UU PPN)',
      'Dasar Pengenaan Pajak (DPP)',
      'Tarif Pajak (Progresif, Proporsional, Regresif, Tetap)',
      'Penghitungan Pajak Terutang',
      'Pembayaran & Penyetoran (Surat Setoran Pajak / Billing)',
      'Pelaporan (SPT Masa & Tahunan)',
      'Pemeriksaan Pajak (SP2, SPHP, Closing Conference)',
      'Produk Ketetapan (SKPKB, SKPKBT, SKPN, SKPLB, STP)',
      'Upaya Hukum Keberatan (DJP)',
      'Sengketa Banding & Gugatan (Pengadilan Pajak & MA)'
    ],
    challengeTypes: ['Tax Cycle Positioning', 'Subjek vs Objek Matching', 'Formil vs Materiil Classification']
  },
  {
    levelNumber: 2,
    id: 'level-2-rule',
    name: 'RULE',
    tagline: 'Membaca Regulasi dengan Ketelitian Yuridis',
    goal: 'Membongkar struktur setiap pasal perpajakan ke dalam 7 dimensi kritis: SIAPA? APA? KAPAN? BERAPA? BAGAIMANA? PENGECUALIAN? KONSEKUENSI?',
    xpReward: 400,
    prerequisiteLevel: 1,
    summary: 'Melatih kemampuan bedah pasal sehingga mahasiswa tidak hanya membaca teks perundang-undangan secara literal, melainkan membedah unsur-unsur tatbestand (syarat faktual) dan rechtsgevolg (akibat hukum).',
    coreConcepts: [
      'Unsur SIAPA: Subjek Hukum Pemotong, Pemungut, atau Terpotong',
      'Unsur APA: Peristiwa, Keadaan, atau Perbuatan Hukum Objek Pajak',
      'Unsur KAPAN: Saat Terutang, Batas Waktu Setor, Batas Waktu Lapor',
      'Unsur BERAPA: DPP, Batasan Nilai, Tarif, dan Formula Matematis',
      'Unsur BAGAIMANA: Prosedur Administrasi, Faktur, e-Bupot, Pembukuan',
      'Unsur PENGECUALIAN: Non-Objek, Fasilitas DTP, Tax Treaty P3B',
      'Unsur KONSEKUENSI: Sanksi Bunga, Sanksi Denda, Batas Daluwarsa'
    ],
    challengeTypes: ['7-Dimension Rule Dissection', 'Fill in the Blank Regulatory Limits', 'True/False Exception Pitfalls', 'Matching Penalty Clauses']
  },
  {
    levelNumber: 3,
    id: 'level-3-why',
    name: 'WHY',
    tagline: 'Memahami Logika Kebijakan & Asas Hukum Pajak',
    goal: 'Menguji penalaran hukum di balik aturan: Mengapa aturan ini dibuat? Apa distorsi jika aturan ini dihilangkan? Siapa yang diuntungkan dan apa risiko bagi penerimaan negara?',
    xpReward: 500,
    prerequisiteLevel: 2,
    summary: 'Menolak hafalan buta. Mahasiswa harus mampu menerangkan filosofi asas perpajakan (Ability to Pay, Horisontal & Vertikal Equity, Neutrality, Certainty, Convenience of Payment, Economy of Collection).',
    coreConcepts: [
      'Asas Keadilan Horisontal & Vertikal',
      'Asas Netralitas Pajak (Pencegahan Distorsi Pasar)',
      'Withholding Tax System: Mengapa Pajak Dipotong di Sumber?',
      'Logika Natura: Mengapa Kenikmatan Menjadi Objek PPh di UU HPP?',
      'Fasilitas Batasan 500 Juta UMKM: Perlindungan terhadap Usaha Mikro',
      'Deduction vs Non-Deduction (Konsep 3M)',
      'Substance Over Form vs Legal Certainty'
    ],
    challengeTypes: ['Socratic Policy Defense', 'Counter-Factual Reasoning', 'Policy Trade-off Evaluation']
  },
  {
    levelNumber: 4,
    id: 'level-4-case',
    name: 'CASE (IRAC LAB)',
    tagline: 'Penerapan Metode IRAC dalam Kasus Nyata',
    goal: 'Menganalisis kasus perpajakan terstruktur dengan metodologi hukum IRAC: Facts -> Issue -> Rule -> Application -> Conclusion.',
    xpReward: 600,
    prerequisiteLevel: 3,
    summary: 'Jantung pembelajaran Tax Mastery Lab. Mahasiswa dibimbing oleh Socratic Hint Engine bertingkat 5 tahap agar dapat menemukan solusi kasus sendiri tanpa disuapi jawaban.',
    coreConcepts: [
      'Penyaringan Fakta Hukum (Legal Facts Filtering)',
      'Perumusan Isu Pokok & Isu Aksesoris (Issue Spotting)',
      'Pencarian Dasar Hukum Positif (Finding Governing Rules)',
      'Penerapan Aturan ke Fakta (Subsumption & Application)',
      'Penghitungan dan Kesimpulan Solutif (Actionable Advice)'
    ],
    challengeTypes: ['IRAC Interactive Canvas', 'Multi-step Socratic Guidance', 'Rubric-based AI Peer Review']
  },
  {
    levelNumber: 5,
    id: 'level-5-tax-analyst',
    name: 'TAX ANALYST',
    tagline: 'Memilah Distraksi & Analisis Kasus Multi-Variabel',
    goal: 'Menganalisis kasus kompleks dengan data berlimpah di mana terdapat fakta yang sengaja tidak relevan, data yang kurang, dan multi-aspek perpajakan yang bersinggungan.',
    xpReward: 750,
    prerequisiteLevel: 4,
    summary: 'Mahasiswa bertindak seperti Tax Senior Analyst di Kantor Akuntan Publik atau Konsultan Pajak ternama: menyortir noise data, menghitung tax exposure, dan merekomendasikan restrukturisasi kepatuhan.',
    coreConcepts: [
      'Identifikasi Fakta Relevan vs Noise/Distraksi Bisnis',
      'Identifikasi Informasi yang Kurang (Missing Information Checklist)',
      'Analisis Risiko Fiskal & Tax Exposure Calculation',
      'Rekonsiliasi Beda Waktu & Beda Tetap (Fiscal Reconciliation)',
      'Tax Planning Legal vs Penghindaran Pajak Agresif'
    ],
    challengeTypes: ['Data Sorting & Noise Filtering', 'Missing Info Detective', 'Risk Exposure Matrix']
  },
  {
    levelNumber: 6,
    id: 'level-6-tax-dispute',
    name: 'TAX DISPUTE',
    tagline: 'Simulasi Sengketa Pajak & Berpikir Dialektis',
    goal: 'Mensimulasikan proses sengketa di ruang pemeriksaan, proses Keberatan di Kanwil DJP, dan persidangan di Pengadilan Pajak.',
    xpReward: 900,
    prerequisiteLevel: 5,
    summary: 'Mahasiswa dapat memilih peran: Wajib Pajak, Konsultan Pajak, Pemeriksa Pajak (Fiskus), atau Penelaah Keberatan. AI bertindak sebagai pihak lawan dengan bantahan argumentatif dan evaluator netral.',
    coreConcepts: [
      'Surat Pemberitahuan Hasil Pemeriksaan (SPHP) & Risalah Pembahasan',
      'Penyusunan Surat Keberatan (Pasal 25 KUP) & Bukti Tertulis',
      'Beban Pembuktian (Burden of Proof) dalam Hukum Pajak',
      'Surat Uraian Banding (SUB) & Surat Bantahan',
      'Pertimbangan Putusan Hakim Pengadilan Pajak'
    ],
    challengeTypes: ['Turn-based Courtroom Dialogue', 'Rebuttal Crafting', 'Evidence Admissibility Test']
  },
  {
    levelNumber: 7,
    id: 'level-7-tax-master',
    name: 'TAX MASTER',
    tagline: 'Simulasi Ujian Komprehensif Tanpa Petunjuk',
    goal: 'Ujian komprehensif tingkat akhir yang menggabungkan seluruh aspek (PPh Badan, PPh Pemotongan, PPN, KUP, Akuntansi, Pemeriksaan, dan Sengketa) dalam satu skenario terpadu tanpa kisi-kisi atau petunjuk awal.',
    xpReward: 1200,
    prerequisiteLevel: 6,
    summary: 'Evaluasi puncak untuk mencetak lulusan D3 Perpajakan dengan pola pikir hukum & bisnis tingkat tinggi. AI memberikan audit menyeluruh atas legal reasoning, presisi pasal, dan perhitungan.',
    coreConcepts: [
      'End-to-End Corporate Tax Audit Simulation',
      'Cross-tax Interaction (PPh 21, PPh 23, PPN, PPh Badan)',
      'Sanksi Administrasi KUP Berbunga Pasca UU HPP',
      'Strategic Tax Defense Memorandum'
    ],
    challengeTypes: ['Comprehensive Capstone Dossier', 'Blind Fact Pattern', 'Mastery Rubric AI Assessment']
  }
];

export interface TaxCaseStudy {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  topic: string;
  taxType: string;
  parties: string;
  chronology: string;
  transactions: Array<{ desc: string; amount: number; date: string; doc: string }>;
  specialConditions: string;
  relevantFacts: string[];
  irrelevantFacts: string[];
  potentialRisks: string[];
  analysisQuestions: string[];
  rubric: {
    issueWeight: number;
    ruleWeight: number;
    applicationWeight: number;
    calculationWeight: number;
    conclusionWeight: number;
  };
  legalBasis: Array<{ regulation: string; article: string; status: string; source: string }>;
  keySolution: string;
  commonPitfalls: string[];
  followUpCase: string;
}

export const PREBUILT_CASES: TaxCaseStudy[] = [
  {
    id: 'case-pph21-ter-01',
    title: 'Kasus Pemotongan PPh 21 Karyawan Tetap & Resign Tengah Tahun (PT Mahardika)',
    difficulty: 'Intermediate',
    topic: 'PPh Pasal 21 Pegawai Tetap & Skema TER',
    taxType: 'PPh 21',
    parties: 'PT Mahardika Solusindo (Pemberi Kerja / PKP) dan Tuan Bagas (Pegawai Tetap, NPWP Terdaftar, Status TK/1).',
    chronology: 'Tuan Bagas bekerja sebagai Senior UI/UX Designer di PT Mahardika sejak Januari 2024. Gaji pokok dan tunjangan tetap per bulan sebesar Rp 14.000.000. Setiap bulan perusahaan memotong iuran pensiun yang disetor ke Dana Pensiun berizin OJK sebesar Rp 200.000. Pada bulan Agustus 2026, Tuan Bagas mengajukan pengunduran diri (resign) efektif per 31 Agustus 2026.',
    transactions: [
      { desc: 'Pembayaran Gaji dan Tunjangan Tetap Jan s.d. Jul 2026', amount: 14000000, date: 'Setiap tanggal 25', doc: 'Slip Gaji & Bukti Transfer Bank' },
      { desc: 'Pembayaran Gaji Terakhir Bulan Agustus 2026', amount: 14000000, date: '25 Agustus 2026', doc: 'Surat Keputusan Pemberhentian Kerja & Slip Gaji' }
    ],
    specialConditions: 'Pegawai berstatus PTKP TK/1 (Kategori TER A). Berhenti bekerja pada bulan Agustus (masa pajak terakhir bagi yang bersangkutan).',
    relevantFacts: [
      'Gaji dan tunjangan kotor per bulan Rp 14.000.000',
      'Status PTKP TK/1 (TER Kategori A)',
      'Iuran pensiun dibayar pegawai Rp 200.000/bulan',
      'Masa kerja tahun 2026 hanya berlangsung 8 bulan (Januari - Agustus)',
      'Bulan Agustus 2026 merupakan Masa Pajak Terakhir bagi Tuan Bagas'
    ],
    irrelevantFacts: [
      'Tuan Bagas berencana melanjutkan kuliah S2 di Australia bulan Oktober 2026',
      'PT Mahardika bergerak di bidang konsultasi perangkat lunak sejak tahun 2018'
    ],
    potentialRisks: [
      'Kesalahan menggunakan TER pada bulan Agustus (seharusnya menggunakan Pasal 17 setahunkan/masa kerja)',
      'Potensi lebih potong pajak yang wajib dikembalikan oleh perusahaan ke pegawai'
    ],
    analysisQuestions: [
      'Berapakah PPh 21 yang dipotong setiap bulan untuk masa Januari s.d Juli 2026 menggunakan skema TER PMK-168/2023?',
      'Bagaimanakah mekanisme penghitungan PPh 21 pada bulan Agustus 2026 sebagai masa pajak terakhir bagi Tuan Bagas?',
      'Apakah terjadi kurang potong atau lebih potong pada bulan Agustus 2026? Apa kewajiban PT Mahardika atas selisih tersebut?'
    ],
    rubric: {
      issueWeight: 20,
      ruleWeight: 25,
      applicationWeight: 30,
      calculationWeight: 15,
      conclusionWeight: 10
    },
    legalBasis: [
      { regulation: 'PMK No. 168 Tahun 2023', article: 'Pasal 5, Pasal 16, & Lampiran Huruf A', status: 'BERLAKU', source: 'JDIH Kemenkeu' },
      { regulation: 'UU PPh stddt UU HPP No. 7 Tahun 2021', article: 'Pasal 17 ayat (1) huruf a & Pasal 21', status: 'BERLAKU', source: 'JDIH Kemenkeu' }
    ],
    keySolution: 'Jan-Jul (7 bulan): Bruto Rp 14.000.000 masuk TER A baris 14 (13.75jt - 15.10jt) tarif 5%. PPh 21/bulan = Rp 700.000 x 7 = Rp 4.900.000. Pada bulan Agustus (Masa Terakhir): Bruto 8 bulan = 8 x 14jt = 112jt. Biaya jabatan 5% x 112jt = 5.6jt (maksimal 500rb x 8 = 4jt). Iuran pensiun = 8 x 200rb = 1.6jt. Netto 8 bulan = 112jt - 4jt - 1.6jt = 106.4jt. PTKP TK/1 = 58.5jt. PKP = 106.4jt - 58.5jt = 47.9jt. PPh terutang Pasal 17 = 5% x 47.9jt = Rp 2.395.000. Telah dipotong Jan-Jul = Rp 4.900.000. Terjadi LEBIH POTONG sebesar Rp 2.505.000 pada Agustus. Perusahaan wajib mengembalikan uang kelebihan potong ini kepada Tuan Bagas pada slip gaji Agustus!',
    commonPitfalls: [
      'Mahasiswa menghitung bulan Agustus tetap dengan TER bulanan 5%',
      'Mahasiswa lupa bahwa pada pegawai resign di tengah tahun, biaya jabatan maksimal dibatasi Rp 500.000 dikalikan jumlah bulan bekerja (8 x 500.000 = 4.000.000, bukan 6.000.000 setahun penuh)',
      'Tidak menyadari timbulnya kelebihan potong'
    ],
    followUpCase: 'Bagaimana penghitungan jika Tuan Bagas pindah kerja ke perusahaan lain pada bulan Oktober 2026 dengan membawa Bukti Potong 1721-A1 dari PT Mahardika?'
  },
  {
    id: 'case-ppn-faktur-cacat-02',
    title: 'Sengketa Pengkreditan Pajak Masukan & Pemeriksaan Faktur Pajak (PT Garuda Mandiri)',
    difficulty: 'Advanced',
    topic: 'PPN, Faktur Pajak Formal vs Material, Pemeriksaan KUP',
    taxType: 'PPN & KUP',
    parties: 'PT Garuda Mandiri (Wajib Pajak / PKP Manufaktur) dan KPP Pratama Jakarta Kebayoran Baru (Pemeriksa Pajak).',
    chronology: 'Pada tahun 2025, PT Garuda Mandiri diperiksa oleh tim pemeriksa KPP Pratama atas SPT Masa PPN periode Januari - Desember 2024. Tim pemeriksa mengoreksi Pajak Masukan sebesar Rp 450.000.000 yang berasal dari 12 lembar Faktur Pajak yang diterbitkan oleh supplier bahan baku PT Logam Jaya. Alasan koreksi fiskus: Faktur Pajak tersebut mencantumkan alamat cabang pembeli yang belum terdaftar sebagai tempat pemusatan PPN, serta tanggal Faktur Pajak mendahului tanggal Surat Jalan pengiriman barang.',
    transactions: [
      { desc: 'Pembelian Plat Baja dari PT Logam Jaya (12 Transaksi)', amount: 4090909090, date: 'Januari - Desember 2024', doc: 'Faktur Pajak Elektronik, Invoice, Rekening Koran Bank, Dokumen Timbangan Truk' }
    ],
    specialConditions: 'Barang fisik telah terbukti benar-benar diterima di pabrik, digunakan dalam proses produksi, dan pembayaran lunas via rekening giro bank perusahaan (uji arus barang dan arus uang terbukti 100%).',
    relevantFacts: [
      'Barang plat baja nyata-nyata diterima dan masuk kartu stok gudang (arus barang valid)',
      'Pembayaran dilakukan via transfer bank resmi (arus uang valid)',
      'Faktur Pajak terbit melalui sistem e-Faktur DJP dan status "Approval Sukses"',
      'Terdapat perbedaan alamat administratif (cabang pabrik vs kantor pusat)',
      'Pemeriksa menerbitkan SPHP dengan koreksi positif Pajak Masukan Rp 450.000.000 ditambah sanksi bunga Pasal 13 ayat (2) KUP'
    ],
    irrelevantFacts: [
      'PT Logam Jaya memenangkan tender penyedia baja konstruksi di IKN',
      'Direktur PT Garuda Mandiri sedang mencalonkan diri sebagai pengurus asosiasi pengusaha'
    ],
    potentialRisks: [
      'Penerbitan SKPKB PPN senilai Rp 450.000.000 ditambah sanksi administrasi bunga KUP',
      'Koreksi PPh Badan karena biaya pembelian bahan baku berpotensi diragukan keabsahannya'
    ],
    analysisQuestions: [
      'Apakah koreksi fiskus atas dasar cacat formal alamat cabang dapat dibenarkan jika arus uang dan arus barang terbukti valid secara material?',
      'Bagaimana penerapan doktrin "Substance Over Form" dan Putusan Mahkamah Agung terkait pengkreditan Faktur Pajak cacat formal?',
      'Susunlah draft argumentasi hukum pembelaan dalam Risalah Pembahasan Akhir Hasil Pemeriksaan (Closing Conference)!'
    ],
    rubric: {
      issueWeight: 20,
      ruleWeight: 25,
      applicationWeight: 30,
      calculationWeight: 15,
      conclusionWeight: 10
    },
    legalBasis: [
      { regulation: 'UU PPN stddt UU HPP No. 7 Tahun 2021', article: 'Pasal 9 ayat (2b), Pasal 9 ayat (8), & Pasal 13 ayat (5)', status: 'BERLAKU', source: 'JDIH Kemenkeu' },
      { regulation: 'PER-03/PJ/2022 stddt PER-11/PJ/2022', article: 'Pasal 6, Pasal 33, & Pasal 37', status: 'BERLAKU', source: 'JDIH DJP' },
      { regulation: 'Yurisprudensi Putusan Mahkamah Agung', article: 'Putusan MA No. 138/B/PK/PJK/2018', status: 'YURISPRUDENSI', source: 'Kepaniteraan MA RI' }
    ],
    keySolution: 'Pajak Masukan tidak dapat dikoreksi semata-mata karena kekeliruan pencantuman alamat sepanjang identitas NPWP penjual dan pembeli benar, barcode valid terdaftar di sistem DJP, serta arus uang dan arus barang telah terbukti secara materiil (Pasal 9 ayat 2b UU PPN stddt UU HPP dan PER-03/PJ/2022 jo. PER-11/PJ/2022). Wajib Pajak harus mengajukan bukti pendukung rekonsiliasi arus uang (rekening koran), arus dokumen (kontrak, PO, invoice), dan arus barang (delivery order, laporan persediaan) untuk membatalkan temuan pemeriksa.',
    commonPitfalls: [
      'Menyerah begitu saja pada dalil pemeriksa tanpa memeriksa uji materialitas',
      'Tidak mampu menghubungkan ketentuan PER-03/PJ/2022 dengan relaksasi identitas pembeli',
      'Gagal menyusun pembuktian 3 arus (Arus Uang, Arus Barang, Arus Dokumen)'
    ],
    followUpCase: 'Bagaimana jika PT Logam Jaya ternyata adalah penerbit Faktur Pajak fiktif (TBTS - Tidak Berdasarkan Transaksi Sebenarnya)? Apa sanksi pidana dan perlakuan hukumnya?'
  }
];

export interface SpacedRepetitionItem {
  id: string;
  topicId: string;
  conceptTitle: string;
  taxLawReference: string;
  coreQuestion: string;
  idealAnswer: string;
  status: 'Belum dipelajari' | 'Sedang dipelajari' | 'Perlu diulang' | 'Hampir dikuasai' | 'Dikuasai';
  easeFactor: number;
  intervalDays: number;
  nextReviewDate: string;
  reviewCount: number;
  lastScore: number;
}

export const INITIAL_SPACED_REPETITION_ITEMS: SpacedRepetitionItem[] = [
  {
    id: 'sr-1',
    topicId: 'pph21-ter',
    conceptTitle: 'Kategori TER A, B, C berdasarkan Status PTKP',
    taxLawReference: 'PMK No. 168 Tahun 2023 Lampiran A',
    coreQuestion: 'Sebutkan status PTKP apa saja yang masuk ke dalam Kategori TER A dan Kategori TER B!',
    idealAnswer: 'Kategori A: TK/0, TK/1, K/0. Kategori B: TK/2, TK/3, K/1, K/2. (Kategori C khusus K/3).',
    status: 'Sedang dipelajari',
    easeFactor: 2.5,
    intervalDays: 1,
    nextReviewDate: new Date().toISOString().split('T')[0],
    reviewCount: 1,
    lastScore: 80
  },
  {
    id: 'sr-2',
    topicId: 'umkm-pp55',
    conceptTitle: 'Fasilitas Omzet Bebas Pajak Rp 500 Juta WPOP',
    taxLawReference: 'Pasal 7 ayat (2a) UU HPP jo. PP 55/2022',
    coreQuestion: 'Apakah Wajib Pajak Badan (PT / CV) berhak atas fasilitas omzet Rp 500 juta tidak kena pajak di skema PPh Final UMKM 0,5%?',
    idealAnswer: 'TIDAK. Fasilitas bagian omzet s.d. Rp 500.000.000 tidak dikenai pajak HANYA berlaku bagi Wajib Pajak Orang Pribadi, bukan untuk Badan.',
    status: 'Perlu diulang',
    easeFactor: 2.1,
    intervalDays: 1,
    nextReviewDate: new Date().toISOString().split('T')[0],
    reviewCount: 2,
    lastScore: 50
  },
  {
    id: 'sr-3',
    topicId: 'kup-keberatan',
    conceptTitle: 'Batas Waktu Pengajuan Keberatan Pajak',
    taxLawReference: 'Pasal 25 ayat (3) UU KUP stddt UU HPP',
    coreQuestion: 'Berapa batas waktu pengajuan surat keberatan atas SKP dan sejak kapan jangka waktu tersebut dihitung?',
    idealAnswer: 'Dalam jangka waktu 3 (tiga) bulan sejak tanggal DIKIRIMNYA surat ketetapan pajak (bukan tanggal diterima), kecuali jika Wajib Pajak dapat menunjukkan keadaan di luar kekuasaannya (force majeure).',
    status: 'Hampir dikuasai',
    easeFactor: 2.6,
    intervalDays: 4,
    nextReviewDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    reviewCount: 3,
    lastScore: 90
  },
  {
    id: 'sr-4',
    topicId: 'ppn-kredit-pm',
    conceptTitle: 'Pajak Masukan yang Tidak Dapat Dikreditkan',
    taxLawReference: 'Pasal 9 ayat (8) UU PPN stddt UU HPP',
    coreQuestion: 'Sebutkan minimal 2 kondisi di mana Pajak Masukan tidak dapat dikreditkan oleh PKP!',
    idealAnswer: '1. Perolehan BKP/JKP sebelum pengusaha dikukuhkan sebagai PKP (dengan ketentuan tertentu). 2. Perolehan yang tidak mempunyai hubungan langsung dengan kegiatan usaha (3M). 3. Pemanfaatan Faktur Pajak cacat formal yang tidak memuat keterangan lengkap. 4. Perolehan dan pemeliharaan kendaraan bermotor sedan dan station wagon kecuali barang dagangan atau disewakan.',
    status: 'Sedang dipelajari',
    easeFactor: 2.3,
    intervalDays: 2,
    nextReviewDate: new Date().toISOString().split('T')[0],
    reviewCount: 1,
    lastScore: 75
  },
  {
    id: 'sr-5',
    topicId: 'pph-natura',
    conceptTitle: 'Prinsip Perpajakan Natura Pasca UU HPP & PP 55/2022',
    taxLawReference: 'Pasal 4 ayat (1) huruf a UU PPh jo. PMK-66/2023',
    coreQuestion: 'Bagaimanakah perubahan paradigma perpajakan atas imbalan berupa natura atau kenikmatan dari aturan lama ke aturan baru?',
    idealAnswer: 'Aturan lama: Non-taxable bagi penerima dan non-deductible bagi pemberi kerja. Aturan baru (UU HPP & PP 55/2022): Menjadi OBJEK PAJAK (taxable) bagi penerima dan DAPAT DIBEBANKAN (deductible) bagi pemberi kerja sepanjang berhubungan dengan 3M, dengan pengecualian natura tertentu (makanan/minuman bagi seluruh pegawai, natura di daerah tertentu, keharusan pekerjaan).',
    status: 'Belum dipelajari',
    easeFactor: 2.5,
    intervalDays: 1,
    nextReviewDate: new Date().toISOString().split('T')[0],
    reviewCount: 0,
    lastScore: 0
  }
];

export const TRAINING_METHODS = [
  {
    id: 'method-1-rule-why-case',
    number: 1,
    name: 'Rule → Why → Case',
    badge: 'Fundamental',
    description: 'Rantai penalaran holistik: Bedah teks aturan, telusuri alasan filosofis/ekonomi di baliknya, lalu uji pada skenario kasus nyata.',
    estimatedDuration: '15-20 min',
    targetSkill: 'Deep Conceptual Mastery'
  },
  {
    id: 'method-2-irac',
    number: 2,
    name: 'IRAC Framework',
    badge: 'Legal Reasoning',
    description: 'Metodologi baku fakultas hukum & pengadilan pajak: Issue Spotting, Governing Rule, Factual Application, Actionable Conclusion.',
    estimatedDuration: '20-30 min',
    targetSkill: 'Case Problem Solving'
  },
  {
    id: 'method-3-active-recall',
    number: 3,
    name: 'Active Recall',
    badge: 'Memory Retention',
    description: 'Pertanyaan muncul dengan materi tersembunyi. Anda menjawab langsung dari ingatan, dievaluasi akurasi dan miskonsepsi oleh AI.',
    estimatedDuration: '10-15 min',
    targetSkill: 'Retrieval Strength'
  },
  {
    id: 'method-4-spaced-repetition',
    number: 4,
    name: 'Spaced Repetition',
    badge: 'Long-term Storage',
    description: 'Algoritma review berkala berdasarkan kurva lupa Hermann Ebbinghaus dan SuperMemo SM-2. Mengulang topik pada waktu yang tepat.',
    estimatedDuration: '10-15 min',
    targetSkill: 'Anti-Forgetting Curve'
  },
  {
    id: 'method-5-case-analysis',
    number: 5,
    name: 'Case Analysis & Filtering',
    badge: 'Analytical',
    description: 'Menyaring fakta bisnis berantakan: bedakan fakta hukum relevan dari fakta distractor, rumuskan isu pokok, dan hitung pajaknya.',
    estimatedDuration: '25 min',
    targetSkill: 'Distraction Filtering'
  },
  {
    id: 'method-6-socratic-ai',
    number: 6,
    name: 'Socratic AI Tutor',
    badge: 'Interactive Inquiry',
    description: 'AI tidak menyajikan jawaban langsung. AI menguji asumsi Anda dengan pertanyaan bertingkat yang menuntun Anda menemukan jawaban sendiri.',
    estimatedDuration: '15 min',
    targetSkill: 'Critical Inquiry'
  },
  {
    id: 'method-7-tax-calculation',
    number: 7,
    name: 'Tax Calculation Engine',
    badge: 'Computational',
    description: 'Latihan simulasi perhitungan interaktif: PPh 21 TER vs Pasal 17, PPN PK-PM, PPh 23, PPh Final PP 55, dan Fasilitas Pasal 31E.',
    estimatedDuration: '15 min',
    targetSkill: 'Mathematical Precision'
  },
  {
    id: 'method-8-rapid-review',
    number: 8,
    name: 'Rapid Review Mode',
    badge: 'Timed Sprint',
    description: 'Latihan cepat bertenggat waktu (5, 10, 15, atau 30 menit). Algoritma memprioritaskan materi pada topik yang paling sering salah.',
    estimatedDuration: '5 - 30 min',
    targetSkill: 'Speed & Exam Readiness'
  },
  {
    id: 'method-9-error-review',
    number: 9,
    name: 'Mistake Bank Drill',
    badge: 'Remedial',
    description: 'Latihan khusus yang dirancang otomatis oleh AI dari kumpulan kesalahan dan miskonsepsi yang pernah Anda buat di masa lalu.',
    estimatedDuration: '15 min',
    targetSkill: 'Defect Elimination'
  },
  {
    id: 'method-10-full-simulation',
    number: 10,
    name: 'Full Simulation Exam',
    badge: 'Comprehensive',
    description: 'Simulasi ujian komprehensif tingkat akhir. Menghadapi berkas sengketa multi-pajak tanpa petunjuk dengan penilaian rubrik ketat.',
    estimatedDuration: '45-60 min',
    targetSkill: 'Real-world Competency'
  }
];
