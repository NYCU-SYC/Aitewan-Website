import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { awards, milestones } from "@/data/recognition";

const latestMilestone = milestones[milestones.length - 1];

/** Awards & recognition wall + compact milestone timeline (DeepRad-style). */
export function AwardsWall() {
  return (
    <div>
      {/* award badge cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((a, i) => (
          <Reveal key={a.title} delay={(i % 3) * 0.07}>
            <div className="tech-card group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5">
              <span aria-hidden className="card-accent" />
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-accent-700 text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2">
                <Icon name={a.icon} size={24} />
              </span>
              <div>
                <span className="inline-flex rounded-full bg-accent-50 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-accent-700">
                  {a.year}
                </span>
                <h3 className="mt-1.5 text-[0.95rem] font-semibold leading-snug text-ink">
                  {a.title}
                </h3>
                <p className="mt-0.5 text-xs text-ink-muted">{a.issuer}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* milestone timeline */}
      <Reveal delay={0.1}>
        <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-brand-100 bg-white p-6 shadow-2xl shadow-brand-900/8 sm:p-8">
          <div aria-hidden className="absolute inset-0 medical-grid opacity-[0.14]" />
          <div
            aria-hidden
            className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-accent-200/35 blur-3xl"
          />

          <div className="relative">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent-800">
                  <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-500" />
                  Milestones
                </span>
                <h3 className="mt-4 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                  公司里程碑
                </h3>
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-ink-soft">
                從學研創新、醫材查驗登記到美國 FDA 510(k) clearance，逐步推進腦瘤 AI 產品臨床落地。
              </p>
            </div>

            <ol className="relative mt-10 space-y-5 lg:grid lg:grid-cols-5 lg:items-stretch lg:gap-0 lg:space-y-0">
              <span
                aria-hidden
                className="absolute left-[9%] right-[9%] top-[1.05rem] hidden h-1 rounded-full bg-gradient-to-r from-accent-200 via-accent-400 to-brand-700 lg:block"
              />
              {milestones.map((m, i) => {
                const isLatest = m === latestMilestone;
                return (
                  <li key={m.text} className="relative lg:flex lg:h-full lg:px-2">
                    <div className="flex gap-4 lg:flex lg:h-full lg:flex-col">
                      <span
                        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-white text-xs font-bold shadow-lg ${
                          isLatest
                            ? "border-brand-700 text-brand-800 shadow-brand-900/20"
                            : "border-accent-400 text-accent-700 shadow-accent-900/10"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div
                        className={`tech-card group relative flex min-h-36 flex-1 flex-col overflow-hidden rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:min-h-52 ${
                          isLatest
                            ? "border-brand-200 bg-gradient-to-br from-brand-950 to-accent-900 text-white shadow-brand-900/15"
                            : "border-line bg-white/90 text-ink backdrop-blur-sm hover:border-accent-200 hover:shadow-brand-900/5"
                        }`}
                      >
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-sm font-bold tabular-nums ${
                            isLatest
                              ? "bg-white/10 text-accent-100"
                              : "bg-accent-50 text-brand-800"
                          }`}
                        >
                          {m.date}
                        </span>
                        <p
                          className={`mt-3 text-sm leading-relaxed ${
                            isLatest ? "text-brand-50" : "text-ink-soft"
                          }`}
                        >
                          {m.text}
                        </p>
                        {isLatest && (
                          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent-200">
                            <Icon name="badge" size={13} />
                            Latest
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
