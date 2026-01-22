import { useState } from "react";
import { Heart, Sparkles, Clock, Calendar, Trash2 } from "lucide-react";
import { Story } from "../types";
import { formatRelativeTime } from "../lib/utils";
import { ASSETS } from "../lib/assets";

interface StoryLibraryProps {
  stories: Story[];
  onCreateNew: () => void;
  onSelectStory: (storyId: string) => void;
  onToggleFavorite: (storyId: string) => void;
}

export function StoryLibrary({ stories, onCreateNew, onSelectStory, onToggleFavorite }: StoryLibraryProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "favorites">("all");

  const filteredStories = activeFilter === "favorites"
    ? stories.filter(s => s.isFavorite)
    : stories;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins}dk`;
  };

  const getThemeEmoji = (theme: string): string => {
    const emojis: Record<string, string> = {
      castle: "🏰",
      space: "🚀",
      forest: "🌳",
      ocean: "🐠",
      clouds: "☁️",
      stars: "⭐",
    };
    return emojis[theme] || "✨";
  };

  const getThemeName = (theme: string): string => {
    const names: Record<string, string> = {
      castle: "Şato",
      space: "Uzay",
      forest: "Orman",
      ocean: "Deniz",
      clouds: "Bulut",
      stars: "Yıldız",
    };
    return names[theme] || "Masal";
  };

  return (
    <div className="h-full flex flex-col px-5 pt-6 pb-20">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl overflow-hidden">
            <img
              src={ASSETS.logo}
              alt="Masal Kütüphanesi"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Masal Kütüphanesi</h1>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {stories.length} masal kaydedildi
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: activeFilter === "all" ? "var(--purple-primary)" : "var(--card-bg)",
              color: activeFilter === "all" ? "white" : "var(--text-secondary)",
            }}
          >
            Tümü ({stories.length})
          </button>
          <button
            onClick={() => setActiveFilter("favorites")}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1"
            style={{
              background: activeFilter === "favorites" ? "var(--purple-primary)" : "var(--card-bg)",
              color: activeFilter === "favorites" ? "white" : "var(--text-secondary)",
            }}
          >
            <Heart className="w-4 h-4" fill={activeFilter === "favorites" ? "white" : "none"} />
            Favoriler ({stories.filter(s => s.isFavorite).length})
          </button>
        </div>
      </div>

      {/* Stories List */}
      {filteredStories.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
          <div className="w-24 h-24 mb-6 rounded-full overflow-hidden" style={{
            background: "linear-gradient(135deg, var(--purple-primary), var(--purple-light))",
          }}>
            <img
              src={ASSETS.lunaCharacter}
              alt="Luna"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.parentElement!.innerHTML = '<span class="text-6xl">📚</span>';
              }}
            />
          </div>
          <h3 className="text-xl font-bold mb-2">
            {activeFilter === "favorites" ? "Henüz favori yok" : "Henüz masal yok"}
          </h3>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            {activeFilter === "favorites"
              ? "Beğendiğiniz masalları favorilere ekleyin"
              : "İlk masalınızı oluşturarak başlayın!"
            }
          </p>
          {activeFilter === "all" && (
            <button
              onClick={onCreateNew}
              className="px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95"
              style={{
                background: "linear-gradient(to right, var(--purple-primary), var(--purple-dark))",
                boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
              }}
            >
              <Sparkles className="w-5 h-5" />
              İlk Masalı Oluştur
            </button>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto -mx-5 px-5 space-y-3">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="rounded-2xl backdrop-blur-lg border overflow-hidden transition-all active:scale-98"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border-color)",
              }}
            >
              <button
                onClick={() => onSelectStory(story.id)}
                className="w-full p-4 flex items-center gap-4 text-left"
              >
                {/* Theme Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, var(--purple-primary), var(--purple-light))",
                  }}
                >
                  <span className="text-3xl">{getThemeEmoji(story.config?.theme || 'stars')}</span>
                </div>

                {/* Story Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold mb-1 truncate">{story.title}</h3>
                  <div className="flex items-center gap-2 text-xs mb-1" style={{ color: "var(--text-secondary)" }}>
                    <span>{story.childName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatRelativeTime(story.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(139, 92, 246, 0.2)",
                        color: "var(--purple-light)",
                      }}
                    >
                      {getThemeName(story.config?.theme || 'stars')}
                    </span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <Clock className="w-2.5 h-2.5" />
                      {formatDuration(story.duration)}
                    </span>
                    {story.listenCount > 0 && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(34, 197, 94, 0.2)",
                          color: "var(--green-light)",
                        }}
                      >
                        {story.listenCount}x dinlendi
                      </span>
                    )}
                  </div>
                </div>

                {/* Favorite Button */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(story.id);
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    style={{ background: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <Heart
                      className="w-4 h-4 transition-all"
                      fill={story.isFavorite ? "var(--red-danger)" : "none"}
                      style={{ color: story.isFavorite ? "var(--red-danger)" : "var(--text-secondary)" }}
                    />
                  </button>
                </div>
              </button>
            </div>
          ))}

          {/* Create New Button at bottom */}
          <button
            onClick={onCreateNew}
            className="w-full p-4 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 font-medium transition-all active:scale-98"
            style={{
              borderColor: "rgba(139, 92, 246, 0.3)",
              color: "var(--purple-light)",
            }}
          >
            <Sparkles className="w-5 h-5" />
            Yeni Masal Oluştur
          </button>
        </div>
      )}
    </div>
  );
}
