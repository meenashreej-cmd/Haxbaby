import { X, Trophy, Star } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';
import { useEffect } from 'react';

export function EasterEggModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { playSfx } = useAudio();

  useEffect(() => {
    if (isOpen) {
      playSfx('chime');
    }
  }, [isOpen, playSfx]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 bg-gradient-to-b from-amber-950 via-purple-950 to-indigo-950 border-2 border-amber-400 rounded-2xl shadow-2xl text-center text-slate-100 font-mono">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-amber-300 hover:text-white hover:bg-purple-800/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex p-3 rounded-full bg-amber-500/20 border border-amber-400/50 mb-3 animate-bounce">
          <Trophy className="w-8 h-8 text-starlight-yellow" />
        </div>

        <h2 className="text-base font-bold text-starlight-yellow uppercase tracking-wider mb-1">
          Secret Easter Egg Discovered!
        </h2>
        <p className="text-xs text-purple-300 mb-4">
          Core Element 06 Unlocked: You tickled Pip's star antenna 3 times!
        </p>

        {/* 8-bit Certificate Card */}
        <div className="p-4 rounded-xl bg-black/60 border border-amber-500/50 text-left space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-amber-700/40 pb-2">
            <span className="text-[10px] text-amber-400 font-bold uppercase">Official Certificate</span>
            <span className="text-[10px] text-purple-400">#404-COSMIC-BABY</span>
          </div>
          <p className="text-purple-100 text-xs">
            This certifies that you are an official <strong className="text-starlight-yellow">Honorary Dream-Weaver</strong>.
          </p>
          <p className="text-[11px] text-purple-300 italic">
            "You took the time to poke around and find the playful surprises. Pip grants you sweet dreams forever!"
          </p>
          <div className="flex items-center gap-1 text-[11px] text-starlight-peach pt-1">
            <Star className="w-3.5 h-3.5 fill-current" /> Pip's Official Stardust Paw Stamp
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg"
        >
          Keep Dreaming! ✨
        </button>
      </div>
    </div>
  );
}
