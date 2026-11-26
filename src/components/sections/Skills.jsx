// Skills.jsx
// Showcase semua tech stack sekaligus, dikelompokkan per bidang fokus.
// Ditaruh di atas Projects supaya pengunjung langsung lihat gambaran
// besar skill-nya sebelum masuk detail tiap project.

import { skillGroups } from "../../data/skills";
import Badge from "../ui/Badge";
import SectionHeading from "../ui/SectionHeading";
import { useLanguage } from "../../i18n/useLanguage";

const content = {
  en: { label: "Skills", heading: "Tech stack, at a glance" },
  id: { label: "Keahlian", heading: "Tech stack secara singkat" },
};

export default function Skills() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section id="skills" className="anchor-offset py-20 md:py-28 border-b border-border">
      <div className="section-container">
        <SectionHeading label={t.label} title={t.heading} />

        <div className="grid sm:grid-cols-3 gap-10">
          {skillGroups.map((group) => (
            <div key={group.category.en}>
              <p className="font-heading text-lg text-ink mb-4">
                {group.category[language]}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
