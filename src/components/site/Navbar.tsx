import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Menu, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "#beranda", label: "Beranda", id: "beranda" },
  { href: "#tentang", label: "Tentang", id: "tentang" },
  { href: "#pengurus", label: "Pengurus", id: "pengurus" },
  { href: "#anggota", label: "Anggota", id: "anggota" },
  { href: "#jadwal", label: "Jadwal", id: "jadwal" },
  { href: "#galeri", label: "Galeri", id: "galeri" },
  { href: "#kontak", label: "Kontak", id: "kontak" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("beranda");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pantau section aktif saat scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a
          href="#beranda"
          className="group flex items-center gap-2.5"
          aria-label="XI RPL 2 — Beranda"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-sm transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110">
            <Code2 className="size-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            XI <span className="text-muted-foreground">RPL</span>{" "}
            <span className="bg-accent px-1.5 py-0.5 rounded-sm text-accent-foreground text-sm">
              2
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {links.map((l) => {
            const active = activeId === l.id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden rounded-full sm:inline-flex">
            <a href="#kontak">
              Hubungi Kami
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full lg:hidden"
                aria-label="Buka menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-display">
                  <Code2 className="size-4" /> XI RPL 2
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Menu seluler">
                {links.map((l, i) => (
                  <SheetClose asChild key={l.href}>
                    <a
                      href={l.href}
                      className="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
                    >
                      <span className="font-mono text-xs text-muted-foreground/70 transition-transform duration-300 group-hover:translate-x-1">
                        0{i + 1}
                      </span>
                      {l.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 px-4 pb-6">
                <SheetClose asChild>
                  <Button asChild className="rounded-full">
                    <a href="#kontak">Hubungi Kami</a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          />
        )}
      </AnimatePresence>
    </header>
  );
}
