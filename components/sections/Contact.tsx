"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Lede, FinePrint } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Cta } from "@/components/ui/Cta";
import { content } from "@/lib/config/content";
import { site } from "@/lib/config/site";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";
import {
  interestOptions,
  validateContact,
  type ContactPayload,
  type FieldErrors,
} from "@/lib/services/contactService";

type Status = "idle" | "submitting" | "success" | "error";

const emptyForm: ContactPayload = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  interest: "passage-01",
  message: "",
  consent: false,
};

export function Contact() {
  const [values, setValues] = useState<ContactPayload>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const trapRef = useRef<HTMLInputElement>(null);
  const reduced = useSafeReducedMotion();
  const formId = useId().replace(/[:]/g, "");

  const set = <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validateContact(values);
    if (Object.keys(found).length) {
      setErrors(found);
      setStatus("idle");
      const firstKey = Object.keys(found)[0];
      document.getElementById(`${formId}-${firstKey}`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: trapRef.current?.value ?? "" }),
      });
      const data = (await response.json()) as { ok: boolean; message?: string; errors?: FieldErrors };

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setServerMessage(data.message ?? "Your message could not be sent.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(emptyForm);
    } catch {
      setServerMessage("The network did not respond. Please try again, or email us directly.");
      setStatus("error");
    }
  };

  return (
    <Section id="contact" tone="dark" className="bg-navy-950 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow index={content.contact.index}>{content.contact.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal
              text={content.contact.title}
              as="h2"
              className="mt-9 font-display text-[2.25rem] font-light leading-[1.06] tracking-[-0.02em] text-ivory-50 sm:text-5xl lg:text-6xl"
            />
            <Lede className="mt-8">{content.contact.lede}</Lede>

            <div className="mt-10 flex flex-col gap-3">
              <Cta href={`mailto:${site.contact.email}`} variant="link">
                {site.contact.email}
              </Cta>
              <span className="label-sm mt-3 text-silver-400">{site.contact.locality}</span>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  data-reveal
                  key="success"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-silver-200/15 bg-navy-900/60 p-8 sm:p-10"
                  role="status"
                  aria-live="polite"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/50 text-gold-400">
                    <Check size={15} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-light text-ivory-50">
                    {content.contact.successTitle}
                  </h3>
                  <p className="mt-4 max-w-[42ch] text-[0.9rem] leading-relaxed text-silver-100/75">
                    {content.contact.successBody}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="label mt-8 text-silver-200 underline underline-offset-4 transition-colors hover:text-ivory-50"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  data-reveal
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-8"
                >
                  {status === "error" && serverMessage ? (
                    <p
                      role="alert"
                      className="border border-gold-500/40 bg-navy-900/60 px-5 py-4 text-[0.8rem] leading-relaxed text-gold-300"
                    >
                      <span className="label mr-2 text-gold-400">{content.contact.errorTitle}</span>
                      {serverMessage}
                    </p>
                  ) : null}

                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field
                      id={`${formId}-firstName`}
                      label="First name"
                      value={values.firstName}
                      onChange={(v) => set("firstName", v)}
                      error={errors.firstName}
                      autoComplete="given-name"
                      required
                    />
                    <Field
                      id={`${formId}-lastName`}
                      label="Last name"
                      value={values.lastName}
                      onChange={(v) => set("lastName", v)}
                      error={errors.lastName}
                      autoComplete="family-name"
                      required
                    />
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field
                      id={`${formId}-email`}
                      label="Email"
                      type="email"
                      value={values.email}
                      onChange={(v) => set("email", v)}
                      error={errors.email}
                      autoComplete="email"
                      required
                    />
                    <Field
                      id={`${formId}-phone`}
                      label="Phone"
                      type="tel"
                      optional
                      value={values.phone ?? ""}
                      onChange={(v) => set("phone", v)}
                      error={errors.phone}
                      autoComplete="tel"
                    />
                  </div>

                  <SelectField
                    id={`${formId}-interest`}
                    label="Interest"
                    value={values.interest}
                    onChange={(v) => set("interest", v as ContactPayload["interest"])}
                    error={errors.interest}
                  />

                  <Field
                    id={`${formId}-message`}
                    label="Message"
                    value={values.message}
                    onChange={(v) => set("message", v)}
                    error={errors.message}
                    multiline
                    required
                  />

                  {/* Quiet spam trap — never shown, never announced. */}
                  <input
                    ref={trapRef}
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="sr-focusable"
                  />

                  <Consent
                    id={`${formId}-consent`}
                    checked={values.consent}
                    onChange={(v) => set("consent", v)}
                    error={errors.consent}
                  />

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <Cta type="submit" variant="solid" disabled={status === "submitting"}>
                      {status === "submitting" ? "Sending" : content.contact.submitLabel}
                      {status === "submitting" ? (
                        <Spinner />
                      ) : (
                        <ArrowRight size={13} strokeWidth={1.4} aria-hidden="true" />
                      )}
                    </Cta>
                    <FinePrint className="max-w-[34ch]">
                      We reply personally. No newsletter, no automated sequence.
                    </FinePrint>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  multiline = false,
  optional = false,
  required = false,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  multiline?: boolean;
  optional?: boolean;
  required?: boolean;
  autoComplete?: string;
}) {
  const describedBy = error ? `${id}-error` : undefined;
  const base =
    "w-full border-0 border-b bg-transparent pb-3 pt-2 text-[0.95rem] text-ivory-50 outline-none transition-colors duration-[--duration-fast] placeholder:text-silver-400 focus:border-gold-400";
  const border = error ? "border-gold-400/70" : "border-silver-200/25 hover:border-silver-200/45";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label flex items-center gap-3 text-silver-300">
        {label}
        {optional ? <span className="label-sm text-silver-400">Optional</span> : null}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={`${base} ${border} resize-y`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={`${base} ${border}`}
        />
      )}
      {error ? (
        <p id={describedBy} className="text-[0.72rem] text-gold-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-silver-300">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full appearance-none border-0 border-b bg-transparent pb-3 pr-8 pt-2 text-[0.95rem] text-ivory-50 outline-none transition-colors duration-[--duration-fast] focus:border-gold-400 ${
            error ? "border-gold-400/70" : "border-silver-200/25 hover:border-silver-200/45"
          }`}
        >
          {interestOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-navy-900 text-ivory-50">
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 right-1 text-silver-300"
        >
          ↓
        </span>
      </div>
      {error ? (
        <p id={describedBy} className="text-[0.72rem] text-gold-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Consent({
  id,
  checked,
  onChange,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}) {
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-4">
        <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onChange={(event) => onChange(event.target.checked)}
            className="peer h-5 w-5 cursor-pointer appearance-none border border-silver-200/35 bg-transparent transition-colors duration-[--duration-fast] checked:border-gold-400 hover:border-silver-200/60"
          />
          <Check
            size={12}
            strokeWidth={2}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold-400 opacity-0 transition-opacity duration-[--duration-fast] peer-checked:opacity-100"
          />
        </span>
        <label htmlFor={id} className="cursor-pointer text-[0.78rem] leading-relaxed text-silver-100/75">
          {content.contact.consentLabel}{" "}
          <Link href="/legal/privacy" className="underline underline-offset-4 hover:text-ivory-50">
            {content.contact.consentLinkLabel}
          </Link>
          .
        </label>
      </div>
      {error ? (
        <p id={describedBy} className="text-[0.72rem] text-gold-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-3 w-3 animate-spin rounded-full border border-current border-t-transparent"
    />
  );
}
