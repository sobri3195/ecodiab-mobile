export const heroInsight = {
  title: 'EcoDiab Companion',
  tagline: 'Pendamping harian untuk kendali diabetes yang lebih stabil, aman, dan terukur.',
  ctaPrimary: 'Mulai Cek Harian',
  ctaSecondary: 'Lihat Program 30 Hari',
};

export const deepDiveMetrics = [
  {
    label: 'Rata-rata Gula Darah',
    value: '142 mg/dL',
    trend: '-8% vs minggu lalu',
    interpretation: 'Tren menurun menandakan kepatuhan makan malam dan tidur membaik.',
  },
  {
    label: 'Time in Range',
    value: '71%',
    trend: '+6 poin',
    interpretation: 'Mayoritas pembacaan harian sudah berada di zona aman 80–180 mg/dL.',
  },
  {
    label: 'Konsistensi Aktivitas',
    value: '5/7 hari',
    trend: '+2 hari aktif',
    interpretation: 'Rutinitas jalan 20 menit setelah makan berkontribusi pada stabilitas glukosa.',
  },
  {
    label: 'Kualitas Tidur',
    value: '7j 12m',
    trend: '+38 menit',
    interpretation: 'Durasi tidur membaik, berkorelasi dengan penurunan lonjakan gula pagi.',
  },
];

export const dailySignals = [
  {
    title: 'Sinyal Risiko Pagi',
    level: 'Perlu perhatian',
    detail: 'Terdapat pola kenaikan gula pukul 05:00–07:00. Pertimbangkan evaluasi snack larut malam.',
  },
  {
    title: 'Pola Makan Siang',
    level: 'Membaik',
    detail: 'Respon glukosa setelah makan siang lebih landai dalam 4 hari terakhir.',
  },
  {
    title: 'Hidrasi & Aktivitas',
    level: 'Stabil',
    detail: 'Asupan air cukup dan langkah harian >6.000 pada 3 hari berturut-turut.',
  },
];

export const actionPlans = [
  'Aktifkan pengingat cek gula: sebelum sarapan & 2 jam setelah makan malam.',
  'Pertahankan porsi karbo kompleks di malam hari selama 5 hari ke depan.',
  'Lakukan jalan santai 15–20 menit setelah makan utama.',
  'Kirim ringkasan mingguan ke pendamping/konselor untuk evaluasi personal.',
];

export const knowledgeHighlights = [
  {
    title: 'Mengapa gula darah pagi bisa tinggi?',
    summary: 'Fenomena dawn effect dipengaruhi hormon dini hari. Penyesuaian pola tidur dan makan malam dapat membantu.',
    duration: 'Baca 4 menit',
  },
  {
    title: 'Strategi piring makan ramah diabetes',
    summary: 'Panduan 50-25-25: sayur non-tepung, protein berkualitas, karbo kompleks.',
    duration: 'Baca 6 menit',
  },
  {
    title: 'Checklist aktivitas ringan harian',
    summary: 'Kumpulan gerak ringan yang aman dan konsisten untuk menjaga sensitivitas insulin.',
    duration: 'Baca 5 menit',
  },
];

export const progressTimeline = [
  '06:30 · Cek gula puasa tercatat 128 mg/dL (lebih rendah dari rerata minggu lalu).',
  '12:45 · Makan siang dengan porsi serat tinggi, estimasi beban glikemik moderat.',
  '16:10 · Jalan ringan 18 menit, efek penurunan gula terpantau 2 jam berikutnya.',
  '21:00 · Reminder hidrasi & tidur terkirim untuk menjaga pola metabolik esok hari.',
];

export const moduleDetailMap: Record<string, { heading: string; points: string[] }> = {
  edukasi: {
    heading: 'Ruang belajar berbasis kebutuhan harian',
    points: [
      'Kurikulum mikro: nutrisi, aktivitas, obat, dan manajemen stres.',
      'Materi adaptif sesuai pola gula darah dan kebiasaan pengguna.',
      'Ringkasan akhir pekan untuk menilai kemajuan pembelajaran.',
    ],
  },
  tracker: {
    heading: 'Pemantauan terpadu dalam satu layar',
    points: [
      'Input gula darah, makan, aktivitas, tidur, dan gejala dengan cepat.',
      'Insight otomatis tentang pemicu lonjakan dan pola perbaikan.',
      'Grafik mingguan untuk diskusi dengan tenaga kesehatan.',
    ],
  },
  komunitas: {
    heading: 'Dukungan sesama pejuang diabetes',
    points: [
      'Forum tantangan harian agar konsistensi lebih terjaga.',
      'Sesi berbagi pengalaman dan tips realistis dari anggota komunitas.',
      'Moderasi konten untuk menjaga keamanan dan kualitas diskusi.',
    ],
  },
  profil: {
    heading: 'Profil kesehatan yang selalu siap dipakai',
    points: [
      'Riwayat medis ringkas, obat, alergi, dan target pribadi.',
      'Preferensi notifikasi, bahasa, dan ritme pengingat.',
      'Ekspor ringkasan progres untuk konsultasi daring/luring.',
    ],
  },
  konsultasi: {
    heading: 'Pendampingan dengan alur yang ringkas',
    points: [
      'Antrian konsultasi berdasarkan prioritas kondisi.',
      'Pra-konsultasi otomatis dengan data 7 hari terakhir.',
      'Catatan tindak lanjut agar rekomendasi lebih mudah dijalankan.',
    ],
  },
  artikel: {
    heading: 'Perpustakaan konten terpercaya',
    points: [
      'Kurasi artikel evidence-based yang mudah dipahami.',
      'Filter berdasarkan topik: nutrisi, insulin, mental wellbeing, dan olahraga.',
      'Bookmark materi penting untuk dibaca ulang.',
    ],
  },
  tantangan: {
    heading: 'Gamifikasi untuk menjaga motivasi',
    points: [
      'Target personal mingguan dengan level progres yang jelas.',
      'Lencana capaian untuk perilaku sehat yang konsisten.',
      'Misi komunitas agar perubahan terasa lebih menyenangkan.',
    ],
  },
};
