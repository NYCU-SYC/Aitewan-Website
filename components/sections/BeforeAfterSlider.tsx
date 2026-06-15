"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { useState } from "react";

/**
 * Before / after comparison slider（Phase 3 §4）。
 * 以隱形 range input 驅動 → 原生鍵盤（←/→）與拖曳支援、無障礙標籤齊備。
 * 目前以「原始臨床檢視 vs AI 輔助檢視」對齊場景圖呈現；正式去識別化
 * MRI before/after pair 待素材（見 ASSETS_TODO.md）後替換。
 */
export function BeforeAfterSlider({
  beforeSrc = "/images/hero-clean.png",
  afterSrc = "/images/hero-ai-assisted.png",
  beforeLabel = "原始臨床檢視",
  afterLabel = "AI 輔助檢視",
}: {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(52);

  return (
    <div className="relative aspect-[2600/1450] select-none overflow-hidden rounded-2xl border border-line shadow-xl shadow-brand-900/10">
      {/* before（base） */}
      <Image src={assetPath(beforeSrc)} alt={beforeLabel} fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
      {/* after（clipped from the right side of the divider） */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <Image src={assetPath(afterSrc)} alt="" fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
      </div>

      {/* divider + handle */}
      <div
        aria-hidden
        className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_12px_rgba(15,23,42,0.35)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-brand-700 shadow-lg">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 6l-4 6 4 6M15 6l4 6-4 6" />
          </svg>
        </span>
      </div>

      {/* labels */}
      <span className="absolute left-3 top-3 z-10 rounded-full bg-brand-950/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 z-10 rounded-full bg-accent-600/85 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
        {afterLabel}
      </span>

      {/* invisible range input = pointer drag + keyboard a11y */}
      <input
        type="range"
        min={2}
        max={98}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`比較滑桿：${beforeLabel} 與 ${afterLabel}`}
        aria-valuetext={`${afterLabel} 顯示 ${100 - pos}%`}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
      />
    </div>
  );
}
