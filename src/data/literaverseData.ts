import { LevelDetails, WorldDetails, QuestMission, ReadingContent, WriterPrompt, MasteryLevel } from '../types';

export const LEVEL_DEFINITIONS: Record<MasteryLevel, LevelDetails> = {
  Explorer: {
    id: 'Explorer',
    name: 'Explorer (Tingkat Dasar)',
    emoji: '🌱',
    gradeLabel: 'Kelas 1 - 2 SD',
    minXp: 0,
    description: 'Membaca kalimat pendek, mengenali kata-kata visual, dan memahami petunjuk harian sederhana.',
    color: 'emerald',
    bgGradient: 'from-emerald-500 to-teal-600',
  },
  Adventurer: {
    id: 'Adventurer',
    name: 'Adventurer (Tingkat Menengah 1)',
    emoji: '🌿',
    gradeLabel: 'Kelas 2 - 3 SD',
    minXp: 250,
    description: 'Membaca cerita pendek, memahami petunjuk bergambar, jadwal, dan informasi rinci dalam teks.',
    color: 'teal',
    bgGradient: 'from-teal-500 to-cyan-600',
  },
  Thinker: {
    id: 'Thinker',
    name: 'Thinker (Tingkat Menengah 2)',
    emoji: '🌳',
    gradeLabel: 'Kelas 3 - 4 SD',
    minXp: 600,
    description: 'Membaca artikel sains anak, grafik data sederhana, serta membedakan fakta dan opini.',
    color: 'amber',
    bgGradient: 'from-amber-500 to-orange-600',
  },
  Scholar: {
    id: 'Scholar',
    name: 'Scholar (Tingkat Lanjut 1)',
    emoji: '🏛',
    gradeLabel: 'Kelas 4 - 5 SD',
    minXp: 1100,
    description: 'Menganalisis konflik tokoh cerita, mengevaluasi pesan infografik, dan menyusun kesimpulan.',
    color: 'indigo',
    bgGradient: 'from-indigo-500 to-purple-600',
  },
  Master: {
    id: 'Master',
    name: 'Master (Tingkat Lanjut 2)',
    emoji: '🚀',
    gradeLabel: 'Kelas 5 - 6 SD',
    minXp: 1800,
    description: 'Mengevaluasi kredibilitas berita, menyintesis beberapa data/teks, dan berkarya dalam Writer Studio.',
    color: 'rose',
    bgGradient: 'from-rose-500 to-pink-600',
  },
};

export const WORLD_DEFINITIONS: WorldDetails[] = [
  {
    id: 'story',
    name: 'Story World',
    subtitle: 'Dunia Cerita Fiksi',
    iconName: 'BookOpen',
    description: 'Jelajahi dongeng, fabel, legenda, dan cerita anak. Pelajari karakter tokoh, alur cerita, dan pesan moral.',
    accentColor: 'border-emerald-500 text-emerald-700 bg-emerald-50',
    bannerBg: 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white',
    competencies: ['Analisis Tokoh & Latar', 'Alur & Konflik', 'Amanat & Nilai Moral', 'Inferensi Kalimat Tersembunyi'],
  },
  {
    id: 'information',
    name: 'Information World',
    subtitle: 'Dunia Pengetahuan & Sains',
    iconName: 'Newspaper',
    description: 'Baca artikel ilmiah anak, berita sekolah, dan teks eksplanasi. Temukan fakta penting dan ide utama.',
    accentColor: 'border-blue-500 text-blue-700 bg-blue-50',
    bannerBg: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white',
    competencies: ['Gagasan Utama', 'Informasi Rinci Rujukan', 'Membedakan Fakta vs Opini', 'Kesimpulan Teks Eksplanasi'],
  },
  {
    id: 'daily_life',
    name: 'Daily Life World',
    subtitle: 'Dunia Literasi Kehidupan Sehari-hari',
    iconName: 'ShoppingBag',
    description: 'Ciri khas Literaverse! Latih kemampuan membaca label makanan, tiket kereta, pesan WhatsApp, poster, dan menu.',
    accentColor: 'border-amber-500 text-amber-700 bg-amber-50',
    bannerBg: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
    competencies: ['Membaca Label & Peringatan', 'Jadwal & Tiket Transportasi', 'Menganalisis Poster & Iklan', 'Pesan Obrolan WA & Surat'],
  },
  {
    id: 'data',
    name: 'Data World',
    subtitle: 'Dunia Data & Visual (Literasi + Numerasi)',
    iconName: 'BarChart3',
    description: 'Pahami grafik batang, diagram, tabel nutrisi, dan infografik. Jembatan utama antara Literasi dan Numerasi AKM.',
    accentColor: 'border-violet-500 text-violet-700 bg-violet-50',
    bannerBg: 'bg-gradient-to-r from-purple-600 to-violet-800 text-white',
    competencies: ['Membaca Data Grafik & Tabel', 'Membandingkan Statistik', 'Prediksi Tren Berdasarkan Data', 'Sintesis Gambar & Angka'],
  },
  {
    id: 'communication',
    name: 'Communication World',
    subtitle: 'Dunia Komunikasi Interaktif',
    iconName: 'MessageSquare',
    description: 'Pahami percakapan, email sahabat pena, pengumuman resmi, dan forum diskusi untuk mengerti maksud pembicara.',
    accentColor: 'border-cyan-500 text-cyan-700 bg-cyan-50',
    bannerBg: 'bg-gradient-to-r from-cyan-600 to-sky-700 text-white',
    competencies: ['Nada & Maksud Pembicara', 'Tata Krama Berkomunikasi', 'Identifikasi Tujuan Pengirim', 'Respons Diskusi Kesopanan'],
  },
  {
    id: 'writer',
    name: 'Writer World',
    subtitle: 'Ruang Penulis & Evaluasi AI',
    iconName: 'PenTool',
    description: 'Bukan sekadar membaca! Ciptakan judul baru, lanjutkan cerita, perbaiki kalimat, dan dapatkan umpan balik instan dari AI.',
    accentColor: 'border-rose-500 text-rose-700 bg-rose-50',
    bannerBg: 'bg-gradient-to-r from-rose-600 to-pink-700 text-white',
    competencies: ['Membuat Judul Menarik', 'Melanjutkan Jalan Cerita', 'Menyunting Tanda Baca', 'Umpan Balik AI Interaktif'],
  },
];

