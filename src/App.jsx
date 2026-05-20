import React, { useRef, useState, useEffect } from 'react';
import ThreeBackground from './components/ThreeBackground';
import LoadingScreen from './components/LoadingScreen';
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
  const [isLoading, setIsLoading] = useState(true);

  // Initialize scroll reveal hook
  useScrollReveal();

  // Failsafe: if Three.js takes more than 5 seconds, remove loading screen anyway
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Force a minimum loading time (e.g. 3.5 seconds) to show off the premium intro
  const minLoadTime = 3500;
  const mountTime = useRef(Date.now());

  const handleThreeLoaded = () => {
    const timeElapsed = Date.now() - mountTime.current;
    const timeRemaining = Math.max(0, minLoadTime - timeElapsed);

    setTimeout(() => {
      setIsLoading(false);
    }, timeRemaining);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 font-body text-slate-200 overflow-x-hidden selection:bg-green-500/30 selection:text-green-200">
      <LoadingScreen isLoading={isLoading} />
      
      <ThreeBackground mountRef={mountRef} threeRefs={threeRefs} onLoaded={handleThreeLoaded} />
      
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