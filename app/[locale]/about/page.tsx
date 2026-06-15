import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CTASection } from "@/components/sections/CTASection";
import { YouTubeFacade } from "@/components/ui/YouTubeFacade";
import { getCtas } from "@/data/site";
import { getPartners } from "@/data/recognition";
import { isLocale, type Locale } from "@/lib/i18n";

const founders = [
  {
    name: "吳育德 特聘教授",
    nameEn: "Distinguished Professor Yu-Te Wu",
    role: "共同創辦人 · 技術源起",
    roleEn: "Co-founder · Technology origin",
    org: "國立陽明交通大學",
    orgEn: "National Yang Ming Chiao Tung University",
  },
  {
    name: "郭萬祐 醫師",
    nameEn: "Dr. Wan-Yuo Guo",
    role: "共同創辦人 · 臨床指導",
    roleEn: "Co-founder · Clinical guidance",
    org: "臺北榮民總醫院",
    orgEn: "Taipei Veterans General Hospital",
  },
];

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("about", params);
}

const capabilities: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "brain",
    title: "腦部腫瘤 MRI 影像分析",
    body: "以深度學習進行腦部 MRI 影像分析與腫瘤區域偵測，支援腦轉移瘤、腦膜瘤與聽神經瘤。",
  },
  {
    icon: "contour",
    title: "AI 自動圈註",
    body: "產生可供醫師審閱、確認或修改的初步腫瘤輪廓，降低人工圈註負擔。",
  },
  {
    icon: "workflow",
    title: "DICOM 臨床流程整合",
    body: "將 AI 結果以標準化 DICOM PR / RTSS 回到既有 PACS、TPS 與臨床影像工作流程。",
  },
  {
    icon: "target",
    title: "放射治療流程應用",
    body: "支援放射治療計畫前置作業與輪廓準備，銜接醫師既有臨床工作環境。",
  },
  {
    icon: "shield",
    title: "SaMD 產品化與取證",
    body: "累積台灣 TFDA 與美國 FDA 510(k) 取證經驗，理解 SaMD 從開發到送件的完整路徑。",
  },
  {
    icon: "quality",
    title: "品質系統與專利布局",
    body: "具備 ISO 13485 品質系統、醫材資安文件與多項 AI 醫療影像相關專利布局經驗。",
  },
];

