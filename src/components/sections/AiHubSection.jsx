import React, { useState } from 'react';
import { Target, Trophy, Recycle, Camera, Loader, AlertCircle, Sparkles, Coffee, BookOpen, Bike, Lightbulb } from 'lucide-react';
import { useGeminiAI } from '../../hooks/useGeminiAI';

export default function AiHubSection() {
  const [activeAiTab, setActiveAiTab] = useState('scanner');
  const {
    wasteInput, setWasteInput,
    base64Image,
    imageFileName,
    aiLoading,
    aiResult,
    aiError,
    challengeCategory, setChallengeCategory,
    challengeLoading,
    challengeResult,
    challengeError,
    handleImageUpload,
    callGeminiAPI,
    generateEcoChallenge
  } = useGeminiAI();

  return (
    <section className="relative z-10 w-full bg-slate-900 py-32 px-4 flex flex-col items-center border-t border-white/5">
      
      {/* ✨ Detalles de fondo flotantes sutiles ✨ */}
      <div className="absolute top-32 left-10 opacity-5 pointer-events-none animate-float-slow hidden md:block">
         <Target className="w-40 h-40 text-green-400" />
      </div>
      <div className="absolute bottom-32 right-10 opacity-5 pointer-events-none animate-float-slow hidden md:block" style={{ animationDelay: '3s' }}>
         <Trophy className="w-40 h-40 text-blue-400" />
      </div>

      <h2 className="scroll-reveal text-4xl md:text-5xl font-black font-heading mb-4 text-green-400">Think Before You Throw Hub</h2>
      <p className="scroll-reveal delay-100 text-lg text-slate-400 font-light mb-12 text-center max-w-2xl">
        Use the power of Gemini AI to classify your daily waste or generate unique challenges to do around the campus.
      </p>

      <div className="flex bg-slate-950/80 p-2 rounded-2xl border border-slate-800 mb-12 max-w-md w-full shadow-lg">
        <button 
          onClick={() => setActiveAiTab('scanner')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold font-heading transition-all duration-300 ${
            activeAiTab === 'scanner' ? 'bg-green-400 text-slate-950 shadow-md scale-[1.02]' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Recycle className="w-5 h-5" />
          <span>Waste Classifier</span>
        </button>
        <button 
          onClick={() => setActiveAiTab('challenge')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold font-heading transition-all duration-300 ${
            activeAiTab === 'challenge' ? 'bg-green-400 text-slate-950 shadow-md scale-[1.02]' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span>Eco-Challenge</span>
        </button>
      </div>

      {activeAiTab === 'scanner' && (
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl shadow-xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-white">Ask Gemini Assistant</h3>
              <p className="text-slate-300 font-light mb-6 text-sm leading-relaxed">
                Type the item (e.g., "half-eaten empanada", "dirty napkin", "clean yogurt bottle") or upload a clear photo of the waste.
              </p>
              
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-green-400 font-heading mb-2">Item Name</label>
                <input type="text" value={wasteInput} onChange={(e) => setWasteInput(e.target.value)} placeholder="Type your waste item here..." className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-green-400 transition-colors font-body" />
              </div>

              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-green-400 font-heading mb-2">Or Upload a Photo</label>
                <div className="relative flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-xl hover:border-green-400/50 transition-colors cursor-pointer bg-slate-950/40 overflow-hidden">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  {base64Image ? (
                    <div className="text-center p-4">
                      <Camera className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <span className="text-xs text-slate-300 font-medium block truncate max-w-xs">{imageFileName}</span>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <Camera className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                      <span className="text-xs text-slate-500 block">Click to upload or drag image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button onClick={callGeminiAPI} disabled={aiLoading} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-slate-950 bg-green-400 hover:bg-green-300 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100">
              {aiLoading ? ( <><Loader className="w-5 h-5 animate-spin" /><span>Analyzing Waste...</span></> ) : ( <span>Analyze Waste</span> )}
            </button>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl shadow-xl backdrop-blur-sm flex flex-col justify-center min-h-[350px]">
            {aiLoading && ( <div className="text-center py-12"><Loader className="w-12 h-12 text-green-400 animate-spin mx-auto mb-4" /><p className="text-slate-300 font-light">Gemini is thinking and classifying your item...</p></div> )}
            {aiError && ( <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center animate-fadeIn"><AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" /><p className="text-slate-200 font-medium">{aiError}</p></div> )}
            {!aiLoading && !aiError && !aiResult && ( <div className="text-center py-12 text-slate-500"><Recycle className="w-12 h-12 mx-auto mb-4 opacity-40" /><p className="font-light">Your classification results will appear here.</p></div> )}
            {aiResult && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-4 border-b border-slate-700/50 pb-4">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg shrink-0 ${aiResult.bin === 'White' ? 'bg-slate-800 border-slate-600' : aiResult.bin === 'Black' ? 'bg-slate-950 border-slate-800' : 'bg-green-900 border-green-700'}`}>
                    {aiResult.bin === 'White' && <div className="w-5 h-5 rounded-full bg-white border border-slate-300 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>}
                    {aiResult.bin === 'Black' && <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-600 shadow-[0_0_10px_rgba(0,0,0,0.8)]"></div>}
                    {aiResult.bin === 'Green' && <div className="w-5 h-5 rounded-full bg-green-500 border border-green-300 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>}
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-green-400 font-heading">Recommended Destination</span>
                    <h4 className="text-xl font-bold font-heading text-white">{aiResult.binName}</h4>
                  </div>
                </div>
                <div>
                  <h5 className="text-xs uppercase tracking-wider text-green-400 font-heading mb-2">Step-by-Step Action</h5>
                  <p className="text-slate-200 bg-slate-950/40 border border-slate-800 p-4 rounded-xl text-sm font-medium leading-relaxed font-body">{aiResult.actionRequired}</p>
                </div>
                <div>
                  <h5 className="text-xs uppercase tracking-wider text-green-400 font-heading mb-2">Why It Matters</h5>
                  <p className="text-slate-300 font-light text-sm leading-relaxed font-body">{aiResult.explanation}</p>
                </div>
                <div className="border-t border-slate-700/50 pt-4">
                  <span className="text-xs font-bold text-green-400 flex items-center gap-1.5 uppercase tracking-wider font-heading mb-1"><Sparkles className="w-3.5 h-3.5" /> Fun Eco-Fact</span>
                  <p className="text-xs text-slate-400 italic font-light font-body">{aiResult.funEcoFact}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeAiTab === 'challenge' && (
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl shadow-xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-white">Daily Campus Mission</h3>
              <p className="text-slate-300 font-light mb-6 text-sm leading-relaxed">
Choose a category of campus life. Gemini will generate a custom eco-challenge to complete today and help make the university a better place.                </p>
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-green-400 font-heading mb-2">Campus Zone</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Cafeteria', 'Classroom', 'Commute', 'Energy'].map((cat) => (
                    <button key={cat} onClick={() => setChallengeCategory(cat)} className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-300 ${challengeCategory === cat ? 'bg-green-400 border-green-400 text-slate-950 shadow-md scale-[1.02]' : 'bg-slate-950/40 border-slate-700 text-slate-300 hover:border-slate-500'}`}>
                      {cat === 'Cafeteria' && <Coffee className="w-4 h-4" />}
                      {cat === 'Classroom' && <BookOpen className="w-4 h-4" />}
                      {cat === 'Commute' && <Bike className="w-4 h-4" />}
                      {cat === 'Energy' && <Lightbulb className="w-4 h-4" />}
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={generateEcoChallenge} disabled={challengeLoading} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-slate-950 bg-green-400 hover:bg-green-300 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100">
              {challengeLoading ? ( <><Loader className="w-5 h-5 animate-spin" /><span>Generating Challenge...</span></> ) : ( <span>Get Eco-Challenge</span> )}
            </button>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl shadow-xl backdrop-blur-sm flex flex-col justify-center min-h-[350px]">
            {challengeLoading && ( <div className="text-center py-12"><Loader className="w-12 h-12 text-green-400 animate-spin mx-auto mb-4" /><p className="text-slate-300 font-light">Gemini is designing a fun eco-challenge for you...</p></div> )}
            {challengeError && ( <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center animate-fadeIn"><AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" /><p className="text-slate-200 font-medium">{challengeError}</p></div> )}
            {!challengeLoading && !challengeError && !challengeResult && ( <div className="text-center py-12 text-slate-500"><Target className="w-12 h-12 mx-auto mb-4 opacity-40" /><p className="font-light">Choose a category and click generate to receive your eco-challenge.</p></div> )}
            {challengeResult && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-4 border-b border-slate-700/50 pb-4">
                  <div className="w-14 h-14 rounded-2xl border border-green-400 bg-green-500/10 flex items-center justify-center shadow-lg shrink-0"><Trophy className="w-7 h-7 text-green-400" /></div>
                  <div><span className="text-xs uppercase tracking-widest text-green-400 font-heading">Your Active Challenge</span><h4 className="text-xl font-bold font-heading text-white">{challengeResult.challengeTitle}</h4></div>
                </div>
                <div><h5 className="text-xs uppercase tracking-wider text-green-400 font-heading mb-2">Today's Mission</h5><p className="text-slate-200 bg-slate-950/40 border border-slate-800 p-4 rounded-xl text-sm font-semibold leading-relaxed font-body">{challengeResult.mission}</p></div>
                <div><h5 className="text-xs uppercase tracking-wider text-green-400 font-heading mb-2">Campus Impact</h5><p className="text-slate-300 font-light text-sm leading-relaxed font-body">{challengeResult.impact}</p></div>
                <div className="border-t border-slate-700/50 pt-4"><span className="text-xs font-bold text-green-400 flex items-center gap-1.5 uppercase tracking-wider font-heading mb-1"><Sparkles className="w-3.5 h-3.5" /> Motivation Quote</span><p className="text-xs text-slate-400 italic font-light font-body">"{challengeResult.motivation}"</p></div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
