// projects.js
// Data 3 project utama. Field yang teksnya tampil ke pengunjung (title,
// description, features, screen description) disimpan sebagai
// { en, id } karena situsnya dwibahasa. techStack dibiarin string biasa
// karena istilah teknis gak perlu diterjemahin.
//
// Semua gambar diimport langsung dari assets/images biar ke-bundle Vite.
// coverFit: "cover" (default, isi penuh & crop) atau "contain" (dipakai
// buat security_lock.png yang bentuknya ikon, bukan screenshot UI).

import rutanCover from "../assets/images/projek_rutan_ptk_cover.webp";
import iskCover from "../assets/images/projek_skripsi_isk_cover.png";
import securityLockCover from "../assets/images/security_lock.png";

import screenRegister from "../assets/images/projek_pengelola_sandi_register.png";
import screenLogin from "../assets/images/projek_pengelola_sandi_login.png";
import screenHome from "../assets/images/projek_pengelola_sandi_home.png";
import screenProfile from "../assets/images/projek_pengelola_sandi_profile.png";
import screenSettings from "../assets/images/projek_pengelola_sandi_settings.png";
import screenAddEdit from "../assets/images/projek_pengelola_sandi_add_edit.png";
import screenDetail from "../assets/images/projek_pengelola_sandi_detail.png";
import screenReset from "../assets/images/projek_pengelola_sandi_reset.png";

