// Navbar.jsx
// Nav minimal: logo kiri, menu + toggle bahasa kanan. Transparan di
// paling atas, jadi solid + border bawah begitu discroll. Link section
// yang lagi keliatan di layar ditandain aktif (scrollspy sederhana).

import { useEffect, useRef, useState } from "react";
import { profile } from "../../data/profile";
import { useLanguage } from "../../i18n/useLanguage";

const content = {
  en: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageGroup: "Language",
    switchTo: { en: "English", id: "Bahasa Indonesia" },
  },
  id: {
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    languageGroup: "Bahasa",
    switchTo: { en: "English", id: "Bahasa Indonesia" },
  },
};

const LANGUAGES = ["en", "id"];
const sectionIds = profile.navLinks.map((link) => link.href.slice(1));

// section aktif = section terakhir yang bagian atasnya udah ngelewatin
// ~40% tinggi layar. Kalau udah mentok bawah, paksa section terakhir
// (Contact pendek, gak bakal nyampe 40% layar).
function getActiveSection() {
  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;
  if (atBottom) return sectionIds[sectionIds.length - 1];

  const threshold = window.innerHeight * 0.4;
  let active = sectionIds[0];
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= threshold) active = id;
  }
  return active;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const { language, setLanguage } = useLanguage();
  const t = content[language];

  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setActiveId(getActiveSection());
    };
    // dipanggil sekali di awal: kalau halaman di-refresh di tengah,
    // navbar langsung solid tanpa nunggu event scroll berikutnya
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // menu mobile: tutup pakai Escape atau klik/tap di luar navbar
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (!headerRef.current?.contains(e.target)) setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  const linkState = (href) => {
    const isActive = href.slice(1) === activeId;
    return {
      isActive,
      props: isActive ? { "aria-current": "true" } : {},
    };
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled || isOpen
          ? "bg-bg/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="section-container flex items-center justify-between py-4">
        <a
          href="#home"
          className="font-heading font-bold text-lg tracking-widest py-1"
        >
          {profile.brand.slice(0, -1)}
          <span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-6 md:gap-8">
          {/* menu desktop */}
          <ul className="hidden md:flex items-center gap-10 text-sm">
            {profile.navLinks.map((link) => {
              const { isActive, props } = linkState(link.href);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...props}
                    className={`relative py-1 transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-accent after:transition-all after:duration-300 ${
                      isActive
                        ? "text-ink after:w-full"
                        : "text-muted hover:text-ink after:w-0"
                    }`}
                  >
                    {link.label[language]}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* toggle bahasa EN | ID - bahasa aktif disorot, selalu keliatan */}
          <div
            role="group"
            aria-label={t.languageGroup}
            className="flex items-center border border-border font-mono text-xs"
          >
            {LANGUAGES.map((lang) => {
              const isActive = language === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  lang={lang}
                  onClick={() => setLanguage(lang)}
                  aria-pressed={isActive}
                  aria-label={t.switchTo[lang]}
                  className={`px-2.5 py-1.5 transition-colors duration-200 ${
                    isActive
                      ? "bg-accent text-bg"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* toggle menu mobile - padding biar area sentuh ±40px */}
          <button
            ref={menuButtonRef}
            type="button"
            className="md:hidden text-ink p-2 -mr-2"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? t.closeMenu : t.openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* dropdown menu mobile */}
      <ul
        id="mobile-menu"
        hidden={!isOpen}
        className="md:hidden flex flex-col gap-1 px-6 pb-6"
      >
        {profile.navLinks.map((link) => {
          const { isActive, props } = linkState(link.href);
          return (
            <li key={link.href}>
              <a
                href={link.href}
                {...props}
                onClick={() => setIsOpen(false)}
                className={`block py-2.5 transition-colors duration-200 ${
                  isActive ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {link.label[language]}
              </a>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
