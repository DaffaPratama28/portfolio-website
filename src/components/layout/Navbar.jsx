import { useState } from "react";
import { profile } from "../../data/profile";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-white/5">
      <nav className="section-container flex items-center justify-between py-4">
        {/* Logo / Nama */}
        <a href="#home" className="text-lg font-bold tracking-tight">
          Daffa<span className="text-primary">.dev</span>
        </a>

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted">
          {profile.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-light transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button Desktop */}
        <a
          href="#contact"
          className="hidden md:inline-block bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2 rounded-full transition-colors duration-200"
        >
          Hubungi Saya
        </a>

        {/* Hamburger Menu Mobile */}
        <button
          className="md:hidden text-light"
          onClick={() => setIsOpen(!isOpen)}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6 text-muted bg-dark">
          {profile.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block hover:text-light transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-medium text-center px-5 py-2 rounded-full transition-colors duration-200"
          >
            Hubungi Saya
          </a>
        </ul>
      )}
    </header>
  );
}
