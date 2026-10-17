import React, { useRef, useState } from 'react';
import { CharacterProps } from '../../types';
import { useEyeTracking } from '../../hooks/useEyeTracking';
import { useAudio } from '../../hooks/useAudio';

export function Nebupip({
  mood,
  isMuted: _isMuted,
  onPoke,
  onEasterEggTrigger,
  className = '',
}: CharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { eyeOffset } = useEyeTracking(containerRef);
  const { playSfx } = useAudio();

  const [isWobbling, setIsWobbling] = useState(false);
  const [antennaClicks, setAntennaClicks] = useState<number>(0);
  const lastAntennaClickTime = useRef<number>(0);

  // Handle character poke/click
  const handlePoke = () => {
    setIsWobbling(true);
    playSfx('giggle');
    if (onPoke) onPoke();
    setTimeout(() => setIsWobbling(false), 600);
  };

  // Handle secret antenna clicks (Easter Egg: 3 clicks within 2 seconds)
  const handleAntennaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSfx('chime');
    const now = Date.now();
    if (now - lastAntennaClickTime.current < 2000) {
      const nextCount = antennaClicks + 1;
      setAntennaClicks(nextCount);
      if (nextCount >= 3) {
        setAntennaClicks(0);
        if (onEasterEggTrigger) onEasterEggTrigger();
      }
    } else {
      setAntennaClicks(1);
    }
    lastAntennaClickTime.current = now;
  };

  // Pupil offset calculations
  const pupilX = mood === 'dreaming' ? 0 : eyeOffset.x;
  const pupilY = mood === 'dreaming' ? 0 : eyeOffset.y;

  return (
    <div
      ref={containerRef}
      onClick={handlePoke}
      title="Click Nebupip to play! (Tip: Curious about the star antenna?)"
      className={`relative select-none cursor-pointer inline-flex flex-col items-center justify-center p-4 transition-transform duration-300 ${
        isWobbling ? 'scale-110 -rotate-3' : 'hover:scale-105'
      } ${className}`}
    >
      {/* Floating Mood Aura */}
      <div
        className={`absolute -inset-4 rounded-full blur-2xl opacity-40 transition-all duration-700 pointer-events-none ${
          mood === 'day'
            ? 'bg-amber-300/60'
            : mood === 'dreaming'
            ? 'bg-fuchsia-500/50 animate-pulse'
            : 'bg-indigo-600/50'
        }`}
      />

      {/* Floating Dream Particles (When dreaming or at night) */}
      {mood === 'dreaming' && (
        <div className="absolute -top-6 right-6 font-mono font-bold text-starlight-bubble text-lg animate-bounce pointer-events-none">
          Zzz...✨
        </div>
      )}

      {/* Main SVG Rig */}
      <svg
        viewBox="0 0 240 280"
        className="w-56 h-64 drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
      >
        <defs>
          {/* Swaddle Blanket Gradient */}
          <linearGradient id="blanketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={mood === 'day' ? '#c4b5fd' : '#4338ca'} />
            <stop offset="50%" stopColor={mood === 'day' ? '#e9d5ff' : '#312e81'} />
            <stop offset="100%" stopColor={mood === 'day' ? '#fbcfe8' : '#1e1b4b'} />
          </linearGradient>

          {/* Baby Skin / Stardust Core Gradient */}
          <radialGradient id="sproutSkin" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="70%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#fde047" />
          </radialGradient>

          {/* Celestial Eye Depth Gradient */}
          <radialGradient id="eyeDepth" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="65%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Star Antenna Glow */}
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- 1. STAR ANTENNA (Secret Easter Egg Trigger) --- */}
        <g
          onClick={handleAntennaClick}
          className="cursor-pointer transition-transform hover:scale-125 origin-[120px_45px]"
          filter="url(#starGlow)"
        >
          {/* Antenna Stem */}
          <path
            d="M 120 75 Q 115 50, 120 40"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Star Node */}
          <polygon
            points="120,20 124,32 136,33 127,41 130,53 120,46 110,53 113,41 104,33 116,32"
            fill={antennaClicks > 0 ? '#f43f5e' : '#fde047'}
            stroke="#d97706"
            strokeWidth="1.5"
            className="animate-spin origin-[120px_35px]"
            style={{ animationDuration: '8s' }}
          />
          <circle cx="120" cy="35" r="3" fill="#ffffff" />
        </g>

        {/* --- 2. SPROUT EARS (Baby Leaf Petals) --- */}
        <path
          d="M 50 120 C 30 100, 35 140, 58 135 Z"
          fill="#86efac"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <path
          d="M 190 120 C 210 100, 205 140, 182 135 Z"
          fill="#86efac"
          stroke="#16a34a"
          strokeWidth="2"
        />

        {/* --- 3. SWADDLE / NEBULA BLANKET BODY --- */}
        <path
          d="M 60 145 C 50 200, 70 260, 120 260 C 170 260, 190 200, 180 145 C 160 180, 80 180, 60 145 Z"
          fill="url(#blanketGrad)"
          stroke="#818cf8"
          strokeWidth="3"
        />
        {/* Blanket Fold Details */}
        <path
          d="M 75 160 Q 120 200, 165 160"
          fill="none"
          stroke="#a5b4fc"
          strokeWidth="2.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 85 195 Q 120 230, 155 195"
          fill="none"
          stroke="#a5b4fc"
          strokeWidth="2"
        />
        {/* Swaddle Tiny Paws / Hands */}
        <ellipse cx="95" cy="170" rx="10" ry="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
        <ellipse cx="145" cy="170" rx="10" ry="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />

        {/* --- 4. BABY HEAD / FACE --- */}
        <circle
          cx="120"
          cy="115"
          r="55"
          fill="url(#sproutSkin)"
          stroke="#f59e0b"
          strokeWidth="3"
        />

        {/* Cheek Blush */}
        <circle
          cx="82"
          cy="132"
          r={isWobbling ? 12 : 9}
          fill="#f472b6"
          opacity={isWobbling ? 0.8 : 0.45}
          className="transition-all duration-300"
        />
        <circle
          cx="158"
          cy="132"
          r={isWobbling ? 12 : 9}
          fill="#f472b6"
          opacity={isWobbling ? 0.8 : 0.45}
          className="transition-all duration-300"
        />

        {/* Tiny Stardust Freckles */}
        <circle cx="85" cy="122" r="1.5" fill="#f59e0b" />
        <circle cx="90" cy="125" r="1.2" fill="#f59e0b" />
        <circle cx="155" cy="122" r="1.5" fill="#f59e0b" />
        <circle cx="150" cy="125" r="1.2" fill="#f59e0b" />

        {/* --- 5. EYES (Interactive Tracking Rig) --- */}
        {mood === 'dreaming' ? (
          // Sleeping/Dreaming Curved Eyes
          <g stroke="#312e81" strokeWidth="3.5" strokeLinecap="round" fill="none">
            <path d="M 88 115 Q 98 126, 108 115" />
            <path d="M 132 115 Q 142 126, 152 115" />
          </g>
        ) : (
          // Alert / Awake Eyes with Mouse Tracking
          <g>
            {/* Left Eye Sclera */}
            <ellipse cx="98" cy="112" rx="14" ry="17" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2" />
            {/* Left Pupil (Dynamic Offset) */}
            <g transform={`translate(${pupilX}, ${pupilY})`}>
              <ellipse cx="98" cy="112" rx="9" ry="12" fill="url(#eyeDepth)" />
              {/* Starlight Catchlight */}
              <circle cx="95" cy="107" r="3.5" fill="#ffffff" />
              <circle cx="102" cy="116" r="1.8" fill="#ffffff" />
            </g>

            {/* Right Eye Sclera */}
            <ellipse cx="142" cy="112" rx="14" ry="17" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2" />
            {/* Right Pupil (Dynamic Offset) */}
            <g transform={`translate(${pupilX}, ${pupilY})`}>
              <ellipse cx="142" cy="112" rx="9" ry="12" fill="url(#eyeDepth)" />
              {/* Starlight Catchlight */}
              <circle cx="139" cy="107" r="3.5" fill="#ffffff" />
              <circle cx="146" cy="116" r="1.8" fill="#ffffff" />
            </g>
          </g>
        )}

        {/* --- 6. BABY MOUTH --- */}
        {isWobbling ? (
          // Big Happy "O" Giggle Mouth
          <ellipse cx="120" cy="136" rx="8" ry="10" fill="#be123c" stroke="#881337" strokeWidth="1.5" />
        ) : mood === 'day' ? (
          // Cute Smile
          <path
            d="M 112 133 Q 120 142, 128 133"
            fill="none"
            stroke="#78350f"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ) : (
          // Sleepy Tiny Pout
          <path
            d="M 114 135 Q 120 132, 126 135"
            fill="none"
            stroke="#78350f"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* Tiny Under-Avatar Name Tag */}
      <div className="mt-2 text-center">
        <span className="px-3 py-1 bg-nebula-900/80 border border-purple-500/30 text-purple-200 text-xs font-mono rounded-full shadow-sm">
          ⭐ Nebupip · Apprentice Dream-Weaver
        </span>
      </div>
    </div>
  );
}
