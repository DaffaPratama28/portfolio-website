// ============================================================================
// profile.js
// Semua data pribadi Daffa disimpan terpusat di sini. Tujuannya: kalau ada
// yang perlu diubah (misal ganti email, tambah link sosial), cukup edit
// file ini saja — tidak perlu bongkar komponen JSX.
// ============================================================================

export const profile = {
  name: "Daffa Pratama",

  // Role singkat, ditampilkan sebagai "typing text" / subtitle di Hero
  role: "Full-stack Web Developer",

  // Beberapa role/fokus lain, dipakai untuk efek teks berganti di Hero
  // (opsional dipakai nanti kalau mau ada animasi ganti-ganti teks)
  roles: [
    "Full-stack Web Developer",
    "Android Developer",
    "Machine Learning Enthusiast",
  ],

  // Deskripsi singkat 1-2 kalimat untuk Hero section
  tagline:
    "Membangun aplikasi web, mobile, dan solusi machine learning dari ide hingga deployment.",

  // --- Status Akademik ---
  education: {
    degree: "S1 Informatika",
    university: "Universitas Muhammadiyah Pontianak",
    status: "Fresh Graduate",
    achievement: "Lulusan Terbaik ke-2 — Wisuda Sarjana ke-34",
    // Timeline penting supaya rapi ditampilkan di About/Hero
    sidang: "Desember 2025",
    ijazah: "November 2025",
    wisuda: "April 2026",
  },

  // 3 fokus keahlian utama, ditampilkan sebagai badge/chip di Hero & About
  focusAreas: [
    "Web Development (Full-stack)",
    "Mobile Apps Development (Android)",
    "Machine Learning",
  ],

  // --- Kontak & Sosial Media ---
  // GANTI value di bawah ini dengan link asli Anda sebelum deploy.
  socials: {
    email: "your.email@example.com", // TODO: ganti dengan email asli
    github: "https://github.com/username", // TODO: ganti username GitHub
    linkedin: "https://linkedin.com/in/username", // TODO: ganti username LinkedIn
    instagram: "", // opsional, kosongkan jika tidak dipakai
  },

  // Path ke file CV. Taruh file CV.pdf Anda di folder /public agar bisa
  // diakses langsung, misal: public/CV-Daffa-Pratama.pdf
  cvUrl: "/CV-Daffa-Pratama.pdf",

  // Link navigasi di Navbar
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
};
