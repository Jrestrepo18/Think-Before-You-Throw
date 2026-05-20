import React from 'react';
import { Play, Instagram } from 'lucide-react';
import TikTokIcon from '../icons/TikTokIcon';

export default function FooterSection() {
  return (
    <footer className="relative z-10 w-full bg-slate-950 py-32 px-4 flex flex-col items-center text-center overflow-hidden">
      
      <h2 className="scroll-reveal relative z-10 text-4xl md:text-5xl font-black font-heading text-green-400 mb-4">Join the Movement.</h2>
      <p className="scroll-reveal relative z-10 delay-100 text-lg text-slate-400 font-light mb-16 max-w-2xl">
        Watch our short video to understand the reality of bad recycling. Make the university a better place today.
      </p>
      
      <div className="scroll-reveal delay-200 group relative z-10 w-full max-w-[320px] md:max-w-md aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer border border-slate-700/50 shadow-[0_30px_60px_rgba(0,0,0,0.8)] mb-24 transition-all duration-500 hover:shadow-[0_0_80px_rgba(74,222,128,0.4)] hover:-translate-y-2">
        <img loading="lazy" src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=1080&auto=format&fit=crop" alt="Ocean pollution" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/60 transition-colors duration-300 group-hover:bg-black/30" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-green-500 group-hover:border-green-400 group-hover:scale-125 group-hover:shadow-[0_0_40px_rgba(74,222,128,0.8)]">
            <Play className="w-8 h-8 text-white ml-2 transition-transform duration-300" fill="currentColor" />
          </div>
          <span className="mt-6 text-white font-heading tracking-widest uppercase text-sm font-bold opacity-80 group-hover:opacity-100 group-hover:text-green-400 transition-colors duration-300 drop-shadow-lg">Play Reel (60s)</span>
        </div>
      </div>



      <p className="scroll-reveal relative z-10 text-slate-600 text-sm font-light uppercase tracking-widest border-t border-white/10 pt-12 w-full max-w-4xl">
        Think Before You Throw Campaign © 2026 - Final Project
      </p>
    </footer>
  );
}
