import { Calculator, CheckSquare, Compass, TrainFront } from 'lucide-react';
import { Language, TabId } from '../types/travel';

interface BottomNavProps {
  lang: Language;
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

export function BottomNav({ lang, activeTab, onSelectTab }: BottomNavProps) {
  const tabs: {
    id: TabId;
    ko: string;
    en: string;
    icon: typeof Compass;
  }[] = [
    { id: 'itinerary', ko: '여정', en: 'Trip', icon: Compass },
    { id: 'transit', ko: '교통', en: 'Transit', icon: TrainFront },
    { id: 'checklist', ko: '준비물', en: 'Checklist', icon: CheckSquare },
    { id: 'tools', ko: '도구', en: 'Tools', icon: Calculator },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F1F5F9] elevated-ambient"
    >
      <div className="grid grid-cols-4 h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
                isActive ? 'text-[#0284C7]' : 'text-[#64748B] hover:text-[#1D3557]'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.4 : 1.85} />
              <span className="text-[11px] font-semibold tracking-tight whitespace-nowrap">
                {lang === 'ko' ? tab.ko : tab.en}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
