"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Layer 0 = front white card, layers 1–3 = stacked behind it
// Colors chosen so each layer is visually distinct
const LAYER_BG = ["bg-white", "bg-soft", "bg-lead", "bg-ink"];

export default function CtaStack() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const layers = stack.querySelectorAll<HTMLElement>("[data-layer]");

    // Start all layers invisible
    layers.forEach((layer) => {
      layer.style.opacity = "0";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        layers.forEach((layer) => {
          const d = parseInt(layer.dataset.layer ?? "0", 10);
          layer.style.transition = "opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)";
          layer.style.opacity = "1";
          layer.style.transform =
            d === 0 ? "" : `translate(${d * -16}px, ${d * 13}px)`;
        });
        observer.unobserve(stack);
      },
      { threshold: 0.2 }
    );

    observer.observe(stack);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 bg-orange">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">

        {/* ── Left: stacked card ── */}
        <div className="lg:w-1/2">
          <div ref={stackRef} className="relative min-h-[460px]">

            {/* Background layers (3 → 1, rendered back to front) */}
            {[3, 2, 1].map((d) => (
              <div
                key={d}
                data-layer={d}
                className={`absolute inset-0 w-[96%] ${LAYER_BG[d]}`}
              />
            ))}

            {/* Front card — layer 0 */}
            <div
              data-layer="0"
              className="relative z-10 bg-white p-10 md:p-14 border border-ghost shadow-heavy flex flex-col gap-10"
            >
              {/* ECG icon */}
              <div className="w-14 h-14 bg-ink flex items-center justify-center shrink-0">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e8600c" strokeWidth="2" strokeLinecap="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <p className="font-mono text-[11px] uppercase tracking-[.25em] text-orange font-bold">
                  Every hour of downtime costs money
                </p>
                <h3 className="font-label text-3xl md:text-5xl font-bold text-ink uppercase tracking-tight leading-tight">
                  Keep Your<br />Facility Running.
                </h3>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <a
                  href="tel:19024315483"
                  className="flex items-center gap-3 text-ink font-display text-3xl font-bold hover:text-orange transition-colors"
                >
                  1-902-431-5483
                </a>
                <div className="font-mono text-[10px] uppercase tracking-widest text-lead">
                  25 Raddall Ave., Unit 4 · Dartmouth, NS B3B 1L4<br />
                  NS · NB · Newfoundland · Canada · USA · Overseas
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-orange text-white font-mono text-[11px] uppercase tracking-widest px-8 py-4 hover:bg-ink transition-colors w-full sm:w-auto"
              >
                Request an Inspection →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Right: text + certs ── */}
        <ScrollReveal className="lg:w-1/2 space-y-8">
          <h2 className="font-label text-3xl md:text-5xl font-bold text-white uppercase tracking-tight leading-tight">
            FRASCO strives to be a leader in all aspects of industrial inspection.
          </h2>
          <p className="text-white/85 leading-relaxed font-body">
            A team of skilled certified personnel available 24/7 to safely execute any
            project — increasing reliability, productivity and safety while ensuring asset
            integrity. Services delivered on a local, domestic and international level.
          </p>

          {/* Cert row */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/20">
            <div>
              <div className="text-white text-2xl font-display font-bold mb-1">CAN/CGSB</div>
              <div className="text-white/60 text-[10px] font-mono uppercase tracking-widest">48.9712</div>
            </div>
            <div>
              <div className="text-white text-2xl font-display font-bold mb-1">CWB</div>
              <div className="text-white/60 text-[10px] font-mono uppercase tracking-widest">CSA W178.2</div>
            </div>
            <div>
              <div className="text-white text-2xl font-display font-bold mb-1">API</div>
              <div className="text-white/60 text-[10px] font-mono uppercase tracking-widest">510 · 570 · 653</div>
            </div>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-3 bg-white text-orange font-mono text-[11px] uppercase tracking-widest font-bold px-6 py-3 hover:bg-ink hover:text-white transition-colors"
          >
            Learn About Frasco →
          </Link>
        </ScrollReveal>

      </div>
    </section>
  );
}
