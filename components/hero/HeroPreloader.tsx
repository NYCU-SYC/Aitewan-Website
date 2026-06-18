"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { HERO_READY_EVENT, isHeroReady } from "@/lib/heroReady";
import type { Locale } from "@/lib/i18n";

const MIN_DURATION = 1400; // ms — minimum on-screen time so the bar never flashes
const MAX_DURATION = 9000; // ms — safety cap so the user is never trapped
const FADE_MS = 650; // ms — fade-out duration before unmount

/**
 * Full-screen intro preloader for the home page.
 *
 * Because the WebGL hero (the 3D brain point cloud) can take a moment to load,
 * we cover the page with a branded overlay — the AItewan logo above an animated
 * progress bar — and only reveal the full page once the brain has rendered its
 * first frame (see {@link signalHeroReady}). The bar uses an eased simulated
 * climb so it always feels alive, then snaps to 100% and fades out when the
 * real "ready" signal arrives (guarded by a min display time and a max timeout).
 */
export function HeroPreloader({ locale = "zh-TW" }: { locale?: Locale }) {
  const [display, setDisplay] = useState(0);
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");
  const readyRef = useRef(false);

  // Listen for the hero's "ready" signal — and catch the case where the brain
  // became ready before this component attached its listener (warm cache / SPA).
  useEffect(() => {
    if (isHeroReady()) readyRef.current = true;
    const onReady = () => {
      readyRef.current = true;
    };
    window.addEventListener(HERO_READY_EVENT, onReady);
    return () => window.removeEventListener(HERO_READY_EVENT, onReady);
  }, []);

  // Drive the progress bar with a single requestAnimationFrame loop.
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    let cur = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const ready = readyRef.current && elapsed >= MIN_DURATION;
      const timedOut = elapsed >= MAX_DURATION;

      if (ready || timedOut) {
        cur += (100 - cur) * 0.22; // ease quickly up to 100
        if (cur >= 99.5) cur = 100;
      } else {
        // decelerating climb that approaches ~90% while we wait for the model
        const sim = 90 * (1 - Math.exp(-elapsed / 1100));
        cur = Math.max(cur, sim); // monotonic — never goes backwards
      }

      setDisplay(cur);

      if (cur >= 100) {
        setPhase("fading");
        return; // stop the loop
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Unmount after the fade-out finishes.
  useEffect(() => {
    if (phase !== "fading") return;
    const id = window.setTimeout(() => setPhase("done"), FADE_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  // Lock page scroll while the overlay is visible.
  useEffect(() => {
    if (phase === "done") return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  const pct = Math.round(display);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={locale === "en" ? "Loading" : "載入中"}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-950 transition-opacity ease-out"
      style={{ opacity: phase === "fading" ? 0 : 1, transitionDuration: `${FADE_MS}ms` }}
    >
      {/* deep-space wash matching the hero so the reveal feels continuous */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_72%_60%_at_50%_42%,#173a7a_0%,#0c2152_46%,#050e26_100%)]"
      />

      <div className="relative flex flex-col items-center gap-8 px-8">
        <Logo variant="white" className="h-12 w-auto sm:h-14" priority />

        <div className="flex flex-col items-center gap-3">
          <div
            className="h-[3px] w-56 overflow-hidden rounded-full bg-white/12 sm:w-72"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-200 shadow-[0_0_12px_rgba(37,200,236,0.6)]"
              style={{ width: `${pct}%`, transition: "width 120ms linear" }}
            />
          </div>
          <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand-200/70 tabular-nums">
            <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-400" />
            {pct}%
          </span>
        </div>
      </div>
    </div>
  );
}
