import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  duration?: number;
  className?: string;
}

export function CountUp({ to, duration = 1.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("id-ID")}
    </span>
  );
}
