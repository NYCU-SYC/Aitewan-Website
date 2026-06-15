/**
 * Claims registry（規格書 §2 Claim Control）。
 * 每一句有法規、性能、臨床或商業意義的文案都必須對應來源與審核狀態。
 * UI 元件不得硬寫 FDA/TFDA/性能數字 — 一律由此處與 data/*.ts 取用。
 */

export type ReviewStatus =
  | "verified" // 已查核（可公開，附來源）
  | "partially-verified" // 部分查核（限定措辭）
  | "pending-authorization" // 待授權（logo、證書圖檔）
  | "pending-review"; // 高風險待審（性能數據等）

export type ClaimRecord = {
  id: string;
  claimText: string;
  claimType: "regulatory" | "performance" | "clinical" | "commercial" | "ip";
  pagePlacement: string[];
  sourceIds: string[];
  reviewStatus: ReviewStatus;
  allowedWording: string;
  bannedWording: string;
};

export const claims: ClaimRecord[] = [
  {
    id: "CL-FDA-510K",
    claimText:
      "DeepBT Detector-Plus 已獲美國 FDA 510(k) clearance（K252190，Decision Date 2026-04-10，Substantially Equivalent）。",
    claimType: "regulatory",
    pagePlacement: ["home", "evidence-regulatory", "products/deepbt-detector-plus"],
    sourceIds: ["S1"],
    reviewStatus: "verified",
    allowedWording: "FDA 510(k) clearance K252190；附官方連結。",
    bannedWording: "FDA approved（510(k) 為 clearance 非 approval）。",
  },
  {
    id: "CL-TFDA-CLASS2",
    claimText: "DeepBT 系列已取得台灣 TFDA 第二類醫療器材查驗登記。",
    claimType: "regulatory",
    pagePlacement: ["home", "evidence-regulatory", "products/deepbt-detector-plus"],
    sourceIds: ["S2", "S5"],
    reviewStatus: "partially-verified",
    allowedWording:
      "「已取得 TFDA 二類醫材查驗登記」；正式許可證字號（如 008460）需由證書確認後再上線。",
    bannedWording: "公開未經證書確認之許可證字號；TFDA approved。",
  },
  {
    id: "CL-TUMOR-CATEGORIES",
    claimText: "適用於已診斷成人腦部腫瘤：腦轉移瘤、腦膜瘤、聽神經瘤。",
    claimType: "clinical",
    pagePlacement: ["home", "products/deepbt-detector-plus"],
    sourceIds: ["S2", "S4", "S6"],
    reviewStatus: "verified",
    allowedWording: "須加上「已診斷成人腦部腫瘤」與「醫療專業人員審閱」。",
    bannedWording: "篩檢、診斷未知病灶、兒科適用。",
  },
  {
    id: "CL-MRI-INPUT",
    claimText: "支援 T1W+C 與 T2W（bi-parametric）MRI 輸入。",
    claimType: "clinical",
    pagePlacement: ["products/deepbt-detector-plus", "technology", "clinical-workflow"],
    sourceIds: ["S2", "S4"],
    reviewStatus: "verified",
    allowedWording: "T1W+C 或 T1W+C + T2W；bi-parametric MRI。",
    bannedWording: "任意 MRI 序列皆可分析。",
  },
  {
    id: "CL-DICOM-OUTPUT",
    claimText: "AI 結果以標準化 DICOM 物件輸出（首頁以 RTSS / PR 為主）。",
    claimType: "clinical",
    pagePlacement: ["home", "clinical-workflow", "technology"],
    sourceIds: ["S3", "S4", "S6"],
    reviewStatus: "verified",
    allowedWording: "DICOM RTSS / PR；SEG / SR / SC 視產品實際版本確認後再放。",
    bannedWording: "未經版本確認即列出 SEG / SR / SC。",
  },
  {
    id: "CL-HOSPITAL-DEPLOYMENT",
    claimText: "已導入台中榮總、新光醫院、台北榮總等台灣醫學中心使用中。",
    claimType: "commercial",
    pagePlacement: ["home", "evidence-regulatory"],
    sourceIds: ["U1", "S8"],
    reviewStatus: "pending-authorization",
    allowedWording:
      "未取得 logo 授權前以文字列名或「多家台灣醫學中心與醫院」呈現；不得使用醫院 logo。",
    bannedWording: "使用未授權醫院 logo / 商標。",
  },
  {
    id: "CL-PERFORMANCE",
    claimText:
      "Standalone performance：Sensitivity 88.6%、Dice 0.809、FP 0.537/case、bAHD 3.2%、Centroid 5.8%（136 病例/360 腫瘤/16 機構）。",
    claimType: "performance",
    pagePlacement: ["home#validation", "evidence-regulatory#validation"],
    sourceIds: ["U1"],
    reviewStatus: "pending-review",
    allowedWording:
      "顯示時必須標注「待法規/臨床/QA 審核確認」，並同頁說明資料來源、驗證設計、適用族群與限制；不可作為臨床療效保證。",
    bannedWording: "保證精準度、優於醫師、可取代人工判讀。",
  },
  {
    id: "CL-PATENTS",
    claimText: "具備 AI 醫療影像、腦瘤分析、DICOM 整合與 SaMD 架構之專利布局。",
    claimType: "ip",
    pagePlacement: ["evidence-regulatory#patents"],
    sourceIds: ["U1", "S8", "S9"],
    reviewStatus: "partially-verified",
    allowedWording:
      "patent portfolio / patent-pending / proprietary technologies；公開專利號前需確認狀態。",
    bannedWording: "公開未確認之專利號或揭露申請中技術細節。",
  },
  {
    id: "CL-AWARDS",
    claimText: "獲 2022 未來科技獎（國科會）與第 19 屆國家新創獎（學研新創）。",
    claimType: "commercial",
    pagePlacement: ["home", "evidence-regulatory", "about"],
    sourceIds: ["S8", "S9"],
    reviewStatus: "verified",
    allowedWording: "列明獎項名稱、年度與主辦單位。",
    bannedWording: "誇大為國際獎項或醫療效果背書。",
  },
];

export const claimById = Object.fromEntries(claims.map((c) => [c.id, c]));

/** UI helper：是否可在正式 UI 顯示（pending-review 內容需 gating 標示）。 */
export function isPublic(status: ReviewStatus) {
  return status === "verified" || status === "partially-verified";
}
