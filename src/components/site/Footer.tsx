import { motion } from "framer-motion";
import { ArrowUp, Code2, Instagram, Mail, MapPin, Music2, ShieldCheck } from "lucide-react";
import { Asterisk } from "@/components/site/Decor";

const navLinks = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#pengurus", label: "Pengurus" },
  { href: "#anggota", label: "Anggota" },
  { href: "#jadwal", label: "Jadwal" },
  { href: "#galeri", label: "Galeri" },
  { href: "#kontak", label: "Kontak" },
];

const socials = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/xirpl2.officiall?igsh=MWkyMmUyNGRjcGxvdg==",
  },
  {
    icon: Music2,
    label: "TikTok",
    href: "https://www.tiktok.com/@xirpl2.smkn1rembang?_r=1&_t=ZS-98SE2EoLWxJ",
  },
];

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t">
      <div className="pointer-events-none absolute inset-0 dotted-grid opacity-40 dark:opacity-20" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute -right-20 -top-24 text-accent/20"
      >
        <Code2 className="size-72" strokeWidth={0.7} />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
          {/* Brand */}
          <div>
            <a href="#beranda" className="group inline-flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-lg shadow-accent/30 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-105">
                <Code2 className="size-6" />
              </span>
              <span className="font-display text-3xl font-bold tracking-tight">
                XI <span className="text-muted-foreground">RPL</span>{" "}
                <span className="bg-accent px-1.5 py-0.5 rounded-sm text-accent-foreground">
                  2
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Wadah kreativitas, inovasi, dan persaudaraan para calon Software
              Engineer masa depan. SMKN 1 Rembang — jurusan Rekayasa Perangkat
              Lunak.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex size-11 items-center justify-center rounded-full border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent/10 hover:text-foreground"
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigasi */}
          <nav aria-label="Navigasi footer">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Navigasi
            </p>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="h-px w-4 bg-accent transition-all duration-300 group-hover:w-7" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Kontak
            </p>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent-foreground" />
                <span>
                  SMKN 1 Rembang
                  <br />
                  Dusun I, Bodas Karangjati, Rembang, Purbalingga Regency, Central Java 53356
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-accent-foreground" />
                <a
                  href="#kontak"
                  className="transition-colors hover:text-foreground"
                >
                  Kirim lewat form kontak
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Asterisk className="size-4 shrink-0 text-accent-foreground" />
                <span>Buka setiap hari, jam sekolah.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Baris bawah */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 XI RPL 2 · SMKN 1 Rembang · Edited by{" "}
            <span className="text-foreground">Abs 15</span>
            <span className="mx-2 text-muted-foreground/40">·</span>
            <a
              href="/inbox"
              className="inline-flex items-center gap-1 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              <ShieldCheck className="size-3" />
              Admin
            </a>
          </p>
          <motion.button
            type="button"
            onClick={scrollTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Kembali ke atas"
            className="flex cursor-pointer items-center gap-2 rounded-full border bg-card px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
          >
            Ke atas
            <ArrowUp className="size-3.5 text-accent-foreground" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
