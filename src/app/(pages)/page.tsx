import HeroSection from '@/components/ui/HeroSection';
import AdventagesSection from '@/components/ui/AdventagesSection';
import HowItWorksSection from '@/components/ui/HowItWorksSection';
import CvUpgradeSection from '@/components/ui/CvUpgradeSection';
import ImproveLinkedinSection from '@/components/ui/ImproveLinkedinSection';
import CtaSection from '@/components/ui/CtaSection';
import JobMatchSection from '@/components/ui/JobMatchSection';

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
