"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { getWorkflowSteps } from "@/data/workflow";
import type { Locale } from "@/lib/i18n";

/**
 * Step-by-step workflow reveal. Variants are built in-component so reduced
 * motion only zeroes timings — markup stays identical between server and
 * client (hydration-safe).
 */
export function WorkflowDiagram({ locale = "zh-TW" }: { locale?: Locale }) {
  const reduce = useReducedMotion();
  const workflowSteps = getWorkflowSteps(locale);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div>
      {/* compact flow strip */}
      <div className="mb-10 hidden flex-wrap items-center justify-center gap-x-2 gap-y-3 md:flex">
        {workflowSteps.map((s, i) => (
          <Fragment key={s.step}>
            <span className="rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-xs font-medium text-brand-700">
              {s.titleEn}
            </span>
            {i < workflowSteps.length - 1 && (
              <Icon name="arrowRight" size={16} className="text-accent-500" />
            )}
          </Fragment>
        ))}
      </div>

      {/* detailed step cards */}
      <motion.ol
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {workflowSteps.map((s, i) => (
          <motion.li
            key={s.step}
            variants={item}
            className="relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={s.icon} size={22} />
              </span>
              <span className="text-2xl font-bold tabular-nums text-line-strong">
                {s.step}
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">{s.title}</h3>
            <p className="mt-0.5 text-xs font-medium text-accent-700">{s.titleEn}</p>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.body}</p>
            {i < workflowSteps.length - 1 && (
              <Icon
                name="arrowRight"
                size={18}
                className="absolute -right-3.5 top-1/2 hidden -translate-y-1/2 text-accent-400 lg:block"
                style={(i + 1) % 3 === 0 ? { display: "none" } : undefined}
              />
            )}
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
