import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

type Node = {
  icon: IconName;
  title: string;
  sub: string;
  tags: string[];
};

const nodes: Node[] = [
  {
    icon: "hospital",
    title: "PACS / TPS",
    sub: "既有影像基礎設施",
    tags: ["MRI Study", "T1W+C / T2W"],
  },
  {
    icon: "cpu",
    title: "DeepBT Detector-Plus",
    sub: "AI Inference（SaMD）",
    tags: ["Preliminary ROI", "Contour"],
  },
  {
    icon: "workflow",
    title: "DICOM Export",
    sub: "標準化物件輸出",
    tags: ["DICOM PR", "DICOM RTSS"],
  },
  {
    icon: "review",
    title: "Physician Review",
    sub: "TPS / 影像瀏覽器審閱",
    tags: ["Review", "Confirm", "Modify"],
  },
];

/**
 * DICOM-based integration pipeline（Phase 3 工作流程頁 §3）—
 * clinical node cards 與 DICOM 物件 chips；維持醫療網站質感、避免工程 demo 感。
 */
export function DicomNodes() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {nodes.map((n, i) => (
        <Reveal key={n.title} delay={i * 0.1} className="relative">
          <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
            <span aria-hidden className="card-accent" />
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700">
                <Icon name={n.icon} size={22} />
              </span>
              <span className="text-xs font-bold tabular-nums text-line-strong">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">{n.title}</h3>
            <p className="mt-0.5 text-xs text-ink-muted">{n.sub}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {n.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-line bg-surface-soft px-2 py-0.5 font-mono text-[0.68rem] font-medium text-ink-soft"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* connector arrow（xl, between cards） */}
          {i < nodes.length - 1 && (
            <Icon
              name="arrowRight"
              size={18}
              className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-accent-500 xl:block"
            />
          )}
        </Reveal>
      ))}
    </div>
  );
}
