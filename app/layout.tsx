import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Syne,
  Inter_Tight,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/providers/LenisProvider";
import CookieConsentProvider from "@/components/providers/CookieConsentProvider";
import CookieBanner from "@/components/ui/CookieBanner";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://frasco.ca"),
  title: {
    default: "FRASCO | Industrial Inspection Services — Dartmouth, NS",
    template: "%s | FRASCO Industrial Inspections",
  },
  description:
    "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment certification. 24/7 availability across Nova Scotia and beyond.",
  keywords: [
    "NDE inspection Nova Scotia",
    "NDT services Halifax",
    "industrial inspection Dartmouth",
    "non-destructive testing Nova Scotia",
    "CGSB certified NDT",
    "tube inspection Halifax",
    "heat exchanger inspection Canada",
    "asset integrity inspection Nova Scotia",
    "lifting equipment certification NS",
    "crane inspection Nova Scotia",
    "industrial NDE contractor",
    "frasco.ca",
    "FRASCO inspections",
  ],
  icons: {
    icon: [{ url: "/icon.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://frasco.ca",
    siteName: "FRASCO Industrial Inspections",
    title: "FRASCO | Industrial Inspection Services — Dartmouth, NS",
    description:
      "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment certification. 24/7 availability across Nova Scotia and beyond.",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "FRASCO Industrial Inspections" }],
  },
  twitter: {
    card: "summary",
    title: "FRASCO | Industrial Inspection Services",
    description:
      "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment certification. 24/7 across Nova Scotia.",
    images: ["/icon.png"],
  },
  alternates: {
    canonical: "https://frasco.ca",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "FRASCO Industrial Inspections",
  url: "https://frasco.ca",
  telephone: "+19024315483",
  email: "info@frasco.ca",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dartmouth",
    addressRegion: "NS",
    addressCountry: "CA",
  },
  areaServed: {
    "@type": "State",
    name: "Nova Scotia",
  },
  serviceType: [
    "NDE Inspection",
    "NDT Services",
    "Tube Inspection",
    "Asset Integrity Management",
    "Lifting Equipment Certification",
  ],
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${syne.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-paper text-ink overflow-x-hidden min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CookieConsentProvider>
          <LenisProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </LenisProvider>
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
