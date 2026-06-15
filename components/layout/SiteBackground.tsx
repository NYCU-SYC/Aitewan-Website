/**
 * SiteBackground — one continuous, page-wide background so the whole site sits on
 * a cohesive medical-tech canvas instead of disconnected white blocks.
 *
 * Layers (all static, GPU-composited, pointer-events-none — no runtime cost):
 *   1. a barely-there blue vertical gradient (no flat white),
 *   2. a faint medical grid that fades downward,
 *   3. three large soft radial glow orbs for spatial depth.
 *
 * It is `fixed` so light sections reveal a consistent ambient field as you
 * scroll; dark sections (hero / SaMD / CTA / footer) are opaque and punctuate it.
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base tint — never pure white */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f7faff_0%,#ecf3fc_46%,#f5f9ff_100%)]" />

      {/* faint medical grid, fading toward the bottom */}
      <div className="absolute inset-0 medical-grid opacity-70 [mask-image:radial-gradient(ellipse_130%_92%_at_50%_-8%,#000_28%,transparent_82%)]" />

      {/* soft radial glow orbs — spatial depth (no blur filter: the gradients are
          inherently soft, which is cheaper to composite) */}
      <div className="absolute -left-[14%] top-[6%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(56,130,246,0.16),transparent_62%)]" />
      <div className="absolute -right-[14%] top-[40%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(34,200,236,0.13),transparent_62%)]" />
      <div className="absolute left-[16%] bottom-[2%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.11),transparent_62%)]" />
    </div>
  );
}
