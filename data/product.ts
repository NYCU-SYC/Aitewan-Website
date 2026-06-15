import type { IconName } from "@/components/ui/Icon";

export type Feature = {
  icon: IconName;
  title: string;
  titleEn: string;
  body: string;
};

export const keyFeatures: Feature[] = [
  {
    icon: "contour",
    title: "AI 輔助腦部腫瘤圈註",
    titleEn: "AI-Assisted Brain Tumor Contouring",
    body: "針對已診斷成人腦部腫瘤提供 AI 輔助初步輪廓，支援醫師於放射治療計畫流程中進行審閱與修改。",
  },
  {
    icon: "brain",
    title: "三類取證腫瘤類別",
    titleEn: "Three Cleared Tumor Categories",
    body: "支援腦轉移瘤、腦膜瘤與聽神經瘤三類腦部腫瘤之初步圈註輔助。",
  },
  {
    icon: "layers",
    title: "雙參數 MRI 支援",
    titleEn: "Bi-parametric MRI Support",
    body: "支援 T1W+C 與 T2W MRI 影像輸入，提供腫瘤邊界判讀所需的多影像資訊。",
  },
  {
    icon: "workflow",
    title: "標準化 DICOM 輸出",
    titleEn: "DICOM-Based Output",
    body: "可輸出標準化 DICOM PR 與 RTSS，協助 AI 結果銜接既有 PACS、TPS 與治療計畫流程。",
  },
  {
    icon: "stethoscope",
    title: "醫師主導審閱",
    titleEn: "Physician-Led Review",
    body: "AI 產生之輪廓僅作為初步參考，所有結果皆須由合格醫療專業人員確認或修改。",
  },
  {
    icon: "hospital",
    title: "臨床場域導入經驗",
    titleEn: "Clinical Deployment Experience",
    body: "產品已於台中榮總、新光醫院與台北榮總導入使用中，具備真實臨床場域整合經驗。",
  },
];

export const tumorTypes = [
  {
    name: "腦轉移瘤",
    nameEn: "Brain metastases",
    note: "常見於肺癌、乳癌等原發腫瘤之顱內轉移，數目與分布變異大。",
  },
  {
    name: "腦膜瘤",
    nameEn: "Meningiomas",
    note: "源自腦膜的腫瘤，邊界與鄰近結構關係為圈註重點。",
  },
  {
    name: "聽神經瘤",
    nameEn: "Acoustic neuromas",
    note: "前庭神經鞘瘤，常見於 Gamma Knife 等立體定位放射治療規劃。",
  },
];

export const modalities = [
  {
    code: "T1W+C",
    name: "T1-weighted post-contrast MRI",
    note: "顯影後 T1 影像，強化腫瘤組織對比。",
  },
  {
    code: "T2W",
    name: "T2-weighted MRI",
    note: "提供水腫與組織邊界的補充判讀資訊。",
  },
];

export const dicomOutputs = [
  {
    code: "DICOM PR",
    name: "Presentation State",
    note: "於影像瀏覽器中呈現 AI 標註，供醫師審閱。",
  },
  {
    code: "RTSS",
    name: "RT Structure Set",
    note: "結構輪廓物件，銜接放射治療計畫系統（TPS）。",
  },
];

/** What DeepBT does — 3-step process（Phase 3 產品頁 §2）。 */
export const processSteps: { icon: IconName; step: string; title: string; titleEn: string; body: string }[] = [
  {
    icon: "mri",
    step: "01",
    title: "接收符合條件的腦部 MRI",
    titleEn: "Receive eligible brain MRI",
    body: "自 PACS / TPS 取得已診斷成人腦部腫瘤之 T1W+C 與 T2W MRI studies。",
  },
  {
    icon: "contour",
    step: "02",
    title: "產生 AI 輔助初步輪廓",
    titleEn: "Generate AI-assisted preliminary contours",
    body: "針對三類取證腫瘤產生初步 ROI / 輪廓，作為醫師審閱之參考起點。",
  },
  {
    icon: "workflow",
    step: "03",
    title: "輸出 DICOM 供醫師審閱",
    titleEn: "Export DICOM PR / RTSS for physician review",
    body: "以標準化 DICOM 物件回到 PACS / TPS，由醫療專業人員審閱、確認或修改。",
  },
];

