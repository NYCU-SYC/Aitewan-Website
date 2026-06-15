/**
 * Certificate / license / award gallery items.
 *
 * Images under /public/images/{certifications,awards} are the real scans
 * exported from the company's 2026 Taipei Biotech Award application document
 * (see asset-map.md). Each item renders a graceful branded placeholder until
 * its image file exists, so the gallery never shows a broken image.
 *
 * Compliance: TFDA license numbers (008624 / 008460 / 007906) are shown only
 * because they are confirmed by the certificate scans now on file. FDA 510(k)
 * is described as a "clearance" (never "approval") with the official link.
 * DeepBT Detector A+ is intentionally absent here — it is under TFDA review,
 * not cleared, and is presented as such only on the DeepBT page.
 */

export type CertKind = "license" | "cert" | "award";

export type Certificate = {
  id: string;
  kind: CertKind;
  title: string;
  titleEn: string;
  issuer: string;
  issuerEn: string;
  date: string; // display date ("—" if not public)
  summary: string;
  summaryEn: string;
  image: string | null; // /images/… or null (no public scan)
  link?: string; // official verification link, when available
};

export const certKindLabels: Record<CertKind, string> = {
  license: "醫材許可證",
  cert: "品質認證",
  award: "獎項",
};

export const certKindLabelsEn: Record<CertKind, string> = {
  license: "Licenses",
  cert: "Certifications",
  award: "Awards",
};

export const certUiLabels = {
  zh: { all: "全部", enlarge: "放大檢視", verify: "官方查證", verifyLink: "官方查證連結", close: "關閉" },
  en: { all: "All", enlarge: "View larger", verify: "Verify", verifyLink: "Official verification link", close: "Close" },
};

