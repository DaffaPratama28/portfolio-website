// ScreenGallery.jsx
// Grid screenshot layar aplikasi (dipakai project case study) + lightbox
// buat lihat versi besarnya. Lightbox pakai <dialog> native + showModal()
// jadi focus trap & balikin fokus ke thumbnail udah ditangani browser.
//
// Navigasi: tombol prev/next, titik indikator, panah kiri/kanan di
// keyboard, dan swipe di HP. Gambar slide masuk dari arah navigasi,
// lightbox fade + scale pas buka/tutup.
//
// Layout lightbox sengaja tinggi-tetap (top bar, caption, kontrol) dan
// cuma area gambar yang fleksibel - jadi deskripsi yang lebih panjang
// gak bikin gambar & tombol loncat posisi pas pindah layar.

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";

const content = {
  en: {
    enlarge: "View larger",
    close: "Close",
    prev: "Previous screen",
    next: "Next screen",
    goTo: "Go to screen",
    swipeHint: "Swipe to browse",
  },
  id: {
    enlarge: "Perbesar",
    close: "Tutup",
    prev: "Layar sebelumnya",
    next: "Layar berikutnya",
    goTo: "Ke layar",
    swipeHint: "Geser untuk melihat lainnya",
  },
};

const CLOSE_DURATION = 200; // samain sama --animate-lightbox-out
const SWIPE_THRESHOLD = 50; // px minimal geseran biar dianggap swipe

const iconButtonClass =
  "shrink-0 p-2.5 text-muted hover:text-accent border border-border hover:border-accent transition-colors duration-200";

const pad = (n) => String(n).padStart(2, "0");

function Chevron({ direction }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );
}

export default function ScreenGallery({ screens }) {
  const { language } = useLanguage();
  const t = content[language];

  const [openIndex, setOpenIndex] = useState(null);
  // arah navigasi terakhir: 1 = maju (slide dari kanan), -1 = mundur
  const [direction, setDirection] = useState(0);
  const [closing, setClosing] = useState(false);

  const dialogRef = useRef(null);
  const closeTimer = useRef(null);
  const touchStart = useRef(null);

  const isOpen = openIndex !== null;

  // sinkronin state React <-> status buka/tutup <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const open = (i) => {
    clearTimeout(closeTimer.current);
    setClosing(false);
    setDirection(0);
    setOpenIndex(i);
  };

  // tutup pakai animasi dulu, baru beneran close setelah animasi selesai
  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setOpenIndex(null);
      setClosing(false);
    }, CLOSE_DURATION);
  };

  const go = (step) => {
    setDirection(step);
    setOpenIndex((i) => (i + step + screens.length) % screens.length);
  };

  const goTo = (i) => {
    if (i === openIndex) return;
    setDirection(i > openIndex ? 1 : -1);
    setOpenIndex(i);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  // Escape: cegah dialog langsung nutup, ganti pakai tutup beranimasi
  const onCancel = (e) => {
    e.preventDefault();
    requestClose();
  };

  // klik yang kena dialog/wrapper kosong (bukan gambar/tombol) = backdrop
  const onClick = (e) => {
    if (e.target === e.currentTarget || e.target.dataset.backdrop) {
      requestClose();
    }
  };

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    // cuma geseran horizontal yang dominan yang dihitung swipe
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
  };

  const current = isOpen ? screens[openIndex] : null;
  const slideClass =
    direction > 0
      ? "animate-slide-in-right"
      : direction < 0
        ? "animate-slide-in-left"
        : "";

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6">
        {screens.map((screen, i) => (
          <figure key={screen.label.en} className="text-left">
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`${t.enlarge}: ${screen.label[language]}`}
              className="group relative block w-full mb-2 overflow-hidden border border-border hover:border-accent cursor-zoom-in transition-colors duration-200"
            >
              <img
                src={screen.src}
                alt={screen.label[language]}
                className="w-full aspect-[9/16] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              {/* ikon perbesar kecil di pojok - petunjuk visual bisa diklik */}
              <span
                className="absolute right-2 bottom-2 bg-bg/80 p-1.5 text-ink transition-colors duration-200 group-hover:text-accent"
                aria-hidden="true"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
            </button>
            <figcaption>
              <span className="block text-sm text-ink font-medium">
                {screen.label[language]}
              </span>
              {/* di HP deskripsi disembunyiin biar grid rapi (panjang
                  teksnya beda-beda) - lengkapnya tampil di lightbox */}
              <span className="hidden sm:block text-xs text-muted mt-0.5">
                {screen.description[language]}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onCancel={onCancel}
        onKeyDown={onKeyDown}
        onClick={onClick}
        aria-label={current ? current.label[language] : undefined}
        className={`m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-ink backdrop:bg-black/90 backdrop:backdrop-blur-sm ${
          closing ? "backdrop:animate-fade-out" : "backdrop:animate-fade-in"
        }`}
      >
        {current && (
          <div
            data-backdrop="true"
            className={`mx-auto flex h-full max-w-3xl flex-col px-4 py-4 sm:py-6 ${
              closing ? "animate-lightbox-out" : "animate-lightbox-in"
            }`}
          >
            {/* top bar: penomoran + tombol tutup */}
            <div
              data-backdrop="true"
              className="flex h-12 shrink-0 items-center justify-between"
            >
              <p className="font-mono text-xs text-muted" aria-live="polite">
                <span className="text-accent">{pad(openIndex + 1)}</span> /{" "}
                {pad(screens.length)}
              </p>
              <button
                type="button"
                onClick={requestClose}
                aria-label={t.close}
                className={iconButtonClass}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* area gambar - satu-satunya bagian yang tingginya fleksibel.
                key={openIndex} bikin <img> di-mount ulang tiap pindah,
                jadi animasi slide-nya keputer lagi. */}
            <div
              data-backdrop="true"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="flex min-h-0 flex-1 items-center justify-center overflow-hidden py-3"
            >
              <img
                key={openIndex}
                src={current.src}
                alt={current.label[language]}
                draggable={false}
                className={`max-h-full max-w-full w-auto select-none object-contain border border-border shadow-2xl shadow-black/60 ${slideClass}`}
              />
            </div>

            {/* caption tinggi tetap biar layout gak loncat */}
            <div
              key={`caption-${openIndex}`}
              className={`h-24 shrink-0 overflow-hidden pt-1 text-center sm:h-20 ${
                direction !== 0 ? "animate-fade-in" : ""
              }`}
            >
              <p className="font-heading text-base font-semibold text-ink">
                {current.label[language]}
              </p>
              <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-muted sm:text-sm">
                {current.description[language]}
              </p>
            </div>

            {/* kontrol: prev, titik indikator, next */}
            <div
              data-backdrop="true"
              className="flex h-12 shrink-0 items-center justify-between gap-4"
            >
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t.prev}
                className={iconButtonClass}
              >
                <Chevron direction="left" />
              </button>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {screens.map((screen, i) => (
                    <button
                      key={screen.label.en}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`${t.goTo} ${i + 1}: ${screen.label[language]}`}
                      aria-current={i === openIndex ? "true" : undefined}
                      className="flex h-6 items-center"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-300 ${
                          i === openIndex
                            ? "w-6 bg-accent"
                            : "w-1.5 bg-muted/50 hover:bg-muted"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="font-mono text-[10px] text-muted sm:hidden">
                  {t.swipeHint}
                </p>
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t.next}
                className={iconButtonClass}
              >
                <Chevron direction="right" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
