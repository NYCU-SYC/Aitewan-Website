import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { getFooterNav } from "@/data/navigation";
import { contact, getCompliance, getSiteStrings } from "@/data/site";
import type { Locale } from "@/lib/i18n";

export function SiteFooter({ locale = "zh-TW" }: { locale?: Locale }) {
  const nav = getFooterNav(locale);
  const s = getSiteStrings(locale);
  const c = getCompliance(locale);
  const logoAlt = locale === "en" ? "AItewan BioMedical Technology logo" : "智德萬 AItewan 生醫科技";

  return (
    <footer className="mt-auto bg-brand-950 text-brand-100">
      <div
        aria-hidden
        className="h-0.5 bg-gradient-to-r from-brand-700 via-accent-500 to-brand-700"
      />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Link href={`/${locale}`} aria-label={s.companyLine}>
              <span className="inline-flex rounded-lg bg-white/95 px-3 py-2">
                <Logo className="h-10 w-auto max-w-[18rem]" alt={logoAlt} />
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-brand-200/80">{s.companyLine}</p>
            <p className="mt-1 text-xs text-brand-300/70">{s.companySub}</p>
            <div className="mt-5 space-y-1.5 text-sm">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 text-brand-100 hover:text-white"
              >
                <Icon name="mail" size={16} className="text-accent-300" />
                {contact.email}
              </a>
              <p className="flex items-center gap-2 text-brand-200/80">
                <Icon name="mapPin" size={16} className="text-accent-300" />
                {s.addressLine}
                <span className="text-brand-300/60">{s.addressNote}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {nav.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-accent-300">
                  {col.heading}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-brand-200/85 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs leading-relaxed text-brand-200/80">
            <span className="font-semibold text-brand-100">{s.complianceHeading}：</span>{" "}
            {c.main}
          </p>
          <p className="mt-1.5 text-[0.7rem] leading-relaxed text-brand-300/70">{c.sub}</p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-brand-300/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{s.footerRights}</p>
          <p>{s.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
