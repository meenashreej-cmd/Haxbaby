import React, { useEffect, useState } from 'react';

export const HitCounter: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [count, setCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('nebupip_hit_count');
      const val = stored ? parseInt(stored, 10) : 10842;
      return isNaN(val) ? 10842 : val;
    } catch {
      return 10842;
    }
  });

  useEffect(() => {
    try {
      const next = count + 1;
      localStorage.setItem('nebupip_hit_count', String(next));
      setCount(next);
    } catch {
      // Ignore
    }
  }, []);

  const formattedDigits = String(count).padStart(6, '0').split('');

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border-2 border-slate-700 shadow-inner select-none font-mono ${className}`}
      title="Vintage mechanical odometer hit counter"
    >
      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Visitors:</span>
      <div className="flex gap-0.5 bg-black p-1 rounded border border-slate-800">
        {formattedDigits.map((digit, idx) => (
          <div
            key={idx}
            className="w-4 h-6 sm:w-5 sm:h-7 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded flex items-center justify-center text-xs sm:text-sm font-black text-amber-300 shadow-sm"
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
};
