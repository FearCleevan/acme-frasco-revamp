import ScrollReveal from "@/components/ui/ScrollReveal";

const locations = [
  { label: "Nova Scotia",   dot: "orange" },
  { label: "New Brunswick", dot: "orange" },
  { label: "Newfoundland",  dot: "orange" },
  { label: "All of Canada", dot: "orange" },
  { label: "United States", dot: "amber"  },
  { label: "International", dot: "amber"  },
];

const stats = [
  { value: "4+",   label: "Service Disciplines",  bg: "bg-soft border border-ghost", valColor: "text-ink",     labelColor: "text-lead"     },
  { value: "24/7", label: "Emergency Response",    bg: "bg-orange",                  valColor: "text-white",   labelColor: "text-white/75" },
  { value: "3",    label: "Certifications",        bg: "bg-ink",                     valColor: "text-white",   labelColor: "text-white/75" },
  { value: "13+",  label: "Industries Served",     bg: "bg-soft border border-ghost", valColor: "text-ink",   labelColor: "text-lead"     },
];

export default function ServiceAreaGrid() {
  return (
    <section className="py-20 bg-white border-t border-ghost">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Left: locations */}
          <ScrollReveal className="lg:w-1/2">
            <h2 className="text-[10px] font-mono uppercase tracking-widest text-white mb-4 bg-orange inline-block px-2 py-0.5">
              Service Area
            </h2>
            <h3 className="font-label text-3xl md:text-4xl font-bold text-ink uppercase tracking-tight mb-6">
              Local Reach.<br />International Capability.
            </h3>
            <p className="text-lead leading-relaxed mb-6 font-body text-sm">
              Based in Dartmouth, Nova Scotia, Frasco regularly deploys
              inspection teams across Atlantic Canada and beyond — wherever the
              work is, we mobilize.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {locations.map(({ label, dot }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-lead">
                  <div
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      dot === "amber" ? "bg-amber" : "bg-orange"
                    }`}
                  />
                  {label}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right: stat grid */}
          <ScrollReveal className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-5">
              {stats.map(({ value, label, bg, valColor, labelColor }) => (
                <div key={label} className={`${bg} p-8 text-center`}>
                  <div className={`text-4xl font-display font-bold mb-2 ${valColor}`}>
                    {value}
                  </div>
                  <div className={`text-[10px] font-mono uppercase tracking-widest ${labelColor}`}>
                    {label}
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