export const QUEST_MISSIONS: QuestMission[] = [
  {
    id: 1,
    title: 'Misi 1 – Surat Misterius Penjelajah Ciko',
    zoneName: 'Zona Petualangan Awal',
    description: 'Kamu menemukan gulungan surat kuno di dekat perpustakaan tua. Baca surat dengan cermat untuk menemukan petunjuk kode rahasia!',
    characterName: 'Ciko si Burung Hantu Penjelajah',
    characterAvatar: '🦉',
    storyIntro: 'Haii Penjelajah Cilik! Namaku Ciko. Aku baru saja menemukan surat penuh teka-teki dari Kakek Aris. Buka suratnya dan cari kata kunci keberangkatan kita!',
    targetWorld: 'daily_life',
    contentId: 'dl_surat_misterius',
    rewardBadge: {
      id: 'b_misi1',
      name: 'Pencari Petunjuk Cilik',
      icon: '✉️',
      description: 'Menyelesaikan Misi 1 dengan membaca surat misterius secara teliti.',
    },
    xpReward: 100,
  },
  {
    id: 2,
    title: 'Misi 2 – Pos Peta Hutan Pengetahuan',
    zoneName: 'Zona Rimba Ilmu',
    description: 'Jalanan di hutan terbagi menjadi 3 jalur. Kamu harus membaca papan petunjuk jalan dan peta pos untuk memilih jalur yang paling aman.',
    characterName: 'Rara si Kancil Cerdas',
    characterAvatar: '🦌',
    storyIntro: 'Waspada! Hutan Pengetahuan sangat lebat. Perhatikan peringatan di papan peta sebelum melangkah agar tidak tersesat di Lembah Rawa!',
    targetWorld: 'information',
    contentId: 'info_papan_hutan',
    rewardBadge: {
      id: 'b_misi2',
      name: 'Navigator Rimba',
      icon: '🗺️',
      description: 'Menyelesaikan Misi 2 dengan membaca peta dan papan petunjuk informasi.',
    },
    xpReward: 120,
  },
  {
    id: 3,
    title: 'Misi 3 – Detektif Kota Berita',
    zoneName: 'Zona Kota Berita',
    description: 'Warga kota sedang dihebohkan oleh berita poster hemat air dan pengumuman lomba. Kumpulkan fakta-fakta dari media kota!',
    characterName: 'Pak Budi si Jurnalis Cilik',
    characterAvatar: '📰',
    storyIntro: 'Halo! Ada kabar membingungkan di Kota Berita. Mari kita bandingkan poster publik dan berita koran cilik untuk menemukan fakta yang sebenarnya!',
    targetWorld: 'daily_life',
    contentId: 'dl_poster_kota',
    rewardBadge: {
      id: 'b_misi3',
      name: 'Detektif Berita',
      icon: '🔍',
      description: 'Menyelesaikan Misi 3 dengan membedakan fakta berita dan poster di kota.',
    },
    xpReward: 150,
  },
  {
    id: 4,
    title: 'Misi 4 – Rahasia Pulau Cerita',
    zoneName: 'Zona Pulau Cerita',
    description: 'Tiba di Pulau Cerita, burung Maleo meminta bantuanmu. Pahami kisah fabel persahabatan hewan untuk mendapatkan Kunci Emas.',
    characterName: 'Leo si Burung Maleo',
    characterAvatar: '🦜',
    storyIntro: 'Selamat datang di pulauku! Cerita rakyat di pulau ini menyimpan nilai kebaikan yang luar biasa. Bisakah kamu membantu menganalisis amanat ceritanya?',
    targetWorld: 'story',
    contentId: 'story_maleo_musang',
    rewardBadge: {
      id: 'b_misi4',
      name: 'Penjaga Amanat Cerita',
      icon: '🌟',
      description: 'Menyelesaikan Misi 4 dengan menemukan karakter dan pesan moral fabel.',
    },
    xpReward: 180,
  },
  {
    id: 5,
    title: 'Misi 5 – Laboratorium Informasi Data',
    zoneName: 'Zona Sains & Data',
    description: 'Tantangan puncak! Masuk ke laboratorium sains. Analisis grafik curah hujan dan tabel nutrisi untuk mengaktifkan Mesin Utama Literaverse.',
    characterName: 'Dr. Aira si Peneliti Cilik',
    characterAvatar: '🔬',
    storyIntro: 'Inilah Misi Puncak! Di laboratorium, angka dan grafik saling terhubung dengan bacaan. Gunakan ketelitianmu untuk mengukur data sains!',
    targetWorld: 'data',
    contentId: 'data_grafik_hujan',
    rewardBadge: {
      id: 'b_misi5',
      name: 'Master Data & Literasi',
      icon: '🏆',
      description: 'Menyelesaikan Misi Puncak dengan membaca grafik data dan tabel nutrisi.',
    },
    xpReward: 250,
  },
];

