import { motion } from "framer-motion";
import { Camera, ImageIcon } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { photoUrl } from "@/data/students";
import { cn } from "@/lib/utils";

const items = [
  {
    src: "lock.jpg",
    caption: "Foto Bersama Kelas",
    meta: "Dokumentasi resmi",
    className: "sm:col-span-2 sm:row-span-2",
    clip: "inset(0 0 0 0)",
  },
  {
    src: "lock.jpg",
    caption: "Momen Kebersamaan",
    meta: "Kegiatan kelas",
    className: "",
    clip: "inset(0 100% 0 0)",
  },
  {
    src: "lock.jpg",
    caption: "Sesi Belajar",
    meta: "Suasana kelas",
    className: "",
    clip: "inset(100% 0 0 0)",
  },
  {
    src: "lock.jpg",
    caption: "Teman Sekelas",
    meta: "Anggota kami",
    className: "",
    clip: "inset(0 0 100% 0)",
  },
  {
    src: "lock.jpg",
    caption: "Kebersamaan XI RPL 2",
    meta: "Dokumentasi kelas",
    className: "sm:col-span-2",
    clip: "inset(0 0 0 100%)",
  },
];

export function Galeri() {
  return (
    <section id="galeri" className="relative scroll-mt-20 overflow-hidden bg-muted/40 py-20 sm:py-28">
      {/* Dekorasi */}
      <motion.div
        initial={{ opacity: 0, rotate: 12 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute left-[5%] top-20 hidden text-accent-foreground/30 md:block"
      >
        <ImageIcon className="size-12" strokeWidth={1.2} />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            index="05"
            eyebrow="Galeri Momen"
            title="Cerita dalam"
            highlight="Gambar"
            description="Dokumentasi kebersamaan dan kegiatan berharga kelas XI RPL 2 — dari bangku sekolah sampai tugas kelompok."
          />
          <Reveal delay={0.15}>
            <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground lg:text-right">
              <Camera className="size-4" />
              #xirpl2momen
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={{ clipPath: item.clip }}
              whileInView={{ clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-card",
                item.className,
              )}
            >
              <img
                src={photoUrl(item.src)}
                alt={item.caption}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display text-sm font-bold text-white">
                  {item.caption}
                </p>
                <p className="font-mono text-[11px] text-white/70">
                  {item.meta}
                </p>
              </figcaption>
              <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                <Camera className="size-4" />
              </span>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
