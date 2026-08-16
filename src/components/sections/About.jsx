// About.jsx
// Section singkat: status akademik + 3 bidang fokus. Cuma nampilin
// tanggal lulus (bukan tanggal sidang/wisuda) sesuai request.

import { profile } from "../../data/profile";
import { useLanguage } from "../../i18n/LanguageContext";

const content = {
  en: {
    label: "About",
    heading: (edu) => `${edu.degree.en} from ${edu.university}`,
    narrativeBefore: "Recently graduated as a",
    narrativeMiddle: "with the predicate",
    narrativeAfter:
      "Throughout college, the focus was on building real, working projects — from a website for a government institution, to an Android app for securing sensitive data, to machine learning research in healthcare.",
    graduationLabel: "Graduated",
    skillsLabel: "Focus Areas",
  },
  id: {
    label: "Tentang",
    heading: (edu) => `${edu.degree.id} dari ${edu.university}`,
    narrativeBefore: "Baru lulus sebagai",
    narrativeMiddle: "dengan predikat",
    narrativeAfter:
      "Selama kuliah fokus membangun proyek nyata — mulai dari website instansi pemerintah, aplikasi Android untuk keamanan data, sampai riset machine learning di bidang kesehatan.",
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
      className="anchor-offset py-28 bg-surface border-b border-border"
    >
      <div className="section-container">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
          {t.label}
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12 max-w-2xl">
          {t.heading(education)}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* kolom kiri: narasi singkat + tanggal lulus */}
          <div>
            <p className="text-muted leading-relaxed mb-8">
              {t.narrativeBefore} {education.status[language].toLowerCase()}{" "}
              {t.narrativeMiddle}{" "}
              <span className="text-ink">{education.achievement[language]}</span>.{" "}
              {t.narrativeAfter}
            </p>

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
                  <span className="font-mono text-accent text-sm mt-1">
                    0{i + 1}
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
