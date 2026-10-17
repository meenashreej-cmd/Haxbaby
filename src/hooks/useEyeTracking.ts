import { useState, useEffect, RefObject } from 'react';
import { EyeOffset } from '../types';

/**
 * useEyeTracking
 * Calculates smooth clamped eye pupil coordinates relative to the character container.
 * Supports both mouse movement and touch gestures with automatic fallback to center.
 */
export function useEyeTracking(containerRef?: RefObject<HTMLElement>): { eyeOffset: EyeOffset } {
  const [eyeOffset, setEyeOffset] = useState<EyeOffset>({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = Math.hypot(deltaX, deltaY);
        const maxRadius = 8; // maximum pupil travel distance in pixels

        if (distance > 0) {
          const factor = Math.min(distance / 200, 1);
          targetX = (deltaX / distance) * maxRadius * factor;
          targetY = (deltaY / distance) * maxRadius * factor;
        }
      } else {
        // Fallback to window center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = Math.hypot(deltaX, deltaY);
        const maxRadius = 8;

        if (distance > 0) {
          const factor = Math.min(distance / 300, 1);
          targetX = (deltaX / distance) * maxRadius * factor;
          targetY = (deltaY / distance) * maxRadius * factor;
        }
      }
    };

    // Smooth lerp loop
    const tick = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setEyeOffset({
        x: Math.round(currentX * 100) / 100,
        y: Math.round(currentY * 100) / 100,
      });
      animationFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef]);

  return { eyeOffset };
}
