// profile.js
// Data pribadi terpusat. Field yang teksnya beda per bahasa disimpan
// sebagai object { en, id } - komponen tinggal ambil field[language].
// Field yang sifatnya proper noun / data teknis (nama, email, link) tetep
// string biasa karena gak perlu diterjemahin.

import cvFile from "/src/assets/CV_Daffa_Pratama_2026.pdf";

export const profile = {
  name: "Daffa Pratama",
  brand: "DAFFA.",

  role: {
    en: "Full-stack Web Developer",
    id: "Full-stack Web Developer",
  },

  tagline: {
    en: "Building web apps, mobile apps, and machine learning solutions — from idea to deployment.",
    id: "Membangun aplikasi web, mobile, dan solusi machine learning dari ide sampai deployment.",
  },

  education: {
    degree: { en: "B.Sc. in Informatics", id: "S1 Informatika" },
    university: "Universitas Muhammadiyah Pontianak",
    status: { en: "Fresh Graduate", id: "Fresh Graduate" },
    achievement: {
      en: "Best Graduate Award, Informatics Engineering (2026) · Ranked 2nd out of 370 university-wide graduates with a 3.94/4.00 GPA",
      id: "Penghargaan Lulusan Terbaik, Teknik Informatika (2026) · Peringkat ke-2 dari 370 wisudawan universitas dengan IPK 3,94/4,00",
    },
    // cuma tanggal lulus (ijazah) yang ditampilin, sidang & wisuda gak perlu
    graduationDate: "November 2025",
  },

  focusAreas: [
    { en: "Web Development (Full-stack)", id: "Web Development (Full-stack)" },
    {
      en: "Mobile App Development (Android)",
      id: "Mobile Apps Development (Android)",
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

  navLinks: [
    { href: "#home", label: { en: "Home", id: "Beranda" } },
    { href: "#about", label: { en: "About", id: "Tentang" } },
    { href: "#skills", label: { en: "Skills", id: "Keahlian" } },
    { href: "#projects", label: { en: "Projects", id: "Proyek" } },
    { href: "#contact", label: { en: "Contact", id: "Kontak" } },
  ],
};
