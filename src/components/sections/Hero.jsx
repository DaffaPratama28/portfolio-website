// Hero.jsx
// Section pembuka, left-aligned & text-heavy. Semua string UI lokal
// disimpan di object `content` di bawah biar gampang dibaca perbedaan
// versi EN vs ID-nya berdampingan. Detail pendidikan & fokus keahlian
// sengaja gak diulang di sini (udah ada di About) - cukup highlight
// singkat prestasi.

import { profile } from "../../data/profile";
import { useLanguage } from "../../i18n/useLanguage";

const content = {
  en: { viewProjects: "View Projects", downloadCV: "Download CV" },
  id: { viewProjects: "Lihat Proyek", downloadCV: "Unduh CV" },
};

// kata terakhir nama dikasih warna aksen, sisanya warna biasa
const nameParts = profile.name.split(" ");
const lastName = nameParts.pop();
const firstNames = nameParts.join(" ");

export default function Hero() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section
      id="home"
      className="anchor-offset min-h-svh flex items-center border-b border-border"
    >
      <div className="section-container w-full py-28 md:py-32">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-6">
          // {profile.education.status[language]} — {profile.education.university}
        </p>

        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-7xl leading-[1.1] mb-6 max-w-3xl">
          {firstNames}{" "}
          <span className="text-accent">{lastName}</span>
        </h1>

        <div className="w-16 h-px bg-accent mb-6" />

        <p className="text-lg md:text-xl text-ink max-w-xl mb-3">
          {profile.role[language]}
        </p>
        <p className="text-base text-muted max-w-xl mb-10">
          {profile.tagline[language]}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-14">
          <a
            href="#projects"
            className="bg-accent hover:bg-accent-hover text-bg font-semibold px-6 py-3 transition-colors duration-200"
          >
            {t.viewProjects}
          </a>
          <a
            href={profile.cvUrl}
            download={profile.cvFileName}
            className="border border-border hover:border-accent text-ink font-medium px-6 py-3 transition-colors duration-200"
          >
            {t.downloadCV}
          </a>
        </div>

        <p className="text-sm text-accent font-mono">
          {profile.education.highlight[language]}
        </p>
      </div>
    </section>
  );
}
