import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { DeepBtEvolution } from "@/components/sections/DeepBtEvolution";
import { MetricsGrid } from "@/components/sections/MetricsGrid";
import { StatStrip } from "@/components/sections/StatStrip";
import { CTASection } from "@/components/sections/CTASection";
import { ComplianceNotice } from "@/components/ui/ComplianceNotice";
import type { Metric } from "@/data/evidence";
import { getCtas } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("deepbt", params);
}

export default async function DeepBtPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "zh-TW";
  const en = locale === "en";
  const t = (zh: string, eng: string) => (en ? eng : zh);
  const ctas = getCtas(locale);
  const href = (p: string) => `/${locale}${p}`;

  const tumors: { icon: IconName; zh: string; en: string }[] = [
    { icon: "stethoscope", zh: "聽神經瘤 / 神經瘤", en: "Acoustic neuroma / schwannoma" },
    { icon: "brain", zh: "腦膜瘤", en: "Meningioma" },
    { icon: "target", zh: "腦轉移瘤", en: "Brain metastasis" },
    { icon: "contour", zh: "腦下垂體瘤", en: "Pituitary tumor" },
    { icon: "layers", zh: "膠質細胞瘤", en: "Glioma" },
  ];

  const pipeline: { zh: string; en: string }[] = [
    { zh: "腦瘤偵測", en: "Tumor detection" },
    { zh: "初始分割", en: "Initial segmentation" },
    { zh: "偽陽性過濾", en: "False-positive filtering" },
    { zh: "五類腦瘤分類", en: "5-class classification" },
    { zh: "腦區定位 / 腦實質內外判別", en: "Brain-region & intra/extra-axial localization" },
    { zh: "醫師覆核", en: "Physician review" },
    { zh: "腫瘤量測與追蹤", en: "Measurement & tracking" },
    { zh: "LLM 報告草稿生成", en: "LLM report drafting" },
  ];

  // DeepBT Detector A+ documented / internal-validation performance (gated).
  // On /en, label leads in English and labelEn carries the Chinese secondary line.
  const rawMetrics: Metric[] = [
    { value: 94.7, suffix: "%", decimals: 1, label: "病患層級敏感度", labelEn: "Patient-wise Sensitivity" },
    { value: 95.45, suffix: "%", decimals: 2, label: "特異度", labelEn: "Specificity" },
    { value: 90.13, suffix: "%", decimals: 2, label: "病灶層級敏感度", labelEn: "Lesion-wise Sensitivity" },
    { value: 0.41, suffix: "", decimals: 2, label: "每次掃描偽陽性", labelEn: "FP / scan" },
    { value: 0.84, suffix: "", decimals: 2, label: "Dice 係數", labelEn: "Dice Coefficient" },
    { value: 90.32, suffix: "%", decimals: 2, label: "五類腦瘤總體辨識率", labelEn: "5-class overall accuracy" },
  ];
  const metrics: Metric[] = en
    ? rawMetrics.map((m) => ({ ...m, label: m.labelEn, labelEn: m.label }))
    : rawMetrics;

  const opStats = [
    { value: "~36s", label: t("每筆推論時間", "Inference / case") },
    { value: "1,000+", label: t("已自動處理 MR 影像", "MR images auto-processed") },
    { value: "5.37→2.23", label: t("報告周轉天數（中位）", "Report turnaround (days, median)") },
    { value: "−58%", label: t("報告周轉時間降幅", "Turnaround reduction") },
  ];

  return (
    <>
      <PageHero
        eyebrow="DeepBT® Brain Tumor AI"
        title={t("DeepBT® 腦瘤 AI 智慧輔助系統", "DeepBT® Brain Tumor AI System")}
        titleEn={t("Liger 平台上的旗艦腦瘤 AI 臨床應用", "The flagship brain-tumor AI module on the Liger platform")}
        description={t(
          "DeepBT® 將腦瘤偵測、分割、分類、定位、量測、追蹤與報告草稿生成整合為端到端臨床輔助流程。Detector Plus 已取得美國 FDA 510(k) 與 TFDA 許可；第三代 Detector A+ 支援五類腦瘤，目前 TFDA 審查中。所有 AI 結果皆為輔助參考，醫師保有最終覆核、修正與確認權限。",
          "DeepBT® integrates tumor detection, segmentation, classification, localization, measurement, tracking and report drafting into an end-to-end clinical workflow. Detector Plus holds U.S. FDA 510(k) and TFDA clearance; the 3rd-generation Detector A+ supports five tumor types and is under TFDA review. All AI results are preliminary references — physicians retain final review and confirmation.",
        )}
        badges={[
          { icon: "badge", label: "FDA 510(k) · K252190" },
          { icon: "shield", label: "TFDA · 008460" },
          { icon: "brain", label: t("五類腦瘤（A+，審查中）", "5 tumor types (A+, in review)") },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={href("/contact?intent=hospital")} variant="accent" arrow>
            {t("申請臨床展示", "Request a clinical demo")}
          </Button>
          <Button href={href("/liger-platform")} variant="outline">
            {t("了解 Liger 平台", "Explore the Liger platform")}
          </Button>
        </div>
      </PageHero>

      {/* Generation evolution */}
      <Section id="evolution" bg="soft">
        <Reveal>
          <SectionHeading
            eyebrow="Product evolution"
            title={t("從 Detector 到 Detector A+ 的產品演進", "From Detector to Detector A+")}
            titleEn={t("三代演進：更多腦瘤類別、分類能力與 LLM 報告", "Three generations: more tumor types, classification and LLM reporting")}
            className="mb-10"
          />
        </Reveal>
        <Reveal>
          <DeepBtEvolution locale={locale} />
        </Reveal>
        <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-review-amber/30 bg-review-amber/10 px-3 py-2 text-xs font-medium text-review-amber">
          <Icon name="compliance" size={14} />
          {t(
            "DeepBT® Detector A+（第三代）目前為 TFDA 審查中，尚未取得查驗登記，相關效能為文件揭露 / 內部驗證數據。",
            "DeepBT® Detector A+ (Gen 3) is under TFDA review and not yet cleared; the performance shown is documented / internal-validation data.",
          )}
        </p>
      </Section>

      {/* Tumor types + bi-parametric MRI */}
      <Section id="capabilities">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Coverage"
              title={t("支援五類常見腦瘤", "Five common brain tumor types")}
              titleEn={t("偵測、標註與分類（Detector A+）", "Detection, contouring and classification (Detector A+)")}
              description={t(
                "相較多數僅支援單一腫瘤類型或單一任務的腦瘤 AI 產品，DeepBT® Detector A+ 具備更完整的疾病覆蓋與差異化臨床價值。",
                "Compared with most brain-tumor AI that supports a single tumor type or task, DeepBT® Detector A+ offers broader disease coverage and differentiated clinical value.",
              )}
            />
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tumors.map((tu) => (
                <div key={tu.en} className="flex items-center gap-3 rounded-xl border border-line bg-white p-4 shadow-sm">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon name={tu.icon} size={18} />
                  </span>
                  <span className="text-sm font-medium text-ink-soft">{t(tu.zh, tu.en)}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-center rounded-3xl border border-brand-800/40 bg-brand-950 p-7 text-white">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent-300/30 bg-white/[0.06] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-accent-200">
                <Icon name="layers" size={12} />
                {t("雙參數 MRI 輸入", "Bi-parametric MRI input")}
              </span>
              <h3 className="mt-4 text-xl font-semibold">T1W+C &nbsp;+&nbsp; T2W</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-100/85">
                {t(
                  "DeepBT® 採用 T1W+C 與 T2W 雙參數影像輸入，相較單參數影像輸入產品，具備更完整的影像資訊整合能力，並為核心專利保護之全球首創技術。",
                  "DeepBT® uses T1W+C and T2W bi-parametric input, integrating more imaging information than single-parameter products — a world-first, core patent-protected technique.",
                )}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
                  <p className="text-sm font-semibold text-accent-200">T1W+C</p>
                  <p className="mt-1 text-[0.7rem] text-brand-100/70">{t("顯影後 T1 加權", "Post-contrast T1")}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
                  <p className="text-sm font-semibold text-accent-200">T2W</p>
                  <p className="mt-1 text-[0.7rem] text-brand-100/70">{t("T2 加權", "T2-weighted")}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* End-to-end pipeline */}
      <Section id="pipeline" bg="soft">
        <Reveal>
          <SectionHeading
            eyebrow="End-to-end"
            title={t("不只是分割工具，而是端到端臨床輔助流程", "More than segmentation — an end-to-end clinical pipeline")}
            titleEn={t("偵測 → 分割 → 分類 → 定位 → 覆核 → 量測 → 報告", "Detect → segment → classify → locate → review → measure → report")}
            className="mb-10"
          />
        </Reveal>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pipeline.map((step, i) => (
            <Reveal key={step.en} delay={(i % 4) * 0.06}>
              <li className="relative h-full rounded-2xl border border-line bg-white p-5 shadow-sm">
                <span className="text-xs font-bold text-accent-600">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 text-sm font-semibold leading-snug text-ink">{t(step.zh, step.en)}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Performance (gated) */}
      <Section id="performance">
        <Reveal>
          <SectionHeading
            eyebrow="Documented performance"
            title={t("效能指標（Detector A+ · 文件揭露數據）", "Performance (Detector A+ · documented data)")}
            titleEn={t("內部 / 文件驗證數據 — 法規審查中", "Internal / documented validation — under regulatory review")}
            className="mb-8"
          />
        </Reveal>
        <MetricsGrid metrics={metrics} gated locale={locale} />
        <Reveal>
          <div className="mt-10">
            <StatStrip stats={opStats} />
          </div>
        </Reveal>
        <ComplianceNotice className="mt-6" locale={locale} />
      </Section>

      {/* Physician-in-the-loop */}
      <Section id="physician-review" bg="soft">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Physician in the loop"
              title={t("醫師與 AI 的雙向共創流程", "A two-way physician–AI workflow")}
              titleEn={t("AI 提出，醫師覆核、修正與確認", "AI proposes; the physician reviews, corrects and confirms")}
              description={t(
                "AI 推論結果可由醫師進行覆核、修正與確認；確認後的結果可形成可追溯資料，支援品質監測與後續產品優化。此設計使 AI 不只是單向輸出，而是能與臨床專業判斷銜接的閉環。",
                "AI inferences are reviewed, corrected and confirmed by physicians; confirmed results form traceable data supporting quality monitoring and product improvement — a closed loop that connects AI with clinical judgment.",
              )}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <div className="space-y-3">
                {[
                  { icon: "cpu" as IconName, zh: "AI 產生偵測、分割、分類與量測結果", en: "AI generates detection, segmentation, classification and measurements" },
                  { icon: "review" as IconName, zh: "醫師於既有 Viewer / 工作站覆核與修正", en: "Physician reviews and edits in the existing viewer / workstation" },
                  { icon: "check" as IconName, zh: "醫師確認後輸出標準化、可追溯報告草稿", en: "After confirmation, a standardized, traceable report draft is produced" },
                ].map((s) => (
                  <div key={s.en} className="flex items-start gap-3 rounded-xl border border-line bg-surface-soft/60 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-700 to-accent-700 text-white">
                      <Icon name={s.icon} size={18} />
                    </span>
                    <p className="text-sm leading-relaxed text-ink-soft">{t(s.zh, s.en)}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-xs font-medium text-brand-800">
                {t(
                  "醫師仍保有最後覆核、修正與確認權限，符合臨床 AI 輔助決策原則。",
                  "Physicians retain final review, correction and confirmation — consistent with AI-assisted clinical decision principles.",
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title={t("想在貴院流程中導入 DeepBT®？", "Want DeepBT® in your hospital workflow?")}
        description={t(
          "歡迎洽詢臨床導入、產品展示，或了解 DeepBT® 在 Liger 平台上的部署方式。",
          "Reach out about clinical deployment, a product demo, or how DeepBT® runs on the Liger platform.",
        )}
        primary={ctas.hospital}
        secondary={[ctas.demo, ctas.contact]}
      />
    </>
  );
}
