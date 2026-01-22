import { useState } from "react";
import { Sparkles, Volume2, CheckCircle, XCircle, Plus } from "lucide-react";
import { StoryConfig, ThemeType, ToneType, StorytellerType } from "../types";
import { ASSETS } from "../lib/assets";

interface CreateStoryProps {
  childName: string;
  onCreateStory: (config: StoryConfig) => void;
}

const themes = [
  { id: "castle", emoji: "🏰", title: "Şato" },
  { id: "space", emoji: "🚀", title: "Uzay" },
  { id: "forest", emoji: "🌳", title: "Orman" },
  { id: "ocean", emoji: "🐠", title: "Deniz" },
  { id: "clouds", emoji: "☁️", title: "Bulut" },
  { id: "stars", emoji: "⭐", title: "Yıldız" },
];

const storytellers = [
  { id: "grandmother", emoji: "👵", name: "Nine" },
  { id: "grandfather", emoji: "👴", name: "Dede" },
  { id: "fairy", emoji: "🧚", name: "Peri" },
  { id: "robot", emoji: "🤖", name: "Robot" },
  { id: "unicorn", emoji: "🦄", name: "Unicorn" },
  { id: "bear", emoji: "🐻", name: "Ayı" },
  { id: "owl", emoji: "🦉", name: "Baykuş" },
  { id: "star", emoji: "🌟", name: "Yıldız" },
];

const themeWords: Record<string, string[]> = {
  castle: ["prenses", "prens", "kral", "şövalye", "ejderha", "sihir", "taç", "hazine"],
  space: ["astronot", "roket", "gezegen", "yıldız", "ay", "uzaylı", "galaksi", "güneş"],
  forest: ["tavşan", "sincap", "kuş", "ağaç", "çiçek", "kelebek", "mantar", "geyik"],
  ocean: ["balık", "yunus", "deniz kızı", "ahtapot", "mercan", "balina", "kaplumbağa", "deniz yıldızı"],
  clouds: ["bulut", "gökkuşağı", "rüzgar", "yağmur", "melek", "kanat", "pamuk", "kuş"],
  stars: ["yıldız", "ay", "gece", "parlak", "dilek", "ışık", "meteor", "uyku"],
};

const excludeWords = [
  "karanlık", "korku", "canavar", "kötü",
  "üzgün", "ağlamak", "kaybolmak", "yalnız",
  "gürültü", "fırtına", "cadı", "tehlike"
];

const defaultIncludeWords = [
  "arkadaş", "sevgi", "eğlence", "gülmek",
  "mutluluk", "cesaret", "paylaşmak", "yardım",
  "keşfetmek", "öğrenmek", "hayal", "macera"
];

