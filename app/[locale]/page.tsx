import Image from "next/image";
import { HomeHero } from "@/components/sections/HomeHero";
import { Section } from "@/components/sections/Section";
import { DualCore } from "@/components/sections/DualCore";
import { ProblemCards } from "@/components/sections/ProblemCards";
import { CapabilityBento } from "@/components/sections/CapabilityBento";
import { AIShowcase } from "@/components/sections/AIShowcase";
import { HomeTrust } from "@/components/sections/HomeTrust";
import { AudiencePaths } from "@/components/sections/AudiencePaths";
import { TrustBadgeBar } from "@/components/sections/TrustBadgeBar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { WorkflowDiagram } from "@/components/sections/WorkflowDiagram";
import { CTASection } from "@/components/sections/CTASection";
import { getWhyUs } from "@/data/services";
import { getCtas } from "@/data/site";
import { assetPath } from "@/lib/asset-path";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "zh-TW";
  const en = locale === "en";
  const t = (zh: string, eng: string) => (en ? eng : zh);
  const ctas = getCtas(locale);
  const whyUs = getWhyUs(locale);
  const href = (path: string) => `/${locale}${path}`;

  return (
    <>
      {/* 1 · Hero (dark) */}
      <HomeHero locale={locale} />

      {/* 2 · Credibility strip — verified standards & clearances */}
      <TrustBadgeBar locale={locale} />

      {/* 2b · Dual-core positioning — Liger platform + DeepBT flagship */}
      <Section>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Platform + Flagship"
            title={t("一個平台，一個旗艦應用", "One platform, one flagship application")}
            titleEn="Liger MedAI Platform × DeepBT® Brain Tumor AI"
            className="mb-10"
          />
        </Reveal>
        <DualCore locale={locale} />
      </Section>

      {/* 3 · Clinical problem (soft) */}
      <Section bg="soft">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Clinical Problem"
            title={t("腦部腫瘤放射治療流程的三個瓶頸", "Three bottlenecks in brain tumor radiotherapy workflows")}
            titleEn={t("為什麼圈註與流程整合如此重要", "Why contouring and workflow integration matter")}
            className="mb-10"
          />
        </Reveal>
        <ProblemCards locale={locale} />
      </Section>

      {/* 4 · Solution — key capabilities bento (white) */}
      <Section>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="The Solution"
            title={t("一套為臨床打造的 AI 輔助圈註系統", "An AI-assisted contouring system built for clinical use")}
            titleEn="DeepBT Detector-Plus · key capabilities"
            className="mb-10"
          />
        </Reveal>
        <CapabilityBento locale={locale} />
      </Section>

      {/* 5 · Workflow (soft) */}
      <Section bg="soft">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="How It Works"
            title={t("從 MRI 到治療計畫的六步流程", "A six-step workflow from MRI to treatment planning")}
            titleEn={t("從 MRI 到治療計畫支援", "From MRI to treatment-planning support")}
            className="mb-10"
          />
        </Reveal>
        {/* clinical scenario image — AI assists, the physician stays in the loop */}
        <Reveal delay={0.05}>
          <figure className="relative mx-auto mb-12 max-w-4xl overflow-hidden rounded-2xl border border-line bg-white shadow-xl shadow-brand-900/8">
            <Image
              src={assetPath("/images/hero-ai-assisted.png")}
              alt={t(
                "醫師於工作站審閱 AI 輔助之腦部 MRI 圈註、分割遮罩與報告草稿的臨床情境示意",
                "Clinical scenario showing a physician reviewing AI-assisted brain MRI contours, segmentation masks and report drafts at a workstation",
              )}
              width={2600}
              height={1450}
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="h-auto w-full"
            />
            <span
              aria-hidden
              className="anim-scan pointer-events-none absolute inset-x-3 top-3 h-12 bg-gradient-to-b from-transparent via-accent-300/14 to-transparent"
            />
            <figcaption className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand-950/70 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-accent-200 backdrop-blur-md">
              <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-400" />
              AI-assisted · Physician-led review
            </figcaption>
          </figure>
        </Reveal>
        <WorkflowDiagram locale={locale} />
        <div className="mt-10 flex justify-center">
          <Button href={href("/clinical-workflow")} variant="secondary" arrow>
            {t("查看臨床流程整合", "View clinical workflow integration")}
          </Button>
        </div>
      </Section>

      {/* 6 · Core technology showcase (dark, image-rich) */}
      <AIShowcase locale={locale} />

      {/* 6 · Trust — regulatory + validation scope (white) */}
      <Section>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Trust & Evidence"
            title={t("為什麼醫院與夥伴信任 DeepBT", "Why hospitals and partners trust DeepBT")}
            titleEn={t("已取證、已驗證，並建立於真實臨床經驗", "Cleared, validated, built on real clinical experience")}
            className="mb-10"
          />
        </Reveal>
        <Reveal delay={0.05}>
          <HomeTrust locale={locale} />
        </Reveal>
      </Section>

      {/* 7 · Who it's for — audience paths (soft) */}
      <Section bg="soft">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Who It's For"
            title={t("為不同角色提供清楚的下一步", "Clear next steps for every stakeholder")}
            titleEn={t("為臨床醫師、醫院、SaMD 團隊與合作夥伴而設計", "Built for clinicians, hospitals, SaMD teams and partners")}
            className="mb-10"
          />
        </Reveal>
        <AudiencePaths locale={locale} />
      </Section>

      {/* 8 · SaMD consulting (dark) */}
      <Section bg="dark" className="seam-top tech-grid-motion">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="SaMD Consulting"
              title={t(
                "不只懂法規，更實際完成 AI SaMD 取證",
                "Regulatory expertise backed by real AI SaMD clearance experience",
              )}
              titleEn={t("從產品開發到法規取證", "From product development to regulatory clearance")}
              description={t(
                "我們具備自有 AI SaMD 產品從研發、醫院導入、臨床驗證到 TFDA 與 FDA 510(k) 取證的實戰經驗，協助醫療 AI 團隊走向臨床落地。",
                "We bring hands-on experience taking our own AI SaMD products from development and hospital deployment through clinical validation to TFDA and U.S. FDA 510(k) clearance, helping medical-AI teams reach clinical deployment.",
              )}
            />
            <div className="mt-7">
              <Button href={href("/samd-services")} variant="accent" arrow>
                {t("了解 SaMD 顧問服務", "Explore SaMD consulting services")}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-3">
              {whyUs.slice(0, 4).map((w) => (
                <li
                  key={w}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-brand-100/90"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-300">
                    <Icon name="check" size={13} />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 9 · CTA (dark) */}
      <CTASection
        title={t(
          "與智德萬一起，將腦部腫瘤 AI 推進至臨床",
          "Bring brain tumor AI into clinical workflows with AItewan",
        )}
        description={t(
          "無論您是想導入 AI 輔助圈註的醫療院所，或需要 SaMD 取證輔導的醫療 AI 團隊，我們都能提供從產品規劃、臨床流程整合到法規落地的協助。",
          "Whether you are a healthcare institution adopting AI-assisted contouring or a medical-AI team seeking SaMD regulatory support, we can help from product planning and clinical workflow integration through regulatory clearance.",
        )}
        primary={ctas.demo}
        secondary={[ctas.hospital, ctas.samd]}
      />
    </>
  );
}
