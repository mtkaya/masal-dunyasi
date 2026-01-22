import { Settings, Crown, Mail, ChevronRight, LogOut, Star, BookOpen, Clock, Heart } from "lucide-react";
import { ASSETS } from "../lib/assets";

interface ProfileProps {
  childName: string;
  totalStories?: number;
  favoriteCount?: number;
}

export function Profile({ childName, totalStories = 0, favoriteCount = 0 }: ProfileProps) {
  // Calculate stars (gamification)
  const starsEarned = totalStories * 5; // 5 stars per story

  return (
    <div className="h-full overflow-y-auto px-5 pt-6 pb-20">
      {/* Header with Luna */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden" style={{
          boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
        }}>
          <img
            src={ASSETS.lunaCharacter}
            alt="Profil"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<span class="text-5xl">🌙</span>';
            }}
          />
        </div>
        <h1 className="text-2xl font-bold mb-1">Merhaba, {childName}!</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Masal dünyasına hoş geldin
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div
          className="rounded-2xl p-4 text-center backdrop-blur-lg border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <BookOpen className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--purple-light)" }} />
          <p className="text-2xl font-bold">{totalStories}</p>
          <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>Masal</p>
        </div>
        <div
          className="rounded-2xl p-4 text-center backdrop-blur-lg border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <Heart className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--red-danger)" }} />
          <p className="text-2xl font-bold">{favoriteCount}</p>
          <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>Favori</p>
        </div>
        <div
          className="rounded-2xl p-4 text-center backdrop-blur-lg border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <Star className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--gold-accent)" }} />
          <p className="text-2xl font-bold">{starsEarned}</p>
          <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>Yıldız</p>
        </div>
      </div>

      {/* Star Progress */}
      <div
        className="rounded-2xl p-4 backdrop-blur-lg border mb-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(251, 191, 36, 0.2))",
          borderColor: "rgba(251, 191, 36, 0.3)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" style={{ color: "var(--gold-accent)" }} />
            <span className="font-bold text-sm">Yıldız Toplama</span>
          </div>
          <span className="text-xs" style={{ color: "var(--gold-accent)" }}>
            {starsEarned} / 50 ⭐
          </span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255, 255, 255, 0.2)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              background: "linear-gradient(to right, var(--gold-accent), #fcd34d)",
              width: `${Math.min((starsEarned / 50) * 100, 100)}%`,
            }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>
          {50 - starsEarned > 0 ? `${50 - starsEarned} yıldız daha topla, sürpriz hediye kazan!` : "🎉 Tebrikler! Hediyeni kazandın!"}
        </p>
      </div>

      {/* Premium Card */}
      <div
        className="rounded-2xl p-6 backdrop-blur-lg border mb-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(251, 191, 36, 0.2))",
          borderColor: "var(--gold-accent)",
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-5 h-5" style={{ color: "var(--gold-accent)" }} />
              <h3 className="font-bold">Premium</h3>
            </div>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Sınırsız masal oluşturun
            </p>
          </div>
          <ChevronRight className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
        </div>
        <ul className="text-xs space-y-1 mb-4" style={{ color: "var(--text-secondary)" }}>
          <li>✨ Sınırsız AI hikaye üretimi</li>
          <li>🎭 Özel hikayeci sesleri</li>
          <li>🎨 Görsel illüstrasyonlar</li>
          <li>☁️ Bulut yedekleme</li>
        </ul>
        <button
          className="w-full py-2.5 rounded-xl font-bold text-sm transition-all active:scale-98"
          style={{
            background: "linear-gradient(to right, var(--purple-primary), var(--gold-accent))",
          }}
        >
          Premium'a Geçin - ₺49.99/ay
        </button>
      </div>

      {/* Children Section */}
      <div
        className="rounded-2xl p-4 backdrop-blur-lg border mb-6"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <h3 className="text-sm font-semibold mb-3">Çocuklar</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: "var(--purple-primary)" }}
            >
              {childName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{childName}</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>4 yaş • {totalStories} masal</p>
            </div>
            <ChevronRight className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
          </div>

          <button
            className="w-full py-3 rounded-xl border-2 border-dashed text-sm font-medium transition-all active:scale-98"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)",
            }}
          >
            + Çocuk Ekle
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div
        className="rounded-2xl p-4 backdrop-blur-lg border mb-6"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <h3 className="text-sm font-semibold mb-3">Tercihler</h3>
        <div className="space-y-2">
          {[
            { label: "Varsayılan Anlatıcı", value: "Nine 👵" },
            { label: "Varsayılan Süre", value: "3 dakika" },
            { label: "Ses Motoru", value: "Türkçe TTS" },
            { label: "Ebeveyn Kontrolü", value: "Kapalı 🔓" },
          ].map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center justify-between p-3 rounded-xl transition-all active:scale-98"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <span className="text-sm">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {item.value}
                </span>
                <ChevronRight className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* App Info */}
      <div
        className="rounded-2xl p-4 backdrop-blur-lg border mb-6"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <h3 className="text-sm font-semibold mb-3">Uygulama</h3>
        <div className="space-y-2">
          {[
            "Gizlilik Politikası",
            "Kullanım Şartları",
            "Destek & İletişim",
            "Değerlendir ⭐",
          ].map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center justify-between p-3 rounded-xl transition-all active:scale-98"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <span className="text-sm">{item}</span>
              <ChevronRight className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
            </button>
          ))}
        </div>
      </div>

      {/* Version */}
      <p className="text-center text-xs mb-4" style={{ color: "var(--text-muted)" }}>
        Masal Dünyası v1.0.0 🌙
      </p>

      {/* Logout */}
      <button
        className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all active:scale-98"
        style={{
          background: "rgba(239, 68, 68, 0.1)",
          color: "#fca5a5",
        }}
      >
        <LogOut className="w-4 h-4" />
        Çıkış Yap
      </button>
    </div>
  );
}
