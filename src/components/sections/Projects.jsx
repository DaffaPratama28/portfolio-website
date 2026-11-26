// Projects.jsx
// Loop data dari data/projects.js, render tiap project pakai ProjectCard.

import { projects } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";
import SectionHeading from "../ui/SectionHeading";
import { useLanguage } from "../../i18n/useLanguage";

const content = {
  en: { label: "Featured Projects", heading: "Things I've built" },
  id: { label: "Proyek Unggulan", heading: "Proyek yang pernah saya kerjakan" },
};

export default function Projects() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section id="projects" className="anchor-offset py-20 md:py-28 border-b border-border">
      <div className="section-container">
        <SectionHeading label={t.label} title={t.heading} />

        <div className="grid gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
