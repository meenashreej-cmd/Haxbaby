import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
}

const sparkleChars = ['✨', '⭐', '💫', '✦'];

export function SparkleTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let idCounter = 0;

    const handlePointer = (e: MouseEvent) => {
      // Don't spawn too densely
      if (Math.random() > 0.4) return;

      const newParticle: Particle = {
        id: ++idCounter,
        x: e.clientX,
        y: e.clientY,
        char: sparkleChars[Math.floor(Math.random() * sparkleChars.length)],
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 500);
    };

    window.addEventListener('mousemove', handlePointer, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointer);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-xs select-none transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 animate-ping"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
