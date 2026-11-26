// About.jsx
// Section singkat: narasi + prestasi + tanggal lulus, dan 3 bidang
// fokus. Cuma nampilin tanggal lulus (bukan tanggal sidang/wisuda).
// Narasi ditulis utuh per bahasa (bukan disambung dari potongan string)
// biar kalimatnya natural di dua bahasa.

import { profile } from "../../data/profile";
import { useLanguage } from "../../i18n/useLanguage";
import SectionHeading from "../ui/SectionHeading";

const content = {
  en: {
    label: "About",
    heading: (edu) => `${edu.degree.en} from ${edu.university}`,
    narrative:
      "A fresh graduate focused on building real, working software. Throughout college, I worked on projects ranging from a website for a government institution, to an Android app for securing sensitive data, to machine learning research in healthcare.",
    achievementLabel: "Achievement",
    graduationLabel: "Graduated",
    skillsLabel: "Focus Areas",
  },
  id: {
    label: "Tentang",
    heading: (edu) => `${edu.degree.id} dari ${edu.university}`,
    narrative:
      "Fresh graduate yang fokus membangun perangkat lunak nyata yang benar-benar berfungsi. Selama kuliah, saya mengerjakan berbagai proyek — mulai dari website instansi pemerintah, aplikasi Android untuk mengamankan data sensitif, hingga riset machine learning di bidang kesehatan.",
    achievementLabel: "Prestasi",
    graduationLabel: "Tanggal Lulus",
    skillsLabel: "Fokus Keahlian",
  },
};

export default function About() {
  const { language } = useLanguage();
  const t = content[language];
  const { education, focusAreas } = profile;

  return (
    <section
      id="about"
      className="anchor-offset py-20 md:py-28 bg-surface border-b border-border"
    >
      <div className="section-container">
        <SectionHeading
          label={t.label}
          title={t.heading(education)}
          className="text-3xl md:text-4xl mb-12 max-w-2xl"
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* kolom kiri: narasi, prestasi, tanggal lulus */}
          <div>
            <p className="text-muted leading-relaxed mb-8">{t.narrative}</p>

            <div className="border-l-2 border-accent pl-4 mb-8">
              <p className="font-mono text-xs text-accent tracking-widest uppercase mb-2">
                {t.achievementLabel}
              </p>
              <p className="text-ink leading-relaxed">
                {education.achievement[language]}
              </p>
            </div>

            <div className="flex items-baseline justify-between border-b border-border pb-3 text-sm">
              <span className="text-muted">{t.graduationLabel}</span>
              <span className="font-mono text-ink">{education.graduationDate}</span>
            </div>
          </div>

          {/* kolom kanan: 3 fokus keahlian, list bernomor */}
          <div>
            <p className="text-sm text-muted mb-6">{t.skillsLabel}</p>
            <ol className="space-y-6">
              {focusAreas.map((area, i) => (
                <li key={area.en} className="flex items-start gap-4">
                  <span
                    className="font-mono text-accent text-sm mt-1"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-lg text-ink">
                    {area[language]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
