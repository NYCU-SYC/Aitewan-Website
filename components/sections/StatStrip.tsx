export function StatStrip({
  stats,
  tone = "light",
}: {
  stats: { value: string; label: string }[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <dl
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border sm:grid-cols-3 lg:grid-cols-5 ${
        dark ? "border-white/10 bg-white/10" : "border-line bg-line"
      }`}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className={`flex flex-col gap-1 p-5 ${dark ? "bg-brand-950" : "bg-white"}`}
        >
          <dt
            className={`text-2xl font-bold tracking-tight sm:text-[1.65rem] ${
              dark ? "text-white" : "text-gradient"
            }`}
          >
            {s.value}
          </dt>
          <dd className={`text-xs leading-snug ${dark ? "text-brand-200/80" : "text-ink-muted"}`}>
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
