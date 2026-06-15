import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ContactForm } from "@/components/sections/ContactForm";
import { contact } from "@/data/site";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("contact", params);
}

const needs: { icon: IconName; label: string }[] = [
  { icon: "hospital", label: "醫療院所導入 DeepBT Detector-Plus / 臨床合作" },
  { icon: "play", label: "申請產品展示 / 觀看展示影片" },
  { icon: "shield", label: "SaMD 取證諮詢（TFDA / FDA 送件輔導）" },
  { icon: "lock", label: "醫療器材資安輔導" },
  { icon: "research", label: "研究合作與技術交流" },
  { icon: "patent", label: "專利與技術合作洽詢" },
  { icon: "chart", label: "投資與商業合作" },
];

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  void locale;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="聯絡我們"
        titleEn="Contact AItewan"
        description="無論您是希望導入腦部腫瘤 AI 輔助圈註系統的醫療院所，或是需要 TFDA / FDA SaMD 取證、ISO 13485 品質系統、資安檢測、醫材送件輔導與專利技術布局建議的醫療 AI 團隊，智德萬皆可提供從產品規劃、臨床流程整合到法規落地的專業協助。"
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr]">
          <div>
            <h2 className="text-lg font-semibold text-ink">我們可以協助的合作需求</h2>
            <ul className="mt-5 space-y-3">
              {needs.map((n) => (
                <li key={n.label} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon name={n.icon} size={17} />
                  </span>
                  {n.label}
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3 rounded-2xl border border-line bg-surface-soft p-5">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-sm font-medium text-ink hover:text-brand-700"
              >
                <Icon name="mail" size={18} className="text-accent-700" />
                {contact.email}
              </a>
              <p className="flex items-center gap-3 text-sm text-ink-soft">
                <Icon name="mapPin" size={18} className="text-accent-700" />
                {contact.addressLine}
                <span className="text-xs text-ink-muted">{contact.addressNote}</span>
              </p>
              <p className="flex items-center gap-3 text-sm text-ink-soft">
                <Icon name="phone" size={18} className="text-accent-700" />
                {contact.phone}
                <span className="text-xs text-ink-muted">傳真 {contact.fax}</span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-ink">填寫洽詢表單</h2>
            <p className="mt-1 text-sm text-ink-muted">
              請選擇需求類型並簡述需求，我們將盡快與您聯繫。
            </p>
            <div className="mt-6">
              <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-surface-muted" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
