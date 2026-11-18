/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { ChecklistView } from './components/ChecklistView';
import { CompanionSidebar } from './components/CompanionSidebar';
import { ItineraryView } from './components/ItineraryView';
import { TopNav } from './components/TopNav';
import { ToolsView } from './components/ToolsView';
import { TransitView } from './components/TransitView';
import {
  INITIAL_CHECKLIST,
  ITINERARY_DAYS,
  PHRASES,
  TRANSIT_GUIDES,
  TRAVEL_TIPS,
} from './data/travelData';
import {
  ChecklistCategory,
  ChecklistItem,
  CountryFilter,
  ItineraryStep,
  Language,
  TabId,
} from './types/travel';

const STORAGE_KEY = 'europe_first_step_state_v1';

interface PersistedState {
  lang: Language;
  completedStepIds: string[];
  checkedChecklistIds: string[];
  customChecklistItems: ChecklistItem[];
  eurRate: number;
  chfRate: number;
}

function loadInitialState(): PersistedState {
  const defaults: PersistedState = {
    lang: 'ko',
    completedStepIds: [],
    checkedChecklistIds: ['chk-1', 'chk-8'],
    customChecklistItems: [],
    eurRate: 1490,
    chfRate: 1595,
  };

  if (typeof window === 'undefined') return defaults;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      lang: parsed.lang === 'en' ? 'en' : 'ko',
      completedStepIds: Array.isArray(parsed.completedStepIds)
        ? parsed.completedStepIds
        : defaults.completedStepIds,
      checkedChecklistIds: Array.isArray(parsed.checkedChecklistIds)
        ? parsed.checkedChecklistIds
        : defaults.checkedChecklistIds,
      customChecklistItems: Array.isArray(parsed.customChecklistItems)
        ? parsed.customChecklistItems
        : defaults.customChecklistItems,
      eurRate: typeof parsed.eurRate === 'number' ? parsed.eurRate : defaults.eurRate,
      chfRate: typeof parsed.chfRate === 'number' ? parsed.chfRate : defaults.chfRate,
    };
  } catch {
    return defaults;
  }
}

