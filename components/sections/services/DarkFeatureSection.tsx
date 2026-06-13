import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export type FeatureStat = {
  value: string;
  label: string;
  /** Tailwind bg class e.g. "bg-orange" or "bg-white/5 border border-white/10" */
  style: string;
  /** Text color for value, defaults white */
  valueColor?: string;
};

export type DeliverablesList = {
  eyebrow: string;
  items: string[];
};

interface DarkFeatureSectionProps {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  statsGrid: FeatureStat[];
  /** Optional deliverables panel rendered below statsGrid (Tube page) */
  deliverables?: DeliverablesList;
  /** Use amber CTA instead of orange */
  accentColor?: "orange" | "amber";
}

export default function DarkFeatureSection({
  eyebrow,
  heading,
  paragraphs,
  bullets,
  ctaLabel,
  ctaHref,
  statsGrid,
  deliverables,
  accentColor = "orange",
}: DarkFeatureSectionProps) {
  const bulletDot = accentColor === "amber" ? "bg-amber" : "bg-orange";
  const ctaClass =
    accentColor === "amber"
      ? "bg-amber text-ink hover:bg-orange hover:text-white"
      : "bg-orange text-white hover:bg-amber hover:text-ink";

  return (
    <section className="py-24 bg-ink relative overflow-hidden">
      <div className="absolute inset-0 blueprint opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 items-center">

        {/* Left: copy */}
        <ScrollReveal className="lg:w-1/2">
          <div className="flex items-center gap-4 mb-8">
            <div className={`h-[1px] w-10 ${accentColor === "amber" ? "bg-amber" : "bg-orange"}`} />
            <span className={`font-mono text-[10px] uppercase tracking-[.25em] ${accentColor === "amber" ? "text-amber" : "text-orange"}`}>
              {eyebrow}
            </span>
          </div>
          <h2 className="font-label text-3xl md:text-4xl font-bold text-white uppercase tracking-tight mb-6 leading-tight">
            {heading}
          </h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-white/65 mb-6 leading-relaxed font-body text-sm md:text-base">
              {p}
            </p>
          ))}
          <ul className="space-y-3 mb-8">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-center gap-3 text-white/70 text-sm font-body">
                <div className={`w-1.5 h-1.5 ${bulletDot} rounded-full shrink-0`} />
                {bullet}
              </li>
            ))}
          </ul>
          <Link
            href={ctaHref}
            className={`inline-flex items-center gap-3 px-6 py-3 font-mono text-[11px] uppercase tracking-widest font-bold transition-colors ${ctaClass}`}
          >
            {ctaLabel} →
          </Link>
        </ScrollReveal>

        {/* Right: stats grid + optional deliverables */}
        <ScrollReveal className="lg:w-1/2 w-full" direction="left">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {statsGrid.map((stat, i) => (
                <div key={i} className={`${stat.style} p-6`}>
                  <div className={`text-3xl font-display font-bold mb-2 ${stat.valueColor ?? "text-white"}`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-60 text-white">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            {deliverables && (
              <div className="bg-white/5 border border-white/10 p-6">
                <p className="text-orange font-mono text-[11px] uppercase tracking-widest mb-3">
                  {deliverables.eyebrow}
                </p>
                <ul className="space-y-2">
                  {deliverables.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/65 text-sm font-body">
                      <div className="w-1 h-1 bg-white/30 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
