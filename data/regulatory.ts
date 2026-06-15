import type { IconName } from "@/components/ui/Icon";
import type { ReviewStatus } from "@/lib/claims-registry";

export type RegulatoryCard = {
  icon: IconName;
  title: string;
  titleEn: string;
  body: string;
  /** pending official artifact (certificate image / number / link) */
  pending?: string;
  /** claims-registry linkage（規格書 §2 / §7 EvidenceCard） */
  claimId?: string;
  reviewStatus?: ReviewStatus;
  officialUrl?: string;
};

export const regulatoryCards: RegulatoryCard[] = [
  {
    icon: "layers",
    title: "Liger 平台 · TFDA 第二類醫療器材許可",
    titleEn: "Liger MedAI Platform · TFDA Class II Clearance",
    body: "Liger 醫學影像 AI 整合平台已取得台灣 TFDA 第二類醫療器材許可（衛部醫器製字第008624號），作為醫院端醫學影像 AI 部署與整合的取證基礎架構，可承載多個 AI 模組並串接 DICOM／PACS 流程。",
    claimId: "CL-TFDA-CLASS2",
    reviewStatus: "verified",
  },
  {
    icon: "shield",
    title: "DeepBT® Detector Plus · TFDA 第二類醫療器材許可",
    titleEn: "DeepBT® Detector Plus · TFDA Class II Clearance",
    body: "DeepBT® Detector Plus 取得台灣 TFDA 第二類醫療器材許可（衛部醫器製字第008460號），為 AI 輔助腦部腫瘤分析系統；第一代 DeepBT® Detector 亦已取得 TFDA 許可（第007906號）。",
    claimId: "CL-TFDA-CLASS2",
    reviewStatus: "verified",
  },
  {
    icon: "badge",
    title: "美國 FDA 510(k) Clearance",
    titleEn: "U.S. FDA 510(k) Clearance · K252190",
    body: "DeepBT® Detector Plus 已獲美國 FDA 510(k) clearance（K252190），Decision Date 2026-04-10，認定 Substantially Equivalent，為台灣市場獨有之同時取得 TFDA 與 FDA 取證的腦瘤 AI 產品。",
    claimId: "CL-FDA-510K",
    reviewStatus: "verified",
    officialUrl:
      "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K252190",
  },
  {
    icon: "quality",
    title: "ISO 13485 品質管理系統",
    titleEn: "ISO 13485 Quality Management System",
    body: "通過 ISO 13485 醫療器材品質管理系統認證（SGS），涵蓋放射醫學影像分析軟體之設計開發管制、風險管理、驗證與確效、上市後監督與變更管理。",
    reviewStatus: "verified",
  },
  {
    icon: "compliance",
    title: "IEC 62304 醫療軟體生命週期",
    titleEn: "IEC 62304 Medical Software Life Cycle",
    body: "產品開發遵循 IEC 62304 醫療器材軟體生命週期標準，建立完整的軟體驗證與確認（V&V）流程，支持 SaMD 產品的可追溯性與安全性。",
    reviewStatus: "verified",
  },
  {
    icon: "factory",
    title: "醫療器材製造業與販賣業許可",
    titleEn: "Medical Device Manufacturing & Distribution Licenses",
    body: "具備衛福部醫療器材製造業（QMS2129）與販賣業許可，支援醫療軟體、AI 醫療器材與 SaMD 產品從開發、品質系統、上市前準備到上市後維護的完整生命週期管理。",
    reviewStatus: "verified",
  },
];

/* ----------------------------- i18n getters ----------------------------- */

import type { Locale } from "@/lib/i18n";

const regulatoryCardsEn: RegulatoryCard[] = [
  { icon: "layers", title: "Liger MedAI Platform · TFDA Class II Clearance", titleEn: "Liger 平台 · TFDA 第二類醫療器材許可", body: "The Liger medical-imaging AI integration platform holds Taiwan TFDA Class II medical device clearance (License No. 008624) — a cleared deployment backbone that can host multiple AI modules and connect to DICOM/PACS workflows.", claimId: "CL-TFDA-CLASS2", reviewStatus: "verified" },
  { icon: "shield", title: "DeepBT® Detector Plus · TFDA Class II Clearance", titleEn: "DeepBT® Detector Plus · TFDA 第二類醫療器材許可", body: "DeepBT® Detector Plus holds Taiwan TFDA Class II clearance (License No. 008460) as an AI-assisted brain-tumor analysis system; the first-generation DeepBT® Detector is also cleared (No. 007906).", claimId: "CL-TFDA-CLASS2", reviewStatus: "verified" },
  { icon: "badge", title: "U.S. FDA 510(k) Clearance · K252190", titleEn: "美國 FDA 510(k) · 2026-04-10", body: "DeepBT® Detector Plus received U.S. FDA 510(k) clearance (K252190, decision April 10, 2026, Substantially Equivalent) — the only brain-tumor AI product on the Taiwan market with both TFDA and FDA clearance.", claimId: "CL-FDA-510K", reviewStatus: "verified", officialUrl: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K252190" },
  { icon: "quality", title: "ISO 13485 Quality Management System", titleEn: "ISO 13485 品質管理系統", body: "ISO 13485 quality-management-system certification (SGS) covering design controls, risk management, verification and validation, post-market surveillance and change management for radiological image-analysis software." , reviewStatus: "verified" },
  { icon: "compliance", title: "IEC 62304 Medical Software Life Cycle", titleEn: "IEC 62304 醫療軟體生命週期", body: "Product development follows the IEC 62304 medical-device software life-cycle standard, with full software verification and validation (V&V) processes supporting SaMD traceability and safety.", reviewStatus: "verified" },
  { icon: "factory", title: "Manufacturing & Distribution Licenses", titleEn: "醫療器材製造業與販賣業許可", body: "Taiwan MOHW medical-device manufacturing (QMS2129) and distribution licenses, supporting full life-cycle management from development and QMS to pre-market preparation and post-market maintenance.", reviewStatus: "verified" },
];

export const getRegulatoryCards = (l: Locale) =>
  l === "en" ? regulatoryCardsEn : regulatoryCards;
