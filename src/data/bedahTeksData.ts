export interface SentenceOption {
  id: number;
  text: string;
  isKalimatUtama: boolean;
  elementRole?: 'kalimatUtama' | 'idePokok' | 'tokoh' | 'amanat' | 'penjelas';
}

export interface StepSmartHint {
  level1: string; // Panduan Lokasi & Kata Kunci
  level2: string; // Eliminasi pilihan salah
  level3: string; // Penjelasan lengkap Prof. Litera & Sorotan Teks
  eliminateIndices: number[]; // Indeks opsi pilihan yang dieliminasi di Level 2
}

export interface SmartHintSet {
  kalimatUtama: StepSmartHint;
  idePokok: StepSmartHint;
  tokoh: StepSmartHint;
  amanat: StepSmartHint;
}

export interface BedahTeksItem {
  id: string;
  title: string;
  category: 'Fabel' | 'Cerita Pendek' | 'Teks Sains & Informasi' | 'Petualangan';
  gradeLevel: 'Kelas 1-2' | 'Kelas 3-4' | 'Kelas 5-6';
  icon: string;
  paragraphText: string; // Full text
  sentences: SentenceOption[]; // Individual sentences for Kalimat Utama selection
  
  // 1. Kalimat Utama
  kalimatUtamaIndex: number; // 0-based sentence index
  kalimatUtamaExplanation: string;
  kalimatUtamaHint: string;

  // 2. Ide Pokok
  idePokokOptions: string[];
  correctIdePokokIndex: number;
  idePokokExplanation: string;
  idePokokHint: string;

  // 3. Tokoh & Karakter
  tokohOptions: string[];
  correctTokohIndex: number;
  tokohDetails: string; // e.g. "Danu (anak yang jujur & bertanggung jawab)"
  tokohExplanation: string;
  tokohHint: string;

  // 4. Amanat
  amanatOptions: string[];
  correctAmanatIndex: number;
  amanatExplanation: string;
  amanatHint: string;

  // Fitur Petunjuk Pintar Bertahap (Level 1, Level 2, Level 3)
  smartHints: SmartHintSet;
}

