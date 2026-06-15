import { Icon, type IconName } from "@/components/ui/Icon";

export function FeatureCard({
  icon,
  title,
  titleEn,
  body,
}: {
  icon: IconName;
  title: string;
  titleEn?: string;
  body: string;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5">
      <span aria-hidden className="card-accent" />
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700 transition-colors group-hover:bg-gradient-to-br group-hover:from-brand-700 group-hover:to-accent-700 group-hover:text-white">
        <Icon name={icon} size={24} />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
      {titleEn && (
        <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-accent-700">
          {titleEn}
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}
