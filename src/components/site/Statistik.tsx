import { Users, GraduationCap, BookOpen, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/site/CountUp";
import { SpotlightCard } from "@/components/site/SpotlightCard";
import { Blob, DotCluster, Ring } from "@/components/site/Decor";

const stats = [
  { icon: Users, value: 36, label: "Siswa", note: "satu angkatan" },
  { icon: GraduationCap, value: 10, label: "Guru Pengajar", note: "termasuk wali kelas" },
  { icon: BookOpen, value: 12, label: "Mata Pelajaran", note: "dari BI sampai KK RPL" },
  { icon: HeartHandshake, value: 1, label: "Keluarga Besar", note: "saling support" },
];

export function Statistik() {
  return (
    <section id="statistik" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      {/* Dekorasi blob & cluster */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute -left-24 -top-24 text-accent/25"
      >
        <Blob className="size-96" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="pointer-events-none absolute right-[8%] top-14 text-accent-foreground/40"
      >
        <DotCluster className="size-14" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="pointer-events-none absolute bottom-16 right-[4%] text-foreground/15"
      >
        <Ring className="size-28 animate-spin-slower" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: i * 0.1,
                }}
              >
                <SpotlightCard className="rounded-2xl border bg-card">
                  <div className="group relative overflow-hidden p-7 text-center">
                    <span
                      aria-hidden
                      className="absolute -right-6 -top-6 size-24 rounded-full bg-accent/20 blur-2xl transition-opacity group-hover:opacity-100"
                    />
                    <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground ring-1 ring-accent/40 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="size-6" />
                    </span>
                    <p className="mt-5 font-display text-5xl font-bold tracking-tight">
                      <CountUp to={s.value} />
                    </p>
                    <p className="mt-2 text-sm font-semibold">{s.label}</p>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                      {s.note}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
