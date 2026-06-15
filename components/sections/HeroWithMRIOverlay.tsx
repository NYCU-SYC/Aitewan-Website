"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/components/ui/useReducedMotionSafe";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getHeroBadges } from "@/data/home";
import { getCtas } from "@/data/site";
import { useLocale } from "@/components/ui/useLocale";
import { assetPath } from "@/lib/asset-path";
import type { Locale } from "@/lib/i18n";

const AI_IMG = assetPath("/images/hero-ai-assisted.png");
const CLEAN_IMG = assetPath("/images/hero-clean.png");
const HERO_ALT =
  "醫師檢視腦部 MRI；DeepBT Detector-Plus 呈現 AI 輔助腦部腫瘤初步圈註與臨床摘要草稿";

/**
 * Two-image transition:
 * starts from a clean MRI, then AI-assisted overlay activates and fully settles.
 */
function HeroCrossfade() {
  // hydration-safe: false on first render (matches SSR), real value after mount
  const reduce = useReducedMotionSafe();
  const revealRadius = ["circle(0% at 50% 52%)", "circle(24% at 50% 52%)", "circle(165% at 50% 52%)"];

  return (
    <div className="relative h-full w-full">
      <Image
        src={CLEAN_IMG}
        alt={HERO_ALT}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="absolute inset-0 will-change-[clip-path,transform,opacity]"
            initial={{
              opacity: 0.08,
              scale: 1.04,
              clipPath: revealRadius[0],
            }}
            animate={{
              opacity: [0.08, 1, 1],
              scale: [1.04, 1.01, 1],
              clipPath: revealRadius,
            }}
            transition={{
              duration: 4.6,
              times: [0, 0.48, 1],
              ease: "easeInOut",
            }}
          >
            <Image
              src={AI_IMG}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-300/45 bg-accent-300/10 shadow-[0_0_30px_8px_rgba(37,200,236,0.13)]"
            initial={{ scale: 0.86, opacity: 0.2 }}
            animate={{
              scale: [0.86, 1.03, 0.94],
              opacity: [0.2, 0.5, 0.28],
            }}
            transition={{
              duration: 5.2,
              ease: "easeInOut",
              delay: 3.6,
              repeat: Number.POSITIVE_INFINITY,
              times: [0, 0.6, 1],
              repeatDelay: 3.8,
            }}
          />

          <motion.div
            className="pointer-events-none absolute inset-y-[28%] h-14 w-full bg-gradient-to-r from-transparent via-accent-300/65 to-transparent"
            initial={{ x: "-62%", opacity: 0 }}
            animate={{ x: ["-62%", "62%", "-62%"], opacity: [0.15, 0.75, 0.15, 0] }}
            transition={{
              duration: 5.8,
              delay: 3.9,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              repeatDelay: 4.4,
              times: [0, 0.4, 0.76, 1],
            }}
          />
        </>
      )}

      {reduce && (
        <div className="absolute inset-0">
          <Image
            src={AI_IMG}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      )}

      {!reduce && (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-14 mix-blend-overlay"
            style={{
              background:
                "radial-gradient(circle at 50% 52%, rgba(37, 200, 236, 0.18) 0%, rgba(37, 200, 236, 0) 52%)",
            }}
          />
        </>
      )}
    </div>
  );
}

/** Animated AI micro accents over the imaging area. */
function AiPulse({ className = "" }: { className?: string }) {
  const reduce = useReducedMotionSafe();
  if (reduce) return null;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <motion.div
        className="absolute left-[50%] top-[46%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400/30 blur-2xl"
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-y-[30%] w-px bg-gradient-to-b from-transparent via-accent-300/80 to-transparent"
        initial={{ left: "44%", opacity: 0 }}
        animate={{ left: ["44%", "60%"], opacity: [0, 0.85, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {[
        { l: "48%", t: "42%" },
        { l: "56%", t: "50%" },
        { l: "51%", t: "56%" },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-accent-300 shadow-[0_0_8px_2px_rgba(37,200,236,0.6)]"
          style={{ left: p.l, top: p.t }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.65 }}
        />
      ))}
    </div>
  );
}


