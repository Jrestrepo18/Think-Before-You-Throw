import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative z-10 w-full h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="scroll-reveal delay-100 text-3xl md:text-5xl lg:text-[5rem] font-black uppercase tracking-tight drop-shadow-2xl leading-[1.1] mb-8">
        Think Before<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-emerald-500 drop-shadow-[0_0_20px_rgba(74,222,128,0.3)]">
          You Throw.
        </span>
      </h1>
      <h2 className="scroll-reveal delay-300 text-lg md:text-xl font-light text-green-300 uppercase tracking-[0.2em] mb-12 drop-shadow-lg opacity-90">
        Know Your Trash, Save The Earth.
      </h2>

      <div className="scroll-reveal delay-500 absolute bottom-10 flex flex-col items-center animate-bounce text-white/50">
        <span className="text-xs uppercase tracking-widest mb-2 font-heading">Scroll</span>
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}
