import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Footprints,
  Luggage,
  MapPin,
  Ticket,
} from 'lucide-react';
import {
  CountryFilter,
  ItineraryDay,
  ItineraryStep,
  Language,
} from '../types/travel';
import { ResilientImage } from './ResilientImage';

interface ItineraryViewProps {
  lang: Language;
  days: ItineraryDay[];
  selectedDayId: string;
  onSelectDay: (dayId: string) => void;
  countryFilter: CountryFilter;
  onSelectCountryFilter: (filter: CountryFilter) => void;
  completedStepIds: string[];
  onToggleStepComplete: (stepId: string) => void;
  selectedStep: ItineraryStep | null;
  onOpenStep: (step: ItineraryStep) => void;
  onCloseStep: () => void;
}

export function ItineraryView({
  lang,
  days,
  selectedDayId,
  onSelectDay,
  countryFilter,
  onSelectCountryFilter,
  completedStepIds,
  onToggleStepComplete,
  selectedStep,
  onOpenStep,
  onCloseStep,
}: ItineraryViewProps) {
  const filteredDays = days.filter((d) =>
    countryFilter === 'all' ? true : d.country === countryFilter
  );

  const activeDay =
    filteredDays.find((d) => d.id === selectedDayId) ||
    filteredDays[0] ||
    days[0];

  // Step Drill-Down View
  if (selectedStep) {
    const isCompleted = completedStepIds.includes(selectedStep.id);

    return (
      <div className="pb-28 lg:pb-10 space-y-6">
        {/* Desktop Back Header */}
        <div className="hidden lg:flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
          <button
            type="button"
            onClick={onCloseStep}
            className="min-h-[44px] px-3 -ml-3 inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#1D3557] hover:bg-[#F1F5F9] rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>{lang === 'ko' ? '이전' : 'Back'}</span>
          </button>
          <span className="text-[14px] font-semibold text-[#64748B]">
            {activeDay.contextTitle[lang]} · {selectedStep.time}
          </span>
        </div>

        {/* Route Summary Header Card */}
        <section className="bg-[#F8FAFC] border border-slate-200/80 rounded-[20px] p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-semibold bg-[#E0F2FE] text-[#0284C7] border border-[#38BDF8]/60">
              {selectedStep.transitCode}
            </span>
            <span className="text-[13px] font-semibold text-[#64748B] tabular-nums">
              {selectedStep.time} · {selectedStep.detail.estimatedCost}
            </span>
          </div>

          <h1 className="text-[22px] leading-[30px] font-bold text-[#0b1c30] text-balance">
            {selectedStep.title[lang]}
          </h1>
          <p className="text-[15px] leading-[22px] text-[#44474e]">
            {selectedStep.routeSummary[lang]}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-[13px] text-[#64748B] tabular-nums">
            <span className="inline-flex items-center gap-1.5">
              <Footprints className="w-4 h-4 text-[#0284C7]" />
              {lang === 'ko'
                ? `도보 약 ${selectedStep.detail.walkingMinutes}분`
                : `~${selectedStep.detail.walkingMinutes} min walk`}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0284C7]" />
              {lang === 'ko' ? '출발 20분 전 역 도착 권장' : 'Arrive 20 min prior'}
            </span>
          </div>
        </section>

        {/* Detailed Wayfinding Cards */}
        <section className="space-y-4">
          <h2 className="text-[19px] leading-[26px] font-semibold text-[#1D3557]">
            {selectedStep.detail.boardingTitle[lang]}
          </h2>

          <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[15px] font-semibold text-[#1D3557]">
                  {lang === 'ko' ? '플랫폼 & 탑승 위치' : 'Platform & Boarding'}
                </h3>
                <p className="text-[15px] leading-[23px] text-[#44474e]">
                  {selectedStep.detail.platformHint[lang]}
                </p>
              </div>
            </div>

            <div className="border-t border-[#F1F5F9] pt-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                <Ticket className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[15px] font-semibold text-[#1D3557]">
                  {lang === 'ko' ? '티켓 & 패스 확인' : 'Tickets & Validation'}
                </h3>
                <p className="text-[15px] leading-[23px] text-[#44474e]">
                  {selectedStep.detail.ticketRule[lang]}
                </p>
              </div>
            </div>

            <div className="border-t border-[#F1F5F9] pt-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] text-[#1D3557] flex items-center justify-center shrink-0 mt-0.5">
                <Luggage className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[15px] font-semibold text-[#1D3557]">
                  {lang === 'ko' ? '수하물 & 안전 팁' : 'Luggage & Safety'}
                </h3>
                <p className="text-[15px] leading-[23px] text-[#44474e]">
                  {selectedStep.detail.luggageTip[lang]}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Steps Before Boarding */}
        <section className="bg-[#F8FAFC] border border-slate-200/80 rounded-[20px] p-5 space-y-3">
          <h3 className="text-[16px] font-semibold text-[#1D3557]">
            {lang === 'ko' ? '이동 전 확인 순서' : 'Pre-Boarding Steps'}
          </h3>
          <ul className="space-y-2.5">
            {selectedStep.detail.actionChecklist.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-[15px] leading-[22px] text-[#0b1c30]"
              >
                <span className="w-6 h-6 rounded-full bg-white border border-[#E2E8F0] text-[12px] font-bold text-[#1D3557] flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                  {idx + 1}
                </span>
                <span>{item[lang]}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Desktop Inline Primary CTA */}
        <div className="hidden lg:flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onToggleStepComplete(selectedStep.id)}
            className={`h-14 px-8 rounded-full text-[15px] font-semibold inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
              isCompleted
                ? 'bg-[#E0F2FE] text-[#0284C7] border border-[#38BDF8]'
                : 'bg-[#1D3557] text-white hover:bg-[#031f41]'
            }`}
          >
            <Check className="w-5 h-5" />
            <span>
              {isCompleted
                ? lang === 'ko'
                  ? '완료된 구간입니다 (해제하기)'
                  : 'Completed (Tap to Undo)'
                : lang === 'ko'
                ? '이 구간 완료 표시하기'
                : 'Mark Step Completed'}
            </span>
          </button>
        </div>

        {/* Mobile Sticky Action Tray with Upward White Scrim */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-5 pb-5 pt-8 bg-gradient-to-t from-white via-white to-transparent">
          <button
            type="button"
            onClick={() => {
              onToggleStepComplete(selectedStep.id);
              onCloseStep();
            }}
            className={`w-full h-14 rounded-full text-[15px] font-semibold inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
              isCompleted
                ? 'bg-[#E0F2FE] text-[#0284C7] border border-[#38BDF8]'
                : 'bg-[#1D3557] text-white hover:bg-[#0F172A]'
            }`}
          >
            <Check className="w-5 h-5" />
            <span>
              {isCompleted
                ? lang === 'ko'
                  ? '완료됨 · 목록으로 돌아가기'
                  : 'Completed · Return to Day'
                : lang === 'ko'
                ? '이 구간 완료 체크하기'
                : 'Mark Step Completed'}
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Main Day-by-Day Itinerary Feed
  const filterOptions: { id: CountryFilter; ko: string; en: string }[] = [
    { id: 'all', ko: '전체 여정', en: 'All Route' },
    { id: 'france', ko: '프랑스 · 파리', en: 'France · Paris' },
    { id: 'switzerland', ko: '스위스 · 알프스', en: 'Switzerland · Alps' },
  ];

  const completedInDay = activeDay.steps.filter((s) =>
    completedStepIds.includes(s.id)
  ).length;

  return (
    <div className="space-y-6">
      {/* Intro & Country Filter Chips */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <p className="text-[13px] font-semibold text-[#0284C7]">
              {lang === 'ko'
                ? '프랑스 · 스위스 첫 유럽 5일 핵심 루트'
                : 'France & Switzerland 5-Day First-Timer Route'}
            </p>
            <h1 className="text-[26px] leading-[34px] font-bold text-[#0b1c30] text-balance mt-0.5">
              {lang === 'ko' ? '오늘의 이동과 여정' : 'Your Guided Daily Route'}
            </h1>
          </div>
          <p className="text-[13px] text-[#64748B] tabular-nums">
            {lang === 'ko'
              ? `${activeDay.contextTitle.ko} · ${completedInDay}/${activeDay.steps.length} 구간 완료`
              : `${activeDay.contextTitle.en} · ${completedInDay}/${activeDay.steps.length} done`}
          </p>
        </div>

        {/* Interactive Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {filterOptions.map((opt) => {
            const active = countryFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onSelectCountryFilter(opt.id);
                  const firstMatch = days.find((d) =>
                    opt.id === 'all' ? true : d.country === opt.id
                  );
                  if (firstMatch) onSelectDay(firstMatch.id);
                }}
                className={`min-h-[44px] px-4 rounded-full text-[13px] font-semibold border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
                  active
                    ? 'bg-[#E0F2FE] text-[#0284C7] border-[#38BDF8]'
                    : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0] hover:text-[#1D3557]'
                }`}
              >
                {opt[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Day Selector */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {filteredDays.map((day) => {
          const isSelected = day.id === activeDay.id;
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => onSelectDay(day.id)}
              className={`min-h-[44px] px-4 rounded-xl text-[14px] font-semibold transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
                isSelected
                  ? 'bg-[#1D3557] text-white'
                  : 'bg-[#F8FAFC] text-[#44474e] border border-[#E2E8F0] hover:border-[#0284C7]/50'
              }`}
            >
              {day.shortLabel[lang]}
            </button>
          );
        })}
      </div>

      {/* Destination Hero Card */}
      <section className="relative rounded-[24px] overflow-hidden border border-slate-200/80 aspect-[16/9] sm:aspect-[21/9]">
        <ResilientImage
          src={activeDay.heroImage}
          alt={activeDay.city[lang]}
          fallbackTitle={activeDay.city[lang]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031f41]/85 via-[#031f41]/35 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white space-y-1.5">
          <div className="flex items-center gap-2 text-[13px] font-medium text-sky-100">
            <span>{activeDay.contextTitle[lang]}</span>
            <span aria-hidden="true">·</span>
            <span>{activeDay.weatherSummary}</span>
          </div>
          <h2 className="text-[22px] sm:text-[26px] leading-[30px] sm:leading-[34px] font-bold text-balance">
            {activeDay.city[lang]}
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate-100/95 max-w-2xl">
            {activeDay.heroCaption[lang]}
          </p>
        </div>
      </section>

      {/* Step-by-Step Itinerary Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[19px] leading-[26px] font-semibold text-[#1D3557]">
            {lang === 'ko' ? '시간순 이동 안내' : 'Step-by-Step Schedule'}
          </h3>
          <span className="text-[13px] text-[#64748B]">
            {lang === 'ko'
              ? '카드를 누르면 상세 탑승 가이드가 열립니다'
              : 'Tap any card for boarding details'}
          </span>
        </div>

        <div className="space-y-3.5">
          {activeDay.steps.map((step) => {
            const done = completedStepIds.includes(step.id);

            return (
              <article
                key={step.id}
                className={`rounded-[20px] border transition-colors p-4 sm:p-5 ${
                  done
                    ? 'bg-[#F8FAFC]/70 border-slate-200/70'
                    : 'bg-[#F8FAFC] border-slate-200/90 hover:border-[#0284C7]/50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* 22px Checkbox inside >=44px touch wrapper */}
                  <button
                    type="button"
                    onClick={() => onToggleStepComplete(step.id)}
                    aria-label={
                      done
                        ? lang === 'ko'
                          ? `${step.title.ko} 완료 해제`
                          : `Undo ${step.title.en}`
                        : lang === 'ko'
                        ? `${step.title.ko} 완료 표시`
                        : `Complete ${step.title.en}`
                    }
                    className="min-w-[44px] min-h-[44px] -ml-2 -mt-2 flex items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
                  >
                    <span
                      className={`w-[22px] h-[22px] rounded-md border flex items-center justify-center transition-colors ${
                        done
                          ? 'bg-[#1D3557] border-[#1D3557] text-white'
                          : 'bg-white border-[#CBD5E1] hover:border-[#1D3557]'
                      }`}
                    >
                      {done && <Check className="w-3.5 h-3.5 stroke-[2.75]" />}
                    </span>
                  </button>

                  {/* Clickable Card Body */}
                  <button
                    type="button"
                    onClick={() => onOpenStep(step)}
                    className="flex-1 text-left space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-[13px] font-semibold tabular-nums">
                        <span className="text-[#1D3557]">{step.time}</span>
                        <span aria-hidden="true" className="text-[#94A3B8]">
                          ·
                        </span>
                        <span className="text-[#0284C7]">{step.transitCode}</span>
                        <span aria-hidden="true" className="text-[#94A3B8]">
                          ·
                        </span>
                        <span className="text-[#64748B]">
                          {step.detail.estimatedCost}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#64748B] shrink-0" />
                    </div>

                    <h4
                      className={`text-[17px] leading-[24px] font-semibold ${
                        done ? 'text-[#64748B] line-through' : 'text-[#0b1c30]'
                      }`}
                    >
                      {step.title[lang]}
                    </h4>

                    <p className="text-[14px] leading-[21px] text-[#44474e]">
                      {step.subtitle[lang]}
                    </p>

                    {step.tipAlert && !done && (
                      <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-white border border-[#E2E8F0] px-3 py-2.5 text-[13px] leading-[19px] text-[#1D3557]">
                        <AlertCircle className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                        <span>{step.tipAlert[lang]}</span>
                      </div>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
