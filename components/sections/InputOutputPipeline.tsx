"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { modalities, dicomOutputs } from "@/data/product";

/**
 * MRI input → DeepBT inference → DICOM output pipeline（Phase 3 產品頁 §4）。
 * Markup is SSR-constant; reduced motion only zeroes transition timing
 * (hydration-safe). Mobile stacks vertically.
 */
export function InputOutputPipeline() {
  const reduce = useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
      {/* Inputs */}
      <div className="flex flex-col justify-center gap-4">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
          MRI Input
        </p>
        {modalities.map((m, i) => (
          <motion.div
            key={m.code}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: dur(0.5), delay: dur(i * 0.12) }}
            className="rounded-2xl border border-line bg-white p-5 shadow-sm"
          >
            <span className="rounded-md bg-accent-50 px-2 py-0.5 font-mono text-[0.7rem] font-semibold text-accent-700">
              {m.code}
            </span>
            <p className="mt-2 text-sm font-semibold text-ink">{m.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{m.note}</p>
          </motion.div>
        ))}
      </div>

      {/* Inference core */}
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: dur(0.5), delay: dur(0.2) }}
          className="relative flex flex-col items-center gap-2 rounded-2xl border border-brand-100 bg-gradient-to-b from-brand-950 to-brand-800 px-8 py-7 text-center shadow-xl shadow-brand-900/20"
        >
          <span
            aria-hidden
            className="dot-pulse absolute right-3 top-3 h-2 w-2 rounded-full bg-accent-400"
          />
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-accent-300 ring-1 ring-white/20">
            <Icon name="cpu" size={28} />
          </span>
          <p className="mt-1 text-sm font-bold text-white">DeepBT Detector-Plus</p>
          <p className="text-[0.7rem] font-medium uppercase tracking-wider text-brand-200">
            AI Inference
          </p>
          <p className="mt-1 max-w-[180px] text-[0.7rem] leading-relaxed text-brand-100/80">
            三類取證腫瘤之初步輪廓產生
          </p>
          {/* connectors（lg+） */}
          <span
            aria-hidden
            className="absolute -left-6 top-1/2 hidden h-px w-6 bg-gradient-to-r from-transparent to-accent-400 lg:block"
          />
          <span
            aria-hidden
            className="absolute -right-6 top-1/2 hidden h-px w-6 bg-gradient-to-r from-accent-400 to-transparent lg:block"
          />
        </motion.div>
      </div>

      {/* Outputs */}
      <div className="flex flex-col justify-center gap-4">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
          DICOM Output → Physician Review
        </p>
        {dicomOutputs.map((d, i) => (
          <motion.div
            key={d.code}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: dur(0.5), delay: dur(0.35 + i * 0.15) }}
            className="rounded-2xl border border-line bg-white p-5 shadow-sm"
          >
            <span className="rounded-md bg-brand-50 px-2 py-0.5 font-mono text-[0.7rem] font-semibold text-brand-700">
              {d.code}
            </span>
            <p className="mt-2 text-sm font-semibold text-ink">{d.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{d.note}</p>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: dur(0.5), delay: dur(0.65) }}
          className="flex items-center gap-2.5 rounded-2xl border border-accent-100 bg-accent-50/60 p-4"
        >
          <Icon name="review" size={18} className="shrink-0 text-accent-700" />
          <p className="text-xs leading-relaxed text-accent-900">
            由合格醫療專業人員於 PACS / TPS 中審閱、確認或修改
          </p>
        </motion.div>
      </div>
    </div>
  );
}
