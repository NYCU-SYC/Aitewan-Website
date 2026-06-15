import { Icon, type IconName } from "@/components/ui/Icon";

type DataCard = {
  icon: IconName;
  label: string;
  value: string;
  position: string;
  floatClass: string;
};

const cards: DataCard[] = [
  {
    icon: "chart",
    label: "Lesion-wise Sensitivity",
    value: "88.6%",
    position: "right-[4%] top-[14%]",
    floatClass: "anim-float",
  },
  {
    icon: "workflow",
    label: "Standardized Output",
    value: "DICOM PR / RTSS",
    position: "right-[2.5%] top-[58%]",
    floatClass: "anim-float-delay",
  },
  {
    icon: "brain",
    label: "Cleared Tumor Categories",
    value: "3 types",
    position: "left-[40%] bottom-[10%]",
    floatClass: "anim-float",
  },
];

/**
 * Floating glassmorphism data chips over the hero imaging area — quantitative
 * trust signals presented as a futuristic dashboard layer. Decorative
 * (aria-hidden): the same facts appear as text elsewhere on the page.
 */
export function FloatingDataCards() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`absolute ${c.position} ${c.floatClass} flex items-center gap-3 rounded-2xl border border-white/50 bg-white/65 px-4 py-3 shadow-lg shadow-brand-900/10 backdrop-blur-md`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-accent-600 text-white">
            <Icon name={c.icon} size={18} />
          </span>
          <span>
            <span className="block text-[0.62rem] font-semibold uppercase tracking-wider text-ink-muted">
              {c.label}
            </span>
            <span className="block text-sm font-bold tabular-nums text-brand-800">
              {c.value}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
