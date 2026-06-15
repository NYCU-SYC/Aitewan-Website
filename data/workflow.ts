import type { IconName } from "@/components/ui/Icon";

export type WorkflowStep = {
  step: string;
  icon: IconName;
  title: string;
  titleEn: string;
  body: string;
};

export const workflowSteps: WorkflowStep[] = [
  {
    step: "01",
    icon: "mri",
    title: "MRI 影像",
    titleEn: "MRI Study",
    body: "取得符合條件之腦部 MRI 影像（T1W+C / T2W）。",
  },
  {
    step: "02",
    icon: "hospital",
    title: "PACS / TPS",
    titleEn: "PACS / TPS",
    body: "自既有 PACS 或治療計畫系統取得影像資料。",
  },
  {
    step: "03",
    icon: "cpu",
    title: "DeepBT AI 推論",
    titleEn: "DeepBT AI Inference",
    body: "執行 AI 推論，針對三類腦部腫瘤產生初步輪廓。",
  },
  {
    step: "04",
    icon: "workflow",
    title: "DICOM PR / RTSS 輸出",
    titleEn: "DICOM PR / RTSS Output",
    body: "輸出標準化 DICOM 物件（Presentation State 與 RT Structure Set）。",
  },
  {
    step: "05",
    icon: "review",
    title: "醫師審閱",
    titleEn: "Physician Review",
    body: "醫師於影像瀏覽器或 TPS 中審閱、確認或修改 AI 結果。",
  },
  {
    step: "06",
    icon: "target",
    title: "治療計畫支援",
    titleEn: "Treatment Planning Support",
    body: "作為放射治療計畫前置作業與輪廓準備之參考。",
  },
];

const workflowStepsEn: WorkflowStep[] = [
  {
    step: "01",
    icon: "mri",
    title: "MRI Study",
    titleEn: "Eligible brain MRI",
    body: "Eligible T1W+C / T2W MRI of diagnosed adult brain tumors.",
  },
  {
    step: "02",
    icon: "hospital",
    title: "PACS / TPS",
    titleEn: "Existing systems",
    body: "Image data are retrieved from existing PACS or treatment planning systems.",
  },
  {
    step: "03",
    icon: "cpu",
    title: "DeepBT AI Inference",
    titleEn: "AI-assisted analysis",
    body: "AI inference generates preliminary contours for the cleared brain tumor categories.",
  },
  {
    step: "04",
    icon: "workflow",
    title: "DICOM PR / RTSS Output",
    titleEn: "Standardized DICOM",
    body: "Standardized DICOM Presentation State and RT Structure Set objects are exported.",
  },
  {
    step: "05",
    icon: "review",
    title: "Physician Review",
    titleEn: "Review · Confirm · Modify",
    body: "Physicians review, confirm or modify AI results in the viewer or TPS.",
  },
  {
    step: "06",
    icon: "target",
    title: "Treatment Planning Support",
    titleEn: "RT planning preparation",
    body: "Confirmed contours serve as a reference for radiotherapy planning preparation.",
  },
];

/** Sticky-scroll workflow steps（Phase 3 工作流程頁 §2）— 簡潔文案＋視覺 chips。 */
export type StickyStep = {
  icon: IconName;
  title: string;
  titleEn: string;
  body: string;
  chips: string[];
};

export const stickySteps: StickyStep[] = [
  {
    icon: "mri",
    title: "MRI 影像",
    titleEn: "MRI Study",
    body: "已診斷成人腦部腫瘤之 T1W+C / T2W MRI。",
    chips: ["T1W+C", "T2W"],
  },
  {
    icon: "hospital",
    title: "PACS / TPS 輸入",
    titleEn: "PACS / TPS Input",
    body: "自既有影像基礎設施取得符合條件之影像。",
    chips: ["PACS", "TPS"],
  },
  {
    icon: "cpu",
    title: "DeepBT AI 推論",
    titleEn: "DeepBT AI Inference",
    body: "針對三類取證腫瘤產生初步輪廓。",
    chips: ["AI-assisted", "Preliminary"],
  },
  {
    icon: "workflow",
    title: "DICOM PR / RTSS 輸出",
    titleEn: "DICOM PR / RTSS Output",
    body: "以標準化 DICOM 物件回傳臨床端。",
    chips: ["DICOM PR", "DICOM RTSS"],
  },
  {
    icon: "review",
    title: "醫師審閱",
    titleEn: "Physician Review",
    body: "醫師審閱、確認或修改 AI 結果。",
    chips: ["Review", "Confirm", "Modify"],
  },
  {
    icon: "target",
    title: "治療計畫支援",
    titleEn: "Treatment Planning Support",
    body: "作為放射治療計畫前置作業之參考。",
    chips: ["RT Planning"],
  },
];

