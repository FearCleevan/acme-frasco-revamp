import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaSection from "@/components/ui/CtaSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MethodsGrid from "@/components/sections/services/MethodsGrid";
import ServiceProcessSteps from "@/components/sections/services/ServiceProcessSteps";
import { assetServices } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Asset Integrity Management — Industrial Nova Scotia",
  description:
    "API 510, 570, 653 certified asset integrity inspections. Pressure vessels, piping, storage tanks, and turnaround inspections across Nova Scotia.",
  keywords: [
    "asset integrity inspection Nova Scotia",
    "corrosion inspection NS",
    "API 510 inspection Halifax",
    "pressure vessel inspection Nova Scotia",
    "storage tank inspection Canada",
    "QA QC inspection Nova Scotia",
  ],
  alternates: { canonical: "https://frasco.ca/services/asset-integrity" },
  openGraph: {
    title: "Asset Integrity Management — Industrial Nova Scotia | FRASCO",
    description:
      "API 510/570/653 pressure vessel, piping, and storage tank inspections across Nova Scotia.",
    url: "https://frasco.ca/services/asset-integrity",
  },
};

const serviceList = [
  "Weld Testing and Inspection",
  "API Boiler and Pressure Vessel",
  "Storage Tanks",
  "Piping Systems",
  "Visual Inspection",
  "Third Party Verification",
  "Audit Services",
  "Dimensional",
  "Turnaround Services",
];

export default function AssetIntegrityPage() {
  return (
    <div className="pt-16">
      <PageHero
        imageUrl="/2.jpg"
        imageAlt="Asset integrity inspection"
        tag="QA · QC · Compliance"
        titleLine1="Asset"
        titleLine2="Integrity"
        subtitle="Keeping Your Production Online And Safe"
        badgeLine="API 510 · 570 · 653 · CWB CSA W178.2 Certified"
      />

      {/* ── Two-column: image left, text right — matching original frasco.ca ── */}
      <section className="py-20 bg-white border-b border-ghost">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: image */}
          <ScrollReveal className="lg:w-1/2 w-full" delay={150}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/industrial-lifting-equipment.jpg"
              alt="Asset integrity — industrial inspection site"
              className="w-full h-auto object-cover shadow-heavy"
            />
          </ScrollReveal>

          {/* Right: copy + services bullet list */}
          <ScrollReveal className="lg:w-1/2 space-y-6">
            <h2 className="font-label text-3xl md:text-4xl font-bold text-ink uppercase tracking-tight leading-tight">
              Keeping Your Production<br />Online And Safe
            </h2>

            <p className="text-lead leading-relaxed font-body text-sm md:text-base">
              Frasco offers a variety of Asset Integrity, Quality Assurance (QA) and Quality Control (QC) services. These include but are not limited to:
            </p>

            <ul className="space-y-2">
              {serviceList.map((service) => (
                <li key={service} className="flex items-center gap-3 font-body text-sm text-ink font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                  {service}
                </li>
              ))}
            </ul>

            <p className="text-lead leading-relaxed font-body text-sm md:text-base">
              Our top priority is to work with your operation to minimize the amount of equipment breakdown, operational downtime and unexpected maintenance expense for your business.
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* ── Nine asset integrity service cards ── */}
      <MethodsGrid
        methods={assetServices}
        eyebrow="Service Areas"
        title="Nine Asset Integrity Specialisations"
      />

      <ServiceProcessSteps />

      <CtaSection
        heading="Protect Your Assets. Stay Compliant."
        body="From single weld verification to full plant turnarounds — Frasco's certified inspectors are ready to mobilize. Available 24/7 across Eastern Canada and beyond."
        primaryLabel="Request Asset Integrity Inspection"
        primaryHref="/contact"
        secondaryLabel="Call 1-902-431-5483"
        secondaryHref="tel:19024315483"
      />
    </div>
  );
}
