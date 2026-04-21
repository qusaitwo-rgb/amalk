import React from 'react';
import LandingHero from './components/LandingHero';
import AIPulseWidget from './components/AIPulseWidget';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import SuccessStories from './components/SuccessStories';
import MissionSection from './components/MissionSection';
import LandingNav from './components/LandingNav';
import LandingFooter from './components/LandingFooter';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0D1547] overflow-x-hidden">
      <LandingNav />
      <LandingHero />
      <AIPulseWidget />
      <FeaturesSection />
      <HowItWorks />
      <SuccessStories />
      <MissionSection />
      <LandingFooter />
    </main>
  );
}