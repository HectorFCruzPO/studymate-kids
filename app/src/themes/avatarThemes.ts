
export type LearningWorld = 'space' | 'magic' | 'dinosaurs';

export const avatarWorlds: Record<string, LearningWorld> = {
  // Space World
  nova: 'space',
  luna: 'space',
  zee: 'space',

  // Magic World
  orion: 'magic',
  stella: 'magic',
  finn: 'magic',

  // Dinosaur World
  rex: 'dinosaurs',
  trixie: 'dinosaurs',
  sunny: 'dinosaurs',
};

export function getAvatarWorld(avatarId: string): LearningWorld {
  return avatarWorlds[avatarId] ?? 'space';
}

export const worldColors: Record<
  LearningWorld,
  {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  }
> = {
  space: {
    primary: '#172554',
    secondary: '#6366F1',
    accent: '#FACC15',
    background: '#EEF2FF',
  },

  magic: {
    primary: '#581C87',
    secondary: '#C084FC',
    accent: '#F9A8D4',
    background: '#FAF5FF',
  },

  dinosaurs: {
    primary: '#166534',
    secondary: '#4ADE80',
    accent: '#FB923C',
    background: '#F0FDF4',
  },
};
