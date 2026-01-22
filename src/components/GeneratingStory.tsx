import { useEffect, useState, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { ASSETS } from "../lib/assets";
import { generateStory, GeneratedStory } from "../services/storyAI";
import { StoryConfig } from "../types";

interface GeneratingStoryProps {
  childName: string;
  config: StoryConfig;
  onComplete: (story: GeneratedStory) => void;
}

const funFacts = [
  "Biliyor muydun? Masallar hayal gücünü geliştirir! 🌟",
  "Masallar çocukların daha iyi uyumasına yardımcı olur 💤",
  "Her masal, çocuğunuza özel olarak hazırlanıyor ✨",
  "Masal dinlemek kelime dağarcığını zenginleştirir 📚",
  "İyi masallar güzel rüyalar getirir 🌙",
  "Masallar empati ve duygusal zeka geliştirir 💜",
  "Uyku öncesi masal ritüeli, güven duygusu oluşturur 🤗",
];

const loadingMessages = [
  "Karakterler sahneye çıkıyor...",
  "Büyülü dünya kuruluyor...",
  "Yıldızlar hikayeye ışık tutuyor...",
  "Masal perisi kalem salıyor...",
  "Son dokunuşlar yapılıyor...",
];

export function GeneratingStory({ childName, config, onComplete }: GeneratingStoryProps) {
  const [fact, setFact] = useState(funFacts[0]);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  const generateStoryAsync = useCallback(async () => {
    try {
      const story = await generateStory({
        childName,
        config,
        useAI: false, // Set to true when API key is configured
      });

      // Wait for animation to complete
      setTimeout(() => {
        onComplete(story);
      }, 500);
    } catch (error) {
      console.error("Story generation failed:", error);
      // Fallback to mock story
      const fallbackStory: GeneratedStory = {
        title: `${childName}'in Büyülü Masalı`,
        content: `Bir varmış bir yokmuş...\n\nMasal yüklenirken bir hata oluştu. Lütfen tekrar deneyin.`,
        estimatedDuration: 180,
      };
      onComplete(fallbackStory);
    }
  }, [childName, config, onComplete]);

  useEffect(() => {
    // Start story generation
    generateStoryAsync();

    // Rotate facts
    const factInterval = setInterval(() => {
      setFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    }, 3000);

    // Rotate loading messages
    const messageInterval = setInterval(() => {
      setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 2000);

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 15;
      });
    }, 500);

    return () => {
      clearInterval(factInterval);
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, [generateStoryAsync]);

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {i % 3 === 0 ? "✨" : i % 3 === 1 ? "⭐" : "🌟"}
          </div>
        ))}
      </div>

      {/* Luna Character Animation */}
      <div className="relative mb-8 animate-float">
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl" style={{
          boxShadow: "0 0 60px rgba(139, 92, 246, 0.5)",
        }}>
          <img
            src={ASSETS.lunaCharacter}
            alt="Luna"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to emoji if image fails
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<span class="text-8xl">📖</span>';
            }}
          />
        </div>
        <Sparkles
          className="absolute -top-2 -right-2 w-8 h-8 animate-pulse"
          style={{ color: "var(--gold-accent)" }}
        />
        <div className="absolute -bottom-2 -left-2 text-3xl animate-bounce">
          ✨
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="text-2xl font-bold mb-2 text-center">
        Masalınız Hazırlanıyor{dots}
      </h2>
      <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
        {loadingMessage}
      </p>
      <p className="text-xs mb-8" style={{ color: "var(--purple-light)" }}>
        {childName} için özel bir masal oluşturuluyor
      </p>

      {/* Progress Indicator */}
      <div className="w-full max-w-xs mb-8">
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: "rgba(255, 255, 255, 0.2)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              background: "linear-gradient(to right, var(--purple-primary), var(--gold-accent))",
              width: `${Math.min(progress, 100)}%`,
            }}
          />
        </div>
        <p className="text-xs text-center mt-2" style={{ color: "var(--text-secondary)" }}>
          {Math.floor(Math.min(progress, 100))}%
        </p>
      </div>

      {/* Fun Fact Card */}
      <div
        className="rounded-2xl p-5 backdrop-blur-lg border max-w-sm text-center transition-all duration-500"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {fact}
        </p>
      </div>

      {/* Theme indicator */}
      <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full" style={{
        background: "rgba(139, 92, 246, 0.2)",
      }}>
        <span className="text-lg">{getThemeEmoji(config.theme)}</span>
        <span className="text-xs font-medium" style={{ color: "var(--purple-light)" }}>
          {getThemeName(config.theme)} Teması
        </span>
      </div>
    </div>
  );
}

// Helper functions
function getThemeEmoji(theme: string): string {
  const emojis: Record<string, string> = {
    castle: "🏰",
    space: "🚀",
    forest: "🌳",
    ocean: "🐠",
    clouds: "☁️",
    stars: "⭐",
  };
  return emojis[theme] || "✨";
}

function getThemeName(theme: string): string {
  const names: Record<string, string> = {
    castle: "Şato",
    space: "Uzay",
    forest: "Orman",
    ocean: "Deniz",
    clouds: "Bulut",
    stars: "Yıldız",
  };
  return names[theme] || "Masal";
}
