import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export const SparkleTrail: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const colors = ['#fde047', '#f472b6', '#c084fc', '#67e8f9', '#ffffff'];

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const newSparkle: Sparkle = {
        id: Math.random() + Date.now(),
        x: clientX,
        y: clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6,
      };

      setSparkles((prev) => [...prev.slice(-18), newSparkle]);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    const cleanupInterval = setInterval(() => {
      setSparkles((prev) => prev.slice(1));
    }, 60);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {sparkles.map((s) => (
        <span
          key={s.id}
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            color: s.color,
            fontSize: `${s.size}px`,
            textShadow: `0 0 6px ${s.color}`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-sparkle"
        >
          ✦
        </span>
      ))}
    </div>
  );
};