export const projects = [
  {
    id: "rutan-pontianak",
    title: {
      en: "Rutan Pontianak Institutional Website",
      id: "Website Profil Instansi Rutan Pontianak",
    },
    showcaseType: "live-demo",
    demoUrl: "http://daffapratama-rutanptk-demo.infinityfreeapp.com/",
    cover: rutanCover,
    coverFit: "cover",
    description: {
      en: "A personal project built to support a government institution's digital initiative, developed independently from scratch using a simple MVC-style architecture with no framework. It covers a public-facing side for information transparency, plus a custom admin CMS for managing news, staff data (including Excel import), and visitor statistics.",
      id: "Personal project yang dikembangkan untuk mendukung inisiatif digitalisasi sebuah instansi pemerintah, dibangun dari nol secara mandiri dengan arsitektur mirip MVC yang sederhana tanpa framework. Ada sisi publik buat transparansi informasi ke masyarakat, dan sisi admin (CMS custom) buat manajemen berita, data pegawai (termasuk import dari Excel), sama statistik kunjungan.",
    },
    techStack: [
      "PHP Native (Procedural)",
      "MySQL (mysqli)",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
    features: {
      en: [
        "CSRF token protection on every form",
        "Brute-force rate limiting on login",
        "Strict file upload validation (type, size, extension)",
        "Prepared statements to prevent SQL Injection",
      ],
      id: [
        "Proteksi CSRF token di tiap form",
        "Rate limiting anti brute-force pas login",
        "Validasi upload file ketat (tipe, ukuran, ekstensi)",
        "Prepared statements buat cegah SQL Injection",
      ],
    },
    screens: [],
  },

  {
    id: "password-manager-diskominfo",
    title: {
      en: "Password Manager App — Diskominfo Kubu Raya",
      id: "Aplikasi Pengelola Sandi — Diskominfo Kubu Raya",
    },
    showcaseType: "case-study",
    demoUrl: "",
    cover: securityLockCover,
    coverFit: "contain",
    description: {
      en: "A fully offline Android app for securely storing institutional credentials, built as an internship (Kerja Praktik) project in the 8th semester. Security was treated as a core requirement, not an afterthought — from database encryption to detecting passwords that have become outdated.",
      id: "Aplikasi Android fully offline buat nyimpen kredensial instansi, dibangun sebagai project Kerja Praktik semester 8. Dari sisi keamanan digarap serius: enkripsi database sampai deteksi umur sandi yang udah rawan.",
    },
    techStack: [
      "Android Studio (Java)",
      "SQLCipher",
      "SQLite",
      "PBKDF2",
      "EncryptedSharedPreferences",
    ],
    features: {
      en: [
        "Database encryption with SQLCipher",
        "Master password to lock the entire app",
        "Session management & automatic auto-lock",
        "Periodic password change reminders",
        "Vulnerability detection based on password age",
      ],
      id: [
        "Enkripsi database pakai SQLCipher",
        "Master password buat ngunci seluruh aplikasi",
        "Session management & auto-lock otomatis",
        "Reminder ganti sandi berkala",
        "Deteksi kerentanan berdasarkan umur sandi",
      ],
    },
    // urutan sengaja: Register duluan (proses awal instalasi) baru Login.
    // Tambah/Edit dan Detail dipisah jadi 2 layar screenshot yang beda.
    screens: [
      {
        label: { en: "Register", id: "Register" },
        description: {
          en: "Only shown once, during the app's first installation.",
          id: "Cuma muncul sekali, pas instalasi pertama kali.",
        },
        src: screenRegister,
      },
      {
        label: { en: "Login", id: "Login" },
        description: {
          en: "Sign-in screen using the master password.",
          id: "Halaman masuk pakai master password.",
        },
        src: screenLogin,
      },
      {
        label: { en: "Home", id: "Home" },
        description: {
          en: "List of all saved passwords, grouped by category.",
          id: "List seluruh sandi tersimpan, dikelompokkan per kategori.",
        },
        src: screenHome,
      },
      {
        label: { en: "Profile", id: "Profile" },
        description: {
          en: "Category statistics, username, and recovery email.",
          id: "Statistik jumlah sandi per kategori, nama pengguna, dan email pemulihan.",
        },
        src: screenProfile,
      },
      {
        label: { en: "Settings", id: "Settings" },
        description: {
          en: "App lock settings, display theme, and account management.",
          id: "Pengaturan kunci aplikasi, tema tampilan, dan manajemen akun.",
        },
        src: screenSettings,
      },
      {
        label: { en: "Add / Edit Password", id: "Tambah / Edit Sandi" },
        description: {
          en: "Form for adding a new password entry or editing an existing one.",
          id: "Form buat nambah entri sandi baru atau ubah yang udah ada.",
        },
        src: screenAddEdit,
      },
      {
        label: { en: "Password Detail", id: "Detail Sandi" },
        description: {
          en: "Full detail view of a single saved password entry.",
          id: "Tampilan detail lengkap dari satu entri sandi tersimpan.",
        },
        src: screenDetail,
      },
      {
        label: { en: "Forgot Master Password", id: "Lupa Master Password" },
        description: {
          en: "A 3-step recovery flow: send a code to the recovery email, enter the OTP, then set a new master password.",
          id: "Alur pemulihan 3 tahap: kirim kode ke email pemulihan, masukkan OTP, lalu ganti master password baru.",
        },
        src: screenReset,
      },
    ],
  },

  {
    id: "skripsi-isk-stacking-ensemble",
    title: {
      en: "UTI Identification — Stacking Ensemble Learning",
      id: "Identifikasi ISK — Stacking Ensemble Learning",
    },
    showcaseType: "live-demo",
    demoUrl:
      "https://identifikasi-isk-stackingensemblelearning-rjowaqwsnghnxmqhrrqr.streamlit.app/",
    cover: iskCover,
    coverFit: "cover",
    description: {
      en: "An undergraduate thesis applying Stacking Ensemble Learning to classify and detect Urinary Tract Infection (UTI) early, based on patients' urinalysis parameters. The model is deployed as an interactive web app using Streamlit.",
      id: "Skripsi yang menerapkan algoritma Stacking Ensemble Learning buat klasifikasi dan identifikasi dini penyakit Infeksi Saluran Kemih (ISK), berdasarkan parameter hasil urinalisis pasien. Model di-deploy jadi web app interaktif pakai Streamlit.",
    },
    techStack: ["Python", "Scikit-learn", "Streamlit", "Pandas"],
    features: {
      en: [
        "UTI classification using a Stacking Ensemble Learning approach",
        "Interactive input of patient urinalysis parameters",
        "Prediction results displayed instantly in the web app",
      ],
      id: [
        "Klasifikasi ISK pakai pendekatan Stacking Ensemble Learning",
        "Input parameter urinalisis pasien secara interaktif",
        "Hasil prediksi langsung ditampilkan di web app",
      ],
    },
    screens: [],
  },
];
