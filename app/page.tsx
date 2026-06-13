import HeroSection from "@/components/sections/home/HeroSection";
import ServicesGrid from "@/components/sections/home/ServicesGrid";
import StatCounters from "@/components/sections/home/StatCounters";
import ProcessSteps from "@/components/sections/home/ProcessSteps";
import IndustriesScroll from "@/components/sections/home/IndustriesScroll";
import CtaStack from "@/components/sections/home/CtaStack";

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
