export type Metric = {
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  labelEn: string;
  note?: string;
};

export const validationMetrics: Metric[] = [
  {
    value: 88.6,
    suffix: "%",
    decimals: 1,
    label: "病灶層級敏感度",
    labelEn: "Lesion-wise Sensitivity",
  },
  {
    value: 0.809,
    suffix: "",
    decimals: 3,
    label: "病灶層級 Dice 係數",
    labelEn: "Lesion-wise Dice Coefficient",
  },
  {
    value: 0.537,
    suffix: "",
    decimals: 3,
    label: "偽陽性率",
    labelEn: "False Positive Rate",
    note: "tumors / case",
  },
  {
    value: 3.2,
    suffix: "%",
    decimals: 1,
    label: "平衡平均 Hausdorff 距離",
    labelEn: "Balanced Average Hausdorff Distance",
  },
  {
    value: 5.8,
    suffix: "%",
    decimals: 1,
    label: "質心距離",
    labelEn: "Centroid Distance",
  },
];

export const validationSummary = {
  zh: "DeepBT Detector-Plus 的 standalone performance 曾以多中心、多國回溯性資料進行評估，資料包含 136 個臨床病例與 360 個腫瘤，來自 16 家機構（含 15 家美國機構與 1 家台灣機構）。Ground-truth contours 由三位美國 board-certified radiologists 依嚴格共識建立；模型訓練資料則包含來自台灣兩大醫學中心超過 6,500 例 MRI studies。",
  en: "Standalone performance was evaluated on a multinational, multicenter retrospective dataset of 136 clinical cases and 360 tumors from 16 institutions (15 U.S., 1 Taiwan). Ground-truth contours were established by three U.S. board-certified radiologists under strict consensus; training data included over 6,500 MRI studies from two major Taiwanese medical centers.",
};

export const validationStats = [
  { value: "136", label: "臨床病例 / Clinical cases" },
  { value: "360", label: "腫瘤 / Tumors" },
  { value: "16", label: "機構 / Institutions" },
  { value: "6,500+", label: "訓練 MRI studies" },
  { value: "3", label: "board-certified radiologists" },
];

export const hospitals = [
  { name: "台中榮民總醫院", nameEn: "Taichung Veterans General Hospital" },
  { name: "新光吳火獅紀念醫院", nameEn: "Shin Kong Wu Ho-Su Memorial Hospital" },
  { name: "台北榮民總醫院", nameEn: "Taipei Veterans General Hospital" },
];

/* ----------------------------- i18n getters ----------------------------- */

import type { Locale } from "@/lib/i18n";

/** EN: labelEn 為主、label 留中文輔助（MetricsGrid 依 locale 決定主從）。 */
export const getValidationMetrics = (l: Locale): Metric[] =>
  l === "en"
    ? validationMetrics.map((m) => ({ ...m, label: m.labelEn, labelEn: m.label }))
    : validationMetrics;

const validationStatsEn = [
  { value: "136", label: "Clinical cases" },
  { value: "360", label: "Tumors" },
  { value: "16", label: "Institutions" },
  { value: "6,500+", label: "Training MRI studies" },
  { value: "3", label: "Board-certified radiologists" },
];

export const getValidationStats = (l: Locale) =>
  l === "en" ? validationStatsEn : validationStats;

export const getValidationSummary = (l: Locale) =>
  l === "en" ? validationSummary.en : validationSummary.zh;

export const getHospitals = (l: Locale) =>
  l === "en"
    ? hospitals.map((h) => ({ ...h, name: h.nameEn, nameEn: h.name }))
    : hospitals;
