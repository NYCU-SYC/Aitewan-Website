"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { stickySteps } from "@/data/workflow";

/**
 * Sticky-scroll workflow（Phase 3 §2）：desktop 左側 sticky visual panel 隨
 * scroll 切換內容，右側步驟依序 highlight；mobile 退化為 vertical cards
 * （sticky panel 隱藏）。activeStep 初始值固定 → hydration-safe；reduced
 * motion 僅影響 transition 時間。
 */
export function StickyWorkflow() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const step = stickySteps[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr]">
      {/* sticky visual panel（lg+） */}
      <div className="hidden lg:block">
        <div className="sticky top-28 overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-brand-950 to-brand-800 p-8 shadow-xl shadow-brand-900/20">
          <div aria-hidden className="medical-grid absolute inset-0 opacity-[0.12]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -10 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
              className="relative"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-300">
                Step {String(active + 1).padStart(2, "0")} / {String(stickySteps.length).padStart(2, "0")}
              </span>
              <span className="mt-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-accent-300 ring-1 ring-white/20">
                <Icon name={step.icon} size={40} />
              </span>
              <h3 className="mt-6 text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-1 text-sm font-medium text-brand-200">{step.titleEn}</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-100/85">
                {step.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {step.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/20 bg-white/[0.07] px-3 py-1 font-mono text-xs font-medium text-brand-100"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          {/* progress rail */}
          <div className="relative mt-8 flex gap-1.5">
            {stickySteps.map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i <= active ? "bg-accent-400" : "bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* step list — viewport-driven highlight */}
      <ol className="space-y-5">
        {stickySteps.map((s, i) => (
          <motion.li
            key={s.titleEn}
            onViewportEnter={() => setActive(i)}
            viewport={{ margin: "-42% 0px -42% 0px", amount: "some" }}
            className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
              i === active
                ? "border-accent-300 bg-white shadow-lg shadow-brand-900/10"
                : "border-line bg-white/70 shadow-sm lg:opacity-60"
            }`}
          >
            <span
              aria-hidden
              className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-600 to-accent-500 transition-opacity duration-300 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
            <div className="flex items-start gap-4">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                  i === active
                    ? "bg-gradient-to-br from-brand-700 to-accent-700 text-white"
                    : "bg-brand-50 text-brand-700"
                }`}
              >
                <Icon name={s.icon} size={22} />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-xs font-bold tabular-nums text-accent-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-semibold text-ink">{s.title}</h3>
                  <span className="text-xs font-medium text-ink-muted">{s.titleEn}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                {/* chips visible on mobile (sticky panel hidden) */}
                <div className="mt-3 flex flex-wrap gap-1.5 lg:hidden">
                  {s.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-brand-50 px-2.5 py-0.5 font-mono text-[0.68rem] font-medium text-brand-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
