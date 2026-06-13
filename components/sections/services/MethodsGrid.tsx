import ScrollReveal from "@/components/ui/ScrollReveal";
import type { MethodCard } from "@/lib/data/services";

interface MethodsGridProps {
  methods: MethodCard[];
  eyebrow: string;
  title: string;
  /** When true, render large opacity number instead of icon box (Tube page) */
  showNumbers?: boolean;
  /** Amber accent changes eyebrow badge and dark card title colour */
  accentColor?: "orange" | "amber";
  /** Tailwind grid cols class override, default "lg:grid-cols-3" */
  colsClass?: string;
}

export default function MethodsGrid({
  methods,
  eyebrow,
  title,
  showNumbers = false,
  accentColor = "orange",
  colsClass = "lg:grid-cols-3",
}: MethodsGridProps) {
  return (
    <section className="py-24 bg-soft">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <ScrollReveal className="mb-16">
          <h2
            className={`text-[10px] font-mono uppercase tracking-widest mb-4 inline-block px-2 py-0.5 ${
              accentColor === "amber"
                ? "bg-amber text-ink"
                : "bg-orange text-white"
            }`}
          >
            {eyebrow}
          </h2>
          <h3 className="font-label text-3xl md:text-4xl font-bold text-ink uppercase tracking-tight">
            {title}
          </h3>
        </ScrollReveal>

        {/* Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${colsClass} gap-5`}>
          {methods.map((method, i) => (
            <ScrollReveal key={method.id} delay={(i % 3) * 100}>
              <div
                className={`scan-card border border-ghost p-8 group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden h-full ${
                  method.isDark ? "bg-ink" : "bg-white"
                }`}
              >
                {showNumbers ? (
                  /* Tube page: large ghost number as visual element */
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`font-display font-bold text-[80px] leading-none select-none absolute top-4 right-4 ${
                        method.isDark ? "text-white/10" : "text-orange/20"
                      }`}
                    >
                      {method.number}
                    </div>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest ${
                        method.isDark ? "text-white/20" : "text-ghost"
                      }`}
                    >
                      {method.number}
                    </span>
                  </div>
                ) : (
                  /* Standard: icon box + number */
                  <div className="flex items-start justify-between mb-6">
                    {method.iconBg && (
                      <div className={`w-12 h-12 ${method.iconBg} flex items-center justify-center`}>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={method.iconStroke}
                          strokeWidth="1.5"
                        >
                          <path d={method.iconPath} />
                        </svg>
                      </div>
                    )}
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest ml-auto ${
                        method.isDark ? "text-white/20" : "text-ghost"
                      }`}
                    >
                      {method.number}
                    </span>
                  </div>
                )}

                <h4
                  className={`font-label text-xl font-bold uppercase tracking-tight mb-3 ${
                    method.isDark
                      ? accentColor === "amber" ? "text-amber" : "text-orange"
                      : "text-ink"
                  }`}
                >
                  {method.title}
                </h4>
                <p
                  className={`text-sm leading-relaxed font-body ${
                    method.isDark ? "text-white/65" : "text-lead"
                  }`}
                >
                  {method.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
