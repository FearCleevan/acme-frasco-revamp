"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const serviceLinks = [
  { href: "/services/nde-ndt",          label: "NDE / NDT" },
  { href: "/services/tube-inspection",  label: "Tube Inspection" },
  { href: "/services/asset-integrity",  label: "Asset Integrity" },
  { href: "/services/lifting-equipment",label: "Lifting Equipment" },
];

export default function Footer() {
  const pathname = usePathname();

  const footerLinkCls = (href: string) =>
    `hover:text-orange transition-colors ${pathname === href ? "text-orange" : ""}`;

  return (
    <footer className="bg-ink text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand col (spans 2) */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 font-label font-bold text-xl text-white uppercase tracking-tight mb-5">
              <div className="w-[3px] h-7 bg-orange" />
              FRASCO INDUSTRIAL INSPECTIONS
            </div>
            <p className="text-white/55 max-w-sm mb-6 leading-relaxed font-body text-sm">
              Non-destructive evaluation and asset integrity testing — designed to limit
              your facility&apos;s downtime and unexpected machinery expense.
              Certified. Portable. Same-day.
            </p>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">
              Serving NS · NB · Newfoundland · Canada · USA · Overseas
            </div>
          </div>

          {/* Services col */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm font-body text-white/55">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={footerLinkCls(href)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm font-body text-white/55">
              <li>
                <a href="tel:19024315483" className="hover:text-orange transition-colors">
                  1-902-431-5483
                </a>
              </li>
              <li>Fax: 1-902-481-1007</li>
              <li>
                <a href="mailto:frascoinspect@gmail.com" className="hover:text-orange transition-colors">
                  frascoinspect@gmail.com
                </a>
              </li>
              <li className="pt-2 text-[10px] font-mono uppercase tracking-widest">
                25 Raddall Ave., Unit 4<br />Dartmouth, NS B3B 1L4
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/30">
            © 2026 Frasco Industrial Inspections — All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/about"
              className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${
                pathname === "/about" ? "text-orange" : "text-white/30 hover:text-orange"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${
                pathname === "/contact" ? "text-orange" : "text-white/30 hover:text-orange"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
