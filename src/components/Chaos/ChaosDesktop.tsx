import React, { useState } from 'react';
import { Monitor, Smartphone, Sparkles, Terminal } from 'lucide-react';

interface ChaosDesktopProps {
  children: React.ReactNode;
}

/**
 * ChaosDesktop (+5 pts Side Quest: Responsive Chaos Mode)
 * Allows switching between cozy modern story layout and nostalgic 90s/00s windowed desktop view.
 */
export function ChaosDesktop({ children }: ChaosDesktopProps) {
  const [isChaosMode, setIsChaosMode] = useState<boolean>(false);

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${isChaosMode ? 'bg-[#008080] font-mono' : 'bg-nebula-950'}`}>
      {/* Chaos Mode Toggle Bar */}
      <div className="sticky top-0 z-40 w-full px-4 py-2 bg-black/60 backdrop-blur-md border-b border-purple-800/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-mono text-purple-200 uppercase tracking-widest hidden sm:inline">
            NEBUPIP · TRACK 2 ORIGINAL ENTITY
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsChaosMode(!isChaosMode)}
          className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-bold border transition-all active:scale-95 ${
            isChaosMode
              ? 'bg-[#c0c0c0] text-black border-t-white border-l-white border-b-black border-r-black shadow-[inset_1px_1px_0px_#fff,inset_-1px_-1px_0px_#000]'
              : 'bg-purple-900/60 hover:bg-purple-800 text-starlight-yellow border-purple-500/40'
          }`}
          title="Toggle early-web retro windowed desktop experience (+5 pts Side Quest)"
        >
          {isChaosMode ? <Smartphone className="w-3.5 h-3.5 text-blue-900" /> : <Monitor className="w-3.5 h-3.5 text-starlight-yellow" />}
          <span>{isChaosMode ? 'Exit Chaos Mode' : 'Retro Chaos Mode (+5pts)'}</span>
        </button>
      </div>

      {/* Main Content Render */}
      {isChaosMode ? (
        <div className="p-4 max-w-5xl mx-auto">
          {/* Windows 98 / Mac OS 9 Classic Frame Wrapper */}
          <div className="bg-[#c0c0c0] p-1 border-2 border-t-white border-l-white border-b-black border-r-black shadow-2xl rounded-sm">
            {/* Title Bar */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 px-3 py-1.5 flex items-center justify-between text-white font-bold text-xs select-none">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-starlight-yellow" /> C:\NEBUPIP\DREAM_DESKTOP_V1.EXE
              </span>
              <div className="flex gap-1">
                <button type="button" className="w-4 h-4 bg-[#c0c0c0] text-black text-[10px] flex items-center justify-center font-bold border border-t-white border-l-white border-b-black border-r-black">_</button>
                <button type="button" className="w-4 h-4 bg-[#c0c0c0] text-black text-[10px] flex items-center justify-center font-bold border border-t-white border-l-white border-b-black border-r-black">□</button>
                <button type="button" onClick={() => setIsChaosMode(false)} className="w-4 h-4 bg-[#c0c0c0] text-black text-[10px] flex items-center justify-center font-bold border border-t-white border-l-white border-b-black border-r-black">×</button>
              </div>
            </div>

            {/* Inset Viewport */}
            <div className="bg-nebula-950 p-4 border-2 border-t-black border-l-black border-b-white border-r-white overflow-y-auto max-h-[85vh]">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-20">{children}</div>
      )}
    </div>
  );
}
