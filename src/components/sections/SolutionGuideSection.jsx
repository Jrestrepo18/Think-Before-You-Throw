import React, { useState } from 'react';
import { Recycle, Sparkles, ChevronDown, Check, X, AlertCircle, Droplets, ArrowRight, Trash2, Leaf } from 'lucide-react';

export default function SolutionGuideSection() {
  const [activeBinGuide, setActiveBinGuide] = useState(null);

  return (
    <section className="relative z-10 w-full min-h-screen bg-slate-950 text-slate-100 py-32 px-4 flex flex-col items-center border-t border-white/5 overflow-hidden">
      
      {/* ✨ Detalles de fondo flotantes sutiles ✨ */}
      <div className="absolute top-40 right-10 opacity-[0.03] pointer-events-none animate-spin-slow hidden md:block">
         <Recycle className="w-64 h-64 text-green-400" />
      </div>
      <div className="absolute bottom-40 left-10 opacity-[0.03] pointer-events-none animate-float-slow hidden md:block">
         <Recycle className="w-48 h-48 text-white" />
      </div>

      <div className="text-center mb-20 relative z-10 flex flex-col items-center">
        
        {/* ✨ TITULO RESALTADO PROFESIONAL ✨ */}
        <div className="scroll-reveal flex flex-col items-center justify-center mb-8 relative">
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black font-heading text-white tracking-tight leading-tight">
            Be Part of the <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500 drop-shadow-[0_0_30px_rgba(74,222,128,0.5)]">Solution.</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full mt-6 shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
        </div>

        <p className="scroll-reveal delay-100 text-lg md:text-xl text-slate-400 font-light max-w-3xl mx-auto">
          Recycling correctly is easy if you pay attention. Follow this step-by-step guide to separate your waste and create a better university.
        </p>
      </div>

      <div className="max-w-6xl w-full flex flex-col gap-24 relative z-10">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-900 via-green-400 to-transparent -translate-x-1/2 opacity-20"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-12 group relative">
          <div className="scroll-reveal reveal-left w-full md:w-1/2 overflow-hidden rounded-3xl shadow-2xl relative border-4 border-slate-800 group-hover:border-green-400/50 transition-all duration-500">
            <img loading="lazy" src="https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=1080&auto=format&fit=crop" alt="Recycling colors" className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="scroll-reveal reveal-right w-full md:w-1/2 bg-slate-800/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-xl group-hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-12 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full flex items-center justify-center font-black text-xl group-hover:bg-green-500 group-hover:text-slate-900 transition-colors duration-300 shadow-sm">1</span>
              <h3 className="text-3xl font-bold font-heading text-white group-hover:text-green-400 transition-colors duration-300">Master The Color Code</h3>
            </div>
            <p className="text-lg text-slate-300 font-light leading-relaxed mb-4">
              Our campus uses three specific colors for the bins. You must learn this code to separate your garbage and protect our environment.
            </p>
            
            <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 font-medium transition-all duration-300 hover:bg-green-500/20">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-green-400" />
              <span>Interactive Guide: Click on any bin below to explore what goes inside!</span>
            </div>

            <ul className="space-y-4">
              {/* White Bin */}
              <li 
                onClick={() => setActiveBinGuide(activeBinGuide === 'white' ? null : 'white')}
                className={`flex flex-col gap-4 p-5 bg-slate-900/40 rounded-2xl shadow-md border cursor-pointer select-none transition-all duration-300 hover:translate-x-1 ${
                  activeBinGuide === 'white' 
                    ? 'border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.08)] bg-slate-900/90' 
                    : 'border-slate-700/50 hover:border-slate-550 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-start gap-4 w-full">
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center shrink-0 shadow-inner transition-colors duration-305 ${
                    activeBinGuide === 'white' ? 'border-slate-200 bg-white' : 'border-slate-600 bg-slate-800'
                  }`}>
                    <Recycle className={`w-6 h-6 transition-colors duration-305 ${
                      activeBinGuide === 'white' ? 'text-slate-950' : 'text-white'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-lg">The White Bin (Recyclables)</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-400 transition-transform duration-305 ${
                          activeBinGuide === 'white' ? 'rotate-180 text-white' : ''
                        }`} 
                      />
                    </div>
                    <span className="text-slate-300 block mt-1 text-sm font-light leading-relaxed">
                      Clean and dry plastic, glass, metal, paper, and cardboard. These are recyclable!
                    </span>
                  </div>
                </div>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeBinGuide === 'white' ? 'max-h-[500px] opacity-100 mt-2 border-t border-slate-800 pt-4' : 'max-h-0 opacity-0 pointer-events-none'
                }`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5 mb-2 uppercase tracking-wide">
                        <Check className="w-3.5 h-3.5" /> What goes in:
                      </span>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside font-light">
                        <li>Plastic bottles & containers (rinsed)</li>
                        <li>Clean cardboard boxes (flattened)</li>
                        <li>Soda cans & clean tin packaging</li>
                        <li>Paper, brochures & clean notebooks</li>
                        <li>Glass bottles & food jars (rinsed)</li>
                      </ul>
                    </div>
                    <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3">
                      <span className="font-bold text-rose-400 flex items-center gap-1.5 mb-2 uppercase tracking-wide">
                        <X className="w-3.5 h-3.5" /> What to avoid:
                      </span>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside font-light">
                        <li>Greasy pizza boxes & wrappers</li>
                        <li>Used napkins, tissues & paper towels</li>
                        <li>Snack & chips metallic wrappers</li>
                        <li>Broken glassware & mirror shards</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 text-xs bg-slate-950/40 border border-slate-800/80 p-3 rounded-xl text-slate-400 flex gap-2 items-start font-light">
                    <AlertCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-300 font-medium">Volunteer Tip:</strong> Always make sure recyclables are clean and dry. A single cup with coffee residue can ruin multiple kilograms of dry paper in the recycling plant!
                    </span>
                  </div>
                </div>
              </li>

              {/* Black Bin */}
              <li 
                onClick={() => setActiveBinGuide(activeBinGuide === 'black' ? null : 'black')}
                className={`flex flex-col gap-4 p-5 bg-slate-900/40 rounded-2xl shadow-md border cursor-pointer select-none transition-all duration-300 hover:translate-x-1 ${
                  activeBinGuide === 'black' 
                    ? 'border-slate-500 shadow-[0_0_20px_rgba(148,163,184,0.08)] bg-slate-900/90' 
                    : 'border-slate-700/50 hover:border-slate-550 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-start gap-4 w-full">
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center shrink-0 shadow-inner transition-colors duration-305 ${
                    activeBinGuide === 'black' ? 'border-slate-500 bg-slate-950' : 'border-slate-600 bg-slate-800'
                  }`}>
                    <Trash2 className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-lg">The Black Bin (Trash / Non-recyclables)</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-400 transition-transform duration-305 ${
                          activeBinGuide === 'black' ? 'rotate-180 text-white' : ''
                        }`} 
                      />
                    </div>
                    <span className="text-slate-300 block mt-1 text-sm font-light leading-relaxed">
                      Trash you cannot recycle. Dirty napkins, food wrappers, and toilet paper.
                    </span>
                  </div>
                </div>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeBinGuide === 'black' ? 'max-h-[500px] opacity-100 mt-2 border-t border-slate-800 pt-4' : 'max-h-0 opacity-0 pointer-events-none'
                }`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5 mb-2 uppercase tracking-wide">
                        <Check className="w-3.5 h-3.5" /> What goes in:
                      </span>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside font-light">
                        <li>Metallic chips & snack bags</li>
                        <li>Used napkins, tissues & paper towels</li>
                        <li>Greasy, dirty, or wet cardboard</li>
                        <li>Single-use plastic bags & sweet wrappers</li>
                        <li>Surgical masks, gloves & band-aids</li>
                      </ul>
                    </div>
                    <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3">
                      <span className="font-bold text-rose-400 flex items-center gap-1.5 mb-2 uppercase tracking-wide">
                        <X className="w-3.5 h-3.5" /> What to avoid:
                      </span>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside font-light">
                        <li>Clean plastic, metal & glass (White Bin)</li>
                        <li>Clean, dry paper & cardboard (White Bin)</li>
                        <li>Organic waste & food scraps (Green Bin)</li>
                        <li>Batteries & electronic items (Special bins)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 text-xs bg-slate-950/40 border border-slate-800/80 p-3 rounded-xl text-slate-400 flex gap-2 items-start font-light">
                    <AlertCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-300 font-medium">Volunteer Tip:</strong> Always make sure to wrap broken ceramics or mirrors safely in paper before placing them here, so our campus maintenance crew is safe from injuries!
                    </span>
                  </div>
                </div>
              </li>

              {/* Green Bin */}
              <li 
                onClick={() => setActiveBinGuide(activeBinGuide === 'green' ? null : 'green')}
                className={`flex flex-col gap-4 p-5 bg-slate-900/40 rounded-2xl shadow-md border cursor-pointer select-none transition-all duration-300 hover:translate-x-1 ${
                  activeBinGuide === 'green' 
                    ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.08)] bg-slate-900/90' 
                    : 'border-slate-700/50 hover:border-slate-550 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-start gap-4 w-full">
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center shrink-0 shadow-inner transition-colors duration-305 ${
                    activeBinGuide === 'green' ? 'border-green-600 bg-green-950' : 'border-slate-600 bg-slate-800'
                  }`}>
                    <Leaf className={`w-6 h-6 transition-colors duration-305 ${
                      activeBinGuide === 'green' ? 'text-green-400' : 'text-white'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-lg">The Green Bin (Organic Waste)</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-400 transition-transform duration-305 ${
                          activeBinGuide === 'green' ? 'rotate-180 text-white' : ''
                        }`} 
                      />
                    </div>
                    <span className="text-slate-300 block mt-1 text-sm font-light leading-relaxed">
                      Organic waste. Food scraps, fruit, and vegetables. We use this for compost.
                    </span>
                  </div>
                </div>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeBinGuide === 'green' ? 'max-h-[500px] opacity-100 mt-2 border-t border-slate-800 pt-4' : 'max-h-0 opacity-0 pointer-events-none'
                }`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5 mb-2 uppercase tracking-wide">
                        <Check className="w-3.5 h-3.5" /> What goes in:
                      </span>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside font-light">
                        <li>Fruit leftovers, cores & peels</li>
                        <li>Vegetable scraps, stems & roots</li>
                        <li>Coffee grounds & filter paper</li>
                        <li>Tea bags (remove plastic strings)</li>
                        <li>Dry leaves, grass & small flowers</li>
                      </ul>
                    </div>
                    <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3">
                      <span className="font-bold text-rose-400 flex items-center gap-1.5 mb-2 uppercase tracking-wide">
                        <X className="w-3.5 h-3.5" /> What to avoid:
                      </span>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside font-light">
                        <li>Plastic wraps or bags</li>
                        <li>Fruit stickers (peel them off first!)</li>
                        <li>Meat bones & fatty food oils</li>
                        <li>Animal pet waste or litter</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 text-xs bg-slate-950/40 border border-slate-800/80 p-3 rounded-xl text-slate-400 flex gap-2 items-start font-light">
                    <AlertCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-300 font-medium">Volunteer Tip:</strong> Remove the tiny plastic stickers on fruits (like apples and bananas) before tossing them here. Those stickers don't compost and contaminate the fertilizer we create for our campus green zones!
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-12 group relative">
          <div className="scroll-reveal reveal-right w-full md:w-1/2 overflow-hidden rounded-3xl shadow-2xl border-4 border-slate-800 group-hover:border-blue-400/50 transition-all duration-500">
            <img loading="lazy" src="https://images.unsplash.com/photo-1528323273322-d81458248d40?q=80&w=1080&auto=format&fit=crop" alt="Clean plastic bottle" className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="scroll-reveal reveal-left w-full md:w-1/2 bg-slate-800/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-xl group-hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-12 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full flex items-center justify-center font-black text-xl group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 shadow-sm">2</span>
              <h3 className="text-3xl font-bold font-heading text-white group-hover:text-blue-400 transition-colors duration-300">Clean Before You Drop</h3>
            </div>
            <p className="text-lg text-slate-300 font-light leading-relaxed mb-6">
              Did you know? The White Bin is only for <strong className="text-white">CLEAN</strong> items. One dirty bottle with juice or coffee can ruin all the clean paper in the bin.
            </p>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 shadow-md relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-500/50">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-900/30 rounded-bl-full -mr-4 -mt-4 flex items-center justify-center">
                <Droplets className="text-blue-400 w-8 h-8 ml-4 mb-4 animate-subtle-float" />
              </div>
              <p className="text-slate-300 font-medium flex items-start gap-3 relative z-10">
                <ArrowRight className="text-blue-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                Action: Always empty your bottles and wash your plastic containers. Dry them before you put them in the White Bin!
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12 group relative">
          <div className="scroll-reveal reveal-left w-full md:w-1/2 overflow-hidden rounded-3xl shadow-2xl border-4 border-slate-800 group-hover:border-green-400/50 transition-all duration-500">
            <img loading="lazy" src="https://images.unsplash.com/photo-1604187351574-c75ca79f5807?q=80&w=1080&auto=format&fit=crop" alt="Student reading sign" className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="scroll-reveal reveal-right w-full md:w-1/2 bg-slate-800/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-xl group-hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-12 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full flex items-center justify-center font-black text-xl group-hover:bg-green-500 group-hover:text-slate-900 transition-colors duration-300 shadow-sm">3</span>
              <h3 className="text-3xl font-bold font-heading text-white group-hover:text-green-400 transition-colors duration-300">Stop and Read</h3>
            </div>
            <p className="text-lg text-slate-300 font-light leading-relaxed mb-6">
              Do not guess where your trash goes. Our campaign put new pictures and "Recycling Guides" on every bin in the university campus.
            </p>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 shadow-md transition-all duration-300 hover:shadow-lg hover:border-green-500/50">
              <p className="text-slate-300 font-medium flex items-start gap-3">
                <ArrowRight className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                Action: Take five seconds to look at the pictures. If you are confused, ask a student volunteer. We are here to help you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
