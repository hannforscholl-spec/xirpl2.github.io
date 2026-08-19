import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { Magnetic } from "@/components/site/Magnetic";
import { Asterisk } from "@/components/site/Decor";
import { Button } from "@/components/ui/button";

const words = ["KELAS KAMI", "TUGAS KELOMPOK", "KODING BERSAMA", "LOMBA IT"];

export function CtaBand() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      {/* Panel CTA */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6"
      >
        <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-14 text-center shadow-2xl shadow-muted/50 sm:px-12 sm:py-16">
          {/* Latar dekoratif */}
          <div className="pointer-events-none absolute inset-0 dotted-grid opacity-50 dark:opacity-25" />
          <motion.div
            animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-16 -top-16 text-accent/30"
          >
            <Code2 className="size-64" strokeWidth={0.8} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: -30 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute left-8 top-8 text-accent-foreground/50"
          >
            <Asterisk className="size-9 animate-spin-slow" />
          </motion.div>

          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Yuk jadi bagian cerita kami
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Mau kolaborasi, sponsor, atau sekadar{" "}
              <span className="relative inline-block">
                <span className="relative z-10">ngobrol?</span>
                <span aria-hidden className="absolute inset-x-0 bottom-1 -z-0 h-3 -rotate-1 bg-accent/70" />
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              XI RPL 2 terbuka untuk kolaborasi proyek, lomba, atau kerja sama
              sekolah. Kami responsif — selama bukan pas jam pelajaran.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <Button asChild size="lg" className="group rounded-full px-8 shadow-lg shadow-accent/20">
                  <a href="#kontak">
                    Sapa Kami Sekarang
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group rounded-full px-8"
                >
                  <a href="#anggota">
                    Lihat Anggota
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Word marquee */}
      <div className="mt-10 overflow-hidden">
        <div className="flex w-max animate-marquee items-center">
          {[...words, ...words].map((w, i) => (
            <span
              key={i}
              className="mr-8 flex items-center gap-8 font-display text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground/50"
            >
              {w}
              <Asterisk className="size-4 text-accent-foreground/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
