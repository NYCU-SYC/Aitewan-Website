import { YouTubeFacade } from "@/components/ui/YouTubeFacade";

/**
 * Demo video block — plays the official DeepBT Detector-Plus demo (YouTube,
 * facade-loaded for performance). The clip is the company's public product
 * video; all AI output shown is reviewed by professionals (see caption).
 */
export function VideoDemoCard({
  videoId = "6ah9Btp2W8A",
  poster = "/images/video-deepbt-poster.jpg",
  title = "DeepBT Detector-Plus 腦瘤 AI 圈註展示",
  caption = "AI-generated preliminary contours reviewed in a treatment planning workflow",
}: {
  videoId?: string;
  poster?: string;
  title?: string;
  caption?: string;
}) {
  return (
    <div>
      <YouTubeFacade videoId={videoId} poster={poster} title={title} />
      <p className="mt-3 text-center text-xs leading-relaxed text-ink-muted">
        {caption}
      </p>
    </div>
  );
}
