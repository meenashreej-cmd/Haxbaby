import { useEffect, useState } from 'react';

/**
 * NightlightMask (Tier 2: Standout)
 * Renders a subtle flashlight beam that tracks the cursor and illuminates dark dream layers.
 */
export function NightlightMask() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointerActive, setIsPointerActive] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      setIsPointerActive(true);
      if ('touches' in e && e.touches.length > 0) {
        setPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      } else if ('clientX' in e) {
        setPos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  if (!isPointerActive) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle 220px at ${pos.x}px ${pos.y}px, rgba(234, 179, 8, 0.08), rgba(99, 102, 241, 0.04) 40%, rgba(7, 5, 20, 0.65) 85%)`,
      }}
    />
  );
}
