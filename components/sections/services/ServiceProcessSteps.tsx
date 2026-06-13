import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "1",
    title: "Scope & Access",
    body: "Confirm tube specifications, access requirements and inspection objectives with your facility team.",
    dark: false,
  },
  {
    number: "2",
    title: "Mobilise On-Site",
    body: "Portable ECT equipment arrives at your facility. Probes calibrated to tube size and material.",
    dark: false,
  },
  {
    number: "3",
    title: "Full Bundle Scan",
    body: "Every tube scanned and data captured. Entire heat exchanger bundle covered efficiently.",
    dark: false,
  },
  {
    number: "4",
    title: "Report On-Site",
    body: "Signed, comprehensive report delivered same day — colour-coded condition map included.",
    dark: true,
  },
];

export default function ServiceProcessSteps() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <h3 className="font-label text-3xl font-bold text-ink uppercase tracking-tight">
            How a Tube Inspection Works
          </h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div
                className={`border border-ghost p-8 text-center h-full ${
                  step.dark ? "bg-ink" : "bg-soft"
                }`}
              >
                <div className="w-12 h-12 bg-orange text-white font-label font-bold text-xl flex items-center justify-center mx-auto mb-6">
                  {step.number}
                </div>
                <h4
                  className={`font-label font-bold uppercase tracking-tight mb-3 ${
                    step.dark ? "text-orange" : "text-ink"
                  }`}
                >
                  {step.title}
                </h4>
                <p
                  className={`text-sm leading-relaxed font-body ${
                    step.dark ? "text-white/65" : "text-lead"
                  }`}
                >
                  {step.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
