import React from 'react';
import { Leaf, Globe } from 'lucide-react';

const TypewriterText = ({ text, highlight = "", speed = 5, delay = 0 }) => {
  const [displayed, setDisplayed] = React.useState("");
  const [start, setStart] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) setStart(true); 
    }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  React.useEffect(() => {
    if (!start) return;
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [start, text, speed, delay]);

  const renderText = () => {
    if (!highlight) return displayed;
    const hIndex = text.indexOf(highlight);
    if (hIndex === -1) return displayed;
    
    const displayedLength = displayed.length;
    
    if (displayedLength <= hIndex) {
      return displayed;
    } else if (displayedLength > hIndex && displayedLength <= hIndex + highlight.length) {
      const before = displayed.slice(0, hIndex);
      const highlightedPart = displayed.slice(hIndex);
      return <>{before}<strong className="text-green-400 font-normal drop-shadow-md font-bold">{highlightedPart}</strong></>;
    } else {
      const before = displayed.slice(0, hIndex);
      const highlightedPart = highlight;
      const after = displayed.slice(hIndex + highlight.length);
      return <>{before}<strong className="text-green-400 font-normal drop-shadow-md font-bold">{highlightedPart}</strong>{after}</>;
    }
  };

  return <span ref={ref}>{renderText()}</span>;
};

export default function LetterSection() {
  return (
    <section className="relative z-10 w-full bg-slate-950 text-slate-100 py-32 px-4 flex flex-col items-center border-t border-white/5">
      
      {/* ✨ Detalles de fondo flotantes sutiles ✨ */}
      <div className="absolute top-20 left-10 opacity-5 pointer-events-none animate-float-slow hidden md:block">
         <Leaf className="w-32 h-32 text-green-400" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-5 pointer-events-none animate-float-slow hidden md:block" style={{ animationDelay: '2s' }}>
         <Globe className="w-48 h-48 text-blue-400 animate-spin-slow" />
      </div>

      <h2 className="scroll-reveal relative z-10 text-4xl md:text-5xl font-black font-heading mb-4 text-green-400">Open Letter</h2>
      <p className="scroll-reveal relative z-10 delay-100 text-lg text-slate-400 font-light mb-16 text-center max-w-2xl">
        An important message to our university community.
      </p>

      <div className="scroll-reveal reveal-flip relative z-10 delay-200 group max-w-4xl w-full bg-slate-800/60 border border-slate-600/50 p-8 md:p-16 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md text-left transition-all duration-500 hover:shadow-[0_0_60px_rgba(74,222,128,0.15)] hover:border-green-400/50 min-h-[800px]">
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-6 transition-colors duration-300 group-hover:text-white min-h-[28px]">
          <TypewriterText text="Dear Students and Teachers," speed={5} delay={300} />
        </p>
        <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-6 transition-colors duration-300 group-hover:text-white min-h-[84px]">
          <TypewriterText text="I am writing to talk about a very important environmental issue at our university. We do not use the recycling bins correctly, but the real problem is that we do not understand the importance of recycling. People do not know the terrible impact of mixing garbage." speed={5} delay={800} />
        </p>
        <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-6 transition-colors duration-300 group-hover:text-white min-h-[84px]">
          <TypewriterText text="If we do not resolve this issue, we will destroy our environment. When we mix plastic with food, we cannot recycle it. In the future, all our garbage will go to the ocean or landfills. We will have more pollution and climate change." speed={5} delay={2300} />
        </p>
        <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-6 transition-colors duration-300 group-hover:text-white min-h-[84px]">
          <TypewriterText text="My campaign is called &quot;Think Before You Throw&quot;. This campaign will create awareness about bad recycling. First, we will have weekly workshops to teach students why recycling is important. Second, we will put pictures on the bins to show the reality of pollution. Finally, we will have &quot;Recycling Guides&quot; at the cafeteria to help people." highlight="&quot;Think Before You Throw&quot;" speed={5} delay={3600} />
        </p>
        <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-12 transition-colors duration-300 group-hover:text-white min-h-[84px]">
          <TypewriterText text="This campaign will make the university a better place. Our campus will be clean, and students will become conscious and responsible citizens. Together, we can save the planet." speed={5} delay={5200} />
        </p>
        
        <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed transition-colors duration-300 group-hover:text-white min-h-[28px]">
          <TypewriterText text="Sincerely," speed={10} delay={6200} />
        </p>
        <p className="text-xl md:text-2xl text-green-400 font-heading font-bold mt-2 transform origin-left transition-transform duration-300 group-hover:scale-105 min-h-[32px]">
          <TypewriterText text="Think Before You Throw." speed={15} delay={6500} />
        </p>
      </div>
    </section>
  );
}
