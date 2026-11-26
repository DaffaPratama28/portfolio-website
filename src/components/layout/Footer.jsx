// Footer.jsx
// Gabungan contact + footer. Cukup CTA email + link sosial (GitHub,
// LinkedIn) + CV - nomor HP sengaja gak ditampilin di sini, udah ada
// di CV.

import { profile } from "../../data/profile";
import { useLanguage } from "../../i18n/useLanguage";
import SectionHeading from "../ui/SectionHeading";

const content = {
  en: {
    label: "Contact",
    heading: "Let's work together — send an email.",
    cv: "CV",
    builtWith: "Built with React + Tailwind CSS.",
    deployed: "Deployed on Vercel",
  },
  id: {
    label: "Kontak",
    heading: "Tertarik berkolaborasi? Silakan kirim email.",
    cv: "CV",
    builtWith: "Dibangun dengan React + Tailwind CSS.",
    deployed: "Di-hosting di Vercel",
  },
};

const linkClass = "hover:text-accent transition-colors duration-200";

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language];
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="anchor-offset py-20 md:py-28 bg-surface">
      <div className="section-container">
        <SectionHeading
          label={t.label}
          title={t.heading}
          className="text-3xl md:text-5xl max-w-xl mb-8"
        />

        <a
          href={`mailto:${profile.socials.email}`}
          className="inline-block font-heading text-lg sm:text-xl md:text-2xl text-ink hover:text-accent transition-colors duration-200 [overflow-wrap:anywhere] mb-12 md:mb-14"
        >
          {profile.socials.email}
        </a>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted font-mono mb-12 md:mb-16">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
          <a
            href={profile.cvUrl}
            download={profile.cvFileName}
            className={linkClass}
          >
            {t.cv}
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
