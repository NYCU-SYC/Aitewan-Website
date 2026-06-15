import type { IconName } from "@/components/ui/Icon";

export type PatentArea = {
  icon: IconName;
  area: string;
  title: string;
  titleEn: string;
  body: string;
};

export const patentAreas: PatentArea[] = [
  {
    icon: "brain",
    area: "Patent Area 1",
    title: "AI 腦部腫瘤影像分析",
    titleEn: "AI-Based Brain Tumor Image Analysis",
    body: "涵蓋使用深度學習方法進行腦部 MRI 影像分析、腫瘤區域偵測、腫瘤輪廓產生與影像特徵萃取之技術。",
  },
  {
    icon: "contour",
    area: "Patent Area 2",
    title: "自動腫瘤圈註與分割",
    titleEn: "Automatic Tumor Contouring and Segmentation",
    body: "涵蓋針對腦轉移瘤、腦膜瘤、聽神經瘤等腦部腫瘤之自動化或半自動化腫瘤圈註技術。",
  },
  {
    icon: "layers",
    area: "Patent Area 3",
    title: "多模態 MRI 處理",
    titleEn: "Multimodal MRI Processing",
    body: "涵蓋整合 T1W+C、T2W 或其他 MRI 序列進行腫瘤邊界分析、影像對位、特徵融合與 AI 推論之技術。",
  },
  {
    icon: "workflow",
    area: "Patent Area 4",
    title: "DICOM 臨床流程整合",
    titleEn: "DICOM-Based Clinical Workflow Integration",
    body: "涵蓋 AI 結果轉換為標準化 DICOM 物件（如 PR、RTSS、SEG、SR），並串接 PACS、TPS 與臨床影像流程之技術。",
  },
  {
    icon: "target",
    area: "Patent Area 5",
    title: "放射治療計畫支援",
    titleEn: "Radiotherapy Planning Support",
    body: "涵蓋將 AI 產生之腫瘤輪廓應用於放射治療計畫準備、醫師審閱、治療流程輔助與臨床資料交換之技術。",
  },
  {
    icon: "cpu",
    area: "Patent Area 6",
    title: "醫療 AI 平台與 SaMD 系統架構",
    titleEn: "Medical AI Platform and SaMD System Architecture",
    body: "涵蓋醫療 AI 平台、模型管理、背景推論、臨床工作流程自動化、結果回傳與醫療軟體系統架構之技術。",
  },
];

export const patentIntro = {
  zh: "智德萬重視醫療 AI 技術的長期研發與智慧財產保護，已建立多項與 AI 醫療影像、腦部腫瘤分析、影像處理、臨床流程整合及醫療軟體應用相關之專利布局。這些技術支持 DeepBT 系列在腦部腫瘤 MRI 分析、AI 輔助圈註、DICOM 臨床整合與放射治療計畫輔助上的技術差異化。",
  en: "AItewan has established an intellectual property portfolio covering AI-based medical imaging, brain tumor analysis, image processing, clinical workflow integration, and medical software applications.",
};

export const patentCompliance =
  "部分專利仍在申請或尚未公開，網站文字以「patent-pending technologies」、「proprietary technologies」與「intellectual property portfolio」等描述為主，避免揭露過多技術細節。";

/** Portfolio scale (from the patent schedule in the company filing). */
export const patentStats = {
  granted: 13,
  pending: 16,
  trademarks: 3,
  regions: ["台灣", "美國", "日本", "歐洲", "中國", "馬來西亞", "越南"],
  regionsEn: ["Taiwan", "U.S.", "Japan", "Europe", "China", "Malaysia", "Vietnam"],
};

/** "Technology Moat" pillars — protected AI infrastructure, not just a model. */
export type MoatPillar = { icon: IconName; title: string; titleEn: string; body: string; bodyEn: string };

