import type { CSSProperties } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { BrainHeroClient } from "@/components/hero/BrainHeroClient";
import { getCtas } from "@/data/site";
import type { Locale } from "@/lib/i18n";

const trustChips = ["FDA 510(k) · K252190", "TFDA 二類醫材", "DICOM PR / RTSS"];
const trustChipsEn = ["FDA 510(k) · K252190", "TFDA Class II device", "DICOM PR / RTSS"];

const hudRight = [
  "MODALITY · T1W+C",
  "OUTPUT · DICOM RTSS",
  "CLEARANCE · FDA 510(k)",
  "REVIEW · PHYSICIAN-LED",
];

/**
 * Home hero — full-bleed "neural field" band: an animated point-cloud brain
 * (BrainPointCloud) behind a left-aligned copy column, framed with a thin HUD
 * bar and bottom readout labels. Server component; the only client piece is the
 * canvas, which is reduced-motion + offscreen aware. zh-TW copy is canonical.
 */
export function HomeHero({ locale = "zh-TW" }: { locale?: Locale }) {
  const en = locale === "en";
  const t = (zh: string, eng: string) => (en ? eng : zh);
  const ctas = getCtas(locale);
  const href = (path: string) => `/${locale}${path}`;
  const chips = en ? trustChipsEn : trustChips;

  return (
    <section className="relative isolate flex min-h-[38rem] items-center overflow-hidden bg-brand-950 text-white lg:min-h-[44rem]">
      {/* deep-space cosmos background — WebGL brain sampled from /models/brain.glb */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_85%_80%_at_60%_42%,#173a7a_0%,#0c2152_42%,#081634_72%,#050e26_100%)]" />
      <div
        aria-hidden
        className="anim-subtle-glow absolute right-0 top-1/2 -z-[15] h-[42rem] w-[42rem] -translate-y-1/2 translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(46,116,236,0.3),transparent_62%)] blur-2xl"
      />
      <div className="absolute inset-0 -z-10">
        <BrainHeroClient />
      </div>
      {/* left scrim for copy legibility (kept light so the brain reads through) + bottom fade.
          pointer-events-none so the canvas behind receives pointer moves (parallax). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-950/30 to-transparent lg:from-brand-950/80 lg:via-brand-950/15" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-brand-950 to-transparent" />
      <div aria-hidden className="gradient-rule pointer-events-none absolute inset-x-0 top-0" />

      {/* floating medical data cards (desktop) — visual richness + at-a-glance facts */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] hidden lg:block">
        <div className="glass anim-float absolute right-[7%] top-[23%] rounded-2xl px-4 py-3 shadow-xl shadow-black/40">
          <p className="text-[0.58rem] font-semibold uppercase tracking-wider text-accent-200">Regulatory</p>
          <p className="mt-1 text-sm font-bold text-white">FDA 510(k)</p>
          <p className="font-mono text-[0.6rem] text-brand-200/80">K252190 · cleared</p>
        </div>
        <div className="glass anim-float-delay absolute right-[33%] top-[16%] rounded-2xl px-4 py-3 shadow-xl shadow-black/40">
          <div className="flex items-center gap-2">
            <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-400" />
            <p className="text-[0.58rem] font-semibold uppercase tracking-wider text-accent-200">AI detection</p>
          </div>
          <p className="mt-1 text-sm font-bold text-white">Lesion segmentation</p>
        </div>
        <div className="glass anim-float absolute right-[17%] bottom-[19%] rounded-2xl px-4 py-3 shadow-xl shadow-black/40">
          <div className="flex items-center gap-2">
            <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-valid-green" />
            <p className="text-[0.58rem] font-semibold uppercase tracking-wider text-brand-100/90">DICOM output</p>
          </div>
          <p className="mt-1 font-mono text-xs text-white">PR · RTSS → PACS / TPS</p>
        </div>
      </div>

      {/* top HUD bar */}
      <div aria-hidden className="absolute inset-x-0 top-0 z-10 border-b border-white/8 bg-brand-950/30 backdrop-blur-[2px]">
        <Container size="wide" className="flex h-9 items-center justify-end">
          <span className="hidden items-center gap-4 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-brand-200/60 md:inline-flex">
            {hudRight.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </span>
        </Container>
      </div>

      {/* copy — container is click-through so the canvas behind gets pointer
          moves for parallax; the copy block itself re-enables pointer events. */}
      <Container size="wide" className="pointer-events-none relative py-20 lg:py-24">
        <div className="pointer-events-auto max-w-xl">
          <span
            className="rise-in inline-flex items-center gap-2 rounded-full border border-accent-300/30 bg-white/[0.06] px-3 py-1 text-xs font-semibold tracking-wide text-accent-200 backdrop-blur-sm"
            style={{ "--rise-delay": "0.05s" } as CSSProperties}
          >
            <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-400" />
            {t("腦部腫瘤影像 AI · SaMD 醫療器材", "Brain Tumor Imaging AI · SaMD")}
          </span>

          <h1
            className="rise-in mt-6 text-4xl font-semibold leading-[1.1] tracking-tight [text-shadow:0_2px_28px_rgba(4,10,26,0.65)] sm:text-5xl xl:text-[3.5rem]"
            style={{ "--rise-delay": "0.12s" } as CSSProperties}
          >
            {t("腦部腫瘤 AI 圈註，", "Brain tumor AI contouring, ")}
            <br className="hidden sm:block" />
            <span className="text-gradient-light">
              {t("整合進放射治療流程", "integrated into radiotherapy workflows")}
            </span>
          </h1>

          <p
            className="rise-in mt-5 max-w-lg text-base leading-relaxed text-brand-100/90 [text-shadow:0_1px_14px_rgba(4,10,26,0.7)] sm:text-[1.05rem]"
            style={{ "--rise-delay": "0.2s" } as CSSProperties}
          >
            {t(
              "DeepBT Detector-Plus 自動產生初步腫瘤輪廓，並以標準化 DICOM 回到 PACS / TPS，由醫師審閱、確認或修改後，支援放射治療計畫流程。",
              "DeepBT Detector-Plus generates preliminary tumor contours and returns them as standardized DICOM to PACS / TPS, where physicians review, confirm or modify the results to support radiotherapy planning.",
            )}
          </p>

          <div
            className="rise-in mt-8 flex flex-wrap gap-3"
            style={{ "--rise-delay": "0.28s" } as CSSProperties}
          >
            <Button href={ctas.demo.href} variant="accent" size="lg" arrow>
              {ctas.demo.label}
            </Button>
            <Button href={href("/clinical-workflow")} variant="outline" size="lg">
              {t("查看臨床流程", "View clinical workflow")}
            </Button>
            <Link
              href={href("/evidence-regulatory")}
              className="inline-flex items-center gap-1.5 self-center text-sm font-medium text-brand-100/85 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {t("FDA / TFDA 法規里程碑", "FDA / TFDA regulatory milestones")}
              <Icon name="arrowRight" size={15} className="text-accent-300" />
            </Link>
          </div>

          <ul
            className="rise-in mt-9 flex flex-wrap items-center gap-x-5 gap-y-2.5"
            style={{ "--rise-delay": "0.36s" } as CSSProperties}
          >
            {chips.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-200/85">
                <Icon name="check" size={13} className="text-accent-300" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Container>

    </section>
  );
}
