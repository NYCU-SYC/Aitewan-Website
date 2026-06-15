"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocale } from "@/components/ui/useLocale";
import { getMainNav, type NavItem, type NavLeaf } from "@/data/navigation";
import { getCtas } from "@/data/site";
import type { Locale } from "@/lib/i18n";

const headerStrings: Record<Locale, { openMenu: string; closeMenu: string; mainNav: string; mobileNav: string; home: string; logoAlt: string }> = {
  "zh-TW": { openMenu: "開啟選單", closeMenu: "關閉選單", mainNav: "主選單", mobileNav: "行動選單", home: "智德萬 AItewan 首頁", logoAlt: "智德萬 AItewan 生醫科技" },
  en: { openMenu: "Open menu", closeMenu: "Close menu", mainNav: "Main navigation", mobileNav: "Mobile navigation", home: "AItewan home", logoAlt: "AItewan BioMedical Technology logo" },
};

function useActive(locale: Locale) {
  const pathname = usePathname();
  const home = `/${locale}`;
  return (href: string) => (href === home ? pathname === home : pathname.startsWith(href));
}

function hasChildren(item: NavItem): item is { label: string; labelEn?: string; children: NavLeaf[] } {
  return "children" in item;
}

function DesktopItem({ item, locale, compact = false }: { item: NavItem; locale: Locale; compact?: boolean }) {
  const isActive = useActive(locale);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const itemClass = compact ? "px-2.5 py-2 text-[0.88rem]" : "px-2.5 py-2 text-[0.9rem]";

  if (!hasChildren(item)) {
    const active = isActive(item.href);
    return (
      <Link
        href={item.href}
        className={`relative whitespace-nowrap rounded-full font-medium transition-colors ${itemClass} ${
          active ? "text-brand-700" : "text-ink-soft hover:text-brand-700"
        }`}
      >
        {item.label}
        {active && (
          <span className="absolute inset-x-2.5 -bottom-px h-0.5 rounded-full bg-accent-500" />
        )}
      </Link>
    );
  }

  const groupActive = item.children.some((c) => isActive(c.href));

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-0.5 whitespace-nowrap rounded-full font-medium transition-colors ${itemClass} ${
          groupActive || open ? "text-brand-700" : "text-ink-soft hover:text-brand-700"
        }`}
      >
        {item.label}
        <Icon
          name="chevronDown"
          size={15}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 pt-2"
          >
            <div className="w-80 overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-xl shadow-brand-900/10">
              {item.children.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className={`block rounded-xl px-3 py-2.5 transition-colors ${
                    isActive(c.href) ? "bg-brand-50" : "hover:bg-surface-soft"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-ink">{c.label}</span>
                    {c.labelEn && (
                      <span className="text-[0.65rem] uppercase tracking-wide text-ink-muted">
                        {c.labelEn}
                      </span>
                    )}
                  </div>
                  {c.desc && (
                    <p className="mt-0.5 text-xs leading-snug text-ink-muted">{c.desc}</p>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ onClose, locale }: { onClose: () => void; locale: Locale }) {
  const isActive = useActive(locale);
  const reduce = useReducedMotion();
  const nav = getMainNav(locale);
  const ctas = getCtas(locale);
  const s = headerStrings[locale];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] lg:hidden"
    >
      <div className="absolute inset-0 bg-brand-950/40 backdrop-blur-sm" onClick={onClose} />
      <motion.nav
        initial={reduce ? { opacity: 0 } : { x: "100%" }}
        animate={reduce ? { opacity: 1 } : { x: 0 }}
        exit={reduce ? { opacity: 0 } : { x: "100%" }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 grid h-[100dvh] max-h-[100dvh] w-[min(92vw,28rem)] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-white shadow-2xl"
        aria-label={s.mobileNav}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
          <Link href={`/${locale}`} onClick={onClose}>
            <Logo className="h-8 w-auto max-w-[13rem] sm:h-9 sm:max-w-[16rem]" alt={s.logoAlt} />
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={onClose}
              aria-label={s.closeMenu}
              className="rounded-full p-2 text-ink-soft hover:bg-surface-soft"
            >
              <Icon name="close" size={22} />
            </button>
          </div>
        </div>
        <div className="min-h-0 overflow-y-auto overscroll-contain px-3 py-4 pb-7">
          {nav.map((item) =>
            hasChildren(item) ? (
              <div
                key={item.label}
                className="mb-3 rounded-2xl border border-line bg-surface-soft/70 p-2"
              >
                <p className="px-2 pb-2 pt-1 text-xs font-bold uppercase tracking-wider text-accent-700">
                  {item.label}
                </p>
                {item.children.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={onClose}
                    className={`block rounded-xl px-3 py-3 text-[0.98rem] transition-colors ${
                      isActive(c.href)
                        ? "bg-white font-semibold text-brand-700 shadow-sm"
                        : "font-medium text-ink hover:bg-white/80"
                    }`}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`mb-2 block rounded-2xl border border-line px-4 py-3.5 text-[0.98rem] font-semibold transition-colors ${
                  isActive(item.href) ? "bg-brand-50 text-brand-700" : "bg-white text-ink hover:bg-surface-soft"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
        <div className="shrink-0 border-t border-line bg-white/95 p-4 shadow-[0_-10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
          <Link
            href={ctas.demo.href}
            onClick={onClose}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-700 font-medium text-white"
          >
            {ctas.demo.label}
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </motion.nav>
    </motion.div>
  );
}

export function SiteHeader() {
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = getMainNav(locale);
  const ctas = getCtas(locale);
  const s = headerStrings[locale];
  const isEnglish = locale === "en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-white/75 shadow-sm shadow-brand-900/5 backdrop-blur-xl"
          : "border-b border-transparent bg-white/55 backdrop-blur-md"
      }`}
    >
      {/* brand gradient hairline */}
      <div
        aria-hidden
        className="h-0.5 bg-gradient-to-r from-brand-700 via-accent-500 to-brand-700"
      />
      <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between px-5 sm:px-6 lg:px-8 xl:grid xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-3">
        <Link href={`/${locale}`} aria-label={s.home} className="shrink-0">
          <Logo
            className="h-8 w-auto max-w-[12rem] sm:h-9 sm:max-w-[15.5rem] lg:h-10 lg:max-w-[17rem]"
            priority
            alt={s.logoAlt}
          />
        </Link>

        <nav
          className={`hidden min-w-0 items-center justify-center xl:flex ${isEnglish ? "gap-1" : "gap-0.5"}`}
          aria-label={s.mainNav}
        >
          {nav.map((item) => (
            <DesktopItem key={item.label} item={item} locale={locale} compact={isEnglish} />
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <LanguageSwitcher className="hidden md:inline-flex" />
          <Link
            href={ctas.demo.href}
            className={`hidden h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-700 font-medium text-white transition-colors hover:bg-brand-800 xl:inline-flex ${
              isEnglish ? "px-3.5 text-[0.88rem] 2xl:px-4 2xl:text-sm" : "px-4 text-sm"
            }`}
          >
            {ctas.demo.label}
            <Icon name="arrowRight" size={16} />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={s.openMenu}
            aria-expanded={menuOpen}
            className="rounded-full p-2 text-ink hover:bg-surface-soft xl:hidden"
          >
            <Icon name="menu" size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} locale={locale} />}
      </AnimatePresence>
    </header>
  );
}
