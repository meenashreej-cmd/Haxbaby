import React, { useState } from 'react';
import { GuestbookWish } from '../../types';
import { MessageCircle, Send, Sparkles } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

const defaultWishes: GuestbookWish[] = [
  {
    id: '1',
    name: 'Luna',
    wish: 'May every tiny star sleep peacefully tonight! 🌟',
    color: 'from-pink-900/60 to-purple-900/60',
    createdAt: 'Just now',
  },
  {
    id: '2',
    name: 'Cosmo',
    wish: 'Pip, please weave a dream where I can fly over candy clouds! ☁️',
    color: 'from-indigo-900/60 to-blue-900/60',
    createdAt: '5m ago',
  },
  {
    id: '3',
    name: 'Aria',
    wish: 'Thank you for protecting us from bad static dreams! ✨',
    color: 'from-amber-900/60 to-purple-900/60',
    createdAt: '12m ago',
  },
];

export function GuestbookWall() {
  const [wishes, setWishes] = useState<GuestbookWish[]>(() => {
    try {
      const saved = localStorage.getItem('nebupip_guestbook');
      return saved ? JSON.parse(saved) : defaultWishes;
    } catch {
      return defaultWishes;
    }
  });

  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const { playSfx } = useAudio();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) return;

    playSfx('chime');
    const newWish: GuestbookWish = {
      id: String(Date.now()),
      name: name.trim(),
      wish: wish.trim(),
      color: 'from-fuchsia-900/60 to-indigo-900/60',
      createdAt: 'Just now',
    };

    const updated = [newWish, ...wishes.slice(0, 19)];
    setWishes(updated);
    try {
      localStorage.setItem('nebupip_guestbook', JSON.stringify(updated));
    } catch {}

    setName('');
    setWish('');
  };

  return (
    <section className="w-full max-w-3xl mx-auto my-12 p-6 rounded-2xl bg-nebula-900/60 border border-purple-500/30 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-purple-800/40">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-starlight-yellow" />
          <h2 className="font-mono text-sm tracking-wider font-bold uppercase text-purple-200">
            Live Dream Guestbook (+2 pts Side Quest)
          </h2>
        </div>
        <span className="text-[11px] font-mono text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-700/50">
          Leave a Wish for Pip
        </span>
      </div>

      {/* Wish Submission Form */}
      <form onSubmit={handleSubmit} className="my-5 p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Your name or stargazing handle"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            required
            className="flex-1 px-3 py-2 rounded-lg bg-nebula-950 border border-purple-700/60 text-xs font-mono text-slate-100 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <Send className="w-3.5 h-3.5" /> Post Dream Wish
          </button>
        </div>
        <textarea
          placeholder="Leave a sweet bedtime dream wish for Pip..."
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          maxLength={150}
          required
          rows={2}
          className="w-full px-3 py-2 rounded-lg bg-nebula-950 border border-purple-700/60 text-xs font-mono text-slate-100 focus:outline-none focus:border-amber-400 resize-none"
        />
      </form>

      {/* Wishes Wall Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {wishes.map((w) => (
          <div
            key={w.id}
            className={`p-3 rounded-lg bg-gradient-to-br ${w.color} border border-purple-700/40 shadow-sm flex flex-col justify-between`}
          >
            <p className="text-xs text-purple-100 italic leading-snug mb-2 font-sans">
              "{w.wish}"
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono text-starlight-yellow/90 pt-2 border-t border-purple-700/30">
              <span className="font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> {w.name}
              </span>
              <span className="text-purple-400">{w.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
