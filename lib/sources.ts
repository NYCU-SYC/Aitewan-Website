/**
 * Reference source index（規格書 §18 Source Index / Reference Library）。
 * 正式上線前，所有對外 claim 應以官方來源與公司內部證書為最終依據。
 */

export type SourceCategory =
  | "official-regulatory"
  | "company-official"
  | "award-evidence"
  | "university"
  | "event-listing"
  | "competitor-reference"
  | "video-reference"
  | "technical-docs"
  | "internal-draft";

export type ReferenceSource = {
  id: string;
  title: string;
  url?: string;
  category: SourceCategory;
  notes: string;
};

export const sources: ReferenceSource[] = [
  {
    id: "S1",
    title: "FDA 510(k) Premarket Notification K252190",
    url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K252190",
    category: "official-regulatory",
    notes:
      "DeepBT Detector-Plus；K252190；Decision Date 2026-04-10；Decision: Substantially Equivalent.",
  },
  {
    id: "S2",
    title: "AItewan English TFDA Class II registration news",
    url: "https://www.aitewan-bio.com/",
    category: "company-official",
    notes: "DeepBT intended workflow、tumor categories、MRI inputs、physician reference。",
  },
  {
    id: "S3",
    title: "AItewan DeepBT Detector-Plus video page",
    url: "https://www.aitewan-bio.com/video_detail/9",
    category: "company-official",
    notes: "Demo 影片：AI contouring、case management、PACS/TPS integration、DICOM outputs。",
  },
  {
    id: "S4",
    title: "AItewan DeepBT Detector Plus product page",
    url: "https://www.aitewan-bio.com/",
    category: "company-official",
    notes: "產品敘事：MRI inputs、DICOM RTSS/PR、volume tracking。",
  },
  {
    id: "S5",
    title: "AItewan TFDA 2025 news（官網新聞）",
    url: "https://www.aitewan-bio.com/news/2/1",
    category: "company-official",
    notes:
      "2025-04-19 輔助分析系統、2023-07-21 輔助偵測系統通過 TFDA 二類查驗登記；醫師診斷 guardrail。",
  },
  {
    id: "S6",
    title: "InnoVEX AItewan exhibitor page",
    category: "event-listing",
    notes:
      "FDA/TFDA cleared 描述、license no. 008460、DICOM RTSS/PR/SR — 公開前需以證書再確認。",
  },
  {
    id: "S8",
    title: "National Innovation Award DeepBT page",
    category: "award-evidence",
    notes: "國家新創獎、導入/試用脈絡、醫材販售/製造資格。",
  },
  {
    id: "S9",
    title: "NYCU ELITE DeepBT article",
    category: "university",
    notes: "未來科技獎/國家新創獎、技轉與專利脈絡。",
  },
  {
    id: "S10",
    title: "Vysioneer VBrain（競品）",
    category: "competitor-reference",
    notes: "FDA-cleared brain tumor auto-contouring；同三類腫瘤框架。",
  },
  {
    id: "S25",
    title: "Radformation AutoContour YouTube demo",
    category: "video-reference",
    notes: "Auto-contouring demo 節奏與前後對照（參考，不複製）。",
  },
  {
    id: "S32",
    title: "Motion (Framer Motion) React docs",
    url: "https://motion.dev/",
    category: "technical-docs",
    notes: "whileInView / useScroll scroll-linked animation patterns。",
  },
  {
    id: "U1",
    title: "客戶提供之網站腳本（網頁腳本.docx）",
    category: "internal-draft",
    notes:
      "性能指標、醫院列名、專利分類、論文清單之原始來源；屬內部草稿，正式上線前需法規/臨床確認。",
  },
];

export const sourceById = Object.fromEntries(sources.map((s) => [s.id, s]));