export const certifications: Certificate[] = [
  {
    id: "tfda-liger-008624",
    kind: "license",
    title: "TFDA 第二類醫材許可 · Liger 醫學影像 AI 整合平台",
    titleEn: "TFDA Class II Clearance · Liger MedAI Platform",
    issuer: "衛福部食藥署 TFDA",
    issuerEn: "Taiwan FDA (TFDA), MOHW",
    date: "2025",
    summary:
      "「智慧醫療人工智慧整合管理平台」之第二類醫療器材許可（衛部醫器製字第008624號）。Liger 平台作為醫院端醫學影像 AI 導入與部署的基礎架構，本身即為取證之醫療器材。",
    summaryEn:
      "Class II medical device clearance for the intelligent medical-imaging AI management platform (License No. 008624). Liger is itself a cleared medical device that serves as the hospital-side deployment backbone for medical-imaging AI.",
    image: "/images/certifications/tfda-liger-platform-008624.jpg",
  },
  {
    id: "tfda-detector-plus-008460",
    kind: "license",
    title: "TFDA 第二類醫材許可證 · DeepBT® Detector Plus",
    titleEn: "TFDA Class II License · DeepBT® Detector Plus",
    issuer: "衛福部食藥署 TFDA",
    issuerEn: "Taiwan FDA (TFDA), MOHW",
    date: "2025",
    summary:
      "「智德萬」人工智慧腦瘤輔助分析系統之第二類醫療器材許可證（衛部醫器製字第008460號），適用聽神經瘤、腦膜瘤與腦轉移瘤之腦部磁振造影輔助分析。",
    summaryEn:
      "Class II medical device license (No. 008460) for the AItewan AI-assisted brain-tumor analysis system, covering MRI-based assistive analysis of acoustic neuroma, meningioma and brain metastasis.",
    image: "/images/certifications/tfda-deepbt-detector-plus-008460.jpg",
  },
  {
    id: "fda-510k",
    kind: "license",
    title: "美國 FDA 510(k) Clearance · K252190",
    titleEn: "U.S. FDA 510(k) Clearance · K252190",
    issuer: "U.S. FDA",
    issuerEn: "U.S. FDA",
    date: "2026-04-10",
    summary:
      "DeepBT® Detector Plus 取得美國 FDA 510(k) clearance（K252190，Substantially Equivalent），為邁向國際市場的重要里程碑。",
    summaryEn:
      "DeepBT® Detector Plus received U.S. FDA 510(k) clearance (K252190, Substantially Equivalent) — a key milestone toward international markets.",
    image: "/images/certifications/fda-510k-deepbt-detector-plus-k252190.jpg",
    link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K252190",
  },
  {
    id: "tfda-detector-007906",
    kind: "license",
    title: "TFDA 第二類醫材許可 · DeepBT® Detector",
    titleEn: "TFDA Class II Clearance · DeepBT® Detector",
    issuer: "衛福部食藥署 TFDA",
    issuerEn: "Taiwan FDA (TFDA), MOHW",
    date: "2023",
    summary:
      "DeepBT 系列第一代「人工智慧腦瘤輔助偵測系統」之第二類醫療器材許可（衛部醫器製字第007906號）。",
    summaryEn:
      "Class II clearance (No. 007906) for the first-generation DeepBT AI-assisted brain-tumor detection system.",
    image: "/images/certifications/tfda-detector.png",
  },
  {
    id: "iso-13485",
    kind: "cert",
    title: "ISO 13485 醫療器材品質管理系統",
    titleEn: "ISO 13485 Quality Management System",
    issuer: "SGS",
    issuerEn: "SGS",
    date: "—",
    summary:
      "涵蓋放射醫學影像分析軟體之設計、開發與最終驗放作業之 ISO 13485 品質管理系統認證。",
    summaryEn:
      "ISO 13485 quality-management-system certification covering the design, development and final release of radiological image-analysis software.",
    image: "/images/certifications/iso-13485-sgs-certificate.jpg",
  },
  {
    id: "manufacturing-license",
    kind: "license",
    title: "醫療器材製造業許可（QMS2129）",
    titleEn: "Medical Device Manufacturing License (QMS2129)",
    issuer: "衛生主管機關",
    issuerEn: "Health authority",
    date: "2023",
    summary: "取得醫療器材製造業許可，具備自有醫材設計、製造與最終驗放之合規資格。",
    summaryEn:
      "Medical-device manufacturing license, qualifying AItewan to design, manufacture and release its own medical devices in compliance.",
    image: "/images/certifications/medical-device-manufacturing-license.jpg",
  },
  {
    id: "distribution-license",
    kind: "license",
    title: "醫療器材販賣業許可",
    titleEn: "Medical Device Distribution License",
    issuer: "衛生主管機關",
    issuerEn: "Health authority",
    date: "2023",
    summary: "取得醫療器材販賣業許可，得以販賣業者身分經營醫療器材。",
    summaryEn: "Medical-device distribution license, qualifying AItewan to distribute medical devices.",
    image: "/images/certifications/distribution-license.jpg",
  },
  {
    id: "national-innovation",
    kind: "award",
    title: "國家新創獎 · 學研新創組 + 精進獎",
    titleEn: "National Innovation Award · Academia Spin-off + Elite",
    issuer: "生策會",
    issuerEn: "Institute for Biotechnology and Medicine Industry",
    date: "2023",
    summary: "DeepBT® 腦瘤智慧精準醫療系統獲第 19 屆國家新創獎（學研新創組）及國家新創精進獎肯定。",
    summaryEn:
      "The DeepBT® brain-tumor precision-medicine system received the 19th National Innovation Award (academia spin-off) and the National Innovation Elite Award.",
    image: "/images/awards/national-innovation-award.jpg",
  },
  {
    id: "innotech-liteon",
    kind: "award",
    title: "2024 台灣創新技術博覽會 · 光寶科技特別獎",
    titleEn: "2024 Taiwan Innotech Expo · LITEON Special Award",
    issuer: "經濟部 / 光寶科技",
    issuerEn: "MOEA / LITEON",
    date: "2024",
    summary: "於 2024 台灣創新技術博覽會發明競賽獲光寶科技特別獎，並獲頒發明競賽銀牌獎。",
    summaryEn:
      "Received the LITEON Special Award and an invention-competition Silver Medal at the 2024 Taiwan Innotech Expo.",
    image: "/images/awards/taiwan-innotech-expo-liteon-award.jpg",
  },
  {
    id: "smart-innovation-2025",
    kind: "award",
    title: "2025 智慧創新大賞 · 精準健康類入圍",
    titleEn: "2025 Smart Innovation Award · Precision-Health Finalist",
    issuer: "經濟部",
    issuerEn: "MOEA",
    date: "2025",
    summary: "以 Liger 平台與 DeepBT® 腦瘤 AI 入圍 2025 智慧創新大賞精準健康類。",
    summaryEn:
      "Selected as a precision-health finalist of the 2025 Smart Innovation Award with the Liger platform and DeepBT® brain-tumor AI.",
    image: "/images/awards/smart-innovation-2025-finalist.jpg",
  },
  {
    id: "future-tech",
    kind: "award",
    title: "未來科技獎 · 精準健康類",
    titleEn: "Future Tech Award · Precision Health",
    issuer: "國家科學及技術委員會",
    issuerEn: "National Science and Technology Council",
    date: "—",
    summary: "DeepBT® 核心技術獲未來科技獎精準健康類肯定。",
    summaryEn: "The DeepBT® core technology was recognized in the precision-health category of the Future Tech Award.",
    image: null,
  },
];
