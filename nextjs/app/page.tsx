// src/app/page.tsx

import FeatureOverview from '@/app/components/FeatureOverview.external';
import HeroSection from './components/HeroSection.external';
import MetricsSection from '@/app/components/MetricsSection.external';
import CallToAction from '@/app/components/CallToAction.section';

export default function HomePage() {
  return (
    <main className='flex flex-col'>
      <HeroSection />
      <FeatureOverview />
      <MetricsSection />
      <CallToAction />
    </main>
  );
}
