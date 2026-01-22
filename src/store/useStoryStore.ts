// ==========================================
// STORY STORE - Zustand-like State Management
// ==========================================

import { useState, useCallback, useEffect } from 'react';
import { Story, StoryConfig, AppScreen } from '../types';
import { generateId, storage, STORAGE_KEYS } from '../lib/utils';

// Simple store implementation using React hooks
export interface StoryState {
    stories: Story[];
    currentStory: Story | null;
    isGenerating: boolean;
    error: string | null;
}

export interface StoryActions {
    addStory: (story: Omit<Story, 'id' | 'createdAt' | 'listenCount'>) => Story;
    updateStory: (id: string, updates: Partial<Story>) => void;
    deleteStory: (id: string) => void;
    toggleFavorite: (id: string) => void;
    setCurrentStory: (story: Story | null) => void;
    incrementListenCount: (id: string) => void;
    getStoryById: (id: string) => Story | undefined;
    getFavoriteStories: () => Story[];
    getRecentStories: (limit?: number) => Story[];
}

// Load stories from localStorage
function loadStories(): Story[] {
    return storage.get<Story[]>(STORAGE_KEYS.STORIES, []);
}

// Save stories to localStorage
function saveStories(stories: Story[]): void {
    storage.set(STORAGE_KEYS.STORIES, stories);
}

// Custom hook for story management
export function useStoryStore(): StoryState & StoryActions {
    const [stories, setStories] = useState<Story[]>(() => loadStories());
    const [currentStory, setCurrentStory] = useState<Story | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Persist stories to localStorage whenever they change
    useEffect(() => {
        saveStories(stories);
    }, [stories]);

    const addStory = useCallback((storyData: Omit<Story, 'id' | 'createdAt' | 'listenCount'>): Story => {
        const newStory: Story = {
            ...storyData,
            id: generateId(),
            createdAt: new Date(),
            listenCount: 0,
        };
        setStories(prev => [newStory, ...prev]);
        return newStory;
    }, []);

    const updateStory = useCallback((id: string, updates: Partial<Story>) => {
        setStories(prev => prev.map(story =>
            story.id === id ? { ...story, ...updates } : story
        ));
    }, []);

    const deleteStory = useCallback((id: string) => {
        setStories(prev => prev.filter(story => story.id !== id));
    }, []);

    const toggleFavorite = useCallback((id: string) => {
        setStories(prev => prev.map(story =>
            story.id === id ? { ...story, isFavorite: !story.isFavorite } : story
        ));
    }, []);

    const incrementListenCount = useCallback((id: string) => {
        setStories(prev => prev.map(story =>
            story.id === id ? { ...story, listenCount: story.listenCount + 1 } : story
        ));
    }, []);

    const getStoryById = useCallback((id: string): Story | undefined => {
        return stories.find(story => story.id === id);
    }, [stories]);

    const getFavoriteStories = useCallback((): Story[] => {
        return stories.filter(story => story.isFavorite);
    }, [stories]);

    const getRecentStories = useCallback((limit: number = 10): Story[] => {
        return stories
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, limit);
    }, [stories]);

    return {
        // State
        stories,
        currentStory,
        isGenerating,
        error,
        // Actions
        addStory,
        updateStory,
        deleteStory,
        toggleFavorite,
        setCurrentStory,
        incrementListenCount,
        getStoryById,
        getFavoriteStories,
        getRecentStories,
    };
}

// ==========================================
// APP STATE STORE
// ==========================================

export interface AppState {
    screen: AppScreen;
    childName: string;
    isOnboardingComplete: boolean;
}

export interface AppActions {
    setScreen: (screen: AppScreen) => void;
    setChildName: (name: string) => void;
    completeOnboarding: () => void;
    reset: () => void;
}

export function useAppStore(): AppState & AppActions {
    const [screen, setScreen] = useState<AppScreen>(() => {
        const isComplete = storage.get<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE, false);
        return isComplete ? 'create' : 'welcome';
    });

    const [childName, setChildNameState] = useState<string>(() => {
        return storage.get<string>(STORAGE_KEYS.CHILD_NAME, '');
    });

    const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(() => {
        return storage.get<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE, false);
    });

    const setChildName = useCallback((name: string) => {
        setChildNameState(name);
        storage.set(STORAGE_KEYS.CHILD_NAME, name);
    }, []);

    const completeOnboarding = useCallback(() => {
        setIsOnboardingComplete(true);
        storage.set(STORAGE_KEYS.ONBOARDING_COMPLETE, true);
        setScreen('create');
    }, []);

    const reset = useCallback(() => {
        setScreen('welcome');
        setChildNameState('');
        setIsOnboardingComplete(false);
        storage.remove(STORAGE_KEYS.CHILD_NAME);
        storage.remove(STORAGE_KEYS.ONBOARDING_COMPLETE);
        storage.remove(STORAGE_KEYS.STORIES);
    }, []);

    return {
        screen,
        childName,
        isOnboardingComplete,
        setScreen,
        setChildName,
        completeOnboarding,
        reset,
    };
}
