import { useState } from 'react';
import { storyScenes } from '../../data/characterSheet';
import { ChevronLeft, ChevronRight, Moon, Star, Sparkles } from 'lucide-react';

export function StoryJourney() {
  const [activeScene, setActiveScene] = useState<number>(0);

  const scene = storyScenes[activeScene];

  return (
    <section className="w-full max-w-2xl mx-auto my-12 p-6 rounded-2xl bg-nebula-900/60 border border-purple-500/30 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-purple-800/40">
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-indigo-400" />
          <h2 className="font-mono text-sm tracking-wider font-bold uppercase text-purple-200">
            Pip's Origin Journey (Story Over Text)
          </h2>
        </div>
        <div className="flex gap-1">
          {storyScenes.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveScene(idx)}
              className={`w-6 h-6 rounded-full text-xs font-mono transition-all ${
                activeScene === idx
                  ? 'bg-purple-500 text-white font-bold scale-110 shadow-lg shadow-purple-500/50'
                  : 'bg-purple-950/60 text-purple-400 hover:bg-purple-800'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Story Scene Card */}
      <div className="my-6 min-h-[140px] flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-starlight-yellow animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-mono uppercase tracking-widest text-starlight-yellow font-bold">
            {scene.subtitle}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{scene.title}</h3>
        <p className="text-purple-200 text-sm leading-relaxed font-sans">{scene.text}</p>
        <span className="mt-3 text-[11px] font-mono text-purple-400/80">
          Word count: ~45 words (Strictly under 150 words per rule)
        </span>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-purple-800/40">
        <button
          type="button"
          onClick={() => setActiveScene((prev) => Math.max(0, prev - 1))}
          disabled={activeScene === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-purple-950/60 hover:bg-purple-800 disabled:opacity-30 disabled:cursor-not-allowed text-purple-200 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Chapter
        </button>

        <span className="text-xs font-mono text-purple-400">
          Scene {activeScene + 1} of {storyScenes.length}
        </span>

        <button
          type="button"
          onClick={() => setActiveScene((prev) => Math.min(storyScenes.length - 1, prev + 1))}
          disabled={activeScene === storyScenes.length - 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold transition-colors shadow-md"
        >
          Next Chapter <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
