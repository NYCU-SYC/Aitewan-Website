/**
 * i18n 基礎：locale 清單、型別、路徑工具。
 * - 內容以 URL locale 持久化（/zh-TW、/en），重新整理與分享連結皆保留語言。
 * - 資料層慣例：data/*.ts 以 zh 版為 canonical（href 一律寫 /zh-TW 前綴），
 *   透過 get*(locale) getter 取得對應語言內容；getter 內以 localizeHref 換前綴。
 */

export const locales = ["zh-TW", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh-TW";

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** 將 canonical（/zh-TW 前綴）連結轉為目標 locale。外部連結與錨點原樣返回。 */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;
  return href.replace(/^\/zh-TW(?=\/|$|\?|#)/, `/${locale}`);
}

/** 取得切換語言後的目前路徑。 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const stripped = pathname.replace(/^\/(zh-TW|en)(?=\/|$)/, "");
  return `/${target}${stripped || ""}`;
}

export const localeLabels: Record<Locale, { short: string; full: string }> = {
  "zh-TW": { short: "繁中", full: "繁體中文" },
  en: { short: "EN", full: "English" },
};
