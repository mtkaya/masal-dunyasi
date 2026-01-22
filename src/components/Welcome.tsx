import { useState } from "react";
import { Sparkles, Moon, Star, Wand2, BookOpen, ChevronRight } from "lucide-react";

interface WelcomeProps {
  onComplete: (childName: string) => void;
}

const tutorialSteps = [
  {
    icon: Moon,
    title: "Masal Dünyasına Hoş Geldin",
    description: "Her gece yeni bir masal macerası seni bekliyor",
    emoji: "🌙",
    gradient: "from-indigo-600 to-purple-600"
  },
  {
    icon: Wand2,
    title: "AI İle Kişiselleştirilmiş Masallar",
    description: "İstediğin temayı seç, özel kelimeler ekle, senin için masal oluşturalım",
    emoji: "✨",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    icon: BookOpen,
    title: "Sesli Anlatım ve Rahatlatıcı Sesler",
    description: "Nine, dede, peri veya robot! Kim anlatsın istersin?",
    emoji: "🎭",
    gradient: "from-pink-600 to-rose-600"
  },
  {
    icon: Star,
    title: "Tatlı Rüyalar",
    description: "Hadi başlayalım! İlk masalını oluşturmaya hazır mısın?",
    emoji: "⭐",
    gradient: "from-purple-600 to-indigo-600"
  },
];

export function Welcome({ onComplete }: WelcomeProps) {
  const [step, setStep] = useState<number>(0);
  const [childName, setChildName] = useState<string>("");
  const [showNameInput, setShowNameInput] = useState<boolean>(false);

  const currentStep = tutorialSteps[step];

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      setShowNameInput(true);
    }
  };

  const handleSkip = () => {
    setShowNameInput(true);
  };

  const handleComplete = () => {
    if (childName.trim()) {
      onComplete(childName.trim());
    }
  };

  // Name input screen
  if (showNameInput) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Floating stars animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
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

        {/* Content */}
        <div className="relative z-10 w-full max-w-sm">
          {/* Main icon */}
          <div className="text-center mb-8">
            <div
              className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 backdrop-blur-lg border-2 animate-pulse-soft"
              style={{
                background: "rgba(139, 92, 246, 0.2)",
                borderColor: "rgba(139, 92, 246, 0.3)",
              }}
            >
              <span className="text-5xl">🌙</span>
            </div>
            <h1 className="text-3xl font-bold mb-3">Seni Tanıyalım</h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Masallarda senin adın geçsin
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
            <label className="block text-sm font-medium mb-3">İsmin nedir?</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleComplete()}
              placeholder="Örn: Ayşe, Mehmet..."
              autoFocus
              className="w-full py-4 px-5 rounded-2xl text-base font-medium outline-none border-2 transition-all"
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                color: "white",
                borderColor: childName ? "var(--purple-primary)" : "rgba(139, 92, 246, 0.3)",
              }}
            />
          </div>

          {/* Start button */}
          <button
            onClick={handleComplete}
            disabled={!childName.trim()}
            className="w-full h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
            style={{
              background: childName.trim()
                ? "linear-gradient(to right, var(--purple-primary), var(--purple-dark))"
                : "rgba(139, 92, 246, 0.3)",
              opacity: childName.trim() ? 1 : 0.5,
              cursor: childName.trim() ? "pointer" : "not-allowed",
              transform: childName.trim() ? "scale(1)" : "scale(0.98)",
            }}
          >
            <Sparkles className="w-6 h-6" />
            Hadi Başlayalım!
          </button>
        </div>
      </div>
    );
  }

  // Tutorial steps
  return (
    <div className="h-screen w-full flex flex-col items-center justify-between px-6 py-12 relative overflow-hidden">
      {/* Galaxy background animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Rotating stars */}
        {[...Array(30)].map((_, i) => {
          const angle = (i / 30) * 360;
          const radius = 30 + (i % 3) * 20;
          return (
            <div
              key={`rotate-${i}`}
              className="absolute animate-orbit"
              style={{
                left: "50%",
                top: "50%",
                width: `${radius * 2}%`,
                height: `${radius * 2}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${20 + i * 2}s`,
              }}
            >
              <div
                className="absolute text-lg animate-twinkle"
                style={{
                  left: "50%",
                  top: "0",
                  transform: `rotate(${angle}deg) translateY(-50%)`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              >
                ✨
              </div>
            </div>
          );
        })}

        {/* Floating stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`float-${i}`}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              fontSize: `${10 + Math.random() * 16}px`,
              opacity: 0.4,
            }}
          >
            {i % 4 === 0 ? "⭐" : i % 4 === 1 ? "🌟" : i % 4 === 2 ? "💫" : "✨"}
          </div>
        ))}
      </div>

      {/* Skip button */}
      <div className="w-full flex justify-end relative z-10">
        <button
          onClick={handleSkip}
          className="text-sm font-medium px-4 py-2 rounded-full transition-all"
          style={{
            color: "var(--text-secondary)",
            background: "rgba(139, 92, 246, 0.1)",
          }}
        >
          Geç
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-sm">
        {/* Icon with gradient background */}
        <div
          className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 backdrop-blur-lg border-2 animate-pulse-soft bg-gradient-to-br ${currentStep.gradient}`}
          style={{
            borderColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3)",
          }}
        >
          <span className="text-6xl">{currentStep.emoji}</span>
        </div>

        {/* Title and description */}
        <h1 className="text-2xl font-bold text-center mb-4 px-4">
          {currentStep.title}
        </h1>
        <p
          className="text-center text-base px-6 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {currentStep.description}
        </p>
      </div>

      {/* Bottom section */}
      <div className="w-full relative z-10">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {tutorialSteps.map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: step === i ? "32px" : "8px",
                background:
                  step === i
                    ? "var(--purple-primary)"
                    : "rgba(139, 92, 246, 0.3)",
              }}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="w-full h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
          style={{
            background:
              "linear-gradient(to right, var(--purple-primary), var(--purple-dark))",
            boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
          }}
        >
          {step === tutorialSteps.length - 1 ? "İlk Masalımı Oluştur" : "Devam Et"}
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
