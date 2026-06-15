"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/components/ui/useReducedMotionSafe";

const BrainPointCloudScene = dynamic(
  () => import("./BrainPointCloudScene").then((m) => m.BrainPointCloudScene),
  { ssr: false }
);

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Client-only host for the interactive 3D point-cloud brain.
 *
 * - Renders nothing on the server (avoids hydration mismatches / does not
 *   block LCP, since this sits behind the hero copy).
 * - Detects WebGL support and falls back to a calm static gradient if
 *   unavailable.
 * - Reduces particle count on narrow viewports for performance.
 * - Respects prefers-reduced-motion (disables auto-rotate / continuous
 *   rendering, still shows a static brain).
 */
function computeParticleCount() {
  const w = window.innerWidth;
  if (w < 640) return 3200;
  if (w < 1024) return 5600;
  return 9000;
}

export function HeroBrainVisual({ label }: { label: string }) {
  const reduce = useReducedMotionSafe();
  const [state, setState] = useState<{ ready: boolean; webglOk: boolean; particleCount: number }>({
    ready: false,
    webglOk: true,
    particleCount: 9000,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only capability detection (WebGL/viewport) before mounting the R3F canvas
    setState({ ready: true, webglOk: hasWebGL(), particleCount: computeParticleCount() });

    const onResize = () => setState((prev) => ({ ...prev, particleCount: computeParticleCount() }));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { ready, webglOk, particleCount } = state;

  if (!ready || !webglOk) {
    return (
      <div
        aria-hidden
        role="img"
        aria-label={label}
        className="absolute inset-0 bg-[radial-gradient(circle_at_60%_45%,rgba(70,225,255,0.22),transparent_55%),radial-gradient(circle_at_75%_30%,rgba(26,102,255,0.18),transparent_45%)]"
      />
    );
  }

  return (
    <div className="absolute inset-0" role="img" aria-label={label}>
      <BrainPointCloudScene particleCount={particleCount} reduce={reduce} />
    </div>
  );
}