export default function App() {
  const initial = loadInitialState();

  const [lang, setLang] = useState<Language>(initial.lang);
  const [activeTab, setActiveTab] = useState<TabId>('itinerary');
  const [selectedDayId, setSelectedDayId] = useState<string>(ITINERARY_DAYS[0].id);
  const [countryFilter, setCountryFilter] = useState<CountryFilter>('all');
  const [selectedStep, setSelectedStep] = useState<ItineraryStep | null>(null);

  const [completedStepIds, setCompletedStepIds] = useState<string[]>(
    initial.completedStepIds
  );
  const [checkedChecklistIds, setCheckedChecklistIds] = useState<string[]>(
    initial.checkedChecklistIds
  );
  const [customChecklistItems, setCustomChecklistItems] = useState<ChecklistItem[]>(
    initial.customChecklistItems
  );
  const [eurRate, setEurRate] = useState<number>(initial.eurRate);
  const [chfRate, setChfRate] = useState<number>(initial.chfRate);

  useEffect(() => {
    try {
      const payload: PersistedState = {
        lang,
        completedStepIds,
        checkedChecklistIds,
        customChecklistItems,
        eurRate,
        chfRate,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors
    }
  }, [
    lang,
    completedStepIds,
    checkedChecklistIds,
    customChecklistItems,
    eurRate,
    chfRate,
  ]);

  const allChecklistItems = [...INITIAL_CHECKLIST, ...customChecklistItems];

  const handleToggleStepComplete = (stepId: string) => {
    setCompletedStepIds((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const handleToggleChecklist = (id: string) => {
    setCheckedChecklistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCustomChecklistItem = (
    title: string,
    category: ChecklistCategory
  ) => {
    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category,
      title: { ko: title, en: title },
      note: {
        ko: '직접 추가한 준비물',
        en: 'Custom packing item',
      },
      isCustom: true,
    };
    setCustomChecklistItems((prev) => [...prev, newItem]);
  };

  const handleDeleteCustomChecklistItem = (id: string) => {
    setCustomChecklistItems((prev) => prev.filter((item) => item.id !== id));
    setCheckedChecklistIds((prev) => prev.filter((item) => item !== id));
  };

  const handleJumpToStep = (dayId: string, step: ItineraryStep) => {
    setActiveTab('itinerary');
    setCountryFilter('all');
    setSelectedDayId(dayId);
    setSelectedStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeDay =
    ITINERARY_DAYS.find((d) => d.id === selectedDayId) || ITINERARY_DAYS[0];

  const mobileContextTitle = selectedStep
    ? activeDay.contextTitle[lang]
    : activeTab === 'itinerary'
    ? activeDay.contextTitle[lang]
    : activeTab === 'transit'
    ? lang === 'ko'
      ? '교통 패스 가이드'
      : 'Transit Guide'
    : activeTab === 'checklist'
    ? lang === 'ko'
      ? '준비물 체크리스트'
      : 'Checklist'
    : lang === 'ko'
    ? '환율 · 회화'
    : 'Currency & Phrases';

  const isInStepDrillDown = activeTab === 'itinerary' && selectedStep !== null;

  return (
    <div className="min-h-screen bg-white text-[#0b1c30] flex flex-col">
      <TopNav
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'ko' ? 'en' : 'ko'))}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'itinerary') {
            setSelectedStep(null);
          }
        }}
        mobileContextTitle={mobileContextTitle}
        canGoBack={isInStepDrillDown}
        onBack={() => setSelectedStep(null)}
        onQuickTools={() => {
          setSelectedStep(null);
          setActiveTab('tools');
        }}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-6 pb-24 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            {activeTab === 'itinerary' && (
              <ItineraryView
                lang={lang}
                days={ITINERARY_DAYS}
                selectedDayId={selectedDayId}
                onSelectDay={(id) => {
                  setSelectedDayId(id);
                  setSelectedStep(null);
                }}
                countryFilter={countryFilter}
                onSelectCountryFilter={setCountryFilter}
                completedStepIds={completedStepIds}
                onToggleStepComplete={handleToggleStepComplete}
                selectedStep={selectedStep}
                onOpenStep={(step) => {
                  setSelectedStep(step);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onCloseStep={() => setSelectedStep(null)}
              />
            )}

            {activeTab === 'transit' && (
              <TransitView lang={lang} guides={TRANSIT_GUIDES} />
            )}

            {activeTab === 'checklist' && (
              <ChecklistView
                lang={lang}
                items={allChecklistItems}
                checkedIds={checkedChecklistIds}
                onToggleCheck={handleToggleChecklist}
                onAddCustomItem={handleAddCustomChecklistItem}
                onDeleteCustomItem={handleDeleteCustomChecklistItem}
                tips={TRAVEL_TIPS}
              />
            )}

            {activeTab === 'tools' && (
              <ToolsView
                lang={lang}
                phrases={PHRASES}
                eurRate={eurRate}
                chfRate={chfRate}
                onUpdateRates={(eur, chf) => {
                  setEurRate(eur);
                  setChfRate(chf);
                }}
              />
            )}
          </div>

          <CompanionSidebar
            lang={lang}
            days={ITINERARY_DAYS}
            completedStepIds={completedStepIds}
            checklistProgress={{
              done: allChecklistItems.filter((i) =>
                checkedChecklistIds.includes(i.id)
              ).length,
              total: allChecklistItems.length,
            }}
            eurRate={eurRate}
            chfRate={chfRate}
            onJumpToStep={handleJumpToStep}
            onSelectTab={(tab) => {
              setSelectedStep(null);
              setActiveTab(tab);
            }}
          />
        </div>
      </main>

      {/* Hide BottomNav during Step Drill-Down so Mobile Sticky Action Tray takes focus cleanly */}
      {!isInStepDrillDown && (
        <BottomNav
          lang={lang}
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setSelectedStep(null);
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
}
