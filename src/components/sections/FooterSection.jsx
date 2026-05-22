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
      
      <div className="scroll-reveal delay-200 relative z-10 w-full max-w-[320px] md:max-w-md rounded-3xl overflow-hidden border border-slate-700/50 shadow-[0_30px_60px_rgba(0,0,0,0.8)] mb-24 transition-all duration-300 hover:shadow-[0_0_80px_rgba(74,222,128,0.4)] hover:-translate-y-2">
        <video 
          className="w-full h-full object-cover aspect-[9/16]" 
          controls 
          preload="metadata"
        >
          <source src="/video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>



      <p className="scroll-reveal relative z-10 text-slate-600 text-sm font-light uppercase tracking-widest border-t border-white/10 pt-12 w-full max-w-4xl">
        Think Before You Throw Campaign © 2026 - Final Project
      </p>
    </footer>
  );
}
