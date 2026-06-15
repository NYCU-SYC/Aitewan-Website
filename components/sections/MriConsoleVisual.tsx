import { axialBrain } from "@/lib/brain/axialBrainPaths";

/**
 * MriConsoleVisual — the home hero centerpiece.
 *
 * A premium, synthetic "clinical AI console": a glass DICOM-style viewer panel
 * showing a stylized axial brain MRI (procedural gyral cortex, white-matter
 * core, lateral-ventricle slits and grain texture) with an AI candidate
 * contour (dashed cyan) that a physician has confirmed (solid green) — the
 * review → confirm story. A scan sweep, slice rail, window/level readout and
 * two floating glass data cards frame it.
 *
 * 100% original SVG + CSS — no photograph, no clinical image, no third-party
 * asset. The brain geometry is generated procedurally (see axialBrainPaths).
 * All motion uses globally reduced-motion-gated utilities, so this is a pure
 * server component with no hydration cost. Synthetic illustration only.
 */
export function MriConsoleVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] [perspective:1600px]">
      {/* ambient bloom behind the console */}
      <div
        aria-hidden
        className="anim-drift-slow absolute -inset-12 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_32%_28%,rgba(37,200,236,0.22),transparent_58%),radial-gradient(circle_at_72%_74%,rgba(59,108,244,0.20),transparent_60%)] blur-2xl"
      />

      {/* the console, gently tilted in 3D */}
      <div className="relative [transform-style:preserve-3d] [transform:rotateX(7deg)rotateY(-13deg)]">
        {/* depth slices behind the active frame */}
        {[
          { t: "translateZ(-64px) translate(38px,32px)", o: "opacity-25" },
          { t: "translateZ(-34px) translate(20px,17px)", o: "opacity-50" },
        ].map((s, i) => (
          <div
            key={i}
            aria-hidden
            className={`absolute inset-0 rounded-3xl border border-accent-300/20 bg-brand-900/70 ${s.o}`}
            style={{ transform: s.t }}
          />
        ))}

        {/* active console frame */}
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-[#0a1730] to-[#060f22] shadow-2xl shadow-black/50 ring-1 ring-inset ring-white/5">
          {/* toolbar */}
          <div className="relative flex items-center justify-between border-b border-white/8 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-accent-400/80" />
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-200/80">
                Axial · T1W+C
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-wider text-accent-200 ring-1 ring-white/15">
              <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-400" />
              AI preliminary
            </span>
          </div>

          {/* image area */}
          <div className="tech-panel-scan relative aspect-[4/3] w-full">
            <svg
              viewBox="0 0 400 300"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="腦部 MRI 軸狀切面與 AI 候選腫瘤輪廓之合成示意圖"
            >
              <defs>
                <radialGradient id="mriTissue" cx="50%" cy="42%" r="62%">
                  <stop offset="0%" stopColor="#2a5896" stopOpacity="0.95" />
                  <stop offset="55%" stopColor="#173258" stopOpacity="0.92" />
                  <stop offset="100%" stopColor="#0a1c3e" stopOpacity="0.96" />
                </radialGradient>
                <radialGradient id="mriWm" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="#33619f" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#173258" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="tumorGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(37,200,236,0.6)" />
                  <stop offset="100%" stopColor="rgba(37,200,236,0)" />
                </radialGradient>
                <filter id="mriGrain" x="-5%" y="-5%" width="110%" height="110%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.85"
                    numOctaves="2"
                    seed="7"
                    stitchTiles="stitch"
                    result="n"
                  />
                  <feColorMatrix in="n" type="saturate" values="0" result="g" />
                  <feComponentTransfer in="g">
                    <feFuncA type="linear" slope="0.5" />
                  </feComponentTransfer>
                </filter>
                <clipPath id="brainClip">
                  <path d={axialBrain.cortex} />
                </clipPath>
                <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#000" stopOpacity="0.16" />
                  <stop offset="52%" stopColor="#000" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* brain (slightly tilted to break symmetry) */}
              <g transform="rotate(-7 200 152)">
                <path d={axialBrain.skull} fill="none" stroke="rgba(150,186,255,0.10)" strokeWidth="12" />
                <path d={axialBrain.skull} fill="none" stroke="rgba(150,186,255,0.32)" strokeWidth="5" />
                <g clipPath="url(#brainClip)">
                  <path d={axialBrain.cortex} fill="url(#mriTissue)" />
                  <path d={axialBrain.wm} fill="url(#mriWm)" />
                  <rect
                    width="400"
                    height="300"
                    fill="#cfe2ff"
                    filter="url(#mriGrain)"
                    opacity="0.4"
                    style={{ mixBlendMode: "screen" }}
                  />
                  <g fill="none" stroke="rgba(150,195,255,0.20)" strokeWidth="1.4">
                    {axialBrain.shells.map((d, i) => (
                      <path key={`sh${i}`} d={d} />
                    ))}
                  </g>
                  <g fill="none" stroke="rgba(175,212,255,0.30)" strokeWidth="1.6" strokeLinecap="round">
                    {axialBrain.sulci.map((d, i) => (
                      <path key={`su${i}`} d={d} />
                    ))}
                  </g>
                  {/* lateral ventricles */}
                  <path d="M196 132 C184 140 182 160 190 176 C193 182 197 180 196 172 C194 158 198 144 196 132 Z" fill="#0a1830" opacity="0.78" />
                  <path d="M204 132 C216 140 218 160 210 176 C207 182 203 180 204 172 C206 158 202 144 204 132 Z" fill="#0a1830" opacity="0.78" />
                </g>
              </g>

              {/* ---- lesion HUD (upright): AI candidate + physician-confirmed ---- */}
              <g className="anim-lesion">
                <circle cx="262" cy="106" r="30" fill="url(#tumorGlow)" />
              </g>
              <path
                d="M262 88 C277 87 288 98 286 112 C284 126 271 132 258 128 C246 124 240 112 244 101 C247 93 255 89 262 88 Z"
                fill="rgba(37,200,236,0.22)"
                stroke="rgba(102,225,247,0.55)"
                strokeWidth="1.4"
              />
              {/* AI candidate contour (dashed cyan, looser) */}
              <circle cx="263" cy="108" r="26" fill="none" stroke="var(--color-accent-400)" strokeWidth="2" strokeDasharray="5 4" />
              {/* physician-confirmed contour (solid green, tighter) */}
              <path
                d="M262 90 C275 89 286 99 284 112 C282 125 270 130 258 126 C247 122 241 111 245 101 C248 94 255 91 262 90 Z"
                fill="none"
                stroke="var(--color-valid-green)"
                strokeWidth="2.2"
              />
              {/* crosshair + centroid */}
              <g stroke="rgba(102,225,247,0.7)" strokeWidth="1.3">
                <path d="M263 76 v-12 M263 140 v12 M231 108 h-12 M295 108 h12" />
              </g>
              <circle cx="263" cy="108" r="2.4" fill="var(--color-accent-200)" />

              <rect width="400" height="300" fill="url(#vignette)" />
            </svg>

            {/* horizontal scan sweep */}
            <span
              aria-hidden
              className="anim-scan-x pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-accent-300/18 to-transparent"
            />

            {/* corner readouts (DICOM viewer overlay) */}
            <div className="pointer-events-none absolute left-3 top-2.5 font-mono text-[0.56rem] leading-tight text-brand-200/70">
              <div>SE 4 · T1W+C</div>
              <div>W 320 · L 40</div>
            </div>
            <div className="pointer-events-none absolute bottom-2.5 right-3 text-right font-mono text-[0.56rem] leading-tight text-accent-200/80">
              <div>LESION · R FRONTAL</div>
              <div className="text-valid-green">CONFIRMED ✓</div>
            </div>
          </div>

          {/* slice rail */}
          <div className="relative flex items-center gap-1.5 border-t border-white/8 px-4 py-2.5">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i === 11 ? "bg-accent-300" : i < 11 ? "bg-accent-400/55" : "bg-white/12"
                }`}
              />
            ))}
            <span className="tabular ml-2 shrink-0 font-mono text-[0.58rem] text-brand-200/70">
              12 / 18
            </span>
          </div>
        </div>
      </div>

      {/* floating glass data cards — verified facts only (claims registry) */}
      <div className="glass anim-float absolute -right-3 top-8 rounded-2xl px-4 py-3 shadow-xl shadow-black/40 sm:-right-7">
        <p className="text-[0.58rem] font-semibold uppercase tracking-wider text-accent-200">
          Regulatory
        </p>
        <p className="mt-1 text-sm font-bold text-white">FDA 510(k)</p>
        <p className="tabular font-mono text-[0.6rem] text-brand-200/80">K252190 · cleared</p>
      </div>

      <div className="glass anim-float-delay absolute -left-3 bottom-10 rounded-2xl px-4 py-3 shadow-xl shadow-black/40 sm:-left-7">
        <div className="flex items-center gap-2">
          <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-valid-green" />
          <p className="text-[0.58rem] font-semibold uppercase tracking-wider text-brand-100/90">
            DICOM output
          </p>
        </div>
        <p className="mt-1 font-mono text-xs text-white">PR · RTSS → PACS / TPS</p>
      </div>
    </div>
  );
}
