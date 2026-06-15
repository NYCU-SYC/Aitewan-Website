import { getCompliance } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { Icon } from "./Icon";

/**
 * Compliance callout — surfaces the SaMD / physician-led-review stance.
 * Used wherever AI output, performance metrics, or demo content is shown.
 */
export function ComplianceNotice({
  variant = "short",
  locale = "zh-TW",
  className = "",
}: {
  variant?: "short" | "product";
  locale?: Locale;
  className?: string;
}) {
  const copy = getCompliance(locale);
  const main = variant === "product" ? copy.product : copy.main;
  const sub = variant === "product" ? copy.sub : copy.sub;
  return (
    <div
      role="note"
      className={`flex gap-3 rounded-xl border border-accent-100 bg-accent-50/60 p-4 text-sm ${className}`}
    >
      <Icon
        name="shield"
        size={20}
        className="mt-0.5 shrink-0 text-accent-700"
      />
      <div className="space-y-1">
        <p className="font-medium text-accent-900">{main}</p>
        <p className="text-xs leading-relaxed text-accent-800/80">{sub}</p>
      </div>
    </div>
  );
}
