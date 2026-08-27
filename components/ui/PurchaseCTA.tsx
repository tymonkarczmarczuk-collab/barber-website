"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Cta } from "@/components/ui/Cta";
import { product } from "@/lib/config/product";
import { startCheckout } from "@/lib/commerce/checkout";
import { useSurface } from "@/components/ui/Section";

/**
 * The one place that decides what "buy" means right now.
 *
 * Today Passage 01 is enquiry-only, so this resolves to the enquiry
 * form. When a checkout is connected and product.availability is set
 * to "sale", the same component becomes the checkout trigger —
 * nothing else on the site has to change.
 */
export function PurchaseCTA({
  variant = "solid",
  size = "md",
  className = "",
  label,
}: {
  variant?: "solid" | "outline" | "link";
  size?: "sm" | "md";
  className?: string;
  label?: string;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dark = useSurface() === "dark";

  if (product.availability === "sale") {
    const onClick = async () => {
      setPending(true);
      setError(null);
      const result = await startCheckout();
      if (result.ok && result.url) {
        window.location.href = result.url;
        return;
      }
      setError(result.message ?? "Checkout is unavailable.");
      setPending(false);
    };

    return (
      <div className={className}>
        <Cta variant={variant} size={size} onClick={onClick} disabled={pending} aria-busy={pending}>
          {pending ? "One moment" : (label ?? "Reserve a piece")}
          <ArrowRight size={13} strokeWidth={1.4} aria-hidden="true" />
        </Cta>
        {error ? (
          <p
            role="status"
            className={`mt-3 text-[0.72rem] leading-relaxed ${dark ? "text-silver-300" : "text-charcoal-500"}`}
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  const copy =
    label ?? (product.availability === "waitlist" ? "Join the list" : "Request details");

  return (
    <Cta href="/#contact" variant={variant} size={size} className={className}>
      {copy}
      <ArrowRight size={13} strokeWidth={1.4} aria-hidden="true" />
    </Cta>
  );
}
