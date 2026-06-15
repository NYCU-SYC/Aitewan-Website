import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import type { Metric } from "@/data/evidence";
import type { Locale } from "@/lib/i18n";

/**
 * Validation metric cards。性能數據屬高風險 claim（claims-registry CL-PERFORMANCE，
 * reviewStatus: pending-review）：`gated` 時每張卡顯示「待審核」標示，
 * 並由呼叫端搭配 ComplianceNotice 與資料來源說明（規格書 §2 / §4-08）。
 */
export function MetricsGrid({
  metrics,
  gated = true,
  locale = "zh-TW",
}: {
  metrics: Metric[];
  gated?: boolean;
  locale?: Locale;
}) {
  const gateText =
    locale === "en"
      ? "Performance summary from multicenter retrospective validation; pending regulatory / clinical / QA review before formal publication"
      : "以下性能摘要源自多中心回溯性驗證資料，正式公開前須經法規／臨床／QA 審核確認";
  const gateChip = locale === "en" ? "Pending review" : "待審核";
  return (
    <div>
      {gated && (
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-review-amber/30 bg-review-amber/10 px-3.5 py-1.5 text-xs font-semibold text-review-amber">
          <Icon name="file" size={13} />
          {gateText}
        </p>
      )}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {metrics.map((m, i) => (
          <Reveal key={`${m.label || m.labelEn}-${m.value}-${m.suffix}-${i}`} delay={i * 0.06}>
            <div className="tech-card group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-md hover:shadow-brand-900/5">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-600/70 to-accent-500/70"
              />
              <div className="flex items-baseline gap-1">
                <CountUp
                  value={m.value}
                  decimals={m.decimals}
                  suffix={m.suffix}
                  className="text-gradient text-3xl font-bold tracking-tight"
                />
                {m.note && (
                  <span className="text-[0.7rem] font-medium text-ink-muted">{m.note}</span>
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-ink">{m.label}</p>
              {m.labelEn && <p className="mt-0.5 text-xs text-ink-muted">{m.labelEn}</p>}
              {gated && (
                <span className="mt-2 inline-block rounded-full bg-review-amber/10 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-review-amber">
                  {gateChip}
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
