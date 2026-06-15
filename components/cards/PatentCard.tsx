import { Icon } from "@/components/ui/Icon";
import type { PatentArea } from "@/data/patents";

export function PatentCard({ area }: { area: PatentArea }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-lg hover:shadow-brand-900/5">
      <span aria-hidden className="card-accent" />
      <span className="text-xs font-semibold uppercase tracking-wider text-accent-700">
        {area.area}
      </span>
      <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
        <Icon name={area.icon} size={24} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink">{area.title}</h3>
      <p className="mt-0.5 text-xs font-medium text-ink-muted">{area.titleEn}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{area.body}</p>
    </div>
  );
}
