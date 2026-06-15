import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { localizeHref, type Locale } from "@/lib/i18n";

type Value = {
  icon: IconName;
  audience: string;
  audienceEn: string;
  body: string;
  href: string;
  cta: string;
};

/** Stakeholder value cards (benefit-first, compliance-safe wording). */
const values: Value[] = [
  {
    icon: "target",
    audience: "放射腫瘤科與醫學物理團隊",
    audienceEn: "Radiation Oncology Teams",
    body: "AI 初步輪廓降低人工圈註負擔，於 TPS 中審閱、確認或修改，支援治療計畫前置作業。",
    href: "/zh-TW/clinical-workflow",
    cta: "了解流程整合",
  },
  {
    icon: "mri",
    audience: "放射科與影像團隊",
    audienceEn: "Radiology & Imaging Teams",
    body: "雙參數 MRI 分析與縱向變化參考，結果以 DICOM PR 回到既有影像瀏覽器審閱。",
    href: "/zh-TW/products/deepbt-detector-plus",
    cta: "了解產品功能",
  },
  {
    icon: "hospital",
    audience: "醫院與醫務管理",
    audienceEn: "Hospitals & Administrators",
    body: "TFDA / FDA 取證之 SaMD、DICOM 標準化整合，具多家醫學中心實際導入經驗。",
    href: "/zh-TW/evidence-regulatory#validation",
    cta: "查看臨床證據",
  },
  {
    icon: "compliance",
    audience: "醫療 AI 開發團隊",
    audienceEn: "Medical AI Teams",
    body: "自有產品取證實戰經驗，提供 SaMD 法規、品質系統與資安文件的務實輔導。",
    href: "/zh-TW/samd-services",
    cta: "了解顧問服務",
  },
];

const valuesEn: Value[] = [
  { icon: "target", audience: "Radiation Oncology Teams", audienceEn: "放射腫瘤科與醫學物理團隊", body: "AI preliminary contours reduce manual delineation workload — review, confirm or modify directly in the TPS to support planning preparation.", href: "/zh-TW/clinical-workflow", cta: "Explore the workflow" },
  { icon: "mri", audience: "Radiology & Imaging Teams", audienceEn: "放射科與影像團隊", body: "Bi-parametric MRI analysis with longitudinal references; results return to existing viewers as DICOM PR for review.", href: "/zh-TW/products/deepbt-detector-plus", cta: "Explore the product" },
  { icon: "hospital", audience: "Hospitals & Administrators", audienceEn: "醫院與醫務管理", body: "A TFDA / FDA-cleared SaMD with standardized DICOM integration and deployment experience across medical centers.", href: "/zh-TW/evidence-regulatory#validation", cta: "View clinical evidence" },
  { icon: "compliance", audience: "Medical AI Teams", audienceEn: "醫療 AI 開發團隊", body: "Hands-on regulatory experience from our own clearances — practical SaMD, QMS and cybersecurity consulting.", href: "/zh-TW/samd-services", cta: "Explore consulting" },
];

export function ClinicalValueSection({ locale = "zh-TW" }: { locale?: Locale }) {
  const items = (locale === "en" ? valuesEn : values).map((v) => ({
    ...v,
    href: localizeHref(v.href, locale),
  }));
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((v, i) => (
        <Reveal key={v.href} delay={(i % 4) * 0.07}>
          <Link
            href={v.href}
            className="tech-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5"
          >
            <span aria-hidden className="card-accent" />
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-brand-700 group-hover:to-accent-700 group-hover:text-white">
              <Icon name={v.icon} size={22} />
            </div>
            <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-wider text-accent-700">
              {v.audienceEn}
            </p>
            <h3 className="mt-0.5 text-base font-semibold leading-snug text-ink">
              {v.audience}
            </h3>
            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{v.body}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
              {v.cta}
              <Icon
                name="arrowRight"
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
