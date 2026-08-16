// Footer.jsx
// Gabungan contact + footer. Cukup CTA email + link sosial (GitHub,
// LinkedIn) - nomor HP sengaja gak ditampilin di sini, udah ada di CV.

import { profile } from "../../data/profile";
import { useLanguage } from "../../i18n/LanguageContext";

const content = {
  en: {
    label: "Contact",
    heading: "Let's work together — send an email.",
    builtWith: "Built with React + Tailwind CSS.",
    deployed: "Deployed on Vercel",
  },
  id: {
    label: "Kontak",
    heading: "Tertarik kolaborasi? Kirim email aja.",
    builtWith: "Dibangun pakai React + Tailwind CSS.",
    deployed: "Deployed on Vercel",
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language];
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="anchor-offset py-28 bg-surface">
      <div className="section-container">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
          {t.label}
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-5xl max-w-xl mb-8">
          {t.heading}
        </h2>

        <a
          href={`mailto:${profile.socials.email}`}
          className="inline-block font-heading text-xl md:text-2xl text-ink hover:text-accent transition-colors duration-200 break-all mb-14"
        >
          {profile.socials.email}
        </a>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted font-mono mb-16">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-200"
          >
            LinkedIn
          </a>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted">
          <span>
            © {year} {profile.name}. {t.builtWith}
          </span>
          <span>{t.deployed}</span>
        </div>
      </div>
    </footer>
  );
}
