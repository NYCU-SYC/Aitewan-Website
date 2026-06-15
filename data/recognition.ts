import type { IconName } from "@/components/ui/Icon";

/** Awards & regulatory recognition wall (real, publicly announced items). */
export type Award = {
  icon: IconName;
  year: string;
  title: string;
  issuer: string;
};

export const awards: Award[] = [
  {
    icon: "badge",
    year: "2026",
    title: "美國 FDA 510(k) Clearance",
    issuer: "U.S. FDA · K252190 · 2026-04-10",
  },
  {
    icon: "shield",
    year: "2025",
    title: "TFDA 二類醫材查驗登記（輔助分析系統）",
    issuer: "台灣衛福部食藥署",
  },
  {
    icon: "shield",
    year: "2023",
    title: "TFDA 二類醫材查驗登記（輔助偵測系統）",
    issuer: "台灣衛福部食藥署",
  },
  {
    icon: "award",
    year: "2022",
    title: "未來科技獎",
    issuer: "國科會",
  },
  {
    icon: "award",
    year: "2022",
    title: "國家新創獎 · 學研新創 + 精進獎",
    issuer: "生策會（第 19 屆 + 精進獎）",
  },
  {
    icon: "quality",
    year: "QMS",
    title: "ISO 13485 品質管理系統",
    issuer: "醫療器材品質管理",
  },
];

/** Award detail cards with the value each recognition represents. */
export type AwardDetail = {
  image: string | null;
  year: string;
  title: string;
  titleEn: string;
  issuer: string;
  issuerEn: string;
  value: string;
  valueEn: string;
};

export const awardsDetailed: AwardDetail[] = [
  {
    image: "/images/awards/national-innovation-award.jpg",
    year: "2023",
    title: "國家新創獎 · 學研新創組 + 國家新創精進獎",
    titleEn: "National Innovation Award · Academia Spin-off + Elite Award",
    issuer: "生策會（第 19 屆）",
    issuerEn: "Institute for Biotechnology and Medicine Industry (19th)",
    value: "代表學術研究成果成功轉化為新創產品，並獲產業肯定其持續精進與商業化推進能力。",
    valueEn: "Recognizes the translation of academic research into a startup product, and the company's sustained advancement and commercialization capability.",
  },
  {
    image: "/images/awards/taiwan-innotech-expo-liteon-award.jpg",
    year: "2024",
    title: "台灣創新技術博覽會 · 光寶科技特別獎 + 發明競賽銀牌獎",
    titleEn: "Taiwan Innotech Expo · LITEON Special Award + Silver Medal",
    issuer: "經濟部 / 光寶科技",
    issuerEn: "MOEA / LITEON",
    value: "技術創新獲產業領導廠商肯定，展現腦瘤 AI 在醫療影像應用上的商業化潛力。",
    valueEn: "Technical innovation recognized by an industry leader, signalling the commercialization potential of brain-tumor AI in medical imaging.",
  },
  {
    image: "/images/awards/smart-innovation-2025-finalist.jpg",
    year: "2025",
    title: "智慧創新大賞 · 精準健康類入圍",
    titleEn: "Smart Innovation Award · Precision-Health Finalist",
    issuer: "經濟部",
    issuerEn: "MOEA",
    value: "肯定 Liger 平台與 DeepBT® 在 AI 精準健康與醫療影像落地上的應用價值。",
    valueEn: "Acknowledges the applied value of the Liger platform and DeepBT® in AI precision health and real-world medical imaging.",
  },
  {
    image: null,
    year: "—",
    title: "未來科技獎 · 精準健康類",
    titleEn: "Future Tech Award · Precision Health",
    issuer: "國家科學及技術委員會",
    issuerEn: "National Science and Technology Council",
    value: "肯定前瞻 AI 醫療影像技術與臨床轉譯潛力。",
    valueEn: "Recognizes frontier AI medical-imaging technology and its clinical-translation potential.",
  },
];

/** Exhibitions / events gallery. */
export type EventItem = { image: string; caption: string; captionEn: string };
export const events: EventItem[] = [
  { image: "/images/events/innovex-2026-booth-1.jpg", caption: "2026 InnoVEX 新創特展 · Liger 與 DeepBT® 展示", captionEn: "InnoVEX 2026 · showcasing Liger and DeepBT®" },
  { image: "/images/events/innovex-2026-booth-2.jpg", caption: "2026 InnoVEX 新創特展 · 現場交流", captionEn: "InnoVEX 2026 · visitor engagement" },
  { image: "/images/events/smart-innovation-2025-exhibition-1.jpg", caption: "2025 智慧創新大賞展 · 產品展示", captionEn: "2025 Smart Innovation Award exhibition · product demo" },
  { image: "/images/events/smart-innovation-2025-exhibition-2.jpg", caption: "2025 智慧創新大賞展 · 臨床對談", captionEn: "2025 Smart Innovation Award exhibition · clinical discussion" },
  { image: "/images/events/exhibition-demo-1.jpg", caption: "展會現場 · DeepBT® 工作站實機展示", captionEn: "Exhibition floor · live DeepBT® workstation demo" },
  { image: "/images/events/exhibition-demo-2.jpg", caption: "展會現場 · 一對一產品導覽", captionEn: "Exhibition floor · one-on-one product walkthrough" },
];

/** Company milestones (dates from公開新聞 on the official site + filing). */
export type Milestone = { date: string; text: string };

