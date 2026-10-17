import { useState } from 'react';
import { CharacterMood } from './types';
import { AudioProvider } from './hooks/useAudio';
import { useVisitorMemory } from './hooks/useVisitorMemory';
import { Nebupip } from './components/Character/Nebupip';
import { DialogueBox } from './components/Character/DialogueBox';
import { MasterMuteButton } from './components/Audio/MasterMuteButton';
import { LullabyLab } from './components/Audio/LullabyLab';
import { NightlightMask } from './components/RetroUI/NightlightMask';
import { SparkleTrail } from './components/RetroUI/SparkleTrail';
import { HitCounter } from './components/RetroUI/HitCounter';
import { GuestbookWall } from './components/RetroUI/GuestbookWall';
import { EasterEggModal } from './components/RetroUI/EasterEggModal';
import { ChaosDesktop } from './components/Chaos/ChaosDesktop';
import { CharacterSheetModal, StoryJourney, ProjectsShowcase } from './components/Story';
import { CreditsFooter } from './components/Footer/CreditsFooter';
import { Sun, Moon, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [mood, setMood] = useState<CharacterMood>('night');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const { greeting } = useVisitorMemory();

  const cycleMood = () => {
    setMood((current) => {
      if (current === 'night') return 'day';
      if (current === 'day') return 'dreaming';
      return 'night';
    });
  };

  return (
    <AudioProvider>
      {/* Side Quest (+2 pts): Stardust Sparkle Cursor Trail */}
      <SparkleTrail />

      {/* Tier 2: Nightlight Flashlight Mask (Active during night/dreaming) */}
      {(mood === 'night' || mood === 'dreaming') && <NightlightMask />}

      {/* Side Quest (+5 pts): Responsive Chaos Mode Container */}
      <ChaosDesktop>
        <div className="relative z-20 max-w-5xl mx-auto px-4 py-6">
          {/* Top Status & Control Bar */}
          <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-nebula-900/50 border border-purple-800/40 backdrop-blur-md">
            {/* Side Quest (+1 pt): Hit Counter Odometer */}
            <HitCounter />

            {/* Tier 3: Returning Visitor Greeting */}
            <div className="text-center font-mono text-xs text-purple-200">
              <span className="text-starlight-yellow font-bold">{greeting}</span>
            </div>

            {/* Mood Controls & Master Mute */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={cycleMood}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-purple-950 border border-purple-700/60 hover:bg-purple-900 text-purple-200 transition-colors shadow-sm"
                title="Toggle between Day, Night, and Dreaming moods"
              >
                {mood === 'day' && <Sun className="w-3.5 h-3.5 text-amber-400" />}
                {mood === 'night' && <Moon className="w-3.5 h-3.5 text-indigo-400" />}
                {mood === 'dreaming' && <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />}
                <span className="uppercase">{mood} MODE</span>
              </button>

              <MasterMuteButton />
            </div>
          </header>

          {/* Main Hero: The Living Character Rig */}
          <section className="flex flex-col items-center justify-center my-8 text-center">
            <Nebupip
              mood={mood}
              onEasterEggTrigger={() => setIsEasterEggOpen(true)}
            />

            {/* Tier 3: Character Dialogue Toy */}
            <DialogueBox mood={mood} />

            {/* Section 04: The 5-Point Character Sheet Trigger */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsSheetOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-lg shadow-purple-900/50 transition-all transform active:scale-95"
              >
                <BookOpen className="w-4 h-4" /> Open 5-Point Character Sheet
              </button>
            </div>
          </section>

          {/* Tier 2: Lullaby Lab (Web Audio Synth Music Box) */}
          <LullabyLab />

          {/* Section 05 Core Element 3: Origin Journey (<150 words per scene) */}
          <StoryJourney />

          {/* Section 05 Core Element 2: 3 Inventions ("What they do") */}
          <ProjectsShowcase />

          {/* Side Quest (+2 pts): Live Persistent Dream Guestbook Wall */}
          <GuestbookWall />

          {/* Section 04 Character Sheet Modal */}
          <CharacterSheetModal
            isOpen={isSheetOpen}
            onClose={() => setIsSheetOpen(false)}
          />

          {/* Core Element 6 Hidden Easter Egg Modal */}
          <EasterEggModal
            isOpen={isEasterEggOpen}
            onClose={() => setIsEasterEggOpen(false)}
          />

          {/* Section 09 Visible Credits & Attributions */}
          <CreditsFooter />
        </div>
      </ChaosDesktop>
    </AudioProvider>
  );
}
