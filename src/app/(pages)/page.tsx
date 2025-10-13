import HeroSection from "@/components/sections/HeroSection";
import AdventagesSection from "@/components/sections/AdventagesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import CvUpgradeSection from "@/components/sections/CvUpgradeSection";
import ImproveLinkedinSection from "@/components/sections/ImproveLinkedinSection";
import CtaSection from "@/components/sections/CtaSection";
import JobMatchSection from "@/components/sections/JobMatchSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AdventagesSection />
      <HowItWorksSection />
      <CvUpgradeSection />
      <ImproveLinkedinSection />
      <CtaSection />
      {/* <JobMatchSection /> */}
    </main>
  );
}
