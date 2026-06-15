/**
 * Central site configuration — company identity, contact routes, CTAs and the
 * compliance language that must appear consistently across the whole site.
 *
 * NOTE (待補 / pending client confirmation): domain, e-mail and phone below are
 * placeholders. Replace with official values before launch.
 */

export const site = {
  name: "智德萬 AItewan 生醫科技股份有限公司",
  shortName: "智德萬 AItewan",
  nameEn: "AItewan BioMedical Technology Inc.",
  product: "DeepBT Detector-Plus",
  tagline: "AI 輔助腦部腫瘤圈註，串接臨床放射治療流程",
  taglineEn: "AI-Assisted Brain Tumor Contouring for Clinical Radiotherapy Workflow",
  description:
    "智德萬 AItewan 專注於腦部腫瘤 MRI 影像分析、AI 輔助圈註、DICOM 臨床流程整合與 SaMD 醫療器材法規取證。核心產品 DeepBT Detector-Plus 已取得台灣 TFDA 第二類醫療器材許可，並獲美國 FDA 510(k) clearance。",
  url: "https://www.aitewan-bio.com",
  locale: "zh-Hant-TW",
} as const;

// Public contact details (from the company's official site aitewan-bio.com).
export const contact = {
  email: "services.dept@aitewan-bio.com",
  businessEmail: "services.dept@aitewan-bio.com",
  phone: "+886-2-2826-7169",
  fax: "+886-2-8192-6769",
  addressLine: "台北市北投區裕民六路 1 號 7 樓",
  addressNote: "傳真 02-8192-6769",
} as const;

/** Re-usable compliance statements — single source of truth. */
export const compliance = {
  shortZh:
    "AI 產生之輪廓僅作為輔助參考，所有結果皆須由合格醫療專業人員審閱、確認或修改後，方可用於後續治療計畫流程。",
  shortEn:
    "AI-generated contours are preliminary references only and must be reviewed, confirmed, or modified by qualified medical professionals before clinical use.",
  productZh:
    "DeepBT Detector-Plus 為 AI 輔助工具，並非獨立診斷工具。所有 AI 產生之腫瘤輪廓皆須由合格醫療專業人員於臨床影像或治療計畫系統中審閱、確認或修改後，方可作為後續治療計畫參考。",
  badges: [
    "AI-assisted preliminary contouring only",
    "Physician-led review required",
    "Not intended to replace professional medical judgment",
  ],
} as const;

/** Canonical CTA targets, reused across pages. */
export const ctas = {
  demo: { label: "申請產品展示", href: "/zh-TW/contact?intent=demo" },
  hospital: { label: "醫療院所導入諮詢", href: "/zh-TW/contact?intent=hospital" },
  video: { label: "觀看 DeepBT 展示影片", href: "/zh-TW/products/deepbt-detector-plus#demo" },
  product: { label: "了解 DeepBT Detector-Plus", href: "/zh-TW/products/deepbt-detector-plus" },
  samd: { label: "SaMD 取證諮詢", href: "/zh-TW/contact?intent=samd" },
  security: { label: "醫療器材資安輔導", href: "/zh-TW/contact?intent=security" },
  research: { label: "研究合作洽詢", href: "/zh-TW/contact?intent=research" },
  patent: { label: "專利與技術合作洽詢", href: "/zh-TW/contact?intent=patent" },
  invest: { label: "投資與商業合作", href: "/zh-TW/contact?intent=invest" },
  contact: { label: "聯絡我們", href: "/zh-TW/contact" },
} as const;

export const compliancePending = {
  note:
    "本網站部分證書圖檔、官方文件、醫院 logo、正式專利號與論文連結尚待客戶提供正式授權與資料，目前以文字或預留位置呈現。",
} as const;

/* ----------------------------- i18n getters ----------------------------- */

import { localizeHref, type Locale } from "@/lib/i18n";

const ctasEn = {
  demo: { label: "Request a Demo", href: "/zh-TW/contact?intent=demo" },
  hospital: { label: "Hospital Deployment Inquiry", href: "/zh-TW/contact?intent=hospital" },
  video: { label: "Watch the DeepBT Demo", href: "/zh-TW/products/deepbt-detector-plus#demo" },
  product: { label: "Explore DeepBT Detector-Plus", href: "/zh-TW/products/deepbt-detector-plus" },
  samd: { label: "SaMD Regulatory Consulting", href: "/zh-TW/contact?intent=samd" },
  security: { label: "Medical Device Cybersecurity", href: "/zh-TW/contact?intent=security" },
  research: { label: "Research Collaboration", href: "/zh-TW/contact?intent=research" },
  patent: { label: "IP & Technology Partnerships", href: "/zh-TW/contact?intent=patent" },
  invest: { label: "Investor & Business Partnerships", href: "/zh-TW/contact?intent=invest" },
  contact: { label: "Contact Us", href: "/zh-TW/contact" },
} as const;

export type Cta = { label: string; href: string };
export type CtaKey = keyof typeof ctas;

/** Locale-aware CTA set（href 已轉為對應 locale 前綴）。 */
export function getCtas(locale: Locale): Record<CtaKey, Cta> {
  const src = locale === "en" ? ctasEn : ctas;
  return Object.fromEntries(
    Object.entries(src).map(([k, v]) => [k, { ...v, href: localizeHref(v.href, locale) }])
  ) as Record<CtaKey, Cta>;
}

/** Compliance copy per locale（zh 版主文 + 英文小字；en 版以英文為主）。 */
export function getCompliance(locale: Locale) {
  if (locale === "en") {
    return {
      main: compliance.shortEn,
      sub: "All AI-generated contours must be reviewed, confirmed, or modified by qualified medical professionals before use in downstream treatment-planning workflows.",
      product:
        "DeepBT Detector-Plus is an AI-assisted tool, not an independent diagnostic device. All AI-generated tumor contours must be reviewed, confirmed, or modified by qualified medical professionals within clinical imaging or treatment planning systems before being used as a reference for treatment planning.",
    };
  }
  return {
    main: compliance.shortZh,
    sub: compliance.shortEn,
    product: compliance.productZh,
  };
}

export function getSiteStrings(locale: Locale) {
  if (locale === "en") {
    return {
      companyLine: site.nameEn,
      companySub: "AItewan BioMedical Technology Inc.",
      footerRights: `© ${new Date().getFullYear()} AItewan BioMedical Technology Inc. All rights reserved.`,
      footerNote: "DeepBT Detector-Plus is an AI-assisted tool, not an independent diagnostic device.",
      complianceHeading: "Compliance",
      addressLine: "7F, No. 1, Yumin 6th Rd, Beitou District, Taipei, Taiwan",
      addressNote: "Fax +886-2-8192-6769",
      pendingNote:
        "Certain certificate images, official documents, hospital logos, patent numbers and publication links are pending formal authorization and are shown as text or placeholders.",
    };
  }
  return {
    companyLine: site.name,
    companySub: site.nameEn,
    footerRights: `© ${new Date().getFullYear()} ${site.shortName} 生醫科技股份有限公司. All rights reserved.`,
    footerNote: "DeepBT Detector-Plus 為 AI 輔助工具，非獨立診斷工具。",
    complianceHeading: "合規聲明 · Compliance",
    addressLine: contact.addressLine,
    addressNote: contact.addressNote,
    pendingNote: compliancePending.note,
  };
}
