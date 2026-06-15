import { Icon } from "@/components/ui/Icon";
import type { RegulatoryCard as EvidenceData } from "@/data/regulatory";

const statusChip: Record<string, { label: string; cls: string } | undefined> = {
  verified: { label: "已查核", cls: "bg-valid-green/10 text-valid-green" },
  "partially-verified": { label: "限定措辭", cls: "bg-brand-50 text-brand-700" },
  "pending-authorization": { label: "待授權", cls: "bg-review-amber/10 text-review-amber" },
  "pending-review": { label: "待審核", cls: "bg-review-amber/10 text-review-amber" },
};

/** Certificate-style evidence card（規格書 §7 EvidenceCard）— 內建 reviewStatus 與 source link。 */
export function EvidenceCard({ card }: { card: EvidenceData }) {
  const chip = card.reviewStatus ? statusChip[card.reviewStatus] : undefined;
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5">
      <span aria-hidden className="card-accent" />
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-accent-700 text-white shadow-sm">
          <Icon name={card.icon} size={24} />
        </div>
        {chip && (
          <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${chip.cls}`}>
            {chip.label}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-base font-semibold leading-snug text-ink">{card.title}</h3>
      <p className="mt-1 text-xs font-medium text-accent-700">{card.titleEn}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{card.body}</p>
      {card.officialUrl && (
        <a
          href={card.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800"
        >
          <Icon name="external" size={13} />
          官方來源 · Official source
        </a>
      )}
      {card.pending && (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-surface-muted px-2 py-1 text-[0.7rem] text-ink-muted">
          <Icon name="file" size={12} />
          {card.pending}
        </p>
      )}
    </div>
  );
}
