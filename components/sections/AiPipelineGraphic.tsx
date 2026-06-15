import { Icon, type IconName } from "@/components/ui/Icon";

type PipeNode = { icon: IconName; label: string; labelEn: string };

/**
 * 推論管線節點 — 僅使用來源文件已支持之流程（無 confidence-stratification
 * 等未查核功能宣稱；見 claims-registry CL-MRI-INPUT / CL-DICOM-OUTPUT）。
 */
const nodes: PipeNode[] = [
  { icon: "mri", label: "多序列 MRI", labelEn: "T1W+C · T2W" },
  { icon: "layers", label: "影像前處理", labelEn: "Registration" },
  { icon: "cpu", label: "深度學習分割", labelEn: "DL Segmentation" },
  { icon: "contour", label: "候選病灶輪廓", labelEn: "Preliminary Contours" },
  { icon: "workflow", label: "DICOM 輸出", labelEn: "PR / RTSS" },
  { icon: "review", label: "醫師審閱", labelEn: "Physician Review" },
];

/**
 * Original SVG AI inference pipeline（Phase 5 Technology 視覺）。
 * 連接線以 CSS `.anim-dash` 呈現資料流動；reduced-motion 由全域規則停用。
 * Desktop 橫向；mobile 改為 2 欄節點卡（SVG 線隱藏）。
 */
export function AiPipelineGraphic() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-brand-950 to-brand-800 p-6 shadow-xl shadow-brand-900/20 sm:p-8">
      <div aria-hidden className="medical-grid absolute inset-0 opacity-[0.1]" />
      <div
        aria-hidden
        className="anim-drift absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/15 blur-3xl"
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-300">
            AI Inference Pipeline
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-brand-100 ring-1 ring-white/15">
            <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-400" />
            For professional review
          </span>
        </div>

        {/* nodes */}
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {nodes.map((n, i) => (
            <div key={n.labelEn} className="relative flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.08] text-accent-300 ring-1 ring-white/15">
                <Icon name={n.icon} size={26} />
              </span>
              <p className="mt-3 text-[0.82rem] font-semibold text-white">{n.label}</p>
              <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-wide text-brand-200/80">
                {n.labelEn}
              </p>
              {/* animated connector（lg+，最後一節點除外） */}
              {i < nodes.length - 1 && (
                <svg
                  aria-hidden
                  viewBox="0 0 40 8"
                  className="absolute -right-[26px] top-7 hidden h-2 w-10 lg:block"
                >
                  <line
                    x1="0"
                    y1="4"
                    x2="34"
                    y2="4"
                    stroke="var(--color-accent-400)"
                    strokeWidth="1.5"
                    className="anim-dash"
                  />
                  <path d="M33 1l5 3-5 3z" fill="var(--color-accent-400)" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <p className="mt-7 border-t border-white/10 pt-4 text-[0.7rem] leading-relaxed text-brand-200/75">
          流程示意。AI 產生之輪廓為初步參考，所有結果皆須由合格醫療專業人員審閱、確認或修改。
        </p>
      </div>
    </div>
  );
}
