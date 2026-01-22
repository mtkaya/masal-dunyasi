// Theme types for story backgrounds
export type ThemeType = "castle" | "space" | "forest" | "ocean" | "clouds" | "stars";

// Tone types for story mood
export type ToneType = "adventurous" | "calm" | "funny" | "educational" | "dreamy";

// Storyteller voice types
export type StorytellerType = "grandmother" | "grandfather" | "fairy" | "robot" | "friendly";

// User mode types
export type UserMode = "parent" | "child" | null;

// Story configuration
export interface StoryConfig {
  theme: ThemeType;
  duration: number; // in minutes
  tone: ToneType;
  storyteller: StorytellerType;
  includeWords?: string[];
  excludeWords?: string[];
}

// Story object
export interface Story {
  id: string;
  title: string;
  content: string;
  childName: string;
  duration: number; // in seconds
  isFavorite: boolean;
  config: StoryConfig;
  createdAt: Date;
  listenCount: number;
}

// Generated story from AI
export interface GeneratedStory {
  title: string;
  content: string;
  estimatedDuration: number;
}

// User profile
export interface UserProfile {
  childName: string;
  mode: UserMode;
  parentPin?: string;
  createdAt: Date;
  totalStoriesCreated: number;
  totalListeningTime: number;
}

// App state
export interface AppState {
  currentMode: UserMode;
  isFirstLaunch: boolean;
  currentChildName: string;
  stories: Story[];
  profile: UserProfile | null;
}

// Parent settings
export interface ParentSettings {
  maxDailyStories: number;
  allowedThemes: ThemeType[];
  sleepTimerDefault: number;
  contentFilters: string[];
  ambientSoundsEnabled: boolean;
}

// Theme definitions
export interface Theme {
  id: ThemeType;
  emoji: string;
  titleTr: string;
  descriptionTr: string;
  color: string;
}

export const THEMES: Theme[] = [
  { id: "castle", emoji: "🏰", titleTr: "Şato", descriptionTr: "Prensesler ve şövalyeler", color: "#9b5de5" },
  { id: "space", emoji: "🚀", titleTr: "Uzay", descriptionTr: "Yıldızlar ve gezegenler", color: "#00bbf9" },
  { id: "forest", emoji: "🌳", titleTr: "Orman", descriptionTr: "Hayvanlar ve doğa", color: "#00f5d4" },
  { id: "ocean", emoji: "🐠", titleTr: "Deniz", descriptionTr: "Balıklar ve dalgalar", color: "#00b4d8" },
  { id: "clouds", emoji: "☁️", titleTr: "Bulutlar", descriptionTr: "Gökyüzü macerası", color: "#90e0ef" },
  { id: "stars", emoji: "⭐", titleTr: "Yıldızlar", descriptionTr: "Gece gökyüzü", color: "#ffd60a" },
];

// Storyteller definitions
export interface Storyteller {
  id: StorytellerType;
  emoji: string;
  name: string;
  descriptionTr: string;
}

export const STORYTELLERS: Storyteller[] = [
  { id: "grandmother", emoji: "👵", name: "Nine", descriptionTr: "Sıcak ve sevecen" },
  { id: "grandfather", emoji: "👴", name: "Dede", descriptionTr: "Bilge ve sakin" },
  { id: "fairy", emoji: "🧚", name: "Peri", descriptionTr: "Büyülü ve eğlenceli" },
  { id: "robot", emoji: "🤖", name: "Robot", descriptionTr: "Eğitici ve meraklı" },
  { id: "friendly", emoji: "🦉", name: "Baykuş", descriptionTr: "Akıllı ve nazik" },
];

// Tone definitions
export interface Tone {
  id: ToneType;
  emoji: string;
  name: string;
  descriptionTr: string;
}

export const TONES: Tone[] = [
  { id: "calm", emoji: "😌", name: "Sakin", descriptionTr: "Rahatlatıcı ve huzurlu" },
  { id: "adventurous", emoji: "🎯", name: "Macera", descriptionTr: "Heyecanlı ama nazik" },
  { id: "funny", emoji: "😄", name: "Eğlenceli", descriptionTr: "Komik ve neşeli" },
  { id: "educational", emoji: "📚", name: "Eğitici", descriptionTr: "Öğretici hikayeler" },
  { id: "dreamy", emoji: "💭", name: "Hayalperest", descriptionTr: "Hayal gücü dolu" },
];
