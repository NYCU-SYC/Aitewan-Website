/**
 * Original synthetic hero visual (Phase: home redesign).
 * A pseudo-3D MRI slice stack with an axial brain cross-section, an AI
 * candidate lesion (dashed cyan) and a physician-confirmed lesion (green),
 * a scan sweep and two floating glass data cards.
 *
 * 100% original SVG + CSS — no photograph, no third-party asset. All motion
 * uses globally reduced-motion-gated utilities (anim-scan / anim-float /
 * dot-pulse), so this stays a server component with zero hydration risk and
 * no measurable runtime cost. Synthetic illustration, not a clinical image.
 */
export function BrainStackVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] [perspective:1400px]">
      {/* ambient glow */}
      <div
        aria-hidden
        className="anim-drift-slow absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_30%_30%,rgba(37,200,236,0.22),transparent_60%),radial-gradient(circle_at_72%_70%,rgba(26,102,255,0.18),transparent_62%)] blur-2xl"
      />

      <div className="relative [transform-style:preserve-3d] [transform:rotateX(6deg)rotateY(-12deg)]">
        {/* back slices (depth) */}
        {[
          { t: "translateZ(-56px) translate(34px,30px)", o: "opacity-30" },
          { t: "translateZ(-30px) translate(18px,16px)", o: "opacity-50" },
        ].map((s, i) => (
          <div
            key={i}
            aria-hidden
            className={`absolute inset-0 rounded-2xl border border-accent-300/25 bg-brand-900/70 ${s.o}`}
            style={{ transform: s.t }}
          />
        ))}

        {/* front active slice */}
        <div className="relative overflow-hidden rounded-2xl border border-accent-300/30 bg-gradient-to-b from-brand-950 to-brand-900 shadow-2xl shadow-brand-950/50">
          <div aria-hidden className="medical-grid absolute inset-0 opacity-[0.12]" />

          {/* viewer chrome */}
          <div className="relative flex items-center justify-between px-4 pt-3">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-200/80">
              Axial · T1W+C
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-accent-200 ring-1 ring-white/15">
              <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-400" />
              AI preliminary
            </span>
          </div>

          {/* brain cross-section */}
          <div className="relative px-5 pb-6 pt-3">
            <svg viewBox="0 0 320 280" className="h-auto w-full" role="img" aria-label="腦部 MRI 切面與 AI 候選病灶之合成示意圖">
              <defs>
                <radialGradient id="brainFill" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="rgba(56,128,220,0.30)" />
                  <stop offset="100%" stopColor="rgba(12,28,64,0.20)" />
                </radialGradient>
              </defs>
              {/* skull + brain */}
              <ellipse cx="160" cy="140" rx="128" ry="118" fill="none" stroke="rgba(148,184,255,0.22)" strokeWidth="6" />
              <ellipse cx="160" cy="140" rx="112" ry="103" fill="url(#brainFill)" stroke="rgba(163,240,251,0.5)" strokeWidth="1.4" />
              {/* fissure + sulci */}
              <path d="M160 42 C156 80 156 200 160 238" fill="none" stroke="rgba(163,240,251,0.28)" strokeWidth="1.1" />
              <path d="M92 100 q14 -10 26 2 M84 140 q16 -8 28 4 M94 182 q14 -10 26 0 M196 94 q16 -8 28 4 M206 138 q14 -10 26 2 M198 182 q16 -8 26 2"
                fill="none" stroke="rgba(163,240,251,0.26)" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M146 124 q-10 16 0 34 M174 124 q10 16 0 34" fill="none" stroke="rgba(163,240,251,0.38)" strokeWidth="1.8" strokeLinecap="round" />

              {/* AI candidate lesion (dashed cyan) */}
              <circle cx="116" cy="118" r="18" fill="rgba(37,200,236,0.16)" />
              <circle cx="116" cy="118" r="18" fill="none" stroke="var(--color-accent-400)" strokeWidth="1.8" strokeDasharray="4 3" />
              <circle cx="116" cy="118" r="2.4" fill="var(--color-accent-300)" />
              {/* confirmed lesion (solid green + check) */}
              <circle cx="206" cy="168" r="13" fill="rgba(11,170,110,0.16)" />
              <circle cx="206" cy="168" r="13" fill="none" stroke="var(--color-valid-green)" strokeWidth="1.8" />
              <path d="M200 168 l4 4 7 -8" fill="none" stroke="var(--color-valid-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* scan sweep */}
            <span aria-hidden className="anim-scan pointer-events-none absolute inset-x-5 top-3 h-10 bg-gradient-to-b from-transparent via-accent-300/14 to-transparent" />
          </div>

          {/* slice index rail */}
          <div className="relative flex items-center gap-1.5 border-t border-white/10 px-4 py-2.5">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full ${i < 9 ? "bg-accent-400/70" : "bg-white/12"}`}
              />
            ))}
            <span className="ml-2 shrink-0 font-mono text-[0.6rem] text-brand-200/70">09 / 14</span>
          </div>
        </div>
      </div>

      {/* floating glass data cards */}
      <div className="anim-float absolute -right-3 top-6 rounded-2xl border border-white/15 bg-brand-950/70 px-4 py-3 shadow-xl shadow-brand-950/40 backdrop-blur-md sm:-right-6">
        <p className="text-[0.6rem] font-semibold uppercase tracking-wider text-accent-200">Regulatory</p>
        <p className="mt-1 text-sm font-bold text-white">FDA 510(k)</p>
        <p className="font-mono text-[0.62rem] text-brand-200/80">K252190 · cleared</p>
      </div>

      <div className="anim-float-delay absolute -left-3 bottom-8 rounded-2xl border border-white/15 bg-brand-950/70 px-4 py-3 shadow-xl shadow-brand-950/40 backdrop-blur-md sm:-left-6">
        <div className="flex items-center gap-2">
          <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-valid-green" />
          <p className="text-[0.6rem] font-semibold uppercase tracking-wider text-brand-100/90">DICOM output</p>
        </div>
        <p className="mt-1 font-mono text-xs text-white">PR · RTSS → PACS / TPS</p>
      </div>
    </div>
  );
}
