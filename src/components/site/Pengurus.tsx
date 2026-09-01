import { motion } from "framer-motion";
import { Instagram, Star } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TiltCard } from "@/components/site/TiltCard";
import { Brackets } from "@/components/site/Decor";
import { pengurus, photoUrl, type Student } from "@/data/students";

const roleLabels: Record<string, string> = {
  "Ketua Kelas": "Ketua Kelas",
  "Wakil Ketua": "Wakil Ketua",
  "Sekretaris 1": "Sekretaris 1",
  "Sekretaris 2": "Sekretaris 2",
  "Bendahara 1": "Bendahara 1",
  "Bendahara 2": "Bendahara 2",
  "S.Kebersihan 1": "Seksi Kebersihan",
  "S.Kebersihan 2": "Seksi Kebersihan",
  "S.Keamanan 1": "Seksi Keamanan",
  "S.Keamanan 2": "Seksi Keamanan",
  "S.Ketertiban 1": "Seksi Ketertiban",
  "S.Ketertiban 2": "Seksi Ketertiban",
};

function OfficerCard({ s, index }: { s: Student; index: number }) {
  const isChair = s.role === "Ketua Kelas" || s.role === "Wakil Ketua";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <TiltCard max={9}>
        <div className="relative overflow-hidden rounded-2xl border bg-card">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={photoUrl(s.photo)}
              alt={s.name}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
            {s.instagram && s.handle !== "-" && (
              <a
                href={s.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram ${s.name}`}
                className="absolute right-3 top-3 flex size-9 translate-y-1 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 hover:bg-white hover:text-black group-hover:translate-y-0 group-hover:opacity-100"
              >
                <Instagram className="size-4" />
              </a>
            )}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                No. {String(s.absen).padStart(2, "0")}
              </p>
              <h3 className="mt-0.5 font-display text-base font-bold leading-tight text-white">
                {s.name}
              </h3>
              <span className="mt-2 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-accent-foreground">
                {roleLabels[s.role] ?? s.role}
              </span>
            </div>
          </div>
        </div>
      </TiltCard>
      {isChair && (
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.05, type: "spring", stiffness: 300, damping: 15 }}
          className="absolute -top-2.5 left-4 flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 font-mono text-[10px] font-semibold text-background shadow"
        >
          <Star className="size-3 fill-current" /> LEADER
        </motion.span>
      )}
    </motion.div>
  );
}

export function Pengurus() {
  return (
    <section id="pengurus" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      {/* Dekorasi */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute right-[3%] top-24 text-foreground/15"
      >
        <Brackets className="size-20" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            index="02"
            eyebrow="Struktur Kelas"
            title="Pengurus"
            highlight="Kelas"
            description="Dua belas siswa yang memegang amanah organisasi kelas — menggerakkan komunikasi, kebersihan, keamanan, hingga kekompakan XI RPL 2."
          />
          <Reveal delay={0.15}>
            <p className="font-mono text-xs text-muted-foreground lg:text-right">
              12 / 36 siswa memegang peran
              <br />
              <span className="text-foreground">#xirpl2pengurus</span>
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {pengurus.map((s, i) => (
            <OfficerCard key={s.absen} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
