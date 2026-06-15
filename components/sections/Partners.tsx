import { Reveal } from "@/components/ui/Reveal";
import { getPartners } from "@/data/recognition";
import type { Locale } from "@/lib/i18n";

/** Partner / collaboration wall — quiet text chips (logos pending授權). */
export function Partners({ locale = "zh-TW" }: { locale?: Locale }) {
  const partners = getPartners(locale);
  const note =
    locale === "en"
      ? "Partners are listed in text form; institution logos will be added once formal authorization is in place."
      : "合作單位以文字列名；機構 logo 將於取得正式授權後更新。";
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {partners.map((p, i) => (
          <Reveal key={p.name} delay={(i % 5) * 0.05}>
            <div className="tech-card flex h-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl border border-line bg-white px-4 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-brand-700">
                {p.tag}
              </span>
              <p className="mt-1 text-sm font-semibold leading-snug text-ink">{p.name}</p>
              {p.nameEn && <p className="text-[0.7rem] text-ink-muted">{p.nameEn}</p>}
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-5 text-center text-xs text-ink-muted">
        {note}
      </p>
    </div>
  );
}
