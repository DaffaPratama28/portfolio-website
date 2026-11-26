// LanguageContext.jsx
// Provider sederhana buat handle bahasa situs (EN default, bisa di-toggle
// ke ID). Dipilih localStorage biar pilihan bahasa pengunjung diinget
// pas mereka balik lagi ke situs ini nanti.

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
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
    // <html lang> ikut bahasa aktif biar screen reader pakai pelafalan
    // yang bener & mesin pencari tau bahasa kontennya
    document.documentElement.lang = language;

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // gak bisa nyimpen preferensi - gak masalah, cuma gak diinget
    }
  }, [language]);

  // ganti bahasa pakai View Transitions API: browser nyimpen snapshot
  // tampilan lama, terus crossfade ke tampilan baru - jadi teks gak
  // tiba-tiba loncat. Bagian yang gak berubah (background, garis,
  // gambar) tetep diem, cuma teks yang ganti yang memudar.
  // flushSync wajib biar DOM baru udah ke-render sebelum snapshot
  // "sesudah" diambil. Browser yang belum support / pengunjung yang
  // nyalain "kurangi animasi" -> langsung ganti tanpa transisi.
  const changeLanguage = (next) => {
    if (next === language || !SUPPORTED.includes(next)) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!document.startViewTransition || reduceMotion) {
      setLanguage(next);
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => setLanguage(next));
    });
  };

  const toggleLanguage = () =>
    changeLanguage(language === "en" ? "id" : "en");

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: changeLanguage, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