/** Implementation benefits（Phase 3 工作流程頁 §5）— 保守表述，不含時間百分比。 */
export const implementationBenefits: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "contour",
    title: "降低重複性初步圈註負擔",
    body: "AI 提供初步輪廓起點，減少逐張人工描繪的重複性工作。",
  },
  {
    icon: "target",
    title: "支援放射治療計畫前置作業",
    body: "初步輪廓與量化參考可作為治療計畫準備的依據之一。",
  },
  {
    icon: "workflow",
    title: "結果回到既有臨床系統",
    body: "標準化 DICOM 輸出讓 AI 結果進入醫師熟悉的 PACS / TPS 環境。",
  },
  {
    icon: "stethoscope",
    title: "維持醫師主導的決策",
    body: "所有結果由合格醫療專業人員審閱、確認或修改後方可使用。",
  },
  {
    icon: "layers",
    title: "標準化 DICOM 資料交換",
    body: "以 DICOM PR / RTSS 進行跨系統結構與標註交換。",
  },
  {
    icon: "hospital",
    title: "真實場域導入與流程優化",
    body: "依醫學中心實際導入經驗持續精進推論與審閱流程。",
  },
];

export const workflowIntro = {
  zh: "DeepBT Detector-Plus 以臨床工作流程整合為核心設計理念，可與既有醫療影像基礎設施串接。系統可接收符合條件的 MRI 影像、執行 AI 推論，並輸出標準化 DICOM 物件，使 AI 結果回到臨床端既有影像瀏覽器或治療計畫系統中進行審閱。",
  en: "DeepBT Detector-Plus is designed for integration into existing clinical imaging infrastructure — processing eligible MRI studies, performing AI inference, and generating standardized DICOM outputs for review within existing PACS, image viewers, or treatment planning systems.",
};

/* ----------------------------- i18n getters ----------------------------- */

import type { Locale } from "@/lib/i18n";

const stickyStepsEn: StickyStep[] = [
  { icon: "mri", title: "MRI Study", titleEn: "Eligible input", body: "T1W+C / T2W MRI of diagnosed adult brain tumors.", chips: ["T1W+C", "T2W"] },
  { icon: "hospital", title: "PACS / TPS Input", titleEn: "Existing infrastructure", body: "Eligible studies are retrieved from existing imaging infrastructure.", chips: ["PACS", "TPS"] },
  { icon: "cpu", title: "DeepBT AI Inference", titleEn: "Preliminary contours", body: "Generates preliminary contours for the three cleared tumor categories.", chips: ["AI-assisted", "Preliminary"] },
  { icon: "workflow", title: "DICOM PR / RTSS Output", titleEn: "Standardized objects", body: "Results return to the clinical side as standardized DICOM objects.", chips: ["DICOM PR", "DICOM RTSS"] },
  { icon: "review", title: "Physician Review", titleEn: "Review · Confirm · Modify", body: "Physicians review, confirm or modify the AI results.", chips: ["Review", "Confirm", "Modify"] },
  { icon: "target", title: "Treatment Planning Support", titleEn: "RT preparation", body: "Confirmed contours serve as a reference for radiotherapy planning preparation.", chips: ["RT Planning"] },
];

const implementationBenefitsEn: typeof implementationBenefits = [
  { icon: "contour", title: "Reduce repetitive contouring workload", body: "AI provides a preliminary starting point, reducing slice-by-slice manual delineation." },
  { icon: "target", title: "Support radiotherapy planning preparation", body: "Preliminary contours and quantitative references inform treatment-planning preparation." },
  { icon: "workflow", title: "Return results to existing systems", body: "Standardized DICOM output brings AI results into the PACS / TPS environments physicians already use." },
  { icon: "stethoscope", title: "Maintain physician-led decision-making", body: "Every result is reviewed, confirmed or modified by qualified medical professionals before use." },
  { icon: "layers", title: "Standardized DICOM data exchange", body: "DICOM PR / RTSS enables structure and annotation exchange across systems." },
  { icon: "hospital", title: "Real-world deployment and refinement", body: "Inference and review workflows are continuously refined through deployments at medical centers." },
];

export const getStickySteps = (l: Locale) => (l === "en" ? stickyStepsEn : stickySteps);
export const getWorkflowSteps = (l: Locale) => (l === "en" ? workflowStepsEn : workflowSteps);
export const getImplementationBenefits = (l: Locale) =>
  l === "en" ? implementationBenefitsEn : implementationBenefits;
export const getWorkflowIntro = (l: Locale) => (l === "en" ? workflowIntro.en : workflowIntro.zh);
