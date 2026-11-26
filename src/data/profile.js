// profile.js
// Data pribadi terpusat. Field yang teksnya beda per bahasa disimpan
// sebagai object { en, id } - komponen tinggal ambil field[language].
// Field yang sifatnya proper noun / data teknis (nama, email, link) tetep
// string biasa karena gak perlu diterjemahin.

import cvFile from "../assets/CV_Daffa_Pratama_2026.pdf";

export const profile = {
  name: "Daffa Pratama",
  brand: "DAFFA.",

  role: {
    en: "Full-stack Web Developer",
    id: "Full-stack Web Developer",
  },

  tagline: {
    en: "Building web apps, mobile apps, and machine learning solutions — from idea to deployment.",
    id: "Membangun aplikasi web, mobile, dan solusi machine learning — dari ide hingga deployment.",
  },

  education: {
    degree: { en: "B.Sc. in Informatics", id: "S1 Informatika" },
    university: "Universitas Muhammadiyah Pontianak",
    status: { en: "Fresh Graduate", id: "Fresh Graduate" },
    achievement: {
      en: "Best Graduate Award, Informatics Engineering (April 2026 Commencement) · Ranked 2nd out of 370 university-wide graduates with a 3.94/4.00 GPA",
      id: "Penghargaan Lulusan Terbaik, Teknik Informatika (Wisuda April 2026) · Peringkat ke-2 dari 370 wisudawan universitas dengan IPK 3,94/4,00",
    },
    // versi ringkas achievement buat Hero, versi lengkapnya di About
    highlight: {
      en: "Best Graduate · Ranked 2nd of 370 · GPA 3.94/4.00",
      id: "Lulusan Terbaik · Peringkat 2 dari 370 · IPK 3,94/4,00",
    },
    // tanggal lulus = tanggal ijazah (Nov 2025). Penghargaan diterima pas
    // wisuda April 2026, makanya keterangan wisuda ada di achievement.
    graduationDate: "November 2025",
  },

  focusAreas: [
    { en: "Web Development (Full-stack)", id: "Web Development (Full-stack)" },
    {
      en: "Mobile App Development (Android)",
      id: "Mobile App Development (Android)",
    },
    { en: "Machine Learning", id: "Machine Learning" },
  ],

  // nomor HP sengaja gak dimasukin ke sini - udah ada di CV, gak perlu
  // ditampilin publik di halaman web
  socials: {
    email: "daffapratama28052003@gmail.com",
    github: "https://github.com/DaffaPratama28",
    linkedin: "https://www.linkedin.com/in/daffa-pratama-6522233a3/",
  },

  cvUrl: cvFile,
  // nama file pas diunduh (tanpa hash dari Vite)
  cvFileName: "CV_Daffa_Pratama_2026.pdf",

  navLinks: [
    { href: "#home", label: { en: "Home", id: "Beranda" } },
    { href: "#about", label: { en: "About", id: "Tentang" } },
    { href: "#skills", label: { en: "Skills", id: "Keahlian" } },
    { href: "#projects", label: { en: "Projects", id: "Proyek" } },
    { href: "#contact", label: { en: "Contact", id: "Kontak" } },
  ],
};