export function CreateStory({ childName, onCreateStory }: CreateStoryProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [duration, setDuration] = useState<number>(3);
  const [tone, setTone] = useState<string>("calm");
  const [storyteller, setStoryteller] = useState<string>("grandmother");
  const [includeWords, setIncludeWords] = useState<string[]>(defaultIncludeWords);
  const [selectedExcludeWords, setSelectedExcludeWords] = useState<string[]>([]);
  const [customIncludeWord, setCustomIncludeWord] = useState<string>("");
  const [customExcludeWord, setCustomExcludeWord] = useState<string>("");

  const toggleIncludeWord = (word: string) => {
    setIncludeWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  const toggleExcludeWord = (word: string) => {
    setSelectedExcludeWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  const addCustomIncludeWord = () => {
    if (customIncludeWord.trim() && !includeWords.includes(customIncludeWord.trim())) {
      setIncludeWords([...includeWords, customIncludeWord.trim()]);
      setCustomIncludeWord("");
    }
  };

  const addCustomExcludeWord = () => {
    if (customExcludeWord.trim() && !selectedExcludeWords.includes(customExcludeWord.trim())) {
      setSelectedExcludeWords([...selectedExcludeWords, customExcludeWord.trim()]);
      setCustomExcludeWord("");
    }
  };

  const removeCustomIncludeWord = (word: string) => {
    setIncludeWords(includeWords.filter(w => w !== word));
  };

  const removeCustomExcludeWord = (word: string) => {
    setSelectedExcludeWords(selectedExcludeWords.filter(w => w !== word));
  };

  const handleCreate = () => {
    if (!selectedTheme) return;

    onCreateStory({
      theme: selectedTheme,
      duration,
      tone,
      storyteller,
      includeWords,
      excludeWords: selectedExcludeWords,
    });
  };

  // Get theme-specific words if theme is selected
  const themeSpecificWords = selectedTheme ? (themeWords[selectedTheme] || []) : [];
  // Get custom words (words not in theme-specific list and not in default list)
  const customIncludeWords = includeWords.filter(w => !themeSpecificWords.includes(w) && !defaultIncludeWords.includes(w));

  return (
    <div className="h-full overflow-y-auto pb-44 px-5 pt-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1">Masal Oluştur ✨</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {childName} için özel bir masal
        </p>
      </div>

      {/* Theme Selection */}
      <div
        className="rounded-2xl p-4 mb-5 backdrop-blur-lg border"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <h3 className="text-sm font-semibold mb-3">🎨 Tema Seçin</h3>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200"
              style={{
                background: selectedTheme === theme.id ? "var(--card-bg-hover)" : "var(--card-bg)",
                boxShadow: selectedTheme === theme.id
                  ? "0 0 0 2px var(--purple-light), 0 0 20px var(--purple-glow), 0 4px 16px rgba(157, 78, 221, 0.4)"
                  : "0 2px 8px rgba(0, 0, 0, 0.2)",
                transform: selectedTheme === theme.id ? "scale(1.05)" : "scale(1)",
              }}
            >
              <span className="text-3xl mb-2">{theme.emoji}</span>
              <span className="text-xs font-medium">{theme.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Duration & Tone */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Duration */}
        <div
          className="rounded-2xl p-4 backdrop-blur-lg border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <h3 className="text-sm font-semibold mb-3">⏱️ Süre</h3>
          <div className="flex gap-2">
            {[2, 3, 5].map((min) => (
              <button
                key={min}
                onClick={() => setDuration(min)}
                className="flex-1 py-2 rounded-full text-xs font-medium transition-all"
                style={{
                  background: duration === min ? "linear-gradient(135deg, var(--purple-primary), var(--purple-dark))" : "var(--card-bg)",
                  color: duration === min ? "white" : "var(--text-secondary)",
                  boxShadow: duration === min ? "0 0 15px var(--purple-glow)" : "none",
                }}
              >
                {min}dk
              </button>
            ))}
          </div>
        </div>

        {/* Tone */}
        <div
          className="rounded-2xl p-4 backdrop-blur-lg border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <h3 className="text-sm font-semibold mb-3">🎭 Ton</h3>
          <div className="flex flex-col gap-2">
            {[
              { id: "calm", label: "😌 Sakin" },
              { id: "funny", label: "😄 Komik" },
              { id: "adventure", label: "🚀 Macera" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className="py-1.5 rounded-lg text-[10px] font-medium transition-all"
                style={{
                  background: tone === t.id ? "linear-gradient(135deg, var(--purple-light), var(--purple-primary))" : "transparent",
                  color: tone === t.id ? "white" : "var(--text-secondary)",
                  boxShadow: tone === t.id ? "0 0 12px var(--purple-glow)" : "none",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Storyteller */}
      <div
        className="rounded-2xl p-4 mb-5 backdrop-blur-lg border"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          Kim Okusun?
        </h3>

        <div className="grid grid-cols-4 gap-2">
          {storytellers.map((st) => (
            <button
              key={st.id}
              onClick={() => setStoryteller(st.id)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200"
              style={{
                background: storyteller === st.id ? "var(--card-bg-hover)" : "var(--card-bg)",
                boxShadow: storyteller === st.id
                  ? "0 0 0 2px var(--purple-light), 0 0 18px var(--purple-glow), 0 4px 14px rgba(157, 78, 221, 0.4)"
                  : "0 2px 6px rgba(0, 0, 0, 0.15)",
                transform: storyteller === st.id ? "scale(1.08)" : "scale(1)",
              }}
            >
              <span className="text-2xl mb-1">{st.emoji}</span>
              <span className="text-[10px] font-medium">{st.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Include Words - Always visible */}
      <div
        className="rounded-2xl p-4 mb-5 backdrop-blur-lg border"
        style={{
          background: "linear-gradient(145deg, rgba(16, 185, 129, 0.15), rgba(110, 231, 183, 0.1))",
          borderColor: "rgba(16, 185, 129, 0.4)",
          boxShadow: "0 0 20px var(--green-glow)",
        }}
      >
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--green-light)" }}>
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "var(--green-success)" }}>
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
          Hikayede Olsun
        </h3>

        {/* Default include words */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {defaultIncludeWords.map((word) => (
            <button
              key={word}
              onClick={() => toggleIncludeWord(word)}
              className="py-2.5 px-2 rounded-xl text-xs font-medium transition-all"
              style={{
                background: includeWords.includes(word)
                  ? "linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(110, 231, 183, 0.3))"
                  : "var(--card-bg)",
                color: includeWords.includes(word) ? "var(--green-light)" : "var(--text-secondary)",
                boxShadow: includeWords.includes(word)
                  ? "0 0 0 1.5px var(--green-success), 0 0 12px var(--green-glow)"
                  : "0 1px 4px rgba(0, 0, 0, 0.1)",
                transform: includeWords.includes(word) ? "scale(1.03)" : "scale(1)",
              }}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Theme-specific words */}
        {themeSpecificWords.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-3">
            {themeSpecificWords.map((word) => (
              <button
                key={word}
                onClick={() => toggleIncludeWord(word)}
                className="py-2.5 px-2 rounded-xl text-xs font-medium transition-all"
                style={{
                  background: includeWords.includes(word)
                    ? "linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(110, 231, 183, 0.3))"
                    : "var(--card-bg)",
                  color: includeWords.includes(word) ? "var(--green-light)" : "var(--text-secondary)",
                  boxShadow: includeWords.includes(word)
                    ? "0 0 0 1.5px var(--green-success), 0 0 12px var(--green-glow)"
                    : "0 1px 4px rgba(0, 0, 0, 0.1)",
                  transform: includeWords.includes(word) ? "scale(1.03)" : "scale(1)",
                }}
              >
                {word}
              </button>
            ))}
          </div>
        )}

        {/* Custom words */}
        {customIncludeWords.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-3">
            {customIncludeWords.map((word) => (
              <button
                key={word}
                onClick={() => removeCustomIncludeWord(word)}
                className="py-2.5 px-2 rounded-xl text-xs font-medium transition-all relative"
                style={{
                  background: "rgba(34, 197, 94, 0.3)",
                  color: "var(--green-light)",
                  boxShadow: "0 0 0 1px var(--green-success)",
                }}
              >
                {word}
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px]">×</span>
              </button>
            ))}
          </div>
        )}

        {/* Add custom word input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customIncludeWord}
            onChange={(e) => setCustomIncludeWord(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomIncludeWord()}
            placeholder="Özel kelime ekle..."
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-medium outline-none border"
            style={{
              background: "var(--card-bg)",
              color: "white",
              borderColor: "rgba(34, 197, 94, 0.3)",
            }}
          />
          <button
            onClick={addCustomIncludeWord}
            disabled={!customIncludeWord.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: customIncludeWord.trim() ? "var(--green-success)" : "var(--card-bg)",
              opacity: customIncludeWord.trim() ? 1 : 0.5,
            }}
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Exclude Words */}
      <div
        className="rounded-2xl p-4 mb-5 backdrop-blur-lg border"
        style={{
          background: "linear-gradient(145deg, rgba(157, 78, 221, 0.15), rgba(123, 44, 191, 0.1))",
          borderColor: "rgba(157, 78, 221, 0.4)",
          boxShadow: "0 0 20px var(--purple-glow)",
        }}
      >
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "rgba(167, 139, 250, 0.9)" }}>
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(124, 58, 237, 0.7)" }}>
            <XCircle className="w-3 h-3 text-white" />
          </div>
          Hikayede Olmasın
        </h3>

        {/* Default exclude words */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {excludeWords.map((word) => (
            <button
              key={word}
              onClick={() => toggleExcludeWord(word)}
              className="py-2.5 px-2 rounded-xl text-xs font-medium transition-all"
              style={{
                background: selectedExcludeWords.includes(word)
                  ? "linear-gradient(135deg, rgba(157, 78, 221, 0.4), rgba(123, 44, 191, 0.3))"
                  : "var(--card-bg)",
                color: selectedExcludeWords.includes(word) ? "var(--purple-light)" : "var(--text-secondary)",
                boxShadow: selectedExcludeWords.includes(word)
                  ? "0 0 0 1.5px var(--purple-primary), 0 0 12px var(--purple-glow)"
                  : "0 1px 4px rgba(0, 0, 0, 0.1)",
                transform: selectedExcludeWords.includes(word) ? "scale(1.03)" : "scale(1)",
              }}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Custom exclude words */}
        {selectedExcludeWords.filter(word => !excludeWords.includes(word)).length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-3">
            {selectedExcludeWords.filter(word => !excludeWords.includes(word)).map((word) => (
              <button
                key={word}
                onClick={() => removeCustomExcludeWord(word)}
                className="py-2.5 px-2 rounded-xl text-xs font-medium transition-all relative"
                style={{
                  background: "rgba(124, 58, 237, 0.3)",
                  color: "rgba(167, 139, 250, 0.9)",
                  boxShadow: "0 0 0 1px rgba(124, 58, 237, 0.5)",
                }}
              >
                {word}
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px]" style={{ background: "rgba(124, 58, 237, 0.8)" }}>×</span>
              </button>
            ))}
          </div>
        )}

        {/* Add custom exclude word input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customExcludeWord}
            onChange={(e) => setCustomExcludeWord(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomExcludeWord()}
            placeholder="Özel kelime ekle..."
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-medium outline-none border"
            style={{
              background: "var(--card-bg)",
              color: "white",
              borderColor: "rgba(124, 58, 237, 0.3)",
            }}
          />
          <button
            onClick={addCustomExcludeWord}
            disabled={!customExcludeWord.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: customExcludeWord.trim() ? "rgba(124, 58, 237, 0.7)" : "var(--card-bg)",
              opacity: customExcludeWord.trim() ? 1 : 0.5,
            }}
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Fixed Create Button */}
      <div className="fixed bottom-20 left-0 right-0 px-5 pb-4 pointer-events-none">
        <div className="h-12" style={{
          background: `linear-gradient(to bottom, transparent, var(--bg-end))`
        }} />
        <button
          onClick={handleCreate}
          disabled={!selectedTheme}
          className="w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all pointer-events-auto"
          style={{
            background: selectedTheme
              ? "linear-gradient(135deg, var(--purple-light), var(--purple-primary), var(--purple-dark))"
              : "rgba(157, 78, 221, 0.4)",
            opacity: selectedTheme ? 1 : 0.5,
            cursor: selectedTheme ? "pointer" : "not-allowed",
            boxShadow: selectedTheme ? "0 0 30px var(--purple-glow), 0 4px 20px rgba(157, 78, 221, 0.4)" : "none",
          }}
        >
          <Sparkles className="w-5 h-5" />
          Masalı Oluştur
        </button>
      </div>
    </div>
  );
}