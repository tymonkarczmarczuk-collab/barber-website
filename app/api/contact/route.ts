import { NextResponse } from "next/server";
import { deliver, validateContact, type ContactPayload } from "@/lib/services/contactService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Enquiry endpoint.
 *
 * Validates with the same rules as the form, drops obvious bots via a
 * honeypot field, applies a light per-IP throttle, then hands the
 * message to whichever provider is configured. If none is configured
 * it returns an error — it never reports a success for a message that
 * went nowhere.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function throttled(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (throttled(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many messages from this address. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: Partial<ContactPayload> & { company?: string };
  try {
    body = (await request.json()) as Partial<ContactPayload> & { company?: string };
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  /* Honeypot: a real person never fills this in. Answer as if sent. */
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors },
      { status: 422 },
    );
  }

  const payload: ContactPayload = {
    firstName: body.firstName!.trim(),
    lastName: body.lastName!.trim(),
    email: body.email!.trim(),
    phone: body.phone?.trim() || undefined,
    interest: body.interest!,
    message: body.message!.trim(),
    consent: true,
  };

  const result = await deliver(payload);

  if (!result.ok) {
    const message =
      result.reason === "not-configured"
        ? "This site is not yet connected to a mail provider, so the message was not sent. Please email us directly."
        : "Your message could not be delivered. Please try again, or email us directly.";
    console.error("[contact] delivery failed:", result.reason, result.message);
    return NextResponse.json({ ok: false, message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
