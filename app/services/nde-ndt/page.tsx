import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaSection from "@/components/ui/CtaSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MethodsGrid from "@/components/sections/services/MethodsGrid";
import ServiceProcessSteps from "@/components/sections/services/ServiceProcessSteps";
import { ndeMethods } from "@/lib/data/services";
import { certifications } from "@/lib/data/certifications";

export const metadata: Metadata = {
  title: "NDE/NDT Inspection Services — Nova Scotia",
  description:
    "Nine certified NDE/NDT inspection methods. No coating removal required. Same-day results. Available 24/7 across Nova Scotia and beyond.",
  keywords: [
    "non-destructive testing Nova Scotia",
    "NDE inspection Halifax",
    "NDT services Dartmouth",
    "eddy current testing Nova Scotia",
    "CGSB 48.9712 certified",
    "magnetic particle inspection NS",
    "ultrasonic testing Nova Scotia",
  ],
  alternates: { canonical: "https://frasco.ca/services/nde-ndt" },
  openGraph: {
    title: "NDE/NDT Inspection Services — Nova Scotia | FRASCO",
    description:
      "Nine certified NDE/NDT methods, same-day results, available 24/7. Serving Nova Scotia and Eastern Canada.",
    url: "https://frasco.ca/services/nde-ndt",
  },
};

const methods = [
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

const certList = [
  "CAN/CGSB-48.9712",
  "CWB CSA W178.2",
  "API 510, 570, 653",
];

export default function NdePage() {
  return (
    <div className="pt-16">
      <PageHero
        imageUrl="/Xray_vault-scaled.jpg"
        imageAlt="NDT inspection technician at industrial facility"
        tag="Non-Destructive Evaluation"
        titleLine1="NDE / NDT"
        titleLine2="Services"
        subtitle="Using the latest and most modern methods — certified technicians available 24/7 with same-day on-site results."
        badgeLine="CAN/CGSB-48.9712 Certified · Level II & III Technicians"
      />

      {/* ── Section 1: intro + methods list left, image right ── */}
      <section className="py-20 bg-white border-b border-ghost">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: copy + bullet list + ECT intro */}
          <ScrollReveal className="lg:w-1/2 space-y-6">
            <h2 className="font-label text-3xl md:text-4xl font-bold text-ink uppercase tracking-tight leading-tight">
              Non-Destructive Evaluation<br />&amp; Testing
            </h2>

            <p className="text-lead leading-relaxed font-body text-sm md:text-base">
              Frasco offers NDE (Non-destructive Evaluation) and NDT (Non-destructive Testing) using the latest and most modern methods. These methods include:
            </p>

            <ul className="space-y-2">
              {methods.map((method) => (
                <li key={method} className="flex items-center gap-3 font-body text-sm text-ink font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                  {method}
                </li>
              ))}
            </ul>

            <div className="space-y-4 pt-2">
              <p className="text-lead leading-relaxed font-body text-sm md:text-base">
                Eddy Current is one of the most popular and cost-effective means of evaluating equipment. Eddy Current is a method used to determine the amount of surface flaws or hairline fractures that exist in conductive materials. Some of the most common applications for Eddy Current Testing are the inspection of tubes such as chiller tubes, condenser tubes, evaporator tubes, cooler tubes, heat exchanger tubes and so on.
              </p>
              <p className="text-lead leading-relaxed font-body text-sm md:text-base">
                This method is cost-effective, non-destructive and commonly used in a variety of industries including automotive, aerospace, rail, manufacturing, marine and more.
              </p>
            </div>
          </ScrollReveal>

          {/* Right: image */}
          <ScrollReveal className="lg:w-1/2 w-full" delay={150}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Non-destructive-testing-and-evaluation-1.jpg"
              alt="Non-destructive testing and evaluation"
              className="w-full h-auto object-cover shadow-heavy"
            />
          </ScrollReveal>

        </div>
      </section>

      {/* ── Section 2: image left, ECT details + certifications right ── */}
      <section className="py-20 bg-soft border-b border-ghost">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row gap-16 items-start">

          {/* Left: image */}
          <ScrollReveal className="lg:w-1/2 w-full" delay={150}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Non-destructive-evaluation.jpg"
              alt="Non-destructive evaluation inspector"
              className="w-full h-auto object-cover shadow-heavy"
            />
          </ScrollReveal>

          {/* Right: ECT detail copy + certifications */}
          <ScrollReveal className="lg:w-1/2 space-y-5">
            <p className="text-lead leading-relaxed font-body text-sm md:text-base">
              Eddy Current Testing works with minimal preparation and doesn&apos;t require the removal of surface paint or surface coatings. This is a huge advantage in painted structures, components and parts.
            </p>
            <p className="text-lead leading-relaxed font-body text-sm md:text-base">
              Eddy Current Testing equipment is also extremely portable and reliable. This makes it an outstanding solution for on-site testing and plant inspections where instant evaluation results are needed. Test results are available the same day allowing quick response times to any issues that are uncovered.
            </p>
            <p className="text-lead leading-relaxed font-body text-sm md:text-base">
              While Eddy Current is most typically used to detect near surface or surface flaws, there are a variety of other types of inspections that are possible such as detecting metal grade or hardness. It&apos;s also capable of detecting flaws in ferrous and non-ferrous materials.
            </p>

            <div className="pt-2 space-y-3">
              <p className="text-lead leading-relaxed font-body text-sm md:text-base">
                Frasco&apos;s inspectors are extremely experienced at performing these various non-destructive tests and are certified to:
              </p>
              <ul className="space-y-2">
                {certList.map((cert) => (
                  <li key={cert} className="font-label font-bold text-ink text-base">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-lead leading-relaxed font-body text-sm md:text-base pt-2">
              Frasco is fully committed to providing you the highest level of quality reporting and helping you to ensure that your facilities are able to minimize downtime and maintenance expense.
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* ── Nine certified methods grid ── */}
      <MethodsGrid
        methods={ndeMethods}
        eyebrow="Inspection Methods"
        title="Nine Certified NDE / NDT Methods"
      />

      {/* ── Certifications & Standards ── */}
      <section className="py-20 bg-white border-t border-ghost">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-14">
            <h3 className="font-label text-3xl font-bold text-ink uppercase tracking-tight">
              Certifications &amp; Standards
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.id} delay={i * 150}>
                <div className="border border-ghost p-8 text-center hover:border-orange hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center gap-3">
                  <div className="font-label text-2xl font-bold text-ink">{cert.title}</div>
                  <div className="text-lead text-sm font-body leading-relaxed">{cert.description}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceProcessSteps />

      <CtaSection
        heading="Ready to Book an NDT Inspection?"
        body="Available 24/7 across Nova Scotia, New Brunswick, Newfoundland and beyond. Our certified team mobilizes fast — call us or submit a request online."
        primaryLabel="Request Inspection Online"
        primaryHref="/contact"
        secondaryLabel="Call 1-902-431-5483"
        secondaryHref="tel:19024315483"
      />
    </div>
  );
}
