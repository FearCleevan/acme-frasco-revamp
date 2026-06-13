import ScrollReveal from "@/components/ui/ScrollReveal";
import { homepageStats } from "@/lib/data/stats";

export default function StatCounters() {
  return (
    <section className="py-16 bg-ink border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 divide-x divide-white/10">
          {homepageStats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="stat-item flex flex-col items-start px-6 py-6 group">
                <div className="font-label font-bold text-3xl md:text-4xl text-white leading-none mb-1">
                  <span className="text-orange">{stat.value}</span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 mb-3">
                  {stat.label}
                </div>
                <div className={`stat-bar bg-${stat.barColor}`} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
