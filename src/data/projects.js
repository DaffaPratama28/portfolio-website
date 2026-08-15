// ============================================================================
// projects.js
// Data 3 proyek utama untuk section "Featured Projects".
// Dipisah dari komponen JSX supaya nanti Projects.jsx tinggal melakukan
// projects.map(...) tanpa perlu hardcode teks di dalam komponen.
//
// Struktur tiap objek proyek:
// - id            : identifier unik (untuk key React)
// - title         : judul proyek
// - showcaseType  : "live-demo" | "case-study" (menentukan tombol apa yang
//                    tampil di ProjectCard — Live Demo vs Lihat Screenshot)
// - demoUrl       : link live demo (kosongkan "" jika showcaseType case-study)
// - description   : deskripsi singkat proyek
// - techStack     : array teknologi yang dipakai (ditampilkan sebagai badge)
// - features      : array fitur/highlight utama (ditampilkan sebagai bullet list)
// - screens       : (khusus case-study) daftar layar/struktur aplikasi
// ============================================================================

export const projects = [
  {
    id: "rutan-pontianak",
    title: "Website Profil Instansi Rutan Pontianak",
    showcaseType: "live-demo",
    demoUrl: "http://daffapratama-rutanptk-demo.infinityfreeapp.com/",
    description:
      "Web portal resmi instansi dengan arsitektur MVC sederhana (tanpa framework). Sisi publik untuk transparansi informasi, dan sisi admin (CMS custom) untuk manajemen berita, data pegawai (termasuk import Excel), dan statistik.",
    techStack: [
      "PHP Native (Procedural)",
      "MySQL (mysqli)",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
    features: [
      "Password hashing dengan password_hash / password_verify",
      "Proteksi CSRF token pada setiap form",
      "Rate limiting anti brute-force pada login",
      "Validasi upload file ketat (tipe, ukuran, ekstensi)",
      "Prepared statements untuk mencegah SQL Injection",
    ],
    screens: [],
  },

  {
    id: "password-manager-diskominfo",
    title: "Aplikasi Pengelola Sandi (Diskominfo Kubu Raya)",
    showcaseType: "case-study",
    demoUrl: "", // tidak ada live demo — aplikasi Android offline
    description:
      "Aplikasi Android fully offline untuk menyimpan kredensial instansi, dikembangkan sebagai proyek Kerja Praktik semester 8.",
    techStack: [
      "Android Studio (Java)",
      "SQLCipher",
      "SQLite",
      "PBKDF2",
      "EncryptedSharedPreferences",
    ],
    features: [
      "Enkripsi database dengan SQLCipher",
      "Master password untuk mengunci seluruh aplikasi",
      "Session management & auto-lock otomatis",
      "Reminder ganti sandi berkala",
      "Deteksi kerentanan berdasarkan umur sandi",
    ],
    // Struktur layar ditampilkan khusus untuk proyek bertipe case-study,
    // sebagai pengganti live demo yang tidak tersedia.
    screens: [
      "Login",
      "Register",
      "Home",
      "Profile",
      "Settings (kunci aplikasi, tema, dll)",
      "Tambah / Edit / Detail Sandi",
      "Lupa Master Password via OTP Email",
    ],
  },

  {
    id: "skripsi-isk-stacking-ensemble",
    title: "Identifikasi ISK — Stacking Ensemble Learning (Skripsi)",
    showcaseType: "live-demo",
    demoUrl:
      "https://identifikasi-isk-stackingensemblelearning-rjowaqwsnghnxmqhrrqr.streamlit.app/",
    description:
      "Penerapan algoritma Stacking Ensemble Learning untuk klasifikasi dan identifikasi dini penyakit Infeksi Saluran Kemih (ISK) berdasarkan hasil parameter urinalisis pasien. Di-deploy menggunakan framework Streamlit.",
    techStack: ["Python", "Scikit-learn", "Streamlit", "Pandas"],
    features: [
      "Klasifikasi ISK menggunakan pendekatan Stacking Ensemble Learning",
      "Input parameter urinalisis pasien secara interaktif",
      "Hasil prediksi ditampilkan langsung di web app",
    ],
    screens: [],
  },
];
