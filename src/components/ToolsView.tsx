import { useState } from 'react';
import {
  ArrowRightLeft,
  Check,
  Copy,
  PhoneCall,
  Volume2,
} from 'lucide-react';
import { Language, PhraseItem } from '../types/travel';

interface ToolsViewProps {
  lang: Language;
  phrases: PhraseItem[];
  eurRate: number;
  chfRate: number;
  onUpdateRates: (eur: number, chf: number) => void;
}

export function ToolsView({
  lang,
  phrases,
  eurRate,
  chfRate,
  onUpdateRates,
}: ToolsViewProps) {
  const [baseCurrency, setBaseCurrency] = useState<'EUR' | 'CHF'>('EUR');
  const [amountInput, setAmountInput] = useState<string>('25');
  const [phraseFilter, setPhraseFilter] = useState<'all' | 'france' | 'switzerland'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const numericAmount = parseFloat(amountInput) || 0;
  const krwValue =
    baseCurrency === 'EUR'
      ? Math.round(numericAmount * eurRate)
      : Math.round(numericAmount * chfRate);

  const crossCurrencyValue =
    baseCurrency === 'EUR'
      ? ((numericAmount * eurRate) / chfRate).toFixed(2)
      : ((numericAmount * chfRate) / eurRate).toFixed(2);

  const presets = [5, 15, 30, 50, 100];

  const handleCopy = async (phrase: PhraseItem) => {
    try {
      await navigator.clipboard.writeText(phrase.localText);
      setCopiedId(phrase.id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      // Clipboard fallback ignored if restricted
    }
  };

  const handleSpeak = (phrase: PhraseItem) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase.localText);
    utterance.lang = phrase.speechLang;
    utterance.rate = 0.92;
    utterance.onstart = () => setSpeakingId(phrase.id);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    window.speechSynthesis.speak(utterance);
  };

  const filteredPhrases = phrases.filter((p) =>
    phraseFilter === 'all' ? true : p.country === phraseFilter
  );

  return (
    <div className="space-y-8">
      {/* Section 1: Currency Converter */}
      <section className="space-y-4">
        <div>
          <p className="text-[13px] font-semibold text-[#0284C7]">
            {lang === 'ko'
              ? '오프라인에서도 바로 쓰는 빠른 계산기'
              : 'Instant Offline Travel Currency Converter'}
          </p>
          <h1 className="text-[26px] leading-[34px] font-bold text-[#0b1c30] text-balance mt-0.5">
            {lang === 'ko' ? '유로 · 스위스 프랑 환율' : 'EUR · CHF Quick Converter'}
          </h1>
        </div>

        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[24px] p-5 sm:p-6 space-y-5">
          {/* Currency Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex p-1 bg-[#F1F5F9] rounded-full border border-[#E2E8F0]">
              {(['EUR', 'CHF'] as const).map((curr) => {
                const active = baseCurrency === curr;
                return (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setBaseCurrency(curr)}
                    className={`min-h-[40px] px-5 rounded-full text-[14px] font-bold transition-colors ${
                      active
                        ? 'bg-[#1D3557] text-white'
                        : 'text-[#64748B] hover:text-[#1D3557]'
                    }`}
                  >
                    {curr === 'EUR' ? 'EUR (€) 프랑스' : 'CHF (Fr.) 스위스'}
                  </button>
                );
              })}
            </div>

            <span className="text-[13px] font-medium text-[#64748B] tabular-nums">
              {baseCurrency === 'EUR'
                ? `1 EUR = ${eurRate.toLocaleString()} KRW`
                : `1 CHF = ${chfRate.toLocaleString()} KRW`}
            </span>
          </div>

          {/* Input + Converted Result */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-5 relative">
              <label
                htmlFor="fx-amount-input"
                className="block text-[12px] font-semibold text-[#64748B] mb-1.5"
              >
                {lang === 'ko' ? `금액 입력 (${baseCurrency})` : `Amount (${baseCurrency})`}
              </label>
              <input
                id="fx-amount-input"
                type="number"
                min="0"
                step="any"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="w-full h-[54px] px-4 rounded-xl bg-white border border-[#E2E8F0] text-[22px] font-bold text-[#0b1c30] tabular-nums focus:outline-none focus:border-[#0284C7] focus:ring-[3px] focus:ring-[#0284C7]/15"
              />
            </div>

            <div className="hidden md:flex md:col-span-1 justify-center pt-5 text-[#0284C7]">
              <ArrowRightLeft className="w-5 h-5" />
            </div>

            <div className="md:col-span-6 bg-white border border-[#E2E8F0] rounded-2xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold text-[#64748B]">
                  {lang === 'ko' ? '원화 환산 금액' : 'Korean Won (KRW)'}
                </p>
                <p className="text-[26px] font-extrabold text-[#1D3557] tabular-nums mt-0.5">
                  ₩{krwValue.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[12px] font-semibold text-[#64748B]">
                  {baseCurrency === 'EUR' ? 'CHF' : 'EUR'}
                </p>
                <p className="text-[16px] font-bold text-[#0284C7] tabular-nums mt-0.5">
                  {baseCurrency === 'EUR' ? `Fr. ${crossCurrencyValue}` : `€${crossCurrencyValue}`}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Amount Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[12px] font-semibold text-[#64748B] mr-1">
              {lang === 'ko' ? '자주 쓰는 금액:' : 'Presets:'}
            </span>
            {presets.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmountInput(String(val))}
                className="min-h-[40px] px-3.5 rounded-full bg-white border border-[#E2E8F0] hover:border-[#0284C7] text-[13px] font-semibold text-[#1D3557] tabular-nums transition-colors"
              >
                {baseCurrency === 'EUR' ? `€${val}` : `CHF ${val}`}
              </button>
            ))}
          </div>

          {/* Editable Reference Rates */}
          <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-4 text-[13px] text-[#64748B]">
            <label className="inline-flex items-center gap-2">
              <span>1 EUR =</span>
              <input
                type="number"
                value={eurRate}
                onChange={(e) => onUpdateRates(Number(e.target.value) || 1490, chfRate)}
                className="w-20 h-9 px-2 rounded-lg bg-white border border-[#E2E8F0] text-[#0b1c30] font-semibold tabular-nums text-center focus:outline-none focus:border-[#0284C7]"
              />
              <span>KRW</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <span>1 CHF =</span>
              <input
                type="number"
                value={chfRate}
                onChange={(e) => onUpdateRates(eurRate, Number(e.target.value) || 1595)}
                className="w-20 h-9 px-2 rounded-lg bg-white border border-[#E2E8F0] text-[#0b1c30] font-semibold tabular-nums text-center focus:outline-none focus:border-[#0284C7]"
              />
              <span>KRW</span>
            </label>
          </div>
        </div>
      </section>

      {/* Section 2: Essential Phrases */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-[20px] font-bold text-[#0b1c30]">
              {lang === 'ko'
                ? '역·식당에서 바로 쓰는 필수 회화'
                : 'Essential Station & Cafe Phrases'}
            </h2>
            <p className="text-[13px] text-[#64748B]">
              {lang === 'ko'
                ? '스피커 버튼을 누르면 현지 발음을 들려드립니다'
                : 'Tap the speaker icon for native pronunciation'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: 'all' as const, ko: '전체', en: 'All' },
              { id: 'france' as const, ko: '프랑스어', en: 'French' },
              { id: 'switzerland' as const, ko: '스위스 독일어', en: 'Swiss German' },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setPhraseFilter(chip.id)}
                className={`min-h-[40px] px-3.5 rounded-full text-[13px] font-semibold border transition-colors ${
                  phraseFilter === chip.id
                    ? 'bg-[#E0F2FE] text-[#0284C7] border-[#38BDF8]'
                    : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'
                }`}
              >
                {chip[lang]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredPhrases.map((phrase) => (
            <article
              key={phrase.id}
              className="bg-white border border-[#E2E8F0] rounded-[20px] p-4 flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-[12px] font-semibold text-[#0284C7]">
                  <span>
                    {phrase.country === 'france'
                      ? lang === 'ko'
                        ? '프랑스어'
                        : 'French'
                      : lang === 'ko'
                      ? '스위스 독일어'
                      : 'Swiss German'}
                  </span>
                  <span className="text-[#64748B]">{phrase.situation[lang]}</span>
                </div>
                <p className="text-[18px] font-bold text-[#0b1c30]">
                  {phrase.localText}
                </p>
                <p className="text-[14px] font-medium text-[#1D3557]">
                  {phrase.phoneticKo}
                </p>
                <p className="text-[13px] text-[#64748B]">{phrase.meaning[lang]}</p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => handleSpeak(phrase)}
                  className={`min-h-[40px] px-3.5 rounded-full text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors ${
                    speakingId === phrase.id
                      ? 'bg-[#0284C7] text-white'
                      : 'bg-[#E0F2FE] text-[#0284C7] hover:bg-[#bae6fd]'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{lang === 'ko' ? '발음 듣기' : 'Listen'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(phrase)}
                  className="min-h-[40px] px-3.5 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#1D3557] text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === phrase.id ? (
                    <>
                      <Check className="w-4 h-4 text-[#0284C7]" />
                      <span>{lang === 'ko' ? '복사됨' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{lang === 'ko' ? '문장 복사' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 3: Emergency Contacts */}
      <section className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] p-5 space-y-3">
        <div className="flex items-center gap-2 text-[#1D3557]">
          <PhoneCall className="w-5 h-5 text-[#0284C7]" />
          <h2 className="text-[17px] font-bold">
            {lang === 'ko' ? '비상 연락처 & 대사관 안내' : 'Emergency & Embassy Numbers'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 space-y-1">
            <p className="font-bold text-[#1D3557]">
              {lang === 'ko' ? '프랑스 (파리)' : 'France (Paris)'}
            </p>
            <p className="text-[#44474e] tabular-nums">
              {lang === 'ko'
                ? '통합 긴급: 112 · 경찰: 17 · 구급: 15'
                : 'EU Emergency: 112 · Police: 17 · Medical: 15'}
            </p>
            <p className="text-[13px] text-[#64748B] tabular-nums">
              {lang === 'ko'
                ? '주프랑스 한국대사관: +33-1-4753-0101'
                : 'Embassy (Paris): +33-1-4753-0101'}
            </p>
          </div>
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 space-y-1">
            <p className="font-bold text-[#1D3557]">
              {lang === 'ko' ? '스위스 (인터라켄 · 취리히)' : 'Switzerland'}
            </p>
            <p className="text-[#44474e] tabular-nums">
              {lang === 'ko'
                ? '통합 긴급: 112 · 경찰: 117 · 구급: 144'
                : 'Emergency: 112 · Police: 117 · Medical: 144'}
            </p>
            <p className="text-[13px] text-[#64748B] tabular-nums">
              {lang === 'ko'
                ? '주스위스 한국대사관: +41-31-356-2444'
                : 'Embassy (Bern): +41-31-356-2444'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
