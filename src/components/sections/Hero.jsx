// Hero.jsx
// Section pembuka, left-aligned & text-heavy. Semua string UI lokal
// disimpan di object `content` di bawah biar gampang dibaca perbedaan
// versi EN vs ID-nya berdampingan.

import { profile } from "../../data/profile";
import { useLanguage } from "../../i18n/LanguageContext";

const content = {
  en: { viewProjects: "View Projects", downloadCV: "Download CV" },
  id: { viewProjects: "Lihat Proyek", downloadCV: "Unduh CV" },
};

export default function Hero() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section
      id="home"
      className="anchor-offset min-h-screen flex items-center border-b border-border"
    >
      <div className="section-container py-32">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-6">
          // {profile.education.status[language]} — {profile.education.university}
        </p>

        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-7xl leading-[1.1] mb-6 max-w-3xl">
          {profile.name.split(" ")[0]}{" "}
          <span className="text-accent">{profile.name.split(" ")[1]}</span>
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
            download
            className="border border-border hover:border-accent text-ink font-medium px-6 py-3 transition-colors duration-200"
          >
            {t.downloadCV}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-x-10 gap-y-3 text-sm text-muted font-mono">
          <span>
            {profile.focusAreas.map((area) => area[language]).join(" / ")}
          </span>
        </div>
        <p className="text-sm text-accent font-mono mt-3">
          {profile.education.achievement[language]}
        </p>
      </div>
    </section>
  );
}
