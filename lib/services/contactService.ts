/**
 * CONTACT SERVICE
 * ------------------------------------------------------------------
 * One seam between the enquiry form and whatever actually delivers the
 * message. The API route (app/api/contact/route.ts) calls `deliver`;
 * swapping providers means setting env vars, not editing components.
 *
 * SUPPORTED PROVIDERS
 *   resend    — RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 *   formspree — FORMSPREE_ENDPOINT
 *   webhook   — CONTACT_WEBHOOK_URL  (Supabase Edge Function, Zapier, your own)
 *   log       — development default: writes to the server console
 *
 * With no provider configured the route reports that honestly instead
 * of showing a success screen for a message that went nowhere.
 */

export type Interest =
  | "passage-01"
  | "edition"
  | "press"
  | "rotary"
  | "service"
  | "other";

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  interest: Interest;
  message: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

export type DeliveryResult =
  | { ok: true; provider: string }
  | { ok: false; reason: "not-configured" | "provider-error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export const interestOptions: { value: Interest; label: string }[] = [
  { value: "passage-01", label: "Passage 01" },
  { value: "edition", label: "The edition" },
  { value: "rotary", label: "The Atascadero edition" },
  { value: "service", label: "Service and warranty" },
  { value: "press", label: "Press" },
  { value: "other", label: "Something else" },
];

/** Shared by the client form and the API route, so both agree on validity. */
export function validateContact(input: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.firstName?.trim()) errors.firstName = "Please enter your first name.";
  else if (input.firstName.trim().length > 80) errors.firstName = "That name is too long.";

  if (!input.lastName?.trim()) errors.lastName = "Please enter your last name.";
  else if (input.lastName.trim().length > 80) errors.lastName = "That name is too long.";

  if (!input.email?.trim()) errors.email = "Please enter an email address.";
  else if (!EMAIL_RE.test(input.email.trim())) errors.email = "That email address does not look right.";

  if (input.phone && input.phone.trim().length > 40) errors.phone = "That number is too long.";

  if (!input.interest) errors.interest = "Please choose a subject.";
  else if (!interestOptions.some((o) => o.value === input.interest))
    errors.interest = "Please choose a subject.";

  if (!input.message?.trim()) errors.message = "Please add a short message.";
  else if (input.message.trim().length < 4) errors.message = "Please add a little more detail.";
  else if (input.message.trim().length > 4000) errors.message = "Please shorten your message.";

  if (!input.consent) errors.consent = "Please confirm before sending.";

  return errors;
}

function asPlainText(payload: ContactPayload): string {
  const label =
    interestOptions.find((o) => o.value === payload.interest)?.label ?? payload.interest;
  return [
    `Name:     ${payload.firstName} ${payload.lastName}`,
    `Email:    ${payload.email}`,
    `Phone:    ${payload.phone?.trim() || "—"}`,
    `Interest: ${label}`,
    "",
    payload.message,
  ].join("\n");
}

/** Delivers an enquiry through whichever provider is configured. */
export async function deliver(payload: ContactPayload): Promise<DeliveryResult> {
  const provider = (process.env.CONTACT_PROVIDER ?? "").toLowerCase();
  const subject = `SARVEON enquiry — ${payload.firstName} ${payload.lastName}`;
  const text = asPlainText(payload);

  try {
    if (provider === "resend") {
      const key = process.env.RESEND_API_KEY;
      const to = process.env.CONTACT_TO_EMAIL;
      const from = process.env.CONTACT_FROM_EMAIL;
      if (!key || !to || !from) {
        return {
          ok: false,
          reason: "not-configured",
          message: "RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL must all be set.",
        };
      }
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [to], reply_to: payload.email, subject, text }),
      });
      if (!response.ok) {
        return { ok: false, reason: "provider-error", message: await response.text() };
      }
      return { ok: true, provider: "resend" };
    }

    if (provider === "formspree") {
      const endpoint = process.env.FORMSPREE_ENDPOINT;
      if (!endpoint) {
        return { ok: false, reason: "not-configured", message: "FORMSPREE_ENDPOINT is not set." };
      }
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, _subject: subject }),
      });
      if (!response.ok) {
        return { ok: false, reason: "provider-error", message: await response.text() };
      }
      return { ok: true, provider: "formspree" };
    }

    if (provider === "webhook") {
      const url = process.env.CONTACT_WEBHOOK_URL;
      if (!url) {
        return { ok: false, reason: "not-configured", message: "CONTACT_WEBHOOK_URL is not set." };
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.CONTACT_WEBHOOK_TOKEN
            ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` }
            : {}),
        },
        body: JSON.stringify({ subject, ...payload, receivedAt: new Date().toISOString() }),
      });
      if (!response.ok) {
        return { ok: false, reason: "provider-error", message: await response.text() };
      }
      return { ok: true, provider: "webhook" };
    }

    if (provider === "log" || process.env.NODE_ENV !== "production") {
      console.info(`\n--- SARVEON enquiry (CONTACT_PROVIDER=log) ---\n${text}\n`);
      return { ok: true, provider: "log" };
    }

    return {
      ok: false,
      reason: "not-configured",
      message: "CONTACT_PROVIDER is not set. See .env.example.",
    };
  } catch (error) {
    return {
      ok: false,
      reason: "provider-error",
      message: error instanceof Error ? error.message : "Unknown delivery error.",
    };
  }
}
