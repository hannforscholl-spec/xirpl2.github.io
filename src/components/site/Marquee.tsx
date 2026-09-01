import {
  Code2,
  Database,
  Layout,
  Smartphone,
  Palette,
  Network,
  GitBranch,
  Rocket,
  Users,
  Trophy,
  Lightbulb,
  Terminal,
} from "lucide-react";

const rowOne = [
  { label: "Konsentrasi Keahlian RPL", icon: Terminal },
  { label: "Web Development", icon: Code2 },
  { label: "Database", icon: Database },
  { label: "UI / UX Design", icon: Layout },
  { label: "Mobile Development", icon: Smartphone },
  { label: "Desain Grafis", icon: Palette },
];

const rowTwo = [
  { label: "Jaringan & Komputer", icon: Network },
  { label: "Version Control", icon: GitBranch },
  { label: "Produk Kreatif", icon: Rocket },
  { label: "Kolaborasi Tim", icon: Users },
  { label: "Prestasi", icon: Trophy },
  { label: "Inovasi", icon: Lightbulb },
];

function Row({
  items,
  reverse,
}: {
  items: typeof rowOne;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="pause-on-hover overflow-hidden py-2">
      <div
        className={`flex w-max items-center ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => {
          const Icon = item.icon;
          return (
            <span
              key={`${item.label}-${i}`}
              className={`mr-3 flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 font-mono text-xs sm:text-sm ${
                reverse
                  ? "border-accent/40 bg-accent/15 text-foreground"
                  : "bg-card text-muted-foreground"
              }`}
            >
              <Icon className="size-3.5" />
              {item.label}
              <span className="text-accent-foreground/60">✦</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section
      aria-label="Mata pelajaran dan keahlian kelas"
      className="relative -mt-2 border-y bg-background/60 py-3 backdrop-blur"
    >
      <Row items={rowOne} />
      <Row items={rowTwo} reverse />
    </section>
  );
}
