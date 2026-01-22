import { Home, Library, Sparkles, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Ana Sayfa" },
    { id: "library", icon: Library, label: "Kütüphane" },
    { id: "create", icon: Sparkles, label: "Oluştur" },
    { id: "profile", icon: User, label: "Profil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <div
        className="h-16 backdrop-blur-lg border-t flex items-center justify-around px-4"
        style={{
          background: "rgba(22, 33, 62, 0.8)",
          borderTopColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-1 py-2 px-3 transition-all duration-200"
              style={{
                color: isActive ? "#8b5cf6" : "rgba(255, 255, 255, 0.5)",
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
