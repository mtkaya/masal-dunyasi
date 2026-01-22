import { useState } from "react";
import { UserMode } from "../types";
import { Baby, Users, Sparkles, Moon, Star, Heart, Shield } from "lucide-react";

interface ModeSelectorProps {
  onSelectMode: (mode: UserMode, childName?: string) => void;
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<UserMode>(null);
  const [childName, setChildName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);

  const handleModeSelect = (mode: UserMode) => {
    setSelectedMode(mode);
    if (mode === "child") {
      setShowNameInput(true);
    } else {
      // Parent mode - directly enter
      onSelectMode(mode);
    }
  };

  const handleChildStart = () => {
    if (childName.trim()) {
      onSelectMode("child", childName.trim());
    }
  };

  // Name input screen for child mode
  if (showNameInput) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Floating stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                fontSize: `${8 + Math.random() * 12}px`,
                opacity: 0.6,
              }}
            >
              {i % 3 === 0 ? "⭐" : i % 3 === 1 ? "✨" : "🌟"}
            </div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-sm">
          {/* Character */}
          <div className="text-center mb-8">
            <div
              className="w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-6 animate-bounce"
              style={{
                background: "linear-gradient(135deg, var(--purple-primary), var(--purple-light))",
                boxShadow: "0 8px 32px rgba(139, 92, 246, 0.4)",
              }}
            >
              <span className="text-6xl">🌙</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Merhaba Minik Kahraman!</h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Seni masal dünyasına davet ediyorum
            </p>
          </div>

          {/* Name input */}
          <div
            className="rounded-3xl p-6 backdrop-blur-lg border mb-6"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--border-color)",
            }}
          >
            <label className="block text-lg font-bold mb-4 text-center">
              <span className="text-2xl mr-2">👋</span>
              İsmin ne?
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleChildStart()}
              placeholder="Adını yaz..."
              autoFocus
              className="w-full py-4 px-5 rounded-2xl text-lg font-medium outline-none border-2 transition-all text-center"
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                color: "white",
                borderColor: childName ? "var(--purple-primary)" : "rgba(139, 92, 246, 0.3)",
              }}
            />
          </div>

          {/* Start button */}
          <button
            onClick={handleChildStart}
            disabled={!childName.trim()}
            className="w-full h-16 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all active:scale-95"
            style={{
              background: childName.trim()
                ? "linear-gradient(to right, var(--purple-primary), var(--purple-dark))"
                : "rgba(139, 92, 246, 0.3)",
              opacity: childName.trim() ? 1 : 0.5,
              cursor: childName.trim() ? "pointer" : "not-allowed",
              boxShadow: childName.trim() ? "0 8px 24px rgba(139, 92, 246, 0.4)" : "none",
            }}
          >
            <Sparkles className="w-6 h-6" />
            Masal Zamanı!
          </button>

          {/* Back button */}
          <button
            onClick={() => setShowNameInput(false)}
            className="w-full mt-4 py-3 text-sm font-medium transition-all"
            style={{ color: "var(--text-secondary)" }}
          >
            ← Geri Dön
          </button>
        </div>
      </div>
    );
  }

  // Main mode selection screen
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              fontSize: `${6 + Math.random() * 14}px`,
              opacity: 0.5,
            }}
          >
            {i % 4 === 0 ? "⭐" : i % 4 === 1 ? "✨" : i % 4 === 2 ? "🌟" : "💫"}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6"
            style={{
              background: "linear-gradient(135deg, var(--purple-primary), var(--gold-accent))",
              boxShadow: "0 8px 32px rgba(139, 92, 246, 0.4)",
            }}
          >
            <span className="text-5xl">📖</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Masal Dünyası</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Kim olarak devam etmek istersin?
          </p>
        </div>

        {/* Mode Cards */}
        <div className="space-y-4">
          {/* Child Mode */}
          <button
            onClick={() => handleModeSelect("child")}
            className="w-full rounded-3xl p-6 backdrop-blur-lg border transition-all active:scale-98 text-left group"
            style={{
              background: "var(--card-bg)",
              borderColor: "rgba(139, 92, 246, 0.3)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #ec4899)",
                }}
              >
                <span className="text-3xl">👶</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                  Ben Bir Çocuğum
                  <Star className="w-4 h-4" style={{ color: "var(--gold-accent)" }} />
                </h3>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Renkli butonlar, eğlenceli arayüz, kolay kullanım
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["Büyük Butonlar", "Renkli Temalar", "Eğlenceli"].map((feature) => (
                <span
                  key={feature}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(168, 85, 247, 0.2)",
                    color: "var(--purple-light)",
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </button>

          {/* Parent Mode */}
          <button
            onClick={() => handleModeSelect("parent")}
            className="w-full rounded-3xl p-6 backdrop-blur-lg border transition-all active:scale-98 text-left group"
            style={{
              background: "var(--card-bg)",
              borderColor: "rgba(59, 130, 246, 0.3)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                }}
              >
                <span className="text-3xl">👨‍👩‍👧</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                  Ben Bir Ebeveyniyim
                  <Shield className="w-4 h-4" style={{ color: "#3b82f6" }} />
                </h3>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Ayarlar, çocuk profilleri, içerik kontrolü
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["Ayarlar", "Profil Yönetimi", "İstatistikler"].map((feature) => (
                <span
                  key={feature}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(59, 130, 246, 0.2)",
                    color: "#60a5fa",
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </button>
        </div>

        {/* Bottom text */}
        <p
          className="text-center text-xs mt-8"
          style={{ color: "var(--text-secondary)" }}
        >
          <Moon className="w-4 h-4 inline mr-1" />
          Her iki modda da masal dinleyebilirsiniz
          <Heart className="w-4 h-4 inline ml-1" style={{ color: "var(--red-danger)" }} />
        </p>
      </div>
    </div>
  );
}
