import { useState } from 'react';
import { projects } from '../../data/characterSheet';
import { Cloud, Sparkles, Music, Check } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

export function ProjectsShowcase() {
  const [activeTab, setActiveTab] = useState<string>(projects[0].id);
  const [demoState, setDemoState] = useState<{ [key: string]: boolean }>({});
  const { playSfx } = useAudio();

  const handleRunDemo = (id: string, _type: string) => {
    playSfx('pop');
    setDemoState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full max-w-3xl mx-auto my-12 p-6 rounded-2xl bg-nebula-900/60 border border-purple-500/30 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-purple-800/40">
        <div>
          <h2 className="font-mono text-sm tracking-wider font-bold uppercase text-purple-200">
            What They Do · Creations & Inventions
          </h2>
          <p className="text-xs text-purple-400">3 magical inventions engineered by Pip</p>
        </div>
        <span className="text-[11px] font-mono text-starlight-yellow bg-purple-950/80 px-2 py-0.5 rounded border border-purple-700/50">
          3 Projects Verified
        </span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 my-4">
        {projects.map((proj) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => {
              playSfx('chime');
              setActiveTab(proj.id);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === proj.id
                ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/40 border border-purple-400'
                : 'bg-purple-950/60 text-purple-300 hover:bg-purple-900 border border-purple-800/50'
            }`}
          >
            {proj.title}
          </button>
        ))}
      </div>

      {/* Active Project Details */}
      {projects
        .filter((p) => p.id === activeTab)
        .map((p) => (
          <div key={p.id} className="p-5 rounded-xl bg-purple-950/40 border border-purple-800/50 flex flex-col md:flex-row gap-5 items-center justify-between">
            <div className="flex-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-starlight-yellow font-bold">
                {p.tag}
              </span>
              <h3 className="text-base font-bold text-white mt-1 mb-2">{p.title}</h3>
              <p className="text-purple-200 text-xs leading-relaxed mb-4">{p.description}</p>
              
              <button
                type="button"
                onClick={() => handleRunDemo(p.id, p.demoType)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-md"
              >
                {demoState[p.id] ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                {demoState[p.id] ? 'Toy Activated!' : 'Test Invention Toy'}
              </button>
            </div>

            {/* Interactive Visual Toy Box for this project */}
            <div className="w-full md:w-56 h-36 rounded-lg bg-nebula-950/80 border border-purple-700/50 flex flex-col items-center justify-center p-3 relative overflow-hidden">
              {p.demoType === 'cloud' && (
                <div className="flex flex-col items-center">
                  <Cloud className={`w-12 h-12 text-purple-300 ${demoState[p.id] ? 'animate-bounce text-pink-300' : 'animate-float-slow'}`} />
                  <span className="text-[10px] font-mono text-purple-400 mt-2">
                    {demoState[p.id] ? '☁️ Fluff Puff Generated!' : 'Hover / Tap to weave'}
                  </span>
                </div>
              )}
              {p.demoType === 'stars' && (
                <div className="flex flex-col items-center">
                  <div className="flex gap-2">
                    <span className={`w-4 h-4 rounded-full bg-amber-400 ${demoState[p.id] ? 'animate-ping' : ''}`} />
                    <span className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="w-4 h-4 rounded-full bg-rose-400" />
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 mt-3">
                    {demoState[p.id] ? '⭐ Starlight Sorted: 0 Static' : 'Sorting cosmic spectrum'}
                  </span>
                </div>
              )}
              {p.demoType === 'sound' && (
                <div className="flex flex-col items-center">
                  <Music className={`w-10 h-10 text-emerald-400 ${demoState[p.id] ? 'animate-spin' : ''}`} />
                  <span className="text-[10px] font-mono text-purple-400 mt-2">
                    {demoState[p.id] ? '🎶 Lullaby Frequency: 432Hz' : 'Standby for lullaby wave'}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
    </section>
  );
}
