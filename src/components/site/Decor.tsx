import { cn } from "@/lib/utils";

/** 8-titik asterisk/bintang — hiasan signature tema */
export function Asterisk({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("size-6", className)}
    >
      <path
        d="M12 2v20M4.9 5.6l14.2 12.8M19.1 5.6L4.9 18.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Garis bawah goyang ala highlighter manual */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" fill="none" aria-hidden className={cn("size-full", className)} preserveAspectRatio="none">
      <path
        d="M2 8c8-5 14 3 22 0s16-5 24 0 14 3 22 0 16-5 24 0 14 3 22 0"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Blob organik untuk latar halus */
export function Blob({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="currentColor" aria-hidden className={cn("size-40", className)}>
      <path
        d="M45.7,-68.2C58.1,-58.6,66.8,-44.3,72.7,-28.7C78.6,-13.1,81.8,3.7,77.6,19.1C73.4,34.5,61.8,48.5,47.3,58.9C32.8,69.3,15.3,76.1,-2.6,79.8C-20.5,83.5,-38.8,84.1,-52.6,75.6C-66.4,67.1,-75.7,49.5,-79.5,31.2C-83.3,12.9,-81.6,-6.2,-74.5,-21.4C-67.4,-36.6,-54.9,-47.9,-40.9,-57.3C-26.9,-66.7,-11.4,-74.2,2.9,-78.3C17.2,-82.4,33.3,-77.8,45.7,-68.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

/** Kumpulan titik dekoratif */
export function DotCluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="currentColor" aria-hidden className={cn("size-12", className)}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="36" cy="8" r="2" />
      <circle cx="60" cy="16" r="3.5" />
      <circle cx="76" cy="8" r="2" />
      <circle cx="20" cy="34" r="2" />
      <circle cx="44" cy="30" r="3" />
      <circle cx="68" cy="34" r="2.5" />
      <circle cx="8" cy="60" r="2.5" />
      <circle cx="32" cy="56" r="3" />
      <circle cx="56" cy="62" r="2" />
    </svg>
  );
}

/** Kurung kode { } — hiasan tema RPL */
export function Brackets({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={cn("size-10", className)}>
      <path
        d="M16 8H8v32h8M32 8h8v32h-8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Tanda plus dekoratif */
export function PlusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={cn("size-5", className)}>
      <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Lingkaran outline */
export function Ring({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className={cn("size-20", className)}>
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 8" />
    </svg>
  );
}

/** Panah zig-zag dekoratif */
export function ArrowSquiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" aria-hidden className={cn("size-24", className)}>
      <path
        d="M6 8c14 0 10 16 24 16s10-16 24-16 10 16 24 16 10-16 24-16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M96 6l10 2-10 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Grid garis halus */
export function LineGrid({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden className={cn("size-48", className)}>
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={`v${i}`}
          d={`M${i * 26 + 4} 4 V196`}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={`h${i}`}
          d={`M4 ${i * 26 + 4} H196`}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      ))}
    </svg>
  );
}
