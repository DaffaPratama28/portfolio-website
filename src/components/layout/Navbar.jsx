// Navbar.jsx
// Nav minimal: logo kiri, menu + toggle bahasa kanan. Transparan di
// paling atas, jadi solid + border bawah begitu discroll. Link section
// yang lagi keliatan di layar ditandain aktif (scrollspy sederhana).
//
// Di HP, menu jadi overlay full screen: kebuka pakai efek lingkaran
// yang melebar dari tombol hamburger (clip-path), link-nya muncul
// bergantian (stagger), dan ikon hamburger berubah jadi X.

import { useEffect, useRef, useState } from "react";
import { profile } from "../../data/profile";
import { useLanguage } from "../../i18n/useLanguage";

const content = {
  en: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileNav: "Main menu",
    languageGroup: "Language",
    switchTo: { en: "English", id: "Bahasa Indonesia" },
    getInTouch: "Get in touch",
  },
  id: {
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    mobileNav: "Menu utama",
    languageGroup: "Bahasa",
    switchTo: { en: "English", id: "Bahasa Indonesia" },
    getInTouch: "Mari terhubung",
  },
};

const LANGUAGES = ["en", "id"];
const sectionIds = profile.navLinks.map((link) => link.href.slice(1));

// titik awal lingkaran clip-path = kira-kira posisi tombol hamburger
const CLIP_ORIGIN = "calc(100% - 2.75rem) 2.25rem";

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

// delay muncul tiap item menu mobile - pas nutup, semua langsung hilang
const stagger = (isOpen, i) => ({
  transitionDelay: isOpen ? `${150 + i * 60}ms` : "0ms",
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const { language, setLanguage } = useLanguage();
  const t = content[language];

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

  // menu mobile: tutup pakai Escape, dan otomatis tutup kalau layar
  // dilebarin ke ukuran desktop (overlay-nya md:hidden, tapi kunci
  // scroll halaman bakal nyangkut kalau state-nya masih "open")
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = (e) => e.matches && setIsOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [isOpen]);

  const isActive = (href) => href.slice(1) === activeId;
  const currentProps = (href) =>
    isActive(href) ? { "aria-current": "true" } : {};

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isOpen
            ? "bg-transparent border-b border-transparent"
            : scrolled
              ? "bg-bg/95 backdrop-blur-sm border-b border-border"
              : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="section-container flex items-center justify-between py-4">
          <a
            href="#home"
            onClick={() => setIsOpen(false)}
            className="font-heading font-bold text-lg tracking-widest py-1"
          >
            {profile.brand.slice(0, -1)}
            <span className="text-accent">.</span>
          </a>

          <div className="flex items-center gap-4 md:gap-8">
            {/* menu desktop */}
            <ul className="hidden md:flex items-center gap-10 text-sm">
              {profile.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...currentProps(link.href)}
                    className={`relative py-1 transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-accent after:transition-all after:duration-300 ${
                      isActive(link.href)
                        ? "text-ink after:w-full"
                        : "text-muted hover:text-ink after:w-0"
                    }`}
                  >
                    {link.label[language]}
                  </a>
                </li>
              ))}
            </ul>

            {/* toggle bahasa EN | ID - bahasa aktif disorot, selalu keliatan */}
            <div
              role="group"
              aria-label={t.languageGroup}
              className="flex items-center border border-border font-mono text-xs"
            >
              {LANGUAGES.map((lang) => {
                const active = language === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    lang={lang}
                    onClick={() => setLanguage(lang)}
                    aria-pressed={active}
                    aria-label={t.switchTo[lang]}
                    className={`px-2.5 py-1.5 transition-colors duration-200 ${
                      active ? "bg-accent text-bg" : "text-muted hover:text-ink"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                );
              })}
            </div>

            {/* hamburger -> X, 3 garis yang dianimasiin. Padding biar
                area sentuh ±40px */}
            <button
              ref={menuButtonRef}
              type="button"
              className="md:hidden text-ink p-2 -mr-2"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? t.closeMenu : t.openMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-4 w-6" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-6 bg-current transition-transform duration-300 ease-out ${
                    isOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-[1.5px] bg-current transition-all duration-300 ease-out ${
                    isOpen ? "w-0 opacity-0" : "w-4 opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-[1.5px] w-6 bg-current transition-transform duration-300 ease-out ${
                    isOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* overlay menu mobile full screen. Selalu di-render biar transisi
          buka/tutup jalan; pas ketutup dibikin inert (gak bisa difokus/
          diklik) + invisible. */}
      <div
        id="mobile-menu"
        data-open={isOpen}
        inert={!isOpen}
        style={{
          clipPath: isOpen
            ? `circle(150% at ${CLIP_ORIGIN})`
            : `circle(0% at ${CLIP_ORIGIN})`,
        }}
        className={`md:hidden fixed inset-0 z-40 flex flex-col bg-bg transition-[clip-path,visibility] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* garis aksen tipis di kiri, cuma dekorasi */}
        <div
          className="pointer-events-none absolute left-6 top-24 bottom-28 w-px bg-border"
          aria-hidden="true"
        />

        <nav
          aria-label={t.mobileNav}
          className="flex flex-1 flex-col justify-center pl-12 pr-6 pt-20"
        >
          <ul className="flex flex-col gap-1">
            {profile.navLinks.map((link, i) => (
              <li
                key={link.href}
                style={stagger(isOpen, i)}
                className={`transition-all duration-500 ease-out ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <a
                  href={link.href}
                  {...currentProps(link.href)}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-baseline gap-4 py-2.5 font-heading text-4xl font-bold transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-accent"
                      : "text-ink active:text-accent"
                  }`}
                >
                  <span
                    className="font-mono text-xs font-normal text-muted"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label[language]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* kontak singkat di bawah */}
        <div
          style={stagger(isOpen, profile.navLinks.length)}
          className={`border-t border-border px-6 py-6 transition-all duration-500 ease-out ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-2">
            {t.getInTouch}
          </p>
          <a
            href={`mailto:${profile.socials.email}`}
            className="block text-sm text-ink mb-4 [overflow-wrap:anywhere]"
          >
            {profile.socials.email}
          </a>
          <div className="flex gap-6 font-mono text-xs text-muted">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={profile.cvUrl} download={profile.cvFileName}>
              CV
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
