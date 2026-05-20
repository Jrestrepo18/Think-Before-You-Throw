import React from 'react';
import { AlertTriangle, Recycle, Waves } from 'lucide-react';

const ProblemBlock = ({ children, delay = '', className = '', icon: Icon, iconColor = 'text-slate-400', isGroup = false }) => (
  <div className={`${isGroup ? 'group' : ''} relative w-full min-h-[100vh] flex flex-col items-center justify-center max-w-5xl mx-auto px-4 scroll-reveal ${delay}`}>
    {Icon && (
      <div className={`relative z-10 mb-12 p-5 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm transition-all duration-1000 opacity-0 scale-50 group-[.scroll-active]:opacity-100 group-[.scroll-active]:scale-100 ${iconColor}`}>
        <Icon className="w-14 h-14 group-[.scroll-active]:animate-pulse-glow" />
      </div>
    )}
    <div className={`relative z-10 inline-block text-center transition-all duration-1000 opacity-0 translate-y-10 group-[.scroll-active]:opacity-100 group-[.scroll-active]:translate-y-0 ${className}`}>
      {children}
    </div>
  </div>
);

export default function ProblemSection() {
  return (
    <div id="problem" className="relative z-10 w-full flex flex-col items-center justify-center text-center">
      
      {/* Background gradients for a clean atmosphere */}
      <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-slate-900 via-slate-900/50 to-transparent pointer-events-none z-0"></div>

      {/* Phrase 1 */}
      <ProblemBlock isGroup icon={AlertTriangle} iconColor="text-orange-500">
        {/* Fondo de luz naranja - Sin retraso para que aparezca exactamente con la frase */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-[600px] h-[150%] max-h-[600px] bg-orange-600/15 blur-[100px] rounded-full pointer-events-none z-0 opacity-0 transition-opacity duration-1000 group-[.scroll-active]:opacity-100"></div>

        <h3 className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight text-slate-200">
          We do not use the bins correctly.<br />
          <span className="text-red-500 font-black block mt-6 tracking-tight">The real problem</span>
          <span className="text-slate-300 font-light mt-2 block text-2xl md:text-4xl">is we do not understand the impact.</span>
        </h3>
      </ProblemBlock>

      {/* Phrase 2 - Middle Phrase with Light Effect */}
      <ProblemBlock isGroup delay="delay-100" icon={Recycle} iconColor="text-green-400">
        {/* Ambient Glow Verde - centrado exactamente detrás del texto */}
        <div className="absolute inset-0 m-auto w-[600px] h-[600px] bg-green-500/30 blur-[150px] rounded-full pointer-events-none z-0 opacity-0 transition-opacity duration-1000 group-[.scroll-active]:opacity-100"></div>
        
        <h3 className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight text-center">
          <span className="block text-slate-200">
            We mix plastic with food every day.<br />
            <span className="text-slate-400 font-light text-2xl md:text-4xl block mt-4">When we do this,</span>
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-300 to-green-500 bg-[length:200%_auto] animate-shine font-black block mt-4 opacity-80">
            we cannot recycle it.
          </span>
        </h3>
      </ProblemBlock>

      {/* Phrase 3 */}
      <ProblemBlock isGroup delay="delay-200" icon={Waves} iconColor="text-blue-400">
        {/* Fondo de luz azul/verde - Sin retraso */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-[600px] h-[150%] max-h-[600px] bg-emerald-600/15 blur-[100px] rounded-full pointer-events-none z-0 opacity-0 transition-opacity duration-1000 group-[.scroll-active]:opacity-100"></div>

        <h3 className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight text-slate-300 mb-12">
          In the future, all our garbage will go<br />
          <span className="text-blue-400 font-light italic text-2xl md:text-4xl block mt-4">to the ocean or landfills.</span>
        </h3>
        <p className="relative z-10 text-2xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 font-heading uppercase tracking-wider">
          We must wake up<br className="md:hidden" /> and save the planet.
        </p>
      </ProblemBlock>

    </div>
  );
}
