// Navbar.jsx
// Nav minimal: logo kiri, menu + toggle bahasa kanan. Transparan di
// paling atas, jadi solid + border bawah begitu discroll.

import { useEffect, useState } from "react";
import { profile } from "../../data/profile";
import { useLanguage } from "../../i18n/useLanguage";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-bg/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="section-container flex items-center justify-between py-5">
        <a href="#home" className="font-heading font-bold text-lg tracking-widest">
          {profile.brand.slice(0, -1)}
          <span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-8">
          {/* menu desktop */}
          <ul className="hidden md:flex items-center gap-10 text-sm text-muted">
            {profile.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-ink transition-colors duration-200"
                >
                  {link.label[language]}
                </a>
              </li>
            ))}
          </ul>

          {/* toggle bahasa - selalu keliatan baik desktop maupun mobile */}
          <button
            onClick={toggleLanguage}
            className="font-mono text-xs text-muted hover:text-accent border border-border hover:border-accent px-2.5 py-1.5 transition-colors duration-200"
            aria-label="Toggle language"
          >
            {language === "en" ? "ID" : "EN"}
          </button>

          {/* toggle menu mobile */}
          <button
            className="md:hidden text-ink"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-1 px-6 pb-6 bg-bg border-b border-border">
          {profile.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-muted hover:text-ink transition-colors duration-200"
              >
                {link.label[language]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
