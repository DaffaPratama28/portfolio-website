# Daffa Pratama — Personal Portfolio

Single-page portfolio pribadi, dibangun pakai React (Vite) + Tailwind CSS v4.
Live: https://daffapratama-portfolio.vercel.app/

## Tech Stack

- [React](https://react.dev/) 19 + [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) v4 (lewat `@tailwindcss/vite`, gak pakai `tailwind.config.js` terpisah — semua theme token ada di `src/index.css`)

## Struktur Folder

```
src/
├── assets/
│   └── images/              # cover & screenshot project (nama file harus persis)
├── components/
│   ├── layout/                # bagian yang muncul di semua halaman
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/               # section-section utama di landing page
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   └── Projects.jsx
│   └── ui/                     # komponen kecil yang reusable
│       ├── Badge.jsx
│       ├── ProjectCard.jsx
│       ├── ScreenGallery.jsx   # grid screenshot + lightbox (<dialog>)
│       └── SectionHeading.jsx
├── data/
│   ├── profile.js              # data pribadi (nama, kontak, pendidikan, dst)
│   ├── projects.js             # data project buat section Projects
│   └── skills.js                # data tech stack buat section Skills
├── i18n/
│   ├── LanguageContext.jsx     # LanguageProvider (simpan pilihan di localStorage)
│   └── useLanguage.js          # context + hook useLanguage()
├── App.jsx
├── main.jsx
└── index.css                    # entry stylesheet + theme token Tailwind (warna, font)
```

## Dwibahasa (EN/ID)

Situs ini default-nya Bahasa Inggris, bisa di-toggle ke Bahasa Indonesia lewat
tombol EN/ID di navbar. Pilihan bahasa disimpan di `localStorage`, jadi tetap
keinget pas pengunjung balik lagi.

Semua teks yang tampil ke pengunjung disimpan sebagai object `{ en, id }` di
`data/profile.js` dan `data/projects.js`, lalu komponen ambil lewat
`field[language]` (dari `useLanguage()`). Kalau mau nambah teks baru, ikutin
pola yang sama: buat object `{ en, id }`, jangan hardcode string tunggal.

Atribut `<html lang>` ikut berubah sesuai bahasa aktif.

## Menambah Project

Tambah object baru di `src/data/projects.js`. Field link semuanya opsional:

| Field         | Fungsi                                                        |
| ------------- | ------------------------------------------------------------- |
| `demoUrl`     | Tombol "Live Demo" (+ `demoNote` `{ en, id }` kalau perlu)    |
| `repoUrl`     | Tombol "Source Code" ke GitHub                                |
| `repoPrivate` | `true` kalau repo private, tampil keterangan aja              |
| `screens`     | Grid screenshot + lightbox (label `{ en, id }`, rasio 9:16)   |

Label pojok card (LIVE DEMO / CASE STUDY / OPEN SOURCE) otomatis ngikutin
field di atas. Cover sebaiknya WebP/JPEG ±1200px biar ringan.

## Menjalankan di Lokal

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## Deploy

Project ini di-deploy ke [Vercel](https://vercel.com/).

Preview link (Open Graph) pakai `public/og-image.png` (1200×630). Kalau domain
berubah, update juga URL absolut di meta tag `index.html`.

## Lisensi

Kode sumber dirilis di bawah [MIT License](LICENSE). Konten pribadi — CV,
foto, screenshot project, dan teks profil — **tidak** termasuk dan tetap hak
milik pemiliknya.
