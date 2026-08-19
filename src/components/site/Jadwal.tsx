import { motion } from "framer-motion";
import { CalendarDays, Info, Timer } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { schedule } from "@/data/schedule";
import { cn } from "@/lib/utils";

const MAX_PERIODS = 10;

const rowVariants = {
  hidden: { opacity: 0, x: -40 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Jadwal() {
  return (
    <section id="jadwal" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      {/* Dekorasi */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="absolute right-[6%] top-14 hidden text-accent-foreground/30 lg:block"
      >
        <Timer className="size-10 animate-spin-slower" strokeWidth={1.5} />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="04"
          eyebrow="Jadwal Pelajaran"
          title="Rutinitas"
          highlight="Mingguan"
          description="Agenda pembelajaran XI RPL 2 — sepuluh jam pelajaran per hari, dengan Konsentrasi Keahlian RPL sebagai menu utamanya."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-2xl border bg-card shadow-lg shadow-muted/40">
            <div className="flex items-center justify-between border-b bg-muted/50 px-5 py-3.5">
              <p className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <CalendarDays className="size-4 text-accent-foreground" />
                Senin — Jumat · Semester Berjalan
              </p>
              <span className="hidden rounded-full bg-accent/20 px-2.5 py-1 font-mono text-[10px] font-semibold text-accent-foreground sm:block">
                KK RPL = Konsentrasi Keahlian
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="border-b bg-background">
                    <th className="sticky left-0 z-10 bg-background px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Hari
                    </th>
                    {Array.from({ length: MAX_PERIODS }, (_, i) => (
                      <th
                        key={i}
                        className="px-2 py-3 text-center font-mono text-[11px] font-semibold text-muted-foreground transition-colors hover:text-accent-foreground"
                      >
                        {i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, ri) => (
                    <motion.tr
                      key={row.day}
                      custom={ri}
                      variants={rowVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-40px" }}
                      className={cn(
                        "border-b last:border-b-0 transition-colors hover:bg-accent/10",
                        ri % 2 === 1 && "bg-muted/25",
                      )}
                    >
                      <td className="sticky left-0 z-10 bg-inherit px-4 py-3">
                        <span className="inline-flex items-center gap-2">
                          <span className="flex size-7 items-center justify-center rounded-lg bg-accent/20 font-mono text-[10px] font-bold text-accent-foreground ring-1 ring-accent/30">
                            {["S", "S", "R", "K", "J"][ri]}
                          </span>
                          <span className="font-display font-bold">{row.day}</span>
                        </span>
                      </td>
                      {Array.from({ length: MAX_PERIODS }, (_, pi) => {
                        const subject = row.periods[pi];
                        const isRpl = subject === "KK RPL";
                        return (
                          <td key={pi} className="px-1.5 py-2 text-center">
                            {subject ? (
                              <span
                                className={cn(
                                  "inline-block w-full min-w-12 rounded-md px-1.5 py-1.5 text-xs font-medium transition-all duration-200",
                                  isRpl
                                    ? "bg-accent font-semibold text-accent-foreground shadow-sm shadow-accent/40"
                                    : "text-muted-foreground hover:bg-muted",
                                )}
                              >
                                {subject}
                              </span>
                            ) : (
                              <span className="text-muted-foreground/40">—</span>
                            )}
                          </td>
                        );
                      })}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            Jadwal dapat berubah sewaktu-waktu sesuai kebijakan sekolah.
            Selalu cek pengumuman resmi dari wali kelas.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
