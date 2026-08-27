"use client";

import { claimLabel, type ClaimStatus } from "@/lib/config/product";
import { useSurface } from "@/components/ui/Section";

/**
 * Marks a value that the project has not yet settled. Nothing on this
 * site is presented as final unless it actually is.
 */
export function StatusTag({
  status,
  className = "",
}: {
  status: ClaimStatus;
  className?: string;
}) {
  const dark = useSurface() === "dark";
  if (status === "confirmed") return null;

  const tone =
    status === "pendingApproval"
      ? dark
        ? "text-gold-400 border-gold-500/35"
        : "text-gold-600 border-gold-600/35"
      : dark
        ? "text-silver-300 border-silver-300/25"
        : "text-charcoal-500 border-charcoal-900/20";

  return (
    <span
      className={`label-sm inline-flex shrink-0 items-center border px-2 py-1 ${tone} ${className}`}
    >
      {claimLabel[status]}
    </span>
  );
}