export const READING_CONTENTS: ReadingContent[] = [
  // --- DAILY LIFE WORLD ---
  {
    id: 'dl_surat_misterius',
    world: 'daily_life',
    level: 'Explorer',
    title: 'Surat Misterius Penjelajah Kakek Aris',
    subtitle: 'Surat Petunjuk Misi 1 Literaverse',
    category: 'Surat Undangan',
    authorOrSource: 'Arsip Penjelajah Ciko',
    readTimeMinutes: 2,
    text: `Untuk Ciko dan Sahabat Penjelajah Cilik,

Jika kamu membaca surat ini, berarti kamu telah sampai di Stasiun Literasi Utama. 

Nenek dan Kakek telah menyembunyikan **Peta Kuno Literaverse** di bawah *Bangku Kayu Merah* dekat pohon beringin tua. Peta tersebut dikunci dengan **Kode Rahasia 4 Angka**.

Untuk mengetahui kodenya, hitunglah:
1. Angka pertama: Jumlah huruf dalam kata "LITERASI" (8 huruf).
2. Angka kedua: Jumlah hari dalam satu minggu (7 hari).
3. Angka ketiga: Angka yang melambangkan jumlah roda sepeda motor (2 roda).
4. Angka keempat: Angka pertama pada nomor darurat stasiun, yaitu angka (0).

Datanglah sebelum pukul **15.00 WIB** karena stasiun akan ditutup. Jangan lupa membawa botol minum sendiri agar kita tetap hemat dan tidak mengotori lingkungan!

Salam hangat,
Kakek Aris (Penjelajah Senior)`,
    vocabulary: [
      { word: 'Stasiun', meaning: 'Tempat pemberhentian kereta api atau titik awal perjalanan.', example: 'Kami berkumpul di stasiun pukul 08.00 pagi.' },
      { word: 'Kode Rahasia', meaning: 'Angka atau susunan simbol khusus untuk membuka kunci.', example: 'Pintu itu hanya bisa dibuka dengan kode rahasia.' },
      { word: 'Darurat', meaning: 'Keadaan sulit atau berbahaya yang membutuhkan penanganan cepat.', example: 'Nomor telepon darurat harus disimpan di HP.' },
    ],
    questions: [
      {
        id: 'q_dl1_1',
        prompt: 'Di manakah Kakek Aris menyembunyikan Peta Kuno Literaverse?',
        type: 'multiple_choice',
        options: [
          'Di dalam loker stasiun',
          'Di bawah Bangku Kayu Merah dekat pohon beringin tua',
          'Di atas pohon beringin tua',
          'Di dalam botol minum Kakek Aris'
        ],
        correctOptionIndex: 1,
        explanation: 'Dalam teks surat tertulis jelas: "di bawah Bangku Kayu Merah dekat pohon beringin tua".',
        skillTested: 'Menemukan Informasi Rinci dalam Surat'
      },
      {
        id: 'q_dl1_2',
        prompt: 'Berapakah susunan lengkap Kode Rahasia 4 Angka berdasarkan petunjuk surat?',
        type: 'multiple_choice',
        options: ['8-7-2-0', '7-8-2-0', '8-7-4-0', '1-2-3-4'],
        correctOptionIndex: 0,
        explanation: 'Hitungan kode: 1) LITERASI = 8, 2) Hari seminggu = 7, 3) Roda motor = 2, 4) Angka pertama = 0. Jadi kodenya 8720.',
        skillTested: 'Penalaran Informasi & Logika Sederhana'
      },
      {
        id: 'q_dl1_3',
        prompt: 'Mengapa Kakek Aris mengingatkan untuk membawa botol minum sendiri?',
        type: 'multiple_choice',
        options: [
          'Agar tidak kehausan saat beli minum di jalan',
          'Untuk menghemat air minum di stasiun',
          'Agar hemat dan tidak mengotori lingkungan dengan sampah plastik',
          'Karena stasiun tidak menjual minuman'
        ],
        correctOptionIndex: 2,
        explanation: 'Teks menyebutkan: "membawa botol minum sendiri agar kita tetap hemat dan tidak mengotori lingkungan!".',
        skillTested: 'Menarik Kesimpulan & Pesan Lingkungan'
      }
    ]
  },
  {
    id: 'dl_poster_kota',
    world: 'daily_life',
    level: 'Adventurer',
    title: 'Poster Imbauan Kota Hemat Energi & Pesan WA',
    subtitle: 'Membaca Iklan Layanan Masyarakat & Percakapan WA',
    category: 'Poster & WhatsApp',
    authorOrSource: 'Dinas Lingkungan Kota Litera',
    readTimeMinutes: 3,
    extraData: {
      type: 'whatsapp',
      chatMessages: [
        { sender: 'Ibu Guru Nina', text: 'Anak-anak kelas 3, besok kita akan melakukan aksi hemat energi di sekolah!', time: '14.00' },
        { sender: 'Budi', text: 'Siap Ibu! Apa yang perlu kami bawa dari rumah?', time: '14.02' },
        { sender: 'Ibu Guru Nina', text: 'Bawa sapu tangan dan botol minum ya. Matikan juga lampu kamar sebelum berangkat sekolah pukul 06.30.', time: '14.05', isMe: false },
        { sender: 'Siti', text: 'Baik Bu Nina, saya sudah mencatat pesan ini di buku harian.', time: '14.08' }
      ]
    },
    text: `[POSTER IMBAUAN KOTA BERITA]

"MATIKAN LAMPU, HIDUPKAN MASA DEPAN!"

Tahukah Kamu?
Menghemat listrik selama 1 jam di siang hari dapat menghemat energi untuk menyalakan 100 lampu belajar anak-anak di desa!

3 Langkah Sederhana Hemat Listrik di Rumah:
1. Matikan lampu kamar dan ruang tamu jika matahari sudah terang.
2. Cabut kabel charger HP atau kipas angin jika sudah tidak digunakan.
3. Gunakan pendingin ruangan (AC) pada suhu ideal 24°C - 25°C.

Dipublikasikan oleh: Dinas Lingkungan Hidup Kota Literaverse.
Hemat Energi, Sayangi Bumi!`,
    vocabulary: [
      { word: 'Energi', meaning: 'Daya atau kekuatan yang digunakan untuk melakukan kegiatan/mesin.', example: 'Listrik adalah salah satu bentuk energi.' },
      { word: 'Imbauan', meaning: 'Panggilan atau ajakan yang baik kepada masyarakat.', example: 'Poster itu berisi imbauan menjaga kebersihan.' },
      { word: 'Ideal', meaning: 'Sesuai dengan yang dicita-citakan atau paling tepat.', example: 'Suhu 24 derajat adalah suhu ideal hemat AC.' },
    ],
    questions: [
      {
        id: 'q_dl2_1',
        prompt: 'Pukul berapakah siswa diminta Ibu Guru Nina untuk mematikan lampu kamar?',
        type: 'multiple_choice',
        options: [
          'Sebelum pukul 06.30 saat mau berangkat sekolah',
          'Pukul 14.00 saat obrolan WA dikirim',
          'Pukul 12.00 siang saat matahari terik',
          'Pukul 20.00 malam sebelum tidur'
        ],
        correctOptionIndex: 0,
        explanation: 'Pesan WA Bu Nina: "Matikan juga lampu kamar sebelum berangkat sekolah pukul 06.30."',
        skillTested: 'Menghubungkan Teks WhatsApp & Poin Waktu'
      },
      {
        id: 'q_dl2_2',
        prompt: 'Berapakah suhu ideal penggunaan AC yang disarankan pada poster agar hemat listrik?',
        type: 'multiple_choice',
        options: ['16°C - 18°C', '20°C - 22°C', '24°C - 25°C', '28°C - 30°C'],
        correctOptionIndex: 2,
        explanation: 'Poin nomor 3 poster menyebutkan suhu ideal 24°C - 25°C.',
        skillTested: 'Menemukan Informasi Rinci Poster'
      },
      {
        id: 'q_dl2_3',
        prompt: 'Manakah dari pernyataan berikut yang merupakan FAKTA sesuai poster di atas? (Bisa memilih lebih dari satu)',
        type: 'multi_select',
        correctMultiIndices: [0, 2],
        options: [
          'Menghemat listrik 1 jam di siang hari dapat menghemat energi untuk 100 lampu belajar.',
          'Semua siswa wajib membeli charger HP baru minggu depan.',
          'Dinas Lingkungan Hidup Kota Literaverse mempublikasikan poster ini.',
          'Lampu kamar harus tetap dinyalakan sepanjang hari.'
        ],
        explanation: 'Pernyataan 1 dan 3 tercantum secara eksplisit sebagai fakta resmi poster.',
        skillTested: 'Evaluasi Fakta vs Opini'
      }
    ]
  },
  {
    id: 'dl_label_makanan',
    world: 'daily_life',
    level: 'Thinker',
    title: 'Membaca Label Nutrisi Kemasan Biskuit Gandum',
    subtitle: 'Literasi Kehidupan Sehari-hari: Informasi Informasi Kemasan & Peringatan Alergi',
    category: 'Label Makanan',
    authorOrSource: 'Produk Sehat Anak Indonesia',
    readTimeMinutes: 3,
    extraData: {
      type: 'food_label',
      labelDetails: {
        title: 'BISKUIT GANDUM MADU CILIK',
        servingSize: '3 keping (30 gram)',
        calories: '130 kkal',
        ingredients: ['Tepung gandum utuh (45%)', 'Madu murni (10%)', 'Minyak kelapa sawit', 'Gula tebu', 'Susu bubuk full cream', 'Garam halus'],
        warning: 'PERINGATAN ALERGI: Mengandung gandum dan susu. Tidak cocok untuk anak yang memiliki alergi susu sapi!'
      }
    },
    text: `[INFORMASI NILAI GIZI / NUTRITION FACTS]
Nama Produk: Biskuit Gandum Madu Cilik
Ukuran Per Sajian: 3 keping (30 gram)
Jumlah Sajian Per Kemasan: 5 sajian (Total 15 keping biskuit)

KANDUNGAN GIZI PER SAJIAN (3 keping):
- Energi Total: 130 kkal
- Lemak Total: 4 gram (6% AKG)
- Protein: 3 gram (5% AKG)
- Karbohidrat Total: 20 gram (6% AKG)
- Gula: 5 gram
- Garam (Natrium): 80 mg (5% AKG)
- Vitamin D: 15% AKG
- Kalsium: 20% AKG

KOMPOSISI:
Tepung gandum utuh (45%), madu murni (10%), minyak kelapa sawit, gula tebu, susu bubuk full cream, garam.

PERINGATAN ALERGI:
Mengandung gandum dan susu sapi. Diproduksi menggunakan peralatan yang juga memproses kacang tanah.

Kode Kedaluwarsa: EXP 15 DES 2026
Baik digunakan sebelum tanggal kedaluwarsa. Simpan di tempat sejuk dan kering.`,
    vocabulary: [
      { word: 'Komposisi', meaning: 'Bahan-bahan pembuat suatu produk atau makanan.', example: 'Komposisi biskuit ini terbuat dari gandum utuh.' },
      { word: 'Alergi', meaning: 'Reaksi berlebih tubuh terhadap makanan atau zat tertentu.', example: 'Adik alergi susu sapi sehingga harus minum susu kedelai.' },
      { word: 'Kedaluwarsa', meaning: 'Batas waktu terakhir makanan aman untuk dikonsumsi.', example: 'Periksa tanggal kedaluwarsa sebelum membeli biskuit.' },
    ],
    questions: [
      {
        id: 'q_dl3_1',
        prompt: 'Jika Budi memakan 6 keping biskuit (2 sajian), berapa total kalori yang ia dapatkan?',
        type: 'multiple_choice',
        options: ['130 kkal', '260 kkal', '390 kkal', '650 kkal'],
        correctOptionIndex: 1,
        explanation: '1 sajian (3 keping) = 130 kkal. Jika 6 keping (2 sajian), maka 130 kkal x 2 = 260 kkal.',
        skillTested: 'Integrasi Literasi & Berhitung Sederhana'
      },
      {
        id: 'q_dl3_2',
        prompt: 'Mengapa anak yang memiliki alergi parah terhadap kacang tanah harus berhati-hati memakan biskuit ini?',
        type: 'multiple_choice',
        options: [
          'Karena biskuit ini rasanya sangat manis',
          'Karena pabriknya memproses biskuit dengan peralatan yang juga memproses kacang tanah',
          'Karena biskuit terbuat dari gandum murni',
          'Karena harga biskuit mahal'
        ],
        correctOptionIndex: 1,
        explanation: 'Label peringatan menyatakan diproduksi dengan peralatan yang juga memproses kacang tanah, sehingga ada risiko jejak kacang (kontaminasi silang).',
        skillTested: 'Menganalisis Peringatan Kesehatan Kemasan'
      }
    ]
  },

  // --- STORY WORLD ---
  {
    id: 'story_maleo_musang',
    world: 'story',
    level: 'Adventurer',
    title: 'Kisah Musang Cilik dan Burung Maleo di Pulau Cerita',
    subtitle: 'Fabel Persahabatan & Kebijaksanaan Lingkungan',
    category: 'Fabel / Cerita Hewan',
    authorOrSource: 'Cerita Rakyat Nusantara Literaverse',
    readTimeMinutes: 3,
    text: `Di sebuah hutan rindang di Pulau Cerita, hiduplah **Milo si Musang Cilik** dan **Leo si Burung Maleo**. Milo terkenal lincah melompat dari pohon ke pohon, sedangkan Leo bertugas menjaga telur-telurnya di pasir hangat dekat pantai.

Suatu sore, angin kencang bertiup membawa badai. Daun-daun berguguran dan pasir pantai tertutup rantai kayu besar. Leo sangat panik karena gundukan pasir tempat telurnya tertanam tertimbun dahan pohon yang tumbang.

"Milo, tolong aku! Telur-telurku bisa pecah jika dahan ini tidak disingkirkan!" teriak Leo cemas sambil menggepakkan sayapnya.

Milo tidak ragu-ragu. Meskipun badai masih menyisakan gerimis, Milo menggunakan cakar dan tubuh kecilnya yang gesit untuk menggali celah di bawah dahan. Ia mendorong dahan kayu itu bersama-sama dengan Leo menggunakan seluruh tenaganya.

*Sret... Krek!* Dahan besar itu akhirnya bergeser. Telur-telur Leo selamat tanpa cacat sedikit pun.

Sebagai rasa terima kasih, Leo membagikan buah-buahan manis yang dipetik dari pohon tinggi. Milo tersenyum dan berkata, "Sahabat sejati selalu ada saat kita membutuhkan bantuan, Leo. Kita tak perlu menunggu diminta untuk berbuat baik."

Sejak hari itu, hewan-hewan di Pulau Cerita selalu bekerja sama menjaga hutan mereka tetap aman dan lestari.`,
    vocabulary: [
      { word: 'Fabel', meaning: 'Cerita rekaan yang tokoh-tokohnya diperankan oleh hewan yang bertingkah seperti manusia.', example: 'Kisah Musang dan Maleo adalah fabel yang mendidik.' },
      { word: 'Tertimbun', meaning: 'Tertutup atau tertindih oleh tumpukan barang/tanah/kayu.', example: 'Sarang burung tertimbun dedaunan kering.' },
      { word: 'Lestari', meaning: 'Tetap seperti keadaan semula, tidak berubah, aman dan terjaga.', example: 'Hutan harus kita jaga agar tetap lestari.' },
    ],
    questions: [
      {
        id: 'q_st1_1',
        prompt: 'Siapakah nama tokoh utama musang dan burung maleo dalam cerita di atas?',
        type: 'multiple_choice',
        options: [
          'Milo si Musang Cilik dan Leo si Burung Maleo',
          'Ciko si Burung Hantu dan Rara si Kancil',
          'Kiko si Musang dan Aris si Maleo',
          'Budi si Penjelajah dan Nina si Burung'
        ],
        correctOptionIndex: 0,
        explanation: 'Cerita dengan jelas menyebutkan "Milo si Musang Cilik dan Leo si Burung Maleo".',
        skillTested: 'Mengenal Tokoh Cerita'
      },
      {
        id: 'q_st1_2',
        prompt: 'Konflik atau masalah utama yang dihadapi oleh Leo si Burung Maleo adalah...',
        type: 'multiple_choice',
        options: [
          'Milo mencuri buah-buahan milik Leo',
          'Sarang dan telur Leo tertimbun dahan pohon yang tumbang akibat badai',
          'Leo tersesat di tengah hutan yang gelap',
          'Milo tidak mau berteman dengan Leo'
        ],
        correctOptionIndex: 1,
        explanation: 'Masalah timbul saat badai bertiup dan dahan pohon tumbang menimbun gundukan pasir tempat telur Leo.',
        skillTested: 'Mengidentifikasi Konflik Utama Cerita'
      },
      {
        id: 'q_st1_3',
        prompt: 'Pesan moral atau amanat yang terkandung dalam cerita fabel di atas adalah...',
        type: 'multiple_choice',
        options: [
          'Jangan pernah bermain di pantai saat hujan',
          'Sahabat sejati saling menolong dengan ikhlas tanpa menunggu diminta',
          'Burung maleo harus selalu bertelur di atas pohon tinggi',
          'Musang adalah hewan paling kuat di hutan'
        ],
        correctOptionIndex: 1,
        explanation: 'Milo berkata: "Sahabat sejati selalu ada saat kita membutuhkan bantuan... Kita tak perlu menunggu diminta untuk berbuat baik."',
        skillTested: 'Menentukan Amanat & Pesan Moral'
      }
    ]
  },
  {
    id: 'story_legenda_toba',
    world: 'story',
    level: 'Scholar',
    title: 'Legenda Telaga Bening & Janji yang Ditepati',
    subtitle: 'Cerita Rakyat Nusantara – Analisis Karakter & Inferensi Hikmah',
    category: 'Legenda / Cerita Rakyat',
    authorOrSource: 'Cerita Nusantara V',
    readTimeMinutes: 4,
    text: `Dahulu kala di lereng Bukit Hijau, hidup seorang pemuda jelata bernama **Toba**. Toba adalah pemuda yang rajin bekerja menanam padi dan memancing ikan di sungai. Suatu hari, mata kail Toba menyangkut seekor ikan emas besar ber-sisik berkilauan.

Betapa terkejutnya Toba ketika ikan itu berbicara dengan lembut, "Wahai pemuda yang baik hati, tolong lepaskan aku. Aku adalah putri yang dikutuk."

Toba yang berbelas kasih segera melepas ikan itu kembali ke telaga. Seketika, kilatan cahaya muncul dan ikan tersebut berubah menjadi seorang wanita jelita bernama **Putri Mina**. Sebagai tanda terima kasih, Putri Mina bersedia menjadi istri Toba dengan satu syarat mutlak:

*"Kang Toba, engkau harus berjanji untuk tidak pernah mengungkit asal-usulku bahwa aku berasal dari seekor ikan kepada siapa pun, termasuk anak kita kelak."*

Toba menyanggupi janji tersebut dengan sungguh-sungguh. Tahun demi tahun berlalu, mereka dikaruniai seorang anak laki-laki yang lincah bernama **Samosir**. Samosir tumbuh menjadi anak yang sangat suka bermain, namun terkadang ia lupa waktu dan menghabiskan bekal makan siang ayahnya di ladang.

Suatu siang yang terik, Toba yang sangat lelah dan lapar menanti bekalnya. Ketika Samosir datang membawa tempat bekal yang sudah kosong, amarah Toba memuncak tanpa sadar. 

"Dasar anak tidak tahu diri! Anak ikan!" teriak Toba terpancing emosi.

Seketika langit menjadi hitam pekat. Petir menyambar dan air mata Putri Mina menetes. Janji suci telah terlanggar. Air bah besar keluar dari perut bumi membanjiri seluruh lembah hingga membentuk telaga raksasa yang kini dikenal sebagai **Danau Toba**.`,
    vocabulary: [
      { word: 'Mutlak', meaning: 'Mengenai syarat yang tidak boleh dilanggar atau ditawar lagi.', example: 'Kejujuran adalah syarat mutlak dalam persahabatan.' },
      { word: 'Berbelas kasih', meaning: 'Memiliki rasa kasihan dan keinginan menolong orang/makhluk lain.', example: 'Toba berbelas kasih melepas ikan emas itu.' },
      { word: 'Inferensi', meaning: 'Kesimpulan logika berdasarkan petunjuk dalam bacaan.', example: 'Kita bisa membuat inferensi dari sikap tokoh.' },
    ],
    questions: [
      {
        id: 'q_st2_1',
        prompt: 'Syarat khusus apa yang diberikan Putri Mina ketika menyanggupi menjadi istri Toba?',
        type: 'multiple_choice',
        options: [
          'Toba harus membangunkan rumah emas di tepi danau',
          'Toba tidak boleh mengungkit asal-usul Putri Mina dari seekor ikan kepada siapa pun',
          'Samosir tidak boleh bermain di ladang saat siang hari',
          'Toba harus selalu memberinya makan ikan emas'
        ],
        correctOptionIndex: 1,
        explanation: 'Putri Mina berpesan tidak boleh mengungkit asal-usulnya dari ikan.',
        skillTested: 'Menemukan Perjanjian Tokoh Utama'
      },
      {
        id: 'q_st2_2',
        prompt: 'Penyebab utama terlanggarnya janji Toba adalah...',
        type: 'multiple_choice',
        options: [
          'Toba tidak sengaja terjatuh di sungai',
          'Toba terpesona oleh keindahan bukit',
          'Toba emosi dan tidak mampu mengendalikan amarahnya saat lapar',
          'Samosir menyuruh ayahnya mengucapkan kata tersebut'
        ],
        correctOptionIndex: 2,
        explanation: 'Toba merasa lelah dan lapar, lalu amarahnya memuncak sehingga melontarkan kata rahasia yang melanggar janji.',
        skillTested: 'Menganalisis Latar Belakang Tindakan Tokoh'
      }
    ]
  },

  // --- INFORMATION WORLD ---
  {
    id: 'info_papan_hutan',
    world: 'information',
    level: 'Explorer',
    title: 'Keajaiban Kunang-Kunang: Lampu Hidup di Hutan Malam',
    subtitle: 'Artikel Sains Anak – Teks Eksplanasi Populer',
    category: 'Artikel Sains',
    authorOrSource: 'Majalah Sains Cilik Indonesia',
    readTimeMinutes: 2,
    text: `Pernahkah kamu melihat kelap-kelip cahaya hijau kekuningan di semak-semak saat malam hari? Cahaya indah itu berasal dari **kunang-kunang**!

Kunang-kunang adalah sejenis serangga kecil anggota keluarga kumbang. Mereka memiliki keunikan luar biasa: tubuh mereka bisa memancarkan cahaya sendiri tanpa terasa panas. Cahaya ini dihasilkan dari reaksi kimia di dalam perut kunang-kunang yang disebut **bioluminesensi**.

Mengapa kunang-kunang menyalakan lampunya?
Ada dua alasan utama:
1. **Saling Menyapa**: Cahaya kedip-kedip ini digunakan untuk berkomunikasi dan mencari pasangan sesama kunang-kunang.
2. **Peringatan Bahaya**: Cahaya terang memberi tahu burung atau katak bahwa kunang-kunang memiliki rasa yang pahit, sehingga pemangsa tidak jadi memakannya.

Sayangnya, jumlah kunang-kunang kini mulai berkurang karena tempat tinggal mereka tercemar polusi cahaya lampu kota dan racun pestisida di sawah. Mari kita jaga lingkungan agar kelap-kelip indah kunang-kunang tetap menghiasi malam kita!`,
    vocabulary: [
      { word: 'Bioluminesensi', meaning: 'Pancaran cahaya yang dihasilkan oleh reaksi kimia di dalam tubuh makhluk hidup.', example: 'Kunang-kunang dan beberapa ubur-ubur memiliki bioluminesensi.' },
      { word: 'Serangga', meaning: 'Hewan kecil berukuran ruas yang biasanya memiliki enam kaki.', example: 'Kupu-kupu dan kunang-kunang termasuk jenis serangga.' },
      { word: 'Polusi Cahaya', meaning: 'Penerangan lampu buatan berlebih di malam hari yang mengganggu hewan malam.', example: 'Lampu kota yang terlalu terang menyebabkan polusi cahaya.' },
    ],
    questions: [
      {
        id: 'q_inf1_1',
        prompt: 'Apa istilah ilmiah untuk kemampuan tubuh kunang-kunang yang memancarkan cahaya sendiri?',
        type: 'multiple_choice',
        options: ['Fotosintesis', 'Bioluminesensi', 'Evaporasi', 'Radiasi Listrik'],
        correctOptionIndex: 1,
        explanation: 'Dalam teks disebutkan secara jelas: "reaksi kimia di dalam perut kunang-kunang yang disebut bioluminesensi".',
        skillTested: 'Mengenali Istilah Ilmiah Sains'
      },
      {
        id: 'q_inf1_2',
        prompt: 'Berikut ini yang BUKAN merupakan alasan kunang-kunang menyalakan cahayanya berdasarkan teks adalah...',
        type: 'multiple_choice',
        options: [
          'Untuk saling berkomunikasi mencari pasangan',
          'Memberi peringatan bahaya kepada pemangsa bahwa rasanya pahit',
          'Untuk menghangatkan tubuhnya dari udara dingin malam',
          'Untuk menyapa sesama kunang-kunang'
        ],
        correctOptionIndex: 2,
        explanation: 'Teks menyatakan cahaya kunang-kunang tidak terasa panas dan dinyalakan untuk menyapa serta memberi peringatan rasa pahit.',
        skillTested: 'Memverifikasi Informasi Rinci Teks Sains'
      }
    ]
  },

  // --- DATA WORLD ---
  {
    id: 'data_grafik_hujan',
    world: 'data',
    level: 'Thinker',
    title: 'Grafik Hasil Peminjaman Buku Perpustakaan SD Litera',
    subtitle: 'Membaca Diagram Batang & Menghubungkan Data AKM',
    category: 'Grafik Data & Tabel',
    authorOrSource: 'Tim Perpustakaan Sekolah',
    readTimeMinutes: 3,
    extraData: {
      type: 'infographic_chart',
      chartData: [
        { label: 'Buku Dongeng', value: 120, color: '#10b981' },
        { label: 'Komik Sains', value: 95, color: '#06b6d4' },
        { label: 'Ensiklopedia Hewan', value: 60, color: '#8b5cf6' },
        { label: 'Buku Sejarah Cilik', value: 40, color: '#f59e0b' },
        { label: 'Kamus Bahasa', value: 25, color: '#ec4899' },
      ]
    },
    text: `[LAPORAN PERPUSTAKAAN SD LITERA - BULAN JANUARI]

Tim Perpustakaan Sekolah mencatat jumlah peminjaman buku oleh siswa kelas 1 sampai kelas 6 selama bulan Januari.

DATA PEMINJAMAN BUKU:
- Buku Dongeng & Fabel: 120 kali dipinjam
- Komik Sains Interaktif: 95 kali dipinjam
- Ensiklopedia Hewan & Alam: 60 kali dipinjam
- Buku Sejarah Cilik: 40 kali dipinjam
- Kamus & Leksikon Bahasa: 25 kali dipinjam

Total Seluruh Peminjaman Buku = 340 buku dalam 1 bulan.

Hasil Pengamatan Petugas Perpustakaan:
"Siswa sangat menyukai cerita yang dilengkapi gambar berwarna. Buku dongeng paling banyak dipinjam pada hari Jumat menjelang akhir pekan."`,
    vocabulary: [
      { word: 'Diagram Batang', meaning: 'Gambar grafik berupa batang segi empat untuk menunjukkan perbandingan jumlah data.', example: 'Diagram batang memudahkan membaca data peminjaman buku.' },
      { word: 'Peminjaman', meaning: 'Proses mengambil barang/buku untuk dipakai sementara dan dikembalikan.', example: 'Peminjaman buku dibatasi maksimal 7 hari.' },
    ],
    questions: [
      {
        id: 'q_dt1_1',
        prompt: 'Kategori buku apakah yang paling BANYAK dipinjam oleh siswa SD Litera pada bulan Januari?',
        type: 'multiple_choice',
        options: ['Komik Sains Interaktif', 'Buku Dongeng & Fabel', 'Ensiklopedia Hewan', 'Kamus Bahasa'],
        correctOptionIndex: 1,
        explanation: 'Buku Dongeng & Fabel mencapai angka tertinggi yaitu 120 kali dipinjam.',
        skillTested: 'Membaca Data Nilai Tertinggi Grafik'
      },
      {
        id: 'q_dt1_2',
        prompt: 'Berapa selisih (perbedaan jumlah) antara peminjaman Komik Sains Interaktif dan Ensiklopedia Hewan?',
        type: 'multiple_choice',
        options: ['25 buku', '35 buku', '40 buku', '60 buku'],
        correctOptionIndex: 1,
        explanation: 'Komik Sains = 95, Ensiklopedia = 60. Selisih = 95 - 60 = 35 buku.',
        skillTested: 'Penalaran Berhitung Berdasarkan Grafik'
      }
    ]
  },

  // --- COMMUNICATION WORLD ---
  {
    id: 'comm_email_sahabat',
    world: 'communication',
    level: 'Adventurer',
    title: 'Surat Elektronik (Email) dari Sahabat Pena di Banda Neira',
    subtitle: 'Menganalisis Maksud Pengirim & Tata Krama Berkirim Pesan',
    category: 'Email & Forum',
    authorOrSource: 'Sahabat Pena Literaverse',
    readTimeMinutes: 3,
    text: `Kepada: aura.penjelajah@literaverse.sch.id
Dari: ali.banda@neira.id
Subjek: Salam Hangat dari Kepulauan Rempah Banda!

Halo Aura,

Bagaimana kabarmu di Jawa? Semoga kamu dan keluargamu sehat selalu ya!

Aku senang sekali membaca balasan emailmu minggu lalu. Di tempat tinggalku di Banda Neira, udara sore ini sangat segar. Tadi pagi, aku ikut ayahku naik perahu kora-kora untuk melihat terumbu karang di bawah laut. Air laut di sini bening sekali seperti kaca!

O ya, bulan depan sekolahku akan mengadakan pameran budaya bahari. Aku ingin mengirimkan kenang-kenangan berupa kerajinan kulit kerang buatan tanganku sendiri untukmu. 

Apakah alamat sekolahmu masih di **SD N 1 Cerdas Utama, Jalan Merdeka No. 45, Surabaya**? Tolong beri tahu aku jika alamatmu berubah ya!

Sampai jumpa di balasan email berikutnya!

Sahabatmu,
Ali (Banda Neira)`,
    vocabulary: [
      { word: 'Sahabat Pena', meaning: 'Teman yang saling berkirim surat atau email meskipun berada di kota/daerah berbeda.', example: 'Ali adalah sahabat pena Aura dari Banda Neira.' },
      { word: 'Bahari', meaning: 'Hal yang berhubungan dengan laut dan kelautan.', example: 'Pameran budaya bahari menampilkan kekayaan laut Indonesia.' },
    ],
    questions: [
      {
        id: 'q_cm1_1',
        prompt: 'Tujuan utama Ali mengirimkan email kepada Aura adalah...',
        type: 'multiple_choice',
        options: [
          'Meminta Aura membelikannya perahu kora-kora',
          'Menanyakan dan memastikan alamat sekolah Aura untuk mengirimkan kenang-kenangan kerajinan kerang',
          'Mengundang Aura pindah sekolah ke Banda Neira',
          'Meminta maaf karena tidak sempat membalas email minggu lalu'
        ],
        correctOptionIndex: 1,
        explanation: 'Ali menulis: "Aku ingin mengirimkan kenang-kenangan... Apakah alamat sekolahmu masih di SD N 1 Cerdas Utama...?"',
        skillTested: 'Mengidentifikasi Tujuan Utama Pengirim Pesan'
      },
      {
        id: 'q_cm1_2',
        prompt: 'Bagaimana nada bicara Ali dalam penulisan email di atas?',
        type: 'multiple_choice',
        options: [
          'Marah dan terburu-buru',
          'Resmi dan kaku seperti laporan kantor',
          'Ramah, hangat, dan bersahabat',
          'Sedih dan kecewa'
        ],
        correctOptionIndex: 2,
        explanation: 'Gaya bahasa Ali menggunakan sapaan hangat, menanyakan kabar, dan mengungkapkan rasa senang bersahabat.',
        skillTested: 'Menilai Tonalitas Komunikasi'
      }
    ]
  }
];

