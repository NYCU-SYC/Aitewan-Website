import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { CTASection } from "@/components/sections/CTASection";
import { getAwardsDetailed, getMilestones, getEvents } from "@/data/recognition";
import { getCtas } from "@/data/site";
import { assetPath } from "@/lib/asset-path";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("awards", params);
}

export default async function AwardsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "zh-TW";
  const en = locale === "en";
  const t = (zh: string, eng: string) => (en ? eng : zh);
  const awards = getAwardsDetailed(locale);
  const milestones = getMilestones(locale);
  const events = getEvents(locale);
  const ctas = getCtas(locale);

  return (
    <>
      <PageHero
        eyebrow="Awards & Milestones"
        title={t("獎項肯定與發展里程碑", "Awards & milestones")}
        titleEn="Recognition for innovation, clinical translation and commercialization"
        description={t(
          "從學研新創到 AI SaMD 商業化，智德萬的技術與平台持續獲得國家級獎項與產業肯定，並透過國內外展會推廣 Liger 平台與 DeepBT® 腦瘤 AI。",
          "From academic spin-off to AI SaMD commercialization, AItewan's technology and platform have earned national awards and industry recognition, and showcase the Liger platform and DeepBT® brain-tumor AI at exhibitions at home and abroad.",
        )}
        badges={[
          { icon: "award", label: t("國家新創獎", "National Innovation Award") },
          { icon: "award", label: t("智慧創新大賞入圍", "Smart Innovation finalist") },
          { icon: "sparkles", label: "InnoVEX 2026" },
        ]}
      />

      {/* Awards with value statements */}
      <Section id="awards" bg="soft">
        <Reveal>
          <SectionHeading
            eyebrow="Awards & Recognition"
            title={t("獎項與肯定", "Awards & recognition")}
            titleEn="Each award reflects a distinct kind of value"
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={(i % 2) * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/5 sm:flex-row">
                <div className="relative flex w-full shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-accent-50 p-4 sm:w-44">
                  {a.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={assetPath(a.image)}
                      alt={a.title}
                      loading="lazy"
                      decoding="async"
                      className="max-h-44 w-auto rounded object-contain shadow-sm ring-1 ring-black/5"
                    />
                  ) : (
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm ring-1 ring-brand-100">
                      <Icon name="award" size={34} />
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent-700">{a.year}</span>
                  <h3 className="mt-1 text-base font-semibold leading-snug text-ink">{a.title}</h3>
                  <p className="mt-0.5 text-xs text-ink-muted">{a.issuer}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{a.value}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Milestones timeline */}
      <Section id="milestones">
        <Reveal>
          <SectionHeading
            eyebrow="Milestones"
            title={t("發展里程碑", "Company milestones")}
            titleEn="Regulatory, product and recognition timeline"
            className="mb-10"
          />
        </Reveal>
        <ol className="relative ml-3 border-l-2 border-brand-100">
          {milestones.map((m, i) => (
            <Reveal key={m.date + i} delay={(i % 4) * 0.05}>
              <li className="mb-8 ml-6 last:mb-0">
                <span className="absolute -left-[0.6rem] flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-600 ring-4 ring-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <p className="text-sm font-bold tabular text-brand-700">{m.date}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{m.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Events / exhibitions gallery */}
      <Section id="events" bg="soft">
        <Reveal>
          <SectionHeading
            eyebrow="Events & Exhibitions"
            title={t("展會與活動", "Events & exhibitions")}
            titleEn="InnoVEX 2026, Smart Innovation Award exhibition and more"
            description={t(
              "我們於國內外展會推廣 Liger 平台與 DeepBT® 腦瘤 AI，與臨床、產業與投資夥伴交流。",
              "We showcase the Liger platform and DeepBT® brain-tumor AI at exhibitions, engaging clinical, industry and investment partners.",
            )}
            className="mb-10"
          />
        </Reveal>
        <ImageGallery items={events} columns={3} aspect="landscape" closeLabel={t("關閉", "Close")} />
      </Section>

      <CTASection
        title={t("想了解更多合作與導入機會？", "Want to explore collaboration or deployment?")}
        description={t(
          "歡迎洽詢醫療院所導入、研究合作，或投資與商業合作。",
          "Reach out about hospital deployment, research collaboration, or investment and business partnerships.",
        )}
        primary={ctas.contact}
        secondary={[ctas.hospital, ctas.invest]}
      />
    </>
  );
}
