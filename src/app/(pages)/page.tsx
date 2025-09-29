import HeroSection from '@/components/HeroSection';
import AdventagesSection from '@/components/AdventagesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CvUpgradeSection from '@/components/CvUpgradeSection';
import ImproveLinkedinSection from '@/components/ImproveLinkedinSection';
import CtaSection from '@/components/CtaSection';
import JobMatchSection from '@/components/JobMatchSection';

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
