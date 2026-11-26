// useLanguage.js
// Context + custom hook bahasa dipisah dari LanguageProvider biar file
// komponen cuma ngekspor komponen (syarat Fast Refresh / lint
// react-refresh/only-export-components).

import { createContext, useContext } from "react";

export const LanguageContext = createContext(null);

// tiap komponen tinggal panggil useLanguage() aja, gak perlu import
// useContext + LanguageContext berulang-ulang
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage harus dipanggil di dalam LanguageProvider");
  }
  return ctx;
}
