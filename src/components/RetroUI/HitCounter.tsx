import { useEffect, useState } from 'react';

/**
 * HitCounter (+1 pt Side Quest: Vintage Odometer Hit Counter)
 * Displays "Dreams Delivered: 001,248" with classic retro mechanical tumbler styling.
 */
export function HitCounter() {
  const [hits, setHits] = useState<number>(1204);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nebupip_dreams_delivered');
      const base = stored ? parseInt(stored, 10) : 1204;
      const next = base + 1;
      localStorage.setItem('nebupip_dreams_delivered', String(next));
      setHits(next);
    } catch {
      setHits(1205);
    }
  }, []);

  const padded = String(hits).padStart(6, '0');

  return (
    <div
      title="Vintage Hit Counter: Total dreams woven and delivered"
      className="inline-flex items-center gap-2 px-3 py-1 bg-black/80 border border-purple-800 rounded-md shadow-inner font-mono text-xs select-none"
    >
      <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
        Dreams Delivered:
      </span>
      <div className="flex bg-neutral-900 border border-neutral-700 px-1 py-0.5 rounded shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
        {padded.split('').map((digit, i) => (
          <span
            key={i}
            className="w-3.5 text-center text-starlight-yellow font-bold text-xs bg-neutral-950 mx-0.5 rounded-sm border-t border-neutral-700"
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
}
