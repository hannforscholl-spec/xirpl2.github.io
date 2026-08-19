import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Users } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpotlightCard } from "@/components/site/SpotlightCard";
import { students, photoUrl, pengurusRoles, type Student } from "@/data/students";
import { cn } from "@/lib/utils";

type Filter = "semua" | "pengurus" | "anggota";

const filters: { key: Filter; label: string; count: number }[] = [
  { key: "semua", label: "Semua", count: students.length },
  {
    key: "pengurus",
    label: "Pengurus",
    count: students.filter((s) => pengurusRoles.includes(s.role)).length,
  },
  {
    key: "anggota",
    label: "Anggota",
    count: students.filter((s) => !pengurusRoles.includes(s.role)).length,
  },
];

function MemberCard({ s }: { s: Student }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 12 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative"
    >
      <SpotlightCard className="rounded-xl border bg-card">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={photoUrl(s.photo)}
            alt={s.name}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
          />
          <span className="absolute left-2.5 top-2.5 rounded-md bg-background/85 px-2 py-0.5 font-mono text-[10px] font-semibold backdrop-blur">
            #{String(s.absen).padStart(2, "0")}
          </span>
          {s.instagram && s.handle !== "-" && (
            <a
              href={s.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={`Instagram ${s.name}`}
              className="absolute right-2.5 top-2.5 flex size-8 translate-y-1 items-center justify-center rounded-full bg-foreground/80 text-background opacity-0 backdrop-blur transition-all duration-300 hover:bg-accent hover:text-accent-foreground group-hover:translate-y-0 group-hover:opacity-100"
            >
              <Instagram className="size-4" />
            </a>
          )}
          <div className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-10 opacity-95 transition-transform duration-300 group-hover:translate-y-0">
            <h3 className="text-sm font-semibold leading-tight text-white">
              {s.name}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <span
            className={cn(
              "truncate text-[11px] font-medium",
              pengurusRoles.includes(s.role)
                ? "text-accent-foreground"
                : "text-muted-foreground",
            )}
          >
            {s.role}
          </span>
          {s.instagram && s.handle !== "-" && (
            <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
              @{s.handle}
            </span>
          )}
        </div>
      </SpotlightCard>
    </motion.article>
  );
}

export function Anggota() {
  const [filter, setFilter] = useState<Filter>("semua");

  const filtered = students.filter((s) => {
    if (filter === "pengurus") return pengurusRoles.includes(s.role);
    if (filter === "anggota") return !pengurusRoles.includes(s.role);
    return true;
  });

  return (
    <section id="anggota" className="relative scroll-mt-20 overflow-hidden bg-muted/40 py-20 sm:py-28">
      {/* Dekorasi */}
      <div className="pointer-events-none absolute -left-24 top-1/3 hidden text-accent-foreground/10 md:block">
        <Users className="size-64 -rotate-12" strokeWidth={1} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="03"
          eyebrow="Anggota Kelas"
          title="36 Siswa,"
          highlight="Satu Keluarga"
          description="Masih belajar coding, kadang error, kadang bingung — tapi tetap berusaha berkembang bersama. Ini mereka, keluarga XI RPL 2."
        />

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter anggota">
            {filters.map((f) => (
              <motion.button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                whileTap={{ scale: 0.94 }}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  filter === f.key
                    ? "border-transparent bg-foreground text-background shadow"
                    : "bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {f.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 font-mono text-[10px]",
                    filter === f.key
                      ? "bg-background/20 text-background"
                      : "bg-accent/30 text-accent-foreground",
                  )}
                >
                  {f.count}
                </span>
              </motion.button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((s) => (
              <MemberCard key={s.absen} s={s} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
