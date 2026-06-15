import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { LigerArchitecture } from "@/components/sections/LigerArchitecture";
import { CTASection } from "@/components/sections/CTASection";
import { getCtas } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("liger-platform", params);
}

export default async function LigerPlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "zh-TW";
  const en = locale === "en";
  const t = (zh: string, eng: string) => (en ? eng : zh);
  const ctas = getCtas(locale);
  const href = (p: string) => `/${locale}${p}`;

  const painPoints: { icon: IconName; zh: string; en: string }[] = [
    { icon: "workflow", zh: "DICOM／PACS 串接複雜，每個 AI 都要重做整合", en: "Complex DICOM/PACS integration — every AI is re-integrated from scratch" },
    { icon: "layers", zh: "影像傳輸與 AI 運算流程不連貫", en: "Disjointed image transfer and AI computation flow" },
    { icon: "file", zh: "AI 結果無法以標準格式回到臨床系統", en: "AI results cannot return to clinical systems in standard formats" },
    { icon: "cpu", zh: "不同 AI 模型缺乏統一部署與管理機制", en: "No unified deployment or management across different AI models" },
    { icon: "lock", zh: "使用紀錄與稽核資料不足", en: "Insufficient usage logs and audit trails" },
    { icon: "target", zh: "導入多個 AI 模組時產生重複串接與維運負擔", en: "Adding multiple AI modules creates duplicated integration and maintenance" },
  ];

  const capabilities: { icon: IconName; titleZh: string; titleEn: string; zh: string; en: string }[] = [
    { icon: "workflow", titleZh: "DICOM / PACS / FHIR 標準串接", titleEn: "DICOM / PACS / FHIR integration", zh: "以國際醫療資訊標準為基礎，支援標準 DICOM 通訊、DICOM 影像輸入輸出與 FHIR 資料交換，降低醫院端 AI 導入與系統整合門檻。", en: "Built on international healthcare-IT standards: standard DICOM communication, DICOM image I/O and FHIR data exchange — lowering the bar for hospital AI adoption and integration." },
    { icon: "cpu", titleZh: "AI 模型部署與編排", titleEn: "AI model deployment & orchestration", zh: "統一管理 AI 模型部署、影像接收、任務派送與運算流程，使不同模型可在同一平台架構下被部署、編排與擴充。", en: "Unified management of model deployment, image ingest, task dispatch and computation, so different models are deployed, orchestrated and scaled on one platform." },
    { icon: "review", titleZh: "臨床工作流程整合", titleEn: "Clinical workflow integration", zh: "自動接收影像、背景完成運算，並將結果回傳至 PACS、Viewer 或工作站，讓 AI 融入醫師既有日常流程，而非停留於獨立軟體。", en: "Auto-receives images, runs inference in the background and returns results to PACS, the viewer or workstation — embedding AI into physicians' existing workflow rather than a standalone tool." },
    { icon: "lock", titleZh: "稽核與可追溯性", titleEn: "Audit & traceability", zh: "完整的使用紀錄與稽核資料，支援品質監測、責任歸屬與上市後監督，符合醫療器材軟體的治理要求。", en: "Complete usage logs and audit data supporting quality monitoring, accountability and post-market surveillance — aligned with medical-device software governance." },
    { icon: "layers", titleZh: "多模組可擴充架構", titleEn: "Multi-module scalability", zh: "不僅承載 DeepBT®，也可整合其他公司或研究團隊的醫學影像 AI，形成跨廠牌、多模組、可擴充的整合架構。", en: "Beyond hosting DeepBT®, Liger can integrate medical-imaging AI from other companies or research teams — a cross-vendor, multi-module, scalable architecture." },
    { icon: "shield", titleZh: "取證之平台基礎架構", titleEn: "A cleared platform backbone", zh: "Liger 本身即為已取得 TFDA 第二類醫療器材許可（第008624號）的平台，提供醫院端導入多種 AI SaMD 的合規共同基礎設施。", en: "Liger is itself a TFDA Class II cleared platform (No. 008624) — a compliant, shared backbone for adopting many AI SaMD modules in hospitals." },
  ];

  const futureModules: { icon: IconName; zh: string; en: string }[] = [
    { icon: "brain", zh: "腦部異常分析", en: "Brain abnormality analysis" },
    { icon: "mri", zh: "肺結節偵測", en: "Lung nodule detection" },
    { icon: "chart", zh: "肺癌追蹤", en: "Lung cancer follow-up" },
    { icon: "stethoscope", zh: "冠狀動脈鈣化風險", en: "Coronary calcium risk" },
    { icon: "target", zh: "主動脈瘤偵測", en: "Aortic aneurysm detection" },
    { icon: "layers", zh: "肺栓塞偵測", en: "Pulmonary embolism detection" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Liger MedAI Platform"
        title={t("Liger 醫學影像 AI 整合平台", "Liger Medical Imaging AI Platform")}
        titleEn={t("醫院端醫學影像 AI 導入、部署與維運的取證基礎架構", "A cleared backbone for deploying and operating medical-imaging AI in hospitals")}
        description={t(
          "Liger 讓醫學影像 AI 從「單一模型」進化為「可臨床落地、可維運、可擴充的醫院 AI 基礎架構」。平台串接 DICOM／PACS／FHIR，整合 AI 模型部署、影像運算、結果呈現、模型管理與稽核紀錄，並可承載 DeepBT® 等多個臨床 AI 模組。",
          "Liger turns medical-imaging AI from a single model into a deployable, maintainable and scalable hospital AI infrastructure. It connects DICOM/PACS/FHIR and integrates model deployment, imaging computation, result rendering, model management and audit logging — hosting DeepBT® and other clinical AI modules.",
        )}
        badges={[
          { icon: "shield", label: "TFDA Class II · 008624" },
          { icon: "workflow", label: "DICOM / PACS / FHIR" },
          { icon: "layers", label: t("多模組可擴充", "Multi-module") },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={href("/contact?intent=hospital")} variant="accent" arrow>
            {t("醫療院所導入諮詢", "Hospital deployment inquiry")}
          </Button>
          <Button href={href("/evidence-regulatory#regulatory")} variant="outline">
            {t("查看 TFDA 許可", "View TFDA clearance")}
          </Button>
        </div>
      </PageHero>

      {/* Pain points */}
      <Section id="why" bg="soft">
        <Reveal>
          <SectionHeading
            eyebrow="The problem"
            title={t("醫院導入醫學影像 AI 的實務痛點", "Why hospitals struggle to adopt imaging AI")}
            titleEn={t("單點式 AI 工具難以融入既有系統與流程", "Standalone AI tools rarely fit existing systems and workflows")}
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((p, i) => (
            <Reveal key={p.en} delay={(i % 3) * 0.07}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-caution-red/10 text-caution-red">
                  <Icon name={p.icon} size={18} />
                </span>
                <p className="text-sm leading-relaxed text-ink-soft">{t(p.zh, p.en)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Architecture diagram */}
      <Section id="architecture">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title={t("以 Liger 作為醫院 AI 導入的共同入口", "Liger as the common entry point for hospital AI")}
            titleEn={t("DICOM → AI 引擎 → PACS／Viewer／報告，統一於同一平台", "DICOM → AI engine → PACS / Viewer / report, on one managed platform")}
            description={t(
              "Liger 統一管理 AI 模型部署、影像接收、任務派送、結果呈現與資料回傳；醫院未來導入不同 AI 模組時，可降低重複串接、重複部署與重複維運成本。",
              "Liger centrally manages model deployment, image ingest, task dispatch, result rendering and data return — so adding new AI modules avoids duplicated integration, deployment and maintenance.",
            )}
            className="mb-10"
          />
        </Reveal>
        <Reveal>
          <LigerArchitecture locale={locale} />
        </Reveal>
      </Section>

      {/* Capabilities */}
      <Section id="capabilities" bg="soft">
        <Reveal>
          <SectionHeading
            eyebrow="Platform capabilities"
            title={t("平台核心能力", "Platform capabilities")}
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.titleEn} delay={(i % 3) * 0.07}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5">
                <span aria-hidden className="card-accent" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-accent-700 text-white shadow-sm">
                  <Icon name={cap.icon} size={24} />
                </div>
                <h3 className="mt-5 text-base font-semibold leading-snug text-ink">{t(cap.titleZh, cap.titleEn)}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{t(cap.zh, cap.en)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Multi-module scalability / roadmap */}
      <Section id="scalability">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Multi-module scalability"
              title={t("一個平台，承載多疾病、多模組 AI", "One platform, many disease modules")}
              titleEn={t("今日 DeepBT®，未來擴展至腦、心、肺影像 AI", "DeepBT® today; brain, cardiac and lung imaging AI next")}
              description={t(
                "以 Liger 為核心，公司持續發展更多腦、心、肺影像 AI SaMD，推動跨院部署與訂閱式服務。以下為發展方向，尚未取證或上市，將依法規流程逐步推進。",
                "With Liger at the core, AItewan continues to develop more brain, cardiac and lung imaging AI SaMD for cross-hospital deployment and subscription services. The items below are development directions — not yet cleared or marketed — advancing through the regulatory process.",
              )}
            />
            <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-review-amber/30 bg-review-amber/10 px-3 py-2 text-xs font-medium text-review-amber">
              <Icon name="compliance" size={14} />
              {t("研發方向 / Roadmap — 非已核准或已商用產品", "Roadmap — not cleared or commercialized products")}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-3">
              {futureModules.map((m) => (
                <div key={m.en} className="flex items-center gap-3 rounded-xl border border-line bg-white p-4 shadow-sm">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon name={m.icon} size={18} />
                  </span>
                  <span className="text-sm font-medium text-ink-soft">{t(m.zh, m.en)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* TFDA trust band */}
      <Section id="clearance" bg="soft">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-white p-6 text-center shadow-sm sm:flex-row sm:p-8 sm:text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/certifications/tfda-liger-platform-008624.jpg"
              alt={t("Liger 平台 TFDA 第二類醫療器材許可（008624）", "Liger platform TFDA Class II clearance (008624)")}
              loading="lazy"
              decoding="async"
              className="h-48 w-auto rounded-lg object-contain shadow-md ring-1 ring-line"
            />
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-200 bg-accent-50/70 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-wide text-accent-800">
                <Icon name="shield" size={12} />
                TFDA Class II · 008624
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                {t("平台本身即為取證之醫療器材", "The platform itself is a cleared medical device")}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
                {t(
                  "Liger 智慧醫療人工智慧整合管理平台已取得衛部醫器製字第008624號第二類醫療器材許可，是醫院端可信任的 AI 部署基礎架構。",
                  "The Liger intelligent medical-imaging AI management platform holds TFDA Class II clearance (License No. 008624) — a trustworthy AI deployment backbone for hospitals.",
                )}
              </p>
              <div className="mt-4">
                <Button href={href("/evidence-regulatory#certificates")} variant="secondary" size="sm" arrow>
                  {t("查看證書與法規里程碑", "View certificates & regulatory milestones")}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <CTASection
        title={t("讓醫學影像 AI 真正導入醫院流程", "Bring medical-imaging AI into real hospital workflows")}
        description={t(
          "歡迎洽詢 Liger 平台的院內部署、模組授權、訂閱式服務與多模組整合方案。",
          "Talk to us about on-premise deployment, module licensing, subscription service and multi-module integration on the Liger platform.",
        )}
        primary={ctas.hospital}
        secondary={[ctas.demo, ctas.samd]}
      />
    </>
  );
}
