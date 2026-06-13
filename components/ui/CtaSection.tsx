import Link from "next/link";

interface CtaSectionProps {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  /** Use "amber" for the Lifting Equipment page variant */
  accentColor?: "orange" | "amber";
}

export default function CtaSection({
  heading,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  accentColor = "orange",
}: CtaSectionProps) {
  const isAmber = accentColor === "amber";

  return (
    <section className={`py-20 ${isAmber ? "bg-amber" : "bg-orange"}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`font-label text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6 ${isAmber ? "text-ink" : "text-white"}`}>
          {heading}
        </h2>
        <p className={`mb-10 font-body text-lg leading-relaxed ${isAmber ? "text-ink/80" : "text-white/80"}`}>
          {body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryHref}
            className={`font-mono text-[11px] uppercase tracking-widest font-bold px-8 py-4 transition-colors ${
              isAmber
                ? "bg-ink text-white hover:bg-orange hover:text-white"
                : "bg-white text-orange hover:bg-ink hover:text-white"
            }`}
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className={`font-mono text-[11px] uppercase tracking-widest font-bold px-8 py-4 transition-colors ${
              isAmber
                ? "bg-white text-ink hover:bg-ink hover:text-white"
                : "bg-ink text-white hover:bg-white hover:text-orange"
            }`}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
