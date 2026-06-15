import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Blueprint grid background */}
      <div className="blueprint opacity-20 absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-orange mb-6">
          Error 404
        </p>

        <h1 className="font-label text-[120px] md:text-[180px] font-bold text-white/10 leading-none select-none">
          404
        </h1>

        <h2 className="font-label text-3xl md:text-4xl font-bold text-white uppercase tracking-tight -mt-4 mb-6">
          Page Not Found
        </h2>

        <p className="font-body text-base text-white/60 max-w-md leading-relaxed mb-10">
          This area is off-limits or doesn&apos;t exist. The page you&apos;re looking for may have moved or been removed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-orange text-white font-label font-bold text-sm uppercase tracking-wider px-8 py-4 hover:bg-white hover:text-ink transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Return Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-label font-bold text-sm uppercase tracking-wider px-8 py-4 hover:border-orange hover:text-orange transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
