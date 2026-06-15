import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CTASection } from "@/components/sections/CTASection";
import { getCtas } from "@/data/site";
import { isLocale, localizeHref } from "@/lib/i18n";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("products", params);
}

const fitFor: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "target",
    title: "放射腫瘤科",
    body: "放射治療計畫前的腦部腫瘤輪廓準備與審閱。",
  },
  {
    icon: "brain",
    title: "放射科 / 神經影像",
    body: "腦部 MRI 腫瘤判讀與初步圈註之輔助參考。",
  },
  {
    icon: "contour",
    title: "立體定位放射手術（SRS / Gamma Knife）",
    body: "聽神經瘤、腦膜瘤與多發腦轉移瘤之靶區準備。",
  },
  {
    icon: "research",
    title: "研究與臨床合作",
    body: "腦瘤 AI 影像分析、驗證與臨床流程整合之合作。",
  },
];

const family = [
  {
    name: "DeepBT Detector-Plus",
    status: "旗艦產品",
    statusTone: "bg-valid-green/10 text-valid-green",
    desc: "AI 輔助腦部腫瘤圈註系統：三類取證腫瘤、bi-parametric MRI、DICOM PR / RTSS 輸出與縱向量化追蹤。已獲美國 FDA 510(k) clearance（K252190）與 TFDA 二類查驗登記。",
    href: "/zh-TW/products/deepbt-detector-plus",
    cta: "了解 Detector-Plus",
  },
  {
    name: "DeepBT Detector",
    status: "產品家族",
    statusTone: "bg-brand-50 text-brand-700",
    desc: "AI 輔助腦部腫瘤偵測系統，2023 年通過台灣 TFDA 二類醫材查驗登記，為 DeepBT 系列的第一代取證產品。",
    href: "/zh-TW/products/deepbt-detector",
    cta: "了解 Detector",
  },
];

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh-TW";
  const ctas = getCtas(locale);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="DeepBT 系列產品"
        titleEn="The DeepBT Product Family"
        description="聚焦腦部腫瘤 AI 輔助分析：從偵測（Detector）到圈註與量化分析（Detector-Plus），以標準化 DICOM 整合進入放射治療臨床流程。"
        badges={[
          { icon: "badge", label: "FDA 510(k) K252190" },
          { icon: "shield", label: "TFDA 二類查驗登記" },
          { icon: "workflow", label: "DICOM PR / RTSS 整合" },
        ]}
      />
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Product Family"
            title="兩代取證產品"
            titleEn="Two TFDA-registered generations"
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {family.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <Link
                href={localizeHref(p.href, locale)}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5"
              >
                <span aria-hidden className="card-accent" />
                <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide ${p.statusTone}`}>
                  {p.status}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-ink">{p.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                  {p.cta}
                  <Icon name="arrowRight" size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section bg="soft">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Who It's For"
            title="適用科別與場域"
            titleEn="Where DeepBT fits in clinical practice"
            description="DeepBT 設計用於協助以下臨床與研究情境；所有 AI 結果皆須由合格醫療專業人員審閱、確認或修改。"
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fitFor.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.07}>
              <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700">
                  <Icon name={f.icon} size={22} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="不確定哪個版本適合您的單位？"
        description="與我們聯繫，依據您的影像設備、PACS / TPS 環境與臨床需求提供建議。"
        primary={ctas.demo}
        secondary={[ctas.hospital, ctas.contact]}
      />
    </>
  );
}
