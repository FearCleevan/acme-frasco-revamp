"use client";

import Link from "next/link";

const tickerItems = [
  { text: "CGSB-48.9712 Certified", dot: "orange" },
  { text: "Eddy Current Testing",   dot: "orange" },
  { text: "Ultrasonic Testing",     dot: "orange" },
  { text: "API 510 · 570 · 653",    dot: "amber"  },
  { text: "Tube Inspection",        dot: "orange" },
  { text: "Asset Integrity",        dot: "orange" },
  { text: "CWB CSA W178.2",         dot: "amber"  },
  { text: "Same-Day Results",       dot: "orange" },
];

function TickerRow() {
  return (
    <span className="flex items-center gap-8 shrink-0">
      {tickerItems.map(({ text, dot }, i) => (
        <span key={i} className="flex items-center gap-8">
          <span>{text}</span>
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block ${
              dot === "amber" ? "bg-amber" : "bg-orange"
            }`}
          />
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/image.webp"
        alt="Industrial inspection"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-ink/65" />
      <div className="absolute inset-0 blueprint opacity-50 pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 anim-fade d1000 hidden md:flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Scroll</span>
        <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[40%] bg-orange animate-bounce" />
        </div>
      </div>

      {/* Hero layout: card left + badge right, naturally top-aligned */}
      <div className="relative flex items-start justify-between max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20 pb-20 md:pt-24 md:pb-24">

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-lg border-l-4 border-orange px-5 pt-6 pb-5 sm:px-8 sm:pt-8 sm:pb-6 md:px-12 md:pt-10 md:pb-8 max-w-[640px] w-full shadow-heavy anim-up d700 self-start">
          <div className="space-y-5 sm:space-y-6">

            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-orange" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.2em] sm:tracking-[.25em] text-lead">
                Non-Destructive Testing · Nova Scotia
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-label text-[28px] sm:text-[36px] lg:text-[52px] leading-tight lg:leading-[1.0] font-bold text-ink tracking-tight">
              THE STANDARD<br />OF INDUSTRIAL<br />
              <span className="bg-orange text-white px-2 py-1 anim-revL inline-block">
                PRECISION
              </span>
            </h1>

            {/* Divider line */}
            <div className="w-full h-[1px] bg-ghost anim-line" />

            {/* Body + CTAs */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <p className="text-ink/70 text-sm sm:text-[15px] leading-relaxed opacity-0 anim-fade d1000">
                Certified personnel. On-site. Same-day results. Available 24/7
                across Nova Scotia, New Brunswick, Newfoundland and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 opacity-0 anim-fade d1200">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-orange text-white font-mono text-[11px] uppercase tracking-widest px-7 py-3 hover:bg-ink transition-colors duration-300"
                >
                  Request Inspection
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center justify-center bg-ink text-white font-mono text-[11px] uppercase tracking-widest px-7 py-3 hover:bg-orange transition-colors duration-300"
                >
                  View Capabilities
                </Link>
              </div>
            </div>

            {/* Ticker strip */}
            <div className="pt-1">
              <div className="w-full h-[1px] bg-ghost mb-3" />
              <div className="overflow-hidden w-full h-7">
                <div className="ticker flex gap-8 whitespace-nowrap font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-ink font-bold">
                  <TickerRow />
                  <TickerRow />
                </div>
              </div>
              <div className="w-full h-[1px] bg-ghost mt-3" />
            </div>

          </div>
        </div>

        {/* Status badge — hidden on mobile, flex sibling on md+ */}
        <div className="ml-8 shrink-0 hidden lg:block anim-fade d500 self-start">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur border border-white/15 px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white">
              24/7 Available · Dartmouth, NS
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