export const WRITER_PROMPTS: WriterPrompt[] = [
  {
    id: 'wp_1',
    title: 'Petualangan Kucing Ransel di Pasar Malam',
    level: 'Explorer',
    baseStory: `Oki adalah seekor kucing oranye yang selalu memakai ransel kecil berwarna biru. Di dalam ranselnya, Oki selalu membawa kaca pembesar dan buku catatan kecil. Malam ini, Oki memberanikan diri masuk ke Pasar Malam Kota Litera yang penuh dengan lampu kelap-kelip dan aroma manis harum manis...`,
    instruction: 'Pilih salah satu tantangan menulis di bawah ini untuk mengasah imajinasi dan kemampuan bahasamud:',
    suggestedTasks: [
      {
        id: 'title',
        label: '🏷️ Buat Judul Alternatif',
        placeholder: 'Tuliskan judul baru yang lucu dan bikin orang penasaran (contoh: Rahasia Ransel Biru Si Oki)...'
      },
      {
        id: 'continue',
        label: '✍️ Lanjutkan Cerita',
        placeholder: 'Apa yang ditemukan Oki di pasar malam saat membuka ransel birunya? Tuliskan 2-4 kalimat...'
      },
      {
        id: 'ending',
        label: '🎬 Buat Akhir Cerita (Ending)',
        placeholder: 'Bagaimana Oki kembali pulang ke rumah sebelum pagi tiba? Tuliskan penutup ceritanya...'
      }
    ],
    sampleExample: 'Oki menemukan sebuah komedi putar kuno. Ketika ia mengarahkan kaca pembesarnya, ternyata ada peta rahasia tersembunyi di tiang kayu komedi putar itu!'
  },
  {
    id: 'wp_2',
    title: 'Detektif Cilik Memecahkan Teka-Teki Sepeda Hilang',
    level: 'Thinker',
    baseStory: `Setiap pagi, Danu selalu bersepeda keliling kompleks dengan sepeda hijau kesayangannya. Namun pagi ini, garasi rumahnya terbuka dan sepeda hijaunya menghilang! Di tanah basah dekat pagar, Danu melihat dua jejak sepatu berukuran kecil dan selembar kertas pembungkus permen rasa jeruk...`,
    instruction: 'Gunakan ketelitianmu sebagai detektif cilik untuk menulis kelanjutan kisah ini:',
    suggestedTasks: [
      {
        id: 'continue',
        label: '🔍 Lanjutkan Analisis Detektif',
        placeholder: 'Bagaimana Danu menggunakan jejak sepatu dan pembungkus permen untuk menemukan pelaku? Tuliskan ceritanya...'
      },
      {
        id: 'summary',
        label: '📝 Buat Ringkasan Singkat',
        placeholder: 'Ringkaslah paragraf awal di atas dalam 1 kalimat padat dan jelas...'
      },
      {
        id: 'fix',
        label: '✏️ Perbaiki Kalimat & Tanda Baca',
        placeholder: 'Tuliskan kembali cerita dengan penggunaan tanda titik, koma, dan huruf kapital yang sangat rapi...'
      }
    ],
    sampleExample: 'Danu ingat bahwa hanya Bima teman sekelasnya yang sangat suka permen jeruk. Danu segera berjalan ke rumah Bima dan menemukan sepeda hijaunya dipinjam untuk mengantar kucing sakit ke dokter hewan.'
  }
];
