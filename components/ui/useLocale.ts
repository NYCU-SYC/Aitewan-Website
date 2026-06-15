"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

/** Client 元件由 URL 取得目前 locale（server 元件請改用 page params）。 */
export function useLocale(): Locale {
  const pathname = usePathname() ?? "/";
  const seg = pathname.split("/")[1] ?? "";
  return isLocale(seg) ? seg : defaultLocale;
}
