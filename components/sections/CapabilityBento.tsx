import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/lib/i18n";

type Cell = {
  icon: IconName;
  title: string;
  body: string;
  className: string;
};

/**
 * Bento-grid key capabilities (home redesign). Scannable, low-text cells of
 * varying size. The lead cell is a dark, visual-forward tile; the rest are
 * compact icon cards. zh-TW canonical (EN via DOM translator).
 */
const cells: Cell[] = [
  {
    icon: "contour",
    title: "AI 輔助腫瘤圈註",
    body: "針對已診斷成人腦部腫瘤產生初步輪廓，作為醫師審閱的起點。",
    className: "sm:col-span-2 sm:row-span-2",
  },
  {
    icon: "brain",
    title: "三類取證腫瘤",
    body: "腦轉移瘤、腦膜瘤、聽神經瘤。",
    className: "",
  },
  {
    icon: "layers",
    title: "雙參數 MRI",
    body: "支援 T1W+C 與 T2W 輸入。",
    className: "",
  },
  {
    icon: "workflow",
    title: "標準化 DICOM 輸出",
    body: "DICOM PR / RTSS 串接 PACS、TPS。",
    className: "",
  },
  {
    icon: "stethoscope",
    title: "醫師主導審閱",
    body: "所有結果由合格醫療專業人員確認或修改。",
    className: "",
  },
  {
    icon: "chart",
    title: "縱向量化追蹤",
    body: "提供腫瘤體積變化之客觀量化參考。",
    className: "",
  },
];

const cellsEn: Cell[] = [
  {
    icon: "contour",
    title: "AI-Assisted Tumor Contouring",
    body: "Generates preliminary contours for diagnosed adult brain tumors as a starting point for physician review.",
    className: "sm:col-span-2 sm:row-span-2",
  },
  {
    icon: "brain",
    title: "Three Cleared Tumor Types",
    body: "Brain metastases, meningiomas and acoustic neuromas.",
    className: "",
  },
  {
    icon: "layers",
    title: "Bi-parametric MRI",
    body: "Supports T1W+C and T2W inputs.",
    className: "",
  },
  {
    icon: "workflow",
    title: "Standardized DICOM Output",
    body: "DICOM PR / RTSS connects to PACS and TPS.",
    className: "",
  },
  {
    icon: "stethoscope",
    title: "Physician-Led Review",
    body: "Every result is confirmed or modified by qualified medical professionals.",
    className: "",
  },
  {
    icon: "chart",
    title: "Longitudinal Quantification",
    body: "Provides objective quantitative references for tumor-volume changes.",
    className: "",
  },
];

export function CapabilityBento({ locale = "zh-TW" }: { locale?: Locale }) {
  const en = locale === "en";
  const items = en ? cellsEn : cells;
  return (
    <div className="grid auto-rows-[minmax(0,1fr)] gap-4 sm:grid-cols-3">
      {items.map((c, i) => {
        const lead = i === 0;
        return (
          <Reveal key={c.title} delay={(i % 3) * 0.06} className={c.className}>
            <div
              className={`tech-card group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                lead
                  ? "border-accent-300/20 bg-gradient-to-br from-brand-950 to-brand-900 text-white hover:border-accent-300/40"
                  : "border-line bg-white hover:border-brand-200 hover:shadow-brand-900/5"
              }`}
            >
              {lead && <span aria-hidden className="medical-grid absolute inset-0 opacity-[0.12]" />}
              <span
                className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                  lead
                    ? "bg-white/10 text-accent-300 ring-1 ring-white/15"
                    : "bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700"
                }`}
              >
                <Icon name={c.icon} size={22} />
              </span>
              <h3 className={`relative mt-4 font-semibold ${lead ? "text-xl text-white" : "text-base text-ink"}`}>
                {c.title}
              </h3>
              <p className={`relative mt-2 text-sm leading-relaxed ${lead ? "text-brand-100/85" : "text-ink-soft"}`}>
                {c.body}
              </p>
              {lead && (
                <Link
                  href={`/${locale}/products/deepbt-detector-plus`}
                  className="relative mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent-300 hover:text-accent-200"
                >
                  {en ? "Explore DeepBT Detector-Plus" : "了解 DeepBT Detector-Plus"}
                  <Icon name="arrowRight" size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
