import PageHero from "@/components/ui/PageHero";
import CtaSection from "@/components/ui/CtaSection";
import MethodsGrid from "@/components/sections/services/MethodsGrid";
import ServiceProcessSteps from "@/components/sections/services/ServiceProcessSteps";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { tubeMethods } from "@/lib/data/services";

export const metadata = {
  title: "Tube Inspection Services | Frasco Industrial Inspections",
  description:
    "Comprehensive ECT tube inspection for chillers, condensers, heat exchangers, boilers and more. Same-day reporting. Available 24/7.",
};

const evaluationMethods = [
  "Eddy Current",
  "Near Field",
  "Magnetic Particle",
  "Liquid Penetrant",
  "Ultra Sonic",
  "Thermography",
  "Borescope and Visual",
  "Positive Material Identification",
  "Remote Visual",
];

export default function TubeInspectionPage() {
  return (
    <div className="pt-16">
      <PageHero
        imageUrl="/tube.jpg"
        imageAlt="Tube inspection equipment"
        tag="Preventative Inspection"
        titleLine1="Tube"
        titleLine2="Inspection"
        subtitle="A wide variety of options for every situation — Frasco delivers comprehensive tube inspection services with same-day on-site reporting."
        badgeLine="Eddy Current · Near Field · Ultrasonic · All Tube Materials"
      />

      {/* ── Intro: two-column matching original frasco.ca ── */}
      <section className="py-20 bg-white border-b border-ghost">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: copy + methods list */}
          <ScrollReveal className="lg:w-1/2 space-y-6">
            <h2 className="font-label text-3xl md:text-4xl font-bold text-ink uppercase tracking-tight leading-tight">
              A Wide Variety Of Options<br />For Every Situation
            </h2>

            <p className="text-lead leading-relaxed font-body text-sm md:text-base">
              Frasco recognizes that equipment malfunction or breakdown comes with an extremely high cost to your business. For this reason, we offer a wide variety of preventative tube inspection services. The method and approach that is appropriate for your business will depend on a variety of factors. Frasco offers a variety of different evaluation methods including:
            </p>

            <ul className="space-y-2">
              {evaluationMethods.map((method) => (
                <li key={method} className="flex items-center gap-3 font-body text-sm text-ink font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                  {method}
                </li>
              ))}
            </ul>

            <div className="space-y-4 pt-2">
              <p className="text-lead leading-relaxed font-body text-sm md:text-base font-semibold text-ink">
                Eddy Current Testing (ECT) is often the most cost-effective and elegant solution.
              </p>
              <p className="text-lead leading-relaxed font-body text-sm md:text-base">
                Eddy Current Testing is a non-destructive, cost-effective means of detecting surface flaws or hairline fractures that exist in conductive materials such as metal. Eddy Current Testing works with a bare minimum of preparation and doesn&apos;t require the need to remove paint or other surface coatings. This makes it the perfect solution for many industries.
              </p>
              <p className="text-lead leading-relaxed font-body text-sm md:text-base">
                Because Eddy Current Testing is so portable and instantaneous, it is perfect for on-site testing situations where results and feedback are required on a same-day basis.
              </p>
              <p className="text-lead leading-relaxed font-body text-sm md:text-base">
                Frasco partners with your business to ensure minimal downtime and the ongoing safe operation of your equipment. The end result is reduced downtime, maintenance expense and overall increased profitability of your operation.
              </p>
            </div>
          </ScrollReveal>

          {/* Right: image */}
          <ScrollReveal className="lg:w-1/2 w-full" delay={150}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Industrial-tube-inspection-Eddy-current-tube-inspection.jpg"
              alt="Industrial tube inspection — eddy current tube system"
              className="w-full h-auto object-cover shadow-heavy"
            />
          </ScrollReveal>

        </div>
      </section>

      {/* ── Equipment types covered ── */}
      <MethodsGrid
        methods={tubeMethods}
        eyebrow="Scope of Inspection"
        title="Seven Equipment Types Covered"
        showNumbers
        colsClass="lg:grid-cols-3 xl:grid-cols-4"
      />

      <ServiceProcessSteps />

      <CtaSection
        heading="Don't Wait for a Leak to Find Out"
        body="Proactive tube inspection pays for itself many times over compared to emergency shutdown costs. Contact Frasco today to schedule your inspection."
        primaryLabel="Request Tube Inspection"
        primaryHref="/contact"
        secondaryLabel="Call 1-902-431-5483"
        secondaryHref="tel:19024315483"
      />
    </div>
  );
}
