'use client';

import { useState } from "react";
import { useCookieConsent } from "@/components/providers/CookieConsentProvider";

export default function CookieBanner() {
  const { hasResponded, saveConsent } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (hasResponded) return null;

  function acceptAll() {
    saveConsent(true, true);
  }

  function declineAll() {
    saveConsent(false, false);
  }

  function savePreferences() {
    saveConsent(analytics, marketing);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-0 left-0 right-0 z-50 bg-ink border-t border-white/10 shadow-heavy"
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        {!showPreferences ? (
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-orange mb-1">
                Cookie Preferences
              </p>
              <p className="font-body text-xs text-white/70 leading-relaxed">
                We use essential cookies to keep this site running. With your consent, we may also use analytics and marketing cookies to understand how visitors use the site and to reach you with relevant content.{" "}
                <button
                  onClick={() => setShowPreferences(true)}
                  className="text-orange underline hover:text-white transition-colors"
                >
                  Manage preferences
                </button>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={declineAll}
                className="font-label font-bold text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors px-4 py-2 border border-white/20 hover:border-white/50"
              >
                Decline All
              </button>
              <button
                onClick={acceptAll}
                className="font-label font-bold text-xs uppercase tracking-wider bg-orange text-white px-6 py-2 hover:bg-white hover:text-ink transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-orange">
              Manage Cookie Preferences
            </p>

            {/* Essential */}
            <div className="flex items-start gap-4 py-3 border-b border-white/10">
              <div className="flex-1">
                <p className="font-label font-bold text-xs uppercase tracking-wider text-white mb-1">
                  Essential
                </p>
                <p className="font-body text-xs text-white/50">
                  Required for the site to function. Cannot be disabled.
                </p>
              </div>
              <div className="shrink-0 mt-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-orange">Always On</span>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start gap-4 py-3 border-b border-white/10">
              <div className="flex-1">
                <p className="font-label font-bold text-xs uppercase tracking-wider text-white mb-1">
                  Analytics
                </p>
                <p className="font-body text-xs text-white/50">
                  Helps us understand how visitors interact with the site so we can improve it.
                </p>
              </div>
              <button
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics((v) => !v)}
                className={`shrink-0 mt-1 w-10 h-5 rounded-full transition-colors relative ${
                  analytics ? "bg-orange" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    analytics ? "translate-x-5" : "translate-x-0"
                  }`}
                />
                <span className="sr-only">{analytics ? "Disable analytics" : "Enable analytics"}</span>
              </button>
            </div>

            {/* Marketing */}
            <div className="flex items-start gap-4 py-3 border-b border-white/10">
              <div className="flex-1">
                <p className="font-label font-bold text-xs uppercase tracking-wider text-white mb-1">
                  Marketing
                </p>
                <p className="font-body text-xs text-white/50">
                  Allows us to show you relevant ads and measure campaign effectiveness.
                </p>
              </div>
              <button
                role="switch"
                aria-checked={marketing}
                onClick={() => setMarketing((v) => !v)}
                className={`shrink-0 mt-1 w-10 h-5 rounded-full transition-colors relative ${
                  marketing ? "bg-orange" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    marketing ? "translate-x-5" : "translate-x-0"
                  }`}
                />
                <span className="sr-only">{marketing ? "Disable marketing" : "Enable marketing"}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={declineAll}
                className="font-label font-bold text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors px-4 py-2 border border-white/20 hover:border-white/50"
              >
                Decline All
              </button>
              <button
                onClick={savePreferences}
                className="font-label font-bold text-xs uppercase tracking-wider bg-orange text-white px-6 py-2 hover:bg-white hover:text-ink transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
