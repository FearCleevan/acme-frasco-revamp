'use client';

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactInfoPanel() {
  return (
    <div className="space-y-4">

      {/* Phone / Fax / Email card */}
      <ScrollReveal>
        <div className="bg-ink border-l-4 border-orange p-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-orange mb-6">
            Direct Contact
          </p>

          {/* Phone */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 bg-orange flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.04 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
              </svg>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">Phone</p>
              <a
                href="tel:19024315483"
                className="font-label text-xl font-bold text-white hover:text-orange transition-colors"
              >
                1-902-431-5483
              </a>
            </div>
          </div>

          {/* Fax */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <polyline points="22 17 13 17" />
                <polyline points="22 11 13 11" />
                <polyline points="22 5 13 5" />
                <rect x="1" y="3" width="8" height="18" rx="1" />
                <path d="M5 7h1" />
              </svg>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">Fax</p>
              <p className="font-label text-xl font-bold text-white">1-902-431-5484</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">Email</p>
              <a
                href="mailto:info@frascoinspections.com"
                className="font-label text-lg font-bold text-white hover:text-orange transition-colors break-all"
              >
                info@frascoinspections.com
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Address card */}
      <ScrollReveal delay={100}>
        <div className="bg-soft border border-ghost p-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-orange mb-4">
            Office Location
          </p>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-ink flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="font-label font-bold text-ink text-base mb-1">Frasco Industrial Inspections</p>
              <p className="font-body text-sm text-lead leading-relaxed">
                Nova Scotia, Canada<br />
                Serving Eastern Canada & Beyond
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 24/7 Emergency card */}
      <ScrollReveal delay={200}>
        <div className="bg-orange p-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/70 mb-3">
            Emergency Response
          </p>
          <p className="font-label text-2xl font-bold text-white mb-2">24/7 Available</p>
          <p className="font-body text-sm text-white/80 mb-6 leading-relaxed">
            Industrial emergencies don&apos;t wait for business hours. Our inspection team is on call around the clock for urgent deployments.
          </p>
          <a
            href="tel:19024315483"
            className="inline-block bg-white text-orange font-label font-bold text-sm uppercase tracking-wider px-6 py-3 hover:bg-ink hover:text-white transition-colors"
          >
            Call Now
          </a>
        </div>
      </ScrollReveal>

    </div>
  );
}
