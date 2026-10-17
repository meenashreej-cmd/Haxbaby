import { useAudio } from '../../hooks/useAudio';
import { Music, Play, Square, Sparkles, Radio } from 'lucide-react';

export function LullabyLab() {
  const { isPlayingLullaby, toggleLullaby, isMuted, playSfx } = useAudio();

  return (
    <div className="w-full max-w-md mx-auto my-6 p-4 rounded-2xl bg-gradient-to-r from-nebula-900/90 via-indigo-950/80 to-nebula-900/90 border border-purple-500/30 backdrop-blur-md shadow-xl text-slate-100">
      <div className="flex items-center justify-between pb-3 border-b border-purple-800/40">
        <div className="flex items-center gap-2">
          <Music className={`w-5 h-5 ${isPlayingLullaby ? 'text-starlight-yellow animate-spin' : 'text-purple-400'}`} />
          <h3 className="font-mono text-sm tracking-wider font-bold uppercase text-purple-200">
            Lullaby Lab (Music Box Synth)
          </h3>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
          <Radio className="w-3 h-3 animate-pulse" /> WebAudio
        </span>
      </div>

      <div className="py-4 text-center">
        <p className="text-xs text-purple-300/80 mb-3 font-mono">
          {isPlayingLullaby
            ? '♪ Playing soft cosmic pentatonic sleep arpeggios...'
            : 'Press Play to soothe Nebupip with starlight frequencies'}
        </p>

        {/* Music Box Play / Stop Button */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={toggleLullaby}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold transition-all transform active:scale-95 shadow-lg ${
              isPlayingLullaby
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40'
                : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-purple-900/40 animate-pulse'
            }`}
          >
            {isPlayingLullaby ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span>STOP LULLABY</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>PLAY COSMIC LULLABY</span>
              </>
            )}
          </button>
        </div>

        {/* Micro SFX Toy Row */}
        <div className="mt-4 pt-3 border-t border-purple-800/30 flex items-center justify-center gap-2">
          <span className="text-[10px] font-mono text-purple-400 mr-1">Rattle Toys:</span>
          {(['chime', 'giggle', 'pop', 'rattle'] as const).map((sfx) => (
            <button
              key={sfx}
              type="button"
              onClick={() => playSfx(sfx)}
              className="px-2 py-1 rounded bg-purple-950/70 hover:bg-purple-800 text-[10px] font-mono text-starlight-yellow border border-purple-700/50 transition-colors capitalize active:scale-90"
            >
              {sfx}
            </button>
          ))}
        </div>
      </div>

      {isMuted && (
        <div className="text-[10px] text-center text-amber-400 bg-amber-950/40 py-1 rounded border border-amber-500/20">
          ⚠️ Master sound is currently muted. Unmute to hear the music box!
        </div>
      )}
    </div>
  );
}