export const productIntro = {
  zh: "DeepBT Detector-Plus 是一套 AI 輔助腦部腫瘤圈註軟體，設計用於協助醫療專業人員針對已診斷之成人腦部腫瘤產生初步輪廓，支援放射治療計畫流程。系統可分析符合條件的腦部 MRI 影像，針對腦轉移瘤、腦膜瘤與聽神經瘤三類腫瘤提供初步 ROI／輪廓參考。",
  en: "DeepBT Detector-Plus is an AI-assisted brain tumor contouring software system designed to support qualified medical professionals in generating preliminary contours for diagnosed adult brain tumors, supporting radiotherapy treatment planning workflows.",
};

/* ----------------------------- i18n getters ----------------------------- */

import type { Locale } from "@/lib/i18n";

const keyFeaturesEn: Feature[] = [
  { icon: "contour", title: "AI-Assisted Brain Tumor Contouring", titleEn: "Preliminary contours for physician review", body: "Generates preliminary contours for diagnosed adult brain tumors, supporting review and modification within radiotherapy planning workflows." },
  { icon: "brain", title: "Three Cleared Tumor Categories", titleEn: "Metastases · Meningiomas · Acoustic neuromas", body: "Supports preliminary contouring assistance for brain metastases, meningiomas and acoustic neuromas." },
  { icon: "layers", title: "Bi-parametric MRI Support", titleEn: "T1W+C and T2W input", body: "Accepts T1-weighted post-contrast and T2-weighted MRI, providing the multi-sequence information needed to assess tumor boundaries." },
  { icon: "workflow", title: "DICOM-Based Output", titleEn: "Standardized PR / RTSS objects", body: "Exports standardized DICOM PR and RTSS so AI results connect to existing PACS, TPS and treatment-planning workflows." },
  { icon: "stethoscope", title: "Physician-Led Review", titleEn: "Review · Confirm · Modify", body: "AI-generated contours are preliminary references only; every result is confirmed or modified by qualified medical professionals." },
  { icon: "hospital", title: "Clinical Deployment Experience", titleEn: "Real-world integration", body: "Deployed and in use at major Taiwanese medical centers, with proven integration experience in real clinical environments." },
];

const tumorTypesEn = [
  { name: "Brain metastases", nameEn: "腦轉移瘤", note: "Intracranial metastases from primary cancers such as lung or breast; lesion number and distribution vary widely." },
  { name: "Meningiomas", nameEn: "腦膜瘤", note: "Tumors arising from the meninges; boundary definition relative to adjacent structures is the contouring focus." },
  { name: "Acoustic neuromas", nameEn: "聽神經瘤", note: "Vestibular schwannomas, frequently planned for stereotactic radiosurgery such as Gamma Knife." },
];

const modalitiesEn = [
  { code: "T1W+C", name: "T1-weighted post-contrast MRI", note: "Contrast-enhanced T1 imaging that highlights tumor tissue." },
  { code: "T2W", name: "T2-weighted MRI", note: "Complementary information on edema and tissue boundaries." },
];

const dicomOutputsEn = [
  { code: "DICOM PR", name: "Presentation State", note: "Renders AI annotations in existing image viewers for physician review." },
  { code: "RTSS", name: "RT Structure Set", note: "Structure contours that connect to treatment planning systems (TPS)." },
];

const processStepsEn: typeof processSteps = [
  { icon: "mri", step: "01", title: "Receive eligible brain MRI", titleEn: "From PACS / TPS", body: "Retrieves T1W+C and T2W MRI studies of diagnosed adult brain tumors from PACS or TPS." },
  { icon: "contour", step: "02", title: "Generate preliminary contours", titleEn: "AI-assisted", body: "Produces preliminary ROIs / contours for the three cleared tumor categories as a starting point for review." },
  { icon: "workflow", step: "03", title: "Export DICOM for review", titleEn: "PR / RTSS", body: "Returns standardized DICOM objects to PACS / TPS, where qualified professionals review, confirm or modify them." },
];

export const getKeyFeatures = (l: Locale) => (l === "en" ? keyFeaturesEn : keyFeatures);
export const getTumorTypes = (l: Locale) => (l === "en" ? tumorTypesEn : tumorTypes);
export const getModalities = (l: Locale) => (l === "en" ? modalitiesEn : modalities);
export const getDicomOutputs = (l: Locale) => (l === "en" ? dicomOutputsEn : dicomOutputs);
export const getProcessSteps = (l: Locale) => (l === "en" ? processStepsEn : processSteps);
export const getProductIntro = (l: Locale) => (l === "en" ? productIntro.en : productIntro.zh);
