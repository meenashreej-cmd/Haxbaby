import React, { useState } from 'react';
import { storyScenes } from '../../data/characterSheet';
import { useAudio } from '../../hooks/useAudio';
import { Sparkles, ChevronLeft, ChevronRight, Moon, Heart } from 'lucide-react';

export const StoryJourney: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const { playSfx } = useAudio();

  const currentScene = storyScenes[currentIdx];

  const handleNext = () => {
    playSfx('chime');
    setCurrentIdx((prev) => (prev + 1) % storyScenes.length);
    setInteracted(false);
  };

  const handlePrev = () => {
    playSfx('pop');
    setCurrentIdx((prev) => (prev - 1 + storyScenes.length) % storyScenes.length);
    setInteracted(false);
  };

  const handleSceneClick = (idx: number) => {
    playSfx('chime');
    setCurrentIdx(idx);
    setInteracted(false);
  };

  const handleMicroInteract = () => {
    playSfx('giggle');
    setInteracted(true);
  };

  // Helper to calculate exact word count
  const getWordCount = (text: string) => text.trim().split(/\s+/).length;

  return (
    <section
      id="story-journey"
      className="relative w-full max-w-4xl mx-auto py-12 px-4 sm:px-6"
    >
      {/* Background Starlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-400/30 text-purple-200 text-xs font-mono uppercase tracking-widest mb-3 backdrop-blur-xs">
          <Moon className="w-3.5 h-3.5 text-purple-300" />
          Section 05 • The Dream-Weaver Chronicles
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-100 tracking-tight">
          Nebupip's Cosmic Genesis
        </h2>
        <p className="text-sm text-purple-200/70 max-w-md mx-auto mt-2">
          Three bedtime chapters of how an apprentice dream-weaver learned to catch starry worries and wrap them in peace.
        </p>

        {/* Step Progress Indicators */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {storyScenes.map((scene, idx) => {
            const isActive = idx === currentIdx;
            return (
              <button
                key={scene.id}
                onClick={() => handleSceneClick(idx)}
                className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border ${
                  isActive
                    ? 'bg-purple-600/60 border-purple-300 text-purple-100 shadow-lg shadow-purple-500/20 scale-105'
                    : 'bg-slate-900/40 border-purple-500/20 text-purple-300/60 hover:border-purple-400/40 hover:text-purple-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-300 animate-ping' : 'bg-purple-400/40'}`} />
                <span>Scene 0{scene.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Illustrated Story Card */}
      <div className="relative z-10 bg-gradient-to-b from-slate-900/80 via-purple-950/40 to-slate-900/90 border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-500">
        
        {/* Subtle Constellation Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Column: Interactive Story Illustration */}
          <div
            onClick={handleMicroInteract}
            className="cursor-pointer group relative w-full aspect-square max-w-[320px] mx-auto rounded-2xl bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-950 border border-purple-400/30 p-4 flex flex-col items-center justify-center shadow-inner overflow-hidden select-none"
            title="Click illustration to wake a tiny dream reaction!"
          >
            {/* Twinkling CSS Stars */}
            <div className="absolute top-4 left-6 text-yellow-200 text-xs animate-pulse">✦</div>
            <div className="absolute bottom-6 right-8 text-pink-300 text-xs animate-pulse delay-300">✦</div>
            <div className="absolute top-10 right-6 text-purple-300 text-sm animate-pulse delay-700">★</div>

            {/* Dynamic Scene Illustration */}
            {currentScene.id === 1 && (
              <div className="flex flex-col items-center text-center">
                <div className={`transition-transform duration-500 ${interacted ? 'scale-125 rotate-12' : 'group-hover:scale-110'}`}>
                  {/* Supernova Sneeze SVG */}
                  <svg viewBox="0 0 120 120" className="w-32 h-32">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f472b6" strokeWidth="2" strokeDasharray="4,4" className="animate-spin-slow" />
                    {/* Glowing Starburst */}
                    <path
                      d="M60 20 L66 48 L94 40 L74 60 L96 74 L68 76 L70 104 L54 80 L36 98 L44 70 L18 64 L42 50 L26 26 L52 40 Z"
                      fill="url(#sneezeGrad)"
                      opacity="0.85"
                    />
                    <defs>
                      <linearGradient id="sneezeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    {/* Sprout floating in sneeze */}
                    <circle cx="60" cy="60" r="14" fill="#d8b4fe" />
                    <circle cx="56" cy="58" r="2" fill="#1e1b4b" />
                    <circle cx="64" cy="58" r="2" fill="#1e1b4b" />
                    <path d="M 57 63 Q 60 66 63 63" stroke="#4c1d95" strokeWidth="1.5" fill="none" />
                    {/* Tiny sprout leaf */}
                    <path d="M 60 46 Q 66 38 70 42 Q 66 48 60 46" fill="#86efac" />
                  </svg>
                </div>
                <span className="text-[11px] font-mono text-purple-300/80 mt-2">
                  {interacted ? "✨ *Achoo!* Stardust exploded!" : "Click the supernova to sneeze! 🌟"}
                </span>
              </div>
            )}

            {currentScene.id === 2 && (
              <div className="flex flex-col items-center text-center">
                <div className={`transition-transform duration-500 ${interacted ? 'rotate-180 scale-110' : 'group-hover:scale-105'}`}>
                  {/* Spool of Dream Yarn SVG */}
                  <svg viewBox="0 0 120 120" className="w-32 h-32">
                    <circle cx="60" cy="60" r="38" fill="#581c87" opacity="0.4" />
                    {/* Yarn Spool */}
                    <rect x="45" y="30" width="30" height="60" rx="8" fill="#c084fc" />
                    {/* Spun thread curves */}
                    <path d="M45 42 Q60 48 75 42" stroke="#f472b6" strokeWidth="2.5" fill="none" />
                    <path d="M45 54 Q60 60 75 54" stroke="#fde047" strokeWidth="2.5" fill="none" />
                    <path d="M45 66 Q60 72 75 66" stroke="#67e8f9" strokeWidth="2.5" fill="none" />
                    <path d="M45 78 Q60 84 75 78" stroke="#a7f3d0" strokeWidth="2.5" fill="none" />
                    {/* Needle */}
                    <line x1="30" y1="90" x2="90" y2="30" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="32" cy="88" r="2" fill="#f8fafc" />
                  </svg>
                </div>
                <span className="text-[11px] font-mono text-purple-300/80 mt-2">
                  {interacted ? "🧶 Dream-yarn spun tight!" : "Click to spin starlight yarn! 🧵"}
                </span>
              </div>
            )}

            {currentScene.id === 3 && (
              <div className="flex flex-col items-center text-center">
                <div className={`transition-transform duration-500 ${interacted ? 'scale-125' : 'group-hover:scale-110'}`}>
                  {/* Moon & Cloud Pillow SVG */}
                  <svg viewBox="0 0 120 120" className="w-32 h-32">
                    {/* Crescent Moon */}
                    <path
                      d="M70 25 C45 25 35 45 35 70 C35 90 50 100 70 100 C58 92 52 78 55 60 C58 42 70 32 70 25 Z"
                      fill="#fef08a"
                    />
                    {/* Sleeping cloud blanket */}
                    <path
                      d="M30 75 C30 65 42 62 48 68 C54 60 68 60 74 68 C80 62 92 68 90 78 C92 88 80 92 70 90 C50 92 30 90 30 75 Z"
                      fill="#e0e7ff"
                      opacity="0.9"
                    />
                    <Heart className="w-5 h-5 text-rose-400 fill-rose-400 absolute top-10 right-10 animate-bounce" />
                  </svg>
                </div>
                <span className="text-[11px] font-mono text-purple-300/80 mt-2">
                  {interacted ? "💖 Sweet dreams tucked tight!" : "Click to send warm bedtime love! 🌙"}
                </span>
              </div>
            )}

          </div>

          {/* Right Column: Scene Narrative Block */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-purple-300/70 mb-1">
                <span>ACT 0{currentScene.id} OF 03</span>
                <span className="px-2 py-0.5 rounded bg-purple-900/50 border border-purple-400/20 text-purple-200">
                  {getWordCount(currentScene.text)} / 150 words
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-wide">
                {currentScene.title}
              </h3>
              <p className="text-sm font-serif italic text-purple-300 mb-4 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {currentScene.subtitle}
              </p>

              <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-500/20 shadow-inner">
                <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed font-sans font-light">
                  {currentScene.text}
                </p>
              </div>
            </div>

            {/* Scene Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrev}
                id="btn-story-prev"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-900/30 hover:bg-purple-800/40 border border-purple-400/30 text-purple-200 text-xs font-medium transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-mono text-purple-300/60">
                {currentIdx + 1} of {storyScenes.length}
              </span>

              <button
                onClick={handleNext}
                id="btn-story-next"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-medium shadow-md shadow-purple-600/30 transition-all active:scale-95"
              >
                <span>{currentIdx === storyScenes.length - 1 ? 'Replay' : 'Next Scene'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
