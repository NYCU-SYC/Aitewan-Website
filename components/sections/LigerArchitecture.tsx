import { Icon, type IconName } from "@/components/ui/Icon";
import type { Locale } from "@/lib/i18n";

/**
 * Native, bilingual Liger platform architecture diagram (recreated from the
 * filing's figures so it works in both zh / en and stays crisp at any size).
 * Pure markup + CSS — three tiers (sources → Liger core → AI modules & outputs)
 * with an animated data-flow seam. Hover lifts each node (CSS only); the whole
 * thing is a server component.
 */

type Node = { icon: IconName; label: string; sub?: string };

const copy = {
  "zh-TW": {
    sourcesTitle: "院內影像來源",
    sources: [
      { icon: "mri" as IconName, label: "DICOM / PACS", sub: "影像歸檔系統" },
      { icon: "layers" as IconName, label: "CT / MRI", sub: "造影設備" },
      { icon: "file" as IconName, label: "RIS / EMR", sub: "報告與病歷" },
      { icon: "workflow" as IconName, label: "FHIR", sub: "資料交換" },
    ],
    coreTitle: "Liger 醫學影像 AI 整合平台",
    coreBadge: "TFDA 第二類 · 008624",
    core: [
      { icon: "review" as IconName, label: "影像接收與篩選", sub: "自動挑選關鍵序列" },
      { icon: "cpu" as IconName, label: "AI 模型部署與編排", sub: "任務派送 · 模型管理" },
      { icon: "brain" as IconName, label: "醫學影像運算", sub: "背景推論引擎" },
      { icon: "chart" as IconName, label: "結果呈現", sub: "回傳標準格式" },
      { icon: "lock" as IconName, label: "稽核與使用紀錄", sub: "可追溯性" },
    ],
    modulesTitle: "AI 模組與輸出",
    modules: [
      { icon: "brain" as IconName, label: "DeepBT® 腦瘤 AI", sub: "旗艦臨床模組" },
      { icon: "layers" as IconName, label: "多模組擴充", sub: "腦 · 心 · 肺影像 AI" },
      { icon: "hospital" as IconName, label: "PACS / Viewer / 工作站", sub: "回到既有流程" },
      { icon: "file" as IconName, label: "報告草稿", sub: "LLM 輔助生成" },
    ],
    flow: "DICOM → AI 引擎 → PACS / Viewer / 報告",
  },
  en: {
    sourcesTitle: "Hospital image sources",
    sources: [
      { icon: "mri" as IconName, label: "DICOM / PACS", sub: "Image archive" },
      { icon: "layers" as IconName, label: "CT / MRI", sub: "Imaging devices" },
      { icon: "file" as IconName, label: "RIS / EMR", sub: "Reports & records" },
      { icon: "workflow" as IconName, label: "FHIR", sub: "Data exchange" },
    ],
    coreTitle: "Liger Medical Imaging AI Platform",
    coreBadge: "TFDA Class II · 008624",
    core: [
      { icon: "review" as IconName, label: "Image ingest & filtering", sub: "Auto-select key series" },
      { icon: "cpu" as IconName, label: "AI deployment & orchestration", sub: "Task dispatch · model mgmt" },
      { icon: "brain" as IconName, label: "Imaging computation", sub: "Background inference" },
      { icon: "chart" as IconName, label: "Result rendering", sub: "Standardized output" },
      { icon: "lock" as IconName, label: "Audit & usage logs", sub: "Traceability" },
    ],
    modulesTitle: "AI modules & outputs",
    modules: [
      { icon: "brain" as IconName, label: "DeepBT® brain-tumor AI", sub: "Flagship clinical module" },
      { icon: "layers" as IconName, label: "Multi-module scaling", sub: "Brain · cardiac · lung AI" },
      { icon: "hospital" as IconName, label: "PACS / Viewer / workstation", sub: "Back into the workflow" },
      { icon: "file" as IconName, label: "Report draft", sub: "LLM-assisted" },
    ],
    flow: "DICOM → AI engine → PACS / Viewer / report",
  },
} as const;

function NodeCard({ node, accent = false }: { node: Node; accent?: boolean }) {
  return (
    <div
      className={`tech-card group flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 hover:-translate-y-0.5 ${
        accent
          ? "border-accent-300/40 bg-white/[0.06] hover:bg-white/[0.1]"
          : "border-line bg-white shadow-sm hover:border-brand-200 hover:shadow-md"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          accent ? "bg-gradient-to-br from-accent-400 to-brand-500 text-white" : "bg-brand-50 text-brand-700"
        }`}
      >
        <Icon name={node.icon} size={18} />
      </span>
      <div className="min-w-0">
        <p className={`text-sm font-semibold leading-tight ${accent ? "text-white" : "text-ink"}`}>{node.label}</p>
        {node.sub && <p className={`text-[0.7rem] leading-tight ${accent ? "text-brand-100/70" : "text-ink-muted"}`}>{node.sub}</p>}
      </div>
    </div>
  );
}

function TierArrow({ label }: { label: string }) {
  return (
    <div aria-hidden className="flex items-center justify-center py-1 lg:flex-col">
      <svg viewBox="0 0 40 24" className="h-6 w-10 rotate-90 text-accent-400 lg:rotate-0" fill="none" stroke="currentColor">
        <path d="M2 12h30" strokeWidth="1.5" className="anim-dash" />
        <path d="M28 6l8 6-8 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function LigerArchitecture({ locale = "zh-TW" }: { locale?: Locale }) {
  const c = copy[locale === "en" ? "en" : "zh-TW"];
  return (
    <div className="hero-aurora relative isolate overflow-hidden rounded-3xl border border-brand-800/40 bg-brand-950 p-5 text-white sm:p-8">
      <div aria-hidden className="scan-grid absolute inset-0 -z-10 opacity-40" />
      <div className="grid items-stretch gap-2 lg:grid-cols-[1fr_auto_1.15fr_auto_1fr]">
        {/* Tier 1 — sources */}
        <div>
          <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand-200">{c.sourcesTitle}</p>
          <div className="space-y-2">
            {c.sources.map((n) => (
              <NodeCard key={n.label} node={n} />
            ))}
          </div>
        </div>

        <TierArrow label={c.flow} />

        {/* Tier 2 — Liger core */}
        <div className="rounded-2xl border border-accent-300/30 bg-gradient-to-b from-brand-900/60 to-brand-950/40 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-white">{c.coreTitle}</p>
            <span className="inline-flex items-center gap-1 rounded-full border border-accent-300/40 bg-accent-500/10 px-2 py-0.5 text-[0.6rem] font-semibold text-accent-200">
              <Icon name="shield" size={11} />
              {c.coreBadge}
            </span>
          </div>
          <div className="space-y-2">
            {c.core.map((n) => (
              <NodeCard key={n.label} node={n} accent />
            ))}
          </div>
        </div>

        <TierArrow label={c.flow} />

        {/* Tier 3 — modules & outputs */}
        <div>
          <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand-200">{c.modulesTitle}</p>
          <div className="space-y-2">
            {c.modules.map((n) => (
              <NodeCard key={n.label} node={n} />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-brand-100/70">{c.flow}</p>
    </div>
  );
}
