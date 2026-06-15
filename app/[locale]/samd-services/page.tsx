import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { getSamdServices, getServicesIntro, getWhyUs, getWhyUsBody } from "@/data/services";
import { getCtas } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("samd-services", params);
}

export default async function SamdConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "zh-TW";
  const en = locale === "en";
  const t = (zh: string, eng: string) => (en ? eng : zh);
  const ctas = getCtas(locale);
  const samdServices = getSamdServices(locale);
  const servicesIntro = getServicesIntro(locale);
  const whyUs = getWhyUs(locale);
  const whyUsBody = getWhyUsBody(locale);

  return (
    <>
      <PageHero
        eyebrow="SaMD Consulting"
        title={t("SaMD 法規與委託取證服務", "SaMD Regulatory Consulting and Submission Services")}
        titleEn={t(
          "從法規策略、品質系統到 TFDA / FDA 送件",
          "From regulatory strategy and QMS to TFDA / FDA submissions",
        )}
        description={servicesIntro}
        badges={[
          { icon: "shield", label: t("TFDA 二類", "TFDA Class II") },
          { icon: "badge", label: "FDA 510(k)" },
          { icon: "quality", label: "ISO 13485" },
          { icon: "lock", label: t("醫材資安文件", "Medical-device cybersecurity") },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={ctas.samd.href}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-700 px-5 text-sm font-medium text-white transition-colors hover:bg-brand-800"
          >
            {t("預約諮詢", "Book a consultation")}
            <Icon name="arrowRight" size={16} />
          </a>
        </div>
      </PageHero>

      <Section bg="soft">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Our Services"
            title={t("SaMD 法規與合規服務項目", "SaMD regulatory and compliance services")}
            titleEn={t(
              "取證策略、品質系統、資安文件與臨床驗證",
              "Submission strategy, QMS, cybersecurity documentation and clinical validation",
            )}
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {samdServices.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.07}>
              <ServiceCard icon={s.icon} title={s.title} body={s.body} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="dark">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Why AItewan"
              title={t("從產品開發到法規取證", "From product development to regulatory clearance")}
              titleEn="From Product Development to Regulatory Clearance"
              description={whyUsBody}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-3.5">
              {whyUs.map((w) => (
                <li
                  key={w}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-brand-100/90"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-300">
                    <Icon name="check" size={13} />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title={t("準備啟動您的 SaMD 取證計畫？", "Ready to start your SaMD regulatory plan?")}
        description={t(
          "無論是 TFDA 二類、FDA 510(k)、ISO 13485 品質系統建立、醫材資安文件或臨床驗證設計，智德萬都能提供務實的實戰協助。",
          "Whether you need TFDA Class II strategy, FDA 510(k) preparation, ISO 13485 QMS implementation, cybersecurity documentation or clinical-validation design, AItewan provides practical support grounded in real SaMD experience.",
        )}
        primary={ctas.samd}
        secondary={[ctas.security, ctas.contact]}
      />
    </>
  );
}
