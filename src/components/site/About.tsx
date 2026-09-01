import { Eye, Target, GraduationCap, Quote, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/site/TiltCard";
import { SpotlightCard } from "@/components/site/SpotlightCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Asterisk, Squiggle } from "@/components/site/Decor";

interface AboutCard {
  icon: LucideIcon;
  title: string;
  text: string;
  name?: string;
  from: "left" | "up" | "right";
}

const cards: AboutCard[] = [
  {
    icon: Eye,
    title: "Visi Kelas",
    text: "Menjadi kelas yang unggul dalam bidang rekayasa perangkat lunak, berkarakter mulia, kreatif, serta adaptif terhadap perkembangan teknologi global.",
    from: "left",
  },
  {
    icon: Target,
    title: "Misi Kelas",
    text: "Meningkatkan keterampilan coding, menjaga kekeluargaan, aktif berprestasi di lomba IT, dan saling mendukung dalam mencapai cita-cita.",
    from: "up",
  },
  {
    icon: GraduationCap,
    title: "Wali Kelas",
    text: "Pembimbing dan motivator yang senantiasa mengarahkan kami menuju kesuksesan akademik dan karakter.",
    name: "Ibu. Iis Widayanti, S.Pd",
    from: "right",
  },
];

const offset: Record<AboutCard["from"], { x: number; y: number }> = {
  left: { x: -60, y: 0 },
  up: { x: 0, y: 50 },
  right: { x: 60, y: 0 },
};

export function About() {
  return (
    <section id="tentang" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      {/* Dekorasi */}
      <motion.div
        initial={{ opacity: 0, rotate: -30 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="absolute right-[8%] top-16 text-accent-foreground/40"
      >
        <Asterisk className="size-12 animate-spin-slow" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="absolute bottom-20 left-[6%] -rotate-12 text-accent-foreground/30"
      >
        <Squiggle className="h-6 w-28" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="01"
          eyebrow="Tentang Kelas"
          title="Mengenal Lebih"
          highlight="Dekat"
          description="Visi, misi, dan sosok di balik perjalanan kelas XI Rekayasa Perangkat Lunak 2 — satu tim yang tumbuh dari layar komputer dan tugas kelompok."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, ...offset[c.from] }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="h-full">
                  <SpotlightCard className="h-full rounded-2xl border bg-card">
                    <article className="group relative h-full overflow-hidden p-7">
                      <span
                        aria-hidden
                        className="absolute right-0 top-0 -translate-y-4 translate-x-6 font-mono text-6xl font-bold text-muted/60 transition-colors duration-300 group-hover:text-accent/40"
                      >
                        0{i + 1}
                      </span>
                      <span className="relative flex size-12 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground ring-1 ring-accent/40 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                        <Icon className="size-6" />
                      </span>
                      <h3 className="mt-5 font-display text-xl font-bold">
                        {c.title}
                      </h3>
                      {c.name && (
                        <p className="mt-2 flex items-start gap-1.5 font-mono text-sm font-semibold">
                          <Quote className="mt-0.5 size-3.5 shrink-0 rotate-180 text-accent-foreground" />
                          {c.name}
                        </p>
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {c.text}
                      </p>
                      <span className="mt-5 block h-1 w-10 rounded-full bg-accent transition-all duration-500 group-hover:w-16" />
                    </article>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
