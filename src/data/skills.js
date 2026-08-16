// skills.js
// Data buat section "Skills" - showcase semua tech stack sekaligus di
// atas Projects, dikelompokkan per bidang fokus. Item tiap kelompok
// diambil dari tech stack yang beneran dipakai di project masing-masing
// (lihat data/projects.js), jadi gak ada yang di-fabrikasi.
//
// Pengecualian: React & Tailwind CSS ditambahin ke kelompok Web karena
// dipakai buat bangun portfolio ini sendiri.

export const skillGroups = [
  {
    category: { en: "Web Development", id: "Web Development" },
    items: [
      "PHP",
      "MySQL",
      "JavaScript",
      "HTML5",
      "CSS3",
      "React",
      "Tailwind CSS",
    ],
  },
  {
    category: { en: "Mobile Development", id: "Mobile Development" },
    items: [
      "Android Studio (Java)",
      "SQLite",
      "SQLCipher",
      "PBKDF2",
      "EncryptedSharedPreferences",
    ],
  },
  {
    category: { en: "Machine Learning", id: "Machine Learning" },
    items: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
  },
];
