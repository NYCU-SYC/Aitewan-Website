import { localizeHref, type Locale } from "@/lib/i18n";

export type NavLeaf = {
  label: string;
  labelEn?: string;
  href: string;
  desc?: string;
};

export type NavItem = NavLeaf | {
  label: string;
  labelEn?: string;
  children: NavLeaf[];
};

/** 主導航（規格書 §3：Products｜Clinical Workflow｜Evidence & Regulatory｜SaMD Services｜Research｜Resources｜About｜Contact） */
export const mainNav: NavItem[] = [
  {
    label: "平台與產品",
    labelEn: "Platform & Products",
    children: [
      {
        label: "Liger 醫學影像 AI 平台",
        labelEn: "Liger MedAI Platform",
        href: "/zh-TW/liger-platform",
        desc: "TFDA 取證之醫院端 AI 整合平台（008624）",
      },
      {
        label: "DeepBT® 腦瘤 AI 系統",
        labelEn: "DeepBT® Brain Tumor AI",
        href: "/zh-TW/deepbt",
        desc: "五類腦瘤偵測、分割、分類與報告草稿",
      },
      {
        label: "DeepBT Detector-Plus",
        labelEn: "Detector-Plus (FDA 510k)",
        href: "/zh-TW/products/deepbt-detector-plus",
        desc: "AI 輔助腦部腫瘤圈註系統與核心功能",
      },
      {
        label: "核心技術",
        labelEn: "Technology",
        href: "/zh-TW/technology",
        desc: "MRI 輸入、AI 推論、DICOM 輸出與 SaMD 架構",
      },
    ],
  },
  {
    label: "臨床流程",
    labelEn: "Clinical Workflow",
    href: "/zh-TW/clinical-workflow",
  },
  {
    label: "法規與證據",
    labelEn: "Evidence & Regulatory",
    children: [
      {
        label: "法規、品質與智財",
        labelEn: "Regulatory, Quality & IP",
        href: "/zh-TW/evidence-regulatory",
        desc: "FDA 510(k)、TFDA、ISO 13485、IEC 62304 與專利",
      },
      {
        label: "臨床驗證與導入",
        labelEn: "Clinical Evidence",
        href: "/zh-TW/evidence-regulatory#validation",
        desc: "多中心驗證摘要與醫院導入",
      },
      {
        label: "技術護城河與專利",
        labelEn: "Patent Portfolio",
        href: "/zh-TW/evidence-regulatory#patents",
        desc: "雙參數核心、演算法+工作流雙軌防護",
      },
      {
        label: "獎項與里程碑",
        labelEn: "Awards & Milestones",
        href: "/zh-TW/awards",
        desc: "國家新創獎、智慧創新大賞、InnoVEX",
      },
    ],
  },
  {
    label: "顧問服務",
    labelEn: "SaMD Services",
    href: "/zh-TW/samd-services",
  },
  {
    label: "資源",
    labelEn: "Resources",
    children: [
      {
        label: "資源中心",
        labelEn: "Resources",
        href: "/zh-TW/resources",
        desc: "影片、里程碑與資源入口",
      },
      {
        label: "影片專區",
        labelEn: "Videos",
        href: "/zh-TW/resources/videos",
        desc: "產品展示影片與媒體採訪",
      },
      {
        label: "學術發表",
        labelEn: "Research",
        href: "/zh-TW/research-publications",
        desc: "腦瘤 AI 相關同儕審查論文",
      },
    ],
  },
  { label: "關於我們", labelEn: "About", href: "/zh-TW/about" },
  { label: "聯絡我們", labelEn: "Contact", href: "/zh-TW/contact" },
];

/** Flattened footer sitemap. */
export const footerNav: { heading: string; links: NavLeaf[] }[] = [
  {
    heading: "平台與產品",
    links: [
      { label: "Liger 醫學影像 AI 平台", href: "/zh-TW/liger-platform" },
      { label: "DeepBT® 腦瘤 AI 系統", href: "/zh-TW/deepbt" },
      { label: "DeepBT Detector-Plus", href: "/zh-TW/products/deepbt-detector-plus" },
      { label: "臨床流程整合", href: "/zh-TW/clinical-workflow" },
      { label: "核心技術", href: "/zh-TW/technology" },
    ],
  },
  {
    heading: "法規與證據",
    links: [
      { label: "法規、品質與智財", href: "/zh-TW/evidence-regulatory" },
      { label: "臨床驗證與導入", href: "/zh-TW/evidence-regulatory#validation" },
      { label: "技術護城河與專利", href: "/zh-TW/evidence-regulatory#patents" },
      { label: "獎項與里程碑", href: "/zh-TW/awards" },
    ],
  },
  {
    heading: "公司與資源",
    links: [
      { label: "關於智德萬 AItewan", href: "/zh-TW/about" },
      { label: "SaMD 法規與委託取證", href: "/zh-TW/samd-services" },
      { label: "影片專區", href: "/zh-TW/resources/videos" },
      { label: "學術發表", href: "/zh-TW/research-publications" },
      { label: "聯絡我們", href: "/zh-TW/contact" },
    ],
  },
];

