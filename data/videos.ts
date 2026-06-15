import type { ReviewStatus } from "@/lib/claims-registry";

/** VideoAsset model（規格書 §13 / §9 Video Asset Plan）。 */
export type VideoAsset = {
  id: string;
  title: string;
  titleEn?: string;
  /** YouTube videoId 或本地 mp4 路徑 */
  youtubeId?: string;
  src?: string;
  poster: string;
  description: string;
  disclaimer: string;
  intendedPlacement: string[];
  sourceIds: string[];
  reviewStatus: ReviewStatus;
};

export const videos: VideoAsset[] = [
  {
    id: "video-deepbt-demo",
    title: "DeepBT Detector-Plus 腦瘤 AI 圈註展示",
    titleEn: "DeepBT Detector-Plus Brain Tumor AI Contouring Demonstration",
    youtubeId: "6ah9Btp2W8A",
    poster: "/images/video-deepbt-poster.jpg",
    description:
      "官方產品影片：AI 輔助腦部腫瘤初步圈註、案例管理、PACS / TPS 整合與 DICOM 輸出。",
    disclaimer:
      "AI 產生之輪廓僅供合格醫療專業人員審閱、確認或修改，不可作為唯一診斷或治療依據。",
    intendedPlacement: ["home#demo", "products/deepbt-detector-plus#demo", "resources/videos"],
    sourceIds: ["S3"],
    reviewStatus: "verified",
  },
  {
    id: "video-media-interview",
    title: "台灣新視野採訪 — 智德萬腦部腫瘤 AI",
    titleEn: "Taiwan New Vision Interview",
    youtubeId: "1pUaOUv1fUY",
    poster: "/images/video-interview-poster.jpg",
    description: "公開媒體採訪：公司研發背景與 DeepBT 臨床應用方向（非醫療建議）。",
    disclaimer: "內容僅作公司介紹與技術說明，非醫療建議。",
    intendedPlacement: ["about#media", "resources/videos"],
    sourceIds: ["S29"],
    reviewStatus: "verified",
  },
  {
    id: "video-tps-eclipse-demo",
    title: "TPS(Eclipse) 中使用 DeepBT 的腦瘤 AI 服務",
    youtubeId: undefined,
    // Owned-01：待公司提供檔案後放置於此路徑（需去識別化、加字幕、製作 16:9 poster）
    src: "/videos/deepbt-tps-eclipse-demo.mp4",
    poster: "/images/video-deepbt-poster.jpg",
    description: "TPS / Eclipse 工作流程中審閱 DeepBT AI 初步輪廓之展示。",
    disclaimer:
      "AI 產生之輪廓僅供合格醫療專業人員審閱、確認或修改，不可作為唯一診斷或治療依據。",
    intendedPlacement: ["home#demo", "clinical-workflow"],
    sourceIds: ["U1"],
    reviewStatus: "pending-authorization",
  },
];

/* ----------------------------- i18n getters ----------------------------- */

import type { Locale } from "@/lib/i18n";

const videoStringsEn: Record<string, Pick<VideoAsset, "title" | "description" | "disclaimer">> = {
  "video-deepbt-demo": {
    title: "DeepBT Detector-Plus Brain Tumor AI Contouring Demonstration",
    description: "Official product video: AI-assisted preliminary contouring, case management, PACS / TPS integration and DICOM output.",
    disclaimer: "AI-generated contours are for review, confirmation or modification by qualified medical professionals only, and must not be used as the sole basis for diagnosis or treatment.",
  },
  "video-media-interview": {
    title: "Taiwan New Vision Interview — AItewan Brain Tumor AI",
    description: "Public media interview covering the company's R&D background and the clinical direction of DeepBT (not medical advice).",
    disclaimer: "Content is provided for company and technology introduction only; it is not medical advice.",
  },
  "video-tps-eclipse-demo": {
    title: "Using DeepBT Brain Tumor AI in a TPS (Eclipse)",
    description: "Demonstration of reviewing DeepBT preliminary contours within a TPS / Eclipse workflow.",
    disclaimer: "AI-generated contours are for review, confirmation or modification by qualified medical professionals only, and must not be used as the sole basis for diagnosis or treatment.",
  },
};

export function getVideos(l: Locale): VideoAsset[] {
  if (l !== "en") return videos;
  return videos.map((v) => ({ ...v, ...(videoStringsEn[v.id] ?? {}) }));
}
