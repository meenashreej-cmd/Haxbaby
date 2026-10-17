import { CharacterSheetData, ProjectItem, StoryScene } from '../types';

export const characterSheet: CharacterSheetData = {
  name: "Nebupip ('Pip')",
  whatTheyAre: "Species: Cosmic Sprout. A thumb-sized stardust baby swaddled in an iridescent nebula cloud blanket, crowned with a curious twinkling star-antenna and liquid starlight eyes.",
  whatTheyDo: "Apprentice Starcharter & Dream-Weaver. Catches drifting nightmare static from the celestial sea and spins it into warm pastel bedtime dreams and gentle lullabies.",
  story: "Born during the Great Aurora Snooze when a shooting star sneezed into a moonbeam cloud pillow. Now on a quest across the retro constellation web to deliver 10,000 gentle dreams before sunrise.",
  tagline: "Even the smallest star lights up the biggest dream!",
};

export const projects: ProjectItem[] = [
  {
    id: "cloud-weaver",
    title: "The Cloud-Fluff Weaver",
    tag: "Procedural Canvas Toy",
    description: "Spins pastel nebula fluff into pillowy dream clouds that float and dissolve to the touch.",
    demoType: "cloud",
  },
  {
    id: "star-sorter",
    title: "Constellation Color-Sorter",
    tag: "Interactive Starlight Toy",
    description: "Sorts fallen star fragments by wavelength so little dreamers never suffer scary nightmares.",
    demoType: "stars",
  },
  {
    id: "slumber-box",
    title: "The Midnight Slumber Box",
    tag: "Synthesizer Instrument",
    description: "Generates calming pink-noise frequencies and twinkling music box chimes to lull babies to sleep.",
    demoType: "sound",
  },
];

export const storyScenes: StoryScene[] = [
  {
    id: 1,
    title: "Scene 1: The Cosmic Sneeze",
    subtitle: "A Star Is Born",
    text: "Deep in the Lavender Nebula, a tiny shooting star gathered too much stardust and let out a sneeze! Poof! Out tumbled Pip, wrapped in a blanket of warm starlight with a curious blinking antenna.",
  },
  {
    id: 2,
    title: "Scene 2: Gathering the Stardust",
    subtitle: "The Apprentice's Journey",
    text: "Armed with a golden thimble and a moonbeam net, Pip floats between slumbering constellations, plucking nightmare static and spinning it into silky candy-floss dreams.",
  },
  {
    id: 3,
    title: "Scene 3: The Cradle of Dreams",
    subtitle: "Deliveries at Dawn",
    text: "Before the morning sun peeks through, Pip leaves a glowing wish bubble beneath every restless pillow. His task: 10,000 smiles delivered before bedtime ends.",
  },
];
