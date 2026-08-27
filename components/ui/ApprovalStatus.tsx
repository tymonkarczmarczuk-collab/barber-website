"use client";

import { useSurface } from "@/components/ui/Section";
import { product } from "@/lib/config/product";

/**
 * Third-party approval state.
 *
 * While `status` is "pending", the site states plainly that permission
 * has not been granted and reproduces no protected artwork. Switching
 * product.rotary.status to "approved" — and supplying the official
 * artwork path — is the only thing needed to change what is shown.
 */
export function ApprovalStatus({
  status = product.rotary.status,
  pendingMessage = product.rotary.pendingMessage,
  approvedMessage = product.rotary.approvedMessage,
  className = "",
}: {
  status?: "pending" | "approved";
  pendingMessage?: string;
  approvedMessage?: string;
  className?: string;
}) {
  const dark = useSurface() === "dark";
  const approved = status === "approved";

  return (
    <div
      className={`border p-6 sm:p-8 ${
        dark ? "border-silver-200/15 bg-navy-850/60" : "border-charcoal-900/12 bg-ivory-50"
      } ${className}`}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <span
          aria-hidden="true"
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            approved ? "bg-gold-400" : dark ? "bg-silver-300/70" : "bg-charcoal-300"
          }`}
        />
        <span className={`label ${dark ? "text-silver-100" : "text-charcoal-700"}`}>
          {approved ? "Approval granted" : "Approval pending"}
        </span>
        <span
          className={`label-sm ${dark ? "text-silver-300/70" : "text-charcoal-500"}`}
        >
          {approved ? "Artwork supplied through official channels" : "No protected artwork shown"}
        </span>
      </div>

      <p
        className={`mt-5 max-w-[62ch] text-[0.82rem] leading-[1.85] ${
          dark ? "text-silver-100/72" : "text-charcoal-700"
        }`}
      >
        {approved ? approvedMessage : pendingMessage}
      </p>

      {approved && product.rotary.approvalReference ? (
        <p className={`mt-4 label-sm ${dark ? "text-silver-300/70" : "text-charcoal-500"}`}>
          Reference · {product.rotary.approvalReference}
        </p>
      ) : null}
    </div>
  );
}