export const BEDAH_TEKS_DATABASE: BedahTeksItem[] = [
  {
    id: 'bt_semut_belalang',
    title: 'Semut yang Tekun dan Belalang',
    category: 'Fabel',
    gradeLevel: 'Kelas 1-2',
    icon: '🐜',
    paragraphText: 'Semut selalu bekerja keras mengumpulkan makanan sepanjang musim panas. Sementara itu, Belalang hanya bersantai dan bernyanyi tanpa memikirkan musim dingin. Ketika musim dingin tiba, Belalang kelaparan karena tidak memiliki persediaan makanan sama sekali. Beruntung, Semut yang baik hati mau berbagi makanan dengan Belalang.',
    sentences: [
      { id: 1, text: 'Semut selalu bekerja keras mengumpulkan makanan sepanjang musim panas.', isKalimatUtama: true, elementRole: 'kalimatUtama' },
      { id: 2, text: 'Sementara itu, Belalang hanya bersantai dan bernyanyi tanpa memikirkan musim dingin.', isKalimatUtama: false, elementRole: 'tokoh' },
      { id: 3, text: 'Ketika musim dingin tiba, Belalang kelaparan karena tidak memiliki persediaan makanan sama sekali.', isKalimatUtama: false, elementRole: 'idePokok' },
      { id: 4, text: 'Beruntung, Semut yang baik hati mau berbagi makanan dengan Belalang.', isKalimatUtama: false, elementRole: 'amanat' },
    ],
    kalimatUtamaIndex: 0,
    kalimatUtamaExplanation: 'Kalimat pertama ("Semut selalu bekerja keras mengumpulkan makanan sepanjang musim panas") adalah kalimat utama karena menjadi topik inti dari keseluruhan cerita tersebut.',
    kalimatUtamaHint: 'Coba baca kalimat nomor 1 di awal paragraf. Kalimat ini menjelaskan kegiatan utama Semut yang menjadi fokus cerita!',

    idePokokOptions: [
      'Ketekunan Semut dalam mengumpulkan makanan untuk persediaan.',
      'Cara Belalang bernyanyi gembira di musim panas.',
      'Musim dingin yang sangat dingin di dalam hutan.',
      'Jenis-jenis makanan yang disukai oleh serangga.'
    ],
    correctIdePokokIndex: 0,
    idePokokExplanation: 'Ide pokok disarikan dari kalimat utama: yaitu ketekunan dan kerja keras Semut mengumpulkan makanan.',
    idePokokHint: 'Ide pokok adalah inti ringkas dari kalimat utama. Cari pilihan yang menjelaskan usaha ketekunan Semut!',

    tokohOptions: [
      'Semut (tekun & baik hati) dan Belalang (pemalas & suka menunda)',
      'Kancil dan Burung Hantu',
      'Petani dan Burung Pipit',
      'Raja Hutan dan Kancil'
    ],
    correctTokohIndex: 0,
    tokohDetails: 'Semut (sifat: rajin, hemat, dermawan) & Belalang (sifat: pemalas, suka meremehkan waktu)',
    tokohExplanation: 'Tokoh utamanya adalah Semut (yang rajin & baik hati) serta Belalang (yang awalnya pemalas).',
    tokohHint: 'Tokoh adalah pelaku dalam cerita. Siapa dua serangga yang menjadi pemeran utama di cerita ini?',

    amanatOptions: [
      'Kita harus rajin bekerja dan mempersiapkan masa depan, tidak boleh menunda-nunda pekerjaan.',
      'Bernyanyi sepanjang hari adalah hal paling penting di musim panas.',
      'Kita tidak perlu menyimpan makanan jika ada teman.',
      'Musim dingin sebaiknya digunakan untuk tidur sepanjang hari.'
    ],
    correctAmanatIndex: 0,
    amanatExplanation: 'Pesan moralnya adalah agar kita tidak malas dan selalu bersiap menghadapi masa depan seperti Semut.',
    amanatHint: 'Pikirkan pelajaran baik apa yang dipelajari Belalang setelah ia kelaparan di musim dingin?',

    smartHints: {
      kalimatUtama: {
        level1: '📍 Lokasi Kunci: Kalimat utama bacaan ini bersifat Deduktif (ada di kalimat paling awal [1]). kata kuncinya: Semut & bekerja keras.',
        level2: '⚡ Eliminasi: Kalimat [2] dan [3] hanyalah rincian pendukung tentang Belalang. Kalimat utama pasti nomor 1!',
        level3: '🔍 Petunjuk Prof. Litera: Klik pilihan nomor 1 ("Semut selalu bekerja keras mengumpulkan makanan..."). Ini adalah jawaban yang tepat!',
        eliminateIndices: [1, 2]
      },
      idePokok: {
        level1: '📍 Lokasi Kunci: Ringkaskan Kalimat 1 menjadi 1 kalimat pendek tentang sifat "ketekunan Semut".',
        level2: '⚡ Eliminasi: Pilihan B (Belalang bernyanyi) dan D (Jenis makanan) salah karena bukan fokus utama cerita.',
        level3: '🔍 Petunjuk Prof. Litera: Pilih Opsi A ("Ketekunan Semut dalam mengumpulkan makanan..."). Pilihan ini merangkum gagasan utama!',
        eliminateIndices: [1, 3]
      },
      tokoh: {
        level1: '📍 Lokasi Kunci: Tokoh adalah makhluk hidup yang melakukan kegiatan dalam cerita fabel ini.',
        level2: '⚡ Eliminasi: Opsi B, C, dan D menyebutkan hewan/manusia lain yang sama sekali tidak muncul di teks!',
        level3: '🔍 Petunjuk Prof. Litera: Pilih Opsi A ("Semut dan Belalang"). Merekalah dua pemeran utama!',
        eliminateIndices: [1, 2]
      },
      amanat: {
        level1: '📍 Lokasi Kunci: Cari nasehat kebaikan tentang masa depan dan akibat dari sifat bermalas-malasan.',
        level2: '⚡ Eliminasi: Pilihan B dan C memberikan contoh kebiasaan buruk yang tidak patut dicontoh.',
        level3: '🔍 Petunjuk Prof. Litera: Pilih Opsi A ("Kita harus rajin bekerja dan mempersiapkan masa depan..."). Ini pesan moralnya!',
        eliminateIndices: [1, 2]
      }
    }
  },

  {
    id: 'bt_sepeda_danu',
    title: 'Kejujuran Danu dan Sepeda Merah',
    category: 'Cerita Pendek',
    gradeLevel: 'Kelas 3-4',
    icon: '🚲',
    paragraphText: 'Danu sangat menjaga sepeda merah pemberian ayahnya dengan penuh rasa tanggung jawab. Setiap sore setelah menyelesaikan PR, ia selalu merawat dan membersihkan sepedanya hingga berkilau. Suatu hari, Danu tidak sengaja menggores cat sepeda teman saat memarkirnya di sekolah. Daripada melarikan diri, Danu dengan jujur mengakui kesalahannya dan meminta maaf kepada temannya.',
    sentences: [
      { id: 1, text: 'Danu sangat menjaga sepeda merah pemberian ayahnya dengan penuh rasa tanggung jawab.', isKalimatUtama: true, elementRole: 'kalimatUtama' },
      { id: 2, text: 'Setiap sore setelah menyelesaikan PR, ia selalu merawat dan membersihkan sepedanya hingga berkilau.', isKalimatUtama: false, elementRole: 'idePokok' },
      { id: 3, text: 'Suatu hari, Danu tidak sengaja menggores cat sepeda teman saat memarkirnya di sekolah.', isKalimatUtama: false, elementRole: 'tokoh' },
      { id: 4, text: 'Daripada melarikan diri, Danu dengan jujur mengakui kesalahannya dan meminta maaf kepada temannya.', isKalimatUtama: false, elementRole: 'amanat' },
    ],
    kalimatUtamaIndex: 0,
    kalimatUtamaExplanation: 'Kalimat nomor 1 ("Danu sangat menjaga sepeda merah pemberian ayahnya dengan penuh rasa tanggung jawab") memuat pokok gagasan karakter Danu.',
    kalimatUtamaHint: 'Kalimat utama terletak di awal paragraf (deduktif). Kalimat ini memuat sifat tanggung jawab Danu terhadap sepedanya.',

    idePokokOptions: [
      'Rasa tanggung jawab dan sikap merawat barang yang dimiliki Danu.',
      'Cara memarkir sepeda yang benar di sekolah.',
      'Harga sepeda merah buatan ayah Danu.',
      'Warna-warni cat sepeda milik teman sekolah.'
    ],
    correctIdePokokIndex: 0,
    idePokokExplanation: 'Ide pokoknya adalah sikap tanggung jawab Danu dalam merawat dan menjaga barang miliknya.',
    idePokokHint: 'Cari ringkasan inti dari kalimat utama yang membicarakan sikap Danu terhadap sepedanya.',

    tokohOptions: [
      'Danu (anak yang bertanggung jawab & jujur)',
      'Ayah Danu dan Pak Guru',
      'Roni dan Budi',
      'Penjual Sepeda'
    ],
    correctTokohIndex: 0,
    tokohDetails: 'Danu (sifat: jujur, berani mengakui kesalahan, dan bertanggung jawab)',
    tokohExplanation: 'Danu adalah tokoh utama yang diceritakan dari awal hingga akhir cerita.',
    tokohHint: 'Siapa nama anak laki-laki pemilik sepeda merah yang menjadi fokus cerita ini?',

    amanatOptions: [
      'Kita harus bertanggung jawab terhadap barang milik kita dan bersikap jujur mengakui kesalahan.',
      'Jika merusakkan barang orang lain, kita sebaiknya pura-pura tidak tahu.',
      'Sepeda merah selalu lebih bagus daripada sepeda warna lain.',
      'PR sekolah tidak usah dikerjakan jika ingin bermain sepeda.'
    ],
    correctAmanatIndex: 0,
    amanatExplanation: 'Amanatnya mengajarkan nilai kejujuran dan tanggung jawab saat melakukan kesalahan.',
    amanatHint: 'Perhatikan tindakan Danu saat sepedanya menggores sepeda teman. Pelajaran baik apa yang ia contohkan?',

    smartHints: {
      kalimatUtama: {
        level1: '📍 Lokasi Kunci: Kalimat utama ada pada Kalimat ke-1 yang mengenalkan watak tanggung jawab Danu.',
        level2: '⚡ Eliminasi: Kalimat 2 dan 3 adalah peristiwa pelengkap tentang cara membersihkan dan kecelakaan sepeda.',
        level3: '🔍 Petunjuk Prof. Litera: Klik pilihan nomor 1 ("Danu sangat menjaga sepeda merah..."). Inilah kalimat utamanya!',
        eliminateIndices: [1, 2]
      },
      idePokok: {
        level1: '📍 Lokasi Kunci: Inti ide pokok membicarakan sikap positif Danu terhadap barang miliknya.',
        level2: '⚡ Eliminasi: Pilihan B, C, dan D fokus pada detail tempat parkir, harga, atau warna cat yang bukan inti cerita.',
        level3: '🔍 Petunjuk Prof. Litera: Opsi A ("Rasa tanggung jawab dan sikap merawat barang...") adalah jawaban yang benar!',
        eliminateIndices: [1, 3]
      },
      tokoh: {
        level1: '📍 Lokasi Kunci: Siapa nama anak laki-laki yang menjadi pemilik sepeda merah di cerita ini?',
        level2: '⚡ Eliminasi: Ayah Danu hanya disebutkan sekilas di awal, sedangkan Roni/Budi tidak ada di teks.',
        level3: '🔍 Petunjuk Prof. Litera: Pilihlah Opsi A ("Danu (anak yang bertanggung jawab & jujur)").',
        eliminateIndices: [1, 2]
      },
      amanat: {
        level1: '📍 Lokasi Kunci: Perhatikan tindakan terpuji Danu saat ia mengakui kesalahan dan meminta maaf.',
        level2: '⚡ Eliminasi: Opsi B, C, dan D mengajarkan tindakan tidak jujur atau aturan yang keliru.',
        level3: '🔍 Petunjuk Prof. Litera: Opsi A ("Kita harus bertanggung jawab... dan bersikap jujur") adalah amanat cerita ini!',
        eliminateIndices: [1, 3]
      }
    }
  },

  {
    id: 'bt_siklus_air',
    title: 'Bagaimana Air Hujan Terbentuk?',
    category: 'Teks Sains & Informasi',
    gradeLevel: 'Kelas 3-4',
    icon: '🌧️',
    paragraphText: 'Air di bumi selalu mengalami perputaran berkelanjutan yang disebut siklus air. Panas matahari menyebabkan air laut, sungai, dan danau menguap menjadi uap air di udara. Uap air yang berkumpul di atmosfer akan mendingin dan membentuk awan melalui proses kondensasi. Ketika awan sudah terlalu berat menampung titik-titik air, air pun jatuh ke bumi sebagai hujan.',
    sentences: [
      { id: 1, text: 'Air di bumi selalu mengalami perputaran berkelanjutan yang disebut siklus air.', isKalimatUtama: true, elementRole: 'kalimatUtama' },
      { id: 2, text: 'Panas matahari menyebabkan air laut, sungai, dan danau menguap menjadi uap air di udara.', isKalimatUtama: false, elementRole: 'idePokok' },
      { id: 3, text: 'Uap air yang berkumpul di atmosfer akan mendingin dan membentuk awan melalui proses kondensasi.', isKalimatUtama: false, elementRole: 'tokoh' },
      { id: 4, text: 'Ketika awan sudah terlalu berat menampung titik-titik air, air pun jatuh ke bumi sebagai hujan.', isKalimatUtama: false, elementRole: 'amanat' },
    ],
    kalimatUtamaIndex: 0,
    kalimatUtamaExplanation: 'Kalimat pertama ("Air di bumi selalu mengalami perputaran berkelanjutan yang disebut siklus air") adalah kalimat utama deduktif yang memayungi seluruh penjelasan siklus.',
    kalimatUtamaHint: 'Lihat kalimat nomor 1. Kalimat ini mengenalkan istilah umum "siklus air" sebelum kalimat lainnya menjelaskan tahapannya.',

    idePokokOptions: [
      'Proses perputaran air di bumi atau siklus air.',
      'Suhu panas matahari di siang hari.',
      'Bentuk-bentuk awan di langit sore.',
      'Kedalaman air laut dan sungai.'
    ],
    correctIdePokokIndex: 0,
    idePokokExplanation: 'Ide pokok paragraf ini adalah mengenai proses terjadinya siklus air di bumi.',
    idePokokHint: 'Topik umum teks sains ini membahas tentang perputaran air secara keseluruhan.',

    tokohOptions: [
      'Teks Informasi (Tidak ada tokoh rekaan, objek utamanya adalah Air dan Alam)',
      'Matahari dan Awan',
      'Peneliti Hujan',
      'Petani Garam'
    ],
    correctTokohIndex: 0,
    tokohDetails: 'Teks Informasi / Non-fiksi (Fokus pada Fenomena Alam: Air & Siklusnya)',
    tokohExplanation: 'Ini adalah teks eksplanasi ilmiah, sehingga tidak memiliki tokoh fiksi, melainkan objek fenomena alam (Air).',
    tokohHint: 'Ingat! Teks informasi pengetahuan tidak memiliki karakter manusia/hewan fiksi, melainkan menjelaskan objek fenomena alam.',

    amanatOptions: [
      'Air adalah sumber kehidupan yang sangat berharga di bumi sehingga kita wajib menjaga kelestarian lingkungan dan air.',
      'Hujan harus dihentikan agar bumi tidak basah.',
      'Matahari adalah musuh utama dari air laut.',
      'Uap air hanya ada di musim kemarau.'
    ],
    correctAmanatIndex: 0,
    amanatExplanation: 'Pesan pentingnya adalah memahami karunia alam dan pentingnya menjaga kebersihan sumber air bumi.',
    amanatHint: 'Mengapa kita perlu memahami siklus air? Apa pentingnya air bagi kehidupan kita di bumi?',

    smartHints: {
      kalimatUtama: {
        level1: '📍 Lokasi Kunci: Teks sains ini memiliki kalimat utama deduktif di awal paragraf tentang istilah "siklus air".',
        level2: '⚡ Eliminasi: Kalimat 2, 3, dan 4 menjelaskan tahapan penguapan, kondensasi, dan hujan.',
        level3: '🔍 Petunjuk Prof. Litera: Kalimat nomor 1 ("Air di bumi selalu mengalami perputaran...") adalah jawaban tepat!',
        eliminateIndices: [1, 2]
      },
      idePokok: {
        level1: '📍 Lokasi Kunci: Ide pokok teks ilmiah menyimpulkan keseluruhan fenomena alam yang dijelaskan.',
        level2: '⚡ Eliminasi: Pilihan B, C, dan D hanya membahas 1 bagian kecil (suhu matahari, awan, atau laut).',
        level3: '🔍 Petunjuk Prof. Litera: Pilih Opsi A ("Proses perputaran air di bumi atau siklus air").',
        eliminateIndices: [1, 3]
      },
      tokoh: {
        level1: '📍 Lokasi Kunci: Ini adalah teks non-fiksi pengetahuan (eksplanasi ilmiah).',
        level2: '⚡ Eliminasi: Teks sains tidak menggunakan tokoh fiksi manusia atau tokoh rekaan dongeng.',
        level3: '🔍 Petunjuk Prof. Litera: Pilih Opsi A ("Teks Informasi - Objek utamanya adalah Air & Alam").',
        eliminateIndices: [1, 2]
      },
      amanat: {
        level1: '📍 Lokasi Kunci: Pikirkan pentingnya siklus air bagi kelangsungan hidup manusia dan alam di bumi.',
        level2: '⚡ Eliminasi: Opsi B, C, D berisi anggapan salah mengenai hujan dan matahari.',
        level3: '🔍 Petunjuk Prof. Litera: Opsi A ("Air adalah sumber kehidupan yang sangat berharga...") adalah amanat utamanya!',
        eliminateIndices: [1, 2]
      }
    }
  },

  {
    id: 'bt_hemat_energi',
    title: 'Hemat Listrik di Sekolah Kita',
    category: 'Teks Sains & Informasi',
    gradeLevel: 'Kelas 5-6',
    icon: '💡',
    paragraphText: 'Menghemat energi listrik di sekolah merupakan kewajiban bersama seluruh warga sekolah untuk menjaga bumi. Siswa dapat mematikan lampu dan kipas angin kelas ketika jam istirahat atau saat meninggalkan ruangan. Selain itu, menggunakan pencahayaan alami dari jendela terbuka saat siang hari sangat efektif mengurangi pemakaian listrik. Dengan membiasakan hemat energi, sekolah turut berkontribusi mengurangi dampak pemanasan global.',
    sentences: [
      { id: 1, text: 'Menghemat energi listrik di sekolah merupakan kewajiban bersama seluruh warga sekolah untuk menjaga bumi.', isKalimatUtama: true, elementRole: 'kalimatUtama' },
      { id: 2, text: 'Siswa dapat mematikan lampu dan kipas angin kelas ketika jam istirahat atau saat meninggalkan ruangan.', isKalimatUtama: false, elementRole: 'idePokok' },
      { id: 3, text: 'Selain itu, menggunakan pencahayaan alami dari jendela terbuka saat siang hari sangat efektif mengurangi pemakaian listrik.', isKalimatUtama: false, elementRole: 'tokoh' },
      { id: 4, text: 'Dengan membiasakan hemat energi, sekolah turut berkontribusi mengurangi dampak pemanasan global.', isKalimatUtama: false, elementRole: 'amanat' },
    ],
    kalimatUtamaIndex: 0,
    kalimatUtamaExplanation: 'Kalimat pertama menjelaskan pernyataan umum bahwa hemat listrik di sekolah adalah kewajiban bersama.',
    kalimatUtamaHint: 'Cari kalimat utama di awal paragraf yang menyatakan kewajiban bersama hemat energi.',

    idePokokOptions: [
      'Pentingnya kewajiban hemat energi listrik di lingkungan sekolah.',
      'Cara membuka jendela kelas yang benar.',
      'Harga token listrik di gedung sekolah.',
      'Jadwal piket membersihkan kipas angin.'
    ],
    correctIdePokokIndex: 0,
    idePokokExplanation: 'Ide pokoknya adalah kewajiban dan pentingnya tindakan penghematan listrik di sekolah.',
    idePokokHint: 'Apa inti ajakan dari paragraf ini mengenai penggunaan listrik?',

    tokohOptions: [
      'Teks Ajakan / Imbauan (Subjek: Seluruh Warga Sekolah & Siswa)',
      'Penjaga Sekolah dan Kepala Sekolah',
      'Petugas PLN',
      'Petani dan Nelayan'
    ],
    correctTokohIndex: 0,
    tokohDetails: 'Subjek Pembaca: Seluruh Warga Sekolah (Guru, Siswa, dan Staf)',
    tokohExplanation: 'Teks eksplanasi ini ditujukan kepada seluruh warga sekolah sebagai pemangku peran.',
    tokohHint: 'Siapa yang diajak dan berkewajiban menghemat energi dalam paragraf ini?',

    amanatOptions: [
      'Kita harus disiplin hemat energi listrik di mana pun berada demi mencegah pemanasan global.',
      'Lampu kelas harus selalu dinyalakan siang dan malam.',
      'Menghemat listrik hanya tugas guru saja.',
      'Jendela sekolah tidak boleh dibuka saat siang hari.'
    ],
    correctAmanatIndex: 0,
    amanatExplanation: 'Pesan utamanya adalah pentingnya kebiasaan disiplin hemat energi untuk kelestarian bumi.',
    amanatHint: 'Apa tujuan positif jangka panjang dari kebiasaan mematikan lampu yang tidak terpakai?',

    smartHints: {
      kalimatUtama: {
        level1: '📍 Lokasi Kunci: Kalimat 1 menyatakan imbauan umum tentang kewajiban bersama hemat energi.',
        level2: '⚡ Eliminasi: Kalimat 2, 3, dan 4 adalah contoh praktis seperti mematikan lampu dan membuka jendela.',
        level3: '🔍 Petunjuk Prof. Litera: Pilihlah Kalimat nomor 1 ("Menghemat energi listrik di sekolah...").',
        eliminateIndices: [1, 2]
      },
      idePokok: {
        level1: '📍 Lokasi Kunci: Gagasan inti paragraf membicarakan kewajiban hemat energi.',
        level2: '⚡ Eliminasi: Pilihan B, C, dan D berbicara soal detail teknis teknis jendela dan token yang kurang tepat.',
        level3: '🔍 Petunjuk Prof. Litera: Pilihlah Opsi A ("Pentingnya kewajiban hemat energi listrik...").',
        eliminateIndices: [1, 3]
      },
      tokoh: {
        level1: '📍 Lokasi Kunci: Siapa yang dipanggil dan diajak bertindak dalam teks imbauan ini?',
        level2: '⚡ Eliminasi: Petugas PLN atau Petani tidak disebutkan dalam teks ruang kelas ini.',
        level3: '🔍 Petunjuk Prof. Litera: Opsi A ("Seluruh Warga Sekolah & Siswa") adalah subjek utamanya.',
        eliminateIndices: [1, 2]
      },
      amanat: {
        level1: '📍 Lokasi Kunci: Cari amanat tentang dampak positif kebiasaan hemat energi bagi bumi.',
        level2: '⚡ Eliminasi: Opsi B, C, dan D bertentangan dengan prinsip kelestarian energi.',
        level3: '🔍 Petunjuk Prof. Litera: Opsi A ("Kita harus disiplin hemat energi listrik... demi mencegah pemanasan global").',
        eliminateIndices: [1, 3]
      }
    }
  }
];
