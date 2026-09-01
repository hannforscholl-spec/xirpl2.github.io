import { useState } from "react";
import { Mail, MapPin, Instagram, Music2, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Magnetic } from "@/components/site/Magnetic";
import { Asterisk, Squiggle } from "@/components/site/Decor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const socials = [
  {
    icon: Instagram,
    label: "Instagram Kelas",
    handle: "@xirpl2.officiall",
    href: "https://www.instagram.com/xirpl2.officiall?igsh=MWkyMmUyNGRjcGxvdg==",
  },
  {
    icon: Music2,
    label: "TikTok Kelas",
    handle: "@xirpl2.smkn1rembang",
    href: "https://www.tiktok.com/@xirpl2.smkn1rembang?_r=1&_t=ZS-98SE2EoLWxJ",
  },
];

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Kontak() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const sendMessage = useMutation(api.messages.send);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await sendMessage({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="kontak"
      className="relative scroll-mt-20 overflow-hidden bg-muted/40 py-20 sm:py-28"
    >
      {/* Dekorasi */}
      <motion.div
        initial={{ opacity: 0, rotate: 24 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-10 left-[4%] hidden text-accent-foreground/40 md:block"
      >
        <Asterisk className="size-10 animate-spin-slow" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute right-[5%] top-16 hidden -rotate-12 text-accent-foreground/30 lg:block"
      >
        <Squiggle className="h-6 w-24" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="06"
          eyebrow="Hubungi Kami"
          title="Sapa"
          highlight="XI RPL 2"
          description="Kirimkan pesan, saran, atau tawaran kolaborasi. Kami adalah kelas yang ramah — balasannya mungkin agak telat kalau lagi deadline tugas coding."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* Info — masuk dari kiri */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-70px" }}
          >
            <div className="flex h-full flex-col gap-4">
              <div className="flex items-start gap-4 rounded-2xl border bg-card p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground ring-1 ring-accent/40">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">SMKN 1 Rembang</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Dusun I, Bodas Karangjati, Rembang, Purbalingga Regency, Central Java 53356
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border bg-card p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground ring-1 ring-accent/40">
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Surat & Kolaborasi</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Kirim lewat form, atau DM Instagram kelas kami.
                  </p>
                </div>
              </div>

              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground ring-1 ring-accent/40 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{s.label}</p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {s.handle}
                        </p>
                      </div>
                    </div>
                    <Send className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Form — masuk dari kanan */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-70px" }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border bg-card p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium"
                  >
                    Nama Lengkap
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    placeholder="Nama kamu"
                    className="h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium"
                  >
                    Alamat Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="nama@email.com"
                    className="h-11"
                  />
                </div>
              </div>
              <div className="mt-5 grid gap-2">
                <label htmlFor="contact-message" className="text-sm font-medium">
                  Pesan
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tulis pesan, saran, atau tawaran kolaborasi..."
                  className="resize-none"
                />
              </div>

              {status === "sent" && (
                <p className="mt-4 rounded-lg bg-accent/20 px-4 py-3 text-sm font-medium text-accent-foreground ring-1 ring-accent/40">
                  ✓ Pesan terkirim! Terima kasih sudah menyapa XI RPL 2.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive ring-1 ring-destructive/30">
                  Gagal mengirim pesan. Coba lagi atau hubungi lewat Instagram.
                </p>
              )}

              <Magnetic strength={0.2} className="w-full">
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                  className="group mt-6 w-full rounded-full shadow-lg shadow-accent/20"
                >
                  {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
                  <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </Button>
              </Magnetic>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
