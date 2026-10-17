import { characterSheet } from '../../data/characterSheet';
import { X, Award, Sparkles, BookOpen } from 'lucide-react';

export function CharacterSheetModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg p-6 bg-gradient-to-b from-nebula-900 to-indigo-950 border-2 border-purple-500/50 rounded-2xl shadow-2xl text-slate-100 font-sans">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-purple-300 hover:text-white hover:bg-purple-800/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-purple-700/50 pb-3 mb-4">
          <Award className="w-6 h-6 text-starlight-yellow" />
          <div>
            <h2 className="text-lg font-mono font-bold text-starlight-yellow tracking-wide uppercase">
              The 5-Point Character Sheet
            </h2>
            <p className="text-xs font-mono text-purple-300">haX.baby Track 2 Original Entity Passport</p>
          </div>
        </div>

        {/* 5 Fields */}
        <div className="space-y-3.5 text-xs">
          <div className="p-2.5 rounded-lg bg-purple-950/50 border border-purple-800/40">
            <span className="font-mono font-bold text-starlight-peach block mb-0.5">1. NAME:</span>
            <span className="text-purple-100 text-sm font-semibold">{characterSheet.name}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-purple-950/50 border border-purple-800/40">
            <span className="font-mono font-bold text-starlight-peach block mb-0.5">2. WHAT THEY ARE:</span>
            <p className="text-purple-200 leading-relaxed">{characterSheet.whatTheyAre}</p>
          </div>

          <div className="p-2.5 rounded-lg bg-purple-950/50 border border-purple-800/40">
            <span className="font-mono font-bold text-starlight-peach block mb-0.5">3. WHAT THEY DO:</span>
            <p className="text-purple-200 leading-relaxed">{characterSheet.whatTheyDo}</p>
          </div>

          <div className="p-2.5 rounded-lg bg-purple-950/50 border border-purple-800/40">
            <span className="font-mono font-bold text-starlight-peach block mb-0.5">4. THEIR STORY:</span>
            <p className="text-purple-200 leading-relaxed">{characterSheet.story}</p>
          </div>

          <div className="p-2.5 rounded-lg bg-gradient-to-r from-amber-950/40 to-purple-950/40 border border-amber-500/40">
            <span className="font-mono font-bold text-starlight-yellow block mb-0.5">5. MEMORABLE TAGLINE:</span>
            <p className="font-mono text-starlight-yellow italic text-sm">"{characterSheet.tagline}"</p>
          </div>
        </div>

        {/* Footer Stamp */}
        <div className="mt-4 pt-3 border-t border-purple-800/40 flex items-center justify-between text-[11px] font-mono text-purple-400">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 100% Original IP · Zero Copyrighted Characters
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded font-bold transition-colors"
          >
            Close Passport
          </button>
        </div>
      </div>
    </div>
  );
}
