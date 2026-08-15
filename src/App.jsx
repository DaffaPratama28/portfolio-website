// ============================================================================
// App.jsx
// Komponen root aplikasi. Tugasnya cuma menyusun urutan section-section
// halaman utama (Navbar selalu di atas, lalu section-section berikutnya
// akan ditambahkan berurutan sesuai anchor link di Navbar: #home, #about,
// #projects, #contact).
// ============================================================================

import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        {/* Section berikutnya akan ditambahkan di sini:
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        */}
      </main>
    </>
  );
}

export default App;
