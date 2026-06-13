"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/services/nde-ndt",         label: "NDE / NDT" },
  { href: "/services/tube-inspection",  label: "Tube Inspection" },
  { href: "/services/asset-integrity",  label: "Asset Integrity" },
  { href: "/services/lifting-equipment",label: "Lifting Equipment" },
  { href: "/about",                     label: "About Us" },
  { href: "/contact",                   label: "Contact" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 bg-ink z-[100] flex flex-col p-8 transition-transform duration-500 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header row */}
      <div className="flex justify-between items-center mb-14">
        <span className="font-label font-bold text-2xl text-white">
          FRASCO<span className="text-orange">.</span>
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white"
        >
          <svg
            width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-7">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={`text-4xl font-display font-bold transition-colors ${
              pathname === href ? "text-orange" : "text-white hover:text-orange"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom: 24/7 info */}
      <div className="mt-auto">
        <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
          24/7 Response
        </span>
        <a href="tel:19024315483" className="text-white text-xl font-body">
          1-902-431-5483
        </a>
      </div>
    </div>
  );
}
