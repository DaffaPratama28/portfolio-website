// LanguageContext.jsx
// Context sederhana buat handle bahasa situs (EN default, bisa di-toggle
// ke ID). Dipilih localStorage biar pilihan bahasa pengunjung diinget
// pas mereka balik lagi ke situs ini nanti.

import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // default "en" sesuai request, tapi kalau pengunjung udah pernah
  // pilih bahasa sebelumnya, pakai preferensi itu
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("portfolio-lang") || "en";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-lang", language);
  }, [language]);

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "id" : "en"));

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// custom hook biar tiap komponen tinggal panggil useLanguage() aja,
// gak perlu import useContext + LanguageContext berulang-ulang
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage harus dipanggil di dalam LanguageProvider");
  }
  return ctx;
}
