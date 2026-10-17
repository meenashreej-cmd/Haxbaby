import { useState } from 'react';
import { Heart, ShieldCheck, X } from 'lucide-react';

export function CreditsFooter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full mt-16 py-8 px-4 border-t border-purple-900/40 bg-nebula-950/80 text-center font-mono text-xs text-purple-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-purple-300">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
            <span>by Squad (Dhaya, Meena, Akshitha)</span>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 rounded-full bg-purple-950 border border-purple-700/60 text-starlight-yellow hover:bg-purple-900 transition-colors"
          >
            📜 Credits & Rule Compliance Modal
          </button>

          <div className="text-[11px] text-purple-500">
            haX.baby 2026 · Track 2 (Your Own Baby)
          </div>
        </div>
      </footer>

      {/* Credits Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg p-6 bg-nebula-900 border-2 border-purple-500/60 rounded-2xl text-slate-100 font-sans shadow-2xl text-xs space-y-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-purple-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-mono text-sm font-bold text-starlight-yellow uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Attributions & Hackathon Compliance
            </h3>

            <div className="p-3 rounded-lg bg-purple-950/50 border border-purple-800/40">
              <span className="font-mono font-bold text-starlight-peach block mb-1">100% ORIGINAL ARTWORK (TRACK 2):</span>
              <p className="text-purple-200">
                Nebupip ("Pip") is a 100% original, hand-engineered SVG interactive rig. Zero characters, assets, or trademarks from Disney, Pokémon, Sanrio, anime, or video games were used.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-purple-950/50 border border-purple-800/40">
              <span className="font-mono font-bold text-starlight-peach block mb-1">ZERO-ASSET PROCEDURAL AUDIO:</span>
              <p className="text-purple-200">
                All lullaby melodies, giggles, chimes, and rattle sound effects are synthesized mathematically in real-time using the native HTML5 Web Audio API (OscillatorNode & GainNode). No copyrighted MP3s or heavy audio samples.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-purple-950/50 border border-purple-800/40">
              <span className="font-mono font-bold text-starlight-peach block mb-1">LIBRARIES & OPEN SOURCE:</span>
              <p className="text-purple-200 font-mono text-[11px]">
                React 18 · Vite · TypeScript · Tailwind CSS · Lucide React (ISC License).
              </p>
            </div>

            <div className="text-right pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded font-bold font-mono"
              >
                Close Attributions
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
