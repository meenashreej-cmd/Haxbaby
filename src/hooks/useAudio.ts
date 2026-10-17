import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { AudioContextType } from '../types';

const AudioContext = createContext<AudioContextType>({
  isMuted: false,
  toggleMute: () => {},
  playSfx: () => {},
  isPlayingLullaby: false,
  toggleLullaby: () => {},
});

export const useAudio = () => useContext(AudioContext);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('nebupip_muted') === 'true';
    } catch {
      return false;
    }
  });

  const [isPlayingLullaby, setIsPlayingLullaby] = useState<boolean>(false);
  const audioCtxRef = useRef<window.AudioContext | null>(null);
  const lullabyTimerRef = useRef<number | null>(null);
  const lullabyStepRef = useRef<number>(0);

  // Initialize AudioContext on first user interaction to comply with browser autoplay policies
  const getAudioContext = (): window.AudioContext | null => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch (e) {
      console.warn('Web Audio not supported or blocked:', e);
      return null;
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('nebupip_muted', String(next));
      } catch {}
      if (next && isPlayingLullaby) {
        setIsPlayingLullaby(false);
      }
      return next;
    });
  };

  const playSfx = (type: 'giggle' | 'chime' | 'rattle' | 'pop') => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'chime') {
      // Sparkling cosmic star chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15); // A6
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'giggle') {
      // Gentle baby giggle (double warm chirp)
      [0, 0.1, 0.2].forEach((offset, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const baseFreq = 440 + idx * 80;
        osc.frequency.setValueAtTime(baseFreq, now + offset);
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 160, now + offset + 0.08);
        gain.gain.setValueAtTime(0.15, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.1);
      });
    } else if (type === 'pop') {
      // Soft bubble pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'rattle') {
      // Soft starry rattle
      [0, 0.04, 0.08].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200 + Math.random() * 400, now + offset);
        gain.gain.setValueAtTime(0.04, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.03);
      });
    }
  };

  // Pentatonic notes for ambient lullaby music-box: C4, E4, G4, A4, C5, D5, E5, G5
  const lullabyNotes = [261.63, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];

  const playLullabyNote = () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Select note sequence
    const pattern = [0, 2, 4, 3, 1, 4, 2, 5];
    const noteIndex = pattern[lullabyStepRef.current % pattern.length];
    lullabyStepRef.current += 1;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(lullabyNotes[noteIndex], now);

    // Warm music box envelope
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.2);
  };

  const toggleLullaby = () => {
    if (isMuted) {
      setIsMuted(false);
      try {
        localStorage.setItem('nebupip_muted', 'false');
      } catch {}
    }
    setIsPlayingLullaby((prev) => !prev);
  };

  useEffect(() => {
    if (isPlayingLullaby && !isMuted) {
      lullabyTimerRef.current = window.setInterval(playLullabyNote, 600);
    } else {
      if (lullabyTimerRef.current) {
        clearInterval(lullabyTimerRef.current);
        lullabyTimerRef.current = null;
      }
    }
    return () => {
      if (lullabyTimerRef.current) {
        clearInterval(lullabyTimerRef.current);
      }
    };
  }, [isPlayingLullaby, isMuted]);

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,
        playSfx,
        isPlayingLullaby,
        toggleLullaby,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
