import React, { useEffect, useState } from 'react';
import { characterSheet } from '../../data/characterSheet';
import { useAudio } from '../../hooks/useAudio';
import { X, Sparkles, Award, Star, Compass, Feather } from 'lucide-react';

interface CharacterSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterSheetModal: React.FC<CharacterSheetModalProps> = ({ isOpen, onClose }) => {
  const { playSfx } = useAudio();
  const [stampActive, setStampActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      playSfx('chime');
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          playSfx('pop');
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose, playSfx]);

  if (!isOpen) return null;

  const handleSealClick = () => {
    playSfx('chime');
    setStampActive(true);
    setTimeout(() => setStampActive(false), 800);
  };

  const handleClose = () => {
    playSfx('pop');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="passport-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Outer Passport / Certificate Container */}
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-amber-50 via-[#fcf8f0] to-[#f4ebe1] text-amber-950 rounded-2xl shadow-2xl border-4 border-amber-600/40 p-5 sm:p-8 max-h-[90vh] overflow-y-auto selection:bg-amber-200">
        
        {/* Decorative Golden Outer Frame */}
        <div className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-amber-700/30" />
        
        {/* Vintage Top Corner Ornaments */}
        <div className="absolute top-3 left-3 text-amber-600/40 select-none">✦</div>
        <div className="absolute top-3 right-3 text-amber-600/40 select-none">✦</div>
        <div className="absolute bottom-3 left-3 text-amber-600/40 select-none">✦</div>
        <div className="absolute bottom-3 right-3 text-amber-600/40 select-none">✦</div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          id="btn-close-passport"
          aria-label="Close Character Passport"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-400 text-amber-900 transition-transform active:scale-95 shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="text-center pb-4 mb-4 border-b-2 border-amber-800/20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-xs font-serif tracking-widest text-amber-800 uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Celestial Registry Of Entities • Doc #777-SPROUT
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <h2
            id="passport-title"
            className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-amber-950 uppercase"
          >
            Cosmic Certificate of Emergence
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-amber-800/80 mt-1">
            Official 5-Point Character Sheet & Dream-Weaver Passport
          </p>
        </div>

        {/* Certificate Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* Left Column: Official Portrait & Wax Seal */}
          <div className="flex flex-col items-center text-center space-y-4">
            
            {/* Passport Photo Frame */}
            <div className="relative group w-36 h-44 sm:w-40 sm:h-48 rounded-lg bg-gradient-to-b from-indigo-900 to-purple-950 border-4 border-amber-300 shadow-md p-2 flex flex-col items-center justify-center overflow-hidden">
              {/* Twinkling star background inside photo */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.15),transparent_70%)]" />
              
              {/* Illustrated Nebupip Sprout SVG Portrait */}
              <svg viewBox="0 0 100 120" className="w-28 h-32 relative z-10 transition-transform group-hover:scale-105">
                <defs>
                  <radialGradient id="passportHeadGrad" cx="50%" cy="45%" r="50%">
                    <stop offset="0%" stopColor="#f3e8ff" />
                    <stop offset="70%" stopColor="#d8b4fe" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </radialGradient>
                  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Golden Halo / Dream Aura */}
                <circle cx="50" cy="55" r="38" fill="none" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
                
                {/* Sprout Antennae with tiny golden stars */}
                <path d="M 50 32 Q 42 16 35 18" stroke="#86efac" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="35" cy="18" r="4" fill="#4ade80" />
                <path d="M 50 32 Q 58 14 65 17" stroke="#86efac" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="65" cy="17" r="4" fill="#fde047" />

                {/* Head Body */}
                <ellipse cx="50" cy="58" rx="30" ry="26" fill="url(#passportHeadGrad)" filter="url(#softGlow)" />
                
                {/* Big Dreamy Eyes */}
                <ellipse cx="40" cy="54" rx="4.5" ry="6.5" fill="#1e1b4b" />
                <circle cx="38.5" cy="52" r="2" fill="#ffffff" />
                <circle cx="41.5" cy="57" r="1" fill="#ffffff" />

                <ellipse cx="60" cy="54" rx="4.5" ry="6.5" fill="#1e1b4b" />
                <circle cx="58.5" cy="52" r="2" fill="#ffffff" />
                <circle cx="61.5" cy="57" r="1" fill="#ffffff" />

                {/* Rosy Cheeks */}
                <ellipse cx="33" cy="62" rx="4" ry="2.5" fill="#f472b6" opacity="0.8" />
                <ellipse cx="67" cy="62" rx="4" ry="2.5" fill="#f472b6" opacity="0.8" />

                {/* Happy Baby Smile */}
                <path d="M 46 64 Q 50 68 54 64" stroke="#4c1d95" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Tiny Swaddle / Leaf Cape */}
                <path d="M 32 78 C 36 96 64 96 68 78 Z" fill="#6ee7b7" />
              </svg>

              <div className="absolute bottom-1 text-[10px] text-amber-200/90 font-mono tracking-widest uppercase">
                PHOTO: VALID
              </div>
            </div>

            {/* Clickable Cosmic Wax Seal */}
            <div
              onClick={handleSealClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSealClick(); }}
              className={`cursor-pointer transition-transform duration-300 select-none ${
                stampActive ? 'scale-110 rotate-6' : 'hover:scale-105'
              }`}
              title="Click to authenticate seal!"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-700 via-red-800 to-rose-950 border-2 border-amber-300 shadow-lg flex flex-col items-center justify-center text-amber-100 p-1 relative">
                <div className="absolute inset-1 rounded-full border border-dashed border-amber-200/50" />
                <Award className="w-6 h-6 text-amber-300" />
                <span className="text-[8px] font-black tracking-widest uppercase mt-0.5">ASTRAL SEAL</span>
                <span className="text-[7px] text-amber-200 font-mono">APPROVED</span>
              </div>
            </div>

            <p className="text-[11px] text-amber-800/80 font-mono">
              Thumbprint: <span className="font-serif">🌱 Sprout-Print Verified</span>
            </p>
          </div>

          {/* Right Column (2 cols): The 5 Canonical Fields */}
          <div className="md:col-span-2 space-y-4 font-serif text-sm">
            
            {/* Field 1: Name */}
            <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-700/20 shadow-xs">
              <span className="text-xs uppercase tracking-wider text-amber-800 font-bold block mb-0.5 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                Point 1 • Full Name
              </span>
              <p className="text-xl font-black text-amber-950 font-serif tracking-wide">
                {characterSheet.name}
              </p>
            </div>

            {/* Field 2 & 3: Species & Profession in Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Field 2: What They Are (Species) */}
              <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-700/20 shadow-xs">
                <span className="text-xs uppercase tracking-wider text-amber-800 font-bold block mb-0.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-600" />
                  Point 2 • Species / Entity
                </span>
                <p className="text-base font-bold text-amber-950">
                  {characterSheet.whatTheyAre}
                </p>
              </div>

              {/* Field 3: What They Do (Profession) */}
              <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-700/20 shadow-xs">
                <span className="text-xs uppercase tracking-wider text-amber-800 font-bold block mb-0.5 flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-amber-600" />
                  Point 3 • Calling / Profession
                </span>
                <p className="text-base font-bold text-amber-950">
                  {characterSheet.whatTheyDo}
                </p>
              </div>
            </div>

            {/* Field 4: Origin Story */}
            <div className="bg-amber-50/80 p-3.5 rounded-lg border border-amber-700/20 shadow-xs">
              <span className="text-xs uppercase tracking-wider text-amber-800 font-bold block mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Point 4 • Origin & Constellation Story
              </span>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed italic">
                "{characterSheet.story}"
              </p>
            </div>

            {/* Field 5: Motto / Tagline */}
            <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 p-3.5 rounded-lg border-2 border-amber-500/40 shadow-xs">
              <span className="text-xs uppercase tracking-wider text-amber-800 font-bold block mb-1">
                Point 5 • Sacred Motto & Tagline
              </span>
              <p className="text-sm sm:text-base font-extrabold text-amber-950 tracking-wide font-serif">
                ✨ {characterSheet.tagline}
              </p>
            </div>

          </div>

        </div>

        {/* Footer Notice */}
        <div className="mt-6 pt-3 border-t border-amber-800/20 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-amber-800/70 gap-2">
          <span>CLASSIFICATION: HAX.BABY TRACK 2 (ORIGINAL ENTITY)</span>
          <span>EXPIRY: ETERNAL DREAMTIME</span>
        </div>

      </div>
    </div>
  );
};
