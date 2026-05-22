import React from 'react';
import { ChevronDown } from 'lucide-react';
import EcoLogo from '../icons/EcoLogo';

export default function CampaignIdentitySection() {
  return (
    <section className="relative z-10 w-full bg-slate-950 py-32 px-4 flex flex-col items-center border-t border-white/5 overflow-hidden">
      
      <h2 className="scroll-reveal relative z-10 text-4xl md:text-5xl font-black font-heading mb-4 text-white">Campaign Identity</h2>
      <p className="scroll-reveal relative z-10 delay-100 text-lg text-slate-400 font-light mb-16 text-center max-w-2xl">
        The meaning behind our logo and slogan.
      </p>

      <div className="flex flex-col md:flex-row gap-12 max-w-5xl w-full items-center relative z-10">
        
        {/* ✨ NUEVO LOGO CUSTOM SVG ✨ */}
        <div className="scroll-reveal reveal-zoom delay-100 w-full md:w-1/3 flex justify-center relative">
          <div className="relative w-64 h-64 flex items-center justify-center group overflow-visible">
            <div className="w-56 h-56 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 drop-shadow-[0_0_40px_rgba(74,222,128,0.4)]">
              <EcoLogo />
            </div>
          </div>
        </div>

        <div className="scroll-reveal reveal-right delay-300 w-full md:w-2/3 bg-slate-800/40 p-8 rounded-3xl border border-slate-600/50 hover:bg-slate-800/60 transition-colors duration-300 backdrop-blur-sm">
          <h3 className="text-2xl font-bold font-heading mb-4 text-green-400 flex items-center gap-2">
            <span className="w-2 h-6 bg-green-400 rounded-full inline-block"></span> Our Logo
          </h3>
          <p className="text-slate-300 font-light leading-relaxed mb-6 text-lg hover:text-slate-200 transition-colors">
            Our logo shows a blue globe and a bright green leaf. The globe represents our planet Earth, and the leaf represents nature, life, and the environment. This design is modern and professional, so it catches the attention of university students.
          </p>
          <h3 className="text-2xl font-bold font-heading mb-4 text-green-400 flex items-center gap-2">
            <span className="w-2 h-6 bg-green-400 rounded-full inline-block"></span> Our Slogan
          </h3>
          <p className="text-slate-300 font-light leading-relaxed mb-6 text-lg hover:text-slate-200 transition-colors">
            Our slogan is <strong className="text-white border-b-2 border-green-400 pb-1">"Know Your Trash, Save The Earth"</strong>. It is a very direct and powerful message.
          </p>
          <p className="text-slate-300 font-light leading-relaxed text-lg hover:text-slate-200 transition-colors">
            Together, the logo and the slogan make the campaign attractive because they are easy to remember. They invite the community to reflect on their bad habits, learn to separate garbage correctly, and understand the true importance of recycling.
          </p>
        </div>
      </div>

      <div className="scroll-reveal delay-500 mt-20 flex flex-col items-center animate-bounce text-white/30">
        <span className="text-[10px] uppercase tracking-[0.3em] mb-2 font-heading">Continue</span>
        <ChevronDown className="w-5 h-5" />
      </div>

    </section>
  );
}
