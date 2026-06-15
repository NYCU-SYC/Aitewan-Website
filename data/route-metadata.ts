import type { Metadata } from "next";

export type RouteMetadataKey =
  | "about"
  | "products"
  | "deepbt-detector-plus"
  | "deepbt-detector"
  | "clinical-workflow"
  | "evidence-regulatory"
  | "contact"
  | "resources"
  | "videos"
  | "samd-services"
  | "technology"
  | "research-publications"
  | "liger-platform"
  | "deepbt"
  | "awards";

/**
 * Per-route titles are self-contained (keyword-first + brand once). The root
 * layout intentionally does NOT apply a `%s | AItewan` template, so titles here
 * must not be double-branded. zh titles lead with Chinese keywords; key English
 * search terms (FDA 510(k), DICOM, SaMD) are retained where users search them.
 */
const zh: Record<RouteMetadataKey, Metadata> = {
  about: {
    title: "關於智德萬 AItewan｜醫療影像 AI 與 SaMD 開發團隊",
    description:
      "智德萬 AItewan 為陽明交通大學衍生之 AI 智慧醫療新創，核心技術源自腦部腫瘤 MRI 影像分析、深度學習自動圈註與 DICOM 臨床整合，並具備 TFDA、FDA 510(k) 取證與 ISO 13485 品質系統經驗。",
  },
  products: {
    title: "DeepBT 系列產品｜AI 輔助腦部腫瘤分析與圈註｜智德萬 AItewan",
    description:
      "DeepBT 系列：Detector-Plus（AI 輔助腦瘤分析系統，FDA 510(k) K252190）與 Detector（AI 輔助腦瘤偵測系統，2023 TFDA 二類查驗登記）。",
  },
  "deepbt-detector-plus": {
    title: "DeepBT Detector-Plus｜AI 輔助腦部腫瘤圈註系統｜智德萬 AItewan",
    description:
      "DeepBT Detector-Plus 為 AI 輔助腦部腫瘤圈註軟體：針對已診斷成人腦部腫瘤（腦轉移瘤、腦膜瘤、聽神經瘤）產生初步輪廓，支援 T1W+C / T2W MRI 輸入與 DICOM PR / RTSS 輸出，由醫師審閱後支援放射治療計畫流程。",
  },
  "deepbt-detector": {
    title: "DeepBT Detector｜AI 輔助腦部腫瘤偵測系統｜智德萬 AItewan",
    description:
      "DeepBT Detector 為 DeepBT 系列第一代產品，2023 年通過台灣 TFDA 二類醫材查驗登記之 AI 輔助腦部腫瘤偵測系統。",
  },
  "clinical-workflow": {
    title: "臨床流程整合｜PACS / TPS / DICOM RTSS / PR｜智德萬 AItewan",
    description:
      "DeepBT Detector-Plus 以臨床工作流程整合為核心：自 PACS / TPS 取得符合條件之 MRI 影像、執行 AI 推論並輸出標準化 DICOM PR / RTSS，供醫師於既有治療計畫系統中審閱、確認或修改。",
  },
  "evidence-regulatory": {
    title: "法規與證據｜FDA 510(k)、TFDA、ISO 13485 與獎項｜智德萬 AItewan",
    description:
      "智德萬 AItewan 的法規與證據：美國 FDA 510(k) K252190（2026-04-10 Substantially Equivalent）、TFDA 二類醫材查驗登記、ISO 13485、獎項、多中心驗證摘要與專利布局。",
  },
  contact: {
    title: "聯絡智德萬 AItewan｜產品展示與 SaMD 取證諮詢",
    description:
      "聯絡智德萬 AItewan：醫療院所導入 DeepBT Detector-Plus、申請產品展示、SaMD 取證諮詢、TFDA / FDA 送件輔導、醫療器材資安輔導與專利技術合作洽詢。",
  },
  resources: {
    title: "資源中心｜影片、里程碑與資源｜智德萬 AItewan",
    description: "智德萬 AItewan 的影片專區、公司里程碑與資源入口。",
  },
  videos: {
    title: "影片專區｜DeepBT 展示影片與媒體採訪｜智德萬 AItewan",
    description: "DeepBT Detector-Plus 產品展示影片、TPS 工作流程展示與媒體採訪。",
  },
  "samd-services": {
    title: "SaMD 法規與委託取證服務｜TFDA / FDA 510(k)｜智德萬 AItewan",
    description:
      "智德萬提供醫療軟體與 AI SaMD 團隊專業法規諮詢與委託取證：TFDA 二類、FDA 510(k)、ISO 13485、SaMD 軟體生命週期文件、資安檢測、臨床驗證設計與專利布局，具自有產品取證實戰經驗。",
  },
  technology: {
    title: "核心技術｜AI 分割、DICOM 整合與 SaMD 架構｜智德萬 AItewan",
    description:
      "DeepBT 核心技術：bi-parametric MRI 輸入、深度學習腦瘤分割與偵測、標準化 DICOM RTSS / PR 輸出、縱向量化追蹤與 SaMD 系統架構。",
  },
  "research-publications": {
    title: "腦瘤 AI 學術發表｜MRI 分割與臨床驗證研究｜智德萬 AItewan",
    description:
      "智德萬技術相關之同儕審查論文，涵蓋聽神經瘤靶區描繪、三類腫瘤 Gamma Knife lesion delineation、跨機構 federated learning、腦轉移瘤 segmentation 與腦膜瘤 MRI meta-analysis。",
  },
  "liger-platform": {
    title: "Liger 醫學影像 AI 整合平台｜DICOM PACS AI 部署平台｜智德萬 AItewan",
    description:
      "Liger MedAI Platform 為已取得 TFDA 第二類醫療器材許可（第008624號）的醫學影像 AI 整合平台，串接 DICOM／PACS／FHIR，支援 AI 模型部署、任務派送、結果呈現、稽核與多模組擴充，是醫院端導入醫學影像 AI 的基礎架構。",
  },
  deepbt: {
    title: "DeepBT® 腦瘤 AI 智慧輔助系統｜五類腦瘤偵測分割分類｜智德萬 AItewan",
    description:
      "DeepBT® 為 Liger 平台上的旗艦腦瘤 AI 應用。Detector Plus 已取得 FDA 510(k)（K252190）與 TFDA 許可；第三代 Detector A+（TFDA 審查中）支援五類腦瘤偵測、分割、分類與 LLM 報告草稿，採雙參數 MRI 輸入，醫師保有最終覆核權。",
  },
  awards: {
    title: "獎項與里程碑｜國家新創獎、智慧創新大賞、InnoVEX｜智德萬 AItewan",
    description:
      "智德萬 AItewan 的獎項肯定與發展里程碑：國家新創獎、未來科技獎、台灣創新技術博覽會、2025 智慧創新大賞入圍，以及 2026 InnoVEX 等展會紀錄。",
  },
};