export const moatPillars: MoatPillar[] = [
  {
    icon: "layers",
    title: "全球首創雙參數核心技術",
    titleEn: "World-first bi-parametric core",
    body: "不同於多數僅依賴單一 MRI 參數的腦部影像 AI，DeepBT® 以 T1W+C 與 T2W 雙參數同步分析。此雙參數整合分析方法為核心專利保護內容，涵蓋影像取得、參數組合、模型分析流程、病灶判讀邏輯與系統應用架構五大面向。",
    bodyEn: "Unlike most brain-imaging AI that relies on a single MRI parameter, DeepBT® analyzes T1W+C and T2W in tandem. This bi-parametric method is core patent-protected across five facets: image acquisition, parameter combination, model-analysis pipeline, lesion-interpretation logic and system architecture.",
  },
  {
    icon: "workflow",
    title: "「演算法 + 工作流」雙軌防護",
    titleEn: "Algorithm + workflow dual-track protection",
    body: "競品即使繞過演算法，若抄襲高效率的「AI 運算管理與平台串接流向」仍會觸及專利。DeepBT® 從單點工具升級為端到端平台的全流程，皆受智慧財產權保護。",
    bodyEn: "Even a competitor that bypasses the algorithm would still infringe if it copies the high-efficiency AI computation-management and platform-integration flow. The entire path — from single-point tool to end-to-end platform — is IP-protected.",
  },
  {
    icon: "cpu",
    title: "為雲端與跨系統分潤預先布局",
    titleEn: "Pre-positioned for cloud & cross-system models",
    body: "新獲證的《醫學資料 AI 運算管理方法》專利，為「按件計價的彈性 AI 雲服務」預先建立法規與智權前置布局，確保雲端平台直接面向醫院與終端時擁有專利排他權。",
    bodyEn: "The newly granted Medical-Data AI Computation Management Method patent pre-positions IP and regulatory groundwork for a pay-per-use cloud AI service, securing exclusivity as the cloud platform engages hospitals and end users directly.",
  },
  {
    icon: "target",
    title: "多國專利布局",
    titleEn: "Multi-country filing strategy",
    body: "DeepBT® 與 Liger 平台已於台灣、美國、日本、歐洲、馬來西亞及越南等市場進行專利申請。美歐布局著重高階醫療影像與 AI 醫療市場商業化；東南亞則提前建立智慧醫療成長市場的技術進入優勢。",
    bodyEn: "DeepBT® and the Liger platform are filed across Taiwan, the U.S., Japan, Europe, Malaysia and Vietnam. U.S./EU filings target high-end imaging and AI-medical commercialization; Southeast-Asia filings secure early entry into fast-growing smart-healthcare markets.",
  },
];

/** Granted / notice-of-allowance patents confirmed by certificate scans on file. */
export type PatentRow = {
  title: string;
  number: string;
  region: string;
  status: string;
  tech: string;
};

export const patentTableColumns = ["專利名稱 / Title", "專利號 / No.", "區域 / Region", "狀態 / Status", "對應產品 / Product"];
export const patentTableColumnsEn = ["Patent Title", "Patent No.", "Region", "Status", "Related Product"];

export const patentList: PatentRow[] = [
  { title: "醫學影像處理方法及其系統", number: "I901468", region: "中華民國", status: "已獲證", tech: "Liger 平台" },
  { title: "醫學資料 AI 運算管理方法", number: "114124520", region: "中華民國", status: "核准審定", tech: "Liger 平台" },
  { title: "用於執行還原功能的方法及其裝置", number: "I873807", region: "中華民國", status: "已獲證", tech: "Liger 平台" },
  { title: "腦部醫學影像處理方法及其系統", number: "113147090", region: "中華民國", status: "核准審定", tech: "Liger 平台" },
  { title: "腦部腫瘤種類自動判別系統", number: "I830161", region: "中華民國", status: "已獲證", tech: "DeepBT®" },
  { title: "Brain Tumor Types Distinguish System", number: "US 12,499,543 B2", region: "美國", status: "已獲證", tech: "DeepBT®" },
  { title: "良性腫瘤發展趨勢評估系統", number: "I743693", region: "中華民國", status: "已獲證", tech: "DeepBT®" },
  { title: "Benign Tumor Development Trend Assessment System", number: "US 11,475,563 B2", region: "美國", status: "已獲證", tech: "DeepBT®" },
  { title: "Method for Enhancing Assessment Accuracy", number: "US 12,381,014 B2", region: "美國", status: "已獲證", tech: "DeepBT®" },
  { title: "良性腫瘍の進行傾向評価システム", number: "P7198300", region: "日本", status: "已獲證", tech: "DeepBT®" },
  { title: "良性肿瘤发展趋势评估系统", number: "202110199633.X", region: "中國", status: "已獲證", tech: "DeepBT®" },
  { title: "Brain Tumor Types Distinguish System", number: "EP22199621.8", region: "歐盟", status: "核准通知", tech: "DeepBT®" },
];

const patentTitleEn: Record<string, string> = {
  I901468: "Medical image processing method and system",
  "114124520": "Medical-data AI computation management method",
  I873807: "Method and apparatus for performing restoration",
  "113147090": "Brain medical-image processing method and system",
  I830161: "Brain tumor types distinguish system",
  "US 12,499,543 B2": "Brain Tumor Types Distinguish System",
  I743693: "Benign tumor development trend assessment system",
  "US 11,475,563 B2": "Benign Tumor Development Trend Assessment System",
  "US 12,381,014 B2": "Method for Enhancing Assessment Accuracy",
  P7198300: "Benign tumor development trend assessment system",
  "202110199633.X": "Benign tumor development trend assessment system",
  "EP22199621.8": "Brain Tumor Types Distinguish System",
};

export const patentListEn: PatentRow[] = patentList.map((p) => ({
  title: patentTitleEn[p.number] ?? p.title,
  number: p.number,
  region: { "中華民國": "Taiwan", "美國": "U.S.", "日本": "Japan", "中國": "China", "歐盟": "Europe" }[p.region] ?? p.region,
  status: { "已獲證": "Granted", "核准審定": "Notice of allowance", "核准通知": "Allowance notice" }[p.status] ?? p.status,
  tech: p.tech.replace("平台", "platform"),
}));

