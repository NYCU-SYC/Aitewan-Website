import { Icon } from "@/components/ui/Icon";
import type { Publication } from "@/data/publications";

export function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5">
      <span aria-hidden className="card-accent" />
      <div className="flex flex-wrap gap-1.5">
        {pub.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[0.7rem] font-medium text-brand-700"
          >
            {t}
          </span>
        ))}
      </div>
      <h3 className="mt-4 text-[0.98rem] font-semibold leading-snug text-ink">
        {pub.title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-ink-muted">{pub.authors}</p>
      <p className="mt-1 text-xs font-medium text-accent-700">
        {pub.venue}
        {pub.year !== "—" ? ` · ${pub.year}` : ""}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{pub.summary}</p>
      <p className="mt-4 inline-flex items-center gap-1.5 text-[0.7rem] text-ink-muted">
        <Icon name="external" size={12} />
        待補：DOI / PubMed 連結
      </p>
    </article>
  );
}
