"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import {
  certifications,
  certKindLabels,
  certKindLabelsEn,
  certUiLabels,
  type Certificate,
  type CertKind,
} from "@/data/certifications";
import { assetPath } from "@/lib/asset-path";
import type { Locale } from "@/lib/i18n";

/** Certificate thumbnail with graceful fallback (placeholder until a scan exists). */
function CertThumb({
  item,
  fit,
  labels,
  title,
}: {
  item: Certificate;
  fit: "cover" | "contain";
  labels: Record<CertKind, string>;
  title: string;
}) {
  const [err, setErr] = useState(false);
  if (!item.image || err) {
    const icon = item.kind === "award" ? "award" : item.kind === "cert" ? "quality" : "badge";
    return (
      <div className="relative flex min-h-[180px] w-full flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-accent-50">
        <span aria-hidden className="medical-grid absolute inset-0 opacity-60" />
        <span
          aria-hidden
          className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent-200/30 blur-2xl"
        />
        <div className="relative flex flex-col items-center px-4 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm ring-1 ring-brand-100">
            <Icon name={icon} size={28} />
          </span>
          <p className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-brand-500">
            {labels[item.kind]}
          </p>
        </div>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assetPath(item.image)}
      alt={title}
      loading="lazy"
      decoding="async"
      onError={() => setErr(true)}
      className={
        fit === "cover"
          ? "max-h-[86%] w-auto rounded object-contain shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.03]"
          : "max-h-[62vh] w-auto max-w-[520px] rounded-lg object-contain ring-1 ring-line"
      }
    />
  );
}

export function CertificateGallery({ locale = "zh-TW" }: { locale?: Locale }) {
  const en = locale === "en";
  const labels = en ? certKindLabelsEn : certKindLabels;
  const ui = en ? certUiLabels.en : certUiLabels.zh;
  const titleOf = (c: Certificate) => (en ? c.titleEn : c.title);
  const issuerOf = (c: Certificate) => (en ? c.issuerEn : c.issuer);
  const summaryOf = (c: Certificate) => (en ? c.summaryEn : c.summary);

  const kinds = useMemo(
    () => Array.from(new Set(certifications.map((c) => c.kind))) as CertKind[],
    [],
  );
  const [filter, setFilter] = useState<"all" | CertKind>("all");
  const [active, setActive] = useState<Certificate | null>(null);
  const items = filter === "all" ? certifications : certifications.filter((c) => c.kind === filter);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  const dateOf = (c: Certificate) => (c.date && c.date !== "—" ? ` · ${c.date}` : "");

  return (
    <div>
      {/* filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {(["all", ...kinds] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === k
                ? "border-brand-600 bg-brand-700 text-white"
                : "border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700"
            }`}
          >
            {k === "all" ? ui.all : labels[k]}
          </button>
        ))}
      </div>

      {/* card grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c)}
            className="group overflow-hidden rounded-2xl border border-line bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
          >
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-surface-soft to-white">
              <CertThumb item={c} fit="cover" labels={labels} title={titleOf(c)} />
              <span className="absolute left-3 top-3 rounded-full bg-brand-950/70 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-accent-200 backdrop-blur-md">
                {labels[c.kind]}
              </span>
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[0.6rem] font-medium text-brand-700 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                <Icon name="external" size={11} />
                {ui.enlarge}
              </span>
            </div>
            <div className="p-5">
              <p className="text-sm font-semibold leading-snug text-ink">{titleOf(c)}</p>
              <p className="mt-1 text-xs text-ink-muted">
                {issuerOf(c)}
                {dateOf(c)}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* lightbox modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={titleOf(active)}
          >
            <div className="absolute inset-0 bg-brand-950/75 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50/70 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-wide text-accent-800">
                  {labels[active.kind]}
                </span>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label={ui.close}
                  className="rounded-full p-1.5 text-ink-soft transition-colors hover:bg-surface-soft"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>
              <div className="max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-center bg-surface-soft p-4">
                  <CertThumb item={active} fit="contain" labels={labels} title={titleOf(active)} />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-ink">{titleOf(active)}</h3>
                  <p className="mt-1 text-xs text-ink-muted">
                    {issuerOf(active)}
                    {dateOf(active)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{summaryOf(active)}</p>
                  {active.link && (
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800"
                    >
                      {ui.verifyLink}
                      <Icon name="external" size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
