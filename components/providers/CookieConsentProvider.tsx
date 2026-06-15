'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface ConsentState {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string | null;
}

interface ConsentContextValue {
  consent: ConsentState | null;
  hasResponded: boolean;
  saveConsent: (analytics: boolean, marketing: boolean) => void;
}

const COOKIE_NAME = "frasco_consent";
const EXPIRY_DAYS = 365;

function parseCookieConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    const value = decodeURIComponent(match.split("=")[1]);
    return JSON.parse(value) as ConsentState;
  } catch {
    return null;
  }
}

function writeConsentCookie(state: ConsentState) {
  const expires = new Date();
  expires.setDate(expires.getDate() + EXPIRY_DAYS);
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(state)
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secure}`;
}

const ConsentContext = createContext<ConsentContextValue>({
  consent: null,
  hasResponded: false,
  saveConsent: () => {},
});

export function useCookieConsent() {
  return useContext(ConsentContext);
}

export default function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [hasResponded, setHasResponded] = useState(false);

  useEffect(() => {
    const saved = parseCookieConsent();
    if (saved) {
      setConsent(saved);
      setHasResponded(true);
    }
  }, []);

  const saveConsent = useCallback((analytics: boolean, marketing: boolean) => {
    const state: ConsentState = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    writeConsentCookie(state);
    setConsent(state);
    setHasResponded(true);
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, hasResponded, saveConsent }}>
      {children}
    </ConsentContext.Provider>
  );
}
