import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ComplianceNotice } from "@/components/ui/ComplianceNotice";
import { CTASection } from "@/components/sections/CTASection";
import { getCtas } from "@/data/site";
import { isLocale, localizeHref } from "@/lib/i18n";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("deepbt-detector", params);
}

/**
 * Phase 1 skeleton（規格書 routing /products/deepbt-detector）。
 * TODO(content): 待公司提供 Detector 之 intended use、輸入/輸出規格與
 * 與 Detector-Plus 之差異表後，補上 ProductComparisonCard 區塊。
 */
export default async function DetectorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh-TW";
  const ctas = getCtas(locale);

  return (
    <>
      <PageHero
        eyebrow="DeepBT Detector"
        title="AI 輔助腦部腫瘤偵測系統"
        titleEn="DeepBT Detector · First-generation TFDA-registered product"
        description="DeepBT 系列第一代取證產品，2023 年通過台灣 TFDA 第二類醫療器材查驗登記，奠定 DeepBT 系列於腦部腫瘤 AI 輔助分析之基礎。"
        badges={[
          { icon: "shield", label: "2023 TFDA 二類查驗登記" },
          { icon: "brain", label: "腦部腫瘤 AI 輔助偵測" },
        ]}
      />
      <Section>
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-line-strong bg-surface-soft p-8 text-center">
            <p className="text-sm font-semibold text-ink">產品詳細規格整理中</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              本頁為產品家族預留頁。Detector 與 Detector-Plus 之完整差異比較（適應症、輸入序列、輸出物件、部署方式）將於內容確認後上線。
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button href={localizeHref("/zh-TW/products/deepbt-detector-plus", locale)} arrow>
                查看 DeepBT Detector-Plus
              </Button>
            </div>
          </div>
        </Reveal>
        <ComplianceNotice className="mx-auto mt-8 max-w-2xl" />
      </Section>
      <CTASection
        title="想了解 DeepBT 系列的導入方式？"
        description="歡迎與我們聯繫，取得產品比較與導入評估建議。"
        primary={ctas.contact}
        secondary={[ctas.demo]}
      />
    </>
  );
}
