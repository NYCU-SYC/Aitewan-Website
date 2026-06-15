import type { IconName } from "@/components/ui/Icon";

export type TrustBadge = { icon: IconName; label: string };

export const heroBadges: TrustBadge[] = [
  { icon: "shield", label: "台灣 TFDA 第二類醫療器材許可" },
  { icon: "badge", label: "美國 FDA 510(k) K252190 clearance" },
  { icon: "brain", label: "支援腦轉移瘤、腦膜瘤、聽神經瘤" },
  { icon: "hospital", label: "已導入台中榮總、新光醫院、台北榮總" },
  { icon: "workflow", label: "DICOM PR / RTSS 臨床流程整合" },
  { icon: "award", label: "未來科技獎、國家新創獎肯定" },
];

export type AudiencePath = {
  icon: IconName;
  audience: string;
  audienceEn: string;
  blurb: string;
  href: string;
  cta: string;
};

/** "I am a…" path selection (Enterprise Gateway pattern). */
export const audiencePaths: AudiencePath[] = [
  {
    icon: "hospital",
    audience: "醫院與臨床單位",
    audienceEn: "Hospitals & Clinical Teams",
    blurb: "導入 AI 輔助腦部腫瘤圈註，串接既有 PACS / TPS 與放射治療計畫流程。",
    href: "/zh-TW/clinical-workflow",
    cta: "了解臨床流程整合",
  },
  {
    icon: "compliance",
    audience: "醫療 AI / SaMD 團隊",
    audienceEn: "Medical AI / SaMD Teams",
    blurb: "TFDA、FDA 510(k)、ISO 13485、資安與臨床驗證的實戰取證輔導。",
    href: "/zh-TW/samd-services",
    cta: "了解 SaMD 顧問服務",
  },
  {
    icon: "chart",
    audience: "投資人與合作夥伴",
    audienceEn: "Investors & Partners",
    blurb: "了解公司定位、法規里程碑、獎項肯定與專利技術布局。",
    href: "/zh-TW/about",
    cta: "了解公司與里程碑",
  },
  {
    icon: "research",
    audience: "研究者與臨床醫師",
    audienceEn: "Researchers & Clinicians",
    blurb: "瀏覽腦瘤 AI、MRI segmentation 與放射治療相關同儕審查論文。",
    href: "/zh-TW/research-publications",
    cta: "瀏覽學術發表",
  },
];

/** Home section summaries (each links out to its dedicated page). */
export const homeAbout = {
  zh: "智德萬 AItewan 為國立陽明交通大學衍生之 AI 智慧醫療新創公司，核心技術源自腦部腫瘤 MRI 影像分析、深度學習自動圈註與 DICOM 臨床影像整合。我們致力於將醫學影像 AI 從研究成果推進至臨床可用、可審查、可整合的醫療器材產品。",
  en: "A National Yang Ming Chiao Tung University spin-off advancing brain-tumor imaging AI from research into clinically usable, reviewable, integrable medical-device software.",
};

/* ----------------------------- i18n getters ----------------------------- */

import type { Locale } from "@/lib/i18n";

const heroBadgesEn: TrustBadge[] = [
  { icon: "shield", label: "Taiwan TFDA Class II registration" },
  { icon: "badge", label: "U.S. FDA 510(k) K252190 clearance" },
  { icon: "brain", label: "Brain metastases · meningiomas · acoustic neuromas" },
  { icon: "hospital", label: "Deployed in major Taiwanese medical centers" },
  { icon: "workflow", label: "DICOM PR / RTSS workflow integration" },
  { icon: "award", label: "Future Tech Award · National Innovation Award" },
];

export const getHeroBadges = (l: Locale) => (l === "en" ? heroBadgesEn : heroBadges);
