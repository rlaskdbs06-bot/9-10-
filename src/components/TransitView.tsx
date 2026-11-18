import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, TrainFront } from 'lucide-react';
import { CountryFilter, Language, TransitGuide } from '../types/travel';
import { ResilientImage } from './ResilientImage';

interface TransitViewProps {
  lang: Language;
  guides: TransitGuide[];
}

export function TransitView({ lang, guides }: TransitViewProps) {
  const [countryFilter, setCountryFilter] = useState<CountryFilter>('all');
  const [selectedGuideId, setSelectedGuideId] = useState<string>(guides[0].id);
  const [swissDays, setSwissDays] = useState<3 | 4 | 6>(3);
  const [includeJungfrau, setIncludeJungfrau] = useState<boolean>(true);

  const visibleGuides = guides.filter((g) =>
    countryFilter === 'all' ? true : g.country === countryFilter
  );

  const activeGuide =
    visibleGuides.find((g) => g.id === selectedGuideId) ||
    visibleGuides[0] ||
    guides[0];

  // Realistic pass vs half-fare estimator in CHF
  const stpPrice = swissDays === 3 ? 244 : swissDays === 4 ? 295 : 379;
  const halfFareBase = 120;
  const pointToPointHalf =
    (swissDays === 3 ? 115 : swissDays === 4 ? 148 : 205) +
    (includeJungfrau ? 110 : 0);
  const halfFareTotal = halfFareBase + pointToPointHalf;
  const stpJungfrauAddon = includeJungfrau ? 158 : 0;
  const stpTotal = stpPrice + stpJungfrauAddon;
  const recommendedPass =
    stpTotal <= halfFareTotal + 25 ? 'stp' : 'halfFare';

  return (
    <div className="space-y-6">
      {/* Header & Country Filter */}
      <div className="space-y-4">
        <div>
          <p className="text-[13px] font-semibold text-[#0284C7]">
            {lang === 'ko'
              ? 'RER · TGV Lyria · SBB 스위스 연방철도'
              : 'RER · TGV Lyria · Swiss Federal Railways'}
          </p>
          <h1 className="text-[26px] leading-[34px] font-bold text-[#0b1c30] text-balance mt-0.5">
            {lang === 'ko'
              ? '헷갈리지 않는 유럽 철도 가이드'
              : 'Stress-Free European Rail Guide'}
          </h1>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all' as const, ko: '전체 교통', en: 'All Transit' },
            { id: 'france' as const, ko: '프랑스 (RER · TGV)', en: 'France (RER · TGV)' },
            { id: 'switzerland' as const, ko: '스위스 (SBB · 유람선)', en: 'Switzerland (SBB)' },
          ].map((chip) => {
            const active = countryFilter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  setCountryFilter(chip.id);
                  const first = guides.find((g) =>
                    chip.id === 'all' ? true : g.country === chip.id
                  );
                  if (first) setSelectedGuideId(first.id);
                }}
                className={`min-h-[44px] px-4 rounded-full text-[13px] font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#E0F2FE] text-[#0284C7] border-[#38BDF8]'
                    : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0] hover:text-[#1D3557]'
                }`}
              >
                {chip[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Route Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {visibleGuides.map((g) => {
          const selected = g.id === activeGuide.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setSelectedGuideId(g.id)}
              className={`min-h-[72px] p-4 rounded-[20px] border text-left transition-all flex flex-col justify-between gap-1.5 ${
                selected
                  ? 'bg-[#1D3557] text-white border-[#1D3557]'
                  : 'bg-[#F8FAFC] text-[#0b1c30] border-[#E2E8F0] hover:border-[#0284C7]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[13px] font-bold ${
                    selected ? 'text-[#5bb8fe]' : 'text-[#0284C7]'
                  }`}
                >
                  {g.code}
                </span>
                <span
                  className={`text-[12px] tabular-nums ${
                    selected ? 'text-slate-200' : 'text-[#64748B]'
                  }`}
                >
                  {g.duration}
                </span>
              </div>
              <span className="text-[15px] font-semibold leading-[20px]">
                {g.title[lang]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Transit Detailed Guide */}
      <section className="bg-[#F8FAFC] border border-slate-200/80 rounded-[24px] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          <div className="md:col-span-5 relative min-h-[200px]">
            <ResilientImage
              src={activeGuide.image}
              alt={activeGuide.title[lang]}
              fallbackTitle={activeGuide.code}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-7 p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#64748B]">
              <span className="font-bold text-[#0284C7]">{activeGuide.code}</span>
              <span aria-hidden="true">·</span>
              <span>{activeGuide.frequency[lang]}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{activeGuide.duration}</span>
            </div>

            <div>
              <h2 className="text-[20px] leading-[28px] font-bold text-[#0b1c30]">
                {activeGuide.title[lang]}
              </h2>
              <p className="text-[14px] text-[#44474e] mt-1">
                {activeGuide.route[lang]}
              </p>
            </div>

            {/* Validation Warning Callout */}
            <div className="rounded-xl bg-white border border-[#E2E8F0] p-3.5 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
              <p className="text-[13px] leading-[19px] text-[#1D3557]">
                {activeGuide.validationWarning[lang]}
              </p>
            </div>

            {/* Boarding Steps */}
            <div className="space-y-2 pt-1">
              <h3 className="text-[14px] font-semibold text-[#1D3557]">
                {lang === 'ko' ? '역 도착 후 탑승 순서' : 'Station Boarding Steps'}
              </h3>
              <ul className="space-y-2">
                {activeGuide.boardingSteps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[14px] leading-[21px] text-[#0b1c30]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-1" />
                    <span>{step[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Station Extra Tip */}
            <div className="pt-2 border-t border-slate-200/80 flex items-start gap-2 text-[13px] text-[#44474e]">
              <Info className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
              <span>{activeGuide.stationTip[lang]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Swiss Rail Pass Comparison Tool */}
      <section className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
              <TrainFront className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-[#0b1c30]">
                {lang === 'ko'
                  ? '스위스 트래블 패스 vs 반액권 계산기'
                  : 'Swiss Travel Pass vs Half Fare Estimator'}
              </h2>
              <p className="text-[13px] text-[#64748B]">
                {lang === 'ko'
                  ? '일정에 맞춰 어떤 패스가 더 편하고 유리한지 비교해보세요'
                  : 'Compare convenience and estimated 2nd-class rail spend'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[13px] font-semibold text-[#1D3557]">
            {lang === 'ko' ? '스위스 체류 일수:' : 'Days in Switzerland:'}
          </span>
          {([3, 4, 6] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setSwissDays(d)}
              className={`min-h-[44px] px-4 rounded-full text-[13px] font-semibold border transition-colors tabular-nums ${
                swissDays === d
                  ? 'bg-[#E0F2FE] text-[#0284C7] border-[#38BDF8]'
                  : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'
              }`}
            >
              {lang === 'ko' ? `${d}일 연속` : `${d} Days`}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setIncludeJungfrau((v) => !v)}
            className={`min-h-[44px] px-4 rounded-full text-[13px] font-semibold border transition-colors ${
              includeJungfrau
                ? 'bg-[#1D3557] text-white border-[#1D3557]'
                : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'
            }`}
          >
            {includeJungfrau
              ? lang === 'ko'
                ? '✓ 융프라우요흐 포함'
                : '✓ Incl. Jungfraujoch'
              : lang === 'ko'
              ? '+ 융프라우요흐 포함하기'
              : '+ Include Jungfraujoch'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className={`rounded-2xl p-4 border ${
              recommendedPass === 'stp'
                ? 'bg-[#F8FAFC] border-[#0284C7]'
                : 'bg-[#F8FAFC] border-[#E2E8F0]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-[#1D3557]">
                {lang === 'ko' ? '스위스 트래블 패스 (STP)' : 'Swiss Travel Pass'}
              </span>
              {recommendedPass === 'stp' && (
                <span className="text-[12px] font-semibold text-[#0284C7]">
                  {lang === 'ko' ? '첫 여행자 추천' : 'Recommended'}
                </span>
              )}
            </div>
            <p className="text-[24px] font-extrabold text-[#0b1c30] tabular-nums mt-2">
              CHF {stpTotal}
            </p>
            <p className="text-[13px] text-[#44474e] mt-1">
              {lang === 'ko'
                ? '매번 표를 살 필요 없이 기차·유람선·시내 트램 무제한 탑승 및 박물관 무료 입장'
                : 'Zero per-ride ticketing: board trains, boats & city trams freely + museum entry'}
            </p>
          </div>

          <div
            className={`rounded-2xl p-4 border ${
              recommendedPass === 'halfFare'
                ? 'bg-[#F8FAFC] border-[#0284C7]'
                : 'bg-[#F8FAFC] border-[#E2E8F0]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-[#1D3557]">
                {lang === 'ko' ? '스위스 반액권 (Half Fare)' : 'Swiss Half Fare Card'}
              </span>
              {recommendedPass === 'halfFare' && (
                <span className="text-[12px] font-semibold text-[#0284C7]">
                  {lang === 'ko' ? '알뜰 추천' : 'Best Value'}
                </span>
              )}
            </div>
            <p className="text-[24px] font-extrabold text-[#0b1c30] tabular-nums mt-2">
              CHF {halfFareTotal}
            </p>
            <p className="text-[13px] text-[#44474e] mt-1">
              {lang === 'ko'
                ? '모든 구간 50% 할인 (융프라우 포함). 매 탑승 전 SBB 앱에서 반액 티켓 개별 구매 필요'
                : '50% off all tickets including Jungfraujoch; requires buying each ride in SBB app'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
