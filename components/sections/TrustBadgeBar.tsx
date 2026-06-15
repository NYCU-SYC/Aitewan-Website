import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { ReviewStatus } from "@/lib/claims-registry";
import type { Locale } from "@/lib/i18n";

type TrustBadge = {
  icon: IconName;
  label: string;
  status: ReviewStatus;
  href?: string;
};

/**
 * Trust badges 來自 claims registry 規則（規格書 §2 / §4-01）：
 * verified 顯示綠色查核點；partially-verified 維持中性；未授權項目不在此列。
 */
const badgesByLocale: Record<Locale, TrustBadge[]> = {
  "zh-TW": [
    {
      icon: "badge",
      label: "U.S. FDA 510(k) K252190",
      status: "verified",
      href: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K252190",
    },
    { icon: "layers", label: "Liger 平台 TFDA · 008624", status: "verified" },
    { icon: "shield", label: "DeepBT® TFDA 二類 · 008460", status: "verified" },
    { icon: "workflow", label: "DICOM PR / RTSS 整合", status: "verified" },
    { icon: "hospital", label: "台灣醫學中心臨床導入", status: "pending-authorization" },
    { icon: "award", label: "國家新創獎 · 智慧創新大賞", status: "verified" },
  ],
  en: [
    {
      icon: "badge",
      label: "U.S. FDA 510(k) K252190",
      status: "verified",
      href: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K252190",
    },
    { icon: "layers", label: "Liger Platform TFDA · 008624", status: "verified" },
    { icon: "shield", label: "DeepBT® TFDA Class II · 008460", status: "verified" },
    { icon: "workflow", label: "DICOM PR / RTSS integration", status: "verified" },
    { icon: "hospital", label: "Deployed in Taiwanese medical centers", status: "pending-authorization" },
    { icon: "award", label: "National Innovation & Smart Innovation Awards", status: "verified" },
  ],
};

export function TrustBadgeBar({ locale = "zh-TW" }: { locale?: Locale }) {
  const badges = badgesByLocale[locale];
  return (
    <div className="relative border-y border-line bg-surface-soft">
      <div aria-hidden className="gradient-rule absolute inset-x-0 top-0" />
      <Container className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 py-5">
        {badges.map((b) => {
          const inner = (
            <>
              <Icon name={b.icon} size={15} className="text-brand-700" />
              <span>{b.label}</span>
            </>
          );
          const cls =
            "inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-ink-soft";
          return b.href ? (
            <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:text-brand-700`}>
              {inner}
              <Icon name="external" size={11} className="text-ink-muted" />
            </a>
          ) : (
            <span key={b.label} className={cls}>
              {inner}
            </span>
          );
        })}
      </Container>
    </div>
  );
}
