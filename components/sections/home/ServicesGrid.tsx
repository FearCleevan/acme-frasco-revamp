import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { homepageServices } from "@/lib/data/services";

function ArrowIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8l4 4-4 4M3 12h18"
      />
    </svg>
  );
}

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-8">
          <ScrollReveal className="max-w-2xl">
            <h2 className="text-[10px] font-mono uppercase tracking-widest text-white mb-4 bg-orange inline-block px-2 py-0.5">
              Inspection Capabilities
            </h2>
            <h3 className="font-label text-3xl md:text-4xl font-bold text-ink uppercase tracking-tight">
              Four Disciplines.<br />One Certified Standard.
            </h3>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-lead max-w-sm font-body text-sm leading-relaxed">
              Solutions delivered locally, domestically and internationally —
              certified technicians, same-day results, no coating removal
              required on most methods.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">

          {homepageServices.map((svc) => (
            <ScrollReveal
              key={svc.id}
              className={svc.featured ? "sm:col-span-2" : ""}
            >
              <Link
                href={svc.href}
                className={`scan-card group relative overflow-hidden border border-ghost block h-full ${
                  svc.darkCard ? "bg-ink" : ""
                }`}
              >
                <div className={`${svc.aspectClass} overflow-hidden`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={svc.imageUrl}
                    alt={svc.title}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                      svc.darkCard
                        ? "opacity-40 group-hover:opacity-70"
                        : "grayscale group-hover:grayscale-0 group-hover:scale-110"
                    }`}
                  />
                </div>
                <div
                  className={`absolute inset-0 ${
                    svc.darkCard
                      ? "bg-gradient-to-t from-ink via-ink/60 to-transparent"
                      : "bg-gradient-to-t from-ink/85 via-transparent to-transparent"
                  }`}
                />
                <div className={`absolute bottom-0 left-0 ${svc.featured ? "p-8" : "p-6"} w-full`}>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest mb-2 block ${
                      svc.accent === "amber" ? "text-amber" : "text-orange"
                    }`}
                  >
                    {svc.eyebrow}
                  </span>
                  <h4
                    className={`font-label font-bold text-white uppercase mb-2 ${
                      svc.featured ? "text-2xl md:text-3xl" : "text-xl"
                    }`}
                  >
                    {svc.title}
                  </h4>
                  <p
                    className={`text-white/75 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      svc.featured ? "text-sm max-w-lg" : "text-xs"
                    }`}
                  >
                    {svc.description}
                  </p>
                  <div className="w-full h-[1px] bg-white/20 mb-4" />
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors text-white ${
                      svc.accent === "amber"
                        ? "group-hover:text-amber"
                        : "group-hover:text-orange"
                    }`}
                  >
                    {svc.ctaLabel} <ArrowIcon />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}

          {/* 24/7 Emergency card */}
          <ScrollReveal>
            <Link
              href="/contact"
              className="group relative bg-orange overflow-hidden border border-ghost flex flex-col items-center justify-center p-10 text-center transition-all duration-500 hover:bg-ink block h-full min-h-[280px]"
            >
              <div className="font-label text-5xl md:text-6xl font-bold text-white group-hover:text-orange transition-colors mb-3 leading-none">
                24/7
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-white/80 group-hover:text-white/60 mb-6">
                Emergency Response
              </div>
              <span className="bg-white text-orange group-hover:bg-orange group-hover:text-white border border-white/30 font-mono text-[10px] uppercase tracking-widest px-6 py-2.5 transition-all duration-300">
                Request Now
              </span>
            </Link>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
