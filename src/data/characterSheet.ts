import type { CharacterSheetData, ProjectItem, StoryScene } from '../types';

/**
 * Section 04: 5-Point Character Sheet Data
 * Canonical lore for Nebupip: The Cosmic Dream-Sprout
 */
export const characterSheet: CharacterSheetData = {
  name: "Nebupip ('Pip')",
  whatTheyAre: "Cosmic Sprout Baby",
  whatTheyDo: "Apprentice Dream-Weaver",
  story: "Born from a sneezed star on a velvet crescent moon, Nebupip drifts through the sleepy astral winds, gathering loose static and turning tangled nightmares into pillowy, sweet daydreams.",
  tagline: "Even the smallest star lights up the biggest dream!"
};

/**
 * Section 05: Visual Story Scenes
 * Rules: Strictly < 150 words per scene.
 */
export const storyScenes: StoryScene[] = [
  {
    id: 1,
    title: "Scene 1: The Cosmic Sneeze",
    subtitle: "Where starlight found a heartbeat",
    text: "High above the sleepy lavender ionosphere, a great supernova took a deep cosmic breath and sneezed. From that sparkling celestial sneeze tumbled a tiny, luminous speck with sleepy eyes and two soft leaf-tendrils: Nebupip. Floating on an asteroid pillow, the little sprout wondered what a universe as vast as this could possibly need from someone so small."
  },
  {
    id: 2,
    title: "Scene 2: Gathering Stardust",
    subtitle: "Weaving static into lullabies",
    text: "Nebupip discovered that between sleeping galaxies drifted static — sharp crackles of forgotten worries and restless earthbound thoughts. Armed with a pocketful of moonbeams, Nebupip learned to catch these jagged sparks between chubby fingers. With gentle purrs and spinning starlight needles, the static softened, unwinding into glistening spools of pastel dream-yarn."
  },
  {
    id: 3,
    title: "Scene 3: The Cradle of Dreams",
    subtitle: "A pillow of midnight peace",
    text: "On a quiet Tuesday, a child down on Earth tossed and turned beneath stormy shadows. Floating down on a silver ray, Nebupip tucked a fresh lavender cloud-blanket around their sleepy forehead. The room filled with the scent of stardust and chamomile. The child smiled in their sleep, and Nebupip's heart blossomed with a golden glow: their sacred craft had truly begun."
  }
];

/**
 * Section 05: What They Made - Interactive Projects Showcase
 */
export const projects: ProjectItem[] = [
  {
    id: "cloud-fluff-weaver",
    title: "The Cloud-Fluff Weaver",
    tag: "Procedural Canvas",
    description: "Spins gossamer nebula yarn into soft sleeping clouds. Drag or click to fluff and seed star-clouds that drift gently across the sky.",
    demoType: "cloud"
  },
  {
    id: "constellation-color-sorter",
    title: "Constellation Color-Sorter",
    tag: "Interactive Drag/Sort",
    description: "Catches rogue twinkling asteroids and sorts them into harmonic color spectrums (Lavender, Solar Gold, Mint Stardust) to tune cosmic radio frequencies.",
    demoType: "stars"
  },
  {
    id: "midnight-slumber-box",
    title: "The Midnight Slumber Box",
    tag: "Harmonic Soundscape",
    description: "A vintage wooden music box humming with theta-wave cosmic lullabies. Interactive frequency switches and music-box chimes designed to calm anxious spirits.",
    demoType: "sound"
  }
];
