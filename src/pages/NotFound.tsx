import { Link } from "react-router";
import { ArrowLeft, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grain flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground ring-1 ring-accent/40">
          <Code2 className="size-7" />
        </span>
        <p className="mt-5 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          404 — Halaman tidak ditemukan
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Error, kayak kode yang{" "}
          <span className="bg-accent px-1.5 rounded-sm text-accent-foreground">
            belum dibenerin
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Halaman yang kamu cari tidak ada atau sudah dipindah. Tenang — kami
          para siswa RPL juga sering nyasar, yang penting coba-coba terus.
        </p>
        <Button asChild className="mt-8 rounded-full">
          <Link to="/">
            <ArrowLeft className="size-4" />
            Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  );
}
