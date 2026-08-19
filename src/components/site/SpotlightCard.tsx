import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Warna spotlight, mis. "rgba(250, 204, 21, 0.14)" */
  color?: string;
  spotSize?: number;
}

/** Kartu dengan sorotan radial yang mengikuti kursor. */
export function SpotlightCard({
  children,
  className,
  color = "rgba(250, 204, 21, 0.16)",
  spotSize = 260,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn("group relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${spotSize}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
