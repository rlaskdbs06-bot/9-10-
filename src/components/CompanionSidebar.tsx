import { useState } from 'react';
import { ArrowRight, CheckCircle2, Compass, PlugZap } from 'lucide-react';
import { ItineraryDay, ItineraryStep, Language, TabId } from '../types/travel';

interface CompanionSidebarProps {
  lang: Language;
  days: ItineraryDay[];
  completedStepIds: string[];
  checklistProgress: { done: number; total: number };
  eurRate: number;
  chfRate: number;
  onJumpToStep: (dayId: string, step: ItineraryStep) => void;
  onSelectTab: (tab: TabId) => void;
}

export function CompanionSidebar({
  lang,
  days,
  completedStepIds,
  checklistProgress,
  eurRate,
  chfRate,
  onJumpToStep,
  onSelectTab,
}: CompanionSidebarProps) {
  const [quickCurrency, setQuickCurrency] = useState<'EUR' | 'CHF'>('EUR');
  const [quickAmount, setQuickAmount] = useState<string>('15');

  // Find next uncompleted step
  let nextStepInfo: { day: ItineraryDay; step: ItineraryStep } | null = null;
  for (const day of days) {
    const found = day.steps.find((s) => !completedStepIds.includes(s.id));
    if (found) {
      nextStepInfo = { day, step: found };
      break;
    }
  }

  const totalSteps = days.reduce((acc, d) => acc + d.steps.length, 0);
  const doneSteps = completedStepIds.length;
  const quickKrw = Math.round(
    (parseFloat(quickAmount) || 0) * (quickCurrency === 'EUR' ? eurRate : chfRate)
  );

  return (
    <aside className="hidden lg:block lg:col-span-4 space-y-5 sticky top-24">
      {/* Next Step Companion Card */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[24px] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#1D3557]">
            <Compass className="w-5 h-5 text-[#0284C7]" />
            <h2 className="text-[16px] font-bold">
              {lang === 'ko' ? '다음 이동 안내' : 'Up Next on Your Trip'}
            </h2>
          </div>
          <span className="text-[13px] font-semibold text-[#64748B] tabular-nums">
            {doneSteps}/{totalSteps}
          </span>
        </div>

        {nextStepInfo ? (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-[12px] font-semibold text-[#0284C7] tabular-nums">
              <span>{nextStepInfo.day.contextTitle[lang]}</span>
              <span aria-hidden="true">·</span>
              <span>{nextStepInfo.step.time}</span>
              <span aria-hidden="true">·</span>
              <span>{nextStepInfo.step.transitCode}</span>
            </div>
            <p className="text-[15px] font-bold text-[#0b1c30] leading-[21px]">
              {nextStepInfo.step.title[lang]}
            </p>
            <p className="text-[13px] text-[#64748B] leading-[19px]">
              {nextStepInfo.step.routeSummary[lang]}
            </p>
            <button
              type="button"
              onClick={() =>
                onJumpToStep(nextStepInfo!.day.id, nextStepInfo!.step)
              }
              className="w-full h-11 mt-1 rounded-full bg-[#1D3557] hover:bg-[#031f41] text-white text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{lang === 'ko' ? '탑승 가이드 바로 보기' : 'View Boarding Guide'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3 text-[#1D3557]">
            <CheckCircle2 className="w-5 h-5 text-[#0284C7] shrink-0" />
            <p className="text-[14px] font-semibold">
              {lang === 'ko'
                ? '5일 모든 일정을 완료하셨습니다!'
                : 'All 5-day itinerary legs completed!'}
            </p>
          </div>
        )}
      </div>

      {/* Mini Currency Widget */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-[#1D3557]">
            {lang === 'ko' ? '빠른 환율 계산' : 'Quick FX'}
          </h3>
          <button
            type="button"
            onClick={() => onSelectTab('tools')}
            className="text-[13px] font-semibold text-[#0284C7] hover:underline"
          >
            {lang === 'ko' ? '전체 도구 →' : 'All tools →'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuickCurrency('EUR')}
            className={`flex-1 h-9 rounded-full text-[13px] font-semibold border transition-colors ${
              quickCurrency === 'EUR'
                ? 'bg-[#E0F2FE] text-[#0284C7] border-[#38BDF8]'
                : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'
            }`}
          >
            EUR (€)
          </button>
          <button
            type="button"
            onClick={() => setQuickCurrency('CHF')}
            className={`flex-1 h-9 rounded-full text-[13px] font-semibold border transition-colors ${
              quickCurrency === 'CHF'
                ? 'bg-[#E0F2FE] text-[#0284C7] border-[#38BDF8]'
                : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'
            }`}
          >
            CHF (Fr.)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="number"
            min="0"
            value={quickAmount}
            onChange={(e) => setQuickAmount(e.target.value)}
            aria-label="Quick currency amount"
            className="w-28 h-11 px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[16px] font-bold text-[#0b1c30] tabular-nums focus:outline-none focus:border-[#0284C7]"
          />
          <div className="flex-1 text-right">
            <p className="text-[11px] font-semibold text-[#64748B]">KRW</p>
            <p className="text-[18px] font-extrabold text-[#1D3557] tabular-nums">
              ₩{quickKrw.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Checklist & Plug Reminder Summary */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[24px] p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlugZap className="w-4 h-4 text-[#0284C7]" />
            <h3 className="text-[15px] font-bold text-[#1D3557]">
              {lang === 'ko' ? '출발 준비 현황' : 'Prep Progress'}
            </h3>
          </div>
          <span className="text-[14px] font-bold text-[#0284C7] tabular-nums">
            {checklistProgress.done}/{checklistProgress.total}
          </span>
        </div>
        <p className="text-[13px] leading-[19px] text-[#44474e]">
          {lang === 'ko'
            ? '프랑스(Type E)와 스위스(Type J 3구)는 콘센트 규격이 다릅니다. 얇은 멀티 어댑터를 확인하세요.'
            : 'France (Type E) and Switzerland (Type J) use different plugs—double-check your slim adapter.'}
        </p>
        <button
          type="button"
          onClick={() => onSelectTab('checklist')}
          className="w-full h-10 rounded-full bg-white border border-[#E2E8F0] hover:border-[#0284C7] text-[13px] font-semibold text-[#1D3557] transition-colors"
        >
          {lang === 'ko' ? '준비물 체크리스트 열기' : 'Open Packing Checklist'}
        </button>
      </div>
    </aside>
  );
}
