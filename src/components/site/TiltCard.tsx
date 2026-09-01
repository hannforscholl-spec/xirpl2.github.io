import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

/** Kartu 3D yang miring mengikuti posisi kursor. */
export function TiltCard({ children, className, max = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateY(-4px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("will-change-transform", className)}
      style={{
        transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}
