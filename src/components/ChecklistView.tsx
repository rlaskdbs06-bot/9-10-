import { FormEvent, useState } from 'react';
import {
  Check,
  CreditCard,
  FileCheck2,
  MountainSnow,
  PlugZap,
  Plus,
  ShieldAlert,
  Trash2,
} from 'lucide-react';
import {
  ChecklistCategory,
  ChecklistItem,
  Language,
  TravelTipCard,
} from '../types/travel';

interface ChecklistViewProps {
  lang: Language;
  items: ChecklistItem[];
  checkedIds: string[];
  onToggleCheck: (id: string) => void;
  onAddCustomItem: (title: string, category: ChecklistCategory) => void;
  onDeleteCustomItem: (id: string) => void;
  tips: TravelTipCard[];
}

export function ChecklistView({
  lang,
  items,
  checkedIds,
  onToggleCheck,
  onAddCustomItem,
  onDeleteCustomItem,
  tips,
}: ChecklistViewProps) {
  const [categoryFilter, setCategoryFilter] = useState<'all' | ChecklistCategory>('all');
  const [newItemText, setNewItemText] = useState('');
  const [newCategory, setNewCategory] = useState<ChecklistCategory>('documents');

  const categories: {
    id: 'all' | ChecklistCategory;
    ko: string;
    en: string;
  }[] = [
    { id: 'all', ko: '전체', en: 'All' },
    { id: 'documents', ko: '서류·티켓', en: 'Docs' },
    { id: 'electronics', ko: '어댑터·전자', en: 'Power' },
    { id: 'alpine', ko: '의류·안전', en: 'Alpine' },
    { id: 'payments', ko: '결제·유심', en: 'Pay & SIM' },
  ];

  const getCategoryIcon = (cat: ChecklistCategory) => {
    switch (cat) {
      case 'documents':
        return FileCheck2;
      case 'electronics':
        return PlugZap;
      case 'alpine':
        return MountainSnow;
      case 'payments':
        return CreditCard;
    }
  };

  const filteredItems = items.filter((item) =>
    categoryFilter === 'all' ? true : item.category === categoryFilter
  );

  const filteredTips = tips.filter((t) =>
    categoryFilter === 'all' ? true : t.category === categoryFilter
  );

  const completedCount = items.filter((item) => checkedIds.includes(item.id)).length;
  const progressPercent =
    items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newItemText.trim();
    if (!trimmed) return;
    onAddCustomItem(trimmed, newCategory);
    setNewItemText('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Progress Summary */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold text-[#0284C7]">
              {lang === 'ko'
                ? '출발 전 놓치기 쉬운 핵심 체크'
                : 'Essential Pre-Departure Checks'}
            </p>
            <h1 className="text-[26px] leading-[34px] font-bold text-[#0b1c30] text-balance mt-0.5">
              {lang === 'ko' ? '준비물 & 필수 주의사항' : 'Packing & Travel Tips'}
            </h1>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-4 py-2.5 flex items-center gap-3 self-start sm:self-auto">
            <span className="text-[13px] font-semibold text-[#64748B]">
              {lang === 'ko' ? '준비율' : 'Packed'}
            </span>
            <span className="text-[18px] font-extrabold text-[#1D3557] tabular-nums">
              {completedCount}/{items.length}
            </span>
            <span className="text-[13px] font-bold text-[#0284C7] tabular-nums">
              ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Clean Linear Progress Bar */}
        <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1D3557] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const active = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`min-h-[44px] px-4 rounded-full text-[13px] font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#E0F2FE] text-[#0284C7] border-[#38BDF8]'
                    : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0] hover:text-[#1D3557]'
                }`}
              >
                {cat[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Essential Tips Cards (White card with subtle cool gray outline + sky-blue status icons) */}
      {filteredTips.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-[17px] font-semibold text-[#1D3557]">
            {lang === 'ko'
              ? '첫 유럽 여행자 실수 방지 팁'
              : 'Important Rules for First-Timers'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {filteredTips.map((tip) => (
              <article
                key={tip.id}
                className="bg-white border border-[#E2E8F0] rounded-[20px] p-4 flex flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#0284C7]">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span className="text-[12px] font-bold tracking-wide">
                      {tip.highlightValue[lang]}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#0b1c30] leading-[22px]">
                    {tip.title[lang]}
                  </h3>
                  <p className="text-[13px] leading-[20px] text-[#44474e]">
                    {tip.summary[lang]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Checklist Cards */}
      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold text-[#1D3557]">
          {lang === 'ko' ? '체크리스트' : 'Packing Checklist'}
        </h2>

        <div className="space-y-2.5">
          {filteredItems.map((item) => {
            const checked = checkedIds.includes(item.id);
            const Icon = getCategoryIcon(item.category);

            return (
              <div
                key={item.id}
                className={`bg-white border rounded-[18px] px-4 py-3.5 flex items-start gap-3 transition-colors ${
                  checked ? 'border-[#E2E8F0] bg-[#F8FAFC]/60' : 'border-[#E2E8F0]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onToggleCheck(item.id)}
                  aria-label={item.title[lang]}
                  className="min-w-[44px] min-h-[44px] -ml-2 -my-1 flex items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
                >
                  <span
                    className={`w-[22px] h-[22px] rounded-md border flex items-center justify-center transition-colors ${
                      checked
                        ? 'bg-[#1D3557] border-[#1D3557] text-white'
                        : 'bg-white border-[#CBD5E1] hover:border-[#1D3557]'
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5 stroke-[2.75]" />}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleCheck(item.id)}
                  className="flex-1 text-left space-y-1 py-0.5"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#0284C7] shrink-0" />
                    <span
                      className={`text-[15px] font-semibold leading-[21px] ${
                        checked
                          ? 'text-[#64748B] line-through'
                          : 'text-[#0b1c30]'
                      }`}
                    >
                      {item.title[lang]}
                    </span>
                  </div>
                  <p className="text-[13px] leading-[19px] text-[#64748B]">
                    {item.note[lang]}
                  </p>
                </button>

                {item.isCustom && (
                  <button
                    type="button"
                    onClick={() => onDeleteCustomItem(item.id)}
                    aria-label={lang === 'ko' ? '항목 삭제' : 'Delete item'}
                    className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center text-[#64748B] hover:text-[#ba1a1a] rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Add Custom Checklist Item Form (52px Input Spec) */}
      <section className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] p-4 sm:p-5 space-y-3">
        <h3 className="text-[15px] font-semibold text-[#1D3557]">
          {lang === 'ko' ? '나만의 준비물 추가하기' : 'Add Custom Item'}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder={
              lang === 'ko'
                ? '예: 목베개, 상비약, 면세품 영수증'
                : 'e.g., Neck pillow, sunglasses, medication'
            }
            className="flex-1 h-[52px] px-4 rounded-xl bg-white border border-[#E2E8F0] text-[15px] text-[#0b1c30] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7] focus:ring-[3px] focus:ring-[#0284C7]/15 transition-all"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as ChecklistCategory)}
            aria-label={lang === 'ko' ? '카테고리 선택' : 'Select category'}
            className="h-[52px] px-3.5 rounded-xl bg-white border border-[#E2E8F0] text-[14px] font-medium text-[#1D3557] focus:outline-none focus:border-[#0284C7] focus:ring-[3px] focus:ring-[#0284C7]/15"
          >
            <option value="documents">{lang === 'ko' ? '서류·티켓' : 'Docs'}</option>
            <option value="electronics">{lang === 'ko' ? '어댑터·전자' : 'Power'}</option>
            <option value="alpine">{lang === 'ko' ? '의류·안전' : 'Alpine'}</option>
            <option value="payments">{lang === 'ko' ? '결제·유심' : 'Pay & SIM'}</option>
          </select>
          <button
            type="submit"
            className="h-[52px] px-6 rounded-full bg-[#1D3557] hover:bg-[#031f41] active:scale-[0.98] text-white text-[15px] font-semibold inline-flex items-center justify-center gap-1.5 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'ko' ? '추가' : 'Add'}</span>
          </button>
        </form>
      </section>
    </div>
  );
}
