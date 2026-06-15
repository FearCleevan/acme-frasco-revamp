import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

const FIELD_MAX: Record<string, number> = {
  name: 100,
  company: 100,
  email: 254,
  phone: 30,
  service: 100,
  location: 100,
  message: 2000,
};

function getIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  // Fallback: treat as a single shared unknown origin — still rate-limited
  return "__unknown__";
}

function pruneExpired() {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key);
  }
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  // Prune stale entries periodically to prevent memory growth
  if (store.size > 500) pruneExpired();

  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }
  if (entry.count >= LIMIT) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count++;
  return { allowed: true, retryAfter: 0 };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const { allowed, retryAfter } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before submitting again." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot check — bots fill the _hp field, humans don't
  if (body._hp) {
    return NextResponse.json({ success: true });
  }

  // Input validation — required fields
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!isValidEmail(String(body.email))) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Field length limits
  for (const [field, max] of Object.entries(FIELD_MAX)) {
    const val = body[field];
    if (val && String(val).length > max) {
      return NextResponse.json(
        { error: `Field "${field}" exceeds maximum length of ${max} characters.` },
        { status: 400 }
      );
    }
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl || scriptUrl.includes("REPLACE_WITH_YOUR_DEPLOYMENT_ID")) {
    console.warn("GOOGLE_SCRIPT_URL is not configured. Form submission skipped.");
    return NextResponse.json({ success: true });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:     String(body.name     || "").trim(),
        company:  String(body.company  || "").trim(),
        email:    String(body.email    || "").trim(),
        phone:    String(body.phone    || "").trim(),
        service:  String(body.service  || "").trim(),
        location: String(body.location || "").trim(),
        message:  String(body.message  || "").trim(),
        urgent:   Boolean(body.urgent),
      }),
    });

    if (!response.ok) {
      console.error("Google Apps Script returned:", response.status);
      return NextResponse.json(
        { error: "Failed to send your message. Please call us directly." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Failed to reach Google Apps Script:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please call us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
