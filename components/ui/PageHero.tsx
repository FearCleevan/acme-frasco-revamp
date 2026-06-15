import Link from "next/link";

interface PageHeroProps {
  imageUrl: string;
  imageAlt: string;
  /** Eyebrow mono line e.g. "Dartmouth, Nova Scotia" */
  tag: string;
  /** First line — large display text */
  titleLine1: string;
  /** Second line — rendered at reduced opacity */
  titleLine2: string;
  subtitle: string;
  /** Optional certification / badge line below subtitle */
  badgeLine?: string;
  /** Accent colour for the eyebrow line and divider bar */
  accentColor?: "orange" | "amber";
}

export default function PageHero({
  imageUrl,
  imageAlt,
  tag,
  titleLine1,
  titleLine2,
  subtitle,
  badgeLine,
  accentColor = "orange",
}: PageHeroProps) {
  const accentBar   = accentColor === "amber" ? "bg-amber" : "bg-orange";
  const accentText  = accentColor === "amber" ? "text-amber" : "text-orange";

  return (
    <section className="relative h-[65vh] min-h-[400px] overflow-hidden flex items-center">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-ink/80" />

      {/* Blueprint overlay */}
      <div className="absolute inset-0 blueprint opacity-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="anim-up">
          {/* Back to home link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-orange transition-colors mb-8"
          >
            <svg
              width="12" height="12" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            >
              <path d="M19 12H5m7-7-7 7 7 7" />
            </svg>
            Back to Home
          </Link>

          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-10 h-[2px] ${accentBar}`} />
            <span className={`font-mono text-[10px] uppercase tracking-[.25em] ${accentText}`}>
              {tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-label text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight leading-none mb-6">
            {titleLine1}
            <br />
            <span className="text-white/40">{titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 max-w-xl font-body text-base leading-relaxed">
            {subtitle}
          </p>

          {/* Optional badge line */}
          {badgeLine && (
            <div className={`mt-4 font-mono text-[10px] uppercase tracking-widest ${accentText}`}>
              {badgeLine}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
