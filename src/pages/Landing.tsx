import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { Pengurus } from "@/components/site/Pengurus";
import { Anggota } from "@/components/site/Anggota";
import { Jadwal } from "@/components/site/Jadwal";
import { Galeri } from "@/components/site/Galeri";
import { Statistik } from "@/components/site/Statistik";
import { Kontak } from "@/components/site/Kontak";
import { CtaBand } from "@/components/site/CtaBand";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { Loader } from "@/components/site/Loader";
import { ScrollProgress } from "@/components/site/ScrollProgress";

export default function Landing() {
  const [loading, setLoading] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? false
        : true,
  );
  const [started, setStarted] = useState(false);

  const handleLoaderDone = () => {
    setLoading(false);
    setStarted(true);
  };

  return (
    <div className="grain min-h-screen">
      {loading && <Loader onDone={handleLoaderDone} />}
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero started={started} />
        <Marquee />
        <About />
        <Pengurus />
        <Anggota />
        <Jadwal />
        <Galeri />
        <Statistik />
        <Kontak />
      </main>
      <CtaBand />
      <Footer />
      <BackToTop />
    </div>
  );
}