const en: Record<RouteMetadataKey, Metadata> = {
  about: {
    title: "About AItewan | Medical Imaging AI & SaMD Development",
    description:
      "AItewan is a medical AI company focused on brain tumor MRI analysis, AI-assisted preliminary contouring, DICOM workflow integration, and SaMD productization.",
  },
  products: {
    title: "DeepBT Product Family | AI-Assisted Brain Tumor Analysis | AItewan",
    description:
      "The DeepBT product family focuses on AI-assisted brain tumor analysis, preliminary contouring, and DICOM-based workflow integration for clinical review.",
  },
  "deepbt-detector-plus": {
    title: "DeepBT Detector-Plus | AI-Assisted Brain Tumor Contouring | AItewan",
    description:
      "DeepBT Detector-Plus supports AI-assisted preliminary contouring for diagnosed adult brain tumors, with DICOM PR / RTSS output and physician-led review in radiotherapy workflows.",
  },
  "deepbt-detector": {
    title: "DeepBT Detector | First-Generation Brain Tumor AI | AItewan",
    description:
      "DeepBT Detector is presented as the first-generation product in the DeepBT brain tumor AI product family.",
  },
  "clinical-workflow": {
    title: "Clinical Workflow | PACS / TPS / DICOM RTSS / PR | AItewan",
    description:
      "DeepBT Detector-Plus supports DICOM-based clinical workflow integration, from MRI input and AI inference to DICOM PR / RTSS output for physician review.",
  },
  "evidence-regulatory": {
    title: "Evidence & Regulatory | FDA 510(k), TFDA, ISO 13485 & Awards | AItewan",
    description:
      "AItewan presents regulatory milestones, evidence context, quality-system discipline, validation summaries, and intellectual-property information with conservative medical-device wording.",
  },
  contact: {
    title: "Contact AItewan | Product Demo & SaMD Consulting",
    description:
      "Contact AItewan for DeepBT Detector-Plus product demos, clinical workflow integration, SaMD regulatory consulting, cybersecurity documentation, and technology partnerships.",
  },
  resources: {
    title: "Resources | Videos, Publications & Product Materials | AItewan",
    description: "AItewan resources for product context, videos, publications, and company information.",
  },
  videos: {
    title: "Videos | DeepBT Product Demonstrations & Media Coverage | AItewan",
    description:
      "DeepBT product demonstrations and media coverage with AI-assisted, physician-reviewed workflow framing.",
  },
  "samd-services": {
    title: "SaMD Regulatory Consulting & Submission Services | AItewan",
    description:
      "AItewan provides SaMD regulatory consulting and submission support for medical software and AI SaMD teams, including TFDA, FDA 510(k), ISO 13485, cybersecurity, validation, and IP support.",
  },
  technology: {
    title: "Technology | AI Segmentation, DICOM Integration & SaMD Architecture | AItewan",
    description:
      "DeepBT technology connects MRI input, AI-assisted segmentation, DICOM PR / RTSS output, and SaMD architecture for physician-reviewed clinical workflow support.",
  },
  "research-publications": {
    title: "Brain Tumor AI Publications | MRI Segmentation & Validation | AItewan",
    description:
      "Peer-reviewed research related to AItewan's brain tumor AI direction, including MRI segmentation, lesion delineation, SRS workflows, and cross-institutional validation research.",
  },
  "liger-platform": {
    title: "Liger MedAI Platform | DICOM PACS AI Deployment Platform | AItewan",
    description:
      "Liger MedAI Platform is a TFDA Class II cleared (No. 008624) medical-imaging AI integration platform connecting DICOM / PACS / FHIR, supporting AI model deployment, task orchestration, result rendering, audit and multi-module scalability — the hospital-side backbone for clinical AI adoption.",
  },
  deepbt: {
    title: "DeepBT® Brain Tumor AI System | 5-Type Detection, Segmentation & Classification | AItewan",
    description:
      "DeepBT® is the flagship brain-tumor AI application on the Liger platform. Detector Plus holds FDA 510(k) (K252190) and TFDA clearance; the 3rd-generation Detector A+ (under TFDA review) supports five tumor types with detection, segmentation, classification and LLM report drafting from bi-parametric MRI, with physicians retaining final review.",
  },
  awards: {
    title: "Awards & Milestones | National Innovation Award, Smart Innovation, InnoVEX | AItewan",
    description:
      "AItewan's awards and milestones: the National Innovation Award, Future Tech Award, Taiwan Innotech Expo, 2025 Smart Innovation Award finalist, and exhibitions including InnoVEX 2026.",
  },
};

export async function getRouteMetadata(
  key: RouteMetadataKey,
  params: Promise<{ locale: string }>
): Promise<Metadata> {
  const { locale } = await params;
  return locale === "en" ? en[key] : zh[key];
}