/** Patent certificate scans for the IP gallery. */
export type PatentImage = { src: string; caption: string; captionEn: string };
export const patentImages: PatentImage[] = [
  { src: "/images/patents/patent-roc-i901468-medical-image-processing.jpg", caption: "中華民國 I901468 · 醫學影像處理方法（Liger）", captionEn: "Taiwan I901468 · Medical image processing (Liger)" },
  { src: "/images/patents/patent-roc-ai-data-management-approved.jpg", caption: "醫學資料 AI 運算管理方法 · 核准審定（Liger）", captionEn: "Medical-data AI computation management · allowed (Liger)" },
  { src: "/images/patents/patent-roc-i873807-restore-function.jpg", caption: "中華民國 I873807 · 還原功能方法（Liger）", captionEn: "Taiwan I873807 · Restoration method (Liger)" },
  { src: "/images/patents/patent-roc-i830161-brain-tumor-types.jpg", caption: "中華民國 I830161 · 腦瘤種類判別（DeepBT®）", captionEn: "Taiwan I830161 · Brain-tumor type classification (DeepBT®)" },
  { src: "/images/patents/patent-roc-i743693-benign-tumor-trend.jpg", caption: "中華民國 I743693 · 腫瘤發展趨勢評估（DeepBT®）", captionEn: "Taiwan I743693 · Tumor trend assessment (DeepBT®)" },
  { src: "/images/patents/patent-japan-p7198300.jpg", caption: "日本特許 P7198300（DeepBT®）", captionEn: "Japan Patent P7198300 (DeepBT®)" },
  { src: "/images/patents/patent-us-certificate.jpg", caption: "美國發明專利（USPTO）", captionEn: "United States Patent (USPTO)" },
];

/* ----------------------------- i18n getters ----------------------------- */

import type { Locale } from "@/lib/i18n";

const patentAreasEn: PatentArea[] = [
  { icon: "brain", area: "Patent Area 1", title: "AI-Based Brain Tumor Image Analysis", titleEn: "AI 腦部腫瘤影像分析", body: "Deep-learning methods for brain MRI analysis, tumor region detection, contour generation and image-feature extraction." },
  { icon: "contour", area: "Patent Area 2", title: "Automatic Tumor Contouring & Segmentation", titleEn: "自動腫瘤圈註與分割", body: "Automated and semi-automated contouring techniques for brain metastases, meningiomas and acoustic neuromas." },
  { icon: "layers", area: "Patent Area 3", title: "Multimodal MRI Processing", titleEn: "多模態 MRI 處理", body: "Integration of T1W+C, T2W and other MRI sequences for boundary analysis, registration, feature fusion and AI inference." },
  { icon: "workflow", area: "Patent Area 4", title: "DICOM-Based Workflow Integration", titleEn: "DICOM 臨床流程整合", body: "Conversion of AI results into standardized DICOM objects (PR, RTSS, SEG, SR) and integration with PACS, TPS and clinical imaging workflows." },
  { icon: "target", area: "Patent Area 5", title: "Radiotherapy Planning Support", titleEn: "放射治療計畫支援", body: "Application of AI-generated contours to radiotherapy planning preparation, physician review and clinical data exchange." },
  { icon: "cpu", area: "Patent Area 6", title: "Medical AI Platform & SaMD Architecture", titleEn: "醫療 AI 平台與 SaMD 架構", body: "Medical-AI platform, model management, background inference, workflow automation and medical-software system architecture." },
];

export const getPatentAreas = (l: Locale) => (l === "en" ? patentAreasEn : patentAreas);
export const getPatentIntro = (l: Locale) => (l === "en" ? patentIntro.en : patentIntro.zh);
export const getPatentCompliance = (l: Locale) =>
  l === "en"
    ? "Granted and notice-of-allowance patents are shown with their certificate-confirmed numbers; applications still under examination are described as patent-filed / pending, without disclosing unpublished technical detail."
    : "已獲證與核准審定之專利以證書確認之專利號呈現；仍在審查中之申請案以「申請中 / patent-filed」描述，不揭露未公開之技術細節。";

export const getMoatPillars = (l: Locale) =>
  moatPillars.map((p) => ({
    icon: p.icon,
    title: l === "en" ? p.titleEn : p.title,
    body: l === "en" ? p.bodyEn : p.body,
  }));
export const getPatentList = (l: Locale) => (l === "en" ? patentListEn : patentList);
export const getPatentTableColumns = (l: Locale) => (l === "en" ? patentTableColumnsEn : patentTableColumns);
export const getPatentImages = (l: Locale) =>
  patentImages.map((p) => ({ src: p.src, caption: l === "en" ? p.captionEn : p.caption }));
export const getPatentStats = (l: Locale) => ({
  granted: patentStats.granted,
  pending: patentStats.pending,
  trademarks: patentStats.trademarks,
  regions: l === "en" ? patentStats.regionsEn : patentStats.regions,
});
