'use client';

import { useState } from "react";
import { serviceOptions } from "@/lib/data/contact";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  message: string;
  urgent: boolean;
  _hp: string;
}

type Status = "idle" | "loading" | "success" | "error" | "rate-limited";

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  location: "",
  message: "",
  urgent: false,
  _hp: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 429) {
        setStatus("rate-limited");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as { error?: string }).error || "Something went wrong. Please call us directly.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection or call us directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-ghost shadow-heavy p-8 md:p-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-orange flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-label text-2xl font-bold text-ink uppercase tracking-tight mb-4">
          Request Received
        </h3>
        <p className="font-body text-lead text-sm leading-relaxed max-w-md mb-8">
          Thank you for contacting Frasco Industrial Inspections. A member of our team will review your request and be in touch within one business day. For urgent matters, please call us directly.
        </p>
        <a
          href="tel:19024315483"
          className="inline-flex items-center gap-2 bg-orange text-white font-label font-bold text-sm uppercase tracking-wider px-8 py-4 hover:bg-ink transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.04 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
          </svg>
          Call 1-902-431-5483
        </a>
      </div>
    );
  }

  if (status === "rate-limited") {
    return (
      <div className="bg-white border border-ghost shadow-heavy p-8 md:p-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-ink flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="font-label text-2xl font-bold text-ink uppercase tracking-tight mb-4">
          Too Many Requests
        </h3>
        <p className="font-body text-lead text-sm leading-relaxed max-w-md mb-8">
          You have submitted too many requests in a short period. Please wait an hour or call us directly.
        </p>
        <a
          href="tel:19024315483"
          className="inline-flex items-center gap-2 bg-orange text-white font-label font-bold text-sm uppercase tracking-wider px-8 py-4 hover:bg-ink transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.04 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
          </svg>
          Call 1-902-431-5483
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full bg-white border border-ghost px-4 py-3 font-body text-sm text-ink placeholder:text-ghost/60 focus:outline-none focus:border-orange transition-colors";
  const labelClass = "block font-mono text-[10px] uppercase tracking-widest text-lead mb-2";

  return (
    <div className="bg-white border border-ghost shadow-heavy p-8 md:p-12">
      <h3 className="font-label text-2xl font-bold text-ink uppercase tracking-tight mb-2">
        Request an Inspection
      </h3>
      <p className="font-body text-sm text-lead mb-8">
        Fill in the details below and our team will get back to you promptly.
      </p>

      {status === "error" && (
        <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-700 font-body text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Honeypot — hidden from humans, bots fill this */}
        <input
          name="_hp"
          type="text"
          value={form._hp}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
        />

        {/* Name + Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name <span className="text-orange">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="John Smith"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="company" className={labelClass}>
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              placeholder="ACME Industries Ltd."
              className={inputClass}
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address <span className="text-orange">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="1-902-000-0000"
              className={inputClass}
            />
          </div>
        </div>

        {/* Service + Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="service" className={labelClass}>
              Service Required
            </label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">Select a service…</option>
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location" className={labelClass}>
              Site Location / Province
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Halifax, NS"
              className={inputClass}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClass}>
            Message / Project Details <span className="text-orange">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your inspection needs, timeline, equipment involved…"
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Urgent checkbox */}
        <div className="flex items-center gap-3">
          <input
            id="urgent"
            name="urgent"
            type="checkbox"
            checked={form.urgent}
            onChange={handleChange}
            className="w-4 h-4 accent-orange cursor-pointer"
          />
          <label htmlFor="urgent" className="font-mono text-[10px] uppercase tracking-widest text-lead cursor-pointer">
            This is an urgent / emergency request
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-orange text-white font-label font-bold text-sm uppercase tracking-wider px-8 py-4 hover:bg-ink transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending…" : "Submit Inspection Request"}
        </button>

        <p className="font-body text-[11px] text-ghost text-center">
          Fields marked <span className="text-orange">*</span> are required. We respond within one business day.
        </p>

      </form>
    </div>
  );
}
