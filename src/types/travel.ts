export type Language = 'ko' | 'en';

export type TabId = 'itinerary' | 'transit' | 'checklist' | 'tools';

export type CountryFilter = 'all' | 'france' | 'switzerland';

export interface LocalizedText {
  ko: string;
  en: string;
}

export interface StepDetail {
  boardingTitle: LocalizedText;
  platformHint: LocalizedText;
  ticketRule: LocalizedText;
  luggageTip: LocalizedText;
  walkingMinutes: number;
  estimatedCost: string;
  actionChecklist: LocalizedText[];
}

export interface ItineraryStep {
  id: string;
  time: string;
  transitCode: string;
  country: 'france' | 'switzerland';
  title: LocalizedText;
  subtitle: LocalizedText;
  routeSummary: LocalizedText;
  tipAlert?: LocalizedText;
  detail: StepDetail;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  shortLabel: LocalizedText;
  contextTitle: LocalizedText;
  country: 'france' | 'switzerland';
  city: LocalizedText;
  heroImage: string;
  heroCaption: LocalizedText;
  weatherSummary: string;
  steps: ItineraryStep[];
}

export interface TransitGuide {
  id: string;
  code: string;
  country: 'france' | 'switzerland';
  title: LocalizedText;
  route: LocalizedText;
  duration: string;
  frequency: LocalizedText;
  image: string;
  validationWarning: LocalizedText;
  boardingSteps: LocalizedText[];
  stationTip: LocalizedText;
}

export type ChecklistCategory = 'documents' | 'electronics' | 'alpine' | 'payments';

export interface ChecklistItem {
  id: string;
  category: ChecklistCategory;
  title: LocalizedText;
  note: LocalizedText;
  isCustom?: boolean;
}

export interface TravelTipCard {
  id: string;
  category: ChecklistCategory;
  title: LocalizedText;
  summary: LocalizedText;
  highlightValue: LocalizedText;
}

export interface PhraseItem {
  id: string;
  country: 'france' | 'switzerland';
  situation: LocalizedText;
  localText: string;
  phoneticKo: string;
  meaning: LocalizedText;
  speechLang: string;
}
