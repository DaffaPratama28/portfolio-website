// ProjectCard.jsx
// Satu card buat satu project. Dua mode tampilan tergantung showcaseType:
// - "live-demo"   -> tombol keluar ke link demo
// - "case-study"  -> gak ada link keluar, ditampilin grid screenshot
//                     tiap layar aplikasi sebagai gantinya
//
// coverFit menentukan gimana cover image di-render: "cover" (default,
// isi penuh & crop) atau "contain" (dipakai kalau covernya berupa ikon/
// graphic, bukan screenshot UI beneran - biar gak kepotong aneh).

import Badge from "../ui/Badge";
import { useLanguage } from "../../i18n/useLanguage";

const content = {
  en: {
    liveDemo: "LIVE DEMO",
    caseStudy: "CASE STUDY",
    openDemo: "View Live Demo",
    screenStructure: "App Screen Structure",
  },
  id: {
    liveDemo: "LIVE DEMO",
    caseStudy: "STUDI KASUS",
    openDemo: "Buka Live Demo",
    screenStructure: "Struktur Layar Aplikasi",
  },
};

export default function ProjectCard({ project }) {
  const { language } = useLanguage();
  const t = content[language];
  const isLiveDemo = project.showcaseType === "live-demo";
  const isContain = project.coverFit === "contain";

  return (
    <article className="border border-border bg-surface">
      <img
        src={project.cover}
        alt={project.title[language]}
        className={`w-full aspect-video border-b border-border ${
          isContain ? "object-contain p-10" : "object-cover"
        }`}
        loading="lazy"
      />

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-heading font-bold text-xl md:text-2xl">
            {project.title[language]}
          </h3>
          <span className="font-mono text-[11px] text-muted whitespace-nowrap mt-1">
            {isLiveDemo ? t.liveDemo : t.caseStudy}
          </span>
        </div>

        <p className="text-muted leading-relaxed mb-6">
          {project.description[language]}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <ul className="space-y-1.5 mb-6">
          {project.features[language].map((feature) => (
            <li key={feature} className="text-sm text-muted flex gap-2">
              <span className="text-accent">—</span>
              {feature}
            </li>
          ))}
        </ul>

        {isLiveDemo && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors duration-200 mb-2"
          >
            {t.openDemo}
            <span aria-hidden="true">↗</span>
          </a>
        )}

        {!isLiveDemo && project.screens?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
              {t.screenStructure}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {project.screens.map((screen) => (
                <figure key={screen.label.en} className="text-left">
                  <img
                    src={screen.src}
                    alt={screen.label[language]}
                    className="w-full aspect-[9/16] object-cover border border-border mb-2"
                    loading="lazy"
                  />
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
          </div>
        )}
      </div>
    </article>
  );
}
