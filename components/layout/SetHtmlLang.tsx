"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/** Root layout 的 <html lang> 無法依 route segment 變動，於 client 同步。 */
export function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "zh-Hant-TW";
  }, [locale]);
  return null;
}
