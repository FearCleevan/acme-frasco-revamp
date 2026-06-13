import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { aboutIndustries } from "@/lib/data/industries";

export default function IndustriesGrid() {
  return (
    <section id="industries" className="py-24 bg-ink">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: copy */}
          <ScrollReveal className="lg:w-2/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-10 bg-orange" />
              <span className="font-mono text-[10px] uppercase tracking-[.25em] text-orange">
                Sectors Served
              </span>
            </div>
            <h2 className="font-label text-3xl md:text-4xl font-bold text-white uppercase tracking-tight mb-6 leading-tight">
              Industries We Serve
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed font-body text-sm">
              Frasco&apos;s team has extensive experience serving the widest range
              of heavy industry — deploying domestically and internationally on
              projects of all scales.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-orange text-white px-6 py-3 font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-amber hover:text-ink transition-colors"
            >
              Request an Inspection →
            </Link>
          </ScrollReveal>

          {/* Right: tiles grid */}
          <ScrollReveal className="lg:w-3/5 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {aboutIndustries.map((industry, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mb-3 ${
                      industry.accentColor === "amber"
                        ? "bg-amber"
                        : "bg-orange"
                    }`}
                  />
                  <div className="font-label font-bold text-white text-sm">
                    {industry.name}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
