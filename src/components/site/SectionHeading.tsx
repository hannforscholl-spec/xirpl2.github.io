import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <p
        className={cn(
          "font-mono text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase",
          align === "center" && "justify-center",
        )}
      >
        <span className="text-accent-foreground bg-accent px-1.5 py-0.5 rounded-sm mr-2">
          {index}
        </span>
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}{" "}
        {highlight && (
          <span className="relative inline-block">
            <span className="relative z-10">{highlight}</span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-accent/70 -rotate-1"
            />
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
