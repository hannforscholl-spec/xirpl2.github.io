import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-5 z-50"
        >
          <Button
            size="icon"
            aria-label="Kembali ke atas"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-full shadow-lg"
          >
            <ArrowUp className="size-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
