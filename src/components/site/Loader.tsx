import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";

interface LoaderProps {
  onDone: () => void;
}

const DURATION = 1500;

export function Loader({ onDone }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };
    const finish = () => {
      setExiting(true);
      setTimeout(onDone, 950);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const skip = () => {
    setExiting(true);
    setTimeout(onDone, 950);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Memuat"
        >
          {/* Panel atas — logo & nama */}
          <motion.div
            className="absolute inset-x-0 top-0 flex h-1/2 items-center justify-center overflow-hidden bg-background"
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          >
            <div className="flex flex-col items-center pt-10">
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex size-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-xl"
              >
                <Code2 className="size-9" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl"
              >
                XI RPL 2
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-1 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground"
              >
                SMKN 1 Rembang
              </motion.p>
            </div>
          </motion.div>

          {/* Panel bawah — progress */}
          <motion.div
            className="absolute inset-x-0 bottom-0 flex h-1/2 flex-col items-center justify-start bg-background pt-8"
            exit={{ y: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          >
            <div className="flex w-full max-w-xs flex-col items-center gap-3 px-6">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="flex w-full items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span>memuat masa depan…</span>
                <span className="tabular-nums text-foreground">{progress}%</span>
              </div>
            </div>
            <button
              type="button"
              onClick={skip}
              className="mt-6 cursor-pointer font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              lewati →
            </button>
          </motion.div>

          {/* Garis pemisah panel */}
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/70 to-transparent"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
