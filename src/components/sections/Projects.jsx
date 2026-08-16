// Projects.jsx
// Loop data dari data/projects.js, render tiap project pakai ProjectCard.

import { projects } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";
import { useLanguage } from "../../i18n/LanguageContext";

const content = {
  en: { label: "Featured Projects", heading: "Things I've built" },
  id: { label: "Featured Projects", heading: "Proyek yang pernah dikerjakan" },
};

export default function Projects() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section id="projects" className="anchor-offset py-28 border-b border-border">
      <div className="section-container">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
          {t.label}
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12 max-w-xl">
          {t.heading}
        </h2>

        <div className="grid gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
