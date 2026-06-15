import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteBackground } from "@/components/layout/SiteBackground";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";
import { StructuredData } from "@/components/layout/StructuredData";
import { EnglishDomTranslator } from "@/components/layout/EnglishDomTranslator";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh-TW";

  if (locale === "en") {
    return {
      title: "AI-Assisted Brain Tumor Contouring for Radiotherapy Workflows | AItewan",
      description:
        "AItewan develops physician-supervised medical imaging AI for brain tumor MRI analysis, preliminary contouring, DICOM PR / RTSS output, and radiotherapy workflow support.",
      alternates: { canonical: "/en" },
      openGraph: {
        locale: "en_US",
        title: "AItewan | AI-Assisted Brain Tumor Contouring",
        description:
          "Medical imaging AI for physician-supervised brain tumor contouring and DICOM workflow integration.",
      },
    };
  }

  return {
    title: "智德萬 AItewan｜AI 輔助腦部腫瘤圈註與放射治療流程整合",
    description:
      "智德萬 AItewan 專注於腦部腫瘤 MRI AI 輔助圈註、DICOM workflow integration 與 SaMD 法規取證；DeepBT Detector-Plus 支援合格醫療專業人員於放射治療計畫流程中審閱初步腫瘤輪廓。",
    alternates: { canonical: "/zh-TW" },
    openGraph: {
      locale: "zh_TW",
      title: "智德萬 AItewan｜AI 輔助腦部腫瘤圈註",
      description:
        "AI 輔助腦部腫瘤圈註、DICOM 臨床流程整合與 SaMD 法規取證。",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <SetHtmlLang locale={locale as Locale} />
      <StructuredData locale={locale as Locale} />
      <div key={locale} className="contents">
        {locale === "en" && <EnglishDomTranslator locale={locale as Locale} />}
        <SiteBackground />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale as Locale} />
      </div>
    </>
  );
}
