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

## Update Konten

Hampir semua konten yang sering berubah udah dipisah ke folder `src/data/`,
jadi gak perlu bongkar komponen buat edit teks:

- **Info pribadi & kontak** → `src/data/profile.js`
- **CV** → ganti file `src/data/260806 CV_Daffa_Pratama_2026.pdf` dengan file
  CV asli (nama file boleh diganti, tinggal update import di `profile.js`)
- **Tech stack / skills** → `src/data/skills.js`
- **Data project** → `src/data/projects.js`

### Ganti foto project

Foto cover & screenshot masih placeholder generate otomatis, tinggal timpa
file di `src/assets/images/` pakai nama yang **persis sama** biar gak perlu
ubah kode sama sekali:

```
projek_rutan_ptk_cover.png            # cover project Rutan Pontianak (16:9)
projek_skripsi_isk_cover.png          # cover project Skripsi ISK (16:9)
security_lock.png                     # cover project Password Manager (object-contain)
projek_pengelola_sandi_register.png   # screenshot layar Register (9:16)
projek_pengelola_sandi_login.png      # screenshot layar Login (9:16)
projek_pengelola_sandi_home.png       # screenshot layar Home (9:16)
projek_pengelola_sandi_profile.png    # screenshot layar Profile (9:16)
projek_pengelola_sandi_settings.png   # screenshot layar Settings (9:16)
projek_pengelola_sandi_add_edit.png   # screenshot layar Tambah/Edit Sandi (9:16)
projek_pengelola_sandi_detail.png     # screenshot layar Detail Sandi (9:16)
projek_pengelola_sandi_reset.png      # screenshot layar Lupa Master Password (9:16)
```

## Deploy

Project ini di-deploy ke [Vercel](https://vercel.com/). Push ke branch utama
di GitHub, lalu import repo-nya di Vercel — build command dan output
directory otomatis kedetect dari `vite.config.js` (`npm run build`, output
ke folder `dist`).
