import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { EvidenceCard } from "@/components/cards/EvidenceCard";
import { PatentCard } from "@/components/cards/PatentCard";
import { CertificateGallery } from "@/components/sections/CertificateGallery";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { MetricsGrid } from "@/components/sections/MetricsGrid";
import { StatStrip } from "@/components/sections/StatStrip";
import { CTASection } from "@/components/sections/CTASection";
import { ComplianceNotice } from "@/components/ui/ComplianceNotice";
import { getRegulatoryCards } from "@/data/regulatory";
import {
  validationMetrics,
  validationSummary,
  validationStats,
  hospitals,
} from "@/data/evidence";
import {
  getPatentAreas,
  getPatentIntro,
  getPatentCompliance,
  getPatentList,
  getPatentTableColumns,
  getPatentImages,
  getPatentStats,
  getMoatPillars,
} from "@/data/patents";
import { getCtas } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("evidence-regulatory", params);
}

export default async function EvidenceRegulatoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "zh-TW";
  const en = locale === "en";
  const t = <Z, E>(zh: Z, eng: E) => (en ? eng : zh);

  const stats = getPatentStats(locale);
  const patentList = getPatentList(locale);
  const patentColumns = getPatentTableColumns(locale);
  const moat = getMoatPillars(locale);
  const ctas = getCtas(locale);

  return (
    <>
      <PageHero
        eyebrow="Evidence & Regulatory"
        title={t("法規、品質與智慧財產", "Regulatory, Quality & Intellectual Property")}
        titleEn="Regulatory milestones, quality systems and IP portfolio"
        description={t(
          "以可查核的法規里程碑、品質系統與專利布局，支持 Liger 平台與 DeepBT® 腦瘤 AI 的可信度。每一項證據皆對應來源與審核狀態。",
          "Verifiable regulatory milestones, quality systems and patent strategy underpinning the credibility of the Liger platform and DeepBT® brain-tumor AI — each item tied to a source and review status.",
        )}
        badges={[
          { icon: "layers", label: "Liger TFDA · 008624" },
          { icon: "badge", label: "FDA 510(k) K252190" },
          { icon: "shield", label: "TFDA · 008460" },
          { icon: "quality", label: "ISO 13485 · IEC 62304" },
        ]}
      />

      {/* Certificate / license gallery (click any card to enlarge) */}
      <Section id="certificates" bg="soft">
        <Reveal>
          <SectionHeading
            eyebrow="Licenses & Certifications"
            title={t("證書與許可一覽", "Licenses & certifications")}
            titleEn="TFDA / FDA clearances, ISO 13485 and awards — view the documents"
            description={t(
              "點擊任一卡片可放大檢視證書圖檔；可依許可證、認證、獎項分類篩選。",
              "Click any card to enlarge the document; filter by license, certification or award.",
            )}
            className="mb-10"
          />
        </Reveal>
        <CertificateGallery locale={locale} />
      </Section>

      {/* Regulatory & quality evidence cards */}
      <Section id="regulatory">
        <Reveal>
          <SectionHeading
            eyebrow="Regulatory & Quality"
            title={t("法規與品質里程碑", "Regulatory & quality milestones")}
            titleEn="Certificate-grade evidence with sources and review status"
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {getRegulatoryCards(locale).map((card, i) => (
            <Reveal key={card.titleEn} delay={(i % 3) * 0.08}>
              <EvidenceCard card={card} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Validation snapshot */}
      <Section id="validation" bg="soft">
        <Reveal>
          <SectionHeading
            eyebrow="Multicenter Validation"
            title={t("多中心臨床驗證摘要", "Multicenter validation summary")}
            titleEn="Standalone performance (multinational, retrospective)"
            description={en ? validationSummary.en : validationSummary.zh}
            className="mb-8"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <StatStrip stats={validationStats} />
        </Reveal>
        <div className="mt-10">
          <MetricsGrid metrics={validationMetrics} gated />
        </div>
        <ComplianceNotice className="mt-6" />
      </Section>

      {/* Clinical deployment */}
      <Section id="deployment">
        <Reveal>
          <SectionHeading
            eyebrow="Clinical Deployment"
            title={t("臨床導入", "Clinical deployment")}
            titleEn="In use across major medical centers in Taiwan"
            className="mb-8"
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {hospitals.map((h, i) => (
            <Reveal key={h.nameEn} delay={i * 0.08}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-5 shadow-sm">
                <Icon name="hospital" size={22} className="mt-0.5 shrink-0 text-brand-700" />
                <div>
                  <p className="text-sm font-semibold text-ink">{en ? h.nameEn : h.name}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">{en ? h.name : h.nameEn}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          {t(
            "以文字列名呈現（醫院 logo 待正式授權後上線）。另有多家醫學中心洽談試用中。",
            "Listed by name (hospital logos pending authorization). Additional medical centers are in trial discussions.",
          )}
        </p>
      </Section>

      {/* Patents / IP — Technology Moat */}
      <Section id="patents" bg="soft">
        <Reveal>
          <SectionHeading
            eyebrow="Protected AI Infrastructure"
            title={t("技術護城河與智財布局", "Technology moat & IP portfolio")}
            titleEn="Not just a model — algorithm, workflow, platform and deployment are all protected"
            description={getPatentIntro(locale)}
            className="mb-10"
          />
        </Reveal>

        {/* portfolio scale */}
        <Reveal>
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {[
              { n: stats.granted, label: t("已獲證專利", "Patents granted") },
              { n: stats.pending, label: t("申請中專利", "Applications pending") },
              { n: stats.trademarks, label: t("商標權", "Trademarks") },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-white p-6 text-center shadow-sm">
                <p className="text-gradient-deep text-4xl font-bold tabular">{s.n}</p>
                <p className="mt-1 text-sm font-medium text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mb-10 text-center text-xs text-ink-muted">
            {t("專利布局區域：", "Filing regions: ")}
            {stats.regions.join(t("、", " · "))}
          </p>
        </Reveal>

        {/* moat pillars */}
        <div className="grid gap-5 sm:grid-cols-2">
          {moat.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <div className="flex h-full gap-4 rounded-2xl border border-line bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-accent-700 text-white">
                  <Icon name={p.icon} size={22} />
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-snug text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* patent areas */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {getPatentAreas(locale).map((area, i) => (
            <Reveal key={area.area} delay={(i % 3) * 0.08}>
              <PatentCard area={area} />
            </Reveal>
          ))}
        </div>

        {/* patent certificate gallery */}
        <Reveal>
          <h3 className="mb-5 mt-14 text-lg font-semibold text-ink">
            {t("代表性專利證書", "Representative patent certificates")}
          </h3>
        </Reveal>
        <ImageGallery items={getPatentImages(locale)} columns={4} aspect="portrait" closeLabel={t("關閉", "Close")} />

        {/* granted patent table */}
        <Reveal delay={0.08}>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-soft text-xs uppercase tracking-wide text-ink-muted">
                  {patentColumns.map((c) => (
                    <th key={c} className="px-4 py-3 font-semibold">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patentList.map((row, i) => (
                  <tr key={i} className="border-b border-line/70 last:border-0">
                    <td className="px-4 py-3 font-medium text-ink">{row.title}</td>
                    <td className="px-4 py-3 tabular text-ink-soft">{row.number}</td>
                    <td className="px-4 py-3 text-ink-soft">{row.region}</td>
                    <td className="px-4 py-3 text-ink-soft">{row.status}</td>
                    <td className="px-4 py-3 text-brand-700">{row.tech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-accent-100 bg-accent-50/60 p-4 text-xs leading-relaxed text-accent-900">
          <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-accent-700" />
          {getPatentCompliance(locale)}
        </p>
      </Section>

      <CTASection
        title={t("需要法規證據文件或專利合作洽詢？", "Need regulatory documentation or IP partnership?")}
        description={t(
          "歡迎索取 FDA / TFDA 取證說明、驗證資料摘要，或洽談技術授權與智慧財產合作。",
          "Request FDA / TFDA clearance documentation and validation summaries, or discuss technology licensing and IP collaboration.",
        )}
        primary={ctas.contact}
        secondary={[ctas.samd, ctas.patent]}
      />
    </>
  );
}
