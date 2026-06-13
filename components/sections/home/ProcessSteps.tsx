import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Scope",
    body: "Define inspection objectives, equipment type and access requirements. Documentation of standards required.",
    dark: false,
  },
  {
    number: "02",
    title: "Mobilise",
    body: "Certified technicians dispatched with portable, calibrated equipment. On-site coordination with your facility team.",
    dark: false,
  },
  {
    number: "03",
    title: "Inspect",
    body: "Comprehensive NDE/NDT evaluation using the method best suited to the application — minimal downtime to your operation.",
    dark: false,
  },
  {
    number: "04",
    title: "Report",
    body: "Highest-level quality reporting delivered same-day. Clear findings, recommendations and compliance documentation.",
    dark: true,
  },
];

export default function ProcessSteps() {
  return (
    <section
      id="process"
      className="py-24 px-6 bg-soft relative blueprint"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-[10px] font-mono uppercase tracking-widest text-white mb-4 bg-orange inline-block px-2 py-0.5">
              Inspection Workflow
            </h2>
            <h3 className="font-label text-3xl md:text-4xl font-bold text-ink uppercase tracking-tight">
              From Scope to Signed Report
            </h3>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 150} className="h-full">
              <div
                className={`relative group p-8 border border-ghost hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full ${
                  step.dark ? "bg-ink" : "bg-white"
                }`}
              >
                {/* Ghost number watermark */}
                <div
                  className={`text-[100px] font-label font-bold absolute -top-10 -left-4 leading-none transition-colors duration-700 ${
                    step.dark
                      ? "text-white/20 group-hover:text-orange/30"
                      : "text-ghost group-hover:text-orange/20"
                  }`}
                >
                  {step.number}
                </div>

                <div className="relative z-10 pt-8">
                  <h4
                    className={`font-label font-bold uppercase tracking-tight text-xl mb-4 ${
                      step.dark ? "text-orange" : "text-ink"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={`text-sm leading-relaxed ${
                      step.dark ? "text-white/70" : "text-lead"
                    }`}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
