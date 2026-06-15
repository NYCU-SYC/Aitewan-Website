import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/lib/i18n";

/**
 * DeepBT® generation comparison (Detector → Detector Plus → Detector A+),
 * recreated bilingually from the filing's evolution table. A "✓" marks a
 * supported capability; the clearance row is intentionally explicit that
 * Detector A+ is UNDER TFDA REVIEW (not cleared).
 */

type Row = { zh: string; en: string; gens: [boolean, boolean, boolean] };

const rows: Row[] = [
  { zh: "3 類腦瘤 · 術前影像圈註", en: "3 tumor types · pre-op contouring", gens: [true, true, true] },
  { zh: "3 類腦瘤 · 術前與術後圈註", en: "3 tumor types · pre- & post-op contouring", gens: [false, true, true] },
  { zh: "5 類腦瘤 · 術前與術後圈註", en: "5 tumor types · pre- & post-op contouring", gens: [false, false, true] },
  { zh: "5 類腦瘤分類", en: "5-class tumor classification", gens: [false, false, true] },
  { zh: "結果結合 LLM 生成報告草稿", en: "LLM-assisted report drafting", gens: [false, true, true] },
];

const gens = {
  "zh-TW": [
    { name: "第一代 Detector", clearance: "TFDA 許可 · 007906" },
    { name: "第二代 Detector Plus", clearance: "TFDA 008460 + FDA 510(k) K252190" },
    { name: "第三代 Detector A+", clearance: "TFDA 審查中（尚未取證）" },
  ],
  en: [
    { name: "Gen 1 · Detector", clearance: "TFDA cleared · 007906" },
    { name: "Gen 2 · Detector Plus", clearance: "TFDA 008460 + FDA 510(k) K252190" },
    { name: "Gen 3 · Detector A+", clearance: "Under TFDA review (not yet cleared)" },
  ],
};

export function DeepBtEvolution({ locale = "zh-TW" }: { locale?: Locale }) {
  const en = locale === "en";
  const g = gens[en ? "en" : "zh-TW"];
  const capLabel = en ? "Capability" : "功能";
  const clearanceLabel = en ? "Regulatory status" : "取證狀態";

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-surface-soft">
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">{capLabel}</th>
            {g.map((gen, i) => (
              <th
                key={gen.name}
                className={`px-4 py-3 text-center text-xs font-semibold ${i === 2 ? "text-accent-700" : "text-ink"}`}
              >
                {gen.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.en} className="border-b border-line/70">
              <td className="px-4 py-3 font-medium text-ink-soft">{en ? row.en : row.zh}</td>
              {row.gens.map((on, i) => (
                <td key={i} className="px-4 py-3 text-center">
                  {on ? (
                    <Icon name="check" size={18} className="mx-auto text-valid-green" />
                  ) : (
                    <span aria-hidden className="mx-auto block h-px w-3 bg-line-strong" />
                  )}
                  <span className="sr-only">{on ? (en ? "supported" : "支援") : (en ? "not supported" : "不支援")}</span>
                </td>
              ))}
            </tr>
          ))}
          <tr className="bg-surface-soft/60">
            <td className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">{clearanceLabel}</td>
            {g.map((gen, i) => (
              <td
                key={gen.name}
                className={`px-4 py-3 text-center text-xs font-medium ${i === 2 ? "text-review-amber" : "text-brand-700"}`}
              >
                {gen.clearance}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
