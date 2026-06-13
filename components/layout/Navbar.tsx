"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

const services = [
  {
    href:        "/services/nde-ndt",
    label:       "NDE / NDT",
    desc:        "Eddy current, ultrasonic, thermography",
    accentClass: "bg-orange",
  },
  {
    href:        "/services/tube-inspection",
    label:       "Tube Inspection",
    desc:        "Chillers, condensers, heat exchangers",
    accentClass: "bg-orange",
  },
  {
    href:        "/services/asset-integrity",
    label:       "Asset Integrity",
    desc:        "Weld testing, API, QA/QC, turnaround",
    accentClass: "bg-orange",
  },
  {
    href:        "/services/lifting-equipment",
    label:       "Lifting Equipment",
    desc:        "Certification, cranes, wire rope",
    accentClass: "bg-amber",
  },
];

const featuredCards = [
  {
    href:      "/services/nde-ndt",
    category:  "Core Service",
    title:     "NDE / NDT",
    imageUrl:  "/Non-destructive-evaluation.jpg",
    accent:    "text-orange",
  },
  {
    href:      "/services/lifting-equipment",
    category:  "Certification",
    title:     "Lifting Equipment",
    imageUrl:  "/industrial-lifting-equipment.jpg",
    accent:    "text-amber",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome     = pathname === "/";
  const isServices = pathname.startsWith("/services");
  const isAbout    = pathname === "/about";
  const isContact  = pathname === "/contact";

  const navLinkCls = (active: boolean) =>
    `text-[11px] font-mono uppercase tracking-widest transition-colors ${
      active ? "text-orange" : "text-ink/60 hover:text-ink"
    }`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-white border-b border-ghost shadow-sm">

        {/* ── Left: logo + desktop nav ── */}
        <div className="flex items-center gap-4 md:gap-12">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="FRASCO Industrial Inspection"
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">

            {/* Services dropdown */}
            <div className="relative group">
              <button
                type="button"
                className={`flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest transition-colors ${
                  isServices ? "text-orange" : "text-ink/60 hover:text-ink"
                }`}
              >
                Services
                <svg
                  width="10" height="10" viewBox="0 0 16 16" fill="currentColor"
                  className="group-hover:rotate-180 transition-transform duration-300"
                >
                  <path d="M2.558 6.295a.5.5 0 0 1 .707 0L8 10.03l4.735-3.736a.5.5 0 0 1 .707.708L8.354 11.06a.5.5 0 0 1-.708 0L2.558 7.003a.5.5 0 0 1 0-.708Z" />
                </svg>
              </button>

              {/* Mega dropdown panel */}
              <div className="absolute top-full mt-3 left-0 w-[640px] bg-white border border-ghost shadow-heavy opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-[250ms] translate-y-2 group-hover:translate-y-0 z-[60] flex">

                {/* Left: service links */}
                <div className="flex-1 flex flex-col">
                  <div className="p-3 flex-1">
                    {services.map(({ href, label, desc, accentClass }) => (
                      <Link
                        key={href}
                        href={href}
                        className={`flex items-center gap-4 px-5 py-4 text-ink transition-colors ${
                          pathname === href ? "bg-soft" : "hover:bg-soft"
                        }`}
                      >
                        <div className={`w-2 h-2 ${accentClass} rounded-full shrink-0`} />
                        <div>
                          <div className={`font-label font-bold text-sm ${pathname === href ? "text-orange" : ""}`}>
                            {label}
                          </div>
                          <div className="text-xs text-lead font-mono mt-1">{desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-ghost px-5 py-4 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-lead uppercase tracking-widest">
                      Not sure what you need?
                    </span>
                    <Link
                      href="/contact"
                      className="text-[10px] font-mono text-orange uppercase tracking-widest hover:underline"
                    >
                      Ask us →
                    </Link>
                  </div>
                </div>

                {/* Right: featured image cards */}
                <div className="w-[240px] border-l border-ghost bg-soft flex flex-col shrink-0">
                  <div className="px-5 pt-5 pb-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-lead">Featured</span>
                  </div>
                  <div className="flex flex-col flex-1 gap-2 px-3 pb-3">
                    {featuredCards.map((card) => (
                      <Link
                        key={card.href}
                        href={card.href}
                        className="relative overflow-hidden flex-1 group/card block min-h-[120px]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={card.imageUrl}
                          alt={card.title}
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-ink/65 group-hover/card:bg-ink/40 transition-colors duration-300" />
                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                          <span className={`font-mono text-[9px] uppercase tracking-widest font-bold ${card.accent}`}>
                            {card.category}
                          </span>
                          <div>
                            <div className="font-label font-bold text-white text-sm leading-tight mb-1">
                              {card.title}
                            </div>
                            <svg className={`w-3 h-3 ${card.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4-4 4M3 12h18" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Process + Industries: anchor links shown only on homepage */}
            {isHome && (
              <>
                <a href="#process"    className={navLinkCls(false)}>Process</a>
                <a href="#industries" className={navLinkCls(false)}>Industries</a>
              </>
            )}

            {/* About */}
            <Link href="/about" className={navLinkCls(isAbout)}>About</Link>

            {/* Contact: shown on all non-homepage */}
            {!isHome && (
              <Link href="/contact" className={navLinkCls(isContact)}>Contact</Link>
            )}
          </nav>
        </div>

        {/* ── Right: phone + mobile toggle + CTA ── */}
        <div className="flex items-center gap-4">
          <a
            href="tel:19024315483"
            className="hidden sm:flex items-center gap-2 text-ink/50 hover:text-orange transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 21c-1.654 0-3.282-.4-4.74-1.2l-.45-.24C8.7 17.889 6.152 15.34 4.48 12.23l-.25-.45C3.43 10.314 3.007 8.671 3 7v-.67c-.002-.534.21-1.046.59-1.42L5.28 3.22a.5.5 0 0 1 .627-.022l2.25 3.86a.5.5 0 0 1-.11.644L6.66 9.33a.5.5 0 0 0-.1.59l.35.66C8.177 12.909 10.09 14.818 12.42 16.07l.66.36a.5.5 0 0 0 .59-.1l1.89-1.89a.5.5 0 0 1 .644-.11l3.86 2.25a.5.5 0 0 1-.022.627l-1.69 1.69A1.97 1.97 0 0 1 17 21Z" />
            </svg>
            <span className="font-mono text-[11px] tracking-wider">902-431-5483</span>
          </a>

          <button
            type="button"
            id="mob-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="lg:hidden w-10 h-10 flex items-center justify-center text-ink"
          >
            <svg
              width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link
            href="/contact"
            className="bg-orange text-white font-mono text-[11px] font-bold px-5 py-2.5 uppercase tracking-widest hover:bg-amber hover:text-ink transition-colors"
          >
            Request Inspection
          </Link>
        </div>
      </header>

      {/* Mobile overlay */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
