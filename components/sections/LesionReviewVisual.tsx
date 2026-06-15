import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

const lesionReviewImage = assetPath("/images/Gemini_Generated_Image_q49ip5q49ip5q49i.png");

/**
 * Lesion-level review visual for the Technology page.
 * Uses the provided synthetic MRI-style review image and keeps the existing
 * clinical positioning: AI output is preliminary and physician review remains
 * required. The lower-right watermark is visually covered with a dark patch so
 * the source asset remains untouched.
 */
export function LesionReviewVisual() {
  return (
    <figure className="relative">
      <div className="anim-float group relative overflow-hidden rounded-3xl border border-brand-100/70 bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 p-2 shadow-2xl shadow-brand-900/25 transition-all duration-300 hover:-translate-y-1 hover:border-accent-300/70 hover:shadow-accent-900/25">
        <div className="relative overflow-hidden rounded-[1.25rem] bg-brand-950">
          <Image
            src={lesionReviewImage}
            alt="AI-assisted lesion-level MRI review visualization with preliminary candidate contours and physician-confirmed lesion"
            width={1952}
            height={2166}
            sizes="(min-width: 1024px) 520px, 92vw"
            className="h-auto w-full transition duration-700 group-hover:scale-[1.018]"
          />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_34%_42%,rgba(56,189,248,0.16),transparent_23%),radial-gradient(circle_at_69%_64%,rgba(34,197,94,0.14),transparent_21%)] mix-blend-screen"
          />
          <span
            aria-hidden
            className="anim-scan pointer-events-none absolute inset-x-5 h-14 bg-gradient-to-b from-transparent via-accent-300/16 to-transparent"
          />

          <span
            aria-hidden
            className="pointer-events-none absolute bottom-[7.4%] right-[7.5%] h-[6.7%] w-[8.2%] rounded-tl-[2rem] bg-gradient-to-br from-brand-950 via-[#020515] to-[#030611] shadow-[0_0_28px_rgba(2,5,21,0.95)]"
          />

          <div className="pointer-events-none absolute left-5 top-5 hidden items-center gap-2 rounded-full border border-accent-300/25 bg-brand-950/70 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent-200 shadow-lg shadow-brand-950/30 backdrop-blur-md sm:flex">
            <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-300" />
            Lesion-wise review
          </div>

          <div className="pointer-events-none absolute bottom-5 left-5 hidden rounded-2xl border border-white/10 bg-brand-950/65 px-4 py-3 text-xs leading-relaxed text-brand-50 shadow-xl shadow-brand-950/30 backdrop-blur-md sm:block">
            <p className="font-semibold text-white">AI preliminary contouring</p>
            <p className="mt-1 text-brand-100/80">
              Candidate findings remain organized for physician review.
            </p>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-center text-xs leading-relaxed text-ink-muted">
        病灶層級審閱示意圖（合成圖像，非臨床影像）。所有 AI 結果皆須由合格醫療專業人員審閱。
      </figcaption>
    </figure>
  );
}
