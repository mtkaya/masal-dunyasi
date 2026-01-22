import { useState } from "react";
import {
  Settings,
  BookOpen,
  Heart,
  Clock,
  Users,
  BarChart3,
  ChevronRight,
  Moon,
  Shield,
  Sparkles,
  LogOut,
  Plus,
} from "lucide-react";
import { Story } from "../types";
import { formatRelativeTime } from "../lib/utils";

interface ParentDashboardProps {
  stories: Story[];
  childName: string;
  onSwitchMode: () => void;
  onSelectStory: (storyId: string) => void;
  onCreateNew: () => void;
  onToggleFavorite: (storyId: string) => void;
}

export function ParentDashboard({
  stories,
  childName,
  onSwitchMode,
  onSelectStory,
  onCreateNew,
  onToggleFavorite,
}: ParentDashboardProps) {
  const [activeSection, setActiveSection] = useState<"overview" | "stories" | "settings">("overview");

  // Calculate statistics
  const totalStories = stories.length;
  const favoriteCount = stories.filter((s) => s.isFavorite).length;
  const totalListeningTime = stories.reduce((acc, s) => acc + s.listenCount * s.duration, 0);
  const totalMinutes = Math.floor(totalListeningTime / 60);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div
        className="px-6 pt-6 pb-4"
        style={{
          background: "linear-gradient(to bottom, rgba(59, 130, 246, 0.2), transparent)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              }}
            >
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Ebeveyn Paneli</h1>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {childName ? `${childName}'in Masalları` : "Masal Yönetimi"}
              </p>
            </div>
          </div>

          <button
            onClick={onSwitchMode}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{ background: "var(--card-bg)" }}
            title="Mod Değiştir"
          >
            <LogOut className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2">
          {[
            { id: "overview", label: "Özet", icon: BarChart3 },
            { id: "stories", label: "Masallar", icon: BookOpen },
            { id: "settings", label: "Ayarlar", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as typeof activeSection)}
              className="flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
              style={{
                background: activeSection === tab.id ? "#3b82f6" : "var(--card-bg)",
                color: activeSection === tab.id ? "white" : "var(--text-secondary)",
              }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {activeSection === "overview" && (
          <OverviewSection
            totalStories={totalStories}
            favoriteCount={favoriteCount}
            totalMinutes={totalMinutes}
            recentStories={stories.slice(0, 3)}
            onSelectStory={onSelectStory}
            onCreateNew={onCreateNew}
          />
        )}

        {activeSection === "stories" && (
          <StoriesSection
            stories={stories}
            onSelectStory={onSelectStory}
            onToggleFavorite={onToggleFavorite}
            onCreateNew={onCreateNew}
          />
        )}

        {activeSection === "settings" && <SettingsSection childName={childName} />}
      </div>
    </div>
  );
}

// Overview Section
function OverviewSection({
  totalStories,
  favoriteCount,
  totalMinutes,
  recentStories,
  onSelectStory,
  onCreateNew,
}: {
  totalStories: number;
  favoriteCount: number;
  totalMinutes: number;
  recentStories: Story[];
  onSelectStory: (id: string) => void;
  onCreateNew: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div
          className="rounded-2xl p-4 text-center"
          style={{ background: "rgba(139, 92, 246, 0.2)" }}
        >
          <BookOpen className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--purple-light)" }} />
          <p className="text-2xl font-bold">{totalStories}</p>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Toplam Masal
          </p>
        </div>

        <div
          className="rounded-2xl p-4 text-center"
          style={{ background: "rgba(239, 68, 68, 0.2)" }}
        >
          <Heart className="w-6 h-6 mx-auto mb-2" style={{ color: "#f87171" }} />
          <p className="text-2xl font-bold">{favoriteCount}</p>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Favori
          </p>
        </div>

        <div
          className="rounded-2xl p-4 text-center"
          style={{ background: "rgba(34, 197, 94, 0.2)" }}
        >
          <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: "#4ade80" }} />
          <p className="text-2xl font-bold">{totalMinutes}</p>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Dakika
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        className="rounded-2xl p-4 backdrop-blur-lg border"
        style={{ background: "var(--card-bg)", borderColor: "var(--border-color)" }}
      >
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: "var(--gold-accent)" }} />
          Hızlı İşlemler
        </h3>
        <button
          onClick={onCreateNew}
          className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all active:scale-98"
          style={{
            background: "linear-gradient(to right, var(--purple-primary), var(--purple-dark))",
          }}
        >
          <Plus className="w-5 h-5" />
          Yeni Masal Oluştur
        </button>
      </div>

      {/* Recent Stories */}
      <div>
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Moon className="w-4 h-4" style={{ color: "var(--purple-light)" }} />
          Son Masallar
        </h3>

        {recentStories.length === 0 ? (
          <div
            className="rounded-2xl p-6 text-center backdrop-blur-lg border"
            style={{ background: "var(--card-bg)", borderColor: "var(--border-color)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Henüz masal oluşturulmadı
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentStories.map((story) => (
              <button
                key={story.id}
                onClick={() => onSelectStory(story.id)}
                className="w-full rounded-xl p-3 backdrop-blur-lg border flex items-center gap-3 text-left transition-all active:scale-98"
                style={{ background: "var(--card-bg)", borderColor: "var(--border-color)" }}
              >
                <span className="text-2xl">{getThemeEmoji(story.config?.theme || "stars")}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{story.title}</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {formatRelativeTime(story.createdAt)}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Stories Section
function StoriesSection({
  stories,
  onSelectStory,
  onToggleFavorite,
  onCreateNew,
}: {
  stories: Story[];
  onSelectStory: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onCreateNew: () => void;
}) {
  const [filter, setFilter] = useState<"all" | "favorites">("all");

  const filteredStories = filter === "favorites" ? stories.filter((s) => s.isFavorite) : stories;

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all"
          style={{
            background: filter === "all" ? "#3b82f6" : "var(--card-bg)",
            color: filter === "all" ? "white" : "var(--text-secondary)",
          }}
        >
          Tümü ({stories.length})
        </button>
        <button
          onClick={() => setFilter("favorites")}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1"
          style={{
            background: filter === "favorites" ? "#3b82f6" : "var(--card-bg)",
            color: filter === "favorites" ? "white" : "var(--text-secondary)",
          }}
        >
          <Heart className="w-4 h-4" />
          Favoriler ({stories.filter((s) => s.isFavorite).length})
        </button>
      </div>

      {/* Stories List */}
      {filteredStories.length === 0 ? (
        <div
          className="rounded-2xl p-8 text-center backdrop-blur-lg border"
          style={{ background: "var(--card-bg)", borderColor: "var(--border-color)" }}
        >
          <p className="text-4xl mb-3">📚</p>
          <p className="font-medium mb-4">
            {filter === "favorites" ? "Henüz favori yok" : "Henüz masal yok"}
          </p>
          {filter === "all" && (
            <button
              onClick={onCreateNew}
              className="px-4 py-2 rounded-xl text-sm font-medium"
              style={{ background: "#3b82f6" }}
            >
              İlk Masalı Oluştur
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="rounded-xl backdrop-blur-lg border overflow-hidden"
              style={{ background: "var(--card-bg)", borderColor: "var(--border-color)" }}
            >
              <button
                onClick={() => onSelectStory(story.id)}
                className="w-full p-4 flex items-center gap-3 text-left"
              >
                <span className="text-3xl">{getThemeEmoji(story.config?.theme || "stars")}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{story.title}</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {story.childName} • {Math.ceil(story.duration / 60)} dk •{" "}
                    {story.listenCount}x dinlendi
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(story.id);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255, 255, 255, 0.1)" }}
                >
                  <Heart
                    className="w-4 h-4"
                    fill={story.isFavorite ? "#f87171" : "none"}
                    style={{ color: story.isFavorite ? "#f87171" : "var(--text-secondary)" }}
                  />
                </button>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Button */}
      <button
        onClick={onCreateNew}
        className="w-full py-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 font-medium transition-all active:scale-98"
        style={{
          borderColor: "rgba(59, 130, 246, 0.3)",
          color: "#60a5fa",
        }}
      >
        <Plus className="w-5 h-5" />
        Yeni Masal Oluştur
      </button>
    </div>
  );
}

// Settings Section
function SettingsSection({ childName }: { childName: string }) {
  return (
    <div className="space-y-4">
      {/* Child Profile */}
      <div
        className="rounded-2xl p-4 backdrop-blur-lg border"
        style={{ background: "var(--card-bg)", borderColor: "var(--border-color)" }}
      >
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Çocuk Profili
        </h3>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(139, 92, 246, 0.2)" }}
          >
            <span className="text-2xl">👶</span>
          </div>
          <div>
            <p className="font-medium">{childName || "İsim girilmedi"}</p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Aktif profil
            </p>
          </div>
        </div>
      </div>

      {/* Content Settings */}
      <div
        className="rounded-2xl p-4 backdrop-blur-lg border"
        style={{ background: "var(--card-bg)", borderColor: "var(--border-color)" }}
      >
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          İçerik Ayarları
        </h3>
        <div className="space-y-3">
          <SettingRow label="Günlük masal limiti" value="5 masal" />
          <SettingRow label="Varsayılan süre" value="5 dakika" />
          <SettingRow label="Uyku zamanlayıcı" value="15 dakika" />
        </div>
      </div>

      {/* App Settings */}
      <div
        className="rounded-2xl p-4 backdrop-blur-lg border"
        style={{ background: "var(--card-bg)", borderColor: "var(--border-color)" }}
      >
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Uygulama Ayarları
        </h3>
        <div className="space-y-3">
          <SettingRow label="Uygulama versiyonu" value="1.0.0" />
          <SettingRow label="Tema" value="Koyu" />
        </div>
      </div>

      {/* Info */}
      <p className="text-center text-xs" style={{ color: "var(--text-secondary)" }}>
        Masal Dünyası v1.0.0 • Made with 💜
      </p>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

// Helper
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
