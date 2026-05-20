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
          // Easing the progress so it slows down near the end
          const increment = prev > 85 ? 0.3 : prev > 60 ? 0.8 : prev > 30 ? 1.5 : 2;
          const next = prev + increment;
          return next > 99 ? 99 : next;
        });
      }, 50);
    } else {
      setProgress(100);
      setTimeout(() => {
        setShouldRender(false);
      }, 1500); // Wait 1.5s to let the 100% register before fading out
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!shouldRender) return null;

  // Calculate the stroke dash offset for the circular loader
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03050a] transition-all duration-[1.5s] ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 scale-105 pointer-events-none blur-md'
      }`}
    >
      {/* Subtle ambient light in the background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-green-900/20 to-blue-900/20 blur-[100px] rounded-full opacity-50 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-6">
        
        {/* Top Minimal Text */}
        <div className="absolute top-12 w-full flex justify-between px-8 text-slate-500 text-[10px] uppercase tracking-[0.4em] font-medium">
          <span>Environment</span>
          <span>Initiative</span>
        </div>

        {/* Circular Progress & Logo */}
        <div className="relative flex items-center justify-center mb-16">
          {/* Logo */}
          <div className="w-24 h-24 md:w-28 md:h-28 absolute z-10 drop-shadow-[0_0_30px_rgba(74,222,128,0.2)] animate-[pulse_4s_ease-in-out_infinite]">
            <EcoLogo />
          </div>

          {/* SVG Circular Loader */}
          <svg className="w-40 h-40 md:w-48 md:h-48 transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-slate-800/50"
              strokeWidth="2"
              fill="transparent"
            />
            {/* Progress Bar */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-green-400 transition-all duration-300 ease-out drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Premium Typography */}
        <div className="text-center flex flex-col items-center gap-4">
          <div className="overflow-hidden">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-heading text-white tracking-[0.2em] uppercase transform transition-transform duration-1000">
              Think Before
            </h1>
          </div>
          <div className="overflow-hidden flex items-center gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 tracking-widest uppercase">
              You Throw.
            </h2>
          </div>
        </div>

        {/* Floating Percentage Indicator */}
        <div className="mt-12 flex flex-col items-center">
          <span className="text-3xl font-light font-heading text-slate-300 tabular-nums tracking-widest">
            {Math.round(progress)}<span className="text-sm text-green-400 ml-1">%</span>
          </span>
          <span className="text-[9px] text-slate-500 uppercase tracking-[0.5em] mt-2">
            Loading System
          </span>
        </div>

      </div>
    </div>
  );
}
