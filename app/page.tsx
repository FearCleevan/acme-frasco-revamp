import type { Metadata } from "next";
import HeroSection from "@/components/sections/home/HeroSection";
import ServicesGrid from "@/components/sections/home/ServicesGrid";
import StatCounters from "@/components/sections/home/StatCounters";
import ProcessSteps from "@/components/sections/home/ProcessSteps";
import IndustriesScroll from "@/components/sections/home/IndustriesScroll";
import CtaStack from "@/components/sections/home/CtaStack";

export const metadata: Metadata = {
  title: "FRASCO | Industrial Inspection Services — Dartmouth, NS",
  description:
    "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment certification. 24/7 availability across Nova Scotia and beyond.",
  keywords: [
    "NDE inspection Nova Scotia",
    "NDT services Halifax",
    "industrial inspection Dartmouth NS",
    "non-destructive testing Canada",
    "CGSB certified inspectors",
    "frasco.ca",
  ],
  alternates: { canonical: "https://frasco.ca" },
  openGraph: {
    title: "FRASCO | Industrial Inspection Services — Dartmouth, NS",
    description:
      "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment certification. 24/7 availability across Nova Scotia.",
    url: "https://frasco.ca",
  },
};

export default function HomePage() {
  return (
    <div className="pt-16">
      <HeroSection />
      <StatCounters />
      <ServicesGrid />
      <ProcessSteps />
      <IndustriesScroll />
      <CtaStack />
    </div>
  );
}
