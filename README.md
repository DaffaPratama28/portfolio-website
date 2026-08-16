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
│       └── ProjectCard.jsx
├── data/
│   ├── profile.js              # data pribadi (nama, kontak, pendidikan, dst)
│   ├── projects.js             # data project buat section Projects
│   └── skills.js                # data tech stack buat section Skills
├── i18n/
│   └── LanguageContext.jsx     # context EN/ID, dipakai lewat hook useLanguage()
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
