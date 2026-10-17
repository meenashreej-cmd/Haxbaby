import React, { useState, useEffect, useRef } from 'react';
import type { CharacterProps, EyeOffset } from '../../types';
import { useAudio } from '../../hooks/useAudio';
import { Sparkles, Heart } from 'lucide-react';

export const Nebupip: React.FC<CharacterProps> = ({
  mood,
  isMuted = false,
  onPoke,
  onEasterEggTrigger,
  className = '',
}) => {
  const { playSfx } = useAudio();
  const [isBlushing, setIsBlushing] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [pokeCount, setPokeCount] = useState(0);
  const [eyeOffset, setEyeOffset] = useState<EyeOffset>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Eye tracking cursor/touch
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const dist = Math.min(6, Math.hypot(deltaX, deltaY) / 25);

      setEyeOffset({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  const handleCharacterClick = () => {
    if (!isMuted) {
      playSfx('giggle');
    }
    setIsBlushing(true);
    setIsWiggling(true);
    const nextPokes = pokeCount + 1;
    setPokeCount(nextPokes);

    if (onPoke) onPoke();

    if (nextPokes >= 5 && onEasterEggTrigger) {
      playSfx('chime');
      onEasterEggTrigger();
    }

    setTimeout(() => setIsWiggling(false), 600);
    setTimeout(() => setIsBlushing(false), 2000);
  };

  // Color schemes based on mood
  const moodTheme = {
    day: {
      sproutBody: 'from-amber-200 via-purple-300 to-indigo-400',
      auraGlow: 'rgba(253, 224, 71, 0.4)',
      leafColor: '#4ade80',
      antennaBulb: '#fef08a',
    },
    night: {
      sproutBody: 'from-indigo-300 via-purple-400 to-slate-800',
      auraGlow: 'rgba(168, 85, 247, 0.4)',
      leafColor: '#86efac',
      antennaBulb: '#c084fc',
    },
    dreaming: {
      sproutBody: 'from-pink-300 via-purple-300 to-cyan-300',
      auraGlow: 'rgba(244, 114, 182, 0.5)',
      leafColor: '#6ee7b7',
      antennaBulb: '#f472b6',
    },
  }[mood];

  return (
    <div
      ref={containerRef}
      onClick={handleCharacterClick}
      className={`relative inline-flex flex-col items-center cursor-pointer select-none group transition-transform ${className}`}
      title="Click Nebupip to poke tummy and hear a giggle!"
    >
      {/* Ambient Starlight Dream Aura */}
      <div
        className="absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
        style={{ background: moodTheme.auraGlow }}
      />

      {/* Floating Hearts / Sparkles on Poke */}
      {isWiggling && (
        <div className="absolute -top-6 flex gap-2 animate-bounce pointer-events-none">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>
      )}

      {/* SVG Living Rig */}
      <svg
        viewBox="0 0 200 220"
        className={`w-52 h-56 sm:w-64 sm:h-72 transition-transform duration-300 ${
          isWiggling ? 'animate-wiggle scale-105' : 'group-hover:scale-105'
        }`}
      >
        <defs>
          <radialGradient id="nebupipHeadGrad" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#faf5ff" />
            <stop offset="65%" stopColor="#d8b4fe" />
            <stop offset="100%" stopColor="#9333ea" />
          </radialGradient>
          <linearGradient id="cloudSwaddle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e7ff" />
            <stop offset="50%" stopColor="#c7d2fe" />
            <stop offset="100%" stopColor="#a5b4fc" />
          </linearGradient>
          <filter id="softSproutGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Orbiting Starlight Halo */}
        <circle
          cx="100"
          cy="110"
          r="82"
          fill="none"
          stroke="#fde047"
          strokeWidth="1.5"
          strokeDasharray="4,6"
          opacity="0.7"
          className="animate-spin-slow origin-center"
        />

        {/* Tiny Orbiting Star */}
        <circle cx="100" cy="28" r="4" fill="#fef08a" className="animate-pulse" />

        {/* Antenna 1: Left Sprout */}
        <path
          d="M 100 68 Q 78 30 62 38"
          stroke={moodTheme.leafColor}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="62" cy="38" r="7" fill={moodTheme.antennaBulb} className="animate-pulse" />

        {/* Antenna 2: Right Star Tendril */}
        <path
          d="M 100 68 Q 122 26 138 34"
          stroke={moodTheme.leafColor}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="138" cy="34" r="7" fill="#fde047" className="animate-pulse" />

        {/* Sprout Head Body */}
        <ellipse
          cx="100"
          cy="112"
          rx="58"
          ry="52"
          fill="url(#nebupipHeadGrad)"
          filter="url(#softSproutGlow)"
        />

        {/* Forehead Dream Star Marking */}
        <path
          d="M 100 82 L 102 88 L 108 90 L 102 92 L 100 98 L 98 92 L 92 90 L 98 88 Z"
          fill="#fef08a"
          opacity="0.8"
        />

        {/* Big Cosmic Eyes with Pupil Tracking */}
        <g id="left-eye">
          <ellipse cx="80" cy="108" rx="9" ry="13" fill="#1e1b4b" />
          {/* Tracking Pupil */}
          <circle
            cx={80 + eyeOffset.x}
            cy={108 + eyeOffset.y}
            r="4.5"
            fill="#a855f7"
          />
          {/* Star Eye Glints */}
          <circle cx="77" cy="104" r="3.2" fill="#ffffff" />
          <circle cx="83" cy="113" r="1.8" fill="#ffffff" />
        </g>

        <g id="right-eye">
          <ellipse cx="120" cy="108" rx="9" ry="13" fill="#1e1b4b" />
          {/* Tracking Pupil */}
          <circle
            cx={120 + eyeOffset.x}
            cy={108 + eyeOffset.y}
            r="4.5"
            fill="#a855f7"
          />
          {/* Star Eye Glints */}
          <circle cx="117" cy="104" r="3.2" fill="#ffffff" />
          <circle cx="123" cy="113" r="1.8" fill="#ffffff" />
        </g>

        {/* Cheeks - Blush intensifies on click / hover */}
        <ellipse
          cx="68"
          cy="124"
          rx={isBlushing ? 10 : 8}
          ry={isBlushing ? 6 : 5}
          fill="#f472b6"
          opacity={isBlushing ? 0.95 : 0.65}
          className="transition-all duration-300"
        />
        <ellipse
          cx="132"
          cy="124"
          rx={isBlushing ? 10 : 8}
          ry={isBlushing ? 6 : 5}
          fill="#f472b6"
          opacity={isBlushing ? 0.95 : 0.65}
          className="transition-all duration-300"
        />

        {/* Baby Smile / Mouth */}
        {mood === 'dreaming' ? (
          // Sleeping little 'o'
          <circle cx="100" cy="128" r="4" fill="#581c87" />
        ) : (
          <path
            d="M 92 126 Q 100 134 108 126"
            stroke="#4c1d95"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* Pillowy Cloud Swaddle Blankie */}
        <path
          d="M 64 148 C 72 185 128 185 136 148 C 146 156 154 172 144 186 C 130 204 70 204 56 186 C 46 172 54 156 64 148 Z"
          fill="url(#cloudSwaddle)"
        />

        {/* Tiny Sprout Feet / Rootlets */}
        <circle cx="86" cy="194" r="5" fill="#86efac" />
        <circle cx="114" cy="194" r="5" fill="#86efac" />
      </svg>

      <span className="text-[11px] font-mono text-purple-300/80 bg-slate-900/60 px-2.5 py-0.5 rounded-full border border-purple-500/20 backdrop-blur-xs mt-1">
        ✨ Click to poke Nebupip • Mood: {mood}
      </span>
    </div>
  );
};
