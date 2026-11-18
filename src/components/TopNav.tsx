import { ChevronLeft, Globe } from 'lucide-react';
import { Language, TabId } from '../types/travel';

interface TopNavProps {
  lang: Language;
  onToggleLang: () => void;
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  mobileContextTitle: string;
  canGoBack: boolean;
  onBack: () => void;
  onQuickTools: () => void;
}

export function TopNav({
  lang,
  onToggleLang,
  activeTab,
  onSelectTab,
  mobileContextTitle,
  canGoBack,
  onBack,
  onQuickTools,
}: TopNavProps) {
  const navItems: { id: TabId; ko: string; en: string }[] = [
    { id: 'itinerary', ko: '여정 가이드', en: 'Itinerary' },
    { id: 'transit', ko: '교통 패스', en: 'Transit' },
    { id: 'checklist', ko: '준비물·팁', en: 'Checklist' },
    { id: 'tools', ko: '환율·회화', en: 'Currency' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#F1F5F9]">
      {/* Mobile 56px Top Navigation Bar */}
      <div className="lg:hidden h-14 px-5 flex items-center justify-between gap-2">
        <div className="min-w-[88px] flex items-center">
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              className="min-h-[44px] -ml-2 px-2 inline-flex items-center gap-1 text-[17px] font-semibold text-[#1D3557] active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded-lg whitespace-nowrap shrink-0"
              aria-label={lang === 'ko' ? '이전 화면으로 돌아가기' : 'Go back'}
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.25]" />
              <span>{lang === 'ko' ? '이전' : 'Back'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSelectTab('itinerary')}
              className="min-h-[44px] inline-flex items-center text-[17px] font-extrabold tracking-tight text-[#1D3557] whitespace-nowrap shrink-0"
            >
              Europe First Step
            </button>
          )}
        </div>

        <div className="flex-1 text-center truncate px-1">
          {canGoBack && (
            <span className="text-[16px] font-bold text-[#0b1c30] truncate block">
              {mobileContextTitle}
            </span>
          )}
        </div>

        <div className="min-w-[88px] flex items-center justify-end gap-1">
          {canGoBack ? (
            <button
              type="button"
              onClick={onQuickTools}
              className="min-h-[44px] px-2.5 text-[13px] font-semibold text-[#0284C7] hover:bg-[#E0F2FE]/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'ko' ? '환율' : 'FX'}
            </button>
          ) : (
            <button
              type="button"
              onClick={onToggleLang}
              className="min-h-[44px] px-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1D3557] bg-[#F1F5F9] hover:bg-[#E0F2FE] hover:text-[#0284C7] rounded-full transition-colors whitespace-nowrap shrink-0"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ko' ? 'EN' : '한국어'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Desktop 3-Zone Top Bar Contract */}
      <div className="hidden lg:flex max-w-7xl mx-auto h-16 px-8 items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => {
            if (canGoBack) onBack();
            onSelectTab('itinerary');
          }}
          className="text-lg font-extrabold tracking-tight text-[#1D3557] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded-md px-1"
        >
          Europe First Step
        </button>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav className="flex items-center gap-8" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (canGoBack) onBack();
                  onSelectTab(item.id);
                }}
                className={`relative py-2 text-[15px] font-semibold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded-md ${
                  isActive
                    ? 'text-[#1D3557]'
                    : 'text-[#64748B] hover:text-[#1D3557]'
                }`}
              >
                <span>{lang === 'ko' ? item.ko : item.en}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0284C7] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onToggleLang}
            className="h-10 px-4 inline-flex items-center gap-2 text-[13px] font-semibold text-white bg-[#1D3557] hover:bg-[#031f41] active:scale-[0.98] rounded-full transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'ko' ? 'English' : '한국어'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
