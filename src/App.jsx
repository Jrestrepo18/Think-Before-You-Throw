import React, { useRef } from 'react';
import ThreeBackground from './components/ThreeBackground';
import HeroSection from './components/sections/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import LetterSection from './components/sections/LetterSection';
import CampaignIdentitySection from './components/sections/CampaignIdentitySection';
import SolutionGuideSection from './components/sections/SolutionGuideSection';
import AiHubSection from './components/sections/AiHubSection';
import FooterSection from './components/sections/FooterSection';
import { useScrollReveal } from './hooks/useScrollReveal';
import './App.css';

function App() {
  const mountRef = useRef(null);
  const threeRefs = useRef({});

  // Initialize scroll reveal hook
  useScrollReveal();

  return (
    <div className="w-full min-h-screen bg-slate-950 font-body text-slate-200 overflow-x-hidden selection:bg-green-500/30 selection:text-green-200">
      <ThreeBackground mountRef={mountRef} threeRefs={threeRefs} />
      
      <main className="relative z-10 w-full overflow-hidden">
        <HeroSection />
        <ProblemSection />
        <LetterSection />
        <CampaignIdentitySection />
        <SolutionGuideSection />
        <AiHubSection />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;