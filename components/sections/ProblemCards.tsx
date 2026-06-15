import { Icon, type IconName } from "@/components/ui/Icon";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Clinical Problem section（規格書 §4-03 ProblemCardGrid）。
 * 保守表述：不宣稱節省時間百分比或療效。
 */
type Problem = { icon: IconName; title: string; body: string };

const problemsEn: Problem[] = [
  { icon: "contour", title: "Manual contouring is a heavy workload", body: "Brain-tumor contours are still largely drawn slice by slice — repetitive, time-consuming, and especially demanding in multi-lesion cases." },
  { icon: "layers", title: "Cross-system exchange is complex", body: "Images, structures and plans live across PACS, viewers and TPS; without standardized exchange, workflow burden grows." },
  { icon: "review", title: "AI must fit the existing review flow", body: "If AI results cannot return to the familiar TPS review environment as standard DICOM objects, their value is greatly diminished." },
];

const problems: Problem[] = [
  {
    icon: "contour",
    title: "人工圈註負擔沉重",
    body: "腦部腫瘤輪廓多仰賴逐張人工描繪，重複性高、耗時，且在多發病灶情境下工作量更為可觀。",
  },
  {
    icon: "layers",
    title: "跨系統影像與結構交換複雜",
    body: "影像、輪廓與計畫資料分散於 PACS、影像瀏覽器與 TPS 之間，缺乏標準化交換容易增加流程負擔。",
  },
  {
    icon: "review",
    title: "AI 結果需回到既有審閱流程",
    body: "AI 輔助結果若無法以 DICOM 標準物件回到醫師熟悉的 TPS 審閱環境，導入價值將大打折扣。",
  },
];

export function ProblemCards({ locale = "zh-TW" }: { locale?: Locale }) {
  const items = locale === "en" ? problemsEn : problems;
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((p, i) => (
        <Reveal key={p.title} delay={(i % 3) * 0.08}>
          <div className="tech-card group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5">
            <span aria-hidden className="card-accent" />
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2">
              <Icon name={p.icon} size={22} />
            </span>
            <h3 className="mt-4 text-base font-semibold text-ink">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
