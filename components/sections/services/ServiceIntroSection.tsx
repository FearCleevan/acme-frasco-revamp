import ScrollReveal from "@/components/ui/ScrollReveal";

export type StatBlock = {
  value: string;
  label: string;
  /** Tailwind bg + text classes e.g. "bg-orange text-white" */
  style: string;
  /** Optional: span all columns */
  colSpan?: boolean;
};

export type CalloutBlock = {
  eyebrow: string;
  body: string;
  /** Tailwind border-l color class e.g. "border-orange" */
  accentBorder: string;
  /** Tailwind text color for eyebrow, defaults "text-orange" */
  eyebrowColor?: string;
};

interface ServiceIntroSectionProps {
  heading: string;
  paragraphs: string[];
  statBlocks: StatBlock[];
  callout: CalloutBlock;
  /** Tailwind grid-cols class, default "grid-cols-3" */
  gridCols?: string;
}

export default function ServiceIntroSection({
  heading,
  paragraphs,
  statBlocks,
  callout,
  gridCols = "grid-cols-3",
}: ServiceIntroSectionProps) {
  return (
    <section className="py-20 bg-white border-b border-ghost">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-center">

        {/* Left: copy */}
        <ScrollReveal className="lg:w-1/2">
          <h2 className="font-label text-3xl md:text-4xl font-bold text-ink uppercase tracking-tight mb-6 leading-tight">
            {heading}
          </h2>
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-lead leading-relaxed font-body text-sm md:text-base">
                {p}
              </p>
            ))}
          </div>
        </ScrollReveal>

        {/* Right: stat grid + callout */}
        <ScrollReveal className="lg:w-1/2 w-full">
          <div className={`grid ${gridCols} gap-4`}>
            {statBlocks.map((block, i) => (
              <div
                key={i}
                className={`${block.style} p-6 flex flex-col gap-2 ${block.colSpan ? "col-span-3" : ""}`}
              >
                <div className="font-label text-4xl font-bold">{block.value}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest opacity-75">
                  {block.label}
                </div>
              </div>
            ))}

            {/* Callout */}
            <div className={`col-span-full bg-panel text-white p-6 border-l-4 ${callout.accentBorder}`}>
              <p className={`font-mono text-[11px] uppercase tracking-widest mb-2 ${callout.eyebrowColor ?? "text-orange"}`}>
                {callout.eyebrow}
              </p>
              <p className="font-body text-sm text-white/70">{callout.body}</p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
