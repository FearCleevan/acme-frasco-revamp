import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaSection from "@/components/ui/CtaSection";
import MissionSection from "@/components/sections/about/MissionSection";
import CertificationsGrid from "@/components/sections/about/CertificationsGrid";
import IndustriesGrid from "@/components/sections/about/IndustriesGrid";
import ServiceAreaGrid from "@/components/sections/about/ServiceAreaGrid";

export const metadata: Metadata = {
  title: "About FRASCO — CGSB Certified Industrial Inspectors, Dartmouth NS",
  description:
    "Certified NDT personnel based in Dartmouth, NS. Available 24/7 across Nova Scotia, New Brunswick, Newfoundland, and beyond.",
  keywords: [
    "CGSB certified NDT inspectors",
    "industrial inspection company Nova Scotia",
    "NDE company Dartmouth",
    "certified NDT personnel",
    "about FRASCO inspections",
  ],
  alternates: { canonical: "https://frasco.ca/about" },
  openGraph: {
    title: "About FRASCO — CGSB Certified Industrial Inspectors",
    description:
      "Certified NDT personnel based in Dartmouth, NS. Available 24/7 across Nova Scotia, New Brunswick, Newfoundland, and beyond.",
    url: "https://frasco.ca/about",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <PageHero
        imageUrl="/3.webp"
        imageAlt="Frasco inspection team"
        tag="Dartmouth, Nova Scotia"
        titleLine1="About"
        titleLine2="Frasco"
        subtitle="FRASCO strives to be a leader in all aspects of industrial inspection — a team of skilled, certified personnel available 24/7 to safely execute any project."
      />
      <MissionSection />
      <CertificationsGrid />
      <IndustriesGrid />
      <ServiceAreaGrid />
      <CtaSection
        heading="Ready to Work with Frasco?"
        body="Contact our team today to discuss your inspection requirements. Available 24/7, across Nova Scotia and beyond."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="Call 1-902-431-5483"
        secondaryHref="tel:19024315483"
      />
    </div>
  );
}
