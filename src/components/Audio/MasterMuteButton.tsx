import { useAudio } from '../../hooks/useAudio';
import { Volume2, VolumeX } from 'lucide-react';

export function MasterMuteButton() {
  const { isMuted, toggleMute, playSfx } = useAudio();

  const handleClick = () => {
    toggleMute();
    if (isMuted) {
      // Will unmute, play test chime
      setTimeout(() => playSfx('chime'), 50);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
      title={isMuted ? 'Click to Unmute Sound' : 'Click to Mute Sound'}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border shadow-md active:scale-95 ${
        isMuted
          ? 'bg-rose-950/80 text-rose-300 border-rose-700/60 hover:bg-rose-900'
          : 'bg-nebula-900/80 text-starlight-yellow border-amber-500/50 hover:bg-nebula-800 animate-pulse-glow'
      }`}
    >
      {isMuted ? (
        <>
          <VolumeX className="w-4 h-4 text-rose-400" />
          <span>SOUND: OFF</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-starlight-yellow animate-bounce" />
          <span>SOUND: ON</span>
        </>
      )}
      <span className="sr-only">{isMuted ? 'Muted' : 'Sound Playing'}</span>
    </button>
  );
}
