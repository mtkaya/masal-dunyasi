import { useState, useEffect } from "react";
import { BottomNav } from "./components/BottomNav";
import { CreateStory } from "./components/CreateStory";
import { GeneratingStory } from "./components/GeneratingStory";
import { StoryReading } from "./components/StoryReading";
import { StoryLibrary } from "./components/StoryLibrary";
import { Profile } from "./components/Profile";
import { Welcome } from "./components/Welcome";
import { ModeSelector } from "./components/ModeSelector";
import { ParentDashboard } from "./components/ParentDashboard";
import { StoryConfig, Story, UserMode } from "./types";
import { GeneratedStory } from "./services/storyAI";
import { storage, STORAGE_KEYS, generateId } from "./lib/utils";

type AppState = "mode-select" | "welcome" | "create" | "generating" | "reading" | "library" | "profile" | "parent-dashboard";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("create");
  const [appState, setAppState] = useState<AppState>("mode-select");
  const [currentMode, setCurrentMode] = useState<UserMode>(null);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [childName, setChildName] = useState<string>("");
  const [currentConfig, setCurrentConfig] = useState<StoryConfig | null>(null);
  const [stories, setStories] = useState<Story[]>([]);

  // Load saved data on mount
  useEffect(() => {
    const savedName = storage.get<string>(STORAGE_KEYS.CHILD_NAME, "");
    const savedStories = storage.get<Story[]>(STORAGE_KEYS.STORIES, []);
    const savedMode = storage.get<UserMode>("masal_user_mode", null);

    if (savedName) setChildName(savedName);
    if (savedStories.length > 0) setStories(savedStories);
    if (savedMode) {
      setCurrentMode(savedMode);
      if (savedMode === "child" && savedName) {
        setAppState("create");
      } else if (savedMode === "parent") {
        setAppState("parent-dashboard");
      }
    }
  }, []);

  // Handle mode selection
  const handleModeSelect = (mode: UserMode, name?: string) => {
    setCurrentMode(mode);
    storage.set("masal_user_mode", mode);

    if (mode === "child") {
      if (name) {
        setChildName(name);
        storage.set(STORAGE_KEYS.CHILD_NAME, name);
      }
      setAppState("create");
    } else if (mode === "parent") {
      setAppState("parent-dashboard");
    }
  };

  // Switch mode
  const handleSwitchMode = () => {
    setCurrentMode(null);
    storage.set("masal_user_mode", null);
    setAppState("mode-select");
  };

  // Save stories whenever they change
  useEffect(() => {
    if (stories.length > 0) {
      storage.set(STORAGE_KEYS.STORIES, stories);
    }
  }, [stories]);

  const handleWelcomeComplete = (name: string) => {
    setChildName(name);
    storage.set(STORAGE_KEYS.CHILD_NAME, name);
    setAppState("create");
  };

  const handleCreateStory = (config: StoryConfig) => {
    console.log("Creating story with config:", config);
    setCurrentConfig(config);
    setAppState("generating");
  };

  const handleGenerationComplete = (generatedStory: GeneratedStory) => {
    if (!currentConfig) return;

    // Create a full Story object
    const newStory: Story = {
      id: generateId(),
      title: generatedStory.title,
      content: generatedStory.content,
      childName: childName,
      config: currentConfig,
      createdAt: new Date(),
      duration: generatedStory.estimatedDuration,
      isFavorite: false,
      listenCount: 0,
    };

    // Add to stories list
    setStories(prev => [newStory, ...prev]);
    setCurrentStory(newStory);
    setAppState("reading");
  };

  const handleBackFromReading = () => {
    setAppState("create");
    setActiveTab("create");
    setCurrentStory(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    switch (tab) {
      case "create":
      case "home":
        setAppState("create");
        break;
      case "library":
        setAppState("library");
        break;
      case "profile":
        setAppState("profile");
        break;
    }
  };

  const handleCreateNewFromLibrary = () => {
    setAppState("create");
    setActiveTab("create");
  };

  const handleSelectStory = (storyId: string) => {
    const story = stories.find(s => s.id === storyId);
    if (story) {
      // Increment listen count
      setStories(prev => prev.map(s =>
        s.id === storyId ? { ...s, listenCount: s.listenCount + 1 } : s
      ));
      setCurrentStory(story);
      setAppState("reading");
    }
  };

  const handleToggleFavorite = (storyId: string) => {
    setStories(prev => prev.map(s =>
      s.id === storyId ? { ...s, isFavorite: !s.isFavorite } : s
    ));
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto relative">
      {/* Animated Stars Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xl animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-screen">
        {appState === "mode-select" && (
          <ModeSelector onSelectMode={handleModeSelect} />
        )}

        {appState === "welcome" && (
          <Welcome onComplete={handleWelcomeComplete} />
        )}

        {appState === "parent-dashboard" && (
          <ParentDashboard
            stories={stories}
            childName={childName}
            onSwitchMode={handleSwitchMode}
            onSelectStory={handleSelectStory}
            onCreateNew={handleCreateNewFromLibrary}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {appState === "create" && (
          <CreateStory childName={childName} onCreateStory={handleCreateStory} />
        )}

        {appState === "generating" && currentConfig && (
          <GeneratingStory
            childName={childName}
            config={currentConfig}
            onComplete={handleGenerationComplete}
          />
        )}

        {appState === "reading" && currentStory && (
          <StoryReading
            story={currentStory}
            onBack={handleBackFromReading}
            onToggleFavorite={() => handleToggleFavorite(currentStory.id)}
          />
        )}

        {appState === "library" && (
          <StoryLibrary
            stories={stories}
            onCreateNew={handleCreateNewFromLibrary}
            onSelectStory={handleSelectStory}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {appState === "profile" && (
          <Profile
            childName={childName}
            totalStories={stories.length}
            favoriteCount={stories.filter(s => s.isFavorite).length}
          />
        )}
      </div>

      {/* Bottom Navigation - Hidden during mode selection, welcome, reading, generating, and parent dashboard */}
      {appState !== "reading" &&
       appState !== "generating" &&
       appState !== "welcome" &&
       appState !== "mode-select" &&
       appState !== "parent-dashboard" && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}