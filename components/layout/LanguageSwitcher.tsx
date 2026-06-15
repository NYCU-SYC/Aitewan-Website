"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, switchLocalePath } from "@/lib/i18n";
import { useLocale } from "@/components/ui/useLocale";

/**
 * 中英文切換（segmented control）。語言狀態以 URL locale 持久化 —
 * 換頁與重新整理皆保留，且雙語各有獨立可分享網址（SEO 友善）。
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const current = useLocale();
  const aria = current === "en" ? "Language" : "語言";
  const labelFor = (locale: (typeof locales)[number]) => {
    if (current === "en" && locale === "zh-TW") return "ZH";
    return localeLabels[locale].short;
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border border-line bg-white/80 p-0.5 text-xs font-semibold backdrop-blur-sm ${className}`}
      role="group"
      aria-label={aria}
    >
      {locales.map((l) => (
        <Link
          key={l}
          href={switchLocalePath(pathname, l)}
          aria-current={current === l ? "true" : undefined}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            current === l
              ? "bg-brand-700 text-white shadow-sm"
              : "text-ink-muted hover:text-brand-700"
          }`}
        >
          {labelFor(l)}
        </Link>
      ))}
    </div>
  );
}
