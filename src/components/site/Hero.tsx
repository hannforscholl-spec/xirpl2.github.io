import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, Users, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThreeBackground } from "@/components/site/ThreeBackground";
import { Magnetic } from "@/components/site/Magnetic";
import { Asterisk, Squiggle, Brackets, Ring, PlusMark } from "@/components/site/Decor";
import { photoUrl } from "@/data/students";

const words = [
  "Calon Software Engineer.",
  "Satu Keluarga.",
  "Generasi Teknologi.",
  "Anaknya ibu iis",
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero({ started }: { started: boolean }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [chars, setChars] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    const speed = deleting ? 40 : 90;

    if (!deleting && chars === word) {
      const t = setTimeout(() => setDeleting(true), 1700);
      return () => clearTimeout(t);
    }
    if (deleting && chars === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () =>
        setChars(
          deleting
            ? word.slice(0, chars.length - 1)
            : word.slice(0, chars.length + 1),
        ),
      speed,
    );
    return () => clearTimeout(t);
  }, [chars, deleting, wordIndex]);

  return (
    <section
      id="beranda"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Latar berlapis */}
      <div className="absolute inset-0 dotted-grid opacity-60 dark:opacity-30" />
      <ThreeBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Dekorasi vektor */}
      <motion.div
        initial={{ opacity: 0, rotate: -30 }}
        animate={started ? { opacity: 1, rotate: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute left-[6%] top-28 hidden text-accent-foreground/50 lg:block"
      >
        <Asterisk className="size-10 animate-spin-slow" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute right-[4%] top-40 hidden text-foreground/15 lg:block"
      >
        <Brackets className="size-16" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-24 left-[12%] hidden text-accent-foreground/40 md:block"
      >
        <PlusMark className="size-6" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute right-[14%] bottom-28 hidden text-foreground/15 lg:block"
      >
        <Ring className="size-24 animate-spin-slower" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-[28%] top-24 hidden text-accent-foreground/30 xl:block"
      >
        <PlusMark className="size-4" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-32">
        {/* Kiri — copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={started ? "show" : "hidden"}
          className="text-center lg:text-left"
        >
          <motion.div variants={item}>
            <Badge
              variant="outline"
              className="mb-6 gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium normal-case tracking-wide backdrop-blur"
            >
              <Sparkles className="size-3.5 text-accent-foreground bg-accent rounded-full p-0.5 box-content" />
              SMKN 1 REMBANG — KELAS XI · JURUSAN RPL
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]"
          >
            Kami Adalah{" "}
            <span className="relative mt-2 inline-block max-w-full whitespace-nowrap">
              <span className="font-mono text-accent-foreground bg-accent px-2 rounded-sm text-lg sm:text-2xl md:text-3xl lg:text-4xl">
                {chars}
              </span>
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 h-[0.7em] w-[3px] animate-pulse bg-foreground" />
              <Squiggle className="absolute -bottom-3 left-1 right-1 h-2.5 text-accent-foreground/70" />
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
          >
            Wadah kreativitas, inovasi, dan persaudaraan para calon Software
            Engineer masa depan. Unggul dalam teknologi, solid dalam
            kebersamaan.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Magnetic>
              <Button asChild size="lg" className="group rounded-full px-7 shadow-lg shadow-accent/20">
                <a href="#tentang">
                  Jelajahi Kelas
                  <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button asChild size="lg" variant="outline" className="group rounded-full px-7">
                <a href="#kontak">
                  Hubungi Kami
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground lg:justify-start"
          >
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" /> 36 siswa
            </span>
            <span className="h-3 w-px bg-border" />
            <span>10 jam pelajaran</span>
            <span className="h-3 w-px bg-border" />
            <span>1 keluarga besar</span>
          </motion.div>
        </motion.div>

        {/* Kanan — foto kelas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40, rotate: 2 }}
          animate={started ? { opacity: 1, scale: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 0.95, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* Cincin dekoratif di belakang */}
          <div className="absolute -inset-6 -z-0 flex items-center justify-center">
            <Ring className="size-[115%] text-accent-foreground/25" />
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -inset-3 rotate-2 rounded-2xl bg-accent/60" />
            <div className="absolute -inset-3 -rotate-1 rounded-2xl border border-dashed border-foreground/20" />
            <figure className="group relative overflow-hidden rounded-2xl border bg-card shadow-2xl">
              <img
                src={photoUrl("class.jpg")}
                alt="Foto kelas XI RPL 2"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
                decoding="async"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-left">
                <div>
                  <p className="font-display text-sm font-semibold text-white">
                    XI RPL 2 · Angkatan
                  </p>
                  <p className="font-mono text-[11px] text-white/70">
                    SMKN 1 Rembang — © dokumentasi kelas
                  </p>
                </div>
                <span className="font-mono text-xs text-white/80">
                  #36students
                </span>
              </figcaption>
            </figure>

            {/* Chip melayang */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute -left-3 top-6 flex items-center gap-2 rounded-xl border bg-card/90 px-3.5 py-2.5 shadow-lg backdrop-blur sm:-left-8"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Sparkles className="size-4" />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold leading-tight">Generasi Jet</p>
                <p className="font-mono text-[10px] text-muted-foreground">siap jadi murid baik</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-3 flex items-center gap-2 rounded-xl border bg-card/90 px-3.5 py-2.5 shadow-lg backdrop-blur sm:-right-6"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
                <Users className="size-4" />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold leading-tight">36 Siswa · 1 Keluarga</p>
                <p className="font-mono text-[10px] text-muted-foreground">#xirpl2family</p>
              </div>
            </motion.div>

            {/* Chip kode kecil */}
            <motion.div
              animate={{ y: [0, -7, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
              className="absolute -top-5 right-8 hidden items-center gap-1.5 rounded-full border bg-card/90 px-3 py-1.5 font-mono text-[10px] text-muted-foreground shadow-md backdrop-blur sm:flex"
            >
              <Terminal className="size-3.5 text-accent-foreground" />
              {"<kelas/>"}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#tentang"
        aria-label="Gulir ke bawah"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
