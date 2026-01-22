import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Heart,
  Music,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Moon,
  Timer
} from "lucide-react";
import { Story } from "../types";
import { ASSETS } from "../lib/assets";
import { formatDuration } from "../lib/utils";

interface StoryReadingProps {
  story: Story;
  onBack: () => void;
  onToggleFavorite: () => void;
}

export function StoryReading({ story, onBack, onToggleFavorite }: StoryReadingProps) {
  const [isFavorite, setIsFavorite] = useState(story.isFavorite);
  const [ambientOn, setAmbientOn] = useState(false);
  const [muted, setMuted] = useState(false);
  const [ambientVolume, setAmbientVolume] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(story.duration || 225);
  const [isLoading, setIsLoading] = useState(false);
  const [sleepTimerActive, setSleepTimerActive] = useState(false);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState(15);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sleepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite();
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsPlaying(true);
      }, 800);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  // Sleep timer effect
  useEffect(() => {
    if (sleepTimerActive) {
      sleepTimerRef.current = setTimeout(() => {
        setIsPlaying(false);
        setSleepTimerActive(false);
        // Could add fade-out effect here
      }, sleepTimerMinutes * 60 * 1000);
    }

    return () => {
      if (sleepTimerRef.current) {
        clearTimeout(sleepTimerRef.current);
      }
    };
  }, [sleepTimerActive, sleepTimerMinutes]);

  const skipBackward = () => {
    setCurrentTime((prev) => Math.max(0, prev - 10));
  };

  const skipForward = () => {
    setCurrentTime((prev) => Math.min(duration, prev + 10));
  };

  const toggleSleepTimer = () => {
    setSleepTimerActive(!sleepTimerActive);
  };

  // Get theme emoji
  const themeEmoji = getThemeEmoji(story.config?.theme || 'stars');

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-6 pt-6 pb-4 backdrop-blur-lg"
        style={{
          background: "linear-gradient(to bottom, var(--bg-start), transparent)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95"
            style={{ background: "var(--card-bg)" }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAmbientOn(!ambientOn)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: ambientOn ? "var(--purple-primary)" : "var(--card-bg)",
                color: ambientOn ? "white" : "var(--text-secondary)",
              }}
            >
              <Music className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMuted(!muted)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{ background: "var(--card-bg)" }}
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              onClick={handleToggleFavorite}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{ background: "var(--card-bg)" }}
            >
              <Heart
                className="w-5 h-5 transition-all"
                fill={isFavorite ? "var(--red-danger)" : "none"}
                style={{ color: isFavorite ? "var(--red-danger)" : "white" }}
              />
            </button>
          </div>
        </div>

        <div className="text-center">
          <span className="text-3xl mb-2">{themeEmoji}</span>
          <h2 className="text-xl font-bold">{story.title}</h2>
          <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
            {story.childName} için • {Math.ceil(story.duration / 60)} dk
          </p>
        </div>
      </div>

      {/* Story Content with Book Frame Background */}
      <div className="flex-1 overflow-y-auto px-6 pb-96 relative">
        {/* Optional book frame background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url(${ASSETS.bookFrame})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
          }}
        />

        <div
          className="rounded-3xl p-6 backdrop-blur-lg border relative"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {story.content}
          </p>
        </div>
      </div>

      {/* Ambient Volume Slider */}
      {ambientOn && (
        <div className="fixed bottom-80 left-6 right-6 z-20">
          <div
            className="rounded-full p-4 backdrop-blur-lg border flex items-center gap-3"
            style={{
              background: "rgba(139, 92, 246, 0.2)",
              borderColor: "rgba(139, 92, 246, 0.3)",
            }}
          >
            <Music className="w-4 h-4 flex-shrink-0" style={{ color: "var(--purple-light)" }} />
            <input
              type="range"
              min="0"
              max="100"
              value={ambientVolume}
              onChange={(e) => setAmbientVolume(Number(e.target.value))}
              className="flex-1"
              style={{
                accentColor: "var(--purple-primary)",
              }}
            />
            <span className="text-sm font-medium w-10 text-right" style={{ color: "var(--purple-light)" }}>
              {ambientVolume}%
            </span>
          </div>
        </div>
      )}

      {/* Audio Player */}
      <div
        className="fixed bottom-0 left-0 right-0 z-10 px-6 pb-6"
        style={{
          background: "linear-gradient(to top, var(--bg-end) 80%, transparent)",
        }}
      >
        <div
          className="rounded-3xl p-6 backdrop-blur-lg border"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            borderColor: "var(--border-color)",
          }}
        >
          {/* Progress Bar */}
          <div className="mb-4">
            <div
              className="h-1.5 rounded-full overflow-hidden mb-2 cursor-pointer"
              style={{ background: "rgba(255, 255, 255, 0.2)" }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = x / rect.width;
                setCurrentTime(Math.floor(duration * percentage));
              }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  background: "linear-gradient(to right, var(--purple-primary), var(--purple-light))",
                  width: `${(currentTime / duration) * 100}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs" style={{ color: "var(--text-secondary)" }}>
              <span>{formatDuration(currentTime)}</span>
              <span>{formatDuration(duration)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <button
              onClick={skipBackward}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all active:scale-95"
              style={{ background: "var(--card-bg)" }}
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95"
              style={{
                background: "linear-gradient(135deg, var(--purple-primary), var(--purple-dark))",
                boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
              }}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-7 h-7 text-white" />
              ) : (
                <Play className="w-7 h-7 text-white ml-1" />
              )}
            </button>

            <button
              onClick={skipForward}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all active:scale-95"
              style={{ background: "var(--card-bg)" }}
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Sleep Mode Button */}
          <button
            onClick={toggleSleepTimer}
            className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all active:scale-98"
            style={{
              background: sleepTimerActive ? "rgba(139, 92, 246, 0.3)" : "var(--card-bg)",
              color: sleepTimerActive ? "var(--purple-light)" : "var(--text-secondary)",
              boxShadow: sleepTimerActive ? "0 0 0 1px var(--purple-primary)" : "none",
            }}
          >
            {sleepTimerActive ? (
              <>
                <Timer className="w-4 h-4" />
                Uyku Modu Aktif ({sleepTimerMinutes} dk)
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                Uyku Moduna Geç
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function
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
