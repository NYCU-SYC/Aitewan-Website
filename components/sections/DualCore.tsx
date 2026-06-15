import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/lib/i18n";

/**
 * Home dual-core positioning: Liger MedAI Platform (integration backbone) +
 * DeepBT® (flagship brain-tumor AI module). Locale-aware so /en renders real
 * English from SSR rather than relying on the DOM translator.
 */

type Core = {
  href: string;
  eyebrow: string;
  title: string;
  titleEn: string;
  desc: string;
  badges: { icon: IconName; label: string }[];
  cta: string;
};

export function DualCore({ locale = "zh-TW" }: { locale?: Locale }) {
  const en = locale === "en";
  const t = (zh: string, eng: string) => (en ? eng : zh);
  const href = (p: string) => `/${locale}${p}`;

  const narrative = t(
    "智德萬正在打造一套受法規規範的醫學影像 AI 基礎架構，銜接 AI 研究、臨床工作流程與醫院規模部署——以 Liger 平台作為整合骨幹，DeepBT® 作為旗艦腦瘤 AI 應用，讓醫學影像 AI 從單一演算法走向真實臨床運作。",
    "AItewan is building a regulated medical-imaging AI infrastructure that bridges AI research, clinical workflow and hospital-scale deployment — with the Liger MedAI Platform as the integration backbone and DeepBT® as the flagship brain-tumor AI application, moving imaging AI beyond standalone algorithms into real clinical operation.",
  );

  const cores: Core[] = [
    {
      href: href("/liger-platform"),
      eyebrow: t("整合平台", "Integration platform"),
      title: "Liger MedAI Platform",
      titleEn: t("醫學影像 AI 整合平台", "Medical Imaging AI Platform"),
      desc: t(
        "已取得 TFDA 第二類醫療器材許可的醫學影像 AI 整合平台，串接 DICOM／PACS／FHIR，支援 AI 模型部署、運算、結果回傳、稽核與多模組擴充。",
        "A TFDA Class II cleared medical-imaging AI platform connecting DICOM/PACS/FHIR — supporting model deployment, computation, result return, audit and multi-module scaling.",
      ),
      badges: [
        { icon: "shield", label: "TFDA · 008624" },
        { icon: "workflow", label: "DICOM / PACS / FHIR" },
      ],
      cta: t("了解 Liger 平台", "Explore Liger"),
    },
    {
      href: href("/deepbt"),
      eyebrow: t("旗艦臨床應用", "Flagship clinical module"),
      title: "DeepBT® Brain Tumor AI",
      titleEn: t("腦瘤 AI 智慧輔助系統", "Brain Tumor AI System"),
      desc: t(
        "Liger 上的旗艦腦瘤 AI 應用。Detector Plus 已取得 FDA 510(k) 與 TFDA 許可；Detector A+（審查中）支援五類腦瘤偵測、分割、分類與 LLM 報告草稿。",
        "The flagship brain-tumor AI on Liger. Detector Plus holds FDA 510(k) and TFDA clearance; Detector A+ (in review) supports 5-type detection, segmentation, classification and LLM report drafting.",
      ),
      badges: [
        { icon: "badge", label: "FDA 510(k) · K252190" },
        { icon: "shield", label: "TFDA · 008460" },
      ],
      cta: t("了解 DeepBT®", "Explore DeepBT®"),
    },
  ];

  return (
    <div>
      <Reveal>
        <p className="mx-auto mb-10 max-w-3xl text-center text-[1.02rem] leading-relaxed text-ink-soft">
          {narrative}
        </p>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-2">
        {cores.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <a
              href={c.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5"
            >
              <span aria-hidden className="card-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">{c.eyebrow}</span>
              <h3 className="mt-2 text-xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-0.5 text-sm font-medium text-ink-muted">{c.titleEn}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">{c.desc}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.badges.map((b) => (
                  <li
                    key={b.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50/60 px-2.5 py-1 text-[0.7rem] font-medium text-brand-700"
                  >
                    <Icon name={b.icon} size={12} className="text-accent-600" />
                    {b.label}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-800">
                {c.cta}
                <Icon name="arrowRight" size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