const heroCopy: Record<Locale, {
  chip: string;
  h1a: string;
  h1b: string;
  sub: string;
  para: React.ReactNode;
}> = {
  "zh-TW": {
    chip: "腦部腫瘤 AI 醫療影像 · SaMD",
    h1a: "AI 輔助腦部腫瘤圈註，",
    h1b: "串接臨床放射治療流程",
    sub: "AI-Assisted Brain Tumor Contouring for Clinical Radiotherapy Workflow",
    para: (
      <>
        智德萬 AItewan 專注於腦部腫瘤 MRI 影像分析、AI 輔助圈註與 DICOM
        臨床流程整合。核心產品{" "}
        <strong className="font-semibold text-ink">DeepBT Detector-Plus</strong>{" "}
        已取得台灣 TFDA 第二類醫療器材許可，並獲美國 FDA 510(k)
        clearance，協助醫療團隊針對已診斷成人腦部腫瘤產生初步輪廓，支援放射治療計畫前置作業。
      </>
    ),
  },
  en: {
    chip: "Brain Tumor Imaging AI · SaMD",
    h1a: "AI-assisted brain tumor contouring,",
    h1b: "built into the radiotherapy workflow",
    sub: "智德萬 AItewan — AI 輔助腦部腫瘤圈註，串接臨床放射治療流程",
    para: (
      <>
        AItewan develops clinically oriented AI for brain tumor MRI analysis,
        AI-assisted contouring and DICOM-based workflow integration. Our flagship
        product, <strong className="font-semibold text-ink">DeepBT Detector-Plus</strong>,
        holds Taiwan TFDA Class II registration and U.S. FDA 510(k) clearance, helping
        clinical teams generate preliminary contours for diagnosed adult brain tumors in
        radiotherapy planning workflows.
      </>
    ),
  },
};

export function HeroWithMRIOverlay() {
  const locale = useLocale();
  const t = heroCopy[locale];
  const heroBadges = getHeroBadges(locale);
  const ctas = getCtas(locale);
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.92, 0.85, 0.5]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const rise = (i: number) =>
    reduce ? undefined : { animationDelay: `${0.04 + i * 0.08}s` };
  const riseClass = reduce ? "" : "anim-rise";

  return (
    <section
      ref={ref}
      // < xl: stacked (text, then full image). xl+: section uses the image ratio
      // so photo fills without visible side gaps.
      className="relative isolate flex flex-col overflow-hidden bg-white xl:block xl:aspect-[2600/1450]"
    >
      {/* desktop full-bleed transition image */}
      <motion.div
        className="absolute inset-0 -z-30 hidden xl:block"
        style={reduce ? undefined : { scale: bgScale, opacity: bgOpacity }}
      >
        <HeroCrossfade />
      </motion.div>

      {/* desktop legibility layers */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 hidden bg-gradient-to-r from-white from-5% via-white/90 via-42% to-transparent to-68% xl:block"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 hidden medical-grid opacity-40 medical-grid-fade xl:block"
      />
      <AiPulse className="z-0 hidden xl:block" />

      {/* content */}
      <Container
        size="wide"
        className="relative z-10 w-full xl:absolute xl:inset-0 xl:flex xl:items-center"
      >
        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="max-w-xl py-12 sm:py-16 xl:py-0"
        >
          <span
            className={`${riseClass} inline-flex items-center gap-2 rounded-full border border-accent-300 bg-white/90 px-3 py-1 text-xs font-semibold text-accent-900 backdrop-blur-sm`}
            style={rise(0)}
          >
            <Icon name="sparkles" size={14} />
            {t.chip}
          </span>

          <h1
            className={`${riseClass} mt-5 text-3xl font-bold leading-[1.14] text-ink sm:text-4xl lg:text-[2.9rem]`}
            style={rise(1)}
          >
            {t.h1a}
            <br className="hidden sm:block" />
            <span className="text-gradient-deep">{t.h1b}</span>
          </h1>

          <p
            className={`${riseClass} mt-3 text-base font-semibold text-ink-soft`}
            style={rise(2)}
          >
            {t.sub}
          </p>

          <p
            className={`${riseClass} mt-5 text-[1.02rem] leading-relaxed text-ink-soft`}
            style={rise(3)}
          >
            {t.para}
          </p>

          <div className={`${riseClass} mt-7 flex flex-wrap gap-3`} style={rise(4)}>
            <Button href={ctas.demo.href} size="lg" arrow>
              {ctas.demo.label}
            </Button>
            <Button href={ctas.product.href} variant="secondary" size="lg">
              {ctas.product.label}
            </Button>
          </div>

          <ul
            className={`${riseClass} mt-8 grid gap-2 sm:grid-cols-2`}
            style={rise(5)}
          >
            {heroBadges.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-2.5 rounded-xl border border-line/80 bg-white/75 px-3 py-2 text-[0.83rem] font-medium text-ink-soft shadow-sm backdrop-blur-sm transition-colors hover:border-accent-200"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700">
                  <Icon name={b.icon} size={15} />
                </span>
                {b.label}
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>

      {/* mobile image below text */}
      <div className="relative w-full aspect-[2600/1450] xl:hidden">
        <HeroCrossfade />
        <AiPulse />
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-brand-950/70 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-accent-400" />
          AI-assisted contouring
        </div>
      </div>

      {/* desktop status badge */}
      <motion.div
        style={reduce ? undefined : { opacity: contentOpacity }}
        className="pointer-events-none absolute bottom-6 right-6 z-10 hidden xl:block"
      >
        <div className="flex items-center gap-2 rounded-full bg-brand-950/70 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-accent-400" />
          AI-assisted contouring
        </div>
      </motion.div>

      {/* scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ opacity: contentOpacity }}
          className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 xl:block"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/70 text-brand-700 backdrop-blur-sm"
          >
            <Icon name="chevronDown" size={18} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
