import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { getAwards } from "@/data/recognition";
import { getValidationStats } from "@/data/evidence";
import type { Locale } from "@/lib/i18n";

/**
 * Home trust block — merges regulatory milestones, awards and validation
 * scope into one scannable panel. Shows dataset-scope descriptors only
 * (136 cases / 360 tumors / 16 institutions …); the gated standalone
 * performance numbers stay on the Evidence page. zh-TW canonical.
 */
export function HomeTrust({ locale = "zh-TW" }: { locale?: Locale }) {
  const en = locale === "en";
  const regItems = getAwards(locale).slice(0, 4);
  const validationStats = getValidationStats(locale);
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-brand-100 bg-white shadow-xl shadow-brand-900/8">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        {/* regulatory + awards */}
        <div className="relative border-b border-line p-7 sm:p-9 lg:border-b-0 lg:border-r">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent-800">
            <Icon name="shield" size={13} />
            Regulatory & Recognition
          </span>
          <h3 className="mt-4 text-xl font-semibold text-ink sm:text-2xl">
            {en
              ? "A brain tumor AI medical device cleared by the FDA and TFDA"
              : "通過 FDA 與 TFDA 取證的腦瘤 AI 醫材"}
          </h3>
          <ul className="mt-6 space-y-2.5">
            {regItems.map((a) => (
              <li key={a.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700">
                  <Icon name={a.icon} size={16} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug text-ink">{a.title}</p>
                  <p className="text-xs text-ink-muted">{a.issuer}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* validation scope (dark inset) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 to-brand-900 p-7 text-white sm:p-9">
          <div aria-hidden className="medical-grid absolute inset-0 opacity-[0.12]" />
          <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-500/15 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent-200 ring-1 ring-white/15">
              <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-400" />
              Multicenter Validation
            </span>
            <h3 className="mt-4 text-base font-semibold text-white">
              {en
                ? "Scale of the multinational, multicenter retrospective validation dataset"
                : "多中心、多國回溯性驗證資料規模"}
            </h3>
            <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6">
              {validationStats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold tabular-nums text-white sm:text-[1.7rem]">{s.value}</p>
                  <p className="mt-1 text-[0.68rem] leading-snug text-brand-200/80">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 border-t border-white/10 pt-4 text-[0.7rem] leading-relaxed text-brand-200/70">
              {en
                ? "Standalone performance figures such as sensitivity and Dice are presented on the full clinical-validation page and require regulatory, clinical and QA review before formal publication."
                : "standalone 性能數據（敏感度、Dice 等）於完整臨床驗證頁呈現，正式公開前須經法規／臨床／QA 審核。"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-surface-soft px-7 py-5 sm:px-9">
        <p className="text-sm text-ink-soft">
          {en
            ? "Full regulatory milestones, clinical validation, hospital deployment and patent portfolio"
            : "完整法規里程碑、臨床驗證、醫院導入與專利技術布局"}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href={`/${locale}/evidence-regulatory`} variant="secondary" size="sm" arrow>
            {en ? "Evidence & Regulatory" : "法規與證據"}
          </Button>
          <Button href={`/${locale}/evidence-regulatory#validation`} variant="ghost" size="sm">
            {en ? "Clinical validation" : "臨床驗證與導入"}
          </Button>
        </div>
      </div>
    </div>
  );
}
