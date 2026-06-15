"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { contact } from "@/data/site";

const inquiryTypes = [
  { value: "demo", label: "申請產品展示" },
  { value: "hospital", label: "醫療院所導入 / 臨床合作" },
  { value: "samd", label: "SaMD 取證諮詢（TFDA / FDA 送件輔導）" },
  { value: "security", label: "醫療器材資安輔導" },
  { value: "research", label: "研究合作與技術交流" },
  { value: "patent", label: "專利與技術合作洽詢" },
  { value: "invest", label: "投資與商業合作" },
  { value: "other", label: "其他合作洽詢" },
] as const;

export function ContactForm() {
  const params = useSearchParams();
  const initialIntent = params.get("intent") ?? "demo";
  const defaultType = inquiryTypes.some((t) => t.value === initialIntent)
    ? initialIntent
    : "demo";

  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(defaultType);
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "請填寫您的姓名";
    if (!email.trim()) e.email = "請填寫聯絡 Email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email 格式不正確";
    if (!message.trim()) e.message = "請簡述您的需求";
    return e;
  }, [name, email, message]);

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setTouched(true);
    if (Object.keys(errors).length > 0) return;
    const typeLabel = inquiryTypes.find((t) => t.value === type)?.label ?? type;
    const subject = `[網站洽詢] ${typeLabel} — ${name}`;
    const body = [
      `需求類型：${typeLabel}`,
      `姓名：${name}`,
      `服務單位 / 公司：${org || "—"}`,
      `Email：${email}`,
      "",
      "需求內容：",
      message,
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const fieldCls =
    "mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors focus:border-brand-400";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-medium text-ink">
            姓名 <span className="text-accent-700">*</span>
          </label>
          <input
            id="cf-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            aria-invalid={touched && !!errors.name}
            className={fieldCls}
          />
          {touched && errors.name && (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-org" className="text-sm font-medium text-ink">
            服務單位 / 公司
          </label>
          <input
            id="cf-org"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            autoComplete="organization"
            className={fieldCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className="text-sm font-medium text-ink">
          Email <span className="text-accent-700">*</span>
        </label>
        <input
          id="cf-email"
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          aria-invalid={touched && !!errors.email}
          className={fieldCls}
        />
        {touched && errors.email && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-type" className="text-sm font-medium text-ink">
          需求類型
        </label>
        <select
          id="cf-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={fieldCls}
        >
          {inquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="text-sm font-medium text-ink">
          需求內容 <span className="text-accent-700">*</span>
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={touched && !!errors.message}
          className={`${fieldCls} resize-y`}
        />
        {touched && errors.message && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-700 px-6 font-medium text-white transition-colors hover:bg-brand-800 sm:w-auto"
      >
        送出洽詢
        <Icon name="arrowRight" size={18} />
      </button>
      <p className="text-xs text-ink-muted">
        送出後將開啟您的電子郵件程式並帶入內容；亦可直接寄信至{" "}
        <a href={`mailto:${contact.email}`} className="font-medium text-brand-700 underline">
          {contact.email}
        </a>
        。
      </p>
    </form>
  );
}
