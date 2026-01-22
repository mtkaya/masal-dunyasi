// ==========================================
// MASAL DÜNYASI - TYPE DEFINITIONS
// ==========================================

// Story Generation Types
export interface StoryConfig {
  theme: ThemeType;
  duration: 2 | 3 | 5;
  tone: ToneType;
  storyteller: StorytellerType;
  includeWords: string[];
  excludeWords: string[];
}

export type ThemeType = 'castle' | 'space' | 'forest' | 'ocean' | 'clouds' | 'stars';
export type ToneType = 'calm' | 'funny' | 'adventure';
export type StorytellerType = 'grandmother' | 'grandfather' | 'fairy' | 'robot' | 'unicorn' | 'bear' | 'owl' | 'star';

export interface Story {
  id: string;
  title: string;
  content: string;
  childName: string;
  config: StoryConfig;
  audioUrl?: string;
  createdAt: Date;
  duration: number; // in seconds
  isFavorite: boolean;
  listenCount: number;
}

// User & Profile Types
export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatarEmoji: string;
  createdAt: Date;
}

export interface UserSettings {
  defaultStoryteller: StorytellerType;
  defaultDuration: 2 | 3 | 5;
  defaultTone: ToneType;
  ambientSoundEnabled: boolean;
  ambientVolume: number;
  sleepTimerMinutes: number;
  parentalPinEnabled: boolean;
  parentalPin?: string;
  dailyLimitMinutes: number;
  nightModeEnabled: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  children: ChildProfile[];
  activeChildId: string;
  settings: UserSettings;
  isPremium: boolean;
  totalStoriesCreated: number;
  totalListeningMinutes: number;
  starsCollected: number;
  createdAt: Date;
}

// App State Types
export type AppScreen = 
  | 'welcome' 
  | 'create' 
  | 'generating' 
  | 'reading' 
  | 'library' 
  | 'profile'
  | 'parental-controls'
  | 'sleep-timer';

export interface AppState {
  currentScreen: AppScreen;
  currentStory: Story | null;
  isLoading: boolean;
  error: string | null;
}

// Audio Player Types
export interface AudioPlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
}

// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  requiredStars: number;
  unlockedAt?: Date;
}

// Theme Configuration
export interface ThemeConfig {
  id: ThemeType;
  emoji: string;
  title: string;
  titleTr: string;
  backgroundImage?: string;
  gradientColors: [string, string];
  suggestedWords: string[];
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'castle',
    emoji: '🏰',
    title: 'Castle',
    titleTr: 'Şato',
    gradientColors: ['#7c3aed', '#a78bfa'],
    suggestedWords: ['prenses', 'prens', 'kral', 'şövalye', 'ejderha', 'sihir', 'taç', 'hazine'],
  },
  {
    id: 'space',
    emoji: '🚀',
    title: 'Space',
    titleTr: 'Uzay',
    gradientColors: ['#1e3a8a', '#3b82f6'],
    suggestedWords: ['astronot', 'roket', 'gezegen', 'yıldız', 'ay', 'uzaylı', 'galaksi', 'güneş'],
  },
  {
    id: 'forest',
    emoji: '🌳',
    title: 'Forest',
    titleTr: 'Orman',
    gradientColors: ['#166534', '#22c55e'],
    suggestedWords: ['tavşan', 'sincap', 'kuş', 'ağaç', 'çiçek', 'kelebek', 'mantar', 'geyik'],
  },
  {
    id: 'ocean',
    emoji: '🐠',
    title: 'Ocean',
    titleTr: 'Deniz',
    gradientColors: ['#0369a1', '#38bdf8'],
    suggestedWords: ['balık', 'yunus', 'deniz kızı', 'ahtapot', 'mercan', 'balina', 'kaplumbağa', 'deniz yıldızı'],
  },
  {
    id: 'clouds',
    emoji: '☁️',
    title: 'Clouds',
    titleTr: 'Bulut',
    gradientColors: ['#6366f1', '#a5b4fc'],
    suggestedWords: ['bulut', 'gökkuşağı', 'rüzgar', 'yağmur', 'melek', 'kanat', 'pamuk', 'kuş'],
  },
  {
    id: 'stars',
    emoji: '⭐',
    title: 'Stars',
    titleTr: 'Yıldız',
    gradientColors: ['#7c3aed', '#fbbf24'],
    suggestedWords: ['yıldız', 'ay', 'gece', 'parlak', 'dilek', 'ışık', 'meteor', 'uyku'],
  },
];

// Storyteller Configuration
export interface StorytellerConfig {
  id: StorytellerType;
  emoji: string;
  name: string;
  voiceId?: string; // For TTS integration
  description: string;
}

export const STORYTELLERS: StorytellerConfig[] = [
  { id: 'grandmother', emoji: '👵', name: 'Nine', description: 'Sıcak ve sevgi dolu bir ses' },
  { id: 'grandfather', emoji: '👴', name: 'Dede', description: 'Bilge ve sakin bir ses' },
  { id: 'fairy', emoji: '🧚', name: 'Peri', description: 'Büyülü ve neşeli bir ses' },
  { id: 'robot', emoji: '🤖', name: 'Robot', description: 'Eğlenceli ve komik bir ses' },
  { id: 'unicorn', emoji: '🦄', name: 'Unicorn', description: 'Tatlı ve rüya gibi bir ses' },
  { id: 'bear', emoji: '🐻', name: 'Ayı', description: 'Yumuşak ve rahatlatıcı bir ses' },
  { id: 'owl', emoji: '🦉', name: 'Baykuş', description: 'Gizemli ve akıllı bir ses' },
  { id: 'star', emoji: '🌟', name: 'Yıldız', description: 'Parlak ve ışıltılı bir ses' },
];

// Default Values
export const DEFAULT_USER_SETTINGS: UserSettings = {
  defaultStoryteller: 'grandmother',
  defaultDuration: 3,
  defaultTone: 'calm',
  ambientSoundEnabled: true,
  ambientVolume: 30,
  sleepTimerMinutes: 15,
  parentalPinEnabled: false,
  dailyLimitMinutes: 30,
  nightModeEnabled: true,
};
