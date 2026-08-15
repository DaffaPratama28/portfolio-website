// ============================================================================
// Hero.jsx
// Section pertama yang dilihat pengunjung (di bawah Navbar). Berisi:
// - Nama & role
// - Status fresh graduate + pencapaian akademik
// - Badge fokus keahlian (Web, Mobile, ML)
// - CTA (Lihat Proyek & Download CV)
// - Link sosial media
// ============================================================================

import { profile } from "../../data/profile";

export default function Hero() {
  return (
    // id="home" -> target scroll dari Navbar (href="#home")
    // min-h-screen -> section memenuhi tinggi layar penuh saat pertama dibuka
    // flex items-center -> konten diposisikan di tengah secara vertikal
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* --------------------------------------------------------------
          Dekorasi background: lingkaran blur warna primary di belakang
          konten, memberi kesan modern tanpa perlu gambar/asset tambahan.
          "pointer-events-none" supaya tidak menghalangi klik ke konten.
          -------------------------------------------------------------- */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="section-container py-32 flex flex-col items-center text-center">
        {/* Badge status: Fresh Graduate */}
        <span className="inline-flex items-center gap-2 bg-dark-secondary border border-white/10 text-muted text-sm px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {profile.education.status} — {profile.education.university}
        </span>

        {/* Nama besar sebagai headline utama */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Halo, saya <span className="text-gradient">{profile.name}</span>
        </h1>

        {/* Role / subtitle */}
        <p className="text-lg md:text-xl text-muted max-w-2xl mb-3">
          {profile.role}
        </p>

        {/* Tagline singkat */}
        <p className="text-base text-muted max-w-xl mb-8">
          {profile.tagline}
        </p>

        {/* Badge 3 fokus keahlian, di-loop dari profile.focusAreas */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {profile.focusAreas.map((area) => (
            <span
              key={area}
              className="text-sm bg-dark-secondary border border-white/10 text-light px-4 py-1.5 rounded-full"
            >
              {area}
            </span>
          ))}
        </div>

        {/* Pencapaian akademik — ditonjolkan karena ini nilai jual penting
            untuk fresh graduate (Lulusan Terbaik ke-2) */}
        <p className="text-sm text-primary font-medium mb-10">
          🏆 {profile.education.achievement}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#projects"
            className="bg-primary hover:bg-primary-dark text-white font-medium px-7 py-3 rounded-full transition-colors duration-200"
          >
            Lihat Proyek Saya
          </a>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 hover:border-white/40 text-light font-medium px-7 py-3 rounded-full transition-colors duration-200"
          >
            Download CV
          </a>
        </div>

        {/* Link sosial media singkat di bawah CTA */}
        <div className="flex items-center gap-6 mt-10 text-muted">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-light transition-colors duration-200 text-sm"
          >
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-light transition-colors duration-200 text-sm"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.socials.email}`}
            className="hover:text-light transition-colors duration-200 text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