const capabilitiesEn: typeof capabilities = [
  {
    icon: "brain",
    title: "Brain Tumor MRI Analysis",
    body: "Deep-learning MRI analysis and tumor-region detection for brain metastases, meningiomas and acoustic neuromas.",
  },
  {
    icon: "contour",
    title: "AI-Assisted Contouring",
    body: "Preliminary tumor contours that physicians can review, confirm or modify, reducing repetitive manual contouring work.",
  },
  {
    icon: "workflow",
    title: "DICOM Clinical Workflow Integration",
    body: "Standardized DICOM PR / RTSS output that returns AI results to existing PACS, TPS and clinical imaging workflows.",
  },
  {
    icon: "target",
    title: "Radiotherapy Workflow Support",
    body: "Contour preparation for radiotherapy planning while preserving the physician's familiar clinical review environment.",
  },
  {
    icon: "shield",
    title: "SaMD Productization and Clearance",
    body: "Hands-on Taiwan TFDA and U.S. FDA 510(k) clearance experience, with practical knowledge of the SaMD development-to-submission path.",
  },
  {
    icon: "quality",
    title: "Quality Systems and IP Strategy",
    body: "Experience with ISO 13485 quality systems, medical-device cybersecurity documentation and AI medical-imaging patent portfolios.",
  },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "zh-TW";
  const en = locale === "en";
  const t = (zh: string, eng: string) => (en ? eng : zh);
  const ctas = getCtas(locale);
  const partners = getPartners(locale);
  const capabilityItems = en ? capabilitiesEn : capabilities;
  const founderItems = founders.map((f) =>
    en ? { name: f.nameEn, role: f.roleEn, org: f.orgEn } : { name: f.name, role: f.role, org: f.org },
  );

  return (
    <>
      <PageHero
        eyebrow="About AItewan"
        title={t("關於智德萬 AItewan", "About AItewan BioMedical Technology Inc.")}
        titleEn={t(
          "將醫學影像 AI 從研究成果推進至臨床可用的醫療器材產品",
          "Translating medical-imaging AI into clinically usable, reviewable and integrated medical-device software",
        )}
        description={t(
          "將醫學影像 AI 從研究成果，推進至臨床可用、可審查、可整合的醫療器材產品。",
          "AItewan translates medical-imaging AI research into clinically usable, reviewable and workflow-integrated medical-device software.",
        )}
        badges={[
          { icon: "brain", label: t("陽明交大衍生新創", "NYCU spin-off startup") },
          { icon: "shield", label: t("TFDA · FDA 510(k) 取證經驗", "TFDA · FDA 510(k) clearance experience") },
          { icon: "quality", label: t("ISO 13485 品質系統", "ISO 13485 quality system") },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="space-y-5 text-[1.0rem] leading-relaxed text-ink-soft">
            {en ? (
              <>
                <p>
                  AItewan BioMedical Technology Inc. is an AI medical-technology spin-off
                  approved by National Yang Ming Chiao Tung University. It was co-founded by{" "}
                  <strong className="text-ink">Distinguished Professor Yu-Te Wu</strong> and{" "}
                  <strong className="text-ink">Dr. Wan-Yuo Guo</strong>, with technology originating
                  from two National Science and Technology Council research-entrepreneurship programs.
                </p>
                <p>
                  The DeepBT product family focuses on AI-assisted brain tumor analysis, helping
                  clinical teams reduce repetitive contouring workload, improve contour-preparation
                  efficiency, and return AI results as standardized DICOM objects to existing PACS,
                  TPS and clinical imaging workflows for physician review, confirmation or
                  modification.
                </p>
                <p>
                  DeepBT has received the Future Tech Award, the National Innovation Award and the
                  National Innovation Elite Award, and has achieved Taiwan TFDA Class II registration
                  and U.S. FDA 510(k) clearance. Beyond its own products, AItewan provides practical
                  consulting and submission support for medical-AI and SaMD teams across regulatory
                  strategy, quality systems, clinical validation, cybersecurity documentation and
                  medical-device submissions.
                </p>
              </>
            ) : (
              <>
                <p>
                  智德萬 AItewan 生醫科技股份有限公司為國立陽明交通大學核准成立之衍生 AI
                  智慧醫療新創，由<strong className="text-ink">吳育德特聘教授</strong>與
                  <strong className="text-ink">郭萬祐醫師</strong>共同創立，技術源自國科會兩期科研創業計畫。核心產品
                  DeepBT 腦瘤輔助系統之技術，已與國立陽明交通大學及臺北榮民總醫院簽署專屬授權合約。
                </p>
                <p>
                  DeepBT 系列聚焦於腦部腫瘤 AI
                  輔助分析，協助醫療團隊降低人工圈註負擔、提升腫瘤輪廓準備效率，並讓 AI
                  結果以標準化 DICOM 物件回到既有 PACS、TPS
                  與臨床影像工作流程，由醫師審閱、確認或修改。
                </p>
                <p>
                  DeepBT 已獲<strong className="text-ink">未來科技獎</strong>、
                  <strong className="text-ink">國家新創獎與精進獎</strong>肯定，並通過台灣 TFDA
                  二類醫材查驗登記與美國 FDA 510(k) clearance。除自有產品外，智德萬亦以實戰經驗，提供醫療
                  AI 與 SaMD
                  團隊在法規策略、品質系統、臨床驗證、資安文件與國內外醫材送件上的專業諮詢與委託取證服務。
                </p>
              </>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-surface-soft p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-700">
                {t("使命與願景", "Mission and Vision")}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                {en ? (
                  <>
                    AItewan applies artificial intelligence to improve care quality, reduce physician
                    workload, and support <strong className="text-ink">faster, objective, quantitative and accurate</strong>{" "}
                    clinical care while advancing medical AI deployment and international expansion.
                  </>
                ) : (
                  <>
                    善用人工智慧提升醫療品質、減輕醫師負擔，為患者提供
                    <strong className="text-ink">快速、客觀、量化且準確</strong>
                    的照護；持續推動 AI 醫療的臨床落地與國際拓展，邁向亞洲領先的智慧醫療解決方案供應商。
                  </>
                )}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent-700">
                {t("公司定位", "Positioning")}
              </p>
              <ul className="mt-3 space-y-3 text-sm text-ink-soft">
                {(en
                  ? [
                      "Own AI SaMD product: DeepBT Detector-Plus",
                      "Taiwan TFDA Class II and U.S. FDA 510(k) clearance experience",
                      "Hospital deployment and clinical workflow integration experience",
                      "ISO 13485 quality system and medical-device cybersecurity documentation experience",
                    ]
                  : [
                      "自有 AI SaMD 產品 DeepBT Detector-Plus",
                      "TFDA 二類與美國 FDA 510(k) 取證經驗",
                      "醫院實際導入與臨床流程整合經驗",
                      "ISO 13485 品質系統與醫材資安文件經驗",
                    ]).map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section bg="soft">
        <Reveal>
          <SectionHeading
            eyebrow="Core Capabilities"
            title={t("核心能力", "Core capabilities")}
            titleEn={t("從影像 AI 到臨床整合", "From imaging AI to clinical integration")}
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityItems.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name={c.icon} size={22} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Founders & Partners"
            title={t("創辦團隊與合作醫療機構", "Founders and Medical Partners")}
            titleEn={t(
              "由學研與臨床領袖共同創立，並與醫學中心合作建構",
              "Founded by academic and clinical leaders; built with medical centers",
            )}
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {founderItems.map((f) => (
                <div key={f.name} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700">
                    <Icon name="brain" size={22} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{f.name}</h3>
                  <p className="mt-0.5 text-xs font-medium text-accent-700">{f.role}</p>
                  <p className="mt-2 text-sm text-ink-soft">{f.org}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-surface-soft p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-700">
                {t("合作醫療機構", "Medical Partners")}
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                {t(
                  "與多家台灣醫學中心於技術衍生、臨床合作與導入上持續合作：",
                  "AItewan continues to work with Taiwanese medical centers on technology translation, clinical collaboration and deployment:",
                )}
              </p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {partners.map((p) => (
                  <li key={p.name} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <Icon name="hospital" size={16} className="mt-0.5 shrink-0 text-brand-700" />
                    <span>
                      {p.name}
                      <span className="ml-1 text-[0.7rem] text-ink-muted">· {p.tag}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.7rem] leading-relaxed text-ink-muted">
                {t(
                  "部分醫院 logo 與正式授權尚待確認，目前以文字列名呈現。",
                  "Some hospital logos and formal authorization materials are still pending confirmation; partners are currently listed in text.",
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section bg="soft">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="In the Media"
              title={t("媒體報導與影片專區", "Media Coverage and Videos")}
              titleEn="Featured coverage of AItewan's brain-tumor AI"
              description={t(
                "智德萬的腦部腫瘤 AI 技術曾受媒體採訪報導。以下影片介紹公司的研發背景與 DeepBT 的臨床應用方向。",
                "AItewan's brain-tumor AI technology has been featured in media coverage. The video below introduces the company's R&D background and DeepBT's clinical application direction.",
              )}
            />
            <p className="mt-6 text-sm text-ink-muted">
              {t(
                "影片來源：公開媒體採訪 · 內容僅作公司介紹與技術說明，非醫療建議。",
                "Source: public media interview. The content is for company and technology introduction only and is not medical advice.",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <YouTubeFacade
              videoId="1pUaOUv1fUY"
              poster="/images/video-interview-poster.jpg"
              title={t(
                "台灣新視野採訪 — 智德萬 AItewan 腦部腫瘤 AI",
                "Taiwan New Vision interview — AItewan brain tumor AI",
              )}
            />
          </Reveal>
        </div>
      </Section>

      <CTASection
        title={t(
          "尋找腦部腫瘤 AI 產品或 SaMD 取證夥伴？",
          "Looking for a brain tumor AI product or SaMD regulatory partner?",
        )}
        description={t(
          "歡迎醫療院所、醫療 AI 團隊、投資人與合作夥伴與智德萬聯繫，我們將提供最貼近實務的協助。",
          "Healthcare institutions, medical-AI teams, investors and partners are welcome to contact AItewan for practical support grounded in real product and regulatory experience.",
        )}
        primary={ctas.contact}
        secondary={[ctas.product, ctas.samd, ctas.invest]}
      />
    </>
  );
}
