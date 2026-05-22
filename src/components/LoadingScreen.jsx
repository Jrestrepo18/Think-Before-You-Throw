import React, { useState, useEffect } from 'react';
import EcoLogo from './icons/EcoLogo';

export default function LoadingScreen({ isLoading }) {
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          // Smooth easing
          const increment = prev > 90 ? 0.2 : prev > 60 ? 0.6 : prev > 30 ? 1.2 : 2;
          const next = prev + increment;
          return next > 99.9 ? 99.9 : next;
        });
      }, 30);
    } else {
      setProgress(100);
      setTimeout(() => {
        setShouldRender(false);
      }, 1200); // 1.2s delay before fading out to give time for cinematic reveal
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 transition-all duration-[1.5s] ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isLoading ? 'opacity-100' : 'opacity-0 scale-105 pointer-events-none'
      }`}
    >
      {/* Subtle organic background glow & particles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-green-900/15 to-emerald-900/15 blur-[120px] rounded-full opacity-60 animate-pulse"></div>
        
        {/* Subtle floating particles (spores/fireflies) */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-green-400/30 rounded-full blur-[1px]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `pulse ${3 + Math.random() * 3}s infinite alternate, float ${5 + Math.random() * 5}s infinite ease-in-out`,
                transform: `translateY(${Math.random() * 20}px)`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl px-6">
        
        {/* Logo Filling Animation */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-12 flex items-center justify-center">
          
          {/* Subtle Outer Ring */}
          <div className="absolute inset-[-20%] border border-green-500/10 rounded-full animate-[spin_10s_linear_infinite] opacity-50"></div>
          <div className="absolute inset-[-10%] border border-emerald-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-50"></div>

          {/* Base Logo (Grayscale/Faded) */}
          <div className="absolute inset-0 grayscale opacity-20 transition-opacity duration-300">
            <EcoLogo />
          </div>
          
          {/* Top Logo (Colored, filling up) */}
          <div 
            className="absolute inset-0 transition-[clip-path] duration-75 ease-linear drop-shadow-[0_0_30px_rgba(74,222,128,0.5)]"
            style={{ 
              clipPath: `inset(${100 - progress}% 0 0 0)` 
            }}
          >
            <EcoLogo />
          </div>
        </div>

        {/* Campaign Typography */}
        <div className="text-center flex flex-col items-center gap-4 mb-6">
          <div className="overflow-hidden">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light font-heading text-slate-200 tracking-[0.2em] uppercase">
              Think Before
            </h1>
          </div>
          <div className="overflow-hidden flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 tracking-widest uppercase">
              You Throw.
            </h2>
          </div>
        </div>

        {/* Fading text detail */}
        <div className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-[0.3em] font-medium animate-pulse mt-4">
          Preparing Experience...
        </div>

      </div>

    </div>
  );
}