/* ----------------------------- i18n getters ----------------------------- */

const mainNavEn: NavItem[] = [
  {
    label: "Platform",
    children: [
      { label: "Liger MedAI Platform", href: "/zh-TW/liger-platform", desc: "TFDA-cleared hospital AI integration platform (008624)" },
      { label: "DeepBT® Brain Tumor AI", href: "/zh-TW/deepbt", desc: "5-type detection, segmentation, classification & report drafting" },
      { label: "DeepBT Detector-Plus", href: "/zh-TW/products/deepbt-detector-plus", desc: "AI-assisted brain tumor contouring system (FDA 510k)" },
      { label: "Technology", href: "/zh-TW/technology", desc: "MRI input, AI inference, DICOM output and SaMD architecture" },
    ],
  },
  { label: "Clinical", href: "/zh-TW/clinical-workflow" },
  {
    label: "Evidence",
    children: [
      { label: "Regulatory, Quality & IP", href: "/zh-TW/evidence-regulatory", desc: "FDA 510(k), TFDA, ISO 13485, IEC 62304 and patents" },
      { label: "Clinical Evidence", href: "/zh-TW/evidence-regulatory#validation", desc: "Multicenter validation and hospital deployment" },
      { label: "Patent Portfolio", href: "/zh-TW/evidence-regulatory#patents", desc: "Bi-parametric core; algorithm + workflow moat" },
      { label: "Awards & Milestones", href: "/zh-TW/awards", desc: "National Innovation Award, Smart Innovation, InnoVEX" },
    ],
  },
  { label: "SaMD", href: "/zh-TW/samd-services" },
  {
    label: "Resources",
    children: [
      { label: "Resource Center", href: "/zh-TW/resources", desc: "Videos, milestones and resources" },
      { label: "Videos", href: "/zh-TW/resources/videos", desc: "Product demos and media coverage" },
      { label: "Research", href: "/zh-TW/research-publications", desc: "Peer-reviewed brain-tumor AI publications" },
    ],
  },
  { label: "About", href: "/zh-TW/about" },
  { label: "Contact", href: "/zh-TW/contact" },
];

const footerNavEn: { heading: string; links: NavLeaf[] }[] = [
  {
    heading: "Platform & Products",
    links: [
      { label: "Liger MedAI Platform", href: "/zh-TW/liger-platform" },
      { label: "DeepBT® Brain Tumor AI", href: "/zh-TW/deepbt" },
      { label: "DeepBT Detector-Plus", href: "/zh-TW/products/deepbt-detector-plus" },
      { label: "Clinical Workflow", href: "/zh-TW/clinical-workflow" },
      { label: "Technology", href: "/zh-TW/technology" },
    ],
  },
  {
    heading: "Evidence & Regulatory",
    links: [
      { label: "Regulatory, Quality & IP", href: "/zh-TW/evidence-regulatory" },
      { label: "Clinical Evidence", href: "/zh-TW/evidence-regulatory#validation" },
      { label: "Patent Portfolio", href: "/zh-TW/evidence-regulatory#patents" },
      { label: "Awards & Milestones", href: "/zh-TW/awards" },
    ],
  },
  {
    heading: "Company & Resources",
    links: [
      { label: "About AItewan", href: "/zh-TW/about" },
      { label: "SaMD Regulatory Services", href: "/zh-TW/samd-services" },
      { label: "Videos", href: "/zh-TW/resources/videos" },
      { label: "Research", href: "/zh-TW/research-publications" },
      { label: "Contact", href: "/zh-TW/contact" },
    ],
  },
];

function localizeLeaf(l: NavLeaf, locale: Locale): NavLeaf {
  return { ...l, href: localizeHref(l.href, locale) };
}

export function getMainNav(locale: Locale): NavItem[] {
  const src = locale === "en" ? mainNavEn : mainNav;
  return src.map((item) =>
    "children" in item
      ? { ...item, children: item.children.map((c) => localizeLeaf(c, locale)) }
      : localizeLeaf(item, locale)
  );
}

export function getFooterNav(locale: Locale) {
  const src = locale === "en" ? footerNavEn : footerNav;
  return src.map((col) => ({ ...col, links: col.links.map((l) => localizeLeaf(l, locale)) }));
}
