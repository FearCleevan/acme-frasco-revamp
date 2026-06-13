import PageHero from "@/components/ui/PageHero";
import CtaSection from "@/components/ui/CtaSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MethodsGrid from "@/components/sections/services/MethodsGrid";
import ServiceProcessSteps from "@/components/sections/services/ServiceProcessSteps";
import { liftingTypes } from "@/lib/data/services";

export const metadata = {
  title: "Lifting Equipment Inspection | Frasco Industrial Inspections",
  description:
    "Certified lifting equipment inspection — cranes, wire rope, forklifts, gantry and work station cranes. CSA compliant. Available 24/7 across Eastern Canada.",
};

const serviceList = [
  "Certification",
  "Wire Rope",
  "Fork Lifts",
  "Gantry Cranes",
  "Cranes and Components",
  "Work Station Cranes",
];

export default function LiftingEquipmentPage() {
  return (
    <div className="pt-16">
      <PageHero
        imageUrl="/133252734_m-scaled.jpg"
        imageAlt="Lifting equipment — gantry crane"
        tag="Certification & Compliance"
        titleLine1="Lifting"
        titleLine2="Equipment"
        subtitle="A Wide Variety Of Solutions For Every Situation"
        badgeLine="Regulatory Compliant · Certified Inspectors · All Lifting Equipment"
        accentColor="amber"
      />

      {/* ── Two-column: text left, image right — matching original frasco.ca ── */}
      <section className="py-20 bg-white border-b border-ghost">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: copy + services bullet list */}
          <ScrollReveal className="lg:w-1/2 space-y-6">
            <h2 className="font-label text-3xl md:text-4xl font-bold text-ink uppercase tracking-tight leading-tight">
              A Wide Variety Of Solutions<br />For Every Situation
            </h2>

            <p className="text-lead leading-relaxed font-body text-sm md:text-base">
              Frasco offers a variety of services relating to lifting equipment including but not limited to:
            </p>

            <ul className="space-y-2">
              {serviceList.map((service) => (
                <li key={service} className="flex items-center gap-3 font-body text-sm text-ink font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                  {service}
                </li>
              ))}
            </ul>

            <p className="text-lead leading-relaxed font-body text-sm md:text-base">
              Frasco strives in all of its services and product offerings to provide only the highest level of quality and service. Our business revolves around long-term relationships which we understand are built upon integrity, quality, service and results.
            </p>
          </ScrollReveal>

          {/* Right: image */}
          <ScrollReveal className="lg:w-1/2 w-full" delay={150}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/industrial-lifting-equipment.jpg"
              alt="Industrial lifting equipment — cranes at refinery"
              className="w-full h-auto object-cover shadow-heavy"
            />
          </ScrollReveal>

        </div>
      </section>

      {/* ── Six lifting equipment categories ── */}
      <MethodsGrid
        methods={liftingTypes}
        eyebrow="Scope"
        title="Six Lifting Equipment Categories"
        accentColor="amber"
      />

      <ServiceProcessSteps />

      <CtaSection
        heading="Keep Your Lifts Certified & Safe"
        body="Frasco's lifting equipment inspection team is available across Eastern Canada. Stay ahead of your certification schedule — contact us to book an inspection or discuss your requirements."
        primaryLabel="Request Lifting Equipment Inspection"
        primaryHref="/contact"
        secondaryLabel="Call 1-902-431-5483"
        secondaryHref="tel:19024315483"
        accentColor="amber"
      />
    </div>
  );
}
