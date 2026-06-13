import ScrollReveal from "@/components/ui/ScrollReveal";

export default function MissionSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20 items-start">

        {/* Left: copy */}
        <ScrollReveal className="lg:w-3/5">
          <h2 className="text-[10px] font-mono uppercase tracking-widest text-white mb-5 bg-orange inline-block px-2 py-0.5">
            Our Mission
          </h2>
          <h3 className="font-label text-3xl md:text-4xl lg:text-5xl font-bold text-ink uppercase tracking-tight mb-8 leading-tight">
            Increasing Reliability,<br />Productivity &amp; Safety.
          </h3>
          <div className="space-y-6 text-lead leading-relaxed font-body text-sm md:text-base">
            <p>
              Frasco Industrial Inspections provides non-destructive evaluation
              and asset integrity testing — designed to limit your facility&apos;s
              downtime and unexpected machinery expense. We deliver high-level
              inspections to increase reliability, productivity and safety while
              ensuring asset integrity.
            </p>
            <p>
              Services are delivered on a local, domestic and international
              level — including Nova Scotia, New Brunswick, Newfoundland, across
              Canada, the United States, and internationally. Our team is built
              around highly skilled certified personnel available around the
              clock to safely execute any inspection project, no matter the
              scope or complexity.
            </p>
            <p>
              From single-method NDE to full-plant turnaround inspection
              support, Frasco brings the right expertise, the right equipment,
              and the right certifications to every engagement — with same-day
              reporting as standard.
            </p>
          </div>
        </ScrollReveal>

        {/* Right: info cards */}
        <ScrollReveal className="lg:w-2/5 space-y-5 pt-2 w-full">
          {/* HQ */}
          <div className="bg-ink text-white p-8 border-l-4 border-orange">
            <div className="font-mono text-[10px] uppercase tracking-widest text-orange mb-3">
              Headquarters
            </div>
            <div className="font-body text-white/80 text-sm leading-relaxed">
              25 Raddall Ave., Unit 4<br />
              Dartmouth, NS B3B 1L4<br />
              Canada
            </div>
          </div>

          {/* Contact */}
          <div className="bg-soft border border-ghost p-8">
            <div className="font-mono text-[10px] uppercase tracking-widest text-lead mb-3">
              Contact
            </div>
            <div className="space-y-2 text-sm font-body">
              <div>
                <a
                  href="tel:19024315483"
                  className="text-ink hover:text-orange transition-colors font-bold"
                >
                  1-902-431-5483
                </a>
              </div>
              <div className="text-lead">Fax: 1-902-481-1007</div>
              <div>
                <a
                  href="mailto:frascoinspect@gmail.com"
                  className="text-ink hover:text-orange transition-colors"
                >
                  frascoinspect@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* 24/7 */}
          <div className="bg-orange text-white p-8">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/70 mb-3">
              Available
            </div>
            <div className="font-label text-3xl font-bold">24 / 7</div>
            <div className="text-white/75 text-sm mt-2">
              Emergency response, any time — any location.
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
