// ProjectCard.jsx
// Satu card buat satu project. Link yang muncul tergantung data:
// - demoUrl     -> tombol keluar ke live demo (+ catatan demoNote)
// - repoUrl     -> tombol keluar ke source code di GitHub
// - repoPrivate -> keterangan kalau source code-nya private
// - screens     -> grid screenshot tiap layar aplikasi (case study)
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
    openSource: "OPEN SOURCE",
    openDemo: "View Live Demo",
    sourceCode: "Source Code",
    privateRepo: "Source code is private (institutional project)",
    screenStructure: "App Screen Structure",
  },
  id: {
    liveDemo: "LIVE DEMO",
    caseStudy: "STUDI KASUS",
    openSource: "OPEN SOURCE",
    openDemo: "Buka Live Demo",
    sourceCode: "Source Code",
    privateRepo: "Source code bersifat privat (proyek instansi)",
    screenStructure: "Struktur Layar Aplikasi",
  },
};

const linkClass =
  "inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors duration-200";

export default function ProjectCard({ project }) {
  const { language } = useLanguage();
  const t = content[language];
  const isContain = project.coverFit === "contain";
  const hasScreens = project.screens?.length > 0;

  const typeLabel = project.demoUrl
    ? t.liveDemo
    : hasScreens
      ? t.caseStudy
      : t.openSource;

  return (
    <article className="border border-border bg-surface">
      {/* alt kosong: judul project udah dibaca dari h3, cover cuma dekorasi */}
      <img
        src={project.cover}
        alt=""
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
            {typeLabel}
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
              <span className="text-accent" aria-hidden="true">
                —
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {(project.demoUrl || project.repoUrl || project.repoPrivate) && (
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {t.openDemo}
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {t.sourceCode}
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.repoPrivate && (
              <span className="inline-flex items-center gap-2 text-sm text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <rect x="5" y="11" width="14" height="10" rx="1" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                {t.privateRepo}
              </span>
            )}
          </div>
        )}

        {project.demoNote && (
          <p className="text-xs text-muted mt-3">{project.demoNote[language]}</p>
        )}

        {hasScreens && (
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
