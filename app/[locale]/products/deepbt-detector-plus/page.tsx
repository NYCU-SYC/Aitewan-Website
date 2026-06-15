import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { VideoDemoCard } from "@/components/sections/VideoDemoCard";
import { InputOutputPipeline } from "@/components/sections/InputOutputPipeline";
import { CTASection } from "@/components/sections/CTASection";
import { ComplianceNotice } from "@/components/ui/ComplianceNotice";
import { keyFeatures, tumorTypes, processSteps, productIntro } from "@/data/product";
import { hospitals } from "@/data/evidence";
import { compliance, getCtas } from "@/data/site";
import { assetPath } from "@/lib/asset-path";
import { isLocale, localizeHref } from "@/lib/i18n";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("deepbt-detector-plus", params);
}

/** 醫療器材標示風格之合規聲明（Phase 3 產品頁 §7）。 */
const labelingPoints = [
  "DeepBT Detector-Plus 為 AI 輔助工具（AI-assisted tool）。",
  "本系統並非獨立診斷工具（not an independent diagnostic tool）。",
  "AI 產生之輪廓為初步參考，須由合格醫療專業人員審閱、確認或修改。",
  "最終臨床判斷與治療計畫仍由合格醫療專業人員負責。",
];

export default async function ProductPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh-TW";
  const ctas = getCtas(locale);

  return (
    <>
      <PageHero
        eyebrow="DeepBT Detector-Plus"
        title="AI 輔助腦部腫瘤圈註系統"
        titleEn="AI-Assisted Brain Tumor Contouring System"
        description="協助醫療專業人員針對已診斷成人腦部腫瘤產生初步腫瘤輪廓，支援放射治療計畫前置作業與 DICOM-based clinical workflow integration。"
        badges={[
          { icon: "shield", label: "TFDA 二類醫材查驗登記" },
          { icon: "badge", label: "FDA 510(k) K252190" },
          { icon: "stethoscope", label: "Physician-led review" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={ctas.demo.href} arrow>
            {ctas.demo.label}
          </Button>
          <Button href={localizeHref("/zh-TW/clinical-workflow", locale)} variant="secondary">
            查看臨床工作流程
          </Button>
          <Button href={localizeHref("/zh-TW/evidence-regulatory", locale)} variant="ghost">
            FDA / TFDA 里程碑
          </Button>
        </div>
      </PageHero>

      {/* Overview */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Overview"
              title="為放射治療計畫流程設計的 AI 輔助圈註"
              titleEn="Preliminary contouring for diagnosed adult brain tumors"
              description={productIntro.zh}
            />
            <ComplianceNotice variant="product" className="mt-6" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-brand-950 shadow-xl shadow-brand-900/15">
                <Image
                  src={assetPath("/images/brain-3d.png")}
                alt="3D 腦部模型與 AI 標示之腫瘤區域示意"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 520px, 100vw"
                className="h-auto w-full"
              />
              <span
                aria-hidden
                className="anim-scan absolute inset-x-2 h-10 bg-gradient-to-b from-transparent via-accent-300/12 to-transparent"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand-950/70 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent-300 backdrop-blur-md">
                <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-400" />
                AI-assisted contouring
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* What it does — 3 steps */}
      <Section bg="soft">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="What It Does"
            title="DeepBT Detector-Plus 做什麼"
            titleEn="Receive MRI → Generate preliminary contours → Export DICOM for review"
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {processSteps.map((s, i) => (
            <Reveal key={s.step} delay={(i % 3) * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
                <span aria-hidden className="card-accent" />
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <span className="text-2xl font-bold tabular-nums text-line-strong">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{s.title}</h3>
                <p className="mt-0.5 text-xs font-medium text-accent-700">{s.titleEn}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Cleared tumor categories */}
      <Section>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Cleared Tumor Categories"
            title="三類取證腫瘤類別"
            titleEn="Brain metastases · Meningiomas · Acoustic neuromas"
            description="僅針對已診斷之成人腦部腫瘤提供初步輪廓輔助。"
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {tumorTypes.map((t, i) => (
            <Reveal key={t.nameEn} delay={(i % 3) * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-lg">
                <span aria-hidden className="card-accent" />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-accent-700 text-white shadow-sm">
                  <Icon name="brain" size={24} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{t.name}</h3>
                <p className="mt-0.5 text-sm font-medium text-accent-700">{t.nameEn}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.note}</p>
                <p className="mt-4 rounded-lg bg-surface-soft px-3 py-2 text-xs leading-relaxed text-ink-muted">
                  已診斷成人腦部腫瘤之初步輪廓輔助；結果須由醫療專業人員審閱。
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* MRI input → inference → DICOM output */}
      <Section bg="soft">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Input · Inference · Output"
            title="MRI 輸入與 DICOM 輸出"
            titleEn="Bi-parametric MRI in, standardized DICOM objects out"
            className="mb-12"
          />
        </Reveal>
        <InputOutputPipeline />
      </Section>

      {/* Key features */}
      <Section>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Key Features"
            title="產品特色"
            titleEn="Six capabilities of DeepBT Detector-Plus"
            className="mb-10"
          />
        </Reveal>
        <FeatureGrid features={keyFeatures} />
      </Section>

      {/* Demo video */}
      <Section id="demo" bg="soft">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Demonstration"
              title="DeepBT Detector-Plus 腦瘤 AI 圈註展示"
              titleEn="AI-generated preliminary contours reviewed in a treatment planning workflow"
              className="mb-8"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <VideoDemoCard caption="本影片展示 DeepBT Detector-Plus 於治療計畫系統中呈現 AI 輔助腦部腫瘤初步圈註結果之流程。AI 產生之輪廓僅作為輔助參考，所有結果皆須由合格醫療專業人員審閱、確認或修改後，方可用於後續治療計畫流程。" />
          </Reveal>
        </div>
      </Section>

      {/* Clinical deployment + labeling */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Clinical Deployment"
            title="臨床導入經驗"
            titleEn="Used in major medical centers in Taiwan"
            description="透過真實醫療場域導入，持續優化 AI 推論、DICOM 輸出與臨床審閱流程。"
            className="mb-8"
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {hospitals.map((h, i) => (
            <Reveal key={h.nameEn} delay={i * 0.08}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-5 shadow-sm">
                <Icon name="hospital" size={22} className="mt-0.5 shrink-0 text-brand-700" />
                <div>
                  <p className="text-sm font-semibold text-ink">{h.name}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">{h.nameEn}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          以文字列名呈現（醫院 logo 待正式授權後上線）。
        </p>

        {/* Medical-device-labeling style compliance panel */}
        <Reveal delay={0.1}>
          <div className="mt-14 rounded-2xl border border-line bg-surface-soft p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-700 shadow-sm">
                <Icon name="shield" size={20} />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-ink">使用限制與合規聲明</h2>
                <p className="text-xs text-ink-muted">Intended Use & Compliance Statement</p>
              </div>
            </div>
            <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {labelingPoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[0.83rem] leading-relaxed text-ink-soft">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-600" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-ink-muted">
              {compliance.shortEn}
            </p>
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="想為您的團隊導入 DeepBT Detector-Plus？"
        description="歡迎申請產品展示，或與我們討論 DICOM 臨床流程整合與導入細節。"
        primary={ctas.demo}
        secondary={[
          { label: "查看臨床工作流程", href: localizeHref("/zh-TW/clinical-workflow", locale) },
          ctas.contact,
        ]}
      />
    </>
  );
}
