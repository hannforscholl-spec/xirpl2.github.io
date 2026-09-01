# 🚀 XI RPL 2 — SMKN 1 Rembang

**Website resmi kelas XI Rekayasa Perangkat Lunak 2** — wadah kreativitas, inovasi, dan persaudaraan para calon Software Engineer masa depan. Unggul dalam teknologi, solid dalam kebersamaan.

![Status](https://img.shields.io/badge/kelas-XI%20RPL%202-amber?style=flat-square)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-7-purple?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square)
![Convex](https://img.shields.io/badge/Convex-Backend-red?style=flat-square)

---

## ✨ Fitur

- 🎬 **Loading screen sinematik** — layar terbuka terbelah dari atas ke bawah dan bawah ke atas
- 🌗 **Mode gelap & terang** — toggle di navbar, semua section menyesuaikan
- 🌌 **Background 3D** dengan Three.js — starfield & wireframe yang bereaksi ke tema dan kursor
- 🎭 **Animasi scroll unik per section** — tirai, slide, spring, tilt 3D, spotlight hover
- 👥 **36 anggota kelas** — filter pengurus/anggota, nomor absen, link Instagram
- 📅 **Jadwal pelajaran mingguan** — 5 hari × 10 jam, mapel KK RPL di-highlight
- 📸 **Galeri momen kelas** dengan efek reveal
- 📬 **Form kontak** — pesan pengunjung masuk ke database Convex, dibaca pemilik situs lewat halaman **Kotak Masuk** (`/inbox`) yang dilindungi kata sandi
- 🖱️ **Tombol magnetik** & **kartu spotlight** ala component library modern
- 🎨 **Ilustrasi vektor SVG** buatan sendiri (asterisk, squiggle, blob, kurung kode)

## 🛠️ Tech Stack

| Teknologi | Fungsi |
|---|---|
| [Vite](https://vitejs.dev) + React 19 + TypeScript | Frontend |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling & design tokens |
| [shadcn/ui](https://ui.shadcn.com) | Komponen UI (Radix + Tailwind) |
| [Framer Motion](https://motion.dev) | Animasi & transisi |
| [Three.js](https://threejs.org) | Grafis 3D latar |
| [Convex](https://www.convex.dev) | Backend & database (form kontak) |
| [Lucide](https://lucide.dev) | Ikon |
| [next-themes](https://github.com/pacocoursey/next-themes) | Toggle gelap/terang |

## 📁 Struktur Folder

```
src/
├── components/
│   ├── site/        # Section landing: Hero, About, Anggota, Jadwal, Galeri, dll.
│   │                # + toolkit animasi: Loader, Magnetic, SpotlightCard, TiltCard, Decor
│   └── ui/          # Komponen shadcn/ui
├── convex/          # Backend Convex (tabel messages + action inbox)
├── data/            # Data siswa (36 anggota) & jadwal pelajaran
├── pages/           # Landing, Inbox (kotak pesan), NotFound
├── hooks/           # Hook custom
└── lib/             # Utilitas
public/photos/       # Foto siswa & dokumentasi kelas
```

## 🚀 Menjalankan di Lokal

```bash
# 1. Install dependencies
bun install

# 2. Generate tipe Convex (butuh URL deployment, lihat bagian Env)
bun convex dev --once

# 3. Jalankan dev server
bun run dev
```

> Pakai **Bun** sebagai package manager. Build produksi: `bun run build`.

## 🔑 Environment Variables

Buat file `.env.local` di root proyek:

```env
VITE_CONVEX_URL=          # URL deployment Convex (hasil `bun convex dev`)
```

Variabel backend (diatur di dashboard Convex):

```env
INBOX_PASSCODE=           # Kata sandi halaman Kotak Masuk (/inbox)
```

## 📬 Kotak Masuk untuk Pemilik Situs

Pesan dari form kontak tersimpan di tabel `messages` (Convex). Pemegang situs membacanya di halaman **`/inbox`**:

1. Set `INBOX_PASSCODE` di environment Convex
2. Buka `/inbox` di situs → masukkan kata sandi
3. Semua pesan tampil dengan urutan terbaru di atas — lengkap dengan nama, email, dan tanggal

Verifikasi kata sandi dilakukan **di sisi server** (Convex action), jadi kode tidak bocor ke frontend.

## 🤝 Kontribusi

Punya ide atau mau ikut ngoding? Kirim pesan lewat form kontak di website, atau langsung DM Instagram kelas:

- 📸 [@xirpl2.officiall](https://www.instagram.com/xirpl2.officiall?igsh=MWkyMmUyNGRjcGxvdg==)
- 🎵 [@xirpl2.smkn1rembang](https://www.tiktok.com/@xirpl2.smkn1rembang?_r=1&_t=ZS-98SE2EoLWxJ)

---

Dibuat dengan ☕ oleh kelas **XI RPL 2**, SMKN 1 Rembang — *banyak error, tapi selalu dibenerin bareng-bareng.*
