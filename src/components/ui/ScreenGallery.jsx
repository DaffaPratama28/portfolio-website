// ScreenGallery.jsx
// Grid screenshot layar aplikasi (dipakai project case study) + lightbox
// buat lihat versi besarnya. Lightbox pakai <dialog> native + showModal()
// jadi Escape, focus trap, dan balikin fokus ke thumbnail udah ditangani
// browser. Navigasi: tombol prev/next, panah kiri/kanan di keyboard,
// klik area gelap di luar gambar buat nutup.

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";

const content = {
  en: {
    enlarge: "View larger",
    close: "Close",
    prev: "Previous screen",
    next: "Next screen",
  },
  id: {
    enlarge: "Perbesar",
    close: "Tutup",
    prev: "Layar sebelumnya",
    next: "Layar berikutnya",
  },
};

const navButtonClass =
  "shrink-0 p-2 sm:p-3 text-muted hover:text-accent border border-border hover:border-accent bg-bg/80 transition-colors duration-200";

export default function ScreenGallery({ screens }) {
  const { language } = useLanguage();
  const t = content[language];
  const [openIndex, setOpenIndex] = useState(null);
  const dialogRef = useRef(null);
  const isOpen = openIndex !== null;

  // sinkronin state React <-> status buka/tutup <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const go = (step) =>
    setOpenIndex((i) => (i + step + screens.length) % screens.length);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  // klik yang kena dialog/wrapper (bukan gambar/tombol) = klik backdrop
  const onClick = (e) => {
    if (e.target === e.currentTarget || e.target.dataset.backdrop) {
      setOpenIndex(null);
    }
  };

  const current = isOpen ? screens[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {screens.map((screen, i) => (
          <figure key={screen.label.en} className="text-left">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${t.enlarge}: ${screen.label[language]}`}
              className="group block w-full mb-2 cursor-zoom-in"
            >
              <img
                src={screen.src}
                alt={screen.label[language]}
                className="w-full aspect-[9/16] object-cover border border-border group-hover:border-accent transition-colors duration-200"
                loading="lazy"
              />
            </button>
            <figcaption>
              <span className="block text-sm text-ink font-medium">
                {screen.label[language]}
              </span>
              <span className="block text-xs text-muted mt-0.5">
                {screen.description[language]}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onKeyDown={onKeyDown}
        onClick={onClick}
        aria-label={current ? current.label[language] : undefined}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-ink backdrop:bg-black/90 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div
            data-backdrop="true"
            className="flex h-full flex-col items-center justify-center gap-4 px-4 py-6"
          >
            <div
              data-backdrop="true"
              className="flex w-full max-w-3xl items-center justify-end"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label={t.close}
                className={navButtonClass}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              data-backdrop="true"
              className="flex min-h-0 w-full max-w-3xl flex-1 items-center justify-between gap-2 sm:gap-4"
            >
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t.prev}
                className={navButtonClass}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <img
                src={current.src}
                alt={current.label[language]}
                className="max-h-full min-w-0 w-auto object-contain border border-border"
              />

              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t.next}
                className={navButtonClass}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="max-w-md text-center" aria-live="polite">
              <p className="font-mono text-xs text-muted mb-1">
                {openIndex + 1} / {screens.length}
              </p>
              <p className="text-sm font-medium text-ink">
                {current.label[language]}
              </p>
              <p className="text-xs text-muted mt-0.5">
                {current.description[language]}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
