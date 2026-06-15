import type { Metadata } from "next";
import Link from "next/link";
import ContactInfoPanel from "@/components/sections/contact/ContactInfoPanel";
import ContactForm from "@/components/sections/contact/ContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact FRASCO — Request an Inspection",
  description:
    "Request an inspection or get in touch with Frasco Industrial Inspections. Available 24/7 across Eastern Canada for NDE, tube inspection, asset integrity, and lifting equipment.",
  keywords: [
    "industrial inspection quote Nova Scotia",
    "contact NDT inspector Halifax",
    "request NDE inspection",
    "inspection services Dartmouth NS",
    "FRASCO contact",
  ],
  alternates: { canonical: "https://frasco.ca/contact" },
  openGraph: {
    title: "Contact FRASCO — Request an Inspection",
    description:
      "Request an inspection 24/7 across Eastern Canada. NDE, tube inspection, asset integrity, and lifting equipment.",
    url: "https://frasco.ca/contact",
  },
};

const quickLinks = [
  {
    href: "/services/nde-ndt",
    eyebrow: "NDE / NDT",
    title: "Non-Destructive Examination",
    desc: "UT, MT, PT, VT, RT and more — full NDE scope for welds, structures, and components.",
    hoverBorder: "hover:border-orange",
  },
  {
    href: "/services/tube-inspection",
    eyebrow: "Tube Inspection",
    title: "Heat Exchanger & Chiller Tubes",
    desc: "ECT and NFT tube bundle inspection — same-day reporting, portable equipment.",
    hoverBorder: "hover:border-orange",
  },
  {
    href: "/services/asset-integrity",
    eyebrow: "Asset Integrity",
    title: "QA/QC & Pressure Equipment",
    desc: "API 510, 570, 653 — pressure vessels, piping, storage tanks, and turnarounds.",
    hoverBorder: "hover:border-orange",
  },
  {
    href: "/services/lifting-equipment",
    eyebrow: "Lifting Equipment",
    title: "Crane & Lifting Certification",
    desc: "CSA-compliant certification for cranes, wire rope, forklifts, and gantry cranes.",
    hoverBorder: "hover:border-amber",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-16">

      {/* Hero band */}
      <section className="bg-ink relative overflow-hidden py-20">
        <div className="blueprint opacity-30 absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-orange transition-colors mb-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>

          <p className="font-mono text-[10px] uppercase tracking-widest text-orange mb-4">
            Get in Touch
          </p>
          <h1 className="font-label text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-6 leading-tight anim-revL">
            Request an<br />
            <span className="text-orange">Inspection.</span>
          </h1>
          <p className="font-body text-base text-white/65 max-w-xl leading-relaxed">
            Available 24/7 for emergency and planned inspections across Eastern Canada and beyond. Fill out the form and our team will respond within one business day.
          </p>
        </div>
      </section>

      {/* Main content: info panel + form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Left: contact info (2/5) */}
            <div className="w-full lg:w-2/5">
              <ContactInfoPanel />
            </div>

            {/* Right: form (3/5) */}
            <div className="w-full lg:w-3/5">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Quick links grid */}
      <section className="py-20 bg-soft">
        <div className="max-w-7xl mx-auto px-6">

          <ScrollReveal className="mb-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-orange mb-3">
              Our Services
            </p>
            <h2 className="font-label text-3xl font-bold text-ink uppercase tracking-tight">
              Not Sure Which Service You Need?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickLinks.map((link, i) => (
              <ScrollReveal key={link.href} delay={i * 100}>
                <Link
                  href={link.href}
                  className={`block scan-card bg-white border border-ghost p-8 group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${link.hoverBorder} h-full`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-orange mb-3">
                    {link.eyebrow}
                  </p>
                  <h3 className="font-label text-base font-bold text-ink uppercase tracking-tight mb-3 leading-tight">
                    {link.title}
                  </h3>
                  <p className="font-body text-xs text-lead leading-relaxed">
                    {link.desc}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
