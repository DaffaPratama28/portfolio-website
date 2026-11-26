// LanguageContext.jsx
// Provider sederhana buat handle bahasa situs (EN default, bisa di-toggle
// ke ID). Dipilih localStorage biar pilihan bahasa pengunjung diinget
// pas mereka balik lagi ke situs ini nanti.

import { useEffect, useState } from "react";
import { LanguageContext } from "./useLanguage";

const STORAGE_KEY = "portfolio-lang";
const SUPPORTED = ["en", "id"];

// localStorage bisa throw (storage diblokir, mode privasi ketat, webview
// tertentu) - dibungkus try/catch biar situs tetep jalan pakai default
function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(stored) ? stored : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }) {
  // default "en", tapi kalau pengunjung udah pernah pilih bahasa
  // sebelumnya, pakai preferensi itu
  const [language, setLanguage] = useState(readStoredLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // gak bisa nyimpen preferensi - gak masalah, cuma gak diinget
    }
  }, [language]);

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "id" : "en"));

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
