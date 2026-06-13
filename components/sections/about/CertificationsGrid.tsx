import ScrollReveal from "@/components/ui/ScrollReveal";
import BlueprintSection from "@/components/ui/BlueprintSection";
import { certifications } from "@/lib/data/certifications";

export default function CertificationsGrid() {
  return (
    <BlueprintSection className="py-24 bg-soft">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-[10px] font-mono uppercase tracking-widest text-white mb-4 bg-orange inline-block px-2 py-0.5">
            Standards
          </h2>
          <h3 className="font-label text-3xl md:text-4xl font-bold text-ink uppercase tracking-tight">
            Certifications &amp; Codes
          </h3>
          <p className="text-lead max-w-2xl mx-auto mt-4 font-body text-sm leading-relaxed">
            All Frasco inspections are performed by personnel certified to
            applicable national and international standards. Our certifications
            include:
          </p>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.id} delay={i * 150}>
              <div className="bg-white border border-ghost p-10 text-center hover:border-orange hover:shadow-2xl transition-all duration-500 group h-full flex flex-col items-center">
                <div className="w-16 h-16 bg-orange/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-orange/20 transition-colors">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e8600c"
                    strokeWidth="1.5"
                  >
                    <path d={cert.iconPath} />
                  </svg>
                </div>
                <div className="font-label text-2xl font-bold text-ink mb-3">
                  {cert.title}
                </div>
                <div className="text-lead text-sm font-body leading-relaxed">
                  {cert.description}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </BlueprintSection>
  );
}
