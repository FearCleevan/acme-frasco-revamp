import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

function getIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = store.get(ip);
  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait an hour before submitting again." },
      { status: 429 }
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
        name: body.name,
        company: body.company,
        email: body.email,
        phone: body.phone,
        service: body.service,
        location: body.location,
        message: body.message,
        urgent: body.urgent,
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
