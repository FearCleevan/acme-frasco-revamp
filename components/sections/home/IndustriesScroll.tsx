"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { homepageIndustries } from "@/lib/data/industries";

const GAP = 20; // gap-5 = 20px
const N = homepageIndustries.length; // 6
// Triple the items so we always have slides to the left and right
const TRACK = [...homepageIndustries, ...homepageIndustries, ...homepageIndustries];

export default function IndustriesScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(N); // start at middle set
  const [animated, setAnimated] = useState(true);

  // Measure container → derive visible count + card width
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const visible = w < 640 ? 1 : 3;
      setVisibleCount(visible);
      setCardWidth((w - GAP * (visible - 1)) / visible);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Re-enable animation one frame after a silent position reset
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  // Auto-advance timer — resets on manual nav
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setAnimated(true);
      setIndex((prev) => prev + 1);
    }, 4000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  // After each transition: silently jump back to the middle set if at boundary
  const handleTransitionEnd = useCallback(() => {
    setIndex((prev) => {
      if (prev >= N * 2) {
        setAnimated(false);
        return prev - N;
      }
      if (prev < N) {
        setAnimated(false);
        return prev + N;
      }
      return prev;
    });
  }, []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      setAnimated(true);
      setIndex((prev) => prev + dir);
      resetTimer();
    },
    [resetTimer]
  );

  const translateX = cardWidth > 0 ? -(index * (cardWidth + GAP)) : 0;

  return (
    <section id="industries" className="py-24 bg-ink overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left column */}
          <div className="flex-1 lg:max-w-sm pt-4">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-10 bg-orange" />
                <span className="font-mono text-[10px] uppercase tracking-[.25em] text-white/50">
                  Sectors Served
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-8">
                Trusted Across<br />Heavy Industry.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-white/60 mb-10 leading-relaxed font-body text-sm">
                Energy, refining, power generation, heating &amp; cooling, marine, mining,
                welding, fabrication, offshore, pulp &amp; paper, maintenance &amp;
                construction, environmental, and crane &amp; lifting — served domestically
                and internationally.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-orange text-white px-6 py-3 font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-amber hover:text-ink transition-colors"
              >
                Request Inspection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>

          {/* Right carousel */}
          <div className="flex-1 w-full min-w-0">
            <div ref={containerRef} className="overflow-hidden">
              {/* eslint-disable-next-line react/forbid-dom-props */}
              <div
                className="carousel-track"
                style={{
                  "--carousel-translate": `${translateX}px`,
                  "--carousel-transition": animated
                    ? "transform 0.75s cubic-bezier(.16,1,.3,1)"
                    : "none",
                } as React.CSSProperties}
                onTransitionEnd={handleTransitionEnd}
              >
                {TRACK.map((industry, i) => (
                  // eslint-disable-next-line react/forbid-dom-props
                  <div
                    key={i}
                    className="carousel-card relative h-[380px] overflow-hidden group border border-white/5 shadow-heavy"
                    style={{ "--card-width": cardWidth > 0 ? `${cardWidth}px` : "auto" } as React.CSSProperties}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={industry.imageUrl}
                      alt={industry.name}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-ink/70 group-hover:bg-ink/30 transition-colors duration-500" />
                    <div className="absolute inset-0 p-7 flex flex-col justify-between text-white">
                      <h3 className="font-label text-2xl font-bold whitespace-pre-line leading-tight">
                        {industry.name}
                      </h3>
                      <div className="font-label text-[80px] italic opacity-10 text-orange leading-none text-right select-none">
                        {String((i % N) + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow nav */}
            <div className="flex gap-4 mt-6 justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Previous"
                className="w-12 h-12 border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-ink transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M19 12H5m7-7-7 7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => navigate(1)}
                aria-label="Next"
                className="w-12 h-12 bg-orange text-white flex items-center justify-center hover:bg-amber hover:text-ink transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
