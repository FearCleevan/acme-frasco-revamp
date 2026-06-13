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
  title: "FRASCO | Industrial Inspection Services — Dartmouth, NS",
  description:
    "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment certification. 24/7 availability across Nova Scotia and beyond.",
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
        <LenisProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
