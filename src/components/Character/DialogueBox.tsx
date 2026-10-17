import { useState } from 'react';
import { useAudio } from '../../hooks/useAudio';
import { MessageSquare, Sparkles } from 'lucide-react';

interface DialogueBoxProps {
  mood: string;
}

const dialogueLines = [
  "Did you know? Stardust tastes like fizzy blueberries! ✨",
  "Phew! Just untangled a bad nightmare static near Orion's belt! 🧶",
  "Don't worry little traveler, even the smallest star lights up the sky! 🌟",
  "Yawn... time to tuck three sleeping comets into bed. Zzz...",
  "Click my star antenna if you're curious... but only if you're gentle! 💫",
];

export function DialogueBox({ mood }: DialogueBoxProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const { playSfx } = useAudio();

  const handleNextLine = () => {
    playSfx('pop');
    setLineIndex((prev) => (prev + 1) % dialogueLines.length);
  };

  return (
    <div className="relative my-3 max-w-sm mx-auto text-center">
      {/* Speech Bubble Tail */}
      <div className="inline-block relative bg-gradient-to-r from-purple-900/90 to-indigo-900/90 border border-purple-500/40 px-4 py-2 rounded-2xl shadow-lg cursor-pointer hover:border-starlight-yellow transition-colors"
           onClick={handleNextLine}
           title="Click to hear what Pip has to say!"
      >
        <p className="text-xs font-mono text-starlight-yellow font-medium flex items-center justify-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-purple-300" />
          "{dialogueLines[lineIndex]}"
        </p>
        <div className="text-[10px] text-purple-400 mt-1 font-mono">
          [Click bubble to talk to Pip]
        </div>
      </div>
    </div>
  );
}
