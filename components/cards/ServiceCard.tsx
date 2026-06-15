import { Icon, type IconName } from "@/components/ui/Icon";

export function ServiceCard({
  icon,
  title,
  body,
  index,
}: {
  icon: IconName;
  title: string;
  body: string;
  index?: number;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-lg hover:shadow-brand-900/5">
      <span aria-hidden className="card-accent" />
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-700 transition-colors group-hover:bg-accent-600 group-hover:text-white">
          <Icon name={icon} size={22} />
        </div>
        {index != null && (
          <span className="text-sm font-semibold tabular-nums text-line-strong">
            {String(index).padStart(2, "0")}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug text-ink">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}