export const milestones: Milestone[] = [
  { date: "2023", text: "獲第 19 屆國家新創獎（學研新創組）與國家新創精進獎肯定" },
  { date: "2023.07", text: "DeepBT® Detector 人工智慧腦瘤輔助偵測系統通過 TFDA 二類醫材許可（第007906號）" },
  { date: "2023.08", text: "取得醫療器材販賣業與製造業許可（QMS2129）" },
  { date: "2024", text: "獲 2024 台灣創新技術博覽會發明競賽銀牌獎、光寶科技特別獎" },
  { date: "2025", text: "Liger 醫學影像 AI 整合平台取得 TFDA 二類醫材許可（第008624號）；DeepBT® Detector Plus 取得 TFDA 許可（第008460號）；入圍 2025 智慧創新大賞" },
  { date: "2026.04", text: "DeepBT® Detector Plus 獲美國 FDA 510(k) clearance（K252190，Substantially Equivalent）" },
  { date: "2026", text: "DeepBT® Detector A+（第三代，五類腦瘤）TFDA 審查中；參與 2026 InnoVEX 展會" },
];

/** Partners & collaborations (text-listed; logos pending authorization). */
export type Partner = { name: string; nameEn?: string; tag: string };

export const partners: Partner[] = [
  { name: "國立陽明交通大學", nameEn: "NYCU", tag: "技術衍生" },
  { name: "台北榮民總醫院", nameEn: "Taipei VGH", tag: "臨床合作" },
  { name: "台中榮民總醫院", nameEn: "Taichung VGH", tag: "臨床導入" },
  { name: "新光吳火獅紀念醫院", nameEn: "Shin Kong Hospital", tag: "臨床導入" },
  { name: "振興醫院", nameEn: "Cheng Hsin General Hospital", tag: "臨床合作" },
  { name: "陽明交通大學附設醫院", nameEn: "NYCU Hospital", tag: "臨床合作" },
];

/* ----------------------------- i18n getters ----------------------------- */

import type { Locale } from "@/lib/i18n";

const awardsEn: Award[] = [
  { icon: "badge", year: "2026", title: "U.S. FDA 510(k) Clearance", issuer: "U.S. FDA · K252190 · 2026-04-10" },
  { icon: "shield", year: "2025", title: "TFDA Class II Registration (Analysis System)", issuer: "Taiwan FDA, MOHW" },
  { icon: "shield", year: "2023", title: "TFDA Class II Registration (Detection System)", issuer: "Taiwan FDA, MOHW" },
  { icon: "award", year: "2022", title: "Future Tech Award", issuer: "National Science & Technology Council" },
  { icon: "award", year: "2022", title: "National Innovation Award + Elite Award", issuer: "Academia Spin-off (19th + Elite)" },
  { icon: "quality", year: "QMS", title: "ISO 13485 Quality Management", issuer: "Medical-device quality system" },
];

const milestonesEn: Milestone[] = [
  { date: "2023", text: "Recognized with the 19th National Innovation Award (academia spin-off) and the National Innovation Elite Award" },
  { date: "2023.07", text: "DeepBT® Detector AI brain-tumor detection system received TFDA Class II clearance (No. 007906)" },
  { date: "2023.08", text: "Obtained medical-device distribution and manufacturing licenses (QMS2129)" },
  { date: "2024", text: "Received the Silver Medal and LITEON Special Award at the 2024 Taiwan Innotech Expo" },
  { date: "2025", text: "Liger MedAI Platform received TFDA Class II clearance (No. 008624); DeepBT® Detector Plus cleared by TFDA (No. 008460); finalist of the 2025 Smart Innovation Award" },
  { date: "2026.04", text: "DeepBT® Detector Plus received U.S. FDA 510(k) clearance (K252190, Substantially Equivalent)" },
  { date: "2026", text: "DeepBT® Detector A+ (3rd generation, five tumor types) under TFDA review; exhibited at InnoVEX 2026" },
];

const partnersEn: Partner[] = [
  { name: "National Yang Ming Chiao Tung University", nameEn: "技術衍生", tag: "Academic origin" },
  { name: "Taipei Veterans General Hospital", nameEn: "台北榮總", tag: "Clinical partner" },
  { name: "Taichung Veterans General Hospital", nameEn: "台中榮總", tag: "Deployment" },
  { name: "Shin Kong Wu Ho-Su Memorial Hospital", nameEn: "新光醫院", tag: "Deployment" },
  { name: "Cheng Hsin General Hospital", nameEn: "振興醫院", tag: "Clinical partner" },
  { name: "NYCU Hospital", nameEn: "陽明交大附醫", tag: "Clinical partner" },
];

export const getAwards = (l: Locale) => (l === "en" ? awardsEn : awards);
export const getMilestones = (l: Locale) => (l === "en" ? milestonesEn : milestones);
export const getPartners = (l: Locale) => (l === "en" ? partnersEn : partners);

export const getAwardsDetailed = (l: Locale) =>
  awardsDetailed.map((a) => ({
    image: a.image,
    year: a.year,
    title: l === "en" ? a.titleEn : a.title,
    issuer: l === "en" ? a.issuerEn : a.issuer,
    value: l === "en" ? a.valueEn : a.value,
  }));

export const getEvents = (l: Locale) =>
  events.map((e) => ({ src: e.image, caption: l === "en" ? e.captionEn : e.caption }));
