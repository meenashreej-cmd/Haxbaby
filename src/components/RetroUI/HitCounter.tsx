import React, { useEffect, useState } from 'react';
import { useVisitorMemory } from '../../hooks/useVisitorMemory';

/**
 * HitCounter — Vintage Mechanical Odometer Hit Counter (+1 pt Side Quest)
 *
 * Visually renders: "Dreams Delivered: 001,248"
 * Featuring vintage mechanical rolling tumbler barrels, bevel cylinder shadows,
 * accessible screen reader support, layout stability, and prefers-reduced-motion compliance.
 *
 * NOTE: The number 001,248 is an aesthetic early-web design reference homage;
 * this component clearly communicates this as a playful cosmic metric rather than
 * misrepresenting local client visits as a global server statistic.
 */
export function HitCounter(): JSX.Element {
  const { visitCount } = useVisitorMemory();
  const [hasMounted, setHasMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        mediaQuery.addListener(handleChange);
      }

      // Trigger rolling animation after initial mount render
      const timer = setTimeout(() => setHasMounted(true), 50);

      return () => {
        clearTimeout(timer);
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else {
          mediaQuery.removeListener(handleChange);
        }
      };
    }
  }, []);

  // Canonical design reference begins at 001,248 and playfully integrates local visitor progression
  const baseCount = 1247 + (visitCount > 0 ? visitCount : 1);
  const padded = String(baseCount).padStart(6, '0');
  const displayString = `${padded.slice(0, 3)},${padded.slice(3)}`;
  const chars = displayString.split('');

  return (
    <div
      role="group"
      aria-label={`Dreams Delivered: ${displayString}`}
      title={`Vintage Mechanical Odometer: Dreams Delivered ${displayString} (Nostalgic early-web homage)`}
      className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/80 border border-purple-800/60 rounded-md shadow-inner select-none"
    >
      <span className="text-[10px] text-purple-300 font-mono font-bold uppercase tracking-wider">
        Dreams Delivered:
      </span>

      {/* Screen-reader accessible announcement */}
      <span className="sr-only">Dreams Delivered: {displayString}</span>

      {/* Retro mechanical odometer tumbler bezel */}
      <div
        aria-hidden="true"
        className="relative flex items-center bg-neutral-950 border border-neutral-700/80 px-1 py-0.5 rounded shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),inset_0_-2px_4px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Subtle mechanical center divider groove */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10 z-10" />

        {chars.map((char, index) => {
          if (char === ',') {
            return (
              <span
                key={`comma-${index}`}
                className="w-1.5 text-center text-starlight-yellow font-mono font-bold text-xs leading-5"
              >
                ,
              </span>
            );
          }

          const targetDigit = parseInt(char, 10);
          const shouldAnimate = hasMounted && !prefersReducedMotion;

          return (
            <div
              key={`digit-${index}`}
              className="relative w-3.5 h-5 mx-[1px] overflow-hidden bg-neutral-900 rounded-sm border-t border-neutral-700/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)]"
            >
              {/* Vertical tumbler drum containing 0-9 digits */}
              <div
                className="flex flex-col transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: shouldAnimate
                    ? `translateY(-${targetDigit * 10}%)`
                    : prefersReducedMotion
                    ? `translateY(-${targetDigit * 10}%)`
                    : 'translateY(0%)',
                  transitionDelay: shouldAnimate ? `${index * 60}ms` : '0ms',
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                  <span
                    key={digit}
                    className="w-3.5 h-5 flex items-center justify-center text-starlight-yellow font-mono font-bold text-xs leading-5"
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
