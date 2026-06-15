import type { IconName } from "@/components/ui/Icon";

export type ServiceCard = {
  icon: IconName;
  title: string;
  body: string;
};

export const samdServices: ServiceCard[] = [
  {
    icon: "shield",
    title: "TFDA 二類醫材取證輔導",
    body: "規劃 TFDA 第二類醫療器材送件策略，含產品屬性判定、預期用途撰寫、技術文件、風險管理文件、軟體驗證與確效、臨床評估資料整理與送件溝通。",
  },
  {
    icon: "badge",
    title: "美國 FDA 510(k) 取證輔導",
    body: "協助 510(k) 上市前通知準備，含 predicate device 分析、intended use / indications for use、software 與 cybersecurity documentation、performance / clinical validation 與 submission package 組織。",
  },
  {
    icon: "quality",
    title: "ISO 13485 品質系統建立",
    body: "建立 ISO 13485 品質管理系統，含設計開發流程、文件管制、供應商管理、風險管理、CAPA、變更管理、上市後監督與內部稽核準備。",
  },
  {
    icon: "file",
    title: "SaMD 軟體生命週期文件",
    body: "建立 SRS、software architecture / design、verification & validation、release note、known anomaly list、SOUP / 第三方元件管理與軟體維護計畫等文件架構。",
  },
  {
    icon: "lock",
    title: "TFDA 二類醫材資安檢測與文件輔導",
    body: "準備資安相關文件與檢測規劃，含 threat modeling、cybersecurity risk assessment、SBOM、滲透測試規劃、弱點修補紀錄、資安聲明與上市後資安維護流程。",
  },
  {
    icon: "chart",
    title: "AI 醫材臨床驗證與性能評估設計",
    body: "規劃臨床驗證資料集、ground truth 建立流程、統計分析方法、性能指標、subgroup analysis、reader review process 與臨床評估報告。",
  },
  {
    icon: "patent",
    title: "專利與產品技術布局諮詢",
    body: "從產品功能、演算法特色、臨床流程整合與商業化策略角度盤點可保護之技術重點，並與專利事務所或法務團隊合作建立 IP 布局策略。",
  },
];

export const servicesIntro = {
  zh: "除了自有產品 DeepBT Detector-Plus 的研發、臨床導入與國內外取證經驗外，智德萬亦提供醫療軟體與 AI SaMD 團隊專業的法規諮詢與委託取證服務，範圍涵蓋台灣 TFDA 第二類醫療器材、美國 FDA 510(k)、醫療器材品質系統、資安文件與臨床驗證規劃。",
  en: "Beyond developing and commercializing its own SaMD product, AItewan provides regulatory consulting and submission support for medical software and AI-based SaMD teams — covering Taiwan TFDA Class II strategy, U.S. FDA 510(k) preparation, QMS implementation, cybersecurity documentation, validation planning, and submission support.",
};

export const whyUs = [
  "我們不只懂法規，也實際完成 AI SaMD 取證",
  "我們不只做文件，也理解臨床流程與 DICOM 整合",
  "我們不只提供顧問，也能協助建立可落地的產品化策略",
  "我們具備 TFDA、FDA、ISO 13485、資安與專利布局實戰經驗",
  "從產品開發到醫院導入，協助醫療 AI 產品走向臨床",
];

export const whyUsBody = {
  zh: "智德萬並非單純法規顧問公司，而是具備自有 AI SaMD 產品研發、醫院導入、臨床驗證、品質系統、TFDA 取證、美國 FDA 510(k) clearance、資安文件準備與專利技術布局實戰經驗的醫療 AI 團隊。我們協助合作夥伴以更務實的方式規劃 SaMD 開發與取證路徑，降低重工風險、提升送件文件一致性，並讓產品設計、臨床驗證、品質系統、資安規劃、專利布局與法規策略能從早期開發階段即相互對齊。",
  en: "AItewan is not merely a regulatory consultancy — it is a medical-AI team with hands-on experience in SaMD product development, hospital deployment, clinical validation, quality systems, TFDA approval, U.S. FDA 510(k) clearance, cybersecurity documentation, and patent strategy.",
};

/* ----------------------------- i18n getters ----------------------------- */

import type { Locale } from "@/lib/i18n";

const samdServicesEn: ServiceCard[] = [
  { icon: "shield", title: "TFDA Class II Submission Support", body: "Submission strategy for Taiwan TFDA Class II devices: classification, intended-use drafting, technical documentation, risk management, software V&V, clinical evaluation and reviewer communication." },
  { icon: "badge", title: "U.S. FDA 510(k) Submission Support", body: "Premarket notification preparation: predicate analysis, intended use / indications for use, software and cybersecurity documentation, performance and clinical validation, and submission packaging." },
  { icon: "quality", title: "ISO 13485 QMS Implementation", body: "Quality management system build-out: design and development controls, document control, supplier management, risk management, CAPA, change management, post-market surveillance and audit readiness." },
  { icon: "file", title: "SaMD Software Life-cycle Documentation", body: "Documentation architecture for medical-device software: SRS, software architecture and design, verification and validation, release notes, known anomaly lists, SOUP management and maintenance plans." },
  { icon: "lock", title: "Cybersecurity Testing & Documentation", body: "Cybersecurity documentation and test planning for TFDA Class II review: threat modeling, risk assessment, SBOM, penetration test planning, remediation records and post-market security processes." },
  { icon: "chart", title: "Clinical Validation & Performance Design", body: "Validation dataset planning, ground-truth workflows, statistical methods, performance metrics, subgroup analysis, reader studies and clinical evaluation reports aligned with TFDA / FDA expectations." },
  { icon: "patent", title: "IP & Technology Strategy", body: "Identifying protectable technology from product, algorithm and workflow perspectives, and working with patent counsel to build a development-aligned IP strategy." },
];

const whyUsEn = [
  "We do not just know the regulations — we have cleared an AI SaMD ourselves",
  "We do not just write documents — we understand clinical workflows and DICOM integration",
  "We do not just consult — we help build product strategies that actually ship",
  "Hands-on TFDA, FDA, ISO 13485, cybersecurity and IP experience",
  "From product development to hospital deployment — bringing medical AI into the clinic",
];

export const getSamdServices = (l: Locale) => (l === "en" ? samdServicesEn : samdServices);
export const getServicesIntro = (l: Locale) => (l === "en" ? servicesIntro.en : servicesIntro.zh);
export const getWhyUs = (l: Locale) => (l === "en" ? whyUsEn : whyUs);
export const getWhyUsBody = (l: Locale) => (l === "en" ? whyUsBody.en : whyUsBody.zh);
