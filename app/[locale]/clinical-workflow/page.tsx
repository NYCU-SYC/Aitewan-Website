import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { StickyWorkflow } from "@/components/sections/StickyWorkflow";
import { DicomNodes } from "@/components/sections/DicomNodes";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { VideoDemoCard } from "@/components/sections/VideoDemoCard";
import { CTASection } from "@/components/sections/CTASection";
import { ComplianceNotice } from "@/components/ui/ComplianceNotice";
import { workflowIntro, implementationBenefits } from "@/data/workflow";
import { ctas } from "@/data/site";
import { assetPath } from "@/lib/asset-path";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("clinical-workflow", params);
}

/** Physician review steps（Phase 3 工作流程頁 §4）。 */
const reviewFlow = [
  "AI 推論產生初步腫瘤輪廓（DICOM PR / RTSS）",
  "醫師於影像瀏覽器或 TPS 中檢視 AI 結果",
  "醫師確認、修改或重繪輪廓",
  "確認後之輪廓進入治療計畫前置作業",
];

export default async function WorkflowPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  void locale;

  return (
    <>
      <PageHero
        eyebrow="Clinical Workflow"
        title="為 PACS 與治療計畫流程整合而設計"
        titleEn="Designed for PACS and Treatment Planning Workflow Integration"
        description={workflowIntro.zh}
        badges={[
          { icon: "workflow", label: "DICOM PR / RTSS" },
          { icon: "hospital", label: "PACS / TPS 串接" },
          { icon: "review", label: "醫師審閱與確認" },
        ]}
      />

      {/* Overview diagram */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="End-to-End Flow"
            title="從 MRI 影像到治療計畫支援"
            titleEn="MRI → PACS / TPS → AI Inference → DICOM Output → Physician Review → Planning"
            className="mb-10"
          />
        </Reveal>
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-sm sm:p-5">
            <Image
              src={assetPath("/images/workflow-diagram.png")}
              alt="AI 輔助腦部腫瘤圈註串接臨床放射治療流程：影像擷取 → 影像匯入 → AI 輔助圈註 → 治療計畫 → 放射治療"
              width={1600}
              height={1067}
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="mx-auto h-auto w-full max-w-4xl rounded-xl"
            />
          </div>
        </Reveal>
      </Section>

      {/* Sticky scroll workflow */}
      <Section bg="soft">
        <Reveal>
          <SectionHeading
            eyebrow="Step by Step"
            title="六步驟臨床工作流程"
            titleEn="Scroll through the DeepBT clinical workflow"
            className="mb-12"
          />
        </Reveal>
        <StickyWorkflow />
      </Section>

      {/* DICOM-based integration */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="DICOM-Based Integration"
            title="以標準化 DICOM 物件串接臨床系統"
            titleEn="PACS · DeepBT · DICOM PR / RTSS · Physician review environment"
            description="產品白皮書指出，DeepBT Detector-Plus 可自 PACS 或 TPS 取得影像，執行 AI 推論後產生 DICOM Presentation State（PR）與 RT Structure Set（RTSS）輸出，供專家於治療計畫系統中審閱。"
            className="mb-10"
          />
        </Reveal>
        <DicomNodes />
      </Section>

      {/* Physician-led review + before/after */}
      <Section bg="soft">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Physician-Led Review"
              title="AI 不是最終決策者"
              titleEn="Preliminary contours, reviewed and confirmed by physicians"
              description="DeepBT 的定位是協助產生初步輪廓，由醫療專業人員進行審閱（review）、確認（confirm）與修改（modify）；最終臨床判斷與治療計畫仍由醫師負責。"
            />
            <ol className="mt-6 space-y-3 text-sm text-ink-soft">
              {reviewFlow.map((t, i) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
            <ComplianceNotice className="mt-6" />
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <BeforeAfterSlider />
              <p className="mt-3 text-center text-xs leading-relaxed text-ink-muted">
                拖曳或使用方向鍵比較「原始臨床檢視」與「AI 輔助檢視」示意。
                正式去識別化 MRI 前後對照素材確認後將更新（見 ASSETS_TODO）。
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Implementation benefits */}
      <Section>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Implementation Benefits"
            title="對醫院與臨床團隊的導入價值"
            titleEn="Why DICOM-based integration matters for clinical teams"
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {implementationBenefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
                <span aria-hidden className="card-accent" />
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700">
                  <Icon name={b.icon} size={22} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* TPS demo video */}
      <Section bg="soft">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="TPS Demonstration"
              title="於治療計畫系統中審閱 AI 結果"
              titleEn="Reviewing DeepBT contours in a TPS (e.g. Eclipse) workflow"
              className="mb-8"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <VideoDemoCard caption="本影片展示 DeepBT Detector-Plus 於治療計畫系統中呈現 AI 輔助腦部腫瘤初步圈註結果之流程。AI 產生之輪廓僅作為輔助參考，所有結果皆須由合格醫療專業人員審閱、確認或修改後，方可用於後續治療計畫流程。" />
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="在您的臨床工作流程中體驗 DeepBT Detector-Plus"
        description="與我們討論 DICOM 介面、PACS / TPS 串接、部署方式與臨床審閱流程整合細節。"
        primary={ctas.demo}
        secondary={[
          ctas.contact,
          { label: "查看產品頁", href: "/zh-TW/products/deepbt-detector-plus" },
          { label: "Evidence & Regulatory", href: "/zh-TW/evidence-regulatory" },
        ]}
      />
    </>
  );
}
